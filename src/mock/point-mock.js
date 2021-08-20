import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateType = () => {
  const type = [
    'taxi',
    'bus',
    'train',
    'ship',
    'drive',
    'flight',
    'check-in',
    'sightseeing',
    'restaurant',
  ];

  const randomIndex = getRandomInteger(0, type.length - 1);
  return type[randomIndex];
};

const generateCity = () => {
  const cities = [
    'Hamburg',
    'Luxembourg',
    'New York',
    'Oslo',
    'Prague',
    'Tokyo',
    'Helsinki',
    'Amsterdam',
    'Jakarta',
    'Dublin',
  ];

  const randomIndex = getRandomInteger(0, cities.length - 1);
  return cities[randomIndex];
};


const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet.',
    'Cras aliquet varius magna, non.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget.',
    'Phasellus eros mauris, condimentum.',
    'Sed blandit, eros vel aliquam.',
    'Sed sed nisi sed augue.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);
  return descriptions[randomIndex];
};


const generatePhoto = () => ({
  src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 10)}`,
  description: generateDescription(),
});

const getPhotos = () => {
  const quantityPhotos = getRandomInteger(0, 5);
  const photos = new Array(quantityPhotos).fill().map(generatePhoto);

  return photos;
};

const generateDestination = () => ({
  description: generateDescription(),
  name: generateCity(),
  pictures: getPhotos(),
});

const generateOffer = () => ({
  title: generateDescription(),
  price: getRandomInteger(50, 550),
});

const getOffers = (type) => {
  const quantityOffers = getRandomInteger(0, 5);
  const offers = new Array(quantityOffers).fill().map(generateOffer);

  return {
    type,
    offers,
  };
};

const generateDateFrom = () => {
  const hours = getRandomInteger(0, 3);
  const minutes = getRandomInteger(0, 45);
  return dayjs().add(hours, 'h').add(minutes, 'm');
};

const generateDateTo = () => {
  const hours = getRandomInteger(4, 7);
  const minutes = getRandomInteger(0, 45);
  const days = getRandomInteger(1, 4);
  return dayjs().add(days, 'd').add(hours, 'h').add(minutes, 'm');
};

export const getEventDuration = (dateFrom, dateTo) => {
  const difference = dateTo.diff(dateFrom, 'm');


  if (difference < 60) {
    return `${dateTo.diff(dateFrom, 'm')}M`;
  } else if (difference > 60 && difference < 1440) {
    const hours = Math.floor(dateTo.diff(dateFrom, 'm') / 60);
    const minutes = dateTo.diff(dateFrom, 'm') % 60;
    return `${hours}H ${minutes}M`;
  } else if (difference > 1440) {
    const days = Math.floor((Math.floor(dateTo.diff(dateFrom, 'm') / 60)) / 24);
    const hours = Math.floor(dateTo.diff(dateFrom, 'm') / 60) % 24;
    const minutes = dateTo.diff(dateFrom, 'm') % 60;
    return `${days}D ${hours}H ${minutes}M`;
  }
};

export const generatePointTrip = () => {
  const type = generateType();

  return {
    type,
    destination: generateDestination(),
    offer: getOffers(type),
    basicPrice: getRandomInteger(0, 1550),
    dateFrom: generateDateFrom(),
    dateTo: generateDateTo(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    id: getRandomInteger(0, 25),
  };
};
