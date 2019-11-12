/**
 * 输入：标准输入的不需要进行精确除法计算的数字字符串
 * 输出：返回计算的结果
 */

import { preMinus } from '../../src/pre/pre-calc';

test('pre-calc', () => {
  expect(preMinus('2', '3')).toBe('-1');
  expect(preMinus('3', '2')).toBe('1');
  expect(preMinus('-3', '0')).toBe('-3');
  expect(preMinus('0', 'NaN')).toBe('NaN');
  expect(preMinus('NaN', '0')).toBe('NaN');
  expect(preMinus('0', 'Infinity')).toBe('-Infinity');
  expect(preMinus('Infinity', '0')).toBe('Infinity');
  expect(preMinus('Infinity', '-0')).toBe('Infinity');
  expect(preMinus('NaN', '1')).toBe('NaN');
  expect(preMinus('1', 'NaN')).toBe('NaN');
  expect(preMinus('NaN', 'Infinity')).toBe('NaN');
  expect(preMinus('Infinity', 'NaN')).toBe('NaN');
  expect(preMinus('NaN', 'NaN')).toBe('NaN');
  expect(preMinus('Infinity', '1')).toBe('Infinity');
  expect(preMinus('Infinity', 'Infinity')).toBe('NaN');
  expect(preMinus('Infinity', '-Infinity')).toBe('Infinity');
  expect(preMinus('-Infinity', 'Infinity')).toBe('-Infinity');
});
