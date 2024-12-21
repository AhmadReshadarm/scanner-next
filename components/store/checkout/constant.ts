import { generateArrayOfNumbers } from 'common/helpers/array.helper';

const progressStep = generateArrayOfNumbers(2);
const paginateTo = {
  back: -1,
  forward: 1,
};

export { progressStep, paginateTo };
