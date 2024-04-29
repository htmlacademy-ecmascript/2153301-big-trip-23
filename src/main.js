import Presenter from './presenter/presenter.js';
import TasksModel from './model/tasks-model.js';

const tasksModel = new TasksModel();
const presenter = new Presenter({ tasksModel });

// const presenter = new Presenter();
presenter.init();
