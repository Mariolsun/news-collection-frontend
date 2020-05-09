export default class Api {
  constructor(apiParams) {
    this.options = {
      headers: apiParams.headers,
    };
    this.baseUrl = apiParams.BASE_URL;
    this.apiParams = apiParams;
  }

  static _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  static _getToken() {
    return localStorage.getItem('token');
  }
}
