import AbstractView from '../framework/view/abstract-view';

const createFailedLoadPointsTemplate = () =>
  `<p class="trip-events__msg">
    Failed to load latest route information
  </p>`;


export default class TripFailedLoadingView extends AbstractView {

  get template() {
    return createFailedLoadPointsTemplate();
  }
}
