import Popup from './Popup.js';

export default class PopupLogin extends Popup {
  constructor(template, destination, openMobileBtn, closeMobileBtn, validation) {
    super(template, destination, openMobileBtn, closeMobileBtn);
    this.block.classList.add('popup_type_login');

    this.validation = validation;
    this.emailValid = validation.isEmailOK.bind(this.validation);
    this.passwordValid = validation.isPasswordOK.bind(this.validation);

    this.emailInput = this.block.querySelector('.popup__input_type_email');
    this.passwordInput = this.block.querySelector('.popup__input_type_password');
    this.submitBtn = this.block.querySelector('.popup__button');
    this.emailAlert = this.block.querySelector('.popup__validate-alert_type_email');
    this.passwordAlert = this.block.querySelector('.popup__validate-alert_type_password');
    this.form = this.block.querySelector('.popup__form');

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.render = this.render.bind(this);

    this.block.addEventListener('input', this.render);
  }

  render(event) {

    let result = {
      email: this.emailValid(this.emailInput.value),
 //   password: this.passwordValid(this.passwordInput.value),
    }


    this.buttonRender(this.submitBtn, !result.email && !result.password);
    switch (event.target) {
      case this.emailInput:
        this.alertRender(this.emailAlert, result.email);
        break;
 //   case this.passwordInput:
 //     this.alertRender(this.passwordAlert, result.password);
 //     break;
    }

  }

  close(event) {
    this.form.reset();
    this.render(event);
    super.close(event);

  }

  open(event) {
    this.emailAlert.style.visibility = 'hidden';
    this.passwordAlert.style.visibility = 'hidden';
    super.open(event);
  }

  renderLoading(loading) {
    if(loading) {
      this.submitBtn.textContent = 'Загрузка...';
    } else {
      this.submitBtn.textContent = 'Войти';
    }
  }

};