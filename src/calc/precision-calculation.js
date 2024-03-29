/**
 * 直接使用toPrecision
 * 优点 简单 系统方法 无需额外代码实现
 * 缺点 对超过precision范围的计算会丢失精度，需要自己手动传入 链式计算中的丢失精度会被放大
 * 适用场景 位数少的简单计算
 */

import Calculation from './calculation';

function toPrecision(number, precision) {
  return Number(number.toPrecision(precision)).toString();
}

export default class PrecisionCalculation extends Calculation {
  add(num1, num2) {
    return toPrecision(Number(num1) + Number(num2), this.precision);
  }

  minus(num1, num2) {
    return toPrecision(Number(num1) - Number(num2), this.precision);
  }

  multiplication(num1, num2) {
    return toPrecision(Number(num1) * Number(num2), this.precision);
  }

  division(num1, num2) {
    return toPrecision(Number(num1) / Number(num2), this.precision);
  }
}
