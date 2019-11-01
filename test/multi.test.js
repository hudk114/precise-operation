import { multiplication } from '../src';

test('标准输入', () => {
  // 整数
  expect(multiplication(1, 2)).toBe('2');
  expect(multiplication(1, -2)).toBe('-2');
  expect(multiplication(1, 0)).toBe('0');
  expect(multiplication(0, 0)).toBe('0');
  expect(multiplication(-1, 0)).toBe('0');
  expect(multiplication(-1, -2)).toBe('2');

  // 整数及小数
  expect(multiplication(2, 0.3)).toBe('0.6');
  expect(multiplication(0, 0.3)).toBe('0');
  expect(multiplication(-2, 0.3)).toBe('-0.6');

  // 小数
  expect(multiplication(0.1, 0.2)).toBe('0.02');
  expect(multiplication(-0.2, 0.1)).toBe('-0.02');
  expect(multiplication(0.1, 0.2, 0.3)).toBe('0.006');

  // NaN，Infinity
  expect(multiplication(NaN, 1)).toBe('NaN');
  expect(multiplication(NaN, Infinity)).toBe('NaN');
  expect(multiplication(Infinity, 0)).toBe('NaN');
  expect(multiplication(Infinity, Infinity)).toBe('Infinity');
});

test('非标准输入', () => {
  expect(multiplication('0.00', 1)).toBe('0');
  expect(multiplication('0.0100000', '204.89000')).toBe('2.0489');
  expect(multiplication('001.0100e-2', 2.05)).toBe('0.020705');
});

test('超过范围数据', () => {
  // expect(add(0.1, 0.2)).toBe(0.3);
});

test('非法输入', () => {
  expect(multiplication.bind(null, 1, 'a')).toThrow(TypeError);
  expect(multiplication.bind(null, 1, true)).toThrow(TypeError);
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
