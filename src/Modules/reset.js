import { nameInput, scoreInput } from './send.js';

const resetForm = () => {
  nameInput.value = '';
  scoreInput.value = '';
};

export { resetForm };
