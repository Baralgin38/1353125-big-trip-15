import AbstractView from './abstract.js';

const getEmptyPointListTemplate = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class EmptyPointList extends AbstractView {
  getTemplate () {
    return getEmptyPointListTemplate();
  }
}
