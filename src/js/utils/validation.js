export default class Validation {
  constructor(messages, users) {
    this.messages = messages;
    this.users = users;
  }

  isEmailOK(email) {
    const reg = /.+@.+\..+/i;
    if (email.length === 0) {
      return this.messages.FIELD_REQUIRED;
    }
    if (!reg.test(email)) {
      return this.messages.FIELD_INCORRECT_EMAIL;
    }
    return '';
  }

  isNameOK(text) {
    if (text.length === 0) {
      return this.messages.FIELD_REQUIRED;
    }
    if (text.length > 30 || text.length === 1) { // вот здесь else лишнее
      return this.messages.FIELD_INCORRECT_NAME_LENGTH;
    }
    return '';
  }

  isPasswordOK(text) {
    if (text.length === 0) {
      return this.messages.FIELD_REQUIRED;

    }
    if (text.length < 8 ) { // вот здесь else лишнее
      return this.messages.FIELD_INCORRECT_PASS_LENGTH;

    }

  }
}
