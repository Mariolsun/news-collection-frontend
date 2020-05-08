import Popup from './Popup.js';

export default class PopupSuccessSignup extends Popup {
  constructor(template, destination, openMobileBtn, closeMobileBtn) {
    super(template, destination, openMobileBtn, closeMobileBtn);
    this.block.classList.add('popup_type_success-signup');
  }
};