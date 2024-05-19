import dayjs from 'dayjs';
import { getRandomNumberElement } from './common.js';

const DATE_FORMAT = 'HH:mm';
const DATE_FORMAT_FORM = 'DD/MM/YY HH:mm';
const DATE_FORMAT_DATE_TIME = 'YYYY-MM-DDTHH:mm';
const DATE_FORMAT_DATE_TIME_FREE_CLOCK = 'YYYY-MM-DD';
const DATE_FORMAT_MONTH_DAY = 'MMM D';

const humanizeTaskDueDate = (date) => date ? dayjs(date).format(DATE_FORMAT) : '';
const humanizeTaskDueDateForm = (date) => date ? dayjs(date).format(DATE_FORMAT_FORM) : '';
const humanizeTaskDueDateFormat = (date) => date ? dayjs(date).format(DATE_FORMAT_DATE_TIME) : '';
const humanizeTaskDueDateTimeFreeClock = (date) => date ? dayjs(date).format(DATE_FORMAT_DATE_TIME_FREE_CLOCK) : '';
const humanizeTaskDueDateMonthDay = (date) => date ? dayjs(date).format(DATE_FORMAT_MONTH_DAY) : '';
const renderDifferenceTime = (to, from) => dayjs(to).diff(from, 'm');

const getRandomDescriptionPhoto = () => `https://loremflickr.com/248/152?random=${getRandomNumberElement(1, 20)}`;

const filterTripByEverything = (tripPoints) => tripPoints;
const filterTripByPast = (tripPoints) => tripPoints.filter((trip) => new Date(trip.dateTo).getTime() < Date.now());
const filterTripByPresent = (tripPoints) => tripPoints.filter((trip) => new Date(trip.dateFrom).getTime() <=
  Date.now() &&
  new Date(trip.dateTo).getTime() >=
  Date.now());
const filterTripByFuture = (tripPoints) => tripPoints.filter((trip) => new Date(trip.dateFrom).getTime() > Date.now());

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
};
