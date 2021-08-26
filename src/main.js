import TripInfoView from './view/trip-info.js';
import TripPointView from './view/trip-point.js';
import TripPointListView from './view/trip-point-list.js';
import SortView from './view/sort.js';
import MenuView from './view/menu.js';
import FilterView from './view/filter.js';
import EventEditFormView from './view/event-edit-form.js';
import {generatePointTrip} from './mock/point-mock.js';
import {getRouteTripInfo} from './mock/route-trip-info-mock.js';
import {render, RenderPosition} from './util.js';

const QUANTITY_OF_DATA_POINTS = 15;

const tripPoints = new Array(QUANTITY_OF_DATA_POINTS).fill().map(generatePointTrip);
const routeTripInfo = getRouteTripInfo(tripPoints);

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const tripHeaderMainElement = siteHeaderElement.querySelector('.trip-main');
const tripMenu = tripHeaderMainElement.querySelector('.trip-controls__navigation');
const tripFilters = tripHeaderMainElement.querySelector('.trip-controls__filters');

render(tripHeaderMainElement, new TripInfoView(routeTripInfo).getElement(), RenderPosition.AFTERBEGIN);
render(tripMenu, new MenuView().getElement(), RenderPosition.BEFOREEND);
render(tripFilters, new FilterView().getElement(), RenderPosition.BEFOREEND);

const tripContentAndSortingContainer = siteMainElement.querySelector('.trip-events');

render(tripContentAndSortingContainer, new SortView().getElement(), RenderPosition.BEFOREEND);

const tripPointListComponent = new TripPointListView();

render(tripContentAndSortingContainer, tripPointListComponent.getElement(), RenderPosition.BEFOREEND);

const renderTripPoint = (tripPointList, tripPoint) => {
  const tripPointComponent = new TripPointView(tripPoint);
  const eventEditFormComponent = new EventEditFormView(tripPoint);

  const replacePointToEditForm = () => tripPointList.replaceChild(eventEditFormComponent.getElement(), tripPointComponent.getElement());
  const replaceEditFormToPoint = () => tripPointList.replaceChild(tripPointComponent.getElement(), eventEditFormComponent.getElement());

  tripPointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointToEditForm();
  });

  eventEditFormComponent.getElement().querySelector('.event--edit').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceEditFormToPoint();
  });

  render(tripPointList, tripPointComponent.getElement(), RenderPosition.BEFOREEND);
};

tripPoints.forEach((value) => (
  renderTripPoint(tripPointListComponent.getElement(), value)
));


