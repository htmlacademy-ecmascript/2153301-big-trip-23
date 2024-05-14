import { render, RenderPosition } from '../render.js';
import TripPointView from '../view/trip-point-view';
import TripSort from '../view/trip-sort.js';
import TripPointsList from '../view/trip-points-list.js';
import TripEditView from '../view/trip-edit-view';
import NewPoint from '../view/new-point.js';

export default class MainPresenter {
  #eventListComponent = null;
  #mainPage = null;
  #pointModel = null;

  constructor({ boardMainContainer, pointModel }) {
    this.#mainPage = boardMainContainer;
    this.#pointModel = pointModel;
    this.#eventListComponent = new TripPointsList();
  }

  init() {

    render(new TripSort(), this.#mainPage, RenderPosition.AFTERBEGIN);
    render(this.#eventListComponent, this.#mainPage);
    render(new TripEditView(this.#pointModel.points[0], this.#pointModel.destinations, this.#pointModel.offers), this.#eventListComponent.element);
    this.#pointModel.points.forEach((point) => {
      this.#renderPoint(point);
    });

    render(new NewPoint(), this.#eventListComponent.element);
  }

  #renderPoint(point) {
    const pointComponent = new TripPointView(point, this.#pointModel.offers);
    render(pointComponent, this.#eventListComponent.element)
  }
}
