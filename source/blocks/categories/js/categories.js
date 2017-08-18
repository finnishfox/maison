class Categories {
  constructor() {
    this.toggleButton = document.querySelector('.categories__toggle-button');
    this.categories = document.querySelector('.categories__wrapper');

    this.toggleCategories = this.toggleCategories.bind(this);

    this.toggleButton.addEventListener('click', this.toggleCategories);
  }

  toggleCategories() {
    this.categories.classList.toggle('categories__wrapper--open');
  }
}

new Categories();
