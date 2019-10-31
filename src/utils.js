/**
 * 获取num的小数点长度
 * @param {Number|String} num
 * @returns {Number}
 */
export function getDecimalLength (num) {
  if (!isValidNum(num)) return 0;

  const regExp = /^[+-]?(\d+)(\.(\d*))?(e([+-]?\d+))?$/;
  const match = num.toString().match(regExp);

  const decimal = match[3] || '';
  const exp = match[5] || 0;

  return decimal.length - exp;
}

/**
 * 判断输入的num是有效数字：数字，且非NaN，Infintiy
 * @param {Number|String} num
 * @returns {boolean}
 */
export function isValidNum (num) {
  return /^[+-]?(\d+)(\.(\d*))?(e([+-]?\d+))?$/.test(num.toString());
}

/**
 * 判断num是否为NaN或'NaN'
 * @param {Number|String} num
 * @returns {boolean}
 */
export function isNaN (num) {
  return num.toString() === 'NaN';
}

/**
 * 判断num是否整数或整数字符串
 * @param {Number|String} num
 * @returns {boolean}
 */
export function isInt (num) {
  return isValidNum(num) && !getDecimalLength(num);
}

/**
 * 判断num为Infinity
 * @param {Number|String} num
 * @returns {boolean}
 */
export function isInfinite (num) {
  return !isFinite(Number(num));
}

/**
 * 判断num是否是数字或可以转化为数字的字符串
 * @param {Number|String} num
 * @returns {boolean}
 */
export function isNum (num) {
  if (typeof num !== 'number' && typeof num !== 'string') return false;

  return isNaN(num) || (num !== '' && !isNaN(Number(num)));
}

/**
 * 判断num是否在精确表示范围内
 * @param {Number|String} num
 * @returns {Boolean}
 */
export function judgeSafeRange (num) {
  if (!isValidNum(num)) return false;

  const number = Number(num);
  return number < Number.MAX_SAFE_INTEGER && number > Number.MIN_SAFE_INTEGER;
}
