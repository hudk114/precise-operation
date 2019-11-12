import PrecisionCalculation from './precision-calculation';
import ParseToIntCalculation from './parse-to-int-calculation';
import CustomCalculation from './custom-calculation';
import { MAX_EXP, MAX_DECIMAL } from '../config';

const precisionCalculation = new PrecisionCalculation(MAX_DECIMAL); // eslint-disable-line no-unused-vars
const parseToIntCalculation = new ParseToIntCalculation(MAX_DECIMAL); // eslint-disable-line no-unused-vars
const customCalculation = new CustomCalculation(MAX_EXP); // eslint-disable-line no-unused-vars

const calculation = customCalculation;

export default calculation;
