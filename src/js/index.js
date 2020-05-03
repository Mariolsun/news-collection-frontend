import '../style/style.css';
const navBar = document.querySelector('.header__navbar');
const authButton =navBar.querySelector('.button_type_auth');
const userButton = navBar.querySelector('.button_type_logout');
const savedArticlesPage = document.querySelector('.header__navbar-item_inactive-page');

const mobileMenuButton = document.querySelector('.button_type_mobile-menu');
const mobileMenuClose = document.querySelector('.header__mobile-menu-close');
const mobileNavBar = document.querySelector('.header__navbar_type_mobile');

authButton.addEventListener('click', function(event) {
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