const MINUTES_PER_HOUR = 60;
const MINUTES_PER_DAY = 1440;
const HOURS_PER_DAY = 24;

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

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};
