import { add } from '../src';

test('标准输入', () => {
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

  // 指数
  expect(add('1e3', 0.2, 0.1)).toBe('1000.3');
  expect(add('1e3', '2e-2')).toBe('1000.02');

  // NaN，Infinity
  expect(add(NaN, 1)).toBe('NaN');
  expect(add(Infinity, 0)).toBe('Infinity');
  expect(add(-Infinity, 0)).toBe('-Infinity');
  expect(add(Infinity, -Infinity)).toBe('NaN');
});

test('非标准输入', () => {
  expect(add('0.00', 1)).toBe('1');
  expect(add('0e0', 1)).toBe('1');
  expect(add('0.0100000', '2.0499')).toBe('2.0599');
  expect(add('1.00100e-2', 2.05)).toBe('2.06001');
  expect(add('001', '2.05')).toBe('3.05');
  expect(add('001.0100e-2', 2.05)).toBe('2.0601');
});

// 对于precision与parseToInt会损失精度
test('超过范围数据', () => {
  // 超过默认的15位数据
  expect(add('0.1234567891234567891', '0.2')).toBe('0.3234567891234567891');

  // 超过安全范围的数值
  expect(add('90071992547409956.4', '0.3')).toBe('90071992547409956.7');
});

test('非法输入', () => {
  expect(add.bind(null, 1, 'a')).toThrow(TypeError);
  expect(add.bind(null, 1, true)).toThrow(TypeError);
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
