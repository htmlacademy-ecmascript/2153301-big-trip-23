import TripFilterView from '../view/trip-filter-view';
import TripInfoPresenter from './trip-info-presenter';
import { render } from '../framework/render.js';
import { FilterType, UpdateType } from '../const.js';
import { filter } from '../utils/task';

import { replace, remove } from '../framework/render.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterComponent = null;

  #filterModel = null;
  #pointModel = null;

  #tripInfoPresenter = null;

  constructor({ filterContainer, filterModel, pointModel }) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointModel = pointModel;

    this.#tripInfoPresenter = new TripInfoPresenter({
      pointModel: this.#pointModel,
      tripInfoContainer: this.#filterContainer,
    });

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
    this.#tripInfoPresenter.init();
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

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
    this.#tripInfoPresenter.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
