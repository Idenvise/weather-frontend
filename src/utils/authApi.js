const config = {
    baseUrl: 'http://localhost:3000',
    headers: {
      authorization: localStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
  }
  
export default class Api {
  constructor(config) {
    this.url = config.baseUrl;
    this.headers = config.headers;
  }

  _updateToken() {
    config.headers.authorization = localStorage.getItem('token');
  }

  register(email, password) {
    this._updateToken();
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        "password": password,
        "email": email
      })
    }).then(res => {return this._checkResponse(res)})
  }

  login(email, password) {
    this._updateToken();
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        "password": password,
        "email": email
      })
    }).then(res => {return this._checkResponse(res)})
  }

  tokenCheck() {
    this._updateToken();
    return fetch(`${this.url}/users/me`,{
        headers: {
          authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json',
          'user': JSON.parse(localStorage.getItem('user'))._id
        }
    }).then(res => {return this._checkResponse(res)})
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
}

export const authApi = new Api(config);