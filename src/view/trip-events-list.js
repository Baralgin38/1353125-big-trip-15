import {createElement} from '../util.js';

const getTripEventsListTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class TripEventList {
  constructor () {
    this._element = null;
  }

  getTemplate () {
    return getTripEventsListTemplate();
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
