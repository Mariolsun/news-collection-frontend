export default class NavbarHandler {
  constructor(mobileHeader, mobileNavBar) {
    this.logoutBtns = document.querySelectorAll('.button_type_logout');
    this.authBtns  = document.querySelectorAll('.button_type_auth');
    this.userNameBlocks = document.querySelectorAll('.header__username');
    this.mobileHeader = mobileHeader
    this.mobileNavBar = mobileHeader.querySelector('.header__navbar_type_mobile');
    this.openMobileMenuBtn = mobileHeader.querySelector('.button_type_mobile-menu');
    this.closeMobileMenuBtn = mobileHeader.querySelector('.button_type_close-mobile');

    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);

    this.logoutBtns.forEach(btn => {
      btn.addEventListener('click', event => {
        if(!!event.target.closest('.header__navbar_type_mobile')) this.toggleMobileMenu(event);
        user.logout();
      })
    })

    window.addEventListener('resize', event => {
      if(document.documentElement.clientWidth > 767 && this.mobileNavBar.classList.contains('header__navbar_visible')) {
        this.toggleMobileMenu();
      }
    })
  }

  toggleMobileMenu (event) {
    this.mobileHeader.classList.toggle('header_is-opened-mobile');
    this.mobileNavBar.classList.toggle('header__navbar_visible');
    this.closeMobileMenuBtn.classList.toggle('header__navbar-item_visible');
    this.openMobileMenuBtn.classList.toggle('header__navbar-item_visible');
  }


}
