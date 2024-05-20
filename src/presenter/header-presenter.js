import TripFilterView from '../view/trip-filter-view';
import TripInfoView from '../view/trip-info-view';
import { render, RenderPosition } from '../render';

const headerInner = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');

export default class HeaderPresenter {
  #eventFilterComponent = new TripFilterView(filter);
  #eventInfoComponent = new TripInfoView();
  #points = null;

  constructor(points) {
    this.#points = points;
  }

  init() {
    render(this.#eventFilterComponent, filterContainer);
    render(this.#eventInfoComponent, headerInner, RenderPosition.AFTERBEGIN);
  }

  // #renferTripFilterView({filter}) {
  //
  //   render(new TripFilterView())
  // }
}
