/**
 * 预计算函数
 * 对整数、NaN、Infinity等不需要使用precise-calc的数进行计算
 * 若使用了预计算 返回 { calc: true, val }
 * 否则返回 { calc: false, val: -1 }
 */

import { isNaN, isInt, isInfinite, isZero } from '../utils';

export const naN = {
  calc: true,
  val: 'NaN'
};

export const falsy = {
  calc: false,
  val: -1
};

/**
 * 预计算的decorator
 * 对于所有四则运算，其中一方为NaN的时候，计算结果必然为NaN
 * 至少一方为Infinity，或者两者均为整数时，precision计算无必要，此时采用func的计算结果
 * 除此之外的加减运算需通过precision计算完成
 * @param {Function} func
 * @returns {Function}
 */
function preDecorator (func) {
  /**
   * 预计算函数
   * @param {Number|String} num1
   * @param {Number|String} num2
   * @returns {<{calc, val}>}
   */
  return (num1, num2) => {
    if (isNaN(num1) || isNaN(num2)) return naN;

    if (isInfinite(num1) || isInfinite(num2) || (isInt(num1) && isInt(num2))) {
      return {
        calc: true,
        val: func(num1, num2)
      };
    }

    return falsy;
  };
}

export const preAdd = preDecorator((a, b) =>
  (Number(a) + Number(b)).toString()
);
export const preMinus = preDecorator((a, b) =>
  (Number(a) - Number(b)).toString()
);

/**
 * 预计算乘法
 * @param {Number|String} num1
 * @param {Number|String} num2
 * @returns {<{calc, val}>}
 */
export function preMulti (num1, num2) {
  if (isNaN(num1) || isNaN(num2)) return naN;

  if (isInfinite(num1) || isInfinite(num2) || (isInt(num1) && isInt(num2))) {
    return {
      calc: true,
      val: (Number(num1) * Number(num2)).toString()
    };
  }

  if (isZero(num1) || isZero(num2)) {
    return {
      calc: true,
      val: '0'
    };
  }

  return falsy;
}

/**
 * 预计算除法
 * @param {Number|String} num1
 * @param {Number|String} num2
 * @returns {<{calc, val}>}
 */
export function preDivision (num1, num2) {
  if (isNaN(num1) || isNaN(num2)) return naN;
  if (isZero(num1) && isZero(num2)) return naN;

  if (isInfinite(num1) || isInfinite(num2) || isZero(num1) || isZero(num2)) {
    return {
      calc: true,
      val: (Number(num1) / Number(num2)).toString()
    };
  }

  return falsy;
}
