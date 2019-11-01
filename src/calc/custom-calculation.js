/**
 * 自组计算逻辑
 * 组合数组，类似手工四则运算
 * 优点 精确度高 理论上精度无限制
 * 缺点 需要额外的存储空间，计算成本也较高 数据格式需要转化，因此在链式计算时的处理比较复杂
 * 适用场景 比较复杂的计算场景 对精度要求高的场景 数值较大或较长，会超出安全范围的计算
 */

import { normalize, isZero, getNumComponent } from '../utils';
import Calculation from './index';

/**
 * 数据格式化整理，将数据转变为 count[0].count[1]count[2]... * 10^exponent 的形式
 * @param {Number|String} number
 * @returns {<{ signal, exponent, count }>}
 */
function parse (number) {
  let { integer, decimal, expFlag, exp } = getNumComponent(number); // getNumComponent内部进行了valid判断
  exp = Number(`${expFlag}${exp}`);

  if (isZero(number)) {
    return {
      signal: 1,
      exponent: 0,
      count: [0]
    };
  }

  let signal = Number(number) < 0 ? -1 : 1;

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

/**
 * 将格式化数据转为字符串
 * @param {<{ signal, exponent, count }>} param0
 * @returns {String}
 */
function stringify ({ signal = 1, exponent = 0, count = [] } = {}) {
  let index = 1 + exponent;

  // index <= 0 时，在前侧填满0
  if (index <= 0) {
    for (; index < 1; index++) {
      count.unshift('0');
    }
  }

  // index > count.length 时，在后侧填满0
  if (index >= count.length) {
    for (; count.length <= index;) {
      count[count.length] = '0';
    }
  }

  // 添加小数点
  count.splice(index, 0, '.');

  let num = normalize(count.join(''));
  if (!isZero(num)) num = (signal < 0 ? '-' : '') + num;

  return num;
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

function minusArray (arr1, arr2) {
  // arr1一定大于arr2
  let len1 = arr1.length;
  let len2 = arr2.length;
  let count = new Array(len1);
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

function isZeroArr (arr) {
  return arr.length === 1 && arr[0] === 0;
}
export default class CustomCalculation extends Calculation {
  add (num1, num2) {
    let fixedNum1 = parse(num1);
    let fixedNum2 = parse(num2);

    if (fixedNum1.signal !== fixedNum2.signal) {
      return this.minus(num1, this.multiplication(num2, -1));
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

  minus (num1, num2) {
    let fixedNum1 = parse(num1);
    let fixedNum2 = parse(num2);

    if (fixedNum1.signal !== fixedNum2.signal) {
      return this.add(num1, this.multiplication(num2, -1));
    }

    if (Math.abs(num1) < Math.abs(num2)) {
      return this.multiplication(-1, this.minus(num2, num1));
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

  multiplication (num1, num2) {
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
        let sum =
          count[countIndex] + fixedNum1.count[i] * fixedNum2.count[j] + flag;
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

  division (num1, num2) {
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

    let c = [0];
    let tmp = 0;
    while (
      !(isZeroArr(tmpDividend) && index + divisorLength >= dividend.length) &&
      index < this.precision
    ) {
      // 防止无限循环
      tmp = 0;
      while (
        !judgeNoLessThan(tmpDividend, divisor) &&
        !(isZeroArr(tmpDividend) && index + divisorLength >= dividend.length)
      ) {
        // 需要补齐
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
    if (c[this.precision] !== void 0) {
      c[this.precision - 1] += c[this.precision] > 4 ? 1 : 0;
      c.length = this.precision;
    }

    return stringify({
      count: c,
      signal: fixedNum1.signal === fixedNum2.signal ? 1 : -1,
      exponent: e
    });
  }
}
