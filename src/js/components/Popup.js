export default class Popup {
  constructor(template, destination) {

    this.block = document.createElement('div');
    this.block.classList.add('popup');
    this.block.append(template.content.cloneNode('true'));
    destination.append(this.block);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.closeBtn = this.block.querySelector('.popup__close');
    this.closeBtn.addEventListener('click', this.close);
    this.isMobile = this.isMobile.bind(this);
  }

  close (event) {
    event.target.closest('.popup').classList.remove('popup_type_mobile');
    event.target.closest('.popup').classList.remove('popup_is-opened');
  }

  isMobile() {
    return this.block.classList.contains('popup_type_mobile');
  }

  open (isMobile, mobileCloseBtn) {
    if(isMobile === true) {
      console.log('openin mobile popup');
      this.block.classList.add('popup_type_mobile');
    }
    console.log(`open event on popup ${typeof this.block}`)
    this.block.classList.add('popup_is-opened');
  }

  buttonRender(element, result) {
    if (result) {
      console.log('valid is ok, enabling submit btn');
      element.removeAttribute('disabled');
      element.classList.remove('popup__button_disabled');
    } else {
      console.log('valid is not ok, disabling submit btn');
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