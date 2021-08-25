import {createElement} from '../util.js';

const getLoadingTemplate = () => (
  `<p class="trip-events__msg">
  Loading...</p>`
);

export default class Loading {
  constructor () {
    this._element = null;
  }

  getTemplate () {
    return getLoadingTemplate();
  }

  getElement () {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement () {
    this._element = null;
  }
}
