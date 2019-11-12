/**
 * 对四则运算的参数进行提前验证及计算
 * 验证出错 抛出异常
 */

import { isNaN, isInt, isInfinite, isZero } from '../utils';

/**
 * 判断 num1 + num2 是否需要精确除法
 * 两者任一为 NaN 或者 Inifinity，或者两者均为整数，不需要精确除法
 * @param {String} num1
 * @param {String} num2
 * @returns {Boolean}
 */
export function preAdd(num1, num2) {
  return (
    ![num1, num2].find(num => isNaN(num) || isInfinite(num)) &&
    !(isInt(num1) && isInt(num2))
  );
}

/**
 * 判断 num1 - num2 是否需要精确除法
 * 两者任一为 NaN 或者 Inifinity，或者两者均为整数，不需要精确除法
 * @param {String} num1
 * @param {String} num2
 * @returns {Boolean}
 */
export function preMinus(num1, num2) {
  return (
    ![num1, num2].find(num => isNaN(num) || isInfinite(num)) &&
    !(isInt(num1) && isInt(num2))
  );
}

/**
 * 判断 num1 * num2 是否需要精确除法
 * 两者任一为 NaN 或者 0 或者 Inifinity，或者两者均为整数，不需要精确除法
 * @param {String} num1
 * @param {String} num2
 * @returns {Boolean}
 */
export function preMulti(num1, num2) {
  return (
    ![num1, num2].find(num => isNaN(num) || isZero(num) || isInfinite(num)) &&
    !(isInt(num1) && isInt(num2))
  );
}

/**
 * 判断 num1 / num2 是否需要精确除法
 * 两者任一为 NaN 或者 0 或者 Inifinity 即不需要精确除法
 * @param {String} num1
 * @param {String} num2
 * @returns {Boolean}
 */
export function preDivision(num1, num2) {
  return ![num1, num2].find(
    num => isNaN(num) || isZero(num) || isInfinite(num)
  );
}
