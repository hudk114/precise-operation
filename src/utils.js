export function digitLength(number) { // TODO rename
  // TODO 科学计数法
  const num = number.toString();
  const digit = num.split('.');
  if (digit.length < 1) {
    return 0;
  }
  return digit[1].length;
}