import Api from './Api';

export default class NewsApi extends Api {
  constructor(headers, apiParams, makeDateStr) {
    super(headers, apiParams);
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
         + this.apiParams.PAGE_SIZE;
  }

  getNews(keyword) {
    return fetch(this._getRequestURL(keyword), this.options)
      .then((res) => this._getResponseData(res));
  }
}
