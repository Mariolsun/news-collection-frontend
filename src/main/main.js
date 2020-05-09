import '../vendor/fonts.css';
import './main.css';
import PopupLogin from '../js/components/PopupLogin';
import PopupSignup from '../js/components/PopupSignup';
import PopupSuccessSignup from '../js/components/PopupSuccessSignup';
import Validation from '../js/utils/validation';
import User from '../js/components/User';
import Article from '../js/components/Article';
import bookmark from '../images/bookmark.png';
import bookmarkhover from '../images/bookmarkhover.png';
import MainApi from '../js/api/MainApi';
import NewsApi from '../js/api/NewsApi';
import mainApiParams from '../js/constants/mainApiParams';
import newsApiParams from '../js/constants/newsApiParams';
import dateToString from '../js/utils/dateToString';
import getDaysFromToday from '../js/utils/getDaysFromToday';

function makeDateStr(days, format = 'YYYY-MM-DD') {
  return dateToString(getDaysFromToday(days), format);
}

const users = [];
const navBar = window.document.querySelector('.header__navbar');
const authButton = navBar.querySelector('.button_type_auth');
const inactivePageLinks = document.querySelectorAll('.header__navbar-item_inactive-page');
const logoutBtns = document.querySelectorAll('.button_type_logout');
const authBtns = document.querySelectorAll('.button_type_auth');
const newsApi = new NewsApi(newsApiParams, makeDateStr);

const mobileHeader = document.querySelector('.header_type_mobile');
const mobileNavBar = mobileHeader.querySelector('.header__navbar_type_mobile');
const openMobileMenuBtn = mobileHeader.querySelector('.button_type_mobile-menu');
const closeMobileMenuBtn = mobileHeader.querySelector('.button_type_close-mobile');


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


const validationMessages = {
  required: 'Это обязательное поле',
  incorrectNameLength: 'Должно быть от 2 до 30 символов',
  incorrectPasswordLength: 'Должно быть от 8 символов',
  invalidEmail: 'Неправильный формат email',
  incorrectCredentials: 'Неправильные email или пароль',
  userAlreadyExist: 'Такой пользователь уже есть',
};

function toggleMobileMenu() {
  mobileHeader.classList.toggle('header_is-opened-mobile');
  mobileNavBar.classList.toggle('header__navbar_visible');
  closeMobileMenuBtn.classList.toggle('header__navbar-item_visible');
  openMobileMenuBtn.classList.toggle('header__navbar-item_visible');
}

// NavBar handle


// NavBar handle
window.addEventListener('resize', () => {
  if (document.documentElement.clientWidth > 767 && mobileNavBar.classList.contains('header__navbar_visible')) {
    toggleMobileMenu();
  }
});

// NavBar handle
function showLoggedOutMenu() {
  console.log('showin logged out menu');
  inactivePageLinks.forEach((link) => {
    link.classList.remove('header__navbar-item_visible');
  });

  logoutBtns.forEach((btn) => {
    btn.classList.remove('header__navbar-item_visible');
  });

  authBtns.forEach((btn) => {
    btn.classList.add('header__navbar-item_visible');
  });
}
// NavBar handle
function showLoggedInMenu() {
  console.log('showing logged in menu');
  inactivePageLinks.forEach((link) => {
    link.classList.add('header__navbar-item_visible');
  });

  logoutBtns.forEach((btn) => {
    btn.classList.add('header__navbar-item_visible');
  });

  authBtns.forEach((btn) => {
    btn.classList.remove('header__navbar-item_visible');

    console.log(`hiding auth btn ${btn.classList}`);
  });
}


// NavBar handle

const validation = new Validation(validationMessages, users);

const popupLogin = new PopupLogin(
  loginPopupTemplate,
  sectionToAppend,
  openMobileMenuBtn,
  closeMobileMenuBtn,
  validation,
);

const user = new User(logoutBtns, [], 'Грета', showLoggedInMenu, showLoggedOutMenu, false);

logoutBtns.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    if (event.target.closest('.header__navbar_type_mobile')) toggleMobileMenu();
    user.logout();
  });
});


openMobileMenuBtn.addEventListener('click', () => {
  if (user.isLoggedIn()) {
    console.log('user loggen in, toggling mobile menu');
    toggleMobileMenu();
    closeMobileMenuBtn.addEventListener('click', toggleMobileMenu);
  } else {
    console.log('user not logged in, openin popup login');
    closeMobileMenuBtn.removeEventListener('click', toggleMobileMenu);
    const isMobile = true;
    popupLogin.open(isMobile);
    closeMobileMenuBtn.classList.add('header__navbar-item_visible');
    openMobileMenuBtn.classList.remove('header__navbar-item_visible');
  }
});

