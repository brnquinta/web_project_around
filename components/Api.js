class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  // Trata response da API
  _handleServerResponse(result) {
    return result.ok
      ? result.json()
      : Promise.reject(`Error: ${result.status}`);
  }
  // Puxa os cartões iniciais
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((result) => this._handleServerResponse(result));
  }
  // Puxa informaçoes de usuário
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((result) => this._handleServerResponse(result));
  }

  // Promessas dos cartões inciais e informações do usuário
  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  // Edita informações do Profile
  editProfileinfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then((result) => this._handleServerResponse(result));
  }

  // Criação de cartões
  createCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    }).then((result) => this._handleServerResponse(result));
  }

  // Alterna status do botão de like
  toggleLike(cardId, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method,
      headers: this._headers,
    }).then((result) => this._handleServerResponse(result));
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((result) => this._handleServerResponse(result));
  }

  // Atualizar avatar do profile
  editProfileAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then((result) => this._handleServerResponse(result));
  }
}

export default Api;
