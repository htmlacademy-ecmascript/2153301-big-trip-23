import dayjs from 'dayjs';
import { getRandomNumberElement } from './common.js';

const DATE_FORMAT = 'HH:mm';
const DATE_FORMAT_FORM = 'DD/MM/YY HH:mm';
const DATE_FORMAT_DATE_TIME = 'YYYY-MM-DDTHH:mm';
const DATE_FORMAT_DATE_TIME_FREE_CLOCK = 'YYYY-MM-DD';
const DATE_FORMAT_MONTH_DAY = 'MMM D';

const humanizeTaskDueDate = (date) => (
  date ? dayjs(date).format(DATE_FORMAT) : ''
);
const humanizeTaskDueDateForm = (date) => (
  date ? dayjs(date).format(DATE_FORMAT_FORM) : ''
);
const humanizeTaskDueDateFormat = (date) => (
  date ? dayjs(date).format(DATE_FORMAT_DATE_TIME) : ''
);
const humanizeTaskDueDateTimeFreeClock = (date) => (
  date ? dayjs(date).format(DATE_FORMAT_DATE_TIME_FREE_CLOCK) : ''
);
const humanizeTaskDueDateMonthDay = (date) => (
  date ? dayjs(date).format(DATE_FORMAT_MONTH_DAY) : ''
);

const renderDifferenceTime = (to, from) => {
  const values = [];
  const differenceDays = dayjs(to).diff(from, 'd');
  const differenceHours = dayjs(to).diff(from, 'h');
  const differenceMinutes = dayjs(to).diff(from, 'm');
  const minutesFreeHours = differenceMinutes -
    (
      differenceHours * 60
    );
  const hoursFreeDays = differenceHours -
    (
      differenceDays * 24
    );

  if (differenceDays > 0) {
    values.push(`${differenceDays}D`);
    values.push(`${hoursFreeDays}H`);
    values.push(`${minutesFreeHours}M`);
  } else if (differenceHours > 0) {
    values.push(`${hoursFreeDays}H`);
    values.push(`${minutesFreeHours}M`);
  } else {
    values.push(`${minutesFreeHours}M`);
  }

  return values.join(' ');
};

const getRandomDescriptionPhoto = () => `https://loremflickr.com/248/152?random=${getRandomNumberElement(1, 20)}`;

const sortDefaultByDay = (tripPoints) => [...tripPoints].sort((a, b) => new Date(a.dateFrom).getTime() -
  new Date(b.dateFrom).getTime());
const sortByPrice = (tripPoints) => [...tripPoints].sort((a, b) => b.basePrice - a.basePrice);
const sortByTime = (tripPoints) => [...tripPoints].sort((a, b) => dayjs(b.dateTo).diff(dayjs(b.dateFrom)) -
  dayjs(a.dateTo).diff(dayjs(a.dateFrom)));
const filterTripByEverything = (tripPoints) => tripPoints;
const filterTripByPast = (tripPoints) => tripPoints.filter((trip) => new Date(trip.dateTo).getTime() < Date.now());
const filterTripByPresent = (tripPoints) =>
  tripPoints.filter((trip) => new Date(trip.dateFrom).getTime() <=
    Date.now() &&
    new Date(trip.dateTo).getTime() >=
    Date.now());
const filterTripByFuture = (tripPoints) => tripPoints.filter((trip) => new Date(trip.dateFrom).getTime() > Date.now());
const isEmpty = (data) => data.length === 0;

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export {
  getRandomDescriptionPhoto,
  humanizeTaskDueDate,
  humanizeTaskDueDateForm,
  humanizeTaskDueDateFormat,
  humanizeTaskDueDateTimeFreeClock,
  humanizeTaskDueDateMonthDay,
  renderDifferenceTime,
  filterTripByEverything,
  filterTripByPast,
  filterTripByPresent,
  filterTripByFuture,
  isEmpty,
  sortDefaultByDay,
  sortByPrice,
  sortByTime,
  capitalizeFirstLetter,
};
