import { remove, render, RenderPosition } from '../framework/render.js';
import TripSort from '../view/trip-sort.js';
import TripPointsList from '../view/trip-points-list.js';
import ListEmpty from '../view/list-empty.js';
import PointPresenter from './point-presenter.js';
import { isEmpty, sortByPrice, sortByTime, sortDefaultByDay } from '../utils/task.js';
import { generateSorterAndFilter } from '../utils/grader.js';
import { sorter } from '../utils/sort.js';
import { SortTypes, ALL_TYPES, } from '../const.js';
import { UserAction, UpdateType, FilterType } from '../const.js';
import { filter } from '../utils/task.js';
import NewPointPresenter from './new-point-presenter.js';

export default class MainPresenter {
  #eventListComponent = new TripPointsList();
  #mainPage = null;
  #pointModel = null;
  #sortComponent = null;
  // #listEmpty = new ListEmpty();
  #listEmpty = null;
  #allPresenters = new Map();
  #sortTypes = SortTypes;
  #currentSortType = this.#sortTypes.DAY;
  #allTypes = ALL_TYPES;
  #filterModel = null;
  // #filterType = null;
  #filterType = FilterType.EVERYTHING;

  constructor({ boardMainContainer, pointModel, filterModel }) {
    this.#mainPage = boardMainContainer;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderBoard(this.points);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortTypes.TIME:
        return sortByTime(filteredPoints);
      case SortTypes.PRICE:
        return sortByPrice(filteredPoints);
      // case SortTypes.DAY:
      //   return sortDefaultByDay(filteredPoints);
    }
    return sortDefaultByDay(filteredPoints);
  }

  #handleModeChange = () => {
    this.#allPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
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
    switch (updateType) {
      case UpdateType.PATCH:
        this.#allPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard(this.points);
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard(this.points);
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

  #renderListEmpty = () => {
    this.#listEmpty = new ListEmpty({
      filterType: this.#filterType
    });


    console.log(this.#listEmpty);
    console.log(this.#mainPage.element);
    render(this.#listEmpty, this.#mainPage);
  };

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
