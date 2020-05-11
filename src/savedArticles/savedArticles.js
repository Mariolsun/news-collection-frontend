import '../vendor/fonts.css';
import './savedArticles.css';
import User from '../js/components/User';
import Article from '../js/components/Article';
import MainApi from '../js/api/MainApi';
import mainApiParams from '../js/constants/mainApiParams';
import Header from '../js/components/Header';
import trashhovericon from '../images/trashhovericon.png';

const articlesContainer = document.querySelector('.articles__container');
const logoutBtns = document.querySelectorAll('.button_type_logout');
const articleTemplate = document.getElementById('article');


const icons = { hover: '../images/trashhovericon.png' };


const mobileHeader = document.querySelector('.header_type_mobile');
const mobileNavBar = mobileHeader.querySelector('.header__navbar_type_mobile');
const openMobileMenuBtn = mobileHeader.querySelector('.button_type_mobile-menu');
const closeMobileMenuBtn = mobileHeader.querySelector('.button_type_close-mobile');
const inactivePageLinks = document.querySelectorAll('.header__navbar-item_inactive-page');

const authBtns = document.querySelectorAll('.button_type_auth');

const header = new Header();

const user = new User(header.showNewName, [], 'User', header.showLoggedInMenu, header.showLoggedOutMenu);
header.showLoggedOutMenu();
header.hideDesktopNavBar();

const mainApi = new MainApi(mainApiParams);


function addArticle(articleObj) { // cardList ?
  const { data } = articleObj;
  if ('_id' in data) delete data._id;
  mainApi.addArticle(data)
    .then((res) => {
      console.log(`added article ${res.data._id}`);
      articleObj.data_id = res.data._id;
      user.addArticle(articleObj);
    })
    .catch((e) => console.log(`error saving article ${e}`));
}

function removeArticle(articleObj) {
  mainApi.removeArticle(articleObj.data._id)
    .then((res) => {
      user.removeArticle(articleObj);
      user.renderInfo();
    })
    .catch((e) => console.log(`ошибка удаления карточки ${e}`));
}

mainApi.getUserData()
  .then((res) => {
    header.showDesktopNavBar();
    console.log(`got user data: ${res.data.name}`);
    user.login(res.data.name);
    user.renderInfo();
  })
  .catch((err) => {
    header.showDesktopNavBar();
    header.showLoggedOutMenu();
    console.log(`Initial Auth error: ${err.message}`);
    document.location.href = '../index.html';
  });

mainApi.getArticles()
  .then((res) => {
    res.data.forEach((article) => {
      const newArticle = new Article(
        articlesContainer,
        articleTemplate,
        article,
        user.isLoggedIn,
        removeArticle,
        addArticle,
        icons,
      );
      newArticle.keywordVisible(true);
      newArticle.visible(true);
      user.addArticle(newArticle);
    });
    user.renderInfo();
  })
  .catch((err) => console.log(`error in savedArticles.js getArticles (mainApi): ${err}`));


articlesContainer.addEventListener('mouseover', (event) => {
  if (event.target.closest('.article__save-options')) {
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

articlesContainer.addEventListener('mouseout', (event) => {
  if (!!event.target.closest('.article__save-options')) {
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
    document.location.href = '../index.html';
  })
})

window.addEventListener('resize', event => {
  if(document.documentElement.clientWidth > 767 && mobileNavBar.classList.contains('header__navbar_visible')) {
    toggleMobileMenu();
  }
})


function showLoggedOutMenu() {
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
  inactivePageLinks.forEach(link => {
    link.classList.add('header__navbar-item_visible');
  });

  logoutBtns.forEach(btn => {
    btn.classList.add('header__navbar-item_visible');
  });

  authBtns.forEach(btn => {
    btn.classList.remove('header__navbar-item_visible');
  });
}


function toggleMobileMenu (event) {
  mobileHeader.classList.toggle('header_is-opened-mobile');
  mobileNavBar.classList.toggle('header__navbar_visible');
  closeMobileMenuBtn.classList.toggle('header__navbar-item_visible');
  openMobileMenuBtn.classList.toggle('header__navbar-item_visible');
}


openMobileMenuBtn.addEventListener('click', event => {
  showLoggedInMenu();
  toggleMobileMenu();
  closeMobileMenuBtn.addEventListener('click', toggleMobileMenu);
});


logoutBtns.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    if (event.target.closest('.header__navbar_type_mobile')) header.toggleMobileMenu();
    user.logout();
    location.href = '../index.html';
  });
});
