import { destinations } from '../mock/destinations';
import { render, RenderPosition } from '../render.js';
import TripPointView from '../view/trip-point-view';
import TripSort from '../view/trip-sort.js';
import TripPointsList from '../view/trip-points-list.js';
import TripEditView from '../view/trip-edit-view';
import NewPoint from '../view/new-point.js';

export default class MainPresenter {

  constructor({ boardMainContainer, pointModel }) {
    this.eventListComponent = new TripPointsList();
    this.mainPage = boardMainContainer;
    this.pointModel = pointModel;
  }

  init() {
    this.points = this.pointModel.getPoints();
    this.destinations = this.pointModel.getDestinations();

    render(new TripSort(), this.mainPage, RenderPosition.AFTERBEGIN);
    render(this.eventListComponent, this.mainPage);
    render(new TripEditView(this.points[0], this.destinations), this.eventListComponent.element);
    this.points.forEach((point) => {
      render(new TripPointView(point, this.destinations), this.eventListComponent.element);
    });

    render(new NewPoint(), this.eventListComponent.element);
  }
}
