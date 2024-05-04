import {getRandomArrayElement} from '../utils.js';
import { BASE_PRICES, CITIES, DATES_FROM, DATES_TO,DESTINATIONS, BOOLEAN, OFFERS, TYPE_POINT } from '../const.js';

const mockTasks = [
  {
    'id': getRandomArrayElement(CITIES),
    'basePrice': getRandomArrayElement(BASE_PRICES),
    'dateFrom': new Date(getRandomArrayElement(DATES_FROM)),
    'dateTo': new Date(getRandomArrayElement(DATES_TO)),
    'destination': getRandomArrayElement(DESTINATIONS),
    'isFavorite': getRandomArrayElement(BOOLEAN),
    offers: OFFERS,
    'type': getRandomArrayElement(TYPE_POINT),
  },
];

const getRandomTask = () => getRandomArrayElement(mockTasks);

export {getRandomTask};


