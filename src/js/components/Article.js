export default class Article {
  constructor(container, template, data, isSaved = false) {
    this.isSaved = isSaved;
    this.articlesContainer = container;
    this.template = template;
    this.data = data;
    this._id = this.data._id;

    this.block = document.createElement('div');
    this.block.classList.add('article');
    this.block.append(this.template.content.cloneNode('true'));
    this.articlesContainer.append(this.block);

    this.toggleSaveBtn = this.block.querySelector('.article__button_type_toggle-save');
    this.image = this.block.querySelector('.article__image');
    this.date = this.block.querySelector('.article__date');
    this.text = this.block.querySelector('.article__text');
    this.title = this.block.querySelector('.article__title');
    this.source = this.block.querySelector('.article__source');
    this.keyword = this.block.querySelector('.article__button_type_keyword');

    this.render = this.render.bind(this);
    this.visible = this.visible.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
    this.remove = this.remove.bind(this);


    this.render();
  }

  visible(isVisible) {
    if(isVisible) this.block.classList.add('article_visible');
    else this.block.classList.remove('article_visible');
  }

  remove() {
    this.block.remove();
  }

  toggleSave() {
    this.isSaved = !this.isSaved;
    this.block.classList.toggle('article_saved');
  }

  render() {
    this.image.src = this.data.image;
    this.date.textContent = this.data.date;
    this.title.textContent = this.data.title;
    this.text.textContent = this.data.text;
    this.source.textContent = this.data.source;
    this.keyword.textContent = this.data.keyword;
  }

}