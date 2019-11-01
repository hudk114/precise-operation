import { minus } from '../src';

test('标准输入', () => {
  // 整数
  expect(minus(2, 1)).toBe('1');
  expect(minus(1, 2)).toBe('-1');
  expect(minus(1, -1)).toBe('2');
  expect(minus(1, 0)).toBe('1');
  expect(minus(0, 0)).toBe('0');
  expect(minus(0, -1)).toBe('1');
  expect(minus(-2, -1)).toBe('-1');
  expect(minus(-1, -2)).toBe('1');
  expect(minus(-1, 1)).toBe('-2');

  // 整数及小数
  expect(minus(1, 0.7)).toBe('0.3');
  expect(minus(-1, 0.7)).toBe('-1.7');
  expect(minus(0, 0.7)).toBe('-0.7');

  // 小数
  expect(minus(0.3, 0.2)).toBe('0.1');
  expect(minus(-0.1, 0.2)).toBe('-0.3');
  expect(minus(0.2, -0.1)).toBe('0.3');
  expect(minus('0.1', 0.1)).toBe('0');
  expect(minus(0.3, 0.2, 0.1)).toBe('0');

  // NaN，Infinity
  expect(minus(NaN, 1)).toBe('NaN');
  expect(minus(Infinity, 0)).toBe('Infinity');
  expect(minus(0, Infinity)).toBe('-Infinity');
  expect(minus(Infinity, Infinity)).toBe('NaN');
  expect(minus(-Infinity, -Infinity)).toBe('NaN');
});

test('非标准输入', () => {
  expect(minus(1, '0.00')).toBe('1');
  expect(minus('0e0', 1)).toBe('-1');
  expect(minus('000', '0')).toBe('0');
  expect(minus('0.0100000', '2.0499')).toBe('-2.0399');
  expect(minus(2.05, '1.00100e-2')).toBe('2.03999');
  expect(minus('001', '2.05')).toBe('-1.05');
  expect(minus('001.0100e-2', 2.05)).toBe('-2.0399');
});

test('超过范围数据', () => {
  // expect(add(0.1, 0.2)).toBe(0.3);
});

test('非法输入', () => {
  expect(minus.bind(null, 1, 'a')).toThrow(TypeError);
  expect(minus.bind(null, 1, true)).toThrow(TypeError);
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
