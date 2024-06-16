import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { getRandomNumberElement } from './common.js';
import { FilterType } from '../const.js';
dayjs.extend(duration);

const DATE_FORMAT = 'HH:mm';
const DATE_FORMAT_FORM = 'DD/MM/YY HH:mm';
const DATE_FORMAT_DATE_TIME = 'YYYY-MM-DDTHH:mm';
const DATE_FORMAT_DATE_TIME_FREE_CLOCK = 'YYYY-MM-DD';
const DATE_FORMAT_MONTH_DAY = 'MMM D';
const DATE_FORMAT_DAY_MONTH = 'D MMM';

const humanizeTaskDueDateDayMonth = (date) => date ? dayjs(date).format(DATE_FORMAT_DAY_MONTH) : '';
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

function addZeroToNumber(number) {
  return number < 10 ? `0${number}` : number;
}

function renderDifferenceTime(start, finish) {
  const diffTimeInMs = finish.diff(start);
  const timeDuration = dayjs.duration(diffTimeInMs);
  const days = timeDuration.days();
  const hours = timeDuration.hours();
  const minutes = timeDuration.minutes();
  return `${days > 0 ? `${addZeroToNumber(days)}D ` : ''}${hours > 0 ? `${addZeroToNumber(hours)}H ` : ''}${minutes > 0 ? `${addZeroToNumber(minutes)}M` : ''}`;
}

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

const filter = {
  [FilterType.EVERYTHING]: (tripPoints) => filterTripByEverything(tripPoints),
  [FilterType.PAST]: (tripPoints) => filterTripByPast(tripPoints),
  [FilterType.PRESENT]: (tripPoints) => filterTripByPresent(tripPoints),
  [FilterType.FUTURE]: (tripPoints) => filterTripByFuture(tripPoints),
};

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export {
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
  filter,
  humanizeTaskDueDateDayMonth
};
