class Pagination {
  constructor() {
    this.currentPage = 0;
    this.pagination = document.querySelector('.pagination');
    this.pages = [...this.pagination.querySelectorAll('.pagination__page')];
    this.prevButton = this.pagination.querySelector('.pagination__prev-button');
    this.nextButton = this.pagination.querySelector('.pagination__next-button');

    this.selectPage = this.selectPage.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);

    this.pages.forEach(page => {
        page.addEventListener('click', e => {
          this.selectPage(e.currentTarget);
        });
      }
    );

    this.nextButton.addEventListener('click', this.next);
    this.prevButton.addEventListener('click', this.prev);

  }

  selectPage(page) {
    this.currentPage = this.pages.indexOf(page);

    if (page === this.pages[0]) {
      this.prevButton.classList.add('pagination__prev-button--hidden');
      this.nextButton.classList.remove('pagination__next-button--hidden');
    } else if (page === this.pages[this.pages.length - 1]) {
      this.nextButton.classList.add('pagination__next-button--hidden');
      this.prevButton.classList.remove('pagination__prev-button--hidden');
    } else {
      this.prevButton.classList.remove('pagination__prev-button--hidden');
      this.nextButton.classList.remove('pagination__next-button--hidden');
    }

    this.pages.forEach(page => {
        page.classList.remove('pagination__page--active');
      }
    );

    page.classList.add('pagination__page--active');
  }

  next() {
    this.selectPage(this.pages[this.currentPage + 1]);
  }

  prev() {
    this.selectPage(this.pages[this.currentPage - 1]);
  }

}

new Pagination();