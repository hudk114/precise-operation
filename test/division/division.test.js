/**
 * 输入：标准、非标准数字或字符及非法输入
 * 输出：非法输入抛出异常，标准或非标准输入输出计算结果
 */

import { division } from '../../src';

test('标准输入', () => {
  expect(division(1, 2)).toBe('0.5');
  expect(division(2, -1)).toBe('-2');
  expect(division(2.24, 100)).toBe('0.0224');
  expect(division(-0.3, 10)).toBe('-0.03');
  expect(division(0.6, 0.2)).toBe('3');
  // expect(division(-0.5, 0.3)).toBe('-1.66666666666667'); // precisionCalc与parseIntCalc，默认精度15位
  // expect(division(1, 0.3)).toBe('3.33333333333333'); // precisionCalc与parseIntCalc，默认精度15位
  expect(division(-0.5, 0.3)).toBe('-1.66666666666666666667'); // customCalc，默认精度21位
  expect(division(1, 0.3)).toBe('3.3333333333333333333'); // customCalc，默认精度21位
  expect(division(2.24, 100, 0.2)).toBe('0.112');

  expect(division('1', '2')).toBe('0.5');
  expect(division('-2.24', '100')).toBe('-0.0224');
  expect(division('0.6', '0.2')).toBe('3');
  expect(division('224e-2', '10e3')).toBe('0.000224');
  // expect(division('-0.5', '0.3')).toBe('-1.66666666666667'); // precisionCalc与parseIntCalc，默认精度15位
  expect(division('-0.5', '0.3')).toBe('-1.66666666666666666667'); // customCalc，默认精度21位
  expect(division('2.24', '100', '-0.2')).toBe('-0.112');

  expect(division(1, '-2')).toBe('-0.5');
  expect(division('0.6', -0.2)).toBe('-3');
  // expect(division(-0.5, '0.3')).toBe('-1.66666666666667'); // precisionCalc与parseIntCalc，默认精度15位
  expect(division(-0.5, '0.3')).toBe('-1.66666666666666666667'); // customCalc，默认精度21位
  expect(division('2.24', 100, -0.2)).toBe('-0.112');

  expect(division(NaN, 0)).toBe('NaN');
  expect(division(NaN, Infinity)).toBe('NaN');
  expect(division(NaN, NaN)).toBe('NaN');
  expect(division(0, Infinity)).toBe('0');
  expect(division(0, 0)).toBe('NaN');
  expect(division(0, NaN)).toBe('NaN');
  expect(division(Infinity, NaN)).toBe('NaN');
  expect(division(Infinity, Infinity)).toBe('NaN');
  expect(division(Infinity, 0)).toBe('Infinity');

  expect(division(NaN, 1)).toBe('NaN');
  expect(division(1, 0)).toBe('Infinity');
  expect(division(1, -0)).toBe('-Infinity');
  expect(division(0, 1)).toBe('0');
  expect(division('22.4000e-1', 0)).toBe('Infinity');
  expect(division(1, 0, 3)).toBe('Infinity');

  expect(division(Infinity, 0, Infinity)).toBe('NaN');
});

test('非标准输入', () => {
  expect(division('002.24', '01e2')).toBe('0.0224');
  expect(division('1', '0.00')).toBe('Infinity');
  expect(division('22.4000e-1', 100)).toBe('0.0224');

  expect(division('27021597764222986.92', '2')).toBe('13510798882111493.46'); // precisionCalc与parseIntCalc需关闭
  expect(division('0.1234567891234567891', '-0.2')).toBe('-0.6172839456172839455'); // precisionCalc与parseIntCalc需关闭
});

test('非法输入', () => {
  expect(division.bind(null, 1, 'a')).toThrow(TypeError);
  expect(division.bind(null, 1, true)).toThrow(TypeError);
  expect(division.bind(null, 1, false)).toThrow(TypeError);
  expect(division.bind(null, 1, null)).toThrow(TypeError);
  expect(division.bind(null, 1, undefined)).toThrow(TypeError);
  expect(division.bind(null, 1, Symbol(''))).toThrow(TypeError);
  expect(division.bind(null, 1, [])).toThrow(TypeError);
  expect(division.bind(null, 1, {})).toThrow(TypeError);
  expect(division.bind(null, 1)).toThrow(TypeError);
  expect(division.bind(null)).toThrow(TypeError);

  try {
    division(1, true);
  } catch (e) {
    expect(e.message).toBe('输入参数错误');
  }
});
