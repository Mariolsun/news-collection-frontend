import BaseComponent from './BaseComponent';
import imagePlaceholder from '../../images/image-placeholder.jpg';

export default class Article extends BaseComponent {
  constructor(container, template, data, userCheck, saveFunc, removeFunc, icons) {
    super();
    this.articlesContainer = container;
    this.template = template;
    this.isLoggedIn = userCheck;
    this.data = {
      title: data.title,
      description: data.description,
      publishedAt: data.publishedAt,
      source: data.source,
      url: data.url,
      urlToImage: data.urlToImage,
      keyword: data.keyword,
      _id: data._id || '',
    };
    this.saveFunc = saveFunc;
    this.removeFunc = removeFunc;
    //  this._id = this.data._id;
    this.block = document.createElement('div');
    this.block.classList.add('article');
    this.block.append(this.template.content.cloneNode('true'));
    this.articlesContainer.append(this.block);
    this.isSaved = false;
    this.saveOptionsBlock = this.block.querySelector('.article__save-options');
    this.saveHint = this.block.querySelector('.article__save-hint');
    this.urlToImage = this.block.querySelector('.article__image');
    this.publishedAt = this.block.querySelector('.article__date');
    this.description = this.block.querySelector('.article__text');
    this.title = this.block.querySelector('.article__title');
    this.source = this.block.querySelector('.article__source');
    this.keyword = this.block.querySelector('.article__keyword');
    this.bookmarkIcon = this.block.querySelector('.article__bookmark-icon');
    this.toggleSaveBtn = this.block.querySelector('.article__button_type_toggle-save');
    this.icons = {
      unmarked: icons.unmarked || this.bookmarkIcon.src,
      marked: icons.marked || this.bookmarkIcon.src,
      hover: icons.hover || this.bookmarkIcon.src,
    };
    this.render = this.render.bind(this);
    this.visible = this.visible.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
    this.render(); //убрать как-то
    this.clickHandler = this.clickHandler.bind(this);
    this.block.addEventListener('click', this.clickHandler);
    this._handlehover = this._handlehover.bind(this);
    this.toggleSaveBtn.addEventListener('mouseover', this._handlehover);
    this.toggleSaveBtn.addEventListener('mouseout', this._handlehover);
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

  _handlehover(event) {
    console.log(`article toggleBtn hover saved ${this.isSaved}`);
    if (!this.isSaved) {
      switch (event.type) {
        case 'mouseover':
          console.log('mouseover');
          this.bookmarkIcon.src = this.icons.hover;
          break;
        case 'mouseout':
        default:
          this.bookmarkIcon.src = this.icons.unmarked;
          break;
      }
    }
  }

  renderSaved(bool) {
    if (bool) {
      this.bookmarkIcon.classList.add('article__bookmarked-icon');
      this.bookmarkIcon.classList.remove('article__bookmark-icon');
      this.bookmarkIcon.src = this.icons.marked;
    } else {
      this.bookmarkIcon.classList.add('article__bookmark-icon');
      this.bookmarkIcon.classList.remove('article__bookmarked-icon');
      this.bookmarkIcon.src = this.icons.unmarked;
    }
  }

  save() {
    if (this.isLoggedIn()) {
      this.isSaved = !this.isSaved;
      if (this.isSaved) {
        this.saveFunc(this);
        this.renderSaved(true);
      } else {
        this.removeFunc(this);
        this.renderSaved(false);
      }
    }
  }

  keywordVisible(isVisible) {
    const visibilityClass = 'article__keyword_visible';
    if (isVisible) this.keyword.classList.add(visibilityClass);
    else this.keyword.classList.remove(visibilityClass);
  }

  clickHandler(event) {
    if (event.target.closest('.article__button_type_toggle-save')) this.save();
    else if (!event.target.closest('.article__save-options')) document.location.href = this.data.url;
  }

  render() {
    this.urlToImage.src = this.data.urlToImage || imagePlaceholder;
    this.publishedAt.textContent = this.data.publishedAt;
    this.title.textContent = this.data.title;
    this.description.textContent = this.data.description;
    this.source.textContent = this.data.source;
    this.keyword.textContent = this.data.keyword || 'default';
  }
}
