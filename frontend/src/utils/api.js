class Api {
  constructor({address, headers}) {
    this._address = address;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // Загрузка информации о пользователе с сервера
  getUserProfile() {
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._handleResponse)
  }

  // Редактирование профиля
  setUserProfile(data) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._handleResponse)
  }

  // Обновление аватара пользователя
  setUserAvatar(data) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(this._handleResponse)
  }

  // Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._handleResponse)
  }

  // Добавление новой карточки
  addNewCard(data) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._handleResponse)
  }

  // Удаление карточки
  removeCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._handleResponse)
  }
  
  // Постановка / снятие лайка
  changeLikeCardStatus(id, isLiked) {
      return fetch(`${this._address}/cards/likes/${id}`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers,
    })
  .then(this._handleResponse)
  }
}

export const api = new Api({
  address: "https://api.project-mesto-a1rudy.nomoredomains.monster",
  headers: { 
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json', 
  },
});
