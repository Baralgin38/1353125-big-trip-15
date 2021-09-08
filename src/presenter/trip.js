import TripInfoView from '../view/trip-info.js';
import TripPointListView from '../view/trip-point-list.js';
import SortView from '../view/sort.js';
import MenuView from '../view/menu.js';
import FilterView from '../view/filter.js';
import EmptyPointListView from '../view/empty-point-list.js';
import PointPresenter from './point.js';
import {render, RenderPosition} from '../util/render.js';
import {getRouteTripInfo} from '../mock/route-trip-info-mock.js';


export default class Trip {
  constructor(elementContainers) {
    this._tripInfoContainer = elementContainers[0];
    this._tripMenuContainer = elementContainers[1];
    this._tripFilterContainer = elementContainers[2];
    this._tripContentContainer = elementContainers[3];

    this._pointListComponent = new TripPointListView();
    this._sortComponent = new SortView();
    this._menuComponent = new MenuView();
    this._filterComponent = new FilterView();
    this._emptyListComponent = new EmptyPointListView();
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    this._renderTrip();
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

  _renderTripPointList() {
    render(this._tripContentContainer, this._pointListComponent, RenderPosition.BEFOREEND);
  }

  _renderTripPoint(tripPoint) {
    const pointPresenter = new PointPresenter(this._pointListComponent);
    pointPresenter.init(tripPoint);
  }

  _renderEmptyList() {
    render(this.tripContentContainer, this._emptyListComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    this._renderMenu();
    this._renderFilter();
    this._renderSort();

    if (this._tripPoints === 0) {
      this._renderEmptyList();
    } else {
      this._renderTripInfo();
      this._renderTripPointList();
      this._tripPoints.forEach((tripPoint) => {
        this._renderTripPoint(tripPoint);
      });
    }
  }
}
