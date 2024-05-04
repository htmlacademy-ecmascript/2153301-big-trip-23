import { render, RenderPosition } from '../render.js';
import TripPointView from '../view/trip-point-view';
import TripSort from '../view/trip-sort.js';
import TripPointsList from '../view/trip-points-list.js';
import NewPoint from '../view/new-point.js';
import EditPoint from '../view/edit-point.js';
// import Point from '../view/point.js';
import { getRandomTask } from '../mock/task.js';

export default class MainPresenter {

  constructor({ boardMainContainer, tasksModel }) {
    this.eventListComponent = new TripPointsList();
    this.mainPage = boardMainContainer;
    this.tasksModel = tasksModel;
  }

  init() {
    this.boardTasks = [...this.tasksModel.tasks];

    render(new TripSort(), this.mainPage, RenderPosition.AFTERBEGIN);
    render(this.eventListComponent, this.mainPage);

    render(new EditPoint(getRandomTask()), this.eventListComponent.element);
    for (let i = 0; i < this.boardTasks.length; i++) {
      render(new TripPointView(i), this.eventListComponent.element);
    }
    render(new NewPoint(), this.eventListComponent.element);


  }

}
