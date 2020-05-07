import './main.css';
import PopupLogin from '../js/components/PopupLogin';
import PopupSignup from '../js/components/PopupSignup';
import PopupSuccessSignup from '../js/components/PopupSuccessSignup';
import Validation from '../js/utils/validation';
import User from '../js/components/User';
import Article from '../js/components/Article';
import articles from '../js/data/articles';
import savedArticles from '../js/data/savedArticles';
import bookmark from '../images/bookmark.png';
import bookmarkhover from '../images/bookmarkhover.png';

const navBar = document.querySelector('.header__navbar');
const authButton =navBar.querySelector('.button_type_auth');

const userNameBlocks = document.querySelectorAll('.header__username');
const mainPage = document.querySelectorAll('.header__navbar-item_main-page');
const savedArticlesPageLinks = document.querySelectorAll('.header__navbar-item_saved-articles-page');
const logoutBtns = document.querySelectorAll('.button_type_logout');
const authBtns = document.querySelectorAll('.button_type_auth');

logoutBtns.forEach(btn => {
  btn.addEventListener('click', event => {
    user.logout();
  })
})


function showLoggedOutMenu() {
  console.log('showin logged out menu');
  savedArticlesPageLinks.forEach(link => {
    link.classList.remove('header__navbar-item_visible');
  });

  logoutBtns.forEach(btn => {
    btn.classList.remove('header__navbar-item_visible');
  })

  authBtns.forEach(btn => {
    btn.classList.add('header__navbar-item_visible');
  })
}

function showLoggedInMenu() {
  console.log('showing logged in menu');
  savedArticlesPageLinks.forEach(link => {
    link.classList.add('header__navbar-item_visible');
  });

  logoutBtns.forEach(btn => {
    btn.classList.add('header__navbar-item_visible');
  })

  authBtns.forEach(btn => {
    btn.classList.remove('header__navbar-item_visible');

    console.log(`hiding auth btn ${btn.classList}`);
  })
}



const mobileMenuButton = document.querySelector('.button_type_mobile-menu');
const mobileMenuClose = document.querySelector('.header__mobile-menu-close');
const mobileNavBar = document.querySelector('.header__navbar_type_mobile');
const sectionToAppend = document.querySelector('.page');
const searchButton = document.querySelector('.lead__button');
const articlesSection = document.querySelector('.articles');
const articlesContainer = document.querySelector('.articles__container');
const showMoreBtn = document.querySelector('.articles__show-more-btn');
const ARTICLES_TO_SHOW = 3;
const loginPopupTemplate = document.getElementById('popup_type_login');
const articleTemplate = document.getElementById('article');
const signupPopupTemplate = document.getElementById('popup_type_signup');
const successfulSignupTemplate = document.getElementById('popup_type_success-signup');


const validationMessages = {
  required: 'Это обязательное поле',
  incorrectNameLength: 'Должно быть от 2 до 30 символов',
  incorrectPasswordLength: 'Должно быть от 8 символов',
  invalidEmail: 'Неправильный формат email',
  incorrectCredentials: 'Неправильные email или пароль',
  userAlreadyExist: 'Такой пользователь уже есть',
};

const users = [
  'example@test.com',
  'mariolsun@test.com'
]


const validation = new Validation(validationMessages, users);

const popupLogin = new PopupLogin(loginPopupTemplate, sectionToAppend, validation);

const user = new User(userNameBlocks, savedArticles, 'Грета', showLoggedInMenu, showLoggedOutMenu, false);
const foundArticles = articles.map(article => new Article(articlesContainer, articleTemplate, article, user.isLoggedIn));

const popupSignup = new PopupSignup(signupPopupTemplate, sectionToAppend, validation);

const popupSuccessSignup = new PopupSuccessSignup(successfulSignupTemplate, sectionToAppend);


const signupBlock = document.querySelector('.popup_type_signup');
const loginBlock = document.querySelector('.popup_type_login');

