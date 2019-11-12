 /**
 * 输入：标准输入的数字字符串
 * 输出：布尔值，判断是否需要进行精确计算
 */

import { preMinus } from '../../src/pre/pre-check';

test('division-pre-check', () => {
  expect(preMinus('2', '3')).toBe(false);
  expect(preMinus('3', '2')).toBe(false);
  expect(preMinus('-3', '0')).toBe(false);
  expect(preMinus('0', 'NaN')).toBe(false);
  expect(preMinus('NaN', '0')).toBe(false);
  expect(preMinus('0', 'Infinity')).toBe(false);
  expect(preMinus('Inifinity', '0')).toBe(false);
  expect(preMinus('Inifinity', '-0')).toBe(false);
  expect(preMinus('NaN', '1')).toBe(false);
  expect(preMinus('1', 'NaN')).toBe(false);
  expect(preMinus('NaN', 'Inifinity')).toBe(false);
  expect(preMinus('Inifinity', 'NaN')).toBe(false);
  expect(preMinus('NaN', 'NaN')).toBe(false);
  expect(preMinus('Infinity', '1')).toBe(false);
  expect(preMinus('Infinity', 'Infinity')).toBe(false);

  expect(preMinus('10', '0.1')).toBe(true);
  expect(preMinus('0.1', '-10')).toBe(true);
  expect(preMinus('0.1', '0')).toBe(true);
});
