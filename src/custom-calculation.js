/**
 * 自组计算逻辑
 * 组合数组，类似手工四则运算
 * 优点 精确度高 理论上精度无限制
 * 缺点 需要额外的存储空间，计算成本也较高 数据格式需要转化，因此在链式计算时的处理比较复杂
 * 适用场景 比较复杂的计算场景 对精度要求高的场景 数值较大或较长，会超出安全范围的计算
 * 后续改进 1. 对数据格式进行整体的替换，从index.js开始就进行转换（类似于big.js的方式），这样可以更好的支持链式计算，返回的数据能够统一，在乘除还有加减的转化中也能实现更好的支持；2. stringify方法改写，完全采用自己拼接字符串方式，使用Number仍会丢失精度
 */

import { MAX_EXP } from './config';

/**
 * 数据格式化整理，将数据转变为 count[0].count[1]count[2]... * 10^exponent 的形式
 * @param {Number} number
 * @returns {Object}
 */
function parse (number) {
  if (number === 0) {
    return {
      signal: 1,
      exponent: 0,
      count: [0]
    };
  }

  const regExp = /^[+-]?(\d+)(\.(\d*))?(e([+-]?\d+))?$/;
  const match = number.toString().match(regExp);
  if (!match) {
    throw new TypeError(`输入数字 ${number} 不符合规范`);
  }

  const integer = match[1];
  const decimal = match[3] || '';
  const exp = match[5] || 0;

  let signal = number < 0 ? -1 : 1;

  // interger
  let s = integer.split('').map(s => Number(s));
  while (s.length && s[0] === 0) s.shift();
  let exponent = Number(exp) + s.length - 1;
  let count = [];
  count.push(...s);

  // decimal
  s = decimal.split('').map(s => Number(s));
  // count没有内容到时候需要将0去掉
  if (!count.length) {
    // 去掉0并修改exponent
    if (s.length) {
      const zeroCount = s.findIndex(s => s !== 0);
      if (zeroCount > 0) {
        exponent -= zeroCount;
        s = s.slice(zeroCount);
      }
    }
  }

  count.push(...s);

  return {
    signal,
    exponent,
    count
  };
}

function stringify ({ signal = 1, exponent = 0, count = [] } = {}) {
  if (count.length === 1 && count[0] === 0) return `0`;

  let number = `${signal < 0 ? '-' : ''}`;
  number += count[0];
  if (count.length > 1) number += '.';
  for (let i = 1; i < count.length; i++) {
    number += count[i];
  }
  if (exponent !== 0) number += `e${exponent}`;

  return Number(number).toFixed(Math.max(0, count.length - 1 - exponent));
}

function fixToExponent (number, exponent) {
  // exponent >= number.exponent
  let len = exponent - number.exponent;
  while (len > 0) {
    number.count.unshift(0);
    len--;
  }

  return number;
}

function compareABS (number1, number2) {
  return Math.abs(number1) >= Math.abs(number2);
}

/**
 * 比较 arr1 是否大于等于 arr2
 * @param {Array<Number>} arr1
 * @param {Array<Number>} arr2
 */
function judgeNoLessThan (arr1, arr2) {
  if (arr1.length > arr2.length) return true;
  if (arr1.length < arr2.length) return false;
  let i = 0;
  while (i < arr1.length) {
    if (arr1[i] > arr2[i]) {
      return true;
    }
    if (arr1[i] < arr2[i++]) {
      return false;
    }
  }
  return true;
}

function minusArray (arr1, arr2) { // arr1一定大于arr2
  let len1 = arr1.length;
  let len2 = arr2.length;
  let count = new Array((len1));
  let flag = 0;
  for (let i = 0; i < len1; i++) {
    let sum = arr1[len1 - i - 1] - (arr2[len2 - i - 1] || 0) - flag;
    if (sum >= 0) {
      count[len1 - i - 1] = sum;
      flag = 0;
    } else {
      count[len1 - i - 1] = 10 + sum;
      flag = 1;
    }
  }

  return rmZero(count);
}

function rmZero (count) {
  while (count.length && count[0] === 0) {
    count.shift();
  }
  if (!count.length) count = [0];

  return count;
}

function isZero (arr) {
  return arr.length === 1 && arr[0] === 0;
}

export function add (num1, num2) {
  let fixedNum1 = parse(num1);
  let fixedNum2 = parse(num2);

  if (fixedNum1.signal !== fixedNum2.signal) {
    return minus(num1, multiplication(num2, -1));
  }

  let e = Math.max(fixedNum1.exponent, fixedNum2.exponent);
  if (e > fixedNum1.exponent) {
    fixedNum1 = fixToExponent(fixedNum1, e);
  } else {
    fixedNum2 = fixToExponent(fixedNum2, e);
  }

  let len = Math.max(fixedNum1.count.length, fixedNum2.count.length);
  let count = new Array(len);
  let flag = 0;

  while (len-- > 0) {
    let f = (fixedNum1.count[len] || 0) + (fixedNum2.count[len] || 0) + flag;
    count[len] = f % 10;
    flag = Math.floor(f / 10);
  }

  if (flag) {
    e++;
    count.unshift(1);
  }

  return stringify({
    count,
    signal: fixedNum1.signal,
    exponent: e
  });
}

