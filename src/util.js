const MINUTES_PER_HOUR = 60;
const MINUTES_PER_DAY = 1440;
const HOURS_PER_DAY = 24;

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getEventDuration = (dateFrom, dateTo) => {
  const differenceInMinutes = dateTo.diff(dateFrom, 'm');
  const minutes = dateTo.diff(dateFrom, 'm') % MINUTES_PER_HOUR;
  const hours = Math.floor(dateTo.diff(dateFrom, 'm') / MINUTES_PER_HOUR);
  const days = Math.floor(hours / HOURS_PER_DAY);

  if (differenceInMinutes < MINUTES_PER_HOUR) {
    return `${dateTo.diff(dateFrom, 'm')}M`;
  } else if (differenceInMinutes < MINUTES_PER_DAY) {
    return `${hours}H ${minutes}M`;
  } else if (differenceInMinutes > MINUTES_PER_DAY) {
    return `${days}D ${hours % HOURS_PER_DAY}H ${minutes}M`;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};
