/**
 * 对四则运算的参数进行提前验证及计算
 * 验证出错 抛出异常
 */

import { paraError } from '../error';
import { isNum } from '../utils';

export default function preCheck (num1, num2) {
  if (!isNum(num1) || !isNum(num2)) paraError();
}
