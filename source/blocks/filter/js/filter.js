class Filter {
  constructor() {
    this.colors = document.querySelectorAll('.filter__color');
    this.categories = document.querySelectorAll('.filter__category');

    this.setColor = this.setColor.bind(this);
    this.setCategory = this.setCategory.bind(this);

    for (let i = 0; i < this.colors.length; i++) {
      this.colors[i].addEventListener('click', e => this.setColor(e));
    }

    for (let i = 0; i < this.categories.length; i++) {
      this.categories[i].addEventListener('click', e => this.setCategory(e));
    }
  }

  setColor(e) {
    const color = e.currentTarget;
    color.classList.toggle('filter__color--active');
  }

  setCategory(e){
    const category = e.currentTarget;
    category.classList.toggle('filter__category--selected');
  }
}

new Filter();