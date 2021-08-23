
const sortingPointsTrip = (tripPoints) => {
  const sortArr = tripPoints.slice().sort((a, b) => {
    const first = a.dateFrom.valueOf();
    const second = b.dateFrom.valueOf();
    return first - second;
  });

  return sortArr;
};


const getDestinationInfo = (tripPoints) => {
  const destinationInfo = tripPoints.map((tripPoint) => {
    const {destination} = tripPoint;
    return destination.name;
  });

  const allDestination = new Set(destinationInfo);
  const uniqueDestination = Array.from(allDestination);

  return uniqueDestination;
};

const getDateInfo = (tripPoints) => {
  const dateInterval = [];

  tripPoints.forEach((value, index, array) => {
    if (index === 0 || index === array.length - 1) {
      if (index === 0) {
        dateInterval.push(value.dateFrom.format('DD'));
      } else if (index === array.length -1) {
        dateInterval.push(value.dateTo.format('DD'));
      }
    }
  });

  return dateInterval;
};

const getMonthInfo = (tripPoints) => {
  const allMonths = [];

  tripPoints.forEach((value, index, array) => {
    if (index === 0 || index === array.length - 1) {
      if (index === 0) {
        allMonths.push(value.dateFrom.format('MMM'));
      } else if (index === array.length -1) {
        allMonths.push(value.dateTo.format('MMM'));
      }
    }
  });

  const month = new Set(allMonths);
  const unqiueMonth = Array.from(month);

  return unqiueMonth;
};

const getTotalPriceTrip = (tripPoints) => tripPoints.reduce((accumulator, value) => {
  const {basicPrice} = value;
  return accumulator + basicPrice;
}, 0);

export const getRouteTripInfo = (tripPoints) => {
  const sortPointsTrip = sortingPointsTrip(tripPoints);

  return {
    cities: getDestinationInfo(sortPointsTrip),
    dates: getDateInfo(tripPoints),
    months: getMonthInfo(tripPoints),
    totalPrice: getTotalPriceTrip(tripPoints),
  };
};
