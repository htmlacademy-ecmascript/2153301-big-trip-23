import { remove, render, RenderPosition } from '../framework/render.js';
import TripSort from '../view/trip-sort.js';
import TripPointsList from '../view/trip-points-list.js';
import ListEmpty from '../view/list-empty.js';
import PointPresenter from './point-presenter.js';
import { isEmpty, sortByPrice, sortByTime, sortDefaultByDay } from '../utils/task.js';
import { generateSorterAndFilter } from '../utils/grader.js';
import { sorter } from '../utils/sort.js';
import { SortTypes, ALL_TYPES, } from '../const.js';
import { UserAction, UpdateType } from '../const.js';

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
    this.#renderBoard(this.points);
    // this.#renderSort(this.points);
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

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);

    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#allPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard({ resetRenderedTaskCount: true, resetSortType: true });
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
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
    this.#clearBoard();
    this.#renderBoard(this.points);
  };

  #renderSort() {
    this.#sortComponent = new TripSort({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#mainPage, RenderPosition.AFTERBEGIN);
  }

  #clearBoard({ resetSortType = false } = {}) {
    this.#allPresenters.forEach((presenter) => presenter.destroy());
    this.#allPresenters.clear();

    remove(this.#sortComponent);

    if (this.#eventListComponent) {
      remove(this.#eventListComponent);
    }

    // if (this.#renderListEmpty) {
    //   remove(this.#renderListEmpty);
    // }

    if (resetSortType) {
      this.#currentSortType = SortTypes.DAY;
    }
  }

  #renderBoard(points) {
    if (isEmpty(points)) {
      this.#renderListEmpty();
      return;
    }

    this.#renderSort();
    render(this.#eventListComponent, this.#mainPage);

    points.forEach((point) => {
      this.#renderPoint(point);
    });
  }
}
