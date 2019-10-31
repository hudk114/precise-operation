import { minus } from '../src';

test('常规数据', () => {
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
  expect(minus(0.3, 0.2, 0.1)).toBe('0');

  // NaN，Infinity
  expect(minus(NaN, 1)).toBe('NaN');
  expect(minus(Infinity, 0)).toBe('Infinity');
  expect(minus(0, Infinity)).toBe('-Infinity');
  expect(minus(Infinity, Infinity)).toBe('NaN');
  expect(minus(-Infinity, -Infinity)).toBe('NaN');
});

test('超过范围数据', () => {
  // expect(add(0.1, 0.2)).toBe(0.3);
});

test('非法输入', () => {
  // expect(add(0.1, 0.2)).toBe(0.3);
});
