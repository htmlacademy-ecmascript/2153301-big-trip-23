import AbstractView from '../framework/view/abstract-view.js';

const createSortElement = (sorters) => {
  const {type, count} = sorters;
  return (
    `<div class="trip-sort__item trip-sort__item--day">
    <input
    id="sort-day"
    class="trip-sort__input visually-hidden"
    type="radio"
    name="trip-sort"
    value="sort-day"
    checked=""
    >
    <label class="trip-sort__btn" for="sort-day">Day</label>
  </div>`
  )
}

const createSortTemplate = () => `<form class="trip-events__trip-sort trip-sort" action="#" method="get">
        <div class="trip-sort__item trip-sort__item--day">
          <input id="sort-day" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-day" checked="">
          <label class="trip-sort__btn" for="sort-day">Day</label>
        </div>
      </form>`;

export default class TripSort extends AbstractView {
  #sorters = null;

  constructor({ sorters }) {
    super();
    this.#sorters = sorters;
  }

  get template() {
    return createSortTemplate(this.#sorters);
  }
}
