import { humanizeTaskDueDateForm, capitalizeFirstLetter } from '../utils/task.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import he from 'he';

import 'flatpickr/dist/flatpickr.min.css';

const createTripEditFormTemplate = ({ point, destinations, offers, eventTypes }) => {

  const { type, dateFrom, dateTo, basePrice, id, destination } = point;
  const timeFrom = humanizeTaskDueDateForm(dateFrom);
  const timeTo = humanizeTaskDueDateForm(dateTo);
  const currentCity = destinations.filter((item) => item.id === destination)[0].name;

  const typeOffers = offers.find((offer) => offer.type === type).offers;
  const selectedOffers = typeOffers.filter((typeOffer) => point.offers.includes(typeOffer.id));
  const currentDestination = destinations.find((destinationItem) => destinationItem.id === point.destination);
  const currentDestinationPictures = currentDestination.pictures;

  const createOffers = (title, price, idOffer, state) => `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${idOffer}" type="checkbox" name="event-offer-${type}" ${state}>
      <label class="event__offer-label" for="event-offer-${type}-${idOffer}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`;

  const createOffersContainer = () => `<section class="event__section event__section--offers">
    <h3 class="event__section-title event__section-title--offers">
      Offers
    </h3>

    <div class="event__available-offers">
      ${typeOffers.map((offer) => (
    selectedOffers.find((selectOffer) => offer.id === selectOffer.id) ?
      createOffers(offer.title, offer.price, offer.id, 'checked') :
      createOffers(offer.title, offer.price, offer.id, '')
  )).join('')}
    </div>
                  </section>`;

  const createPhoto = (src, alt) => `<img class="event__photo" src="${src}" alt="${alt}">`;

  const createPhotoContainer = () => `<div class="event__photos-container">
      <div class="event__photos-tape">
      ${currentDestinationPictures.length > 0 ?
    currentDestinationPictures.map((picture) => createPhoto(picture.src, picture.description)) :
    ''}
      </div>
    </div>`;

  const createDescription = () => `<p class="event__destination-description">
      ${currentDestination.description}
    </p>`;

  const createDescriptionPhotoContainer = () => `<section class="event__section event__section--destination">
      <h3 class="event__section-title event__section-title--destination">
        Destination
      </h3>
      ${currentDestination.description.length > 0 ? createDescription() : ''}
      ${createPhotoContainer()}
      </section>`;

  const createTypeListItem = (LowerType, upperType) => (
    `<div class="event__type-item">
                          <input
                            id="event-type-${LowerType}-${id}"
                            class="event__type-input visually-hidden"
                            type="radio"
                            name="event-type"
                            value="${LowerType}"
                          />
                          <label
                            class="event__type-label event__type-label--${LowerType}"
                            for="event-type-${LowerType}-${id}"
                            >${upperType}</label
                          >
                        </div>`
  );

  const createCityList = (city) => (
    `<option value="${city}"></option>`
  );

  return `<li class="trip-events__item">

      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox">
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${eventTypes.map((item) => item === type ?
    createTypeListItem(item, capitalizeFirstLetter(item), 'checked') :
    createTypeListItem(item, capitalizeFirstLetter(item), '')).join('')}
              </fieldset>
            </div>
          </div>
                  <div class="event__field-group event__field-group--destination">
                    <label class="event__label event__type-output" for="event-destination-${id}">
                      ${type}
                    </label>
                    <input
                     class="event__input event__input--destination"
                      id="event-destination-${id}"
                       type="text"
                        name="event-destination"
                         value="${he.encode(currentCity)}"
                         list="destination-list-${id}">
                    <datalist id="destination-list-${id}">
                      ${destinations.map((item) => createCityList(item.name)).join('')}
                    </datalist>
                  </div>

                  <div class="event__field-group event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-${id}">From</label>
                    <input class="event__input event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${timeFrom}" >
                       —
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${timeTo}">
                  </div>

                  <div class="event__field-group event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      €
                    </label>
                    <input class="event__input event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn btn btn--blue" type="submit">
                    Save
                  </button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>

      ${typeOffers.length !== 0 || currentDestination.description.length > 0 || currentDestinationPictures.length > 0 ?
    `<section class="event__details">
          ${typeOffers.length !== 0 ? createOffersContainer() : ''}
          ${currentDestination.description.length > 0 || currentDestinationPictures.length > 0 ?
    createDescriptionPhotoContainer() :
    ''}
        </section>` : ''}
      </section>
     </form>
    </li>`;
};

