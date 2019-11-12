/**
 * 输入：标准的普通数字字符
 * 输出：精确的计算结果
 */
import calculation from '../../src/calc/index';

test('calculation', () => {
  expect(calculation.multiplication('1', '2')).toBe('2');
  expect(calculation.multiplication('2', '-1')).toBe('-2');
  expect(calculation.multiplication('2', '0.3')).toBe('0.6');
  expect(calculation.multiplication('0.3', '-2')).toBe('-0.6');
  expect(calculation.multiplication('0.1', '0.2')).toBe('0.02');
  expect(calculation.multiplication('-0.2', '0.1')).toBe('-0.02');

  expect(calculation.multiplication('224e-2', '10e3')).toBe('22400');
  expect(calculation.multiplication('2.24', '10e1')).toBe('224');
  expect(calculation.multiplication('0.1234567891234567891', '-0.2')).toBe('-0.02469135782469135782'); // precisionCalc与parseIntCalc需关闭
  expect(calculation.multiplication('90071992547409956.4', '0.3')).toBe('27021597764222986.92'); // precisionCalc与parseIntCalc需关闭
});
