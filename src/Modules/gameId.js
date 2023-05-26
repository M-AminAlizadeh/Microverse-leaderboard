/* eslint-disable */
let gameId = localStorage.getItem('gameId') || '';
/* eslint-enable */

const API = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';

// This happens when there is no game id in the localstorage
const makeGameId = async () => {
  const res = await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': 'http://localhost:9000',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    body: JSON.stringify({ name: 'hello world' }),
  });

  const data = await res.json();
  gameId = data.result.slice(14, 34);
  localStorage.setItem('gameId', gameId);
};

export { gameId, API, makeGameId };
