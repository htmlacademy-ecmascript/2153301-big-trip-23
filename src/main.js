import { points } from './mock/points';
import MainPresenter from './presenter/main-presenter.js';
import HeaderPresenter from './presenter/header-presenter';
import TasksModel from './model/tasks-model.js';
import PointModel from './model/point-model.js';

const pointModel = new PointModel();
pointModel.init();
console.log(pointModel);

const main = document.querySelector('.trip-events');
const tasksModel = new TasksModel();

const mainPresenter = new MainPresenter({
  boardMainContainer: main,
  // tasksModel: tasksModel
  // tasksModel: points
  tasksModel: pointModel
});

const headerPresenter = new HeaderPresenter();

mainPresenter.init();
headerPresenter.init();
