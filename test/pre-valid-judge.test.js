/**
 * 输入：合法的标准、非标准数字或字符
 * 输出：标准数字字符
 */

import preValid from '../src/pre/pre-valid';

test('pre-valid-judge', () => {
  // 非法输入
  expect(preValid.bind(null, 'a')).toThrow(TypeError);
  expect(preValid.bind(null, true)).toThrow(TypeError);
  expect(preValid.bind(null, null)).toThrow(TypeError);
  expect(preValid.bind(null, Symbol(''))).toThrow(TypeError);
  expect(preValid.bind(null, [])).toThrow(TypeError);
  expect(preValid.bind(null, {})).toThrow(TypeError);
  expect(preValid.bind(null, undefined)).toThrow(TypeError);
  expect(preValid.bind(null)).toThrow(TypeError);

  try {
    preValid('-23e-2.6'); // 非法的数字，exp不可能为小数
  } catch (e) {
    expect(e.message).toBe('输入参数错误');
  }
});
