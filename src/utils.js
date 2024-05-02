import dayjs from 'dayjs';

const DATE_FORMAT = 'DD HH';

let getRandomArrayElement = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

let humanizeTaskDueDate = (date) => {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
};


export { getRandomArrayElement, humanizeTaskDueDate };
