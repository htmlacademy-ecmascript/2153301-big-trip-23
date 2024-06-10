import TripFilterView from '../view/trip-filter-view';
import TripInfoView from '../view/trip-info-view';
import { render, RenderPosition } from '../framework/render.js';
import { FilterType, UpdateType } from '../const.js';
import { filter } from '../utils/task';

import { replace, remove } from '../framework/render.js';

const headerInner = document.querySelector('.trip-main');

export default class FilterPresenter {
  #eventInfoComponent = new TripInfoView();
  #filters = null;
  #filterContainer = null;
  #filterComponent = null;

  #filterModel = null;
  #pointModel = null;

  constructor({ filterContainer, filterModel, pointModel }) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointModel = pointModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointModel.points;

    return Object.values(FilterType)
      .map((type) => (
        {
          type,
          count: filter[type](points).length
        }
      ));
  }

  init() {
    const filters = this.filters;

    const prevFilterComponent = this.#filterComponent;

    // render(this.#eventInfoComponent, headerInner, RenderPosition.AFTERBEGIN);
    // this.#renderFilters(this.#filters);

    this.#filterComponent = new TripFilterView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  // #renderFilters(filters) {
  //   render(new TripFilterView({
  //     filters,
  //   }), this.#filterContainer);
  // }

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
