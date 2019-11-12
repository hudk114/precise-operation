import preValid from './pre/pre-valid';
import * as preCheck from './pre/pre-check';
import * as preCalc from './pre/pre-calc';
import preProcess from './pre/pre-process';
import calculation from './calc/index';

/**
 * 精确的加法计算
 * @param {Number|String} num1
 * @param {Number|String} num2
 * @param  {...<Number|String>} rest 剩余加数
 * @returns {String}
 */
export function add(num1, num2, ...rest) {
  if (rest.length) return add(add(num1, num2), ...rest);

  preValid(num1, num2);

  const n1 = preProcess(num1);
  const n2 = preProcess(num2);

  return preCheck.preAdd(n1, n2)
    ? calculation.add(n1, n2)
    : preCalc.preAdd(n1, n2);
}

/**
 * 精确的减法计算
 * @param {Number|String} num1 被减数
 * @param {Number|String} num2 减数
 * @param  {...<Number|String>} rest 剩余减数
 * @returns {String}
 */
export function minus(num1, num2, ...rest) {
  if (rest.length) return minus(minus(num1, num2), ...rest);

  preValid(num1, num2);

  const n1 = preProcess(num1);
  const n2 = preProcess(num2);

  return preCheck.preMinus(n1, n2)
    ? calculation.minus(n1, n2)
    : preCalc.preMinus(n1, n2);
}

/**
 * 精确的乘法计算
 * @param {Number|String} num1 被乘数
 * @param {Number|String} num2 乘数
 * @param  {...<Number|String>} rest 剩余乘数
 * @returns {String}
 */
export function multiplication(num1, num2, ...rest) {
  if (rest.length) return multiplication(multiplication(num1, num2), ...rest);

  preValid(num1, num2);

  const n1 = preProcess(num1);
  const n2 = preProcess(num2);

  return preCheck.preMulti(n1, n2)
    ? calculation.multiplication(n1, n2)
    : preCalc.preMulti(n1, n2);
}

/**
 * 精确的除法计算
 * @param {Number|String} num1 被除数
 * @param {Number|String} num2 除数
 * @param  {...<Number|String>} rest 剩余除数
 * @returns {String}
 */
export function division(num1, num2, ...rest) {
  if (rest.length) return division(division(num1, num2), ...rest);

  preValid(num1, num2);

  const n1 = preProcess(num1);
  const n2 = preProcess(num2);

  return preCheck.preDivision(n1, n2)
    ? calculation.division(n1, n2)
    : preCalc.preDivision(n1, n2);
}
