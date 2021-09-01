import AbstractView from './abstract.js';

const printCities = (cities) => {
  if (cities.length <= 3) {
    return cities.join(' — ');
  } else if (cities.length > 3) {
    return `${cities[0]} — ... — ${cities[cities.length - 1]}`;
  }
};

const printDates = (dates, months) => {
  if (months[0] === months.length - 1) {
    return `${months[0]} ${dates[0]}&nbsp;&mdash;&nbsp;${months[months.length -1]} ${dates[dates.length - 1]}`;
  } else {
    return `${months[0]} ${dates[0]}&nbsp;&mdash;&nbsp;${dates[dates.length - 1]}`;
  }
};

const getTripInfoTemplate = (data) => {
  const {cities, dates, months, totalPrice} = data;

  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${printCities(cities)}</h1>

    <p class="trip-info__dates">${printDates(dates, months)}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
  </p>
</section>`;
};

export default class TripInfo extends AbstractView{
  constructor (data) {
    super();
    this._routeTripInfo = data;
  }

  getTemplate () {
    return getTripInfoTemplate(this._routeTripInfo);
  }
}
