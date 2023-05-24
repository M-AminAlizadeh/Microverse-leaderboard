import './style.css';



let gameId = localStorage.getItem('gameId') || '';

if (gameId) {
  // Get data from api
  
  // Set data to api
} else {
  // Link local app to api and recieve ID from api
  const xhr = new XMLHttpRequest();
  const API =
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
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
