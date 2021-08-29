import {createElement} from '../util.js';

const getEmptyPointListTemplate = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class EmptyPointList {
  constructor () {
    this._element = null;
  }

  getTemplate () {
    return getEmptyPointListTemplate();
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
