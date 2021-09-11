import TripPresenter from './presenter/trip.js';
import {generatePointTrip} from './mock/point-mock.js';


const QUANTITY_OF_DATA_POINTS = 15;

const tripPoints = new Array(QUANTITY_OF_DATA_POINTS).fill().map(generatePointTrip);

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const tripHeaderMainElement = siteHeaderElement.querySelector('.trip-main');
const tripMenu = tripHeaderMainElement.querySelector('.trip-controls__navigation');
const tripFilters = tripHeaderMainElement.querySelector('.trip-controls__filters');
const tripContentAndSortingContainer = siteMainElement.querySelector('.trip-events');

const elementContainers = [
  tripHeaderMainElement,
  tripMenu,
  tripFilters,
  tripContentAndSortingContainer,
];

const tripPresenter = new TripPresenter(elementContainers);
tripPresenter.init(tripPoints);

