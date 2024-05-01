import Presenter from './presenter/presenter.js';
import TasksModel from './model/tasks-model.js';

const filter = document.querySelector('.trip-controls__filters');
const main = document.querySelector('.trip-events');

const tasksModel = new TasksModel();
const presenter = new Presenter({boardFilterContainer: filter, boardMainContainer: main, tasksModel });

presenter.init();

console.log(presenter);
