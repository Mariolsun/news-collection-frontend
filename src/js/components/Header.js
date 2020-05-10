import BaseComponent from './BaseComponent';

export default class Header extends BaseComponent {
  constructor() {
    super();
    this.inactivePageLinks = document.querySelectorAll('.header__navbar-item_inactive-page');
    this.logoutBtns = document.querySelectorAll('.button_type_logout');
    this.mobileHeader = document.querySelector('.header_type_mobile');
    this.authBtns = document.querySelectorAll('.button_type_auth');
    this.mobileNavBar = this.mobileHeader.querySelector('.header__navbar_type_mobile');
    this.openMobileMenuBtn = this.mobileHeader.querySelector('.button_type_mobile-menu');
    this.closeMobileMenuBtn = this.mobileHeader.querySelector('.button_type_close-mobile');

    this.showLoggedInMenu = this.showLoggedInMenu.bind(this);
    this.showLoggedOutMenu = this.showLoggedOutMenu.bind(this);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.showNewName = this.showNewName.bind(this);
    this.desktopHeader = document.querySelector('.header_type_desktop');
    this.desktopNavBar = this.desktopHeader.querySelector('.header__navbar');

    window.addEventListener('resize', event => {
      if (document.documentElement.clientWidth > 767 && this.mobileNavBar.classList.contains('header__navbar_visible')) {
        this.toggleMobileMenu();
      }
    });

  }

  hideDesktopNavBar() {
    this.desktopNavBar.classList.remove('header__navbar_visible');
  }

  showDesktopNavBar() {
    console.log('showing desktopNavBar');
    this.desktopNavBar.classList.add('header__navbar_visible');
  }

  toggleMobileMenu() {
    this.mobileHeader.classList.toggle('header_is-opened-mobile');
    this.mobileNavBar.classList.toggle('header__navbar_visible');
    this.closeMobileMenuBtn.classList.toggle('header__navbar-item_visible');
    this.openMobileMenuBtn.classList.toggle('header__navbar-item_visible');
  }

  isMobile() {
    return this.mobileNavBar.classList.contains('header__navbar_visible');
  }

  showLoggedOutMenu() {
    console.log('showin logged out menu');
    this.inactivePageLinks.forEach((link) => {
      link.classList.remove('header__navbar-item_visible');
    });

    this.logoutBtns.forEach((btn) => {
      btn.classList.remove('header__navbar-item_visible');
    });

    this.authBtns.forEach((btn) => {
      btn.classList.add('header__navbar-item_visible');
    });
  }

  showLoggedInMenu() {
    console.log('showing logged in menu');
    this.inactivePageLinks.forEach((link) => {
      link.classList.add('header__navbar-item_visible');
    });

    this.logoutBtns.forEach((btn) => {
      btn.classList.add('header__navbar-item_visible');
    });

    this.authBtns.forEach((btn) => {
      btn.classList.remove('header__navbar-item_visible');

      console.log(`hiding auth btn ${btn.classList}`);
    });
  }

  showNewName(newName) {
    console.log(`updating username ${newName}`);
    this.logoutBtns.forEach(btn => {
      btn.childNodes[0].nodeValue = newName;
    });
  }
}
