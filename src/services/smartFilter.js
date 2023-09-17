export default function smartFilter(data, obj) {
  const { make, rentalPrice, millageFrom, millageTo } = obj;

  return data.filter(item => {
    if (
      make !== ' ' &&
      make &&
      rentalPrice !== ' ' &&
      rentalPrice &&
      millageTo !== ' ' &&
      millageTo &&
      millageFrom !== ' ' &&
      millageFrom
    ) {
      return (
        item.mileage >= `${millageFrom}` &&
        item.mileage <= `${millageTo}` &&
        Number(item.rentalPrice.split('$')[1]) <= Number(rentalPrice) &&
        item.make === make
      );
    } else if (
      rentalPrice !== ' ' &&
      rentalPrice &&
      millageTo !== ' ' &&
      millageTo &&
      millageFrom !== ' ' &&
      millageFrom
    ) {
      return (
        item.mileage >= `${millageFrom}` &&
        item.mileage <= `${millageTo}` &&
        Number(item.rentalPrice.split('$')[1]) <= Number(rentalPrice)
      );
    } else if (
      make !== ' ' &&
      make &&
      millageTo !== ' ' &&
      millageTo &&
      millageFrom !== ' ' &&
      millageFrom
    ) {
      return (
        item.mileage >= `${millageFrom}` &&
        item.mileage <= `${millageTo}` &&
        item.make === make
      );
    } else if (
      rentalPrice !== ' ' &&
      make !== ' ' &&
      make &&
      rentalPrice &&
      millageTo !== ' ' &&
      millageTo
    ) {
      return (
        item.make === make &&
        item.mileage <= `${millageTo}` &&
        Number(item.rentalPrice.split('$')[1]) <= Number(rentalPrice)
      );
    } else if (
      rentalPrice !== ' ' &&
      make !== ' ' &&
      make &&
      rentalPrice &&
      millageFrom !== ' ' &&
      millageFrom
    ) {
      return (
        item.make === make &&
        item.mileage >= `${millageFrom}` &&
        Number(item.rentalPrice.split('$')[1]) <= Number(rentalPrice)
      );
    } else if (
      rentalPrice !== ' ' &&
      rentalPrice &&
      millageFrom !== ' ' &&
      millageFrom
    ) {
      return (
        item.mileage >= `${millageFrom}` &&
        Number(item.rentalPrice.split('$')[1]) <= Number(rentalPrice) &&
        item.make === make
      );
    } else if (
      rentalPrice !== ' ' &&
      rentalPrice &&
      millageTo !== ' ' &&
      millageTo
    ) {
      return (
        item.mileage <= `${millageTo}` &&
        Number(item.rentalPrice.split('$')[1]) === rentalPrice
      );
    } else if (make !== ' ' && make && millageFrom !== ' ' && millageFrom) {
      return item.mileage >= `${millageFrom}` && item.make === make;
    } else if (make !== ' ' && make && millageTo !== ' ' && millageTo) {
      return item.mileage <= `${millageTo}` && item.make === make;
    } else if (make !== ' ' && make && rentalPrice !== ' ' && rentalPrice) {
      return (
        Number(item.rentalPrice.split('$')[1]) <= Number(rentalPrice) &&
        item.make === make
      );
    } else if (millageFrom !== ' ' && millageFrom) {
      return item.mileage >= `${millageFrom}`;
    } else if (millageTo !== ' ' && millageTo) {
      return item.mileage <= `${millageTo}`;
    } else if (rentalPrice !== ' ' && rentalPrice) {
      return Number(item.rentalPrice.split('$')[1]) <= Number(rentalPrice);
    } else if (make !== ' ' && make) {
      return item.make === make;
    }
    return item;
  });
}
