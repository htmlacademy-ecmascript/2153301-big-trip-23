import { render, replace, RenderPosition } from '../framework/render.js';
import TripSort from '../view/trip-sort.js';
import TripPointsList from '../view/trip-points-list.js';
import ListEmpty from '../view/list-empty.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';
import { isEmpty } from '../utils/task.js';
import { generateSorterAndFilter } from '../utils/grader.js';
import { sorter } from '../utils/sort.js';
import { SortTypes } from '../const.js';

export default class MainPresenter {
  #eventListComponent = null;
  #mainPage = null;
  #pointModel = null;
  #points = [];
  #boardPoints = null;
  #sortComponent = null;
  #listEmpty = new ListEmpty();
  #allPresenters = new Map();
  #currentSortType = SortTypes.DAY;
  #sourcedBoardPoints = [];

  constructor({ boardMainContainer, pointModel }) {
    this.#mainPage = boardMainContainer;
    this.#pointModel = pointModel;
    this.#points = pointModel.points;
    this.#eventListComponent = new TripPointsList();
  }

  init() {
    this.#boardPoints = [...this.#pointModel.points];
    this.#renderBoard(this.#boardPoints);
    this.#renderSort(this.#points);
    this.#sourcedBoardPoints = [...this.#pointModel.points];
  }

  #renderListPoint() {
    render(this.#eventListComponent, this.#mainPage);
  }

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#allPresenters
      .get(updatedPoint.id)
      .init(updatedPoint, this.#pointModel.offers, this.#pointModel.destinations);
  };

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

  #sortPoints(sortType) {
    switch (sortType) {
      case SortTypes.TIME:

    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
  };

  #renderSort(points) {
    const sorters = generateSorterAndFilter(sorter, points);
    this.#sortComponent = new TripSort({ sorters, onSortTypeChange: this.#handleSortTypeChange });
    render(this.#sortComponent, this.#mainPage, RenderPosition.AFTERBEGIN);
  }

  #clearPointList() {
    this.#allPresenters.forEach((presenter) => presenter.destroy());
    this.#allPresenters.clear();
  }

  #renderBoard(points) {
    if (isEmpty(points)) {
      this.#renderListEmpty();
      return;
    }

    this.#renderListPoint();

    this.#pointModel.points.forEach((point) => {
      this.#renderPoint(point);
    });
  }
}