const loginOfferSignup = loginBlock.querySelector('.popup__other-auth-btn');
const signupOfferLogin = signupBlock.querySelector('.popup__other-auth-btn');


showMoreBtn.addEventListener('click', function(event) {
  event.preventDefault();
  let articlesToShow = ARTICLES_TO_SHOW;
  for(let i = 0; i < foundArticles.length; i++) {
    if(!foundArticles[i].isVisible() && articlesToShow > 0) {
      foundArticles[i].visible(true);
      articlesToShow = articlesToShow - 1;
      if(i == foundArticles.length - 1) {
        showMoreBtn.classList.remove('articles__show-more-btn_visible');
        break;
      }
    } else if(articlesToShow == 0) break;
  }

});

const loginOfferBtn = popupSuccessSignup.block.querySelector('.popup__other-auth-btn');
const submitSignupBtn = popupSignup.block.querySelector('.popup__button');
const submitLoginBtn = popupLogin.block.querySelector('.popup__button');


function saveHintClick () {
  popupLogin.open();
}

loginOfferSignup.addEventListener('click', event => {
  popupLogin.close(event);
  popupSignup.open();
});

signupOfferLogin.addEventListener('click', event => {
  popupSignup.close(event);
  popupLogin.open();
})


submitSignupBtn.addEventListener('click', event => {
  event.preventDefault();
  user.updateUserName(popupSignup.nameInput.value)
  popupSignup.close(event);
  popupSuccessSignup.open();
})

loginOfferBtn.addEventListener('click', event => {
  popupSuccessSignup.close(event);
  popupLogin.open();
})

submitLoginBtn.addEventListener('click', event => {
  event.preventDefault();
  user.login(user.name, savedArticles)
  popupLogin.close(event);
})


authButton.addEventListener('click', popupLogin.open);




searchButton.addEventListener('click', function(event) {
  console.log('click on find button');
  event.preventDefault();
  foundArticles.forEach((article, i) => {
    if(i > 2) article.visible(false);
    else article.visible(true);
  });

  if(foundArticles.length > 3) showMoreBtn.classList.add('articles__show-more-btn_visible');
  else showMoreBtn.classList.remove('articles__show-more-btn_visible');
  articlesSection.classList.add('articles_visible');
})



articlesContainer.addEventListener('click', function(event) {
  if(event.target.classList.contains('article__save-hint')) popupLogin.open();

})


articlesContainer.addEventListener('mouseover', function(event) {
  if(!!event.target.closest('.article__save-options') && !user.loggedIn) {
    let hintBlock = event.target.closest('.article__save-options').querySelector('.article__save-hint');
    hintBlock.classList.toggle('article__save-hint_visible');
  }

  if(event.target.classList.contains('article__button_type_toggle-save') && !!event.target.querySelector('.article__bookmark-icon')) {
    event.target.querySelector('.article__bookmark-icon').src = bookmarkhover;
    console.log('fuck you');
  }

  if(event.target.classList.contains('article__bookmark-icon')) {
    console.log('fuck you too');
    event.target.style.src = bookmarkhover;
  }
})

articlesContainer.addEventListener('mouseout', function(event) {
  if(!!event.target.closest('.article__save-options') && !user.loggedIn) {
    let hintBlock = event.target.closest('.article__save-options').querySelector('.article__save-hint');
    hintBlock.classList.toggle('article__save-hint_visible');
  }

  if(event.target.classList.contains('article__button_type_toggle-save') && !event.relatedTarget.classList.contains('article__bookmark-icon') && !!event.target.querySelector('.article__bookmark-icon')) {
    event.target.querySelector('.article__bookmark-icon').src = bookmark;
    console.log('fuck you');
  }

  if(event.target.classList.contains('article__bookmark-icon') && !event.relatedTarget.classList.contains('article__button_type_toggle-save')) {
    console.log('fuck you too');
    event.target.style.src = bookmark;
  }
})




