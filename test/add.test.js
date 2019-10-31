import { add } from '../src';
import { paraError } from '../src/error';

test('常规数据', () => {
  // 整数
  expect(add(1, 2)).toBe('3');
  expect(add(1, -2)).toBe('-1');
  expect(add(1, 0)).toBe('1');
  expect(add(0, 0)).toBe('0');
  expect(add(-1, 0)).toBe('-1');
  expect(add(-1, -2)).toBe('-3');

  // 整数及小数
  expect(add(1, 0.3)).toBe('1.3');
  expect(add(0, 0.3)).toBe('0.3');
  expect(add(-1, 0.3)).toBe('-0.7');

  // 小数
  expect(add(0.1, 0.2)).toBe('0.3');
  expect(add(-0.3, 0.1)).toBe('-0.2');
  expect(add(-0.1, 0.1)).toBe('0');
  expect(add(0.1, 0.2, 0.3)).toBe('0.6');

  // NaN，Infinity
  expect(add(NaN, 1)).toBe('NaN');
  expect(add(Infinity, 0)).toBe('Infinity');
  expect(add(-Infinity, 0)).toBe('-Infinity');
  expect(add(Infinity, -Infinity)).toBe('NaN');
});

test('超过范围数据', () => {
  // expect(add(0.1, 0.2)).toBe(0.3);
});

test('非法输入', () => {
  expect(add.bind(null, 1, 'a')).toThrow(TypeError);
  expect(add.bind(null, 1, true)).toThrow(TypeError);
  expect(add.bind(null, 1, null)).toThrow(TypeError);
  expect(add.bind(null, 1, undefined)).toThrow(TypeError);
  expect(add.bind(null, 1, Symbol(''))).toThrow(TypeError);
  expect(add.bind(null, 1, [])).toThrow(TypeError);
  expect(add.bind(null, 1, {})).toThrow(TypeError);

  try {
    add(1, true);
  } catch (e) {
    expect(e.message).toBe('输入参数错误');
  }
  // expect(add(0.1, 0.2)).toBe(0.3);
});
