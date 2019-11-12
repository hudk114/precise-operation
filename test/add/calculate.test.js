/**
 * 输入：标准的普通数字字符
 * 输出：精确的计算结果
 */

import calculation from '../../src/calc/index';

test('calculation', () => {
  expect(calculation.add('1', '2')).toBe('3');
  expect(calculation.add('2', '-1')).toBe('1');
  expect(calculation.add('0', '0.3')).toBe('0.3');
  expect(calculation.add('1', '0.7')).toBe('1.7');
  expect(calculation.add('-1', '0.7')).toBe('-0.3');
  expect(calculation.add('-0.1', '0.1')).toBe('0');
  expect(calculation.add('0.3', '0.2')).toBe('0.5');
  expect(calculation.add('-0.1', '0.2')).toBe('0.1');
  expect(calculation.add('1.01e-2', '20.5e-1')).toBe('2.0601');

  expect(calculation.add('0.1234567891234567891', '0.2')).toBe('0.3234567891234567891'); // precisionCalc与parseIntCalc需关闭
  expect(calculation.add('90071992547409956.4', '0.3')).toBe('90071992547409956.7'); // precisionCalc与parseIntCalc需关闭
});
