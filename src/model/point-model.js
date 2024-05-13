import { points } from '../mock/points.js';
import { destinations } from '../mock/destinations.js';

export default class PointModel {
  #points = [];
  #destinations = [];

  init() {
    this.#points = points;
    this.#destinations = destinations;
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }
}


