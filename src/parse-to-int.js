/**
 * 将浮点数转化为整数进行计算的方式
 * 参考precise-operation
 * 优点 相对简单 精确度比较高
 * 缺点 无法对超出Number.MAX_SAFE_INTEGER的数据进行精确计算，会丢失精确度
 * 适用场景 位数较少，计算范围不会超出安全范围的计算
 * 后续改进 更为友好的异常处理
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
