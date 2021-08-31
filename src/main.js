import TripInfoView from './view/trip-info.js';
import TripPointView from './view/trip-point.js';
import TripPointListView from './view/trip-point-list.js';
import SortView from './view/sort.js';
import MenuView from './view/menu.js';
import FilterView from './view/filter.js';
import EventEditFormView from './view/event-edit-form.js';
import EmptyPointListView from './view/empty-point-list.js';
import {generatePointTrip} from './mock/point-mock.js';
import {getRouteTripInfo} from './mock/route-trip-info-mock.js';
import {render, RenderPosition, replace} from './util/render.js';

const QUANTITY_OF_DATA_POINTS = 15;

const tripPoints = new Array(QUANTITY_OF_DATA_POINTS).fill().map(generatePointTrip);

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const tripHeaderMainElement = siteHeaderElement.querySelector('.trip-main');
const tripMenu = tripHeaderMainElement.querySelector('.trip-controls__navigation');
const tripFilters = tripHeaderMainElement.querySelector('.trip-controls__filters');

if (tripPoints.length !== 0) {
  const routeTripInfo = getRouteTripInfo(tripPoints);
  render(tripHeaderMainElement, new TripInfoView(routeTripInfo), RenderPosition.AFTERBEGIN);
}

render(tripMenu, new MenuView(), RenderPosition.BEFOREEND);
render(tripFilters, new FilterView(), RenderPosition.BEFOREEND);

const tripContentAndSortingContainer = siteMainElement.querySelector('.trip-events');

render(tripContentAndSortingContainer, new SortView(), RenderPosition.BEFOREEND);

const renderTripPoint = (tripPointList, tripPoint) => {
  const tripPointComponent = new TripPointView(tripPoint);
  const eventEditFormComponent = new EventEditFormView(tripPoint);

  const replacePointToEditForm = () => replace(eventEditFormComponent, tripPointComponent);
  const replaceEditFormToPoint = () => replace(tripPointComponent, eventEditFormComponent);

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      evt.preventDefault();
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  tripPointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointToEditForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditFormComponent.getElement().querySelector('.event--edit').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceEditFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  eventEditFormComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceEditFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(tripPointList, tripPointComponent, RenderPosition.BEFOREEND);
};

if (tripPoints.length === 0) {
  render(tripContentAndSortingContainer, new EmptyPointListView(), RenderPosition.BEFOREEND);
} else {
  const tripPointListComponent = new TripPointListView();
  render(tripContentAndSortingContainer, tripPointListComponent, RenderPosition.BEFOREEND);
  tripPoints.forEach((value) => (
    renderTripPoint(tripPointListComponent.getElement(), value)
  ));
}

