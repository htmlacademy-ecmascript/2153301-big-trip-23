import { logPlugin } from '@babel/preset-env/lib/debug';
import { render, replace, RenderPosition } from '../framework/render.js';
import TripSort from '../view/trip-sort.js';
import TripPointsList from '../view/trip-points-list.js';
import ListEmpty from '../view/list-empty.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';
import { isEmpty } from '../utils/task.js';

export default class MainPresenter {
  #eventListComponent = null;
  #mainPage = null;
  #pointModel = null;
  #boardPoints = null;
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
    this.#renderBoard(this.#boardPoints);
  }

  #renderListPoint() {
    render(this.#eventListComponent, this.#mainPage);
  }

  #handlePointChange(updatedPoint) {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#allPresenters.get(updatedPoint.id)
      .init(this.#pointModel.points, this.#pointModel.destinations, this.#pointModel.offers, updatedPoint);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventListComponent.element,
      onDataChange: this.#handlePointChange
    });
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


  #renderBoard(points) {
    if (isEmpty(points)) {
      this.#renderListEmpty();
      return
    }

    this.#renderListPoint();

    this.#pointModel.points.forEach((point) => {
      this.#renderPoint(point);
    });

    this.#renderSort();
  }
}
