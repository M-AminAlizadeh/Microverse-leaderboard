import { API } from './gameId.js';

const tableBody = document.querySelector('.table-body');

const recieveData = async (gameId) => {
  const res = await fetch(`${API}${gameId}/scores/`);
  const data = await res.json();
  const scores = data.result;
  // Add to DOM
  let content = '';
  scores.forEach((score) => {
    content += `
              <tr>
                <td>${score.user}</td>
                <td>${score.score}</td>
              </tr>`;
  });
  tableBody.innerHTML = content;
  return scores;
};

export default recieveData;
