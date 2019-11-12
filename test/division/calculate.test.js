/**
 * 输入：标准的普通数字字符
 * 输出：精确的计算结果
 */

import calculation from '../../src/calc/index';

test('calculation', () => {
  expect(calculation.division('1', '2')).toBe('0.5');
  expect(calculation.division('2', '-1')).toBe('-2');
  expect(calculation.division('2.24', '100')).toBe('0.0224');
  expect(calculation.division('-0.3', '10')).toBe('-0.03');
  expect(calculation.division('0.6', '0.2')).toBe('3');
  // expect(calculation.division('-0.5', '0.3')).toBe('-1.66666666666667'); // precisionCalc与parseIntCalc，默认精度15位
  // expect(calculation.division('1', '0.3')).toBe('3.33333333333333'); // precisionCalc与parseIntCalc，默认精度15位
  expect(calculation.division('-0.5', '0.3')).toBe('-1.66666666666666666667'); // customCalc，默认精度21位
  expect(calculation.division('1', '0.3')).toBe('3.3333333333333333333'); // customCalc，默认精度21位

  expect(calculation.division('1', '2')).toBe('0.5');
  expect(calculation.division('-2.24', '100')).toBe('-0.0224');
  expect(calculation.division('0.6', '0.2')).toBe('3');
  expect(calculation.division('224e-2', '10e3')).toBe('0.000224');
  // expect(calculation.division('-0.5', '0.3')).toBe('-1.66666666666667'); // precisionCalc与parseIntCalc，默认精度15位
  expect(calculation.division('-0.5', '0.3')).toBe('-1.66666666666666666667'); // customCalc，默认精度21位

  expect(calculation.division(1, '-2')).toBe('-0.5');
  expect(calculation.division('0.6', -0.2)).toBe('-3');
  // expect(calculation.division('-0.5', '0.3')).toBe('-1.66666666666667'); // precisionCalc与parseIntCalc，默认精度15位
  expect(calculation.division('-0.5', '0.3')).toBe('-1.66666666666666666667'); // customCalc，默认精度21位

  expect(calculation.division('27021597764222986.92', '2')).toBe('13510798882111493.46'); // precisionCalc与parseIntCalc需关闭
  expect(calculation.division('0.1234567891234567891', '-0.2')).toBe('-0.6172839456172839455'); // precisionCalc与parseIntCalc需关闭
});
