import bookmark from '../../images/bookmark.png';
import bookmarkMarked from '../../images/bookmark-marked.png';
import BaseComponent from './BaseComponent';
import imagePlaceholder from '../../images/image-placeholder.jpg';

export default class Article extends BaseComponent {
  constructor(container, template, data, userCheck) {
    super();
    this.articlesContainer = container;
    this.template = template;
    this.isLoggedIn = userCheck;
    this.data = data;
    //  this._id = this.data._id;
    this.block = document.createElement('div');
    this.block.classList.add('article');
    this.block.append(this.template.content.cloneNode('true'));
    this.articlesContainer.append(this.block);

    this.saveOptionsBlock = this.block.querySelector('.article__save-options');
    this.saveHint = this.block.querySelector('.article__save-hint');
    this.image = this.block.querySelector('.article__image');
    this.date = this.block.querySelector('.article__date');
    this.text = this.block.querySelector('.article__text');
    this.title = this.block.querySelector('.article__title');
    this.source = this.block.querySelector('.article__source');
    this.keyword = this.block.querySelector('.article__keyword');
    this.bookmarkIcon = this.block.querySelector('.article__bookmark-icon');
    this.toggleSaveBtn = this.block.querySelector('.article__button_type_toggle-save');
    this.render = this.render.bind(this);
    this.visible = this.visible.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
    this.remove = this.remove.bind(this);
    this.render();
    this.clickHandler = this.clickHandler.bind(this);
    this.block.addEventListener('click', this.clickHandler);
  }

  visible(isVisible) {
    if (isVisible) {
      this.render();
      this.block.classList.add('article_visible');
    } else this.block.classList.remove('article_visible');
  }

  isVisible() {
    return this.block.classList.contains('article_visible');
  }

  remove() {
    this.block.remove();
  }

  toggleSave() {
    if (this.isLoggedIn()) {
      this.isSaved = !this.isSaved;
      if (this.isSaved) {
        this.bookmarkIcon.classList.add('article__bookmarked-icon');
        this.bookmarkIcon.classList.remove('article__bookmark-icon');
        this.bookmarkIcon.src = bookmarkMarked;
      } else {
        this.bookmarkIcon.classList.add('article__bookmark-icon');
        this.bookmarkIcon.classList.remove('article__bookmarked-icon');
        this.bookmarkIcon.src = bookmark;
      }
    }
  }

  clickHandler(event) {
    console.log(`click on article ${event.target.classList}`);
    if (event.target.closest('.article__button_type_toggle-save')) this.toggleSave();
    else document.location.href = this.data.url;
  }

  render() {
    console.log(`rendering article. date ${this.data.publishedAt} source: ${this.data.source.name}`);
    //  this.image.src = this.data.urlToImage;
    if (!this.data.urlToImage) console.log (`no original image! ${this.data.title}`);
    this.image.src = this.data.urlToImage || imagePlaceholder;
    this.date.textContent = this.data.publishedAt;
    this.title.textContent = this.data.title;
    this.text.textContent = this.data.description;
    this.source.textContent = this.data.source.name;
    this.keyword.textContent = 'default';
  }
}
