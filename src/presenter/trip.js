import TripInfoView from '../view/trip-info.js';
import TripPointListView from '../view/trip-point-list.js';
import SortView from '../view/sort.js';
import MenuView from '../view/menu.js';
import FilterView from '../view/filter.js';
import EmptyPointListView from '../view/empty-point-list.js';
import PointPresenter from './point.js';
import {render, RenderPosition} from '../util/render.js';
import {getRouteTripInfo} from '../mock/route-trip-info-mock.js';
import {updateItem} from '../util/common.js';


export default class Trip {
  constructor(elementContainers) {
    this._tripInfoContainer = elementContainers[0];
    this._tripMenuContainer = elementContainers[1];
    this._tripFilterContainer = elementContainers[2];
    this._tripContentContainer = elementContainers[3];
    this._pointPresenter = new Map();

    this._pointListComponent = new TripPointListView();
    this._sortComponent = new SortView();
    this._menuComponent = new MenuView();
    this._filterComponent = new FilterView();
    this._emptyListComponent = new EmptyPointListView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    this._renderTrip();
  }

  _handlePointChange(updatedPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedPoint);
    this._pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _renderTripInfo() {
    const routeTripInfo = getRouteTripInfo(this._tripPoints);
    render(this._tripInfoContainer, new TripInfoView(routeTripInfo), RenderPosition.AFTERBEGIN);
  }

  _renderMenu() {
    render(this._tripMenuContainer, this._menuComponent, RenderPosition.BEFOREEND);
  }

  _renderFilter() {
    render(this._tripFilterContainer, this._filterComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._tripContentContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderPointList() {
    render(this._tripContentContainer, this._pointListComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(tripPoint) {
    const pointPresenter = new PointPresenter(this._pointListComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(tripPoint);
    this._pointPresenter.set(tripPoint.id, pointPresenter);
  }

  _renderEmptyList() {
    render(this.tripContentContainer, this._emptyListComponent, RenderPosition.BEFOREEND);
  }

  _clearPointList() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
  }

  _renderTrip() {
    this._renderMenu();
    this._renderFilter();
    this._renderSort();

    if (this._tripPoints === 0) {
      this._renderEmptyList();
    } else {
      this._renderTripInfo();
      this._renderPointList();
      this._tripPoints.forEach((tripPoint) => this._renderPoint(tripPoint));
    }
  }
}
