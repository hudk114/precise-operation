/**
 * 输入：标准、非标准数字或字符及非法输入
 * 输出：非法输入抛出异常，标准或非标准输入输出计算结果
 */

import { multiplication } from '../../src';

test('标准输入', () => {
  expect(multiplication(1, 2)).toBe('2');
  expect(multiplication(2, -1)).toBe('-2');
  expect(multiplication(2, 0.3)).toBe('0.6');
  expect(multiplication(0.3, -2)).toBe('-0.6');
  expect(multiplication(0.1, 0.2)).toBe('0.02');
  expect(multiplication(-0.2, 0.1)).toBe('-0.02');
  expect(multiplication(0.1, 0.2, 0.3)).toBe('0.006');

  expect(multiplication('1', '2')).toBe('2');
  expect(multiplication('2', '-1')).toBe('-2');
  expect(multiplication('224e-2', '10e3')).toBe('22400');
  expect(multiplication('2.24', '100', '10e3')).toBe('2240000');

  expect(multiplication(1, '2')).toBe('2');
  expect(multiplication('2', -1)).toBe('-2');
  expect(multiplication('2.24', 100, '10e3')).toBe('2240000');

  expect(multiplication(NaN, 0)).toBe('NaN');
  expect(multiplication(NaN, Infinity)).toBe('NaN');
  expect(multiplication(NaN, NaN)).toBe('NaN');
  expect(multiplication(0, Infinity)).toBe('NaN');
  expect(multiplication(0, 0)).toBe('0');
  expect(multiplication(0, NaN)).toBe('NaN');
  expect(multiplication(Infinity, NaN)).toBe('NaN');
  expect(multiplication(Infinity, Infinity)).toBe('Infinity');
  expect(multiplication(Infinity, 0)).toBe('NaN');

  expect(multiplication(NaN, 1)).toBe('NaN');
  expect(multiplication(1, 0)).toBe('0');
  expect(multiplication(1, -0)).toBe('0');
  expect(multiplication(0, 1)).toBe('0');
  expect(multiplication('22.4000e-1', 0)).toBe('0');
  expect(multiplication(1, 0, 3)).toBe('0');

  expect(multiplication(Infinity, 0, Infinity)).toBe('NaN');
});

test('非标准输入', () => {
  expect(multiplication('0.00', 1)).toBe('0');
  expect(multiplication('0.0100000', '204.89000')).toBe('2.0489');
  expect(multiplication('001.0100e-2', 2.05)).toBe('0.020705');

  expect(multiplication('0.1234567891234567891', '-0.2')).toBe('-0.02469135782469135782'); // precisionCalc与parseIntCalc需关闭
  expect(multiplication('90071992547409956.4', '0.3')).toBe('27021597764222986.92'); // precisionCalc与parseIntCalc需关闭
});

test('非法输入', () => {
  expect(multiplication.bind(null, 1, 'a')).toThrow(TypeError);
  expect(multiplication.bind(null, 1, true)).toThrow(TypeError);
  expect(multiplication.bind(null, 1, false)).toThrow(TypeError);
  expect(multiplication.bind(null, 1, null)).toThrow(TypeError);
  expect(multiplication.bind(null, 1, undefined)).toThrow(TypeError);
  expect(multiplication.bind(null, 1, Symbol(''))).toThrow(TypeError);
  expect(multiplication.bind(null, 1, [])).toThrow(TypeError);
  expect(multiplication.bind(null, 1, {})).toThrow(TypeError);
  expect(multiplication.bind(null, 1)).toThrow(TypeError);
  expect(multiplication.bind(null)).toThrow(TypeError);

  try {
    multiplication(1, true);
  } catch (e) {
    expect(e.message).toBe('输入参数错误');
  }
});
