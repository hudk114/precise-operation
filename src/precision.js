/**
 * 直接使用toPrecision
 * 优点 简单 系统方法 无需额外代码实现
 * 缺点 对超过precision范围的计算会丢失精度，需要自己手动传入 链式计算中的丢失精度会被放大
 * 适用场景 位数少的简单计算
 */

import { MAX_DECIMAL } from './config';

function toPrecision (number, precision = MAX_DECIMAL) {
  return Number(number.toPrecision(precision));
}

export function add (num1, num2, precision) {
  return toPrecision(num1 + num2, precision);
}

export function minus (num1, num2, precision) {
  return toPrecision(num1 - num2, precision);
}

export function multiplication (num1, num2, precision) {
  return toPrecision(num1 * num2, precision);
}

export function division (num1, num2, precision) {
  return toPrecision(num1 / num2, precision);
}
