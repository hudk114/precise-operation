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
  }

  function isInteger(number) {
    return !getDecimalLength(number);
  }

  var MAX_DECIMAL = 15; // js自动取整会为16位小数

  /**
   * 直接使用toPrecision
   * 优点 简单 系统方法 无需额外代码实现
   * 缺点 对超过precision范围的计算会丢失精度，需要自己手动传入 链式计算中的丢失精度会被放大
   * 适用场景 位数少的简单计算
   */

  function toPrecision(number) {
    var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : MAX_DECIMAL;

    return Number(number.toPrecision(precision));
  }

  function add(num1, num2, precision) {
    return toPrecision(num1 + num2, precision);
  }

  function multiplication(num1, num2, precision) {
    return toPrecision(num1 * num2, precision);
  }

  function division(num1, num2, precision) {
    return toPrecision(num1 / num2, precision);
  }

  /**
   * 将浮点数转化为整数进行计算的方式
   * 参考precise-operation
   * 优点 相对简单 精确度比较高
   * 缺点 无法对超出Number.MAX_SAFE_INTEGER的数据进行精确计算，会丢失精确度
   * 适用场景 位数较少，计算范围不会超出安全范围的计算
   * 后续改进 更为友好的异常处理
   */

  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

  /**
   * 数据格式化整理，将数据转变为 count[0].count[1]count[2]... * 10^exponent 的形式
   * @param {Number} number
   * @returns {Object}
   */
  function parse(number) {
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

  function stringify() {
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

  function add$2(num1, num2) {
    var fixedNum1 = parse(num1);
    var fixedNum2 = parse(num2);

    if (fixedNum1.signal !== fixedNum2.signal) {
      return minus$2(num1, Number(multiplication$2(num2, -1)));
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

    return stringify({
      count: count,
      signal: fixedNum1.signal,
      exponent: e
    });
  }

  function minus$2(num1, num2) {
    var fixedNum1 = parse(num1);
    var fixedNum2 = parse(num2);

    if (fixedNum1.signal !== fixedNum2.signal) {
      return add$2(num1, Number(multiplication$2(num2, -1)));
    }

    if (Math.abs(num1) < Math.abs(num2)) {
      return multiplication$2(-1, Number(minus$2(num2, num1)));
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

    return stringify({
      count: count,
      signal: fixedNum1.signal,
      exponent: e
    });
  }

  function multiplication$2(num1, num2) {
    if (num1 === 0 || num2 === 0) return '0';

    var fixedNum1 = parse(num1);
    var fixedNum2 = parse(num2);

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

    return stringify({
      count: count,
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

    return add(num1, num2);
    // return parseToInt.add(num1, num2);
    // return customCal.add(num1, num2);
  }

  function minus$3(num1, num2) {
    for (var _len2 = arguments.length, rest = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      rest[_key2 - 2] = arguments[_key2];
    }

    if (rest.length) return minus$3.apply(undefined, [Number(minus$3(num1, num2))].concat(rest));
    if (isInteger(num1) && isInteger(num2)) return num1 - num2;

    // return precision.minus(num1, num2);
    // return parseToInt.minus(num1, num2);
    return minus$2(num1, num2);
  }

  function multiplication$3(num1, num2) {
    for (var _len3 = arguments.length, rest = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
      rest[_key3 - 2] = arguments[_key3];
    }

    if (rest.length) return multiplication$3.apply(undefined, [Number(multiplication$3(num1, num2))].concat(rest));
    if (isInteger(num1) && isInteger(num2)) return num1 * num2;

    return multiplication(num1, num2);
    // return parseToInt.multiplication(num1, num2);
    // return customCal.multiplication(num1, num2);
  }

  function division$3(num1, num2) {
    for (var _len4 = arguments.length, rest = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
      rest[_key4 - 2] = arguments[_key4];
    }

    if (rest.length) return division$3.apply(undefined, [Number(division$3(num1, num2))].concat(rest));
    if (isInteger(num1) && isInteger(num2)) return num1 / num2;

    return division(num1, num2);
    // return parseToInt.division(num1, num2);
    // return customCal.division(num1, num2);
  }

  exports.add = add$3;
  exports.minus = minus$3;
  exports.multiplication = multiplication$3;
  exports.division = division$3;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
