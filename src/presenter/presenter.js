import { render } from '../render.js';
import Filter from '../view/trip-filters.js';
import TripSort from '../view/trip-sort.js';
import TripPointsList from '../view/trip-points-list.js';
import NewPoint from '../view/new-point.js';
import EditPoint from '../view/edit-point.js';
import Point from '../view/point.js';

export default class Presenter {
  constructor({tasksModel}) {
    this.tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
    this.mainPage = document.querySelector('.trip-events');

    this.tasksModel = tasksModel;
  }

  renderFilter() {
    render(new Filter(), this.tripControlsFiltersElement);
  }

  renderTripSort() {
    render(new TripSort(), this.mainPage);
  }

  renderTripList() {
    render(new TripPointsList(), this.mainPage);
  }

  renderEditPoint() {
    const tripList = this.mainPage.querySelector('.trip-events__list');
    render(new EditPoint(), tripList);
  }

  renderPoint() {
    const tripList = this.mainPage.querySelector('.trip-events__list');
    for (let i = 0; i < 3; i++) {
      render(new Point(), tripList);
    }
  }

  renderNewPoint() {
    const tripList = this.mainPage.querySelector('.trip-events__list');
    render(new NewPoint(), tripList);
  }

  init() {
    this.boardTasks = [...this.tasksModel.tasks]

    this.renderFilter();
    this.renderTripSort();
    this.renderTripList();
    this.renderEditPoint();
    this.renderPoint();
    this.renderNewPoint();


  }
}
