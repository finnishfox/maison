class Item {
  constructor() {
    //make hover work on touch devices
    document.querySelector('.items').addEventListener('touchstart', () => {
    });
  }
}

new Item();

