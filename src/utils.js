import dayjs from 'dayjs';

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

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

export {
  getRandomArrayElement,
  humanizeTaskDueDate,
  humanizeTaskDueDateForm,
  humanizeTaskDueDateFormat,
  humanizeTaskDueDateTimeFreeClock,
  humanizeTaskDueDateMonthDay,
  renderDifferenceTime
};
