
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

// const getMonthInfo = (tripPoints) => {
//   const allMonths = [];

//   tripPoints.forEach((value, index, array) => {
//     if (index === 0 || index === array.length - 1) {
//       if (index === 0) {
//         allMonths.push(value.dateFrom.format('MMM'));
//       } else if (index === array.length -1) {
//         allMonths.push(value.dateTo.format('MMM'));
//       }
//     }
//   });

//   const month = new Set(allMonths);
//   const unqiueMonth = Array.from(month);

//   return unqiueMonth;
// };

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
