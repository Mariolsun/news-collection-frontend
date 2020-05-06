import Popup from './Popup.js';

export default class PopupSuccessSignup extends Popup {
  constructor(template, destination) {
    super(template, destination);
    this.block.classList.add('popup_type_success-signup');
  }
};