import BaseComponent from './BaseComponent';

export default class Popup extends BaseComponent {
  constructor(template, destination, openMobileBtn, closeMobileBtn) {
    super();
    this.openMobileBtn = openMobileBtn;
    this.closeMobileBtn = closeMobileBtn;
    this.block = document.createElement('div');
    this.block.classList.add('popup');
    this.block.append(template.content.cloneNode('true'));
    destination.append(this.block);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.closeBtn = this.block.querySelector('.popup__close');
    this.closeBtn.addEventListener('click', this.close);
    this.isMobile = this.isMobile.bind(this);
    this._closeOnEmptyAreaClick = this._closeOnEmptyAreaClick.bind(this);
  }

  close() {
    this.block.removeEventListener('mousedown', this._closeOnEmptyAreaClick);
    this.closeMobileBtn.removeEventListener('click', this.close);
    this.closeMobileBtn.classList.remove('header__navbar-item_visible');
    this.openMobileBtn.classList.add('header__navbar-item_visible');
    this.block.classList.remove('popup_type_mobile');
    this.block.classList.remove('popup_is-opened');
  }

  isMobile() {
    return this.block.classList.contains('popup_type_mobile');
  }

  _closeOnEmptyAreaClick(event) {
    if (!event.target.closest('.popup__content')) {
      this.close(event);
    }
  }

  open() {
    this.block.addEventListener('mousedown', this._closeOnEmptyAreaClick);
    this.openMobileBtn.classList.remove('header__navbar-item_visible');
    this.closeMobileBtn.classList.add('header__navbar-item_visible');
    this.closeMobileBtn.addEventListener('click', this.close);
    console.log('openin mobile popup');
    this.block.classList.add('popup_type_mobile');
    console.log(`open event on popup ${typeof this.block}`);
    this.block.classList.add('popup_is-opened');
  }

  buttonRender(element, result) {
    if (result) {
      element.removeAttribute('disabled');
      element.classList.remove('popup__button_disabled');
    } else {
      element.setAttribute('disabled', true);
      element.classList.add('popup__button_disabled');
    }
  }

  alertRender(element, message) {
    if (message) {
      element.textContent = message;
      element.style.visibility = 'visible';
    } else element.style.visibility = 'hidden';
  }
}