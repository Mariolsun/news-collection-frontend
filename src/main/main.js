import './main.css';
import PopupLogin from '../js/components/PopupLogin';
import PopupSignup from '../js/components/PopupSignup';
import PopupSuccessSignup from '../js/components/PopupSuccessSignup';
import Validation from '../js/utils/validation';
import User from '../js/components/User';
import Article from '../js/components/Article';
import articles from '../js/data/articles';
import savedArticles from '../js/data/savedArticles';

const navBar = document.querySelector('.header__navbar');
const authButton =navBar.querySelector('.button_type_auth');
const savedArticlesPage = document.querySelector('.header__navbar-item_inactive-page');
const logoutBtns = document.querySelectorAll('.button_type_logout');
const mobileMenuButton = document.querySelector('.button_type_mobile-menu');
const mobileMenuClose = document.querySelector('.header__mobile-menu-close');
const mobileNavBar = document.querySelector('.header__navbar_type_mobile');
const sectionToAppend = document.querySelector('.page');
const findButton = document.querySelector('.lead__button');
const foundArticles = document.querySelectorAll('.article');
const articlesSection = document.querySelector('.articles');
const articlesContainer = document.querySelector('.articles__container');
const showMoreBtn = document.querySelector('.articles__show-more-btn');


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

const user = new User(logoutBtns, savedArticles, 'Грета');

const popupSignup = new PopupSignup(signupPopupTemplate, sectionToAppend, validation);

const popupSuccessSignup = new PopupSuccessSignup(successfulSignupTemplate, sectionToAppend);


const signupBlock = document.querySelector('.popup_type_signup');
const loginBlock = document.querySelector('.popup_type_login');

const loginOfferSignup = loginBlock.querySelector('.popup__other-auth-btn');
const signupOfferLogin = signupBlock.querySelector('.popup__other-auth-btn');



const loginBtn = popupSuccessSignup.block.querySelector('.popup__other-auth-btn');

const submitSignupBtn = popupSignup.block.querySelector('.popup__button');







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
  popupSignup.close(event);
  popupSuccessSignup.open();
})

loginBtn.addEventListener('click', event => {
  popupSuccessSignup.close(event);
  popupLogin.open();
})



authButton.addEventListener('click', popupLogin.open);




findButton.addEventListener('click', function(event) {
  console.log('click on find button');
  event.preventDefault();
  articles.forEach((article) => {
    let newArticle = new Article(articlesContainer, articleTemplate, article);
    newArticle.visible(true);

  })
  articlesSection.classList.toggle('articles_visible');
})












/*authButton.addEventListener('click', function(event) {
  console.log('click on authbutton');
  event.preventDefault();
  authButton.classList.remove('header__navbar-item_visible');
  userButton.classList.add('header__navbar-item_visible');
  savedArticlesPage.classList.add('header__navbar-item_visible');
})

userButton.addEventListener('click', function(event) {
  console.log('click on userbutton');
  authButton.classList.add('header__navbar-item_visible');
  userButton.classList.remove('header__navbar-item_visible');
  savedArticlesPage.classList.remove('header__navbar-item_visible');
})


mobileMenuButton.addEventListener('click', function(event) {
  console.log('click on mobile menu button');
  mobileNavBar.classList.add('header__navbar_visible');
  mobileMenuClose.setAttribute('display', 'inline');
})



findButton.addEventListener('click', function(event) {
  event.preventDefault();
  console.log('find button pressed');
  articlesSection.classList.toggle('articles_visible');
})

showMoreBtn.addEventListener('click', function(event) {
  event.preventDefault();
  console.log('show more btn pressed');
  let articlesToShow = 3;
  for(let i = 0; i< foundArticles.length; i++) {

    if(!foundArticles[i].classList.contains('article_visible') && articlesToShow > 0) {
      foundArticles[i].classList.toggle('article_visible');
      articlesToShow -= 1;
    } else if(articlesToShow == 0) break;
  }

});

articlesContainer.addEventListener('click', function(event) {
  event.preventDefault();
  if (event.target.classList.contains('article__button_type_toggle-save')) {
    if(event.target.style.backgroundImage.includes("bookmark-marked.png")) {
      event.target.style.backgroundImage = "url('../../../../../images/bookmark.png')"
    } else {
        console.log(`click on bookmark ${typeof event.target.style.backgroundImage}`);
        event.target.style.backgroundImage = "url('../../../../../images/bookmark-marked.png')";
    }
  }
})

*/