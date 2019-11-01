import preProcess from '../src/pre/pre-process';

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
