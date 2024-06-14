import Observable from '../framework/observable';
// import { mockPoint } from '../mock/mock-point.js';
import { mockDestinations } from '../mock/mock-destinations.js';
import { offersData } from '../mock/mock-offers.js';
import { SortTypes, defaultEventPoint, UpdateType } from '../const.js';

export default class PointModel extends Observable {
  #points = [];
  #destinations = [];
  #offers = [];
  // #sortTypes = [];
  #defaultPoint = [];
  #pointsApiService = null;

  constructor({ pointsApiService }) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);

      this.#offers = await this.#pointsApiService.offers;

      this.#destinations = await this.#pointsApiService.destinations;

    } catch(err) {
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];
      this._notify(UpdateType.ERROR);
      return;
    }
    this._notify(UpdateType.INIT);
    this.#defaultPoint = defaultEventPoint;
  }

  get points() {
    return this.#points;
  }

  get defaultPoint() {
    return this.#defaultPoint;
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

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
