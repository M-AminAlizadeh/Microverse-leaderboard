import { API } from './gameId.js';
const nameInput = document.querySelector('#name');
const scoreInput = document.querySelector('#score');

const sendData = async (gameId) => {
  const personData = {
    user: nameInput.value,
    score: scoreInput.value,
  };

  const res = await fetch(`${API}${gameId}/scores/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(personData),
  });

  const data = await res.json();
  console.log(data);
};

export { sendData, nameInput, scoreInput };
