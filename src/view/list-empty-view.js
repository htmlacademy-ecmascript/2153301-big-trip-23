import AbstractView from '../framework/view/abstract-view.js';
import { emptyMessageTextType } from '../const.js';

const createListEmpty = (filterType) => {
  const currentMessage = emptyMessageTextType[filterType];

  return (
    `<p class="trip-events__msg">
        ${currentMessage}
    </p>`
  );
};

export default class ListEmptyView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createListEmpty(this.#filterType);
  }
}

