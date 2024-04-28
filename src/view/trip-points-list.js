import { createElement } from '../render.js';

let createTripPointsList = () => `
  <ul class="trip-events__list"><ul>
`;

export default class TripPointsList {
  get template() {
    return createTripPointsList();
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
