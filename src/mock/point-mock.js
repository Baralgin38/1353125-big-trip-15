import dayjs from 'dayjs';
import {getRandomInteger} from '../util';

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

const generateOfferDescription = () => {
  const offerDescriptions = [
    'Add luggage',
    'Switch to comfort class',
    'Add meal',
    'Choose seats',
    'Travel by train',
    'Order Uber',
    'Rent a car',
    'Add breakfast',
    'Book tickets',
    'Lunch in city',
  ];

  const randomIndex = getRandomInteger(0, offerDescriptions.length - 1);
  return offerDescriptions[randomIndex];
}


const generatePhoto = () => ({
  src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 10)}`,
  description: generateDescription(),
});

const getPhotos = () => {
  const quantityPhotos = getRandomInteger(0, 5);
  const photos = new Array(quantityPhotos).fill().map(generatePhoto);

  return photos;
};

const generateDestination = () => {
  const descriptions = [];
  const descriptionsQuantity = getRandomInteger(1, 5);

  for(let i = descriptionsQuantity; i > 0; i--) {
    descriptions.push(generateDescription());
  }

  return {
    description: descriptions.join(' '),
    name: generateCity(),
    pictures: getPhotos(),
  };
};

const generateOffer = () => ({
  title: generateOfferDescription(),
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
  return dayjs().add(hours, 'h').add(minutes, 'm');
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
