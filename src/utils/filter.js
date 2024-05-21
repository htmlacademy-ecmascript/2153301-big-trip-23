import { FilterType } from '../const.js';
import { filterTripByEverything, filterTripByPast, filterTripByPresent, filterTripByFuture } from './task.js';

const filter = {
  [FilterType.EVERYTHING]: (tripPoints) => filterTripByEverything(tripPoints),
  [FilterType.PAST]: (tripPoints) => filterTripByPast(tripPoints),
  [FilterType.PRESENT]: (tripPoints) => filterTripByPresent(tripPoints),
  [FilterType.FUTURE]: (tripPoints) => filterTripByFuture(tripPoints),
};

export {filter};
