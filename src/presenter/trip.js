import TripInfoView from '../view/trip-info.js';
import TripPointView from '../view/trip-point.js';
import TripPointListView from '../view/trip-point-list.js';
import SortView from '../view/sort.js';
import MenuView from '../view/menu.js';
import FilterView from '../view/filter.js';
import EventEditFormView from '../view/event-edit-form.js';
import EmptyPointListView from '../view/empty-point-list.js';
import {render, RenderPosition} from './util/render.js';

export default class Trip {
  constructor(elementContainers) {

  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
  }

  renderTripInfo() {

  }

  renderMenu() {

  }

  renderFilter() {

  }

  renderSort() {

  }

  renderTripPointList() {

  }

  renderTripPoint() {

  }

  renderEmptyList() {

  }
}
