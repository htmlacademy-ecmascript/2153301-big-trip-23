import { SortTypes } from '../const.js';
import { sortDefaultByDay, sortByTime, sortByPrice } from './task.js';

export const sorter = {
  [SortTypes.DAY]: (points) => sortDefaultByDay(points),
  [SortTypes.EVENT]: () => [],
  [SortTypes.TIME]: (points) => sortByTime(points),
  [SortTypes.PRICE]: (points) => sortByPrice(points),
  [SortTypes.OFFERS]: () => [],
};
