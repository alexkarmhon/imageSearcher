export default class LoadMoreBtn{
  constructor({ selector, hidden } = false) {
    this.refs = this.getRefs(selector);

    // if (hidden) { hidden && this.hide };
    hidden && this.hide();
  }

  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);
    refs.label = refs.button.querySelector('.label');
    refs.spinner = refs.button.querySelector('.spinner');

    return refs;
  }

  enable() {
    this.refs.button.diabled = false;
    this.refs.label.textContent = 'Show more';
    this.refs.spinner.classList.add('is-hidden');
  }

  disable() {
    this.refs.button.diabled = true;
    this.refs.label.textContent = 'Loading...';
    this.refs.spinner.classList.remove('is-hidden');
  }

  show() {
    this.refs.button.classList.remove('is-hidden');
  }

  hide() {
    this.refs.button.classList.add('is-hidden')
  }
}