export function minus (num1, num2) {
  let fixedNum1 = parse(num1);
  let fixedNum2 = parse(num2);

  if (fixedNum1.signal !== fixedNum2.signal) {
    return add(num1, multiplication(num2, -1));
  }

  if (!compareABS(num1, num2)) {
    return multiplication(-1, minus(multiplication(-1, num2), multiplication(-1, num1)));
  }

  let e = Math.max(fixedNum1.exponent, fixedNum2.exponent);
  if (e > fixedNum1.exponent) {
    fixedNum1 = fixToExponent(fixedNum1, e);
  } else {
    fixedNum2 = fixToExponent(fixedNum2, e);
  }

  let len = Math.max(fixedNum1.count.length, fixedNum2.count.length);
  let count = new Array(len);
  let flag = 0;

  // num1位数必然比num2大，因此不用考虑无法借位的情况
  while (len-- > 0) {
    let f = (fixedNum1.count[len] || 0) - (fixedNum2.count[len] || 0) - flag;
    if (f < 0) {
      count[len] = 10 + f;
      flag = 1;
    } else {
      count[len] = f;
      flag = 0;
    }
  }

  return stringify({
    count,
    signal: fixedNum1.signal,
    exponent: e
  });
}

export function multiplication (num1, num2) {
  if (num1 === 0 || num2 === 0) return '0';

  let fixedNum1 = parse(num1);
  let fixedNum2 = parse(num2);

  let e = fixedNum1.exponent + fixedNum2.exponent + 1; // a.bc * e.f = g.hijk * 10 指数需要添加一位
  let len = fixedNum1.count.length + fixedNum2.count.length;
  let count = new Array(len);
  for (let i = 0; i < len; i++) count[i] = 0;

  let flag = 0;
  let len1 = fixedNum1.count.length - 1;
  let len2 = fixedNum2.count.length - 1;
  for (let i = len1; i >= 0; i--) {
    for (let j = len2; j >= 0; j--) {
      let countIndex = len - 1 - (len1 - i) - (len2 - j);
      let sum = count[countIndex] + fixedNum1.count[i] * fixedNum2.count[j] + flag;
      count[countIndex] = sum % 10;
      flag = Math.floor(sum / 10);
    }
  }

  if (flag) count[0] = flag; // 乘法溢出，造成多位

  return stringify({
    count,
    signal: fixedNum1.signal === fixedNum2.signal ? 1 : -1,
    exponent: e
  });
}

export function division (num1, num2) {
  if (num1 === 0 && num2 === 0) return NaN;
  if (num1 === 0) return 0;
  if (num2 === 0) return num1 / num2; // infinity精确度没有意义...

  let fixedNum1 = parse(num1);
  let fixedNum2 = parse(num2);

  let e = fixedNum1.exponent - fixedNum2.exponent;
  let dividend = fixedNum1.count.concat();
  let divisor = fixedNum2.count.concat();
  let divisorLength = divisor.length;

  // 补齐dividend
  if (dividend.length < divisorLength) {
    for (let i = 0; i < divisorLength; i++) dividend.push(0);
  }

  let index = 0;
  let tmpDividend = dividend.slice(0, divisorLength);
  if (!judgeNoLessThan(tmpDividend, divisor)) e--; // 如果第一次需要借位，说明exponent需要再减1

  let c = [0];
  let tmp = 0;
  while (!(isZero(tmpDividend) && index + divisorLength >= dividend.length) && index < MAX_EXP) { // 防止无限循环
    tmp = 0;
    while (
      !judgeNoLessThan(tmpDividend, divisor) &&
      !(isZero(tmpDividend) && index + divisorLength >= dividend.length)
    ) { // 需要补齐
      tmpDividend.push(dividend[index + divisorLength] || 0);
      tmpDividend = rmZero(tmpDividend);
      index++;
      c[index] = 0;
    }

    while (judgeNoLessThan(tmpDividend, divisor)) {
      tmpDividend = minusArray(tmpDividend, divisor);
      tmp++;
    }

    c[index] = tmp;
  }

  // MAX_LEN位四舍五入
  if (c[MAX_EXP] !== void 0) {
    c[MAX_EXP - 1] += c[MAX_EXP] > 4 ? 1 : 0;
    c.length = MAX_EXP - 1;
  }

  return stringify({
    count: c,
    signal: fixedNum1.signal === fixedNum2.signal ? 1 : -1,
    exponent: e
  });
}
