import preCheck from './pre/pre-check';
import { preAdd, preMinus, preMulti, preDivision } from './pre/pre-calc';
import Calculation from './calc';
import PrecisionCalculation from './calc/precision-calculation';
import ParseToIntCalculation from './calc/parse-to-int-calculation';
import CustomCalculation from './calc/custom-calculation';

// const calculation = new PrecisionCalculation();
// const calculation = new ParseToIntCalculation();
const calculation = new CustomCalculation();

export function add (num1, num2, ...rest) {
  if (rest.length) return add(Number(add(num1, num2)), ...rest);

  preCheck(num1, num2);
  const res = preAdd(num1, num2);
  if (res.calc) return res.val;

  return calculation.add(num1, num2);
}

export function minus (num1, num2, ...rest) {
  if (rest.length) return minus(Number(minus(num1, num2)), ...rest);

  preCheck(num1, num2);
  const res = preMinus(num1, num2);
  if (res.calc) return res.val;

  return calculation.minus(num1, num2);
}

export function multiplication (num1, num2, ...rest) {
  if (rest.length) return multiplication(Number(multiplication(num1, num2)), ...rest);

  preCheck(num1, num2);
  const res = preMulti(num1, num2);
  if (res.calc) return res.val;

  return calculation.multiplication(num1, num2);
}

export function division (num1, num2, ...rest) {
  if (rest.length) return division(Number(division(num1, num2)), ...rest);

  preCheck(num1, num2);
  const res = preDivision(num1, num2);
  if (res.calc) return res.val;

  return calculation.division(num1, num2);
}
