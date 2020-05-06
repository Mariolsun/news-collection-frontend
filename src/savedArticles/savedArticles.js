import './savedArticles.css';
import User from '../js/components/User';
import Article from '../js/components/Article';
import savedArticles from '../js/data/savedArticles';

const articlesContainer = document.querySelector('.articles__container');
const logoutBtns = document.querySelectorAll('.button_type_logout');


const articleTemplate = document.getElementById('article');
const mobileMenuButton = document.querySelector('.button_type_mobile-menu');
const mobileMenuClose = document.querySelector('.header__mobile-menu-close');
const mobileNavBar = document.querySelector('.header__navbar_type_mobile');

savedArticles.forEach(article => {
  console.log(`making article ${articlesContainer.classList}`);
  let newArticle = new Article(articlesContainer, articleTemplate, article);
  newArticle.visible(true);
})