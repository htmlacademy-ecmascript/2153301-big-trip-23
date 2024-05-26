import { render, remove, replace } from '../framework/render.js';
import TripPointView from '../view/trip-point-view.js';
import TripEditView from '../view/trip-edit-view.js';

export default class PointPresenter {
  #pointListContainer = null;
  #pointComponent = null;
  #editComponent = null;

  #point = null;
  #destinations = null;
  #offers = null;

  #handleDataChange = null;

  constructor({ pointListContainer, onDataChange }) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
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

    this.#editComponent = new TripEditView(
      point,
      this.#destinations,
      this.#offers,
      this.#onCloseButtonClick,
      this.#onFormSubmit
    );

    if (prevPointComponent === null || prevEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this.#pointListContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointListContainer.contains(prevEditComponent.element)) {
      replace(this.#editComponent, prevEditComponent);
    }

    remove(prevPointComponent);
    remove(prevEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditFormToPointForm();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #onTripEditClick = () => this.#replacePointFormToEditForm();

  #onFormSubmit = (point) => {
    this.#handleDataChange(point);
    this.#replaceEditFormToPointForm();
  };

  #onCloseButtonClick = () => this.#replaceEditFormToPointForm();

  #replacePointFormToEditForm() {
    replace(this.#editComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceEditFormToPointForm() {
    replace(this.#pointComponent, this.#editComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFavoriteClick() {
    this.#handleDataChange({ ...this.#point, isFavorite: !this.#point.isFavorite });
  }
}
