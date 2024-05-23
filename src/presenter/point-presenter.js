import { render, replace } from '../framework/render.js';
import TripPointView from '../view/trip-point-view.js';
import TripEditView from '../view/trip-edit-view.js';

export default class PointPresenter {
  #pointListContainer = null;
  #destinations = null;
  #offers = null;
  #pointComponent = null;
  #editComponent = null;

  constructor({pointListContainer}) {
    this.#pointListContainer = pointListContainer;
  }

  init(point) {
    this.#offers = point.offers;
    this.#destinations = point.destinations;

    this.#pointComponent = new TripPointView(point, this.#offers, this.#onTripEditClick);
    this.#editComponent = new TripEditView(
      point,
      this.#destinations,
      this.#offers,
      this.#onCloseButtonClick,
      this.#onFormSubmit
    );
    render(this.#pointComponent, this.#pointListContainer);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditFormToPointForm();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #onTripEditClick = () => this.#replacePointFormToEditForm();
  #onFormSubmit = () => this.#replaceEditFormToPointForm();
  #onCloseButtonClick = () => this.#replaceEditFormToPointForm();

  #replacePointFormToEditForm() {
    replace(this.#editComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceEditFormToPointForm() {
    replace(this.#pointComponent, this.#editComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }
}
