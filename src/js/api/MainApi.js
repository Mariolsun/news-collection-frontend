import Api from './Api';

export default class MainApi extends Api {
  signin(email, password) {
    this._resetOptions('POST', JSON.stringify({ email, password }));
    return fetch(`${this.baseUrl}/signin`, this.options)
      .then((res) => {
        let readRes = this._getResponseData(res);
        return readRes;
      });
  }

  signup(email, password, name) {
    this._resetOptions('POST', JSON.stringify({ email, password, name }));
    return fetch(`${this.baseUrl}/signup`, this.options)
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

  addArticle(article) {
    this._resetOptions('POST', JSON.stringify(article));
    return fetch(`${this.baseUrl}/articles`, this.options)
      .then((res) => this._getResponseData(res));
  }

  removeArticle(articleID) {
    this._resetOptions('DELETE');
    return fetch(`${this.baseUrl}/articles/${articleID}`, this.options)
      .then((res) => this._getResponseData(res));
  }
}
