import {getTripInfoTemplate} from './view/trip-info.js';
import {getTripEventsPointTemplate} from './view/trip-events-point.js';
import {getTripEventsListTemplate} from './view/trip-events-list.js';
import {getSortingFormTemplate} from './view/sort.js';
import {getMenuTemplate} from './view/menu.js';
import {getFilterTemplate} from './view/filter.js';
import {getEditFormTemplate} from './view/event-edit-form.js';
import {generatePointTrip} from './mock/point-mock.js';
import {getRouteTripInfo} from './mock/route-trip-info-mock.js';
import {renderTemplate} from './util.js';

const QUANTITY_OF_DATA_POINTS = 15;

const tripPoints = new Array(QUANTITY_OF_DATA_POINTS).fill().map(generatePointTrip);

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const tripHeaderMainElement = siteHeaderElement.querySelector('.trip-main');
const tripMenu = tripHeaderMainElement.querySelector('.trip-controls__navigation');
const tripFilters = tripHeaderMainElement.querySelector('.trip-controls__filters');

renderTemplate(tripHeaderMainElement, getTripInfoTemplate(getRouteTripInfo(tripPoints)), 'afterbegin');
renderTemplate(tripMenu, getMenuTemplate(), 'beforeend');
renderTemplate(tripFilters, getFilterTemplate(), 'beforeend');

const tripContentAndSortingContainer = siteMainElement.querySelector('.trip-events');

renderTemplate(tripContentAndSortingContainer, getSortingFormTemplate(), 'beforeend');
renderTemplate(tripContentAndSortingContainer, getTripEventsListTemplate(), 'beforeend');

const tripPointList = tripContentAndSortingContainer.querySelector('.trip-events__list');

renderTemplate(tripPointList, getEditFormTemplate(tripPoints[0]), 'beforeend');

tripPoints.slice(1).forEach((value) => render(tripPointList, getTripEventsPointTemplate(value), 'beforeend'));
