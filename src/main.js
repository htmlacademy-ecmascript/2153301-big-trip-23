import MainPresenter from './presenter/main-presenter.js';
import HeaderPresenter from './presenter/header-presenter';
import TasksModel from './model/tasks-model.js';

const main = document.querySelector('.trip-events');
const tasksModel = new TasksModel();

const mainPresenter = new MainPresenter({
  boardMainContainer: main,
  tasksModel
});

const headerPresenter = new HeaderPresenter();

mainPresenter.init();
headerPresenter.init();
