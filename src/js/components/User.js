export default class User {
  constructor(userNameBlocks, savedArticles, name, loginFunc, logoutFunc, loggedIn = true) {
    this.userNameBlocks = userNameBlocks;
    this.articles = savedArticles;
    this.loginFunc = loginFunc;
    this.logoutFunc = logoutFunc;
    this.loggedIn = loggedIn;
    this.name = name;
    this.updateArticles = this.updateArticles.bind(this);
    this.updateUserName = this.updateUserName.bind(this);
    this.addArticle = this.addArticle.bind(this);
    this.removeArticle = this.removeArticle.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);

  }

  updateUserName(newName) {
    console.log(`updating username ${newName}`)
    this.name = newName;
    this.userNameBlocks.forEach(block => {
      block.childNodes[0].nodeValue = this.name;
    });
  }

  updateArticles(newArticles) {
    this.articles = newArticles;
  }

  addArticle(newArticle) {
    this.articles.push(newArticle);
  }

  removeArticle(articleId) {
    this.articles.filter((article) => article._id !== articleId);
  }

  login(name = this.name, token) {
    console.log(`logged in as ${this.name}, token: ${token}`);
    this.loggedIn = true;
    this.updateUserName(name);
    this.loginFunc();
    if (!!token) localStorage.setItem('jwt', token);
  }

  logout() {
    console.log(`user logout`);
    this.loggedIn = false;
    this.updateUserName('User');
    this.updateArticles([]);
    this.logoutFunc();
    localStorage.removeItem('jwt');
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}