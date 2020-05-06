export default class User {
  constructor(logoutBtns, savedArticles, name, loggedIn = true) {
    this.loggedIn = loggedIn;
    this.logoutBtns = logoutBtns;
    this.articles = savedArticles;
    this.name = name;

    this.updateArticles = this.updateArticles.bind(this);
    this.updateUserName = this.updateUserName.bind(this);
    this.addArticle = this.addArticle.bind(this);
    this.removeArticle = this.removeArticle.bind(this);
  }

  updateUserName(newName) {
    this.logoutBtns = document.querySelectorAll('button_type_logout');
    this.name = name;
    this.logoutBtns.forEach(button => {
      button.textContent = this.name;
    });
  }

  updateArticles(newArticles) {
    this.articles = newArticles;
  }

  addArticle(newArticle) {
    this.articles.push(newArticle);
  }

  removeArticle(articleId) {
    this.articles.filter(article => article._id != articleId);
  }

  logout() {
    this.loggedIn = false;
    this.updateUserName('User');
    this.updateArticles([]);
  }

}