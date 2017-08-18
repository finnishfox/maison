class FilterToggle {
  constructor() {
    this.toggleButton = document.querySelector('.filter__toggle-button');
    this.filter = document.querySelector('.filter__wrapper');

    this.toggleFilter = this.toggleFilter.bind(this);

    this.toggleButton.addEventListener('click', this.toggleFilter);
  }

  toggleFilter() {
    this.filter.classList.toggle('filter__wrapper--open');
  }
}

new FilterToggle();