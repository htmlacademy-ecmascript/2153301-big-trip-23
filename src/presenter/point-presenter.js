import { render, remove, replace } from '../framework/render.js';
import TripPointView from '../view/trip-point-view.js';
import TripEditView from '../view/trip-edit-view.js';
import { Mode } from '../const.js';

export default class PointPresenter {
  #pointListContainer = null;
  #pointComponent = null;
  #editComponent = null;

  #point = null;
  #destinations = null;
  #offers = null;

  #handleDataChange = null;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({ pointListContainer, onDataChange, onModeChange }) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point, offers, destinations) {
    const prevPointComponent = this.#pointComponent;
    const prevEditComponent = this.#editComponent;

    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    this.#pointComponent = new TripPointView({
      point: this.#point,
      offers: this.#offers,
      onTripEditClick: this.#onTripEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#editComponent = new TripEditView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onCloseButtonClick: this.#onCloseButtonClick,
      onFormSubmit: this.#onFormSubmit
    });

    if (prevPointComponent === null || prevEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDIT) {
      replace(this.#editComponent, prevEditComponent);
    }

    remove(prevPointComponent);
    remove(prevEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditToPoint();
    }
  }

  #replacePointToEdit() {
    replace(this.#editComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDIT;
  }

  #replaceEditToPoint() {
    replace(this.#pointComponent, this.#editComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #onTripEditClick = () => this.#replacePointToEdit();

  #onFormSubmit = (point) => {
    this.#handleDataChange(point);
    this.#replaceEditToPoint();
  };

  #onCloseButtonClick = () => this.#replaceEditToPoint();

  #handleFavoriteClick = () => {
    this.#handleDataChange({ ...this.#point, isFavorite: !this.#point.isFavorite });
  };
}
