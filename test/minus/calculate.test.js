/**
 * 输入：标准的普通数字字符
 * 输出：精确的计算结果
 */

import calculation from '../../src/calc/index';

test('calculation', () => {
  expect(calculation.minus('1', '2')).toBe('-1');
  expect(calculation.minus('2', '-1')).toBe('3');
  expect(calculation.minus('0', '0.3')).toBe('-0.3');
  expect(calculation.minus('1', '0.7')).toBe('0.3');
  expect(calculation.minus('-1', '0.7')).toBe('-1.7');
  expect(calculation.minus('0.3', '0.2')).toBe('0.1');
  expect(calculation.minus('-0.1', '0.2')).toBe('-0.3');
  expect(calculation.minus('1.01e-2', '20.5e-1')).toBe('-2.0399');

  expect(calculation.minus('0.1234567891234567891', '0.2')).toBe('-0.0765432108765432109'); // precisionCalc与parseIntCalc需关闭
  expect(calculation.minus('90071992547409956.4', '0.3')).toBe('90071992547409956.1'); // precisionCalc与parseIntCalc需关闭
});
