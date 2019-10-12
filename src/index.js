import { digitLength } from './utils';

export function add (num1, num2, ...rest) {
  if (rest.length) return add(add(num1, num2), ...rest);

  let base = Math.max(digitLength(num1), digitLength(num2));
  const baseNum = Math.pow(10, base);
  return (multiplication(num1, baseNum) + multiplication(num2, baseNum)) / baseNum;
}

export function minus (num1, num2, ...rest) {
  if (rest.length) return minus(minus(num1, num2), ...rest);

}

export function multiplication (num1, num2, ...rest) {
  if (rest.length) return multiplication(multiplication(num1, num2), ...rest);

  // TODO
  return num1 * num2;
}

export function division (num1, num2, ...rest) {
  if (rest.length) return division(division(num1, num2), ...rest);

}
