import Api from './Api';

export default class MainApi extends Api {
  signin(email, password) {
    this._resetOptions('POST', JSON.stringify({ email, password }));
    return fetch(`${this.baseUrl}/signin`)
      .then((res) => this._getResponseData(res));
  }

  signup(email, password, name) {
    this._resetOptions('POST', JSON.stringify({ email, password, name }));
    return fetch(`${this.baseUrl}/signup`)
      .then((res) => this._getResponseData(res));
  }

  getUserData() {
    this._resetOptions();
    return fetch(`${this.baseUrl}/users/me`, this.options)
      .then((res) => this._getResponseData(res));
  }

  getArticles() {
    this._resetOptions();
    return fetch(`${this.baseUrl}/articles`, this.options)
      .then((res) => this._getResponseData(res));
  }

  createArticle(article) {
    this._resetOptions('POST', JSON.stringify(article));
    return fetch(`${this.baseUrl}/articles`, this.options)
      .then((res) => this._getResponseData(res));
  }

  removeArticle(articleID) {
    this._resetOptions('DELETE');
    return fetch(`${this.baseUrl}/${articleID}`, this.options)
      .then((res) => this._getResponseData(res));
  }

  _resetOptions(method = 'GET', body) {
    this.options.headers.authorization = this._getToken();
    this.options.method = method;
    if (!body) delete this.options.body;
    else this.options.body = body;
  }
}
