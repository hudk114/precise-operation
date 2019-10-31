/**
 * 将浮点数转化为整数进行计算的方式
 * 参考precise-operation
 * 优点 相对简单 精确度比较高
 * 缺点 无法对超出Number.MAX_SAFE_INTEGER的数据进行精确计算，会丢失精确度
 * 适用场景 位数较少，计算范围不会超出安全范围的计算
 * 后续改进 更为友好的异常处理
 */

import { getDecimalLength, judgeSafeRange } from '../utils';
import CONFIG from '../config';
import { rangeError, rangeWarn } from '../error';
import Calculation from './index';

function rangeCheck (num) {
  if (!judgeSafeRange(num)) {
    if (CONFIG.SAFE_RANGE_ERROR) rangeError();
    if (CONFIG.SAFE_RANGE_WARNING) rangeWarn(); // TODO
  }
}

/**
 * 将小数转化为整数
 * 不能用相乘的方式，否则会有精度丢失（例如2.24 * 100）
 * @param {Number} num
 * @param {Number}
 */
function fixNumToInt (num) {
  let fixedNumStr = num.toString();
  const index = num.toString().indexOf('e');
  if (index > -1) {
    fixedNumStr = fixedNumStr.slice(0, index);
  }
  return Number(fixedNumStr.replace('.', ''));
}

/**
 * 对无限循环结尾小数进行fix， 0.9999999999999999 -> 1
 * js对小数取整为16位，而对整数为15位，因此通过替换为整数的方式可以将最后一位取整
 * @param {Number} num
 * @param {Number}
 */
function fixNum (num) {
  const base = getDecimalLength(num);
  return fixNumToInt(num) / Math.pow(10, base);
}

export default class ParseToIntCalculation extends Calculation {
  /**
   * 数字乘法，返回乘积
   * @param {Number} num1
   * @param {Number} num2
   * @param {Number}
   */
  static numMulti (num1, num2) {
    let fixedNum1 = fixNum(num1);
    let fixedNum2 = fixNum(num2);
    const base1 = getDecimalLength(fixedNum1);
    const base2 = getDecimalLength(fixedNum2);

    fixedNum1 = fixNumToInt(fixedNum1);
    fixedNum2 = fixNumToInt(fixedNum2);

    rangeCheck(fixedNum1);
    rangeCheck(fixedNum2);

    const val = fixedNum1 * fixedNum2;
    rangeCheck(val);

    return val / Math.pow(10, base1 + base2);
  }

  add (num1, num2) {
    const base = Math.max(getDecimalLength(num1), getDecimalLength(num2));
    const baseNum = Math.pow(10, base);

    return (
      (ParseToIntCalculation.numMulti(num1, baseNum) +
        ParseToIntCalculation.numMulti(num2, baseNum)) /
      baseNum
    ).toString();
  }

  minus (num1, num2) {
    const base = Math.max(getDecimalLength(num1), getDecimalLength(num2));
    const baseNum = Math.pow(10, base);

    return (
      (ParseToIntCalculation.numMulti(num1, baseNum) -
        ParseToIntCalculation.numMulti(num2, baseNum)) /
      baseNum
    ).toString(); // multiplication内部进行过range判断
  }

  multiplication (num1, num2) {
    return ParseToIntCalculation.numMulti(num1, num2).toString();
  }

  division (num1, num2) {
    const base1 = getDecimalLength(num1);
    const base2 = getDecimalLength(num2);
    const fixedNum1 = num1 * Math.pow(10, base1);
    const fixedNum2 = num2 * Math.pow(10, base2);

    rangeCheck(fixedNum1);
    rangeCheck(fixedNum2);

    const val = fixedNum1 / fixedNum2;
    rangeCheck(val);

    return this.multiplication(val, Math.pow(10, base2 - base1)).toString();
  }
}