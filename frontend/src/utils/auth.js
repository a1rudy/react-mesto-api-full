import { baseUrl } from './constants';

const handleResponse = (response) =>
  response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`);

export const register = (email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
};

export const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
};
