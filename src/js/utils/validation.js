export default class Validation {
  constructor(messages) {
    this.messages = messages;
  }

  isUrlOK(link) {
    const reg = /^https?:\/\//;
    if (link.length === 0) {
      return this.messages.required;
    } else if (!reg.test(link)) { // вот здесь else лишнее
      return this.messages.invalidUrl;
    } else return ''; // вот здесь else лишнее
  }

  isLengthOK(text) {
    if (text.length === 0) {
      return this.messages.required;

    }
    if (text.length > 30 || text.length === 1) { // вот здесь else лишнее
      return this.messages.incorrectLength;

    } else return ''; //  здесь else лишнее, просто удалите

  }


}
