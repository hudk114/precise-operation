/**
 * 将浮点数转化为整数进行计算的方式
 * 参考precise-operation
 * 优点 实现较为简单
 * 缺点 对于符号较长的数，容易超出范围
 */

import { getDecimalLength } from './utils';

function rangeCheck (number) {
  if (number > Number.MAX_SAFE_INTEGER || number < Number.MIN_SAFE_INTEGER) {
    throw new RangeError('结果超出范围');
  }
}

export function add (num1, num2) {
  const base = Math.max(getDecimalLength(num1), getDecimalLength(num2));
  const baseNum = Math.pow(10, base);
  return (multiplication(num1, baseNum) + multiplication(num2, baseNum)) / baseNum;
}

export function minus (num1, num2) {
  const base = Math.max(getDecimalLength(num1), getDecimalLength(num2));
  const baseNum = Math.pow(10, base);

  return (multiplication(num1, baseNum) - multiplication(num2, baseNum)) / baseNum; // multiplication内部进行过range判断
}

export function multiplication (num1, num2) {
  const base1 = getDecimalLength(num1);
  const base2 = getDecimalLength(num2);
  const fixedNum1 = num1 * Math.pow(10, base1);
  const fixedNum2 = num2 * Math.pow(10, base2);

  rangeCheck(fixedNum1);
  rangeCheck(fixedNum2);

  const val = fixedNum1 * fixedNum2;
  rangeCheck(val);

  return val / Math.pow(10, base1 + base2);
}

export function division (num1, num2) {
  const base1 = getDecimalLength(num1);
  const base2 = getDecimalLength(num2);
  const fixedNum1 = num1 * Math.pow(10, base1);
  const fixedNum2 = num2 * Math.pow(10, base2);

  rangeCheck(fixedNum1);
  rangeCheck(fixedNum2);

  const val = fixedNum1 / fixedNum2;
  rangeCheck(val);

  return val / Math.pow(10, base1 + base2);
}
