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

  /**
   * 库代码入口
   */

  function add(num1, num2) {
    for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      rest[_key - 2] = arguments[_key];
    }

    if (rest.length) return add.apply(undefined, [add(num1, num2)].concat(rest));

    var base = Math.max(digitLength(num1), digitLength(num2));
    var baseNum = Math.pow(10, base);
    return (multiplication(num1, baseNum) + multiplication(num2, baseNum)) / baseNum;
  }

  function multiplication(num1, num2) {
    for (var _len2 = arguments.length, rest = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      rest[_key2 - 2] = arguments[_key2];
    }

    if (rest.length) return multiplication.apply(undefined, [multiplication(num1, num2)].concat(rest));

    // TODO
    return num1 * num2;
  }

  exports.add = add;
  exports.multiplication = multiplication;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
