 /**
 * 输入：标准输入的数字字符串
 * 输出：布尔值，判断是否需要进行精确计算
 */

import { preAdd } from '../../src/pre/pre-check';

test('division-pre-check', () => {
  expect(preAdd('2', '3')).toBe(false);
  expect(preAdd('3', '2')).toBe(false);
  expect(preAdd('-3', '0')).toBe(false);
  expect(preAdd('0', 'NaN')).toBe(false);
  expect(preAdd('NaN', '0')).toBe(false);
  expect(preAdd('0', 'Infinity')).toBe(false);
  expect(preAdd('Inifinity', '0')).toBe(false);
  expect(preAdd('Inifinity', '-0')).toBe(false);
  expect(preAdd('NaN', '1')).toBe(false);
  expect(preAdd('1', 'NaN')).toBe(false);
  expect(preAdd('NaN', 'Inifinity')).toBe(false);
  expect(preAdd('Inifinity', 'NaN')).toBe(false);
  expect(preAdd('NaN', 'NaN')).toBe(false);
  expect(preAdd('Infinity', '1')).toBe(false);
  expect(preAdd('Infinity', 'Infinity')).toBe(false);

  expect(preAdd('10', '0.1')).toBe(true);
  expect(preAdd('0.1', '-10')).toBe(true);
  expect(preAdd('0.1', '0')).toBe(true);
});
