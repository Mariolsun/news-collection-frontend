export default class Api {
  constructor(apiParams) {
    this.options = {
      headers: apiParams.headers,
    };
    this.baseUrl = apiParams.BASE_URL;
    this.apiParams = apiParams;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

   _getToken() {
    return localStorage.getItem('jwt');
  }

  _resetOptions(method = 'GET', body) {
    console.log(`resetting options, token: ${typeof this._getToken()}`);
    this.options.headers.authorization = this._getToken();
    this.options.method = method;
    if (!body) delete this.options.body;
    else this.options.body = body;
  }
}
