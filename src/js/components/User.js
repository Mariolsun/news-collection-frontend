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
    console.log(`updating username ${newName}`);
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
    console.log(`user.login() as ${this.name}, token: ${token} ${typeof token === 'string'} ${token.includes('Bearer')}`);
    this.loggedIn = true;
    this.updateUserName(name);
    this.loginFunc();
    if (typeof token === 'string' && token.includes('Bearer')) {
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