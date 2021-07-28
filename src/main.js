import {getTripInfoTemplate} from './view/trip-info.js';
import {getTripEventsPointTemplate} from './view/trip-events-point.js';
import {getTripEventsListTemplate} from './view/trip-events-list.js';
import {getSortingFormTemplate} from './view/sort.js';
import {getMenuTemplate} from './view/menu.js';
import {getFilterTemplate} from './view/filter.js';
import {getEditFormTemplate} from './view/event-edit-form.js';

const QUANTITY_POINTS = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const tripHeaderMainElement = siteHeaderElement.querySelector('.trip-main');
const tripMenu = tripHeaderMainElement.querySelector('.trip-controls__navigation');
const tripFilters = tripHeaderMainElement.querySelector('.trip-controls__filters');

render(tripHeaderMainElement, getTripInfoTemplate(), 'afterbegin');
render(tripMenu, getMenuTemplate(), 'beforeend');
render(tripFilters, getFilterTemplate(), 'beforeend');

const tripContentAndSortingContainer = siteMainElement.querySelector('.trip-events');

render(tripContentAndSortingContainer, getSortingFormTemplate(), 'beforeend');
render(tripContentAndSortingContainer, getTripEventsListTemplate(), 'beforeend');

const tripPointList = tripContentAndSortingContainer.querySelector('.trip-events__list');

render(tripPointList, getEditFormTemplate(), 'beforeend');

for (let i = 0; i < QUANTITY_POINTS; i++) {
  render(tripPointList, getTripEventsPointTemplate(), 'beforeend');
}
