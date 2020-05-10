export default class User {
  constructor(showNewNameFunc, savedArticles, name, loginFunc, logoutFunc) {
    this.showNewName = showNewNameFunc;
    this.articles = savedArticles;
    this.loginFunc = loginFunc;
    this.logoutFunc = logoutFunc;
    this.loggedIn = false;
    this.name = name;
    this.updateArticles = this.updateArticles.bind(this);
    this.updateUserName = this.updateUserName.bind(this);
    this.addArticle = this.addArticle.bind(this);
    this.removeArticle = this.removeArticle.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.findArticle = this.findArticle.bind(this);
  }

  updateUserName(newName) {
    this.name = newName;
    this.showNewName(newName);
  }

  updateArticles(newArticles) {
    this.articles = newArticles;
  }

  addArticle(newArticle) {
    console.log('adding article to savedArticles');
    this.articles.push(newArticle);
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

  login(name = this.name, token) {
    console.log(`user.login() as ${this.name}, token: ${token} ${typeof token === 'string'}`);
    this.loggedIn = true;
    this.updateUserName(name);
    this.loginFunc();
    if (token && typeof token === 'string') {
      console.log(`user.login setting token ${typeof token}`);
      localStorage.setItem('jwt', token);
    } else console.log('token не прошел проверку и не записан в localstorage');
  }

  logout() {
    console.log(`user.logout`);
    this.loggedIn = false;
    this.updateUserName('User');
    this.updateArticles([]);
    this.logoutFunc();
    console.log('user.logout removing token');
    localStorage.removeItem('jwt');
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}