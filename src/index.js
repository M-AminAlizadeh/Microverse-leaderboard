import './style.css';

let gameId = localStorage.getItem('gameId') || '';
const API =
  'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
const nameInput = document.querySelector('#name');
const scoreInput = document.querySelector('#score');
const submitBtn = document.querySelector('.submit-btn');
const tableBody = document.querySelector('.table-body');
const refreshBtn = document.querySelector('.refresh-btn');

if (gameId) {
  // Send data to api
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API}${gameId}/scores/`);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    const body = JSON.stringify({
      user: nameInput.value,
      score: scoreInput.value,
    });
    xhr.onload = () => {
      if (xhr.readyState == 4 && xhr.status == 201) {
        console.log(JSON.stringify(xhr.responseText));
      } else {
        console.log(`Error: ${xhr.status}`);
      }
    };

    xhr.send(body);
    // Clear form inputs
    nameInput.value = "";
    scoreInput.value = "";
  });

  // Get data from api
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${API}${gameId}/scores/`);
  xhr.send();
  xhr.responseType = 'json';
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const dataArr = xhr.response.result;
      console.log(dataArr);
      let content = '';
      dataArr.forEach((obj) => {
        content += `
            <tr>
              <td>${obj.user}</td>
              <td>${obj.score}</td>
            </tr>`;
      });
      tableBody.innerHTML = content;
    } else {
      console.log(`Error: ${xhr.status}`);
    }
  };
} else {
  // Link local app to api and recieve gameId from api
  const xhr = new XMLHttpRequest();
  xhr.open('POST', API);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  const body = JSON.stringify({
    name: 'Leaderboard Game',
  });
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 201) {
      // Get gameId from API
      gameId = JSON.parse(xhr.responseText).result.slice(14, 34);
      // Set gameId to local storage
      localStorage.setItem('gameId', gameId);
    } else {
      console.log(`Error: ${xhr.status}`);
    }
  };

  xhr.send(body);
}

refreshBtn.addEventListener('click', () => {
  location.reload();
});
