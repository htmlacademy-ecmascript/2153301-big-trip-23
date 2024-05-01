import {getRandomArrayElement} from '../utils.js';
import { BASE_PRICES, CITIES, DATES_FROM, DATES_TO,DESTINATIONS, BOOLEAN, OFFERS, TYPE_POINT } from '../const.js';

const mockTasks = [
  {
    "id": getRandomArrayElement(CITIES),
    "basePrice": getRandomArrayElement(BASE_PRICES),
    "dateFrom": new Date(getRandomArrayElement(DATES_FROM)),
    "dateTo": new Date(getRandomArrayElement(DATES_TO)),
    "destination": getRandomArrayElement(DESTINATIONS),
    "isFavorite": getRandomArrayElement(BOOLEAN),
    "offers": [
      getRandomArrayElement(OFFERS, 5)
    ],
    "type": getRandomArrayElement(TYPE_POINT),
  },
];

function getRandomTask() {
  return getRandomArrayElement(mockTasks);
}

export {getRandomTask};




