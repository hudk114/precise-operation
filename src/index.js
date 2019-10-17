import {
  isInteger
} from './utils';
import * as precision from './precision';
import * as parseToInt from './parse-to-int';
import * as customCal from './custom-calculation';

export function add (num1, num2, ...rest) {
  if (rest.length) return add(Number(add(num1, num2)), ...rest);
  if (isInteger(num1) && isInteger(num2)) return num1 + num2;

  return precision.add(num1, num2);
  // return parseToInt.add(num1, num2);
  // return customCal.add(num1, num2);
}

export function minus (num1, num2, ...rest) {
  if (rest.length) return minus(Number(minus(num1, num2)), ...rest);
  if (isInteger(num1) && isInteger(num2)) return num1 - num2;

  return precision.minus(num1, num2);
  // return parseToInt.minus(num1, num2);
  // return customCal.minus(num1, num2);
}

export function multiplication (num1, num2, ...rest) {
  if (rest.length) return multiplication(Number(multiplication(num1, num2)), ...rest);
  if (isInteger(num1) && isInteger(num2)) return num1 * num2;

  return precision.multiplication(num1, num2);
  // return parseToInt.multiplication(num1, num2);
  // return customCal.multiplication(num1, num2);
}

export function division (num1, num2, ...rest) {
  if (rest.length) return division(Number(division(num1, num2)), ...rest);
  if (isInteger(num1) && isInteger(num2)) return num1 / num2;

  return precision.division(num1, num2);
  // return parseToInt.division(num1, num2);
  // return customCal.division(num1, num2);
}
