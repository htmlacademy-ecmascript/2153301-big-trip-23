import { render, replace, RenderPosition } from '../framework/render.js';
import TripSort from '../view/trip-sort.js';
import TripPointsList from '../view/trip-points-list.js';
import ListEmpty from '../view/list-empty.js';
import PointPresenter from './point-presenter.js';
import TripPointView from '../view/trip-point-view';
import TripEditView from '../view/trip-edit-view';

export default class MainPresenter {
  #eventListComponent = null;
  #mainPage = null;
  #pointModel = null;
  #boardPoints = [];
  #sortComponent = new TripSort();
  #listEmpty = new ListEmpty();
  #allPresenters = new Map();

  constructor({ boardMainContainer, pointModel }) {
    this.#mainPage = boardMainContainer;
    this.#pointModel = pointModel;
    this.#eventListComponent = new TripPointsList();

  }

  init() {
    this.#boardPoints = [...this.#pointModel.points];
    this.#renderBoard();
  }

  #renderListPoint() {
    render(this.#eventListComponent, this.#mainPage);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({ pointListContainer: this.#eventListComponent.element });
    pointPresenter.init(point, this.#pointModel.offers, this.#pointModel.destinations);
    this.#allPresenters.set(point.id, pointPresenter);
  }

  #renderListEmpty() {
    render(this.#listEmpty, this.#mainPage.element, RenderPosition.AFTERBEGIN);
  }

  #renderSort() {
    render(this.#sortComponent, this.#mainPage, RenderPosition.AFTERBEGIN);
  }

  #clearPointList() {
    this.#allPresenters.forEach((presenter) => presenter.destroy());
    this.#allPresenters.clear();
  }

  #renderBoard() {
    this.#renderListPoint();

    this.#pointModel.points.forEach((point) => {
      this.#renderPoint(point);
    });

    if (this.#boardPoints.length === 0) {
      this.#renderListEmpty();
      return;
    }

    this.#renderSort();
  }
}
