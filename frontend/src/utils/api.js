import { baseUrl } from './constants';

const handleResponse = (response) =>
  response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`);

// Загрузка информации о пользователе с сервера
export const getUserProfile = () => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  }).then(handleResponse);
};

// Редактирование профиля
export const setUserProfile = (data) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      name: data.name,
      about: data.about,
    }),
  }).then(handleResponse);
};

// Обновление аватара пользователя
export const setUserAvatar = (data) => {
  return fetch(`${baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      avatar: data.avatar,
    }),
  }).then(handleResponse);
};

// Загрузка карточек с сервера
export const getInitialCards = () => {
  return fetch(`${baseUrl}/cards`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  }).then(handleResponse);
};

// Добавление новой карточки
export const addNewCard = (data) => {
  return fetch(`${baseUrl}/cards`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      name: data.name,
      link: data.link,
    }),
  }).then(handleResponse);
};

// Удаление карточки
export const removeCard = (id) => {
  return fetch(`${baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  }).then(handleResponse);
};

// Постановка / снятие лайка
export const changeLikeCardStatus = (id, isLiked) => {
  return fetch(`${baseUrl}/cards/${id}/likes`, {
    method: isLiked ? 'DELETE' : 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  }).then(handleResponse);
};
