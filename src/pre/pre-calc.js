/**
 * 预计算函数
 * 对不需要精确计算的函数进行计算进行计算
 */

/**
 * 不需要进行精确计算的加法运算
 * @param {String} num1
 * @param {String} num2
 * @returns {String}
 */
export function preAdd(num1, num2) {
  return (Number(num1) + Number(num2)).toString();
}

/**
 * 不需要进行精确计算的减法运算
 * @param {String} num1
 * @param {String} num2
 * @returns {String}
 */
export function preMinus(num1, num2) {
  return (Number(num1) - Number(num2)).toString();
}

/**
 * 不需要进行精确计算的乘法运算
 * @param {String} num1
 * @param {String} num2
 * @returns {String}
 */
export function preMulti(num1, num2) {
  return (Number(num1) * Number(num2)).toString();
}

/**
 * 不需要进行精确计算的除法运算
 * @param {String} num1
 * @param {String} num2
 * @returns {String}
 */
export function preDivision(num1, num2) {
  return (Number(num1) / Number(num2)).toString();
}
