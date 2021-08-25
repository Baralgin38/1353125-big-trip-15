import TripInfoView from './view/trip-info.js';
import TripEventPointView from './view/trip-events-point.js';
import TripEventListView from './view/trip-events-list.js';
import SortView from './view/sort.js';
import MenuView from './view/menu.js';
import FilterView from './view/filter.js';
import EventEditFormView from './view/event-edit-form.js';
import {generatePointTrip} from './mock/point-mock.js';
import {getRouteTripInfo} from './mock/route-trip-info-mock.js';
import {renderElement, RenderPosition} from './util.js';

const QUANTITY_OF_DATA_POINTS = 15;

const tripPoints = new Array(QUANTITY_OF_DATA_POINTS).fill().map(generatePointTrip);
const routeTripInfo = getRouteTripInfo(tripPoints);

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const tripHeaderMainElement = siteHeaderElement.querySelector('.trip-main');
const tripMenu = tripHeaderMainElement.querySelector('.trip-controls__navigation');
const tripFilters = tripHeaderMainElement.querySelector('.trip-controls__filters');

renderElement (tripHeaderMainElement, new TripInfoView(routeTripInfo).getElement(), RenderPosition.AFTERBEGIN);
renderElement (tripMenu, new MenuView().getElement(), RenderPosition.BEFOREEND);
renderElement (tripFilters, new FilterView().getElement(), RenderPosition.BEFOREEND);

const tripContentAndSortingContainer = siteMainElement.querySelector('.trip-events');

renderElement(tripContentAndSortingContainer, new SortView().getElement(), RenderPosition.BEFOREEND);

const tripEventListComponent = new TripEventListView();

renderElement (tripContentAndSortingContainer, tripEventListComponent.getElement(), RenderPosition.BEFOREEND);
renderElement (tripEventListComponent.getElement(), new EventEditFormView(tripPoints[0]).getElement(), RenderPosition.BEFOREEND);

for (let i = 1; i < tripPoints.length; i++) {
  renderElement (tripEventListComponent.getElement(), new TripEventPointView(tripPoints[i]).getElement(), RenderPosition.BEFOREEND);
}

