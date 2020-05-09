export default class Api {
  constructor(apiParams) {
    this.headers = apiParams.headers;
    this.baseUrl = apiParams.BASE_URL;
    this.apiParams = apiParams;
  }

  // eslint-disable-next-line class-methods-use-this
  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }
}
