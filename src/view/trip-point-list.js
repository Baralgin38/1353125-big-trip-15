import {createElement} from '../util.js';

const getTripPointListTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class TripPointList {
  constructor () {
    this._element = null;
  }

  getTemplate () {
    return getTripPointListTemplate();
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
