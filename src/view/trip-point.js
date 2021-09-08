import {getEventDuration} from '../util/common.js';
import AbstractView from './abstract.js';

const addOffer = (offerData) => {
  const {title, price} = offerData;

  return `<li class="event__offer">
  <span class="event__offer-title">${title}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${price}</span>
</li>`;
};

const showOffers = (offersData) => {
  if (offersData.offers.length === 0 || !offersData.offers) {
    return '';
  }

  const offers = offersData.offers
    .map((offer) => addOffer(offer))
    .join('');

  return `<ul class="event__selected-offers">
    ${offers}
  </ul>`;
};

const favoriteChange = (isFavorite) => {
  if (isFavorite) {
    return 'event__favorite-btn--active';
  }
  return 'event__favorite-btn';
};

const getTripPointTemplate = (pointData) => {
  const {type, destination, offer, basicPrice, dateFrom, dateTo, isFavorite} = pointData;

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${dateFrom.format('YYYY-MM-DD')}">${dateFrom.format('ddd DD')}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destination.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${dateFrom.format()}">${dateFrom.format('HH:mm')}</time>
        &mdash;
        <time class="event__end-time" datetime="${dateTo.format()}">${dateTo.format('HH:mm')}</time>
      </p>
      <p class="event__duration">${getEventDuration(dateFrom, dateTo)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basicPrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    ${showOffers(offer)}
    <button class="event__favorite-btn ${favoriteChange(isFavorite)}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};

export default class TripPoint extends AbstractView{
  constructor (pointData) {
    super();
    this._pointData = pointData;

    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);

  }

  getTemplate () {
    return getTripPointTemplate(this._pointData);
  }

  _editClickHandler() {
    this._callback.editClick();
  }

  _favoriteClickHandler() {
    this._callback.favoriteClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._favoriteClickHandler);
  }
}

