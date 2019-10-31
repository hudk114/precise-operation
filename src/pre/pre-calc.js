/**
 * 进行提前运算，对整数、NaN、Infinity等数进行提前计算
 * 需要提前运算则返回 { calc: true, val }，否则返回 { calc: false, val: -1 }
 */

import { isNaN, isInt, isInfinite } from '../utils';

const naN = {
  calc: true,
  val: 'NaN'
};

const falsy = {
  calc: false,
  val: -1
};

/**
 * 预计算的decorator
 * 对于所有四则运算，其中一方为NaN的时候，计算结果必然为NaN
 * 至少一方为Infinity，或者两者均为整数时，precision计算无必要，因此采用pre-calc
 * 除此之外的运算均需通过precision计算完成
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
export const preMulti = preDecorator((a, b) =>
  (Number(a) * Number(b)).toString()
);
export const preDivision = preDecorator((a, b) =>
  (Number(a) / Number(b)).toString()
);
