import Popup from './Popup.js';

export default class PopupSignup extends Popup {
  constructor(template, destination, openMobileBtn, closeMobileBtn, validation) {
    super(template, destination, openMobileBtn, closeMobileBtn);
    this.block.classList.add('popup_type_signup');

    this.validation = validation;
    this.emailValid = validation.isEmailOK.bind(this.validation);
    this.nameValid = validation.isNameOK.bind(this.validation);
    this.passwordValid = validation.isPasswordOK.bind(this.validation);
    this.emailFreeCheck = validation.isEmailFree.bind(this.validation);

    this.emailInput = this.block.querySelector('.popup__input_type_email');
    this.passwordInput = this.block.querySelector('.popup__input_type_password');
    this.nameInput = this.block.querySelector('.popup__input_type_name');
    this.submitBtn = this.block.querySelector('.popup__button');
    this.emailAlert = this.block.querySelector('.popup__validate-alert_type_email');
    this.nameAlert = this.block.querySelector('.popup__validate-alert_type_name');
    this.passwordAlert = this.block.querySelector('.popup__validate-alert_type_password');
    this.emailFreeAlert = this.block.querySelector('.popup__validate-alert_type_email-not-free');
    this.form = this.block.querySelector('.popup__form');

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.render = this.render.bind(this);

    this.block.addEventListener('input', this.render);
  }

  render(event) {

    let result = {
      name: this.nameValid(this.nameInput.value),
      email: this.emailValid(this.emailInput.value),
      emailFree: this.emailFreeCheck(this.emailInput.value),
      password: this.passwordValid(this.passwordInput.value),
    }


    this.buttonRender(this.submitBtn, !result.name && !result.email && !result.password && !result.emailFree);

    switch (event.target) {
      case this.nameInput:
        this.alertRender(this.nameAlert, result.name);
        break;
      case this.emailInput:
        console.log(`input email. email check: ${result.email}, email available check: ${result.emailFree}`);
        this.alertRender(this.emailAlert, result.email);
        this.alertRender(this.emailFreeAlert, result.emailFree);
        break;
      case this.passwordInput:
        this.alertRender(this.passwordAlert, result.password);
        break;
    }

  }

  close(event) {
    this.form.reset();
    this.render(event);
    super.close(event);

  }

  open(event) {
    this.nameAlert.style.visibility = 'hidden';
    this.emailAlert.style.visibility = 'hidden';
    this.passwordAlert.style.visibility = 'hidden';
    this.emailFreeAlert.style.visibility = 'hidden';
    super.open(event);
  }

  renderLoading(loading) {
    if(loading) {
      this.submitBtn.textContent = 'Загрузка...';
    } else {
      this.submitBtn.textContent = 'Зарегистрироваться';
    }
  }

};