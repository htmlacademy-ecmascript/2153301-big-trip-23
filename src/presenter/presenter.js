import { render, RenderPosition } from '../render.js';
import Filter from '../view/trip-filters.js';
import TripSort from '../view/trip-sort.js';

export default class Presenter {
  constructor() {
    this.tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
    this.mainPage = document.querySelector('.trip-events');

  }

  renderFilter(){
    render(new Filter(), this.tripControlsFiltersElement);
  }

  renderTripSort() {
    render(new TripSort(), this.mainPage)
  }

  init() {
    this.renderFilter();
    this.renderTripSort();
  }
}
