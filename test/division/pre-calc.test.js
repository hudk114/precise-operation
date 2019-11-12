/**
 * 输入：标准输入的不需要进行精确除法计算的数字字符串
 * 输出：返回计算的结果
 */

import { preDivision } from '../../src/pre/pre-calc';

test('pre-calc', () => {
  expect(preDivision('0', '3')).toBe('0');
  expect(preDivision('3', '0')).toBe('Infinity');
  expect(preDivision('-3', '0')).toBe('-Infinity');
  expect(preDivision('0', '0')).toBe('NaN');
  expect(preDivision('0', 'NaN')).toBe('NaN');
  expect(preDivision('NaN', '0')).toBe('NaN');
  expect(preDivision('0', 'Infinity')).toBe('0');
  expect(preDivision('Infinity', '0')).toBe('Infinity');
  expect(preDivision('Infinity', '-0')).toBe('-Infinity');
  expect(preDivision('NaN', '1')).toBe('NaN');
  expect(preDivision('1', 'NaN')).toBe('NaN');
  expect(preDivision('NaN', 'Infinity')).toBe('NaN');
  expect(preDivision('Infinity', 'NaN')).toBe('NaN');
  expect(preDivision('NaN', 'NaN')).toBe('NaN');
  expect(preDivision('Infinity', '1')).toBe('Infinity');
  expect(preDivision('Infinity', 'Infinity')).toBe('NaN');
});
