/**
 * 判断输入是否有效
 * 若无效抛出异常（直接打断）
 */

import { paraError } from '../error';
import { isNum } from '../utils';

export default function preValid(num1, num2) {
  if (!isNum(num1) || !isNum(num2)) paraError();
}
