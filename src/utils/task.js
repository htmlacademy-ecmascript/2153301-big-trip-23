import dayjs from 'dayjs';
import { getRandomNumberElement } from './common.js';
import { TimeType } from '../const.js';

const DATE_FORMAT = 'HH:mm';
const DATE_FORMAT_FORM = 'DD/MM/YY HH:mm';
const DATE_FORMAT_DATE_TIME = 'YYYY-MM-DDTHH:mm';
const DATE_FORMAT_DATE_TIME_FREE_CLOCK = 'YYYY-MM-DD';
const DATE_FORMAT_MONTH_DAY = 'MMM D';
const DATE_FORMAT_DIFFERENCE_MONTH_DAY = 'H MM';

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
const renderDifferenceTime = (to, from) => dayjs(to).diff(from, 'm');

const getDuration = (dateFrom, dateTo) => {
  const timeDurations = [
    {sign:'D', value: dayjs(dateTo).diff(dateFrom, 'd')},
    {sign: 'H', value: dayjs(dateTo).diff(dateFrom, 'h') % TimeType.HOURS},
    {sign: 'M', value: dayjs(dateTo).diff(dateFrom, 'm') % TimeType.MINUTES},
  ];
  const resultDuration = [];
  for (let i = 0; i < timeDurations.length; i++) {
    if (timeDurations[i].value && timeDurations[i].value < 10) {
      resultDuration.push(`0${timeDurations[i].value}${timeDurations[i].sign} `);
    } else if (timeDurations[i].value && timeDurations[i].value >= 10) {
      resultDuration.push(`${timeDurations[i].value}${timeDurations[i].sign} `);
    } else if (!timeDurations[i].value && resultDuration.length !== 0) {
      resultDuration.push(`00${timeDurations[i].sign} `);
    }
  }
  return resultDuration.join('');
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

const capitalizeFirstLetter = (string) =>string.charAt(0).toUpperCase() + string.slice(1);

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
  getDuration
};
