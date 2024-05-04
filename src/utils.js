import dayjs from 'dayjs';

const DATE_FORMAT = 'DD:HH';
const DATE_FORMAT_FORM = 'DD/MM/YY DD:HH';

let getRandomArrayElement = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

const getRandomNumberElement = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

let humanizeTaskDueDate = (date) => {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
};

const humanizeTaskDueDateForm = (date) => {
  return date ? dayjs(date).format(DATE_FORMAT_FORM) : '';
}

export { getRandomArrayElement, humanizeTaskDueDate, humanizeTaskDueDateForm };
