import { paraError } from './error';

const numRegExp = /^([+-]?)(\d+)(\.(\d*))?(e([+-]?)(\d+))?$/;

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
 * 判断输入的num是有效数字：数字，且非NaN，Infintiy
 * @param {Number|String} num
 * @returns {boolean}
 */
export function isValidNum (num) {
  return numRegExp.test(num.toString());
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
 * 判断num是否为NaN或'NaN'
 * @param {Number|String} num
 * @returns {boolean}
 */
export function isNaN (num) {
  return num.toString() === 'NaN';
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
 * num is 0, '0', '+0', '-0'
 * @param {Number|String} num
 * @returns {boolean}
 */
export function isZero (num) {
  return num === 0 || num === '0' || num === '+0' || num === '-0';
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

/**
 * 获取num各部分的组成数值
 * @param {Number|String} num
 * @returns {<{ flag, integer, decimal, expFlag, exp }>}
 */
export function getNumComponent (num) {
  const match = num.toString().match(numRegExp) || [];

  return {
    flag: match[1] || '', // 正负值
    integer: match[2] || '', // 整数部分
    decimal: match[4] || '', // 小数部分
    expFlag: match[6] || '', // 指数正负值
    exp: match[7] || '' // 指数，指数部分不包含小数
  };
}

/**
 * 获取num的小数点长度
 * @param {Number|String} num
 * @returns {Number}
 */
export function getDecimalLength (num) {
  if (!isValidNum(num)) return 0;

  const {
    decimal,
    expFlag,
    exp
  } = getNumComponent(num);

  return decimal.length - Number(`${expFlag}${exp}`);
}

/**
 * 从str中的开头开始清除所有连续char
 * char === 0, '0013' -> '13'
 * @param {String} str
 * @param {String} char
 * @returns {String}
 */
export function rmStartChar (str, char) {
  let s = str.split('');
  let index = s.findIndex(c => char !== c);
  if (index === -1) return '';
  return s.slice(index).join('');
}

/**
 * 从str中的结尾开始清除所有连续char
 * char === 0, '1300' -> '13'
 * @param {String} str
 * @param {String} char
 * @returns {String}
 */
export function rmEndChar (str, char) {
  let s = str.split('').reverse();
  let index = s.findIndex(c => char !== c);
  if (index === -1) return '';
  return s.slice(index).reverse().join('');
}

/**
 * 字符串数字标准化处理，去掉不必要的0
 * 0.00 -> '0'
 * 00234 -> '234'
 * 234.500 -> '234.5'
 * -01.20e03 -> '-1.2e3'
 * @param {String} num
 * @returns {String}
 */
export function normalize (num) {
  if (isNaN(num) || isInfinite(num)) return num;
  if (!isValidNum(num)) paraError();

  let {
    flag,
    integer,
    decimal,
    expFlag,
    exp
  } = getNumComponent(num);

  integer = rmStartChar(integer, '0') || '0'; // integer部分必须有值
  decimal = rmEndChar(decimal, '0');
  exp = rmStartChar(exp, '0');

  return `${flag}${integer}${decimal ? '.' + decimal : ''}${exp ? 'e' + expFlag + exp : ''}`;
}
