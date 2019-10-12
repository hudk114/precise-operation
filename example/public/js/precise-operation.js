(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global['precise-operation'] = {})));
}(this, (function (exports) { 'use strict';

  function digitLength(number) {
    // TODO rename
    // TODO 科学计数法
    var num = number.toString();
    var digit = num.split('.');
    if (digit.length < 1) {
      return 0;
    }
    return digit[1].length;
  }

  function add(num1, num2) {
    for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      rest[_key - 2] = arguments[_key];
    }

    if (rest.length) return add.apply(undefined, [add(num1, num2)].concat(rest));

    var base = Math.max(digitLength(num1), digitLength(num2));
    var baseNum = Math.pow(10, base);
    return (multiplication(num1, baseNum) + multiplication(num2, baseNum)) / baseNum;
  }

  function minus(num1, num2) {
    for (var _len2 = arguments.length, rest = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      rest[_key2 - 2] = arguments[_key2];
    }

    if (rest.length) return minus.apply(undefined, [minus(num1, num2)].concat(rest));

    var base = Math.max(digitLength(num1), digitLength(num2));
    var baseNum = Math.pow(10, base);
    return (multiplication(num1, baseNum) - multiplication(num2, baseNum)) / baseNum;
  }

  function multiplication(num1, num2) {
    for (var _len3 = arguments.length, rest = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
      rest[_key3 - 2] = arguments[_key3];
    }

    if (rest.length) return multiplication.apply(undefined, [multiplication(num1, num2)].concat(rest));

    // TODO
    return num1 * num2;
  }

  function division(num1, num2) {
    for (var _len4 = arguments.length, rest = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
      rest[_key4 - 2] = arguments[_key4];
    }

    if (rest.length) return division.apply(undefined, [division(num1, num2)].concat(rest));
  }

  exports.add = add;
  exports.minus = minus;
  exports.multiplication = multiplication;
  exports.division = division;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
