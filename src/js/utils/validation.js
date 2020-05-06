export default class Validation {
  constructor(messages, users) {
    this.messages = messages;
    this.users = users;
  }

  isEmailOK(email) {
    const reg = /.+@.+\..+/i;
    if (email.length === 0) {
      return this.messages.required;
    }
    if (!reg.test(email)) { // вот здесь else лишнее
      return this.messages.invalidEmail;
    }
  }

  isNameOK(text) {
    if (text.length === 0) {
      return this.messages.required;

    }
    if (text.length > 30 || text.length === 1) { // вот здесь else лишнее
      return this.messages.incorrectNameLength;

    }
  }

  isPasswordOK(text) {
    if (text.length === 0) {
      return this.messages.required;

    }
    if (text.length < 8 ) { // вот здесь else лишнее
      return this.messages.incorrectPasswordLength;

    }

  }

  isEmailFree(text) {
    for(let i = 0; i < this.users.length; i++) {


      console.log(`email compare: ${this.users[i]} and ${text}, message: ${this.messages.userAlreadyExist}`);
      if(!text.localeCompare(this.users[i])) return this.messages.userAlreadyExist;
      else console.log('emails are not the same');
    };
  }
}
