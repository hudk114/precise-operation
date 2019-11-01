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

// 对于precision与parseToInt会损失精度
test('超过范围数据', () => {
  // 超过默认的15位数据
  expect(multiplication('0.1234567891234567891', '-0.2')).toBe('-0.02469135782469135782');

  // 超过安全范围的数值
  expect(multiplication('90071992547409956.4', '0.3')).toBe('27021597764222986.92');
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
