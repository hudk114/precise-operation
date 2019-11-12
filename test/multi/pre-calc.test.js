/**
 * 输入：标准输入的不需要进行精确除法计算的数字字符串
 * 输出：返回计算的结果
 */

import { preMulti } from '../../src/pre/pre-calc';

test('pre-calc', () => {
  expect(preMulti('0', '3')).toBe('0');
  expect(preMulti('3', '0')).toBe('0');
  expect(preMulti('-3', '0')).toBe('0');
  expect(preMulti('0', '0')).toBe('0');
  expect(preMulti('0', 'NaN')).toBe('NaN');
  expect(preMulti('NaN', '0')).toBe('NaN');
  expect(preMulti('0', 'Infinity')).toBe('NaN');
  expect(preMulti('Infinity', '0')).toBe('NaN');
  expect(preMulti('Infinity', '-0')).toBe('NaN');
  expect(preMulti('NaN', '1')).toBe('NaN');
  expect(preMulti('1', 'NaN')).toBe('NaN');
  expect(preMulti('NaN', 'Infinity')).toBe('NaN');
  expect(preMulti('Infinity', 'NaN')).toBe('NaN');
  expect(preMulti('NaN', 'NaN')).toBe('NaN');
  expect(preMulti('Infinity', '1')).toBe('Infinity');
  expect(preMulti('Infinity', 'Infinity')).toBe('Infinity');
  expect(preMulti('Infinity', '-Infinity')).toBe('-Infinity');

  expect(preMulti('1', '2')).toBe('2');
  expect(preMulti('1', '-2')).toBe('-2');
});
