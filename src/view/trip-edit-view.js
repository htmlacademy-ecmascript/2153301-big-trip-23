import { logPlugin } from '@babel/preset-env/lib/debug';
import { humanizeTaskDueDateForm, capitalizeFirstLetter } from '../utils/task.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

const createTripEditFormTemplate = ({ point, destinations, offers, eventTypes }) => {

  const { type, dateFrom, dateTo, basePrice, id } = point;
  const timeFrom = humanizeTaskDueDateForm(dateFrom);
  const timeTo = humanizeTaskDueDateForm(dateTo);
  const currentCity = destinations.filter((item) => {
    return item.id === id;
  })[0].name;

  const typeOffers = offers.find((offer) => offer.type === type).offers;
  const selectedOffers = typeOffers.filter((typeOffer) => point.offers.includes(typeOffer.id));

  const currentDestination = destinations.find((destinationItem) => destinationItem.id === point.id);
  const currentDestinationPictures = currentDestination.pictures;

  const createOffers = (title, price, id, state) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${id}" type="checkbox" name="event-offer-${type}" ${state}>
      <label class="event__offer-label" for="event-offer-${type}-${id}">
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

  const createDescription = () =>
    `<p class="event__destination-description">
      ${currentDestination.description}
    </p>`;

  const createPhoto = (src, alt) => `<img class="event__photo" src="${src}" alt="${alt}">`;

  const createPhotoContainer = () =>
    `<div class="event__photos-container">
      <div class="event__photos-tape">
      ${currentDestinationPictures.length > 0 ?
      currentDestinationPictures.map((picture) => createPhoto(picture.src, picture.description)) :
      ''}
      </div>
    </div>`;

  const createDescriptionPhotoContainer = () =>
    `<section class="event__section event__section--destination">
      <h3 class="event__section-title event__section-title--destination">
        Destination
      </h3>
      ${currentDestination.description.length > 0 ? createDescription() : ''}
      ${createPhotoContainer()}
      </section>`;

  const createTypeListItem = (type, upperType, isChecked) => {
    return (
      `<div class="event__type-item">
                          <input
                            id="event-type-taxi-${id}"
                            class="event__type-input visually-hidden"
                            type="radio"
                            name="event-type"
                            value="${type}"
                          />
                          <label
                            class="event__type-label event__type-label--${type}"
                            for="event-type-${type}-${id}"
                            >${upperType}</label
                          >
                        </div>`
    );
  };

  const createCityList = (city) => {
    return (
      `<option value="${city}"></option>`
    );

  };

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
                         value="${currentCity}"
                         list="destination-list-${id}">
                    <datalist id="destination-list-${id}">
                      ${destinations.map((item) => createCityList(item.name)).join('')}
                    </datalist>
                  </div>

                  <div class="event__field-group event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${timeFrom}">
                    —
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${timeTo}">
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

${
    typeOffers.length !== 0
      ? `<section class="event__details">
        ${typeOffers ? createOffersContainer() : ''}
        ${createDescriptionPhotoContainer()}
      </section>`
      : ''
  }
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

  constructor({ point, destinations, offers, onCloseButtonClick, onFormSubmit, eventTypes }) {
    super();
    this.#point = point;
    this._setState(point);
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCancel = onCloseButtonClick;
    this.#eventTypes = eventTypes;
    this._restoreHandlers();
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
      .addEventListener('change', this.#onDestinationHandler());
  }

  get template() {
    return createTripEditFormTemplate({
      point: this._state,
      destinations: this.#destinations,
      offers: this.#offers,
      eventTypes: this.#eventTypes
    });
  }

  #onTypeHandler() {

  }

  #onDestinationHandler() {

  }

  #onFormSubmit = (evt) => {
    evt.preventDefault();
    if (!this._state) {
      return;
    }
    this.#handleFormSubmit(this._state);
  };

  #onFormCancel = (evt) => {
    evt.preventDefault();
    this.#handleCancel();
  };
}
