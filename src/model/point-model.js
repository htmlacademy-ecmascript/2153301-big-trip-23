import { points } from '../mock/points.js';
import { destinations } from '../mock/destinations.js';
import { offersData } from '../mock/mock-offers.js';

export default class PointModel {
  #points = [];
  #destinations = [];
  #offers = [];

  init() {
    this.#offers = offersData;
    this.#points = points;
    this.#destinations = destinations;
  }

  get offers() {
    return this.#offers;
  }

  set offers (offers) {
    this.#offers = offers;
  }

  get points() {
    return this.#points;
  }

  set points(points) {
    this.#points = points;
  }

  get destinations() {
    return this.#destinations;
  }

  set destinations(destinations) {
    this.#destinations = destinations;
  }
}


