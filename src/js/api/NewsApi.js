import Api from './Api';

export default class NewsApi extends Api {
  constructor(apiParams, makeDateStr) {
    super(apiParams);
    this.makeDateStr = makeDateStr;
  }


  _getRequestURL(keyword) {
    return this.baseUrl
         + this.apiParams.KEYWORD_START + keyword
         + this.apiParams.KEYS_DIVIDER
         + this.apiParams.API_KEY
         + this.apiParams.KEYS_DIVIDER
         + this.apiParams.DATE_FROM + this.makeDateStr(7)
         + this.apiParams.KEYS_DIVIDER
         + this.apiParams.DATE_TO + this.makeDateStr()
         + this.apiParams.KEYS_DIVIDER
         + this.apiParams.PAGE_SIZE
         + this.apiParams.KEYS_DIVIDER
         + this.apiParams.LANGUAGE;
  }

  getNews(keyword) {
    this._resetOptions();
    return fetch(this._getRequestURL(keyword))
      .then((res) => this._getResponseData(res));
  }

  _resetOptions() {
    this.options = {
      method: 'GET',
      headers: this.apiParams.headers,
    };
  }
}
