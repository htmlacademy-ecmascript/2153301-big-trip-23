import AbstractView from '../framework/view/abstract-view.js';

const createFilterElement = (filter, isChecked) => {
  const { type, count } = filter;
  return `<div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}"
      ${isChecked ? 'checked' : ''}
      ${count === 0 ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
  </div>`;
};

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems.map((filter, index) => createFilterElement(filter, index === 0)).join('');

  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    </form>`;
};

export default class TripFilterView extends AbstractView {
  #filters = null;
  #handleTypeChange = null;

  constructor({ filters, onSortTypeChange }) {
    super();
    this.#filters = filters;
    this.#handleTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler)
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }

  #sortTypeChangeHandler = (evt) => {
    this.#handleTypeChange(evt.target.dataset.sortType);
  };
}
