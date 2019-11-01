import preProcess from '../src/pre/pre-process';
import { preAdd, preMinus, preMulti, preDivision, naN, falsy } from '../src/pre/pre-calc';
import preCheck from '../src/pre/pre-check';

test('pre-check', () => {
  // 非法输入
  expect(preCheck.bind(null, 'a')).toThrow(TypeError);
  expect(preCheck.bind(null, true)).toThrow(TypeError);
  expect(preCheck.bind(null, null)).toThrow(TypeError);
  expect(preCheck.bind(null, Symbol(''))).toThrow(TypeError);
  expect(preCheck.bind(null, [])).toThrow(TypeError);
  expect(preCheck.bind(null, {})).toThrow(TypeError);
  expect(preCheck.bind(null, undefined)).toThrow(TypeError);
  expect(preCheck.bind(null)).toThrow(TypeError);

  try {
    preCheck('-23e-2.6'); // 非法的数字，exp不可能为小数
  } catch (e) {
    expect(e.message).toBe('输入参数错误');
  }
});

test('pre-process', () => {
  expect(preProcess(0.001)).toBe('0.001');
  expect(preProcess(-0)).toBe('-0');
  expect(preProcess(Infinity)).toBe('Infinity');
  expect(preProcess(NaN)).toBe('NaN');
  expect(preProcess('0.00')).toBe('0');
  expect(preProcess('00234')).toBe('234');
  expect(preProcess('234.500')).toBe('234.5');
  expect(preProcess(1.20e3)).toBe('1200');
  expect(preProcess('-01.20e03')).toBe('-1.2e3');
});

test('pre-calc', () => {
  expect(preAdd(NaN, 1)).toBe(naN);
  expect(preAdd(0.1, 1)).toBe(falsy);
  expect(preAdd(Infinity, 1)).toEqual({
    calc: true,
    val: 'Infinity'
  });
  expect(preAdd(2, 1)).toEqual({
    calc: true,
    val: '3'
  });

  expect(preMinus(NaN, 1)).toBe(naN);
  expect(preMinus(0.1, 1)).toBe(falsy);
  expect(preMinus(Infinity, 1)).toEqual({
    calc: true,
    val: 'Infinity'
  });
  expect(preMinus(2, 1)).toEqual({
    calc: true,
    val: '1'
  });

  expect(preMulti(NaN, 1)).toBe(naN);
  expect(preMulti(0.1, 1)).toBe(falsy);
  expect(preMulti(Infinity, 1)).toEqual({
    calc: true,
    val: 'Infinity'
  });
  expect(preMulti(2, 1)).toEqual({
    calc: true,
    val: '2'
  });
  expect(preMulti(0, 0.2)).toEqual({
    calc: true,
    val: '0'
  });

  expect(preDivision(NaN, 1)).toBe(naN);
  expect(preDivision(0.1, 1)).toBe(falsy);
  expect(preDivision(2, 4)).toBe(falsy);
  expect(preDivision(0, 0)).toBe(naN);
  expect(preDivision(0, 3)).toEqual({
    calc: true,
    val: '0'
  });
  expect(preDivision(-3, 0)).toEqual({
    calc: true,
    val: '-Infinity'
  });
  expect(preDivision(Infinity, 1)).toEqual({
    calc: true,
    val: 'Infinity'
  });
});
