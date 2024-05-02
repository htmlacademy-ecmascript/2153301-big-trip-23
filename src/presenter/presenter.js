import { render } from '../render.js';
import Filter from '../view/trip-filters.js';
import TripSort from '../view/trip-sort.js';
import TripPointsList from '../view/trip-points-list.js';
import NewPoint from '../view/new-point.js';
import EditPoint from '../view/edit-point.js';
import Point from '../view/point.js';
import { getRandomTask } from '../mock/task.js';

export default class Presenter {
  constructor({ boardFilterContainer, boardMainContainer, tasksModel }) {
    this.tripControlsFiltersElement = boardFilterContainer;
    this.mainPage = boardMainContainer;

    this.tasksModel = tasksModel;
  }

  init() {
    this.boardTasks = [...this.tasksModel.tasks];

    render(new Filter(), this.tripControlsFiltersElement);
    render(new TripSort(), this.mainPage);
    render(new TripPointsList(), this.mainPage);
    const tripList = this.mainPage.querySelector('.trip-events__list');
    render(new EditPoint(getRandomTask()), tripList);
    for (let i = 0; i < this.boardTasks.length; i++) {
      render(new Point({task: this.boardTasks[i]}), tripList)
    }

    render(new NewPoint(), tripList);
  }

}
