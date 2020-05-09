const newsApiParams = {
  BASE_URL: 'https://newsapi.org/v2/everything?',
  KEYWORD_START: 'q=',
  DATE_FROM: 'from=',
  DATE_TO: 'to=',
  KEYS_DIVIDER: '&',
  API_KEY: 'apiKey=b997a4227035424fb8ffa12b20b07861',
  PAGE_SIZE: 'pageSize=100',
  headers: {
    'Content-Type': 'application/json',
  },
};

export default newsApiParams;
