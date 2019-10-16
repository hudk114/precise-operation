/**
 * 直接使用toPrecision
 * 优点 实现简单
 * 缺点 不够精确，尤其对于超过precision范围的小数计算会失真；进行了toPrecision后，链式计算中失真会被放大；
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