/* const foundArticles = articles.map((article) => new Article(
  articlesContainer,
  articleTemplate,
  article,
  user.isLoggedIn,
)); */

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
const submitLoginBtn = popupLogin.block.querySelector('.popup__button');

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
  popupLogin.close(event);
  popupSignup.open();
});

signupOfferLogin.addEventListener('click', (event) => {
  popupSignup.close(event);
  popupLogin.open();
});


submitSignupBtn.addEventListener('click', (event) => {
  event.preventDefault();
  user.updateUserName(popupSignup.nameInput.value);
  popupSignup.close(event);
  popupSuccessSignup.open();
});

loginOfferBtn.addEventListener('click', (event) => {
  popupSuccessSignup.close(event);
  popupLogin.open();
});

submitLoginBtn.addEventListener('click', (event) => {
  event.preventDefault();
  user.login(user.name, savedArticles);
  popupLogin.close(event);
});


authButton.addEventListener('click', popupLogin.open);

function showFoundArticles(isServerError) {
  if (foundArticles.length === 0 && !isServerError) {
    articlesNotFoundSection.classList.add('articles-not-found_visible');
  } else {
    foundArticles.forEach((article, i) => {
      if (i > 2) article.visible(false);
      else article.visible(true);
    });
    articlesSection.classList.add('articles_visible');
  }

  if (foundArticles.length > 3) showMoreBtn.classList.add('articles__show-more-btn_visible');
  else showMoreBtn.classList.remove('articles__show-more-btn_visible');

  preloaderSection.classList.remove('preloader-section_visible');
  console.log(`all done ${preloaderSection.classList}`);
}

searchInput.setCustomValidity('Введите тему новости');

searchButton.addEventListener('click', (event) => {
  console.log('click on search button');
  event.preventDefault();
  if (searchInput.value) {
    foundArticles.length = 0;
    articlesContainer.innerHTML = '';
    articlesNotFoundSection.classList.remove('articles-not-found_visible');
    articlesSection.classList.remove('articles_visible');
    preloaderSection.classList.add('preloader-section_visible');
console.log(`gettin ${searchInput.value}`);
    newsApi.getNews(searchInput.value)
      .then((res) => {
        res.articles.forEach((article) => {
          foundArticles.push(new Article(
            articlesContainer,
            articleTemplate,
            article,
            user.isLoggedIn,
          ));
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
  }
});


articlesContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('article__save-hint')) popupLogin.open();
});


articlesContainer.addEventListener('mouseover', (event) => {
  if (!!event.target.closest('.article__save-options') && !user.loggedIn) {
    const hintBlock = event.target.closest('.article__save-options').querySelector('.article__save-hint');
    hintBlock.classList.toggle('article__save-hint_visible');
  }

  if (event.target.classList.contains('article__button_type_toggle-save') && !!event.target.querySelector('.article__bookmark-icon')) {
    const blockOfHover = event.target.querySelector('.article__bookmark-icon');
    blockOfHover.src = bookmarkhover;
  }

  if (event.target.classList.contains('article__bookmark-icon')) {
    const blockOfHover = event.target;
    blockOfHover.src = bookmarkhover;
  }
});

articlesContainer.addEventListener('mouseout', (event) => {
  if (!!event.target.closest('.article__save-options') && !user.loggedIn) {
    const hintBlock = event.target.closest('.article__save-options').querySelector('.article__save-hint');
    hintBlock.classList.toggle('article__save-hint_visible');
  }

  if (event.target.classList.contains('article__button_type_toggle-save') && !event.relatedTarget.classList.contains('article__bookmark-icon') && !!event.target.querySelector('.article__bookmark-icon')) {
    const blockOfNoHover = event.target.querySelector('.article__bookmark-icon');
    blockOfNoHover.src = bookmark;
  }

  if (event.target.classList.contains('article__bookmark-icon') && !event.relatedTarget.classList.contains('article__button_type_toggle-save')) {
    const blockOfNoHover = event.target;
    blockOfNoHover.src = bookmark;
  }
});

/*
    TO_DO:
            Разгрести main.js
            Написать MainApi
            Сделать валидацию поисковой строки (пустой запрос)
            Написать класс управления хедером
*/
