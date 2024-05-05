import { points } from '../mock/points.js';
import { destinations } from '../mock/destinations.js';

export default class PointModel {
  constructor() {
    this.points = [];
    this.destinations = [];
  }

  init() {
    this.points = points;
    this.destinations = destinations;
  }

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }
}


