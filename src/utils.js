import dayjs from 'dayjs';

const DATE_FORMAT = 'DD HH';

let getRandomArrayElement = (items, count) => {
  let result = [];
  if (count) {
    for (let i = 0; i < count; i++) {
      result.push(items[Math.floor(Math.random() * items.length)]);
    }
    return result;
  } else {
    return items[Math.floor(Math.random() * items.length)];
  }
}

let humanizeTaskDueDate = (date) => {
  return date ? dayjs(date).format(DATE_FORMAT) : '' ;
}



export {getRandomArrayElement, humanizeTaskDueDate};
