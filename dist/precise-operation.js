(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global['precise-operation'] = {})));
}(this, (function (exports) { 'use strict';

  /**
   * 抛出的所有异常信息
   */

  /**
   * 输入错误，输入非标准错误抛出的异常
   */
  function paraError() {
    throw new TypeError('输入参数错误');
  }

  const numRegExp = /^([+-]?)(\d+)(\.(\d*))?(e([+-]?)(\d+))?$/;
  /**
   * 判断num是否是数字或可以转化为数字的字符串
   * @param {Number|String} num
   * @returns {boolean}
   */

  function isNum(num) {
    if (typeof num !== 'number' && typeof num !== 'string') return false;
    return isNaN(num) || num !== '' && !isNaN(Number(num));
  }
  /**
   * 判断输入的num是有效数字：数字，且非NaN，Infintiy
   * @param {Number|String} num
   * @returns {boolean}
   */

  function isValidNum(num) {
    return numRegExp.test(num.toString());
  }
  /**
   * 判断num是否整数或整数字符串
   * @param {Number|String} num
   * @returns {boolean}
   */

  function isInt(num) {
    return isValidNum(num) && !getDecimalLength(num);
  }
  /**
   * 判断num是否为NaN或'NaN'
   * @param {Number|String} num
   * @returns {boolean}
   */

  function isNaN(num) {
    return num.toString() === 'NaN';
  }
  /**
   * 判断num为Infinity
   * @param {Number|String} num
   * @returns {boolean}
   */

  function isInfinite(num) {
    return !isFinite(Number(num));
  }
  /**
   * num is 0, '0', '+0', '-0'
   * @param {Number|String} num
   * @returns {boolean}
   */

  function isZero(num) {
    return num === 0 || num === '0' || num === '+0' || num === '-0';
  }
  /**
   * 获取num各部分的组成数值
   * @param {Number|String} num
   * @returns {<{ flag, integer, decimal, expFlag, exp }>}
   */

  function getNumComponent(num) {
    const match = num.toString().match(numRegExp) || [];
    return {
      flag: match[1] || '',
      // 正负值
      integer: match[2] || '',
      // 整数部分
      decimal: match[4] || '',
      // 小数部分
      expFlag: match[6] || '',
      // 指数正负值
      exp: match[7] || '' // 指数，指数部分不包含小数

    };
  }
  /**
   * 获取num的小数点长度
   * @param {Number|String} num
   * @returns {Number}
   */

  function getDecimalLength(num) {
    if (!isValidNum(num)) return 0;
    const {
      decimal,
      expFlag,
      exp
    } = getNumComponent(num);
    return decimal.length - Number(`${expFlag}${exp}`);
  }
  /**
   * 从str中的开头开始清除所有连续char
   * char === 0, '0013' -> '13'
   * @param {String} str
   * @param {String} char
   * @returns {String}
   */

  function rmStartChar(str, char) {
    let s = str.split('');
    let index = s.findIndex(c => char !== c);
    if (index === -1) return '';
    return s.slice(index).join('');
  }
  /**
   * 从str中的结尾开始清除所有连续char
   * char === 0, '1300' -> '13'
   * @param {String} str
   * @param {String} char
   * @returns {String}
   */

  function rmEndChar(str, char) {
    let s = str.split('').reverse();
    let index = s.findIndex(c => char !== c);
    if (index === -1) return '';
    return s.slice(index).reverse().join('');
  }
  /**
   * 字符串数字标准化处理，去掉不必要的0
   * 0.00 -> '0'
   * 00234 -> '234'
   * 234.500 -> '234.5'
   * -01.20e03 -> '-1.2e3'
   * @param {String} num
   * @returns {String}
   */

  function normalize(num) {
    if (isNaN(num) || isInfinite(num)) return num;
    if (!isValidNum(num)) paraError();
    let {
      flag,
      integer,
      decimal,
      expFlag,
      exp
    } = getNumComponent(num);
    integer = rmStartChar(integer, '0') || '0'; // integer部分必须有值

    decimal = rmEndChar(decimal, '0');
    exp = rmStartChar(exp, '0');
    return `${flag}${integer}${decimal ? '.' + decimal : ''}${exp ? 'e' + expFlag + exp : ''}`;
  }

  /**
   * 对四则运算的参数进行提前验证及计算
   * 验证出错 抛出异常
   */
  function preCheck(num1, num2) {
    if (!isNum(num1) || !isNum(num2)) paraError();
  }

  /**
   * 数字预处理，转化为字符串
   * 对非标准数据进行预处理，去掉不必要的0
   * 0.00 -> '0'
   * 00234 -> '234'
   * 234.500 -> '234.5'
   * -01.20e03 -> '-1.2e3'
   * @param {Number|String} num
   * @returns {String}
   */

  function preProcess(num) {
    if (typeof num === 'number') {
      // -0特殊转化
      if (num === 0 && 1 / num < 0) return '-0';
      return num.toString();
    }

    return normalize(num);
  }

  /**
   * 预计算函数
   * 对整数、NaN、Infinity等不需要使用precise-calc的数进行计算
   * 若使用了预计算 返回 { calc: true, val }
   * 否则返回 { calc: false, val: -1 }
   */
  const naN = {
    calc: true,
    val: 'NaN'
  };
  const falsy = {
    calc: false,
    val: -1
  };
  /**
   * 预计算的decorator
   * 对于所有四则运算，其中一方为NaN的时候，计算结果必然为NaN
   * 至少一方为Infinity，或者两者均为整数时，precision计算无必要，此时采用func的计算结果
   * 除此之外的加减运算需通过precision计算完成
   * @param {Function} func
   * @returns {Function}
   */

  function preDecorator(func) {
    /**
     * 预计算函数
     * @param {Number|String} num1
     * @param {Number|String} num2
     * @returns {<{calc, val}>}
     */
    return (num1, num2) => {
      if (isNaN(num1) || isNaN(num2)) return naN;

      if (isInfinite(num1) || isInfinite(num2) || isInt(num1) && isInt(num2)) {
        return {
          calc: true,
          val: func(num1, num2)
        };
      }

      return falsy;
    };
  }

  const preAdd = preDecorator((a, b) => (Number(a) + Number(b)).toString());
  const preMinus = preDecorator((a, b) => (Number(a) - Number(b)).toString());
  /**
   * 预计算乘法
   * @param {Number|String} num1
   * @param {Number|String} num2
   * @returns {<{calc, val}>}
   */

  function preMulti(num1, num2) {
    if (isNaN(num1) || isNaN(num2)) return naN;

    if (isInfinite(num1) || isInfinite(num2) || isInt(num1) && isInt(num2)) {
      return {
        calc: true,
        val: (Number(num1) * Number(num2)).toString()
      };
    }

    if (isZero(num1) || isZero(num2)) {
      return {
        calc: true,
        val: '0'
      };
    }

    return falsy;
  }
  /**
   * 预计算除法
   * 与其余几个预处理方法不同，整数除法不会被预处理
   * @param {Number|String} num1
   * @param {Number|String} num2
   * @returns {<{calc, val}>}
   */

  function preDivision(num1, num2) {
    if (isNaN(num1) || isNaN(num2)) return naN;
    if (isZero(num1) && isZero(num2)) return naN;

    if (isInfinite(num1) || isInfinite(num2) || isZero(num1) || isZero(num2)) {
      return {
        calc: true,
        val: (Number(num1) / Number(num2)).toString()
      };
    }

    return falsy;
  }

  /**
   * Caclulation基类
   */
  class Calculation {
    constructor(precision) {
      this.precision = precision;
    }

    add(num1, num2) {
      return num1 + num2;
    }

    minus(num1, num2) {
      return num1 - num2;
    }

    multiplication(num1, num2) {
      return num1 * num2;
    }

    division(num1, num2) {
      return num1 / num2;
    }

  }

  /**
   * 直接使用toPrecision
   * 优点 简单 系统方法 无需额外代码实现
   * 缺点 对超过precision范围的计算会丢失精度，需要自己手动传入 链式计算中的丢失精度会被放大
   * 适用场景 位数少的简单计算
   */

  /**
   * 配置文件
   * 后续这些东西可提供接口供调用者修改
   */

  const MAX_EXP = 21;
   // 超出安全范围时是否打印warning

  /**
   * 将浮点数转化为整数进行计算的方式
   * 参考precise-operation
   * 优点 相对简单 精确度比较高
   * 缺点 无法对超出Number.MAX_SAFE_INTEGER的数据进行精确计算，会丢失精确度
   * 适用场景 位数较少，计算范围不会超出安全范围的计算
   */

  /**
   * 自组计算逻辑
   * 组合数组，类似手工四则运算
   * 优点 精确度高 理论上精度无限制
   * 缺点 需要额外的存储空间，计算成本也较高 数据格式需要转化，因此在链式计算时的处理比较复杂
   * 适用场景 比较复杂的计算场景 对精度要求高的场景 数值较大或较长，会超出安全范围的计算
   * 后续改进 1. 建立<{ signal: Number, exponent: Number, count: Array<Number> }> 的数据结构
   */
  /**
   * 数据格式化整理，将数据转变为 count[0].count[1]count[2]... * 10^exponent 的形式
   * @param {Number|String} number
   * @returns {<{ signal, exponent, count }>}
   */

  function parse(number) {
    let {
      integer,
      decimal,
      expFlag,
      exp
    } = getNumComponent(number); // getNumComponent内部进行了valid判断

    exp = Number(`${expFlag}${exp}`);

    if (isZero(number)) {
      return {
        signal: 1,
        exponent: 0,
        count: [0]
      };
    }

    let signal = Number(number) < 0 ? -1 : 1; // interger

    let s = integer.split('').map(s => Number(s));

    while (s.length && s[0] === 0) s.shift();

    let exponent = Number(exp) + s.length - 1;
    let count = [];
    count.push(...s); // decimal

    s = decimal.split('').map(s => Number(s)); // count没有内容到时候需要将0去掉

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


  function stringify({
    signal = 1,
    exponent = 0,
    count = []
  } = {}) {
    let index = 1 + exponent; // index <= 0 时，在前侧填满0

    if (index <= 0) {
      for (; index < 1; index++) {
        count.unshift('0');
      }
    } // index > count.length 时，在后侧填满0


    if (index >= count.length) {
      for (; count.length <= index;) {
        count[count.length] = '0';
      }
    } // 添加小数点


    count.splice(index, 0, '.');
    let num = normalize(count.join(''));
    if (!isZero(num)) num = (signal < 0 ? '-' : '') + num;
    return num;
  }
  /**
   * 根据exp补全number中count的零
   * @param {{<{ signal, exponent, count }>}} number
   * @param {Number} exp
   * @returns {<{ signal, exponent, count }>}
   */


  function fixToExp(number, exp) {
    let len = exp - number.exponent;

    while (len > 0) {
      number.count.unshift(0);
      len--;
    }

    return number;
  }
  /**
   * 比较 arr1 与 arr2 的大小
   * @param {Array<Number>} arr1
   * @param {Array<Number>} arr2
   * @returns {Number} 1: arr1 > arr2 0: arr1 === arr2 -1: arr1 < arr2
   */


  function compareArrNum(arr1, arr2) {
    if (arr1.length > arr2.length) return 1;
    if (arr1.length < arr2.length) return -1;
    let i = 0;

    while (i < arr1.length) {
      if (arr1[i] > arr2[i]) {
        return 1;
      }

      if (arr1[i] < arr2[i++]) {
        return -1;
      }
    }

    return 0;
  }
  /**
   * Math.abs(arr1 - arr2)
   * @param {Array<Number>} arr1
   * @param {Array<Number>} arr2
   * @returns {Array<Number>}
   */


  function minusArray(arr1, arr2) {
    if (compareArrNum(arr1, arr2) < 0) return minusArray(arr2, arr1); // arr1一定大于arr2

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

    return rmStartZero(count);
  }
  /**
   * 去掉number中起始不必要的0
   * @param {Array<Number>} number
   * @returns {Array<Number>}
   */


  function rmStartZero(number) {
    while (number.length && number[0] === 0) {
      number.shift();
    }

    if (!number.length) number = [0]; // 没有的情况下必须给一个0

    return number;
  }
  /**
   * 判断number是否为0
   * @param {Array<Number>} number
   * @returns {Array<Number>}
   */


  function isZeroNum(number) {
    return number.length === 1 && number[0] === 0;
  }

  class CustomCalculation extends Calculation {
    add(num1, num2) {
      let fixedNum1 = parse(num1);
      let fixedNum2 = parse(num2);

      if (fixedNum1.signal !== fixedNum2.signal) {
        return this.minus(num1, this.multiplication(num2, -1));
      }

      let e = Math.max(fixedNum1.exponent, fixedNum2.exponent);

      if (e > fixedNum1.exponent) {
        fixedNum1 = fixToExp(fixedNum1, e);
      } else {
        fixedNum2 = fixToExp(fixedNum2, e);
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

    minus(num1, num2) {
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
        fixedNum1 = fixToExp(fixedNum1, e);
      } else {
        fixedNum2 = fixToExp(fixedNum2, e);
      }

      let len = Math.max(fixedNum1.count.length, fixedNum2.count.length);
      let count = new Array(len);
      let flag = 0; // num1位数必然比num2大，因此不用考虑无法借位的情况

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

    multiplication(num1, num2) {
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

    division(num1, num2) {
      let fixedNum1 = parse(num1);
      let fixedNum2 = parse(num2);
      let e = fixedNum1.exponent - fixedNum2.exponent;
      let dividend = fixedNum1.count.concat();
      let divisor = fixedNum2.count.concat();
      let divisorLength = divisor.length; // 补齐dividend

      if (dividend.length < divisorLength) {
        for (let i = 0; i < divisorLength; i++) dividend.push(0);
      }

      let index = 0;
      let tmpDividend = dividend.slice(0, divisorLength);
      let c = [0];
      let tmp = 0;

      while (!(isZeroNum(tmpDividend) && index + divisorLength >= dividend.length) && index < this.precision) {
        // 防止无限循环
        tmp = 0;

        while (compareArrNum(tmpDividend, divisor) === -1 && !(isZeroNum(tmpDividend) && index + divisorLength >= dividend.length)) {
          // 需要补齐
          tmpDividend.push(dividend[index + divisorLength] || 0);
          tmpDividend = rmStartZero(tmpDividend);
          index++;
          c[index] = 0;
        }

        while (compareArrNum(tmpDividend, divisor) > -1) {
          tmpDividend = minusArray(tmpDividend, divisor);
          tmp++;
        }

        c[index] = tmp;
      } // MAX_LEN位四舍五入


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

  // const calculation = new ParseToIntCalculation(MAX_DECIMAL);

  const calculation = new CustomCalculation(MAX_EXP);
  /**
   * 精确的加法计算
   * @param {Number|String} num1
   * @param {Number|String} num2
   * @param  {...<Number|String>} rest 剩余加数
   * @returns {String}
   */

  function add(num1, num2, ...rest) {
    if (rest.length) return add(add(num1, num2), ...rest);
    preCheck(num1, num2);
    const n1 = preProcess(num1);
    const n2 = preProcess(num2);
    const res = preAdd(n1, n2);
    if (res.calc) return res.val;
    return calculation.add(n1, n2);
  }
  /**
   * 精确的减法计算
   * @param {Number|String} num1 被减数
   * @param {Number|String} num2 减数
   * @param  {...<Number|String>} rest 剩余减数
   * @returns {String}
   */

  function minus(num1, num2, ...rest) {
    if (rest.length) return minus(minus(num1, num2), ...rest);
    preCheck(num1, num2);
    const n1 = preProcess(num1);
    const n2 = preProcess(num2);
    const res = preMinus(n1, n2);
    if (res.calc) return res.val;
    return calculation.minus(n1, n2);
  }
  /**
   * 精确的乘法计算
   * @param {Number|String} num1 被乘数
   * @param {Number|String} num2 乘数
   * @param  {...<Number|String>} rest 剩余乘数
   * @returns {String}
   */

  function multiplication(num1, num2, ...rest) {
    if (rest.length) return multiplication(multiplication(num1, num2), ...rest);
    preCheck(num1, num2);
    const n1 = preProcess(num1);
    const n2 = preProcess(num2);
    const res = preMulti(n1, n2);
    if (res.calc) return res.val;
    return calculation.multiplication(n1, n2);
  }
  /**
   * 精确的除法计算
   * @param {Number|String} num1 被除数
   * @param {Number|String} num2 除数
   * @param  {...<Number|String>} rest 剩余除数
   * @returns {String}
   */

  function division(num1, num2, ...rest) {
    if (rest.length) return division(division(num1, num2), ...rest);
    preCheck(num1, num2);
    const n1 = preProcess(num1);
    const n2 = preProcess(num2);
    const res = preDivision(n1, n2);
    if (res.calc) return res.val;
    return calculation.division(n1, n2);
  }

  exports.add = add;
  exports.minus = minus;
  exports.multiplication = multiplication;
  exports.division = division;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
