import { multiplication } from '../src';

test('常规数据', () => {
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
  expect(multiplication(Infinity, 0)).toBe('NaN');
  expect(multiplication(Infinity, Infinity)).toBe('Infinity');
});

test('超过范围数据', () => {
  // expect(add(0.1, 0.2)).toBe(0.3);
});

test('非法输入', () => {
  // expect(add(0.1, 0.2)).toBe(0.3);
});
