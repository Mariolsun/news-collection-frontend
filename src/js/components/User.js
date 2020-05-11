import wordEndings from '../utils/wordEndings';
import sortByPop from '../utils/sortByPop';

export default class User {
  constructor(showNewNameFunc, savedArticles, name, loginFunc, logoutFunc) {
    this.showNewName = showNewNameFunc;
    this.articles = savedArticles;
    this.loginFunc = loginFunc;
    this.logoutFunc = logoutFunc;
    this.sortByPop = sortByPop; // импортировать через конструктор
    this.loggedIn = false;
    this.name = name;
    this.getWordEndings = wordEndings;
    this.updateArticles = this.updateArticles.bind(this);
    this.updateUserName = this.updateUserName.bind(this);
    this.addArticle = this.addArticle.bind(this);
    this.removeArticle = this.removeArticle.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.findArticle = this.findArticle.bind(this);
    this.infoTitle = document.querySelector('.info__title');
    this.infoKeywords = document.querySelector('.info__keywords');
    this.infoSubTitle = document.querySelector('.info__articles-keywords');
  }

  updateUserName(newName) {
    this.name = newName;
    this.showNewName(newName);
  }

  updateArticles(newArticles) {
    this.articles = newArticles;
  }

  addArticle(newArticle) {
    this.articles.push(newArticle);
  }

  removeArticle(article) {
    this.articles.splice(this.articles.indexOf(article));
    this.renderInfo();
  }

  renderInfo() {
    if (this.articles.length) {
      const word = this.getWordEndings(this.articles.length);
      this.infoSubTitle.childNodes[0].textContent = 'По ключевым словам: ';
      this.infoTitle.textContent = `${this.name}, у вас ${this.articles.length} ${word.saved} ${word.articles}`;
      const uniqueKeywords = this.sortByPop(this.articles.map((article) => article.keyword.textContent));
      switch (uniqueKeywords.length) {
        case 0:
          this.infoKeywords.textContent = '';
          break;
        case 1:
        case 2:
        case 3:
          this.infoKeywords.textContent = `${uniqueKeywords[0]}`;
          uniqueKeywords.forEach((keyword, i) => {
            if (i !== 0) this.infoKeywords.textContent += `, ${keyword}`;
          });
          break;
        default:
          this.infoKeywords.innerHTML = `<b>${uniqueKeywords[0]}</b>, <b>${uniqueKeywords[1]}</b> и <b>${uniqueKeywords.length - 2} другим</b>`;
          break;
      }
    } else {
      this.infoTitle.textContent = `${this.name}, у вас нет сохранённых новостей`;
      this.infoKeywords.textContent = '';
      this.infoSubTitle.childNodes[0].textContent = 'Воспользуйтесь поиском на главной, чтобы сохранить карточки новостей!';
    }
  }


  findArticle(url) {
    let result = this.articles.find((article) => {
      return article.data.url.includes(url);
    });
    return result;
  }

  login(name = this.name, token) {
    this.loggedIn = true;
    this.updateUserName(name);
    console.log(`updated user name ${this.name}`);
    this.loginFunc();
    if (token && typeof token === 'string') {
      localStorage.setItem('jwt', token);
    }
  }

  logout() {
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