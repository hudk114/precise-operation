import {
  isInteger
} from './utils';
import * as floatToInt from './float-to-int';
import * as precision from './precision';
import * as customCal from './custom-calculation';

export function add (num1, num2, ...rest) {
  if (rest.length) return add(Number(add(num1, num2)), ...rest);
  if (isInteger(num1) && isInteger(num2)) return num1 + num2;

  return precision.add(num1, num2);
  // return floatToInt.add(num1, num2);
  // return customCal.add(num1, num2);
}

export function minus (num1, num2, ...rest) {
  if (rest.length) return minus(Number(minus(num1, num2)), ...rest);
  if (isInteger(num1) && isInteger(num2)) return num1 - num2;

  return precision.minus(num1, num2);
  // return floatToInt.minus(num1, num2);
  // return customCal.minus(num1, num2);
}

export function multiplication (num1, num2, ...rest) {
  if (rest.length) return multiplication(Number(multiplication(num1, num2)), ...rest);
  if (isInteger(num1) && isInteger(num2)) return num1 * num2;

  return precision.multiplication(num1, num2);
  // return floatToInt.multiplication(num1, num2);
  // return customCal.multiplication(num1, num2);
}

export function division (num1, num2, ...rest) {
  if (rest.length) return division(Number(division(num1, num2)), ...rest);
  if (isInteger(num1) && isInteger(num2)) return num1 / num2;

  return precision.division(num1, num2);
  // return floatToInt.division(num1, num2);
  // return customCal.division(num1, num2);
}
