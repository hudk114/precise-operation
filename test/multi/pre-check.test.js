/**
 * 输入：标准输入的数字字符串
 * 输出：布尔值，判断是否需要进行精确计算
 */

import { preMulti } from '../../src/pre/pre-check';

test('multi-pre-check', () => {
  expect(preMulti('0', '3')).toBe(false);
  expect(preMulti('3', '0')).toBe(false);
  expect(preMulti('-3', '0')).toBe(false);
  expect(preMulti('0', '0')).toBe(false);
  expect(preMulti('0', 'NaN')).toBe(false);
  expect(preMulti('NaN', '0')).toBe(false);
  expect(preMulti('0', 'Infinity')).toBe(false);
  expect(preMulti('Infinity', '0')).toBe(false);
  expect(preMulti('Infinity', '-0')).toBe(false);
  expect(preMulti('NaN', '1')).toBe(false);
  expect(preMulti('1', 'NaN')).toBe(false);
  expect(preMulti('NaN', 'Infinity')).toBe(false);
  expect(preMulti('Infinity', 'NaN')).toBe(false);
  expect(preMulti('NaN', 'NaN')).toBe(false);
  expect(preMulti('Infinity', '1')).toBe(false);
  expect(preMulti('Infinity', 'Infinity')).toBe(false);

  expect(preMulti('1', '2')).toBe(false);

  expect(preMulti('10', '0.1')).toBe(true);
  expect(preMulti('0.1', '-10')).toBe(true);
});
