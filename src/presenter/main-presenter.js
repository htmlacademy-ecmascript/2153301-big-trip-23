import { render, replace, RenderPosition } from '../framework/render.js';
import TripSort from '../view/trip-sort.js';
import TripPointsList from '../view/trip-points-list.js';
import ListEmpty from '../view/list-empty.js';
// import PointPresenter from './point-presenter.js';
import TripPointView from '../view/trip-point-view';
import TripEditView from '../view/trip-edit-view';

export default class MainPresenter {
  #eventListComponent = null;
  #mainPage = null;
  #pointModel = null;
  #boardPoints = [];
  #sortComponent = new TripSort();
  #listEmpty = new ListEmpty();

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
    // const pointPresenter = new PointPresenter({ pointListContainer: this.#mainPage });
    // pointPresenter.init(point)
    const offers = this.#pointModel.offers;
    const destinations = this.#pointModel.destinations;

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditFormToPointForm();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const onTripEditClick = () => replacePointFormToEditForm();
    const onFormSubmit = () => replaceEditFormToPointForm();
    const onCloseButtonClick = () => replaceEditFormToPointForm();

    const pointComponent = new TripPointView(point, offers, onTripEditClick);
    const editComponent = new TripEditView(point, destinations, offers, onCloseButtonClick, onFormSubmit);

    function replacePointFormToEditForm() {
      replace(editComponent, pointComponent);
      document.addEventListener('keydown', escKeyDownHandler);
    }

    function replaceEditFormToPointForm() {
      replace(pointComponent, editComponent);
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    render(pointComponent, this.#eventListComponent.element);
  }

  #renderListEmpty() {
    render(this.#listEmpty, this.#mainPage.element, RenderPosition.AFTERBEGIN);
  }

  #renderSort() {
    render(this.#sortComponent, this.#mainPage, RenderPosition.AFTERBEGIN);
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
