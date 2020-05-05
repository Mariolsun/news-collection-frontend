import Popup from './Popup.js';

export default class PopupLogin extends Popup {
  constructor(template, destination) {
    super(template, destination);
    this.block.classList.add('popup_type_login');
  }
};