/**
 * 抛出的所有异常信息
 */

/**
 * 输入错误，输入非标准错误抛出的异常
 */
export function paraError() {
  throw new TypeError('输入参数错误');
}

/**
 * 运算中超出安全范围抛出的异常
 */
export function rangeError() {
  throw new RangeError('超出安全范围，精度可能丢失');
}

/**
 * 运算中超出安全范围显示的告警
 */
export function rangeWarn() {
  console && console.warn('超出安全范围，精度可能丢失');
}
