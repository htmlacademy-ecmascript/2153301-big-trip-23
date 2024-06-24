import AbstractView from '../framework/view/abstract-view';
import { getFirstWordCapitalize } from '../utils/task';

const createFilterElement = (filter, currentFilterType) => {
  const {type, count} = filter;
  return (
    `<div class="trip-filters__filter">
      <input
       id="filter-${type}"
       class="trip-filters__filter-input  visually-hidden"
       type="radio" name="trip-filter"
       value="${type}"
       ${type === currentFilterType ? 'checked' : ''}
       ${count === 0 ? 'disabled' : ''}
       />
      <label
      class="trip-filters__filter-label"
      for="filter-${type}">${getFirstWordCapitalize(type)}</label>
  </div>`
  );
};

const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterElement(filter, currentFilterType)).join('');
  return (
    `<form class="trip-filters" action="#" method="get">
  ${filterItemsTemplate}
    </form>`
  );
};

export default class TripFilterView extends AbstractView {

  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element?.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
