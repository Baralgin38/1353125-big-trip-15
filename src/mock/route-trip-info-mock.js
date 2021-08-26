
const sortingPointsTrip = (tripPoints) => {
  const sortArray = tripPoints.slice().sort((a, b) => {
    const first = a.dateFrom.valueOf();
    const second = b.dateFrom.valueOf();
    return first - second;
  });

  return sortArray;
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

const getTotalPriceTrip = (tripPoints) => tripPoints.reduce((accumulator, value) => {
  const {basicPrice} = value;
  return accumulator + basicPrice;
}, 0);

export const getRouteTripInfo = (tripPoints) => {
  const sortPointsTrip = sortingPointsTrip(tripPoints);

  const dates = [
    sortPointsTrip[0].dateFrom.format('DD'),
    sortPointsTrip[sortPointsTrip.length - 1].dateTo.format('DD'),
  ];

  const months = [
    sortPointsTrip[0].dateFrom.format('MMM'),
    sortPointsTrip[sortPointsTrip.length - 1].dateTo.format('MMM'),
  ];

  return {
    cities: getDestinationInfo(sortPointsTrip),
    dates,
    months,
    totalPrice: getTotalPriceTrip(sortPointsTrip),
  };
};
