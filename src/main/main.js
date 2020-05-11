import '../vendor/fonts.css';
import './main.css';
import PopupSignin from '../js/components/PopupSignin';
import PopupSignup from '../js/components/PopupSignup';
import PopupSuccessSignup from '../js/components/PopupSuccessSignup';
import Validation from '../js/utils/validation';
import User from '../js/components/User';
import Article from '../js/components/Article';
import Header from '../js/components/Header';
import bookmark from '../images/bookmark.png';
import bookmarkhover from '../images/bookmarkhover.png';
import MainApi from '../js/api/MainApi';
import NewsApi from '../js/api/NewsApi';
import mainApiParams from '../js/constants/mainApiParams';
import newsApiParams from '../js/constants/newsApiParams';
import dateToString from '../js/utils/dateToString';
import getDaysFromToday from '../js/utils/getDaysFromToday';
import MESSAGES from '../js/constants/messages';

import bookmarkMarked from '../images/bookmark-marked.png';

const icons = { marked: bookmarkMarked, unmarked: bookmark, hover: bookmarkhover };

function makeDateStr(days, format = 'YYYY-MM-DD') { //utils
  return dateToString(getDaysFromToday(days), format);
}


const navBar = document.querySelector('.header__navbar'); //прописать мб условие чтобы это был именно десктопный навбар
const authButton = navBar.querySelector('.button_type_auth');
const mainApi = new MainApi(mainApiParams);
const newsApi = new NewsApi(newsApiParams, makeDateStr);
const sectionToAppend = document.querySelector('.page');
const searchButton = document.querySelector('.lead__button');
const searchInput = document.querySelector('.lead__input');
const preloaderSection = document.querySelector('.preloader-section');
const articlesSection = document.querySelector('.articles');
const articlesTitle = document.querySelector('.articles__title');
const articlesContainer = document.querySelector('.articles__container');
const showMoreBtn = document.querySelector('.articles__show-more-btn');
const ARTICLES_TO_SHOW = 3;
const loginPopupTemplate = document.getElementById('popup_type_login');
const articleTemplate = document.getElementById('article');
const signupPopupTemplate = document.getElementById('popup_type_signup');
const successfulSignupTemplate = document.getElementById('popup_type_success-signup');
const articlesNotFoundSection = document.querySelector('.articles-not-found');

const openMobileMenuBtn = document.querySelector('.button_type_mobile-menu'); //разобраться как вынести ивенты в хедер
const closeMobileMenuBtn = document.querySelector('.button_type_close-mobile');
const logoutBtns = document.querySelectorAll('.button_type_logout');
const validation = new Validation(MESSAGES);

const popupSignin = new PopupSignin(
  loginPopupTemplate,
  sectionToAppend,
  openMobileMenuBtn,
  closeMobileMenuBtn,
  validation,
);

const header = new Header();

const user = new User(header.showNewName, [], 'User', header.showLoggedInMenu, header.showLoggedOutMenu);
header.showLoggedOutMenu();
header.hideDesktopNavBar();

function addArticle(articleObj) { // cardList ?
  const { _id, ...data } = articleObj.data;
  mainApi.addArticle(data)
    .then((res) => {
      articleObj.data._id = res.data._id;
      user.addArticle(articleObj);
    })
    .catch((e) => console.log(`error saving article ${e}`));
}

function removeArticle(articleObj) {
  mainApi.removeArticle(articleObj.data._id)
    .then((res) => {
      user.removeArticle(articleObj);
    })
    .catch((e) => console.log(`ошибка удаления карточки ${e}`));
}

mainApi.getUserData()
  .then((res) => {
    header.showDesktopNavBar();
    user.login(res.data.name, res.data.jwt);
  })
  .catch((err) => {
    header.showDesktopNavBar();
    header.showLoggedOutMenu();
    console.log(`Initial Auth error: ${err.message}`);
  });

mainApi.getArticles()
  .then((res) => {
    res.data.forEach((article) => {
      user.addArticle(new Article(
        articlesContainer,
        articleTemplate,
        article,
        user.isLoggedIn,
        addArticle,
        removeArticle,
        icons,
      ));
    });
  })
  .catch((err) => console.log(`error in main.js getArticles (mainApi): ${err}`));

logoutBtns.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    if (event.target.closest('.header__navbar_type_mobile')) header.toggleMobileMenu();
    user.logout();
  });
});


openMobileMenuBtn.addEventListener('click', () => {
  if (user.isLoggedIn()) {
    header.toggleMobileMenu();
    closeMobileMenuBtn.addEventListener('click', header.toggleMobileMenu);
  } else {
    closeMobileMenuBtn.removeEventListener('click', header.toggleMobileMenu);
    popupSignin.open(header.isMobile());
    closeMobileMenuBtn.classList.add('header__navbar-item_visible');
    openMobileMenuBtn.classList.remove('header__navbar-item_visible');
  }
});


const foundArticles = [];
const popupSignup = new PopupSignup(
  signupPopupTemplate,
  sectionToAppend,
  openMobileMenuBtn,
  closeMobileMenuBtn,
  validation,
);

const popupSuccessSignup = new PopupSuccessSignup(
  successfulSignupTemplate,
  sectionToAppend,
  openMobileMenuBtn,
  closeMobileMenuBtn,
);

const loginOfferBtn = popupSuccessSignup.block.querySelector('.popup__other-auth-btn');
const submitSignupBtn = popupSignup.block.querySelector('.popup__button');
const submitLoginBtn = popupSignin.block.querySelector('.popup__button');

const signupBlock = document.querySelector('.popup_type_signup');
const loginBlock = document.querySelector('.popup_type_login');

const loginOfferSignup = loginBlock.querySelector('.popup__other-auth-btn');
const signupOfferLogin = signupBlock.querySelector('.popup__other-auth-btn');


