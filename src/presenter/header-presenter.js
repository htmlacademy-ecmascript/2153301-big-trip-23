import TripFilterView from '../view/trip-filter-view';
import TripInfoView from '../view/trip-info-view';
import { render, RenderPosition } from '../render';


const headerInner = document.querySelector('.trip-main');

export default class HeaderPresenter {
  #eventInfoComponent = new TripInfoView();
  // #filters = null;
  #filterContainer = null;

  constructor({filterContainer, filters}) {
    // this.#filters = filters;
    this.#filterContainer = filterContainer;
  }

  init() {
    // render(this.#eventFilterComponent, filterContainer);
    render(this.#eventInfoComponent, headerInner, RenderPosition.AFTERBEGIN);
  }

  #renderFilters ({filters}) {
    render(new TripFilterView({filters}), this.#filterContainer)
  }

}
