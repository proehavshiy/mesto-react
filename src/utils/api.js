class Api {
  constructor({ serverUrl, cohort, token, }) {
    this._serverUrl = serverUrl; // https://mesto.nomoreparties.co/v1
    //this._requestPath = requestPath; // меняется постоянно напр: users/me
    this._cohort = cohort; // cohort-22
    this._token = token; // a039ff03-9c34-4fce-91e0-77cd409474e3
  }
  ////метод для единого вызова методов серверных запросов
  //getPromiseAll(...requests) {
  //  const promises = [...requests]
  //  //console.log("Promise.all - массив изначальный",promises);
  //  return Promise.all(promises)
  //}
  //проверка метода
  _checkResponse(response) {
    if(response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`)
  }
  //запрос информации профиля с сервера
  getUserInfo() {
    return fetch(`${this._serverUrl}/${this._cohort}/users/me`, {
      headers: {
        authorization: this._token
      }
    }).then(this._checkResponse);
  }
  //запрос карточек с сервера
  getCards() {
    return fetch(`${this._serverUrl}/${this._cohort}/cards`, {
      headers: {
        authorization: this._token
      }
    }).then(this._checkResponse);
  }
  //отправка на сервер новых данных пользователя
  //Метод PATCH обычно используют для обновления сущностей, уже существующих на сервере
  sendUserInfo({ newName, newAbout }) {
    return fetch(`${this._serverUrl}/${this._cohort}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    })
    .then(this._checkResponse);
  }
  //добавление новой карточки на сервер
  sendNewCard({ name, link }) {
    return fetch(`${this._serverUrl}/${this._cohort}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name, //название карточки
        link: link //ссылка на картинку
      })
    })
    .then(this._checkResponse);
  }
  //добавление новой карточки на сервер
  deleteCard(cardId) {
    //{ name, link },
    return fetch(`${this._serverUrl}/${this._cohort}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        //name: name, //название карточки
        //link: link, //ссылка на картинку
        _id: cardId
      })
    })
    .then(this._checkResponse);
  }
  //добавить лайк карточки
  addLikeCard({ cardId, likes }) {
    return fetch(`${this._serverUrl}/${this._cohort}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: cardId,
        likes: likes
      })
    })
    .then(this._checkResponse);
  }
  deleteLikeCard({ cardId, likes }) {
    return fetch(`${this._serverUrl}/${this._cohort}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: cardId,
        likes: likes
      })
    })
    .then(this._checkResponse);
  }
  //Обновление аватара пользователя
  sendUserAvatar({ newAvatarLink }) {
    return fetch(`${this._serverUrl}/${this._cohort}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: newAvatarLink
      })
    })
    .then(this._checkResponse);
  }
}

const api = new Api({
  serverUrl: 'https://mesto.nomoreparties.co/v1',
  cohort: 'cohort-22',
  token: 'a039ff03-9c34-4fce-91e0-77cd409474e3'
})

export default api;
