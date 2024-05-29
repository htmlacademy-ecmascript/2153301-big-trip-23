import { pointsMock } from '../mock/points-mock.js';
import { destinationsMock } from '../mock/destinations-mock.js';
import { offersData } from '../mock/mock-offers.js';
import { SortTypes } from '../const.js';

export default class PointModel {
  #points = [];
  #destinations = [];
  #offers = [];
  #sortTypes = [];

  init() {
    this.#offers = offersData;
    this.#points = pointsMock;
    this.#destinations = destinationsMock;
    this.#sortTypes = SortTypes;
  }

  get offers() {
    return this.#offers;
  }

  set offers(offers) {
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

  get sortTypes() {
    return this.#sortTypes;
  }

  set sortTypes(sortTypes) {
    this.#sortTypes = sortTypes;
  }
}
