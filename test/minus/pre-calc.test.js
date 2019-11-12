/**
 * 输入：标准输入的不需要进行精确除法计算的数字字符串
 * 输出：返回计算的结果
 */

import { preAdd } from '../../src/pre/pre-calc';

test('pre-calc', () => {
  expect(preAdd('2', '3')).toBe('5');
  expect(preAdd('-3', '0')).toBe('-3');
  expect(preAdd('0', 'NaN')).toBe('NaN');
  expect(preAdd('NaN', '0')).toBe('NaN');
  expect(preAdd('0', 'Infinity')).toBe('Infinity');
  expect(preAdd('-Infinity', '0')).toBe('-Infinity');
  expect(preAdd('Infinity', '-0')).toBe('Infinity');
  expect(preAdd('NaN', '1')).toBe('NaN');
  expect(preAdd('1', 'NaN')).toBe('NaN');
  expect(preAdd('NaN', 'Infinity')).toBe('NaN');
  expect(preAdd('Infinity', 'NaN')).toBe('NaN');
  expect(preAdd('NaN', 'NaN')).toBe('NaN');
  expect(preAdd('Infinity', '1')).toBe('Infinity');
  expect(preAdd('Infinity', 'Infinity')).toBe('Infinity');
  expect(preAdd('Infinity', '-Infinity')).toBe('NaN');
});
