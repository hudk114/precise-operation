(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global['precise-operation'] = {})));
}(this, (function (exports) { 'use strict';

  function getDecimalLength(number) {
    var regExp = /^[+-]?(\d+)(\.(\d*))?(e([+-]?\d+))?$/;
    var match = number.toString().match(regExp);
    if (!match) {
      throw new TypeError('\u8F93\u5165\u6570\u5B57 ' + number + ' \u4E0D\u7B26\u5408\u89C4\u8303');
    }

    var decimal = match[3] || '';
    var exp = match[5] || 0;

    return decimal.length - exp;

    // // TODO 科学计数法
    // const num = number.toString();
    // const digit = num.split('.');
    // if (digit.length < 2) {
    //   return 0;
    // }
    // return digit[1].length;
  }

  function isInteger(number) {
    return !getDecimalLength(number);
  }

  /**
   * 将浮点数转化为整数进行计算的方式
   * 参考precise-operation
   * 优点 实现较为简单
   * 缺点 对于符号较长的数，容易超出范围
   */

  function rangeCheck(number) {
    if (number > Number.MAX_SAFE_INTEGER || number < Number.MIN_SAFE_INTEGER) {
      throw new RangeError('结果超出范围');
    }
  }

  function add(num1, num2) {
    var base = Math.max(getDecimalLength(num1), getDecimalLength(num2));
    var baseNum = Math.pow(10, base);
    return (multiplication(num1, baseNum) + multiplication(num2, baseNum)) / baseNum;
  }

  function minus(num1, num2) {
    var base = Math.max(getDecimalLength(num1), getDecimalLength(num2));
    var baseNum = Math.pow(10, base);

    return (multiplication(num1, baseNum) - multiplication(num2, baseNum)) / baseNum; // multiplication内部进行过range判断
  }

  function multiplication(num1, num2) {
    var base1 = getDecimalLength(num1);
    var base2 = getDecimalLength(num2);
    var fixedNum1 = num1 * Math.pow(10, base1);
    var fixedNum2 = num2 * Math.pow(10, base2);

    rangeCheck(fixedNum1);
    rangeCheck(fixedNum2);

    var val = fixedNum1 * fixedNum2;
    rangeCheck(val);

    return val / Math.pow(10, base1 + base2);
  }

  function division(num1, num2) {
    var base1 = getDecimalLength(num1);
    var base2 = getDecimalLength(num2);
    var fixedNum1 = num1 * Math.pow(10, base1);
    var fixedNum2 = num2 * Math.pow(10, base2);

    rangeCheck(fixedNum1);
    rangeCheck(fixedNum2);

    var val = fixedNum1 / fixedNum2;
    rangeCheck(val);

    return val / Math.pow(10, base1 + base2);
  }

  var MAX_EXP = 21;

  /**
   * 直接使用toPrecision
   * 优点 实现简单
   * 缺点 不够精确，尤其对于超过precision范围的小数计算会失真；进行了toPrecision后，链式计算中失真会被放大；
   */

  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

  /**
   * 数据格式化整理，将数据转变为 count[0].count[1]count[2]... * 10^exponent 的形式
   * @param {Number} number
   * @returns {Object}
   */
  function stringify(number) {
    if (number === 0) {
      return {
        signal: 1,
        exponent: 0,
        count: [0]
      };
    }

    var regExp = /^[+-]?(\d+)(\.(\d*))?(e([+-]?\d+))?$/;
    var match = number.toString().match(regExp);
    if (!match) {
      throw new TypeError('\u8F93\u5165\u6570\u5B57 ' + number + ' \u4E0D\u7B26\u5408\u89C4\u8303');
    }

    var integer = match[1];
    var decimal = match[3] || '';
    var exp = match[5] || 0;

    var signal = number < 0 ? -1 : 1;

    // interger
    var s = integer.split('').map(function (s) {
      return Number(s);
    });
    while (s.length && s[0] === 0) {
      s.shift();
    }var exponent = Number(exp) + s.length - 1;
    var count = [];
    count.push.apply(count, _toConsumableArray(s));

    // decimal
    s = decimal.split('').map(function (s) {
      return Number(s);
    });
    // count没有内容到时候需要将0去掉
    if (!count.length) {
      // 去掉0并修改exponent
      if (s.length) {
        var zeroCount = s.findIndex(function (s) {
          return s !== 0;
        });
        if (zeroCount > 0) {
          exponent -= zeroCount;
          s = s.slice(zeroCount);
        }
      }
    }

    count.push.apply(count, _toConsumableArray(s));

    return {
      signal: signal,
      exponent: exponent,
      count: count
    };
  }

  // TODO
  function parse() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$signal = _ref.signal,
        signal = _ref$signal === undefined ? 1 : _ref$signal,
        _ref$exponent = _ref.exponent,
        exponent = _ref$exponent === undefined ? 0 : _ref$exponent,
        _ref$count = _ref.count,
        count = _ref$count === undefined ? [] : _ref$count;

    if (count.length === 1 && count[0] === 0) return '0';

    var number = '' + (signal < 0 ? '-' : '');
    number += count[0];
    if (count.length > 1) number += '.';
    for (var i = 1; i < count.length; i++) {
      number += count[i];
    }
    if (exponent !== 0) number += 'e' + exponent;

    return Number(number).toFixed(Math.max(0, count.length - 1 - exponent));
  }

  function fixToExponent(number, exponent) {
    // exponent >= number.exponent
    var len = exponent - number.exponent;
    while (len > 0) {
      number.count.unshift(0);
      len--;
    }

    return number;
  }

  function compareABS(number1, number2) {
    return Math.abs(number1) >= Math.abs(number2);
  }

  /**
   * 比较 arr1 是否大于等于 arr2
   * @param {Array<Number>} arr1
   * @param {Array<Number>} arr2
   */
  function judgeNoLessThan(arr1, arr2) {
    if (arr1.length > arr2.length) return true;
    if (arr1.length < arr2.length) return false;
    var i = 0;
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

  function minusArray(arr1, arr2) {
    // arr1一定大于arr2
    var len1 = arr1.length;
    var len2 = arr2.length;
    var count = new Array(len1);
    var flag = 0;
    for (var i = 0; i < len1; i++) {
      var sum = arr1[len1 - i - 1] - (arr2[len2 - i - 1] || 0) - flag;
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

  function rmZero(count) {
    while (count.length && count[0] === 0) {
      count.shift();
    }
    if (!count.length) count = [0];

    return count;
  }

  function isZero(arr) {
    return arr.length === 1 && arr[0] === 0;
  }

  function add$2(num1, num2) {
    var fixedNum1 = stringify(num1);
    var fixedNum2 = stringify(num2);

    if (fixedNum1.signal !== fixedNum2.signal) {
      return minus$2(num1, multiplication$2(num2, -1));
    }

    var e = Math.max(fixedNum1.exponent, fixedNum2.exponent);
    if (e > fixedNum1.exponent) {
      fixedNum1 = fixToExponent(fixedNum1, e);
    } else {
      fixedNum2 = fixToExponent(fixedNum2, e);
    }

    var len = Math.max(fixedNum1.count.length, fixedNum2.count.length);
    var count = new Array(len);
    var flag = 0;

    while (len-- > 0) {
      var f = (fixedNum1.count[len] || 0) + (fixedNum2.count[len] || 0) + flag;
      count[len] = f % 10;
      flag = Math.floor(f / 10);
    }

    if (flag) {
      e++;
      count.unshift(1);
    }

    return parse({
      count: count,
      signal: fixedNum1.signal,
      exponent: e
    });
  }

  function minus$2(num1, num2) {
    var fixedNum1 = stringify(num1);
    var fixedNum2 = stringify(num2);

    if (fixedNum1.signal !== fixedNum2.signal) {
      return add$2(num1, multiplication$2(num2, -1));
    }

    if (!compareABS(num1, num2)) {
      return multiplication$2(-1, minus$2(multiplication$2(-1, num2), multiplication$2(-1, num1)));
    }

    var e = Math.max(fixedNum1.exponent, fixedNum2.exponent);
    if (e > fixedNum1.exponent) {
      fixedNum1 = fixToExponent(fixedNum1, e);
    } else {
      fixedNum2 = fixToExponent(fixedNum2, e);
    }

    var len = Math.max(fixedNum1.count.length, fixedNum2.count.length);
    var count = new Array(len);
    var flag = 0;

    // num1位数必然比num2大，因此不用考虑无法借位的情况
    while (len-- > 0) {
      var f = (fixedNum1.count[len] || 0) - (fixedNum2.count[len] || 0) - flag;
      if (f < 0) {
        count[len] = 10 + f;
        flag = 1;
      } else {
        count[len] = f;
        flag = 0;
      }
    }

    return parse({
      count: count,
      signal: fixedNum1.signal,
      exponent: e
    });
  }

  function multiplication$2(num1, num2) {
    if (num1 === 0 || num2 === 0) return '0';

    var fixedNum1 = stringify(num1);
    var fixedNum2 = stringify(num2);

    var e = fixedNum1.exponent + fixedNum2.exponent + 1; // a.bc * e.f = g.hijk * 10 指数需要添加一位
    var len = fixedNum1.count.length + fixedNum2.count.length;
    var count = new Array(len);
    for (var i = 0; i < len; i++) {
      count[i] = 0;
    }var flag = 0;
    var len1 = fixedNum1.count.length - 1;
    var len2 = fixedNum2.count.length - 1;
    for (var _i = len1; _i >= 0; _i--) {
      for (var j = len2; j >= 0; j--) {
        var countIndex = len - 1 - (len1 - _i) - (len2 - j);
        var sum = count[countIndex] + fixedNum1.count[_i] * fixedNum2.count[j] + flag;
        count[countIndex] = sum % 10;
        flag = Math.floor(sum / 10);
      }
    }

    if (flag) count[0] = flag; // 乘法溢出，造成多位

    return parse({
      count: count,
      signal: fixedNum1.signal === fixedNum2.signal ? 1 : -1,
      exponent: e
    });
  }

  function division$2(num1, num2) {
    if (num1 === 0 && num2 === 0) return NaN;
    if (num1 === 0) return 0;
    if (num2 === 0) return num1 / num2; // infinity精确度没有意义...

    var fixedNum1 = stringify(num1);
    var fixedNum2 = stringify(num2);

    var e = fixedNum1.exponent - fixedNum2.exponent;
    var dividend = fixedNum1.count.concat();
    var divisor = fixedNum2.count.concat();
    var divisorLength = divisor.length;

    // 补齐dividend
    if (dividend.length < divisorLength) {
      for (var i = 0; i < divisorLength; i++) {
        dividend.push(0);
      }
    }

    var index = 0;
    var tmpDividend = dividend.slice(0, divisorLength);
    if (!judgeNoLessThan(tmpDividend, divisor)) e--; // 如果第一次需要借位，说明exponent需要再减1

    var c = [0];
    var tmp = 0;
    while (!(isZero(tmpDividend) && index + divisorLength >= dividend.length) && index < MAX_EXP) {
      // 防止无限循环
      tmp = 0;
      while (!judgeNoLessThan(tmpDividend, divisor) && !(isZero(tmpDividend) && index + divisorLength >= dividend.length)) {
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
    if (c[MAX_EXP] !== void 0) {
      c[MAX_EXP - 1] += c[MAX_EXP] > 4 ? 1 : 0;
      c.length = MAX_EXP - 1;
    }

    return parse({
      count: c,
      signal: fixedNum1.signal === fixedNum2.signal ? 1 : -1,
      exponent: e
    });
  }

  function add$3(num1, num2) {
    for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      rest[_key - 2] = arguments[_key];
    }

    if (rest.length) return add$3.apply(undefined, [Number(add$3(num1, num2))].concat(rest));
    if (isInteger(num1) && isInteger(num2)) return num1 + num2;

    // return precision.add(num1, num2);
    return add(num1, num2);
    return add$2(num1, num2);
  }

  function minus$3(num1, num2) {
    for (var _len2 = arguments.length, rest = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      rest[_key2 - 2] = arguments[_key2];
    }

    if (rest.length) return minus$3.apply(undefined, [Number(minus$3(num1, num2))].concat(rest));
    if (isInteger(num1) && isInteger(num2)) return num1 - num2;

    // return precision.minus(num1, num2);
    return minus(num1, num2);
    return minus$2(num1, num2);
  }

  function multiplication$3(num1, num2) {
    for (var _len3 = arguments.length, rest = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
      rest[_key3 - 2] = arguments[_key3];
    }

    if (rest.length) return multiplication$3.apply(undefined, [Number(multiplication$3(num1, num2))].concat(rest));
    if (isInteger(num1) && isInteger(num2)) return num1 * num2;

    // return precision.multiplication(num1, num2);
    return multiplication(num1, num2);
    return multiplication$2(num1, num2);
  }

  function division$3(num1, num2) {
    for (var _len4 = arguments.length, rest = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
      rest[_key4 - 2] = arguments[_key4];
    }

    if (rest.length) return division$3.apply(undefined, [Number(division$3(num1, num2))].concat(rest));
    if (isInteger(num1) && isInteger(num2)) return num1 / num2;

    // return precision.division(num1, num2);
    return division(num1, num2);
    return division$2(num1, num2);
  }

  exports.add = add$3;
  exports.minus = minus$3;
  exports.multiplication = multiplication$3;
  exports.division = division$3;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
