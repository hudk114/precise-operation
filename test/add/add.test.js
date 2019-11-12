/**
 * 输入：标准、非标准数字或字符及非法输入
 * 输出：非法输入抛出异常，标准或非标准输入输出计算结果
 */

import { add } from '../../src/index';

test('标准输入', () => {
  expect(add(1, 2)).toBe('3');
  expect(add(2, -1)).toBe('1');
  expect(add(0, 0.3)).toBe('0.3');
  expect(add(1, 0.7)).toBe('1.7');
  expect(add(-1, 0.7)).toBe('-0.3');
  expect(add(-0.1, 0.1)).toBe('0');
  expect(add(0.3, 0.8)).toBe('1.1');
  expect(add(-0.1, 0.2)).toBe('0.1');
  expect(add(0.1, 0.2, 0.3)).toBe('0.6');

  expect(add('1', '2')).toBe('3');
  expect(add('2', '-1')).toBe('1');
  expect(add('0', '0.3')).toBe('0.3');
  expect(add('1', '0.7')).toBe('1.7');
  expect(add('-1', '0.7')).toBe('-0.3');
  expect(add('-0.1', '0.1')).toBe('0');
  expect(add('0.3', '0.2')).toBe('0.5');
  expect(add('-0.1', '0.2')).toBe('0.1');
  expect(add('1.01e-2', '20.5e-1')).toBe('2.0601');
  expect(add('0.1', '0.2', '0.3')).toBe('0.6');

  expect(add(-1, '0.7')).toBe('-0.3');
  expect(add('-0.1', 0.2)).toBe('0.1');
  expect(add('1.01e-2', 2.05)).toBe('2.0601');
  expect(add('-0.3', 0.2, '0.1')).toBe('0');
  expect(add('1e3', 0.2, 0.1)).toBe('1000.3');

  expect(add(NaN, 0)).toBe('NaN');
  expect(add(NaN, Infinity)).toBe('NaN');
  expect(add(NaN, NaN)).toBe('NaN');
  expect(add(0, Infinity)).toBe('Infinity');
  expect(add(0, 0)).toBe('0');
  expect(add(0, NaN)).toBe('NaN');
  expect(add(Infinity, NaN)).toBe('NaN');
  expect(add(Infinity, Infinity)).toBe('Infinity');
  expect(add(Infinity, -Infinity)).toBe('NaN');
  expect(add(Infinity, 0)).toBe('Infinity');

  expect(add(NaN, 1)).toBe('NaN');
  expect(add(Infinity, 1)).toBe('Infinity');
  expect(add(1, 0)).toBe('1');
  expect(add(1, -0)).toBe('1');
  expect(add(0, 1)).toBe('1');
  expect(add('22.4000e-1', 1)).toBe('3.24');
  expect(add(1, 0, -3)).toBe('-2');

  expect(add(Infinity, 0, Infinity)).toBe('Infinity');
});

test('非标准输入', () => {
  expect(add('0.00', 1)).toBe('1');
  expect(add('0e0', 1)).toBe('1');
  expect(add('0.0100000', '2.0499')).toBe('2.0599');
  expect(add('1.00100e-2', 2.05)).toBe('2.06001');
  expect(add('001', '2.05')).toBe('3.05');
  expect(add('001.0100e-2', 2.05)).toBe('2.0601');

  expect(add('0.1234567891234567891', '0.2')).toBe('0.3234567891234567891'); // precisionCalc与parseIntCalc需关闭
  expect(add('90071992547409956.4', '0.3')).toBe('90071992547409956.7'); // precisionCalc与parseIntCalc需关闭
});

test('非法输入', () => {
  expect(add.bind(null, 1, 'a')).toThrow(TypeError);
  expect(add.bind(null, 1, true)).toThrow(TypeError);
  expect(add.bind(null, 1, false)).toThrow(TypeError);
  expect(add.bind(null, 1, null)).toThrow(TypeError);
  expect(add.bind(null, 1, Symbol(''))).toThrow(TypeError);
  expect(add.bind(null, 1, [])).toThrow(TypeError);
  expect(add.bind(null, 1, {})).toThrow(TypeError);
  expect(add.bind(null, 1, undefined)).toThrow(TypeError);
  expect(add.bind(null, 1)).toThrow(TypeError);
  expect(add.bind(null)).toThrow(TypeError);

  try {
    add(1, true);
  } catch (e) {
    expect(e.message).toBe('输入参数错误');
  }
});
