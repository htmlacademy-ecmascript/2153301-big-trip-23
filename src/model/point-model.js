import Observable from '../framework/observable';
import { mockPoint } from '../mock/mock-point.js';
import { mockDestinations } from '../mock/mock-destinations.js';
import { offersData } from '../mock/mock-offers.js';
import { SortTypes, defaultEventPoint } from '../const.js';

export default class PointModel extends Observable {
  #points = [];
  #destinations = [];
  #offers = [];
  #sortTypes = [];

  constructor() {
    super();
  }

  init() {
    this.#offers = offersData;
    this.#points = mockPoint;
    this.#destinations = mockDestinations;
    this.#sortTypes = SortTypes;
  }

  get points() {
    return this.#points;
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  get offers() {
    return this.#offers;
  }

  set offers(offers) {
    this.#offers = offers;
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
