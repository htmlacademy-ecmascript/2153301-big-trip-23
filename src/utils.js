import dayjs from 'dayjs';

const DATE_FORMAT = 'DD:HH';
const DATE_FORMAT_FORM = 'DD/MM/YY DD:HH';

let getRandomArrayElement = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

let humanizeTaskDueDate = (date) => {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
};

const humanizeTaskDueDateForm = (date) => {
  return date ? dayjs(date).format(DATE_FORMAT_FORM) : '';
}

const user = humanizeTaskDueDateForm('2024-06-10T14:30');
console.log(user);


export { getRandomArrayElement, humanizeTaskDueDate, humanizeTaskDueDateForm };
