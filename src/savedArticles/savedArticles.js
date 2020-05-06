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

const infoTitle = document.querySelector('.info__title');
const infoKeywords = document.querySelector('.info__keywords');

savedArticles.forEach(article => {
  console.log(`making article ${articlesContainer.classList}`);
  let newArticle = new Article(articlesContainer, articleTemplate, article);
  newArticle.visible(true);
})


let uniqueKeywords = []
function countKeywords(articles) {
  articles.forEach(article => {
    console.log(`comparing ${article.keyword}`)
    if(!uniqueKeywords.includes(article.keyword)) uniqueKeywords.push(article.keyword);
  });
}

countKeywords(savedArticles);

infoTitle.textContent = `Грета, у вас ${savedArticles.length} сохранённых новостей`;

if(uniqueKeywords.length > 3) {
  infoKeywords.textContent = `${uniqueKeywords[0]}, ${uniqueKeywords[1]} и ${uniqueKeywords.length - 2} другим`
} else {
  let text = `${uniqueKeywords[0]}`;
  uniqueKeywords.forEach((keyword, i) => {

    if(i !=0) text += `, ${keyword}`;
  })
  infoKeywords.textContent = text;
}