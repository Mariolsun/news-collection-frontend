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
const mobileNavBar = document.querySelector('.header__navbar_type_mobile');

const infoTitle = document.querySelector('.info__title');
const infoKeywords = document.querySelector('.info__keywords');

const articles = []

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
