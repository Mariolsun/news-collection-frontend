import BaseComponent from './BaseComponent';

export default class ArticlesList extends BaseComponent {
  constructor(savedArticles = [], foundArticles = []) {
    super();
    this.savedArticles = savedArticles;
    this.foundArticles = foundArticles;
  }

  updateArticles(newArticles) {
    this.articles = newArticles;
  }

  addArticle(newArticle) {
    console.log('adding article to savedArticles');
    this.articles.push(newArticle);
    this.articles.forEach((article) => { console.log(`article ${article.title.textContent}`); });
  }

  removeArticle(article) {
    console.log('removing article from savedArticles');
    this.articles.splice(this.articles.indexOf(article));
  }

  findArticle(url) {
    console.log(`user.js checking ${url}`);
    let result = this.articles.find((article) => {
      console.log(`comparing to ${article}`);
      return article.url.includes(url);
    });
    return result;
  }

}