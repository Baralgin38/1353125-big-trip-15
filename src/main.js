import {getTripInfoTemplate} from './view/trip-info.js';
import {getTripEventsPointTemplate} from './view/trip-events-point.js';
import {getTripEventsListTemplate} from './view/trip-events-list.js';
import {getSortingFormTemplate} from './view/sort.js';
import {getMenuTemplate} from './view/menu.js';
import {getFilterTemplate} from './view/filter.js';
import {getEditFormTemplate} from './view/event-edit-form.js';
import {generatePointTrip} from './mock/point-mock.js';
import {getRouteTripInfo} from './mock/route-trip-info-mock.js';

const QUANTITY_OF_DATA_POINTS = 15;

const tripPoints = new Array(QUANTITY_OF_DATA_POINTS).fill().map(generatePointTrip);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const tripHeaderMainElement = siteHeaderElement.querySelector('.trip-main');
const tripMenu = tripHeaderMainElement.querySelector('.trip-controls__navigation');
const tripFilters = tripHeaderMainElement.querySelector('.trip-controls__filters');

render(tripHeaderMainElement, getTripInfoTemplate(getRouteTripInfo(tripPoints)), 'afterbegin');
render(tripMenu, getMenuTemplate(), 'beforeend');
render(tripFilters, getFilterTemplate(), 'beforeend');

const tripContentAndSortingContainer = siteMainElement.querySelector('.trip-events');

render(tripContentAndSortingContainer, getSortingFormTemplate(), 'beforeend');
render(tripContentAndSortingContainer, getTripEventsListTemplate(), 'beforeend');

const tripPointList = tripContentAndSortingContainer.querySelector('.trip-events__list');

render(tripPointList, getEditFormTemplate(tripPoints[0]), 'beforeend');

tripPoints.forEach((value, index) => {
  if (index > 0 ) {
    render(tripPointList, getTripEventsPointTemplate(value), 'beforeend');
  }
});
