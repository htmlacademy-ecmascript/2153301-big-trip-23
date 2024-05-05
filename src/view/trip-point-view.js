import { createElement } from '../render.js';
import {
  humanizeTaskDueDate,
  humanizeTaskDueDateFormat,
  humanizeTaskDueDateTimeFreeClock,
  humanizeTaskDueDateMonthDay,
  renderDifferenceTime
} from '../utils.js';

const createTripPointTemplate = (point, destinations) => {
  const { type, isFavorite, id, dateFrom, dateTo, basePrice} = point;

  const currentDestination = destinations.find((destination) => destination.id === point.destination);

  const timeFrom = humanizeTaskDueDate(dateFrom);
  const timeTo = humanizeTaskDueDate(dateTo);

  const DateTimeFrom = humanizeTaskDueDateFormat(dateFrom);
  const DateTimeTo = humanizeTaskDueDateFormat(dateTo);

  const timeDateTimeFreeClockFrom = humanizeTaskDueDateTimeFreeClock(dateFrom);
  const dateMonthDayFrom = humanizeTaskDueDateMonthDay(dateFrom);

  const differenceTime = renderDifferenceTime(dateTo, dateFrom);

  return (
    `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${timeDateTimeFreeClockFrom}">${dateMonthDayFrom}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${id}</h3>
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
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  <li class="event__offer">
                    <span class="event__offer-title">Order Uber</span>
                    +€&nbsp;
                    <span class="event__offer-price">20</span>
                  </li>
                </ul>
                <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`
  );
};

export default class TripPointView {
  constructor(point, destinations) {
    this.point = point;
    this.destinations = destinations;
  }

  get template() {
    return createTripPointTemplate(this.point, this.destinations);
  }

  get element() {
    if (!this.ownElement) {
      this.ownElement = createElement(this.template);
    }

    return this.ownElement;
  }

  removeElement() {
    this.ownElement = null;
  }
}