export default class TripEditView extends AbstractStatefulView {
  #point = null;
  #destinations = [];
  #offers = [];
  #eventTypes = [];
  #handleFormSubmit = null;
  #handleCancel = null;
  #dateFromPicker = null;
  #dateToPicker = null;
  #handleDeleteClick = null;

  constructor({ point, destinations, offers, onCloseButtonClick, onFormSubmit, eventTypes, onDeleteClick }) {
    super();
    this.#point = point;
    this._setState(TripEditView.parsePointToState(point));
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCancel = onCloseButtonClick;
    this.#eventTypes = eventTypes;
    this._restoreHandlers();
    this.#handleDeleteClick = onDeleteClick;
  }

  _restoreHandlers() {
    this.element.addEventListener('submit', this.#onFormSubmit);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#onFormCancel);
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#onFormCancel);
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#onTypeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#onDestinationHandler);
    this.element.addEventListener('change', this.#onOffersChange);
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteClickHandler);
    this.#setDateFromPicker();
    this.#setDateToPicker();
  }

  get template() {
    return createTripEditFormTemplate({
      point: this._state, destinations: this.#destinations, offers: this.#offers, eventTypes: this.#eventTypes
    });
  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(TripEditView.parseStateToPoint(this._state));
  };

  static parsePointToState(point) {
    return {...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }

  #onOffersChange = (evt) => {
    evt.preventDefault();
    const currentOffer = parseInt(evt.target.id.replace(/\D/g, ''), 10);

    const setOffers = (state) => {
      if (state.includes(currentOffer)) {
        return state.filter((elem) => elem !== currentOffer);
      } else {
        state.push(currentOffer);
        return state;
      }
    };
    this._setState({
      offers: setOffers(this._state.offers),
    });
  };

  #onTypeHandler = (evt) => {
    evt.preventDefault();
    const newType = evt.target.value;
    this.updateElement({
      type: newType,
      offers: [],
    });
  };

  #onDestinationHandler = (evt) => {
    evt.preventDefault();
    const checkedDestination = this.#destinations.find((elem) => elem.name === evt.target.value);
    if (!checkedDestination) {
      return;
    }
    if (checkedDestination) {
      this.updateElement({
        destination: checkedDestination.id,
        id: checkedDestination.id,
      });
    }
  };

  #onFormSubmit = (evt) => {
    evt.preventDefault();
    if (!this._state) {
      return;
    }
    this.#handleFormSubmit(TripEditView.parseStateToPoint(this._state));
  };

  #onFormCancel = (evt) => {
    evt.preventDefault();
    this.#handleCancel();
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDateFromPicker() {
    this.#dateFromPicker = flatpickr(
      this.element.querySelector('[name="event-start-time"]'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        'time_24hr': true,
        maxDate: this._state.dateTo,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
      }
    );
  }

  #setDateToPicker() {
    this.#dateToPicker = flatpickr(
      this.element.querySelector('[name="event-end-time"]'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        'time_24hr': true,
        minDate: this._state.dateFrom,
        defaulDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
      },
    );
  }

  reset(point) {
    this.updateElement(
      TripEditView.parsePointToState(point),
    );
  }

  removeElement() {
    super.removeElement();

    if (this.#dateToPicker) {
      this.#dateToPicker.destroy();
      this.#dateToPicker = null;
    }

    if (this.#dateFromPicker) {
      this.#dateFromPicker.destroy();
      this.#dateFromPicker = null;
    }
  }
}


