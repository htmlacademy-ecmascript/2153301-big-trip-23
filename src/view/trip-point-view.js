import AbstractView from '../framework/view/abstract-view.js';
import {
  humanizeTaskDueDate,
  humanizeTaskDueDateFormat,
  humanizeTaskDueDateTimeFreeClock,
  humanizeTaskDueDateMonthDay,
  renderDifferenceTime,
} from '../utils/task.js';

const createTripPointTemplate = (point, offers) => {
  const { type, isFavorite, dateFrom, dateTo, basePrice, destination } = point;

  const timeFrom = humanizeTaskDueDate(dateFrom);
  const timeTo = humanizeTaskDueDate(dateTo);
  const DateTimeFrom = humanizeTaskDueDateFormat(dateFrom);
  const DateTimeTo = humanizeTaskDueDateFormat(dateTo);
  const timeDateTimeFreeClockFrom = humanizeTaskDueDateTimeFreeClock(dateFrom);
  const dateMonthDayFrom = humanizeTaskDueDateMonthDay(dateFrom);
  const differenceTime = renderDifferenceTime(dateTo, dateFrom);

  const typeOffers = offers.find((offer) => offer.type === type).offers;
  const selectedOffers = typeOffers.filter((typeOffer) => point.offers.includes(typeOffer.id));

  const createOfferItem = (title, price) =>
    `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      <span class="event__offer-price">${price}</span>
    </li>`;

  const createOffersBlock = () =>
    `<h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${selectedOffers ? selectedOffers.map((offer) => createOfferItem(offer.title, offer.price)).join('') : ''}
    </ul>`;

  const createFavoriteData = () => (isFavorite ? 'event__favorite-btn--active' : '');

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${timeDateTimeFreeClockFrom}">${dateMonthDayFrom}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destination}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${DateTimeFrom}">${timeFrom}</time>
                    —
                    <time class="event__end-time" datetime="${DateTimeTo}">${timeTo}</time>
                  </p>
                  <p class="event__duration">${differenceTime}</p>
                </div>
                <p class="event__price">
                  €&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>

                ${createOffersBlock()}

                <button class="event__favorite-btn ${createFavoriteData()}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
};

export default class TripPointView extends AbstractView {
  #point = null;
  #offers = null;
  #handleTripEditClick = null;
  #handleFavoriteClick = null;

  constructor({ point, offers, onTripEditClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#handleTripEditClick = onTripEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createTripPointTemplate(this.#point, this.#offers);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleTripEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
