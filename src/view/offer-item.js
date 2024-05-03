import { createElement } from '../render.js';

const createOfferItem = (task) => {
  const { id, title, price } = task;


  return (
    `<div class="event__offer-selector">
                        <input
                          class="event__offer-checkbox visually-hidden"
                          id="event-offer-luggage-1"
                          type="checkbox"
                          name="event-offer-luggage"
                          checked
                        />
                        <label
                          class="event__offer-label"
                          for="event-offer-luggage-1"
                        >
                          <span class="event__offer-title">"${title}"</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">"${price}"</span>
                        </label>
                      </div>`
  );
};

export default class OfferItem {
  constructor({ task }) {
    this.task = task;
  }

  get template() {
    return createOfferItem(this.task);
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
