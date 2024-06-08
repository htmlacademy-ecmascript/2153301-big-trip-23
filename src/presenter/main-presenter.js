import { render, RenderPosition } from '../framework/render.js';
import TripSort from '../view/trip-sort.js';
import TripPointsList from '../view/trip-points-list.js';
import ListEmpty from '../view/list-empty.js';
import PointPresenter from './point-presenter.js';
import { isEmpty, sortByPrice, sortByTime, sortDefaultByDay } from '../utils/task.js';
import { generateSorterAndFilter } from '../utils/grader.js';
import { sorter } from '../utils/sort.js';
import { SortTypes, ALL_TYPES, } from '../const.js';

export default class MainPresenter {
  #eventListComponent = new TripPointsList();
  #mainPage = null;
  #pointModel = null;
  #sortComponent = null;
  #listEmpty = new ListEmpty();
  #allPresenters = new Map();
  #sortTypes = SortTypes;
  #currentSortType = this.#sortTypes.DAY;
  #allTypes = ALL_TYPES;

  constructor({ boardMainContainer, pointModel }) {
    this.#mainPage = boardMainContainer;
    this.#pointModel = pointModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderPoints(this.points);
    this.#renderSort(this.points);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortTypes.TIME:
        return sortByTime(this.#pointModel.points);
      case SortTypes.PRICE:
        return sortByPrice(this.#pointModel.points);
      case SortTypes.DAY:
        return sortDefaultByDay(this.#pointModel.points);
    }
    return this.#pointModel.points;
  }

  #handleModeChange = () => {
    this.#allPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderListPoint() {
    render(this.#eventListComponent, this.#mainPage);
  }

  // #handlePointChange = (updatedPoint) => {
  //   this.#allPresenters
  //     .get(updatedPoint.id)
  //     .init(updatedPoint, this.#pointModel.offers, this.#pointModel.destinations, this.#allTypes);
  // };

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно, чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно, чтобы понять, что после нужно обновить
    // update - обновленные данные
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point, this.#pointModel.offers, this.#pointModel.destinations, this.#allTypes);
    this.#allPresenters.set(point.id, pointPresenter);
  }

  #renderListEmpty() {
    render(this.#listEmpty, this.#mainPage.element, RenderPosition.AFTERBEGIN);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#renderPoints(this.points);
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

  #renderPoints(points) {
    if (isEmpty(points)) {
      this.#renderListEmpty();
      return;
    }

    this.#renderListPoint();

    points.forEach((point) => {
      this.#renderPoint(point);
    });
  }
}
