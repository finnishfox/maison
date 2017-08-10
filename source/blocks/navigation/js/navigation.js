class Navigation {
  constructor() {
    this.navigation = document.querySelector('.navigation');
    this.toggleButton = document.querySelector('.navigation__toggle-button');

    this.toggleMenu = this.toggleMenu.bind(this);

    this.toggleButton.addEventListener('click', this.toggleMenu);
  }


  toggleMenu() {
    this.toggleButton.classList.toggle('navigation__toggle-button--open');
    this.navigation.classList.toggle('navigation--open');
  }
}

new Navigation();