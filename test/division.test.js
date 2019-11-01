import { division } from '../src';

test('标准输入', () => {
  // 整数
  expect(division(1, 2)).toBe('0.5');
  expect(division(1, -2)).toBe('-0.5');
  expect(division(1, 0)).toBe('Infinity');
  expect(division(0, 0)).toBe('NaN');
  expect(division(-1, 0)).toBe('-Infinity');
  expect(division(-1, -2)).toBe('0.5');

  // 整数及小数
  expect(division(0.3, 1)).toBe('0.3');
  expect(division(0, 0.3)).toBe('0');
  expect(division(-0.3, 10)).toBe('-0.03');

  // 小数
  expect(division(2.24, 100)).toBe('0.0224');
  expect(division(-0.3, 0.1)).toBe('-3');
  expect(division(2.24, 100, 0.2)).toBe('0.112');

  // 指数
  expect(division('224e-2', '10e3')).toBe('0.000224');

  // NaN，Infinity
  expect(division(NaN, 1)).toBe('NaN');
  expect(division(Infinity, 0)).toBe('Infinity');
  expect(division(1, 0)).toBe('Infinity');
  expect(division(1, -0)).toBe('-Infinity');
  expect(division(0, Infinity)).toBe('0');
  expect(division(0, 0)).toBe('NaN');
  expect(division(Infinity, Infinity)).toBe('NaN');

  // 无限循环小数
  // precisionCalc与parseIntCalc，默认精度15位
  // parseIntCalc由于会超出MAX_SAFE_INTEGER造成部分计算不精确
  // expect(division(0.5, 0.3)).toBe('1.66666666666667');
  // expect(division(1, 0.3)).toBe('3.33333333333333');
  // expect(division(1, 3)).toBe('0.333333333333333');

  // customCalc，默认精度21位
  expect(division(0.5, 0.3)).toBe('1.66666666666666666667');
  expect(division(1, 0.3)).toBe('3.3333333333333333333');
  expect(division(1, 3)).toBe('0.33333333333333333333');
});

test('非标准输入', () => {
  expect(division(1, '0.00')).toBe('Infinity');
  expect(division('22.4000e-1', 100)).toBe('0.0224');
  expect(division('002.24', '01e2')).toBe('0.0224');
});

test('超过范围数据', () => {
  // expect(add(0.1, 0.2)).toBe(0.3);
});

test('非法输入', () => {
  expect(division.bind(null, 1, 'a')).toThrow(TypeError);
  expect(division.bind(null, 1, true)).toThrow(TypeError);
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
