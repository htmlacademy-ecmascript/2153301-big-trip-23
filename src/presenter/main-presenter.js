import { render, RenderPosition } from '../framework/render.js';
import TripSort from '../view/trip-sort.js';
import TripPointsList from '../view/trip-points-list.js';
import ListEmpty from '../view/list-empty.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';
import { isEmpty, sortByPrice, sortByTime, sortDefaultByDay } from '../utils/task.js';
import { generateSorterAndFilter } from '../utils/grader.js';
import { sorter } from '../utils/sort.js';
import { SortTypes, ALL_TYPES, } from '../const.js';

export default class MainPresenter {
  #eventListComponent = new TripPointsList();
  #mainPage = null;
  #pointModel = null;
  // #boardPoints = [];
  #sortComponent = null;
  #listEmpty = new ListEmpty();
  #allPresenters = new Map();
  // #sourcedBoardPoints = [];
  #sortTypes = SortTypes;
  #currentSortType = this.#sortTypes.DAY;
  #allTypes = ALL_TYPES;

  constructor({ boardMainContainer, pointModel }) {
    this.#mainPage = boardMainContainer;
    this.#pointModel = pointModel;
  }

  init() {
    // this.#boardPoints = [...this.#pointModel.points];
    this.#renderPoints(this.points);
    this.#renderSort(this.points);
    // this.#sourcedBoardPoints = [...this.#pointModel.points];
  }

  get points() {
    // this.#filterType = this.#filterModel.filter;
    // const points = this.#pointsModel.points;
    // const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortTypes.TIME:
        return sortByTime(this.#pointModel.points);
      case SortTypes.PRICE:
        return sortByPrice(this.#pointModel.points);
      case SortTypes.DAY:
        return sortDefaultByDay(this.#pointModel.points)
    }

    return this.#pointModel.points;
  }

  // #sortPoints(sortType) {
  //   switch (sortType) {
  //     case this.#sortTypes.DAY:
  //       this.#boardPoints = sortDefaultByDay(this.#boardPoints);
  //       break;
  //     case this.#sortTypes.TIME:
  //       this.#boardPoints = sortByTime(this.#boardPoints);
  //       break;
  //     case this.#sortTypes.PRICE:
  //       this.#boardPoints = sortByPrice(this.#boardPoints);
  //       break;
  //     // default:
  //     //   this.#boardPoints = [...this.#sourcedBoardPoints];
  //   }
  //
  //   this.#currentSortType = sortType;
  // }

  #handleModeChange = () => {
    this.#allPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderListPoint() {
    render(this.#eventListComponent, this.#mainPage);
  }

  #handlePointChange = (updatedPoint) => {
    // this.points = updateItem(this.points, updatedPoint);
    // this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#allPresenters
      .get(updatedPoint.id)
      .init(updatedPoint, this.#pointModel.offers, this.#pointModel.destinations, this.#allTypes);
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
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
    // this.#sortPoints(sortType);
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
