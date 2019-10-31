import { division } from '../src';

test('常规数据', () => {
  // 整数
  expect(division(1, 2)).toBe('0.5');
  expect(division(1, -2)).toBe('-0.5');
  expect(division(1, 0)).toBe('Infinity');
  expect(division(0, 0)).toBe('NaN');
  expect(division(-1, 0)).toBe('-Infinity');
  expect(division(-1, -2)).toBe('0.5');

  // 整数及小数
  // expect(division(1, 0.3)).toBe('1.3');
  // expect(division(0, 0.3)).toBe('0.3');
  // expect(division(-1, 0.3)).toBe('-0.7');

  // 小数
  expect(division(2.24, 100)).toBe('0.0224');
  expect(division(-0.3, 0.1)).toBe('-3');
  expect(division(2.24, 100, 0.2)).toBe('0.112');

  // NaN，Infinity
  expect(division(NaN, 1)).toBe('NaN');
  expect(division(Infinity, 0)).toBe('Infinity');
  expect(division(0, Infinity)).toBe('0');
  expect(division(0, 0)).toBe('NaN');
  expect(division(Infinity, Infinity)).toBe('NaN');
});

test('超过范围数据', () => {
  // expect(add(0.1, 0.2)).toBe(0.3);
});

test('非法输入', () => {
  // expect(division(0, 0)).toBe(0);
  // expect(add(0.1, 0.2)).toBe(0.3);
});
