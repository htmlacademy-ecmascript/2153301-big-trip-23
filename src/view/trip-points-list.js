import { createElement } from '../render.js';

const createTripPointsList = () => `
  <ul class="trip-events__list"><ul>
`;

export default class TripPointsList {
  get template() {
    return createTripPointsList();
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
