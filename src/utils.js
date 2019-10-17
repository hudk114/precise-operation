export function getDecimalLength (number) {
  const regExp = /^[+-]?(\d+)(\.(\d*))?(e([+-]?\d+))?$/;
  const match = number.toString().match(regExp);
  if (!match) {
    throw new TypeError(`输入数字 ${number} 不符合规范`);
  }

  const decimal = match[3] || '';
  const exp = match[5] || 0;

  return decimal.length - exp;
}

export function isInteger (number) {
  return !getDecimalLength(number);
}
