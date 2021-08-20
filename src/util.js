const MINUTES_PER_HOUR = 60;
const MINUTES_PER_DAY = 1440;
const HOURS_PER_DAY = 24;

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getEventDuration = (dateFrom, dateTo) => {
  const differenceInMinutes = dateTo.diff(dateFrom, 'm');
  const minutes = dateTo.diff(dateFrom, 'm') % MINUTES_PER_HOUR;
  const hours = Math.floor(dateTo.diff(dateFrom, 'm') / MINUTES_PER_HOUR);
  const days = Math.floor(hours / HOURS_PER_DAY);

  if (differenceInMinutes < MINUTES_PER_HOUR) {
    return `${dateTo.diff(dateFrom, 'm')}M`;
  } else if (differenceInMinutes > MINUTES_PER_HOUR && differenceInMinutes < MINUTES_PER_DAY) {
    return `${hours}H ${minutes}M`;
  } else if (differenceInMinutes > MINUTES_PER_DAY) {
    return `${days}D ${hours % HOURS_PER_DAY}H ${minutes}M`;
  }
};

export {getRandomInteger, getEventDuration};
