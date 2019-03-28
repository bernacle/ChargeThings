import { PUBLIC_KEY } from 'react-native-dotenv';

export const BASE_URL = 'http://localhost:3000/payment';

const headers = {
  Authorization: `Bearer ${PUBLIC_KEY}`
};

export async function getToken(body) {
  const response = await fetch(`${BASE_URL}/token`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  let data = await response.json();

  return data;
}

export async function pay(body) {
  console.log(body);
  const response = await fetch(`${BASE_URL}/pay`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  let data = await response.json();

  return data;
}
