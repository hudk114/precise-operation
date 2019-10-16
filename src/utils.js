export function getDecimalLength (number) {
  const regExp = /^[+-]?(\d+)(\.(\d*))?(e([+-]?\d+))?$/;
  const match = number.toString().match(regExp);
  if (!match) {
    throw new TypeError(`输入数字 ${number} 不符合规范`);
  }

  const decimal = match[3] || '';
  const exp = match[5] || 0;

  return decimal.length - exp;

  // // TODO 科学计数法
  // const num = number.toString();
  // const digit = num.split('.');
  // if (digit.length < 2) {
  //   return 0;
  // }
  // return digit[1].length;
}

export function isInteger (number) {
  return !getDecimalLength(number);
}
