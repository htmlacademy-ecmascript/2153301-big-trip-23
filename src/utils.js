import dayjs from 'dayjs';

const DATE_FORMAT = 'DD:HH';
const DATE_FORMAT_FORM = 'DD/MM/YY DD:HH';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

// const getRandomNumberElement = (min, max) => {
//   const rand = min + Math.random() * (max + 1 - min);
//   return Math.floor(rand);
// };

const humanizeTaskDueDate = (date) => date ? dayjs(date).format(DATE_FORMAT) : '';

const humanizeTaskDueDateForm = (date) => date ? dayjs(date).format(DATE_FORMAT_FORM) : '';

export { getRandomArrayElement, humanizeTaskDueDate, humanizeTaskDueDateForm };
