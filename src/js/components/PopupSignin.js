import Popup from './Popup';

export default class PopupSignin extends Popup {
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
    this.serverAlert = this.block.querySelector('.popup__validate-alert_type_server');
    this.form = this.block.querySelector('.popup__form');

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.render = this.render.bind(this);

    this.block.addEventListener('input', this.render);
  }

  render(event) {
    const result = {
      email: this.emailValid(this.emailInput.value),
      password: this.passwordValid(this.passwordInput.value),
    };


    this.buttonRender(!result.email && result.password !== 'Это обязательное поле');
    switch (event.target) {
      case this.emailInput:
      default:
        this.alertRender(this.emailAlert, result.email);
        break;
      case this.passwordInput:
        this.alertRender(this.passwordAlert, result.password === 'Это обязательное поле' ? 'Это обязательное поле' : '');
        break;
    }
    this.alertRender(this.serverAlert);
  }

  close(event) {
    this.form.reset();
    this.render(event);
    super.close(event);

  }

  open(event) {
    this.emailAlert.style.visibility = 'hidden';
    this.passwordAlert.style.visibility = 'hidden';
    this.serverAlert.style.visibility = 'hidden';
    super.open(event);
  }

  renderLoading(loading) {
    if (loading) {
      this.submitBtn.textContent = 'Загрузка...';
    } else {
      this.submitBtn.textContent = 'Войти';
    }
  }

};