import BaseComponent from './BaseComponent';

export default class ArticlesList extends BaseComponent {
  constructor(savedArticles = [], foundArticles = []) {
    super();
    this.savedArticles = savedArticles;
    this.foundArticles = foundArticles;
  }

  renderResults() {

  }

  renderLoader() {

  }

  renderError() {

  }

  showMore() {

  }

  addCard() {

  }

}