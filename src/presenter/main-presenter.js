import { render, RenderPosition } from '../render.js';
import TripPointView from '../view/trip-point-view';
import TripSort from '../view/trip-sort.js';
import TripPointsList from '../view/trip-points-list.js';
import TripEditView from '../view/trip-edit-view';
import NewPoint from '../view/new-point.js';

export default class MainPresenter {
  #eventListComponent = new TripPointsList();
  #mainPage = null;
  #pointModel = null;

  #points = null;
  #destinations = null;

  constructor({ boardMainContainer, pointModel }) {
    this.#mainPage = boardMainContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#points = this.#pointModel.points;
    this.#destinations = this.#pointModel.destinations;

    render(new TripSort(), this.#mainPage, RenderPosition.AFTERBEGIN);
    render(this.#eventListComponent, this.#mainPage);
    render(new TripEditView(this.#points[0], this.#destinations), this.#eventListComponent.element);
    this.#points.forEach((point) => {
      render(new TripPointView(point, this.#destinations), this.#eventListComponent.element);
    });

    render(new NewPoint(), this.#eventListComponent.element);
  }
}
