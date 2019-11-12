/**
 * 输入：标准、非标准数字或字符及非法输入
 * 输出：非法输入抛出异常，标准或非标准输入输出计算结果
 */

import { minus } from '../../src';

test('标准输入', () => {
  expect(minus(1, 2)).toBe('-1');
  expect(minus(2, -1)).toBe('3');
  expect(minus(0, 0.3)).toBe('-0.3');
  expect(minus(1, 0.7)).toBe('0.3');
  expect(minus(-1, 0.7)).toBe('-1.7');
  expect(minus(0.3, 0.2)).toBe('0.1');
  expect(minus(-0.1, 0.2)).toBe('-0.3');
  expect(minus(0.3, 0.2, 0.1)).toBe('0');

  expect(minus('1', '2')).toBe('-1');
  expect(minus('2', '-1')).toBe('3');
  expect(minus('0', '0.3')).toBe('-0.3');
  expect(minus('1', '0.7')).toBe('0.3');
  expect(minus('-1', '0.7')).toBe('-1.7');
  expect(minus('0.3', '0.2')).toBe('0.1');
  expect(minus('-0.1', '0.2')).toBe('-0.3');
  expect(minus('1.01e-2', '20.5e-1')).toBe('-2.0399');
  expect(minus('0.3', '0.2', '0.1')).toBe('0');

  expect(minus(-1, '0.7')).toBe('-1.7');
  expect(minus('-0.1', 0.2)).toBe('-0.3');
  expect(minus('1.01e-2', 2.05)).toBe('-2.0399');
  expect(minus('0.3', 0.2, '0.1')).toBe('0');

  expect(minus(NaN, 0)).toBe('NaN');
  expect(minus(NaN, Infinity)).toBe('NaN');
  expect(minus(NaN, NaN)).toBe('NaN');
  expect(minus(0, Infinity)).toBe('-Infinity');
  expect(minus(0, 0)).toBe('0');
  expect(minus(0, NaN)).toBe('NaN');
  expect(minus(Infinity, NaN)).toBe('NaN');
  expect(minus(Infinity, Infinity)).toBe('NaN');
  expect(minus(Infinity, -Infinity)).toBe('Infinity');
  expect(minus(Infinity, 0)).toBe('Infinity');

  expect(minus(NaN, 1)).toBe('NaN');
  expect(minus(Infinity, 1)).toBe('Infinity');
  expect(minus(1, 0)).toBe('1');
  expect(minus(1, -0)).toBe('1');
  expect(minus(0, 1)).toBe('-1');
  expect(minus('22.4000e-1', 1)).toBe('1.24');
  expect(minus(1, 0, 3)).toBe('-2');

  expect(minus(Infinity, 0, -Infinity)).toBe('Infinity');
});

test('非标准输入', () => {
  expect(minus('1', '0.00')).toBe('1');
  expect(minus('0e0', '1')).toBe('-1');
  expect(minus('000', '0')).toBe('0');
  expect(minus('001', '2.05')).toBe('-1.05');
  expect(minus('001.0100e-2', '2.05')).toBe('-2.0399');

  expect(minus('0.1234567891234567891', '0.2')).toBe('-0.0765432108765432109'); // precisionCalc与parseIntCalc需关闭
  expect(minus('90071992547409956.4', '0.3')).toBe('90071992547409956.1'); // precisionCalc与parseIntCalc需关闭
});

test('非法输入', () => {
  expect(minus.bind(null, 1, 'a')).toThrow(TypeError);
  expect(minus.bind(null, 1, true)).toThrow(TypeError);
  expect(minus.bind(null, 1, false)).toThrow(TypeError);
  expect(minus.bind(null, 1, null)).toThrow(TypeError);
  expect(minus.bind(null, 1, undefined)).toThrow(TypeError);
  expect(minus.bind(null, 1, Symbol(''))).toThrow(TypeError);
  expect(minus.bind(null, 1, [])).toThrow(TypeError);
  expect(minus.bind(null, 1, {})).toThrow(TypeError);
  expect(minus.bind(null, 1)).toThrow(TypeError);
  expect(minus.bind(null)).toThrow(TypeError);

  try {
    minus(1, true);
  } catch (e) {
    expect(e.message).toBe('输入参数错误');
  }
});
