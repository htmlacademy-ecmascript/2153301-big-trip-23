import { render, replace, RenderPosition } from '../framework/render.js';
import TripPointView from '../view/trip-point-view.js';
import TripSort from '../view/trip-sort.js';
import TripPointsList from '../view/trip-points-list.js';
import TripEditView from '../view/trip-edit-view.js';
import ListEmpty from '../view/list-empty.js';

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

  #renderPoint(point) {
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

  #renderPoints() {

  }

  #renderListEmpty() {
    render(this.#listEmpty, this.#mainPage.element, RenderPosition.AFTERBEGIN)
  }

  #renderSort() {
    render(this.#sortComponent, this.#mainPage, RenderPosition.AFTERBEGIN);
  }

  #renderBoard() {
    render(this.#eventListComponent, this.#mainPage);

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