showMoreBtn.addEventListener('click', (event) => {
  event.preventDefault();
  let articlesToShow = ARTICLES_TO_SHOW;
  for (let i = 0; i < foundArticles.length; i += 1) {
    if (!foundArticles[i].isVisible() && articlesToShow > 0) {
      foundArticles[i].visible(true);
      articlesToShow -= 1;
      if (i === foundArticles.length - 1) {
        showMoreBtn.classList.remove('articles__show-more-btn_visible');
        break;
      }
    } else if (articlesToShow === 0) break;
  }
});

loginOfferSignup.addEventListener('click', (event) => {
  popupSignin.close(event);
  popupSignup.open();
});

signupOfferLogin.addEventListener('click', (event) => {
  popupSignup.close(event);
  popupSignin.open();
});


submitSignupBtn.addEventListener('click', (event) => {
  event.preventDefault();
  popupSignup.disable();
  mainApi.signup(popupSignup.emailInput.value,
    popupSignup.passwordInput.value,
    popupSignup.nameInput.value)
    .then((res) => {
      popupSignup.close(event);
      popupSuccessSignup.open();
    })
    .catch((e) => {
      switch (e) {
        case 400:
          popupSignup.alertRender(popupSignup.serverAlert, MESSAGES.SERVER_BAD_REQUEST);
          break;
        case 409:
          popupSignup.alertRender(popupSignup.serverAlert, MESSAGES.SERVER_USER_ALREADY_EXISTS);
          break;
        default:
          popupSignup.alertRender(popupSignup.serverAlert, MESSAGES.SERVER_ERROR);
      }
    })
    .finally(() => {
      popupSignup.enable();
      popupSignup.renderLoading(false);
    });
});

loginOfferBtn.addEventListener('click', (event) => {
  popupSuccessSignup.close(event);
  popupSignin.open();
});

submitLoginBtn.addEventListener('click', (event) => {
  event.preventDefault();
  popupSignin.disable();
  popupSignin.renderLoading(true);
  mainApi.signin(popupSignin.emailInput.value, popupSignin.passwordInput.value)
    .then((res) => {
      user.login(res.data.name, res.data.jwt);
      popupSignin.close(event);
    })
    .catch((e) => {
      switch (e) {
        case 400:
          popupSignin.alertRender(popupSignin.serverAlert, MESSAGES.SERVER_BAD_REQUEST);
          break;
        case 401:
          popupSignin.alertRender(popupSignin.serverAlert, MESSAGES.SERVER_INCORRECT_CREDENTIALS);
          break;
        default:
          popupSignin.alertRender(popupSignin.serverAlert, MESSAGES.SERVER_ERROR);
      }
    })
    .finally(() => {
      popupSignin.enable();
      popupSignin.renderLoading(false);
    });
});


authButton.addEventListener('click', popupSignin.open);

function showFoundArticles(isServerError) {
  if (foundArticles.length === 0 && !isServerError) {
    articlesNotFoundSection.classList.add('articles-not-found_visible');
  } else {
    foundArticles.forEach((article, i) => {
      if (i > 2) article.visible(false);
      else {
        article.visible(true);
      }
    });
    articlesSection.classList.add('articles_visible');
  }

  if (foundArticles.length > 3) showMoreBtn.classList.add('articles__show-more-btn_visible');
  else showMoreBtn.classList.remove('articles__show-more-btn_visible');

  preloaderSection.classList.remove('preloader-section_visible');
}


searchButton.addEventListener('click', (event) => {
  if (searchInput.value) {
    event.preventDefault();
    foundArticles.length = 0;
    articlesContainer.innerHTML = '';
    articlesNotFoundSection.classList.remove('articles-not-found_visible');
    articlesSection.classList.remove('articles_visible');
    preloaderSection.classList.add('preloader-section_visible');
    newsApi.getNews(searchInput.value)
      .then((res) => {
        res.articles.forEach((article) => {
          let newArticle = user.findArticle(article.url);
          if (newArticle) {
            foundArticles.push(newArticle);
            articlesContainer.append(newArticle.block);
            newArticle.bookmarkIcon.src = bookmarkMarked;
            newArticle.isSaved = true;
          } else {
            newArticle = article;
            newArticle.publishedAt = dateToString(new Date(article.publishedAt), 'pretty');
            newArticle.source = article.source.name;
            newArticle.keyword = searchInput.value;
            foundArticles.push(new Article(
              articlesContainer,
              articleTemplate,
              newArticle,
              user.isLoggedIn,
              addArticle,
              removeArticle,
              icons,
            ));
          }
        });
      })
      .then(() => {
        showFoundArticles();
      })
      .catch((e) => {
        console.log(`Error: ${e}`);
        articlesTitle.textContent = 'Во время запроса произошла ошибка. Возможно проблема с соединением или сервер недоступен. Подождите немного и попробуйте еще раз';
        showFoundArticles(true);
      });
  } else searchInput.setCustomValidity('Нужно ввести ключевое слово');
});


articlesContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('article__save-hint')) popupSignin.open();
});


articlesContainer.addEventListener('mouseover', (event) => {
  if (!!event.target.closest('.article__save-options') && !user.isLoggedIn()) {
    const hintBlock = event.target.closest('.article__save-options').querySelector('.article__save-hint');
    hintBlock.classList.toggle('article__save-hint_visible');
  }
});

articlesContainer.addEventListener('mouseout', (event) => {
  if (!!event.target.closest('.article__save-options') && !user.loggedIn) {
    const hintBlock = event.target.closest('.article__save-options').querySelector('.article__save-hint');
    hintBlock.classList.toggle('article__save-hint_visible');
  }
});
