/**
 * 数字预处理
 * 将所有合法的数字或数字字符串转化为标准数字字符串
 */

import { normalize } from '../utils';

/**
 * 数字预处理，转化为字符串
 * 对非标准数据进行预处理，去掉不必要的0
 * 0.00 -> '0'
 * 00234 -> '234'
 * 234.500 -> '234.5'
 * -01.20e03 -> '-1.2e3'
 * @param {Number|String} num
 * @returns {String}
 */
export default function preProcess(num) {
  if (typeof num === 'number') {
    // -0特殊转化
    if (num === 0 && 1 / num < 0) return '-0';
    return num.toString();
  }

  return normalize(num);
}
