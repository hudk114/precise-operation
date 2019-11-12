/**
 * 输入：标准输入的数字字符串
 * 输出：布尔值，判断是否需要进行精确计算
 */

import { preDivision } from '../../src/pre/pre-check';

test('division-pre-check', () => {
  expect(preDivision('0', '3')).toBe(false);
  expect(preDivision('3', '0')).toBe(false);
  expect(preDivision('-3', '0')).toBe(false);
  expect(preDivision('0', '0')).toBe(false);
  expect(preDivision('0', 'NaN')).toBe(false);
  expect(preDivision('NaN', '0')).toBe(false);
  expect(preDivision('0', 'Infinity')).toBe(false);
  expect(preDivision('Inifinity', '0')).toBe(false);
  expect(preDivision('Inifinity', '-0')).toBe(false);
  expect(preDivision('NaN', '1')).toBe(false);
  expect(preDivision('1', 'NaN')).toBe(false);
  expect(preDivision('NaN', 'Inifinity')).toBe(false);
  expect(preDivision('Inifinity', 'NaN')).toBe(false);
  expect(preDivision('NaN', 'NaN')).toBe(false);
  expect(preDivision('Infinity', '1')).toBe(false);
  expect(preDivision('Infinity', 'Infinity')).toBe(false);

  expect(preDivision('10', '0.1')).toBe(true);
  expect(preDivision('0.1', '-10')).toBe(true);
});
