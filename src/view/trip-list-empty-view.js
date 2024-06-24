import { emptyMessageTextType } from '../const';
import AbstractView from '../framework/view/abstract-view';

const createTripListEmptyTemplate = (filterType) => {
  const currentPageMessageTextTipe = emptyMessageTextType[filterType];

  return (
    `<p class="trip-events__msg">
      ${currentPageMessageTextTipe}
    </p>`
  );
};
export default class TripListEmptyView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createTripListEmptyTemplate(this.#filterType);
  }
}
