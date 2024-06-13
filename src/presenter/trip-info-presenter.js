import TripInfoView from '../view/trip-info-view';
import { render, remove, RenderPosition } from '../framework/render';

export default class TripInfoPresenter {
  #pointModel = null;
  #tripInfoContainer = null;
  #tripInfoComponent = null;

  constructor({pointModel, tripInfoContainer}) {
    this.#pointModel = pointModel;
    this.#tripInfoContainer = tripInfoContainer;
  }

  init() {
    if(this.#pointModel.points.length === 0) {
      remove(this.#tripInfoComponent);
      this.#tripInfoComponent = null;
      return;
    }
    remove(this.#tripInfoComponent);
    this.#tripInfoComponent = null;
    this.#tripInfoComponent = new TripInfoView({
      pointModel: this.#pointModel,
    });
    render(this.#tripInfoComponent,this.#tripInfoContainer.closest('.trip-main'), RenderPosition.AFTERBEGIN);
  }
}
