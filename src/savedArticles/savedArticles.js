import '../vendor/fonts.css';
import './savedArticles.css';
import User from '../js/components/User';
import Article from '../js/components/Article';
import savedArticles from '../js/data/savedArticles';
import trashhovericon from '../images/trashhovericon.png'

const articlesContainer = document.querySelector('.articles__container');
const logoutBtns = document.querySelectorAll('.button_type_logout');


const articleTemplate = document.getElementById('article');
const mobileMenuButton = document.querySelector('.button_type_mobile-menu');
const mobileMenuClose = document.querySelector('.header__mobile-menu-close');

const infoTitle = document.querySelector('.info__title');
const infoKeywords = document.querySelector('.info__keywords');

const articles = []



const sectionToAppend = document.querySelector('.page');
const searchButton = document.querySelector('.lead__button');
const preloaderSection = document.querySelector('.preloader-section');
const articlesSection = document.querySelector('.articles');
const showMoreBtn = document.querySelector('.articles__show-more-btn');
const ARTICLES_TO_SHOW = 3;
const loginPopupTemplate = document.getElementById('popup_type_login');
const signupPopupTemplate = document.getElementById('popup_type_signup');
const successfulSignupTemplate = document.getElementById('popup_type_success-signup');
const articlesNotFoundSection = document.querySelector('.articles-not-found');


const mobileHeader = document.querySelector('.header_type_mobile');
const mobileNavBar = mobileHeader.querySelector('.header__navbar_type_mobile');
const openMobileMenuBtn = mobileHeader.querySelector('.button_type_mobile-menu');
const closeMobileMenuBtn = mobileHeader.querySelector('.button_type_close-mobile');
const inactivePageLinks = document.querySelectorAll('.header__navbar-item_inactive-page');

const userNameBlocks = document.querySelectorAll('.header__username');
const authBtns = document.querySelectorAll('.button_type_auth');

savedArticles.forEach(article => {
  console.log(`making article ${articlesContainer.classList}`);
  let newArticle = new Article(articlesContainer, articleTemplate, article, userCheck);
  newArticle.block.removeEventListener('click', newArticle.toggleSave);
  newArticle.keyword.classList.add('article__keyword_visbile');
  newArticle.visible(true);
  articles.push(newArticle);
})

function userCheck() {
  return true;
}


function countKeywords(articles) {
  let uniqueKeywords = []
  articles.forEach(article => {
    console.log(`comparing ${article.data.keyword}`)
    if(!uniqueKeywords.includes(article.data.keyword)) uniqueKeywords.push(article.data.keyword);
  });
  return uniqueKeywords;
}

countKeywords(articles);

infoTitle.textContent = `Грета, у вас ${articles.length} сохранённых новостей`;
function showInfo() {
let uniqueKeywords = countKeywords(articles);
if(uniqueKeywords.length > 3) {
  infoKeywords.innerHTML = `<b>${uniqueKeywords[0]}</b>, <b>${uniqueKeywords[1]}</b> и <b>${uniqueKeywords.length - 2} другим</b>`
} else {
  let text = `${uniqueKeywords[0]}`;
  uniqueKeywords.forEach((keyword, i) => {

    if(i !=0) text += `, ${keyword}`;
  })
  infoKeywords.textContent = text;
}
}

showInfo()



articlesContainer.addEventListener('mouseover', function(event) {
  if(!!event.target.closest('.article__save-options')) {
    let hintBlock = event.target.closest('.article__save-options').querySelector('.article__save-hint');
    hintBlock.classList.toggle('article__save-hint_visible');
  }

  if(event.target.classList.contains('article__button_type_toggle-save') && !!event.target.querySelector('.article__bookmark-icon')) {
    event.target.querySelector('.article__bookmark-icon').src = '../images/trashhovericon.png';
  }

  if(event.target.classList.contains('article__bookmark-icon')) {
    event.target.style.src = '../images/trashhovericon.png';
  }
})

articlesContainer.addEventListener('mouseout', function(event) {
  if(!!event.target.closest('.article__save-options')) {
    let hintBlock = event.target.closest('.article__save-options').querySelector('.article__save-hint');
    hintBlock.classList.toggle('article__save-hint_visible');
  }

  if(event.target.classList.contains('article__button_type_toggle-save') && !event.relatedTarget.classList.contains('article__bookmark-icon') && !!event.target.querySelector('.article__bookmark-icon')) {
    event.target.querySelector('.article__bookmark-icon').src = '../images/trash-icon.png';
  }

  if(event.target.classList.contains('article__bookmark-icon') && !event.relatedTarget.classList.contains('article__button_type_toggle-save')) {
    event.target.style.src = '../images/trash-icon.png';
  }
})

articlesContainer.addEventListener('click', event => {
  if(!!event.target.closest('.article__button_type_toggle-save')) {
    event.target.closest('.article').classList.remove('article_visible');
  }
})

logoutBtns.forEach(btn => {
  btn.addEventListener('click', event => {
    if(!!event.target.closest('.header__navbar_type_mobile')) toggleMobileMenu();
    document.location.href = 'http://localhost:8080';
  })
})

window.addEventListener('resize', event => {
  if(document.documentElement.clientWidth > 767 && mobileNavBar.classList.contains('header__navbar_visible')) {
    toggleMobileMenu();
  }
})


function showLoggedOutMenu() {
  console.log('showin logged out menu');
  inactivePageLinks.forEach(link => {
    link.classList.remove('header__navbar-item_visible');
  });

  logoutBtns.forEach(btn => {
    btn.classList.remove('header__navbar-item_visible');
  })

  authBtns.forEach(btn => {
    btn.classList.add('header__navbar-item_visible');
  })
}
// NavBar handle
function showLoggedInMenu() {
  console.log('showing logged in menu');
  inactivePageLinks.forEach(link => {
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


function toggleMobileMenu (event) {
  mobileHeader.classList.toggle('header_is-opened-mobile');
  mobileNavBar.classList.toggle('header__navbar_visible');
  closeMobileMenuBtn.classList.toggle('header__navbar-item_visible');
  openMobileMenuBtn.classList.toggle('header__navbar-item_visible');
}


openMobileMenuBtn.addEventListener('click', event => {

    showLoggedInMenu();
  console.log('user loggen in, toggling mobile menu');
    toggleMobileMenu();
    closeMobileMenuBtn.addEventListener('click', toggleMobileMenu);


});