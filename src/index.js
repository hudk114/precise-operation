import preCheck from './pre/pre-check';
import preProcess from './pre/pre-process';
import { preAdd, preMinus, preMulti, preDivision } from './pre/pre-calc';
import PrecisionCalculation from './calc/precision-calculation';
import ParseToIntCalculation from './calc/parse-to-int-calculation';
import CustomCalculation from './calc/custom-calculation';
import { MAX_EXP, MAX_DECIMAL } from './config';

// const calculation = new PrecisionCalculation(MAX_DECIMAL);
// const calculation = new ParseToIntCalculation(MAX_DECIMAL);
const calculation = new CustomCalculation(MAX_EXP);

/**
 * 精确的加法计算
 * @param {Number|String} num1
 * @param {Number|String} num2
 * @param  {...<Number|String>} rest 剩余加数
 * @returns {String}
 */
export function add (num1, num2, ...rest) {
  if (rest.length) return add(add(num1, num2), ...rest);

  preCheck(num1, num2);

  const n1 = preProcess(num1);
  const n2 = preProcess(num2);
  const res = preAdd(n1, n2);
  if (res.calc) return res.val;

  return calculation.add(n1, n2);
}

/**
 * 精确的减法计算
 * @param {Number|String} num1 被减数
 * @param {Number|String} num2 减数
 * @param  {...<Number|String>} rest 剩余减数
 * @returns {String}
 */
export function minus (num1, num2, ...rest) {
  if (rest.length) return minus(minus(num1, num2), ...rest);

  preCheck(num1, num2);

  const n1 = preProcess(num1);
  const n2 = preProcess(num2);
  const res = preMinus(n1, n2);
  if (res.calc) return res.val;

  return calculation.minus(n1, n2);
}

/**
 * 精确的乘法计算
 * @param {Number|String} num1 被乘数
 * @param {Number|String} num2 乘数
 * @param  {...<Number|String>} rest 剩余乘数
 * @returns {String}
 */
export function multiplication (num1, num2, ...rest) {
  if (rest.length) return multiplication(multiplication(num1, num2), ...rest);

  preCheck(num1, num2);

  const n1 = preProcess(num1);
  const n2 = preProcess(num2);
  const res = preMulti(n1, n2);
  if (res.calc) return res.val;

  return calculation.multiplication(n1, n2);
}

/**
 * 精确的除法计算
 * @param {Number|String} num1 被除数
 * @param {Number|String} num2 除数
 * @param  {...<Number|String>} rest 剩余除数
 * @returns {String}
 */
export function division (num1, num2, ...rest) {
  if (rest.length) return division(division(num1, num2), ...rest);

  preCheck(num1, num2);

  const n1 = preProcess(num1);
  const n2 = preProcess(num2);
  const res = preDivision(n1, n2);
  if (res.calc) return res.val;

  return calculation.division(n1, n2);
}
