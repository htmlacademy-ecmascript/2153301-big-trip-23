// import { mockTasks } from './mock/task.js';
import Presenter from './presenter/presenter.js';
import { getRandomTask } from './mock/task.js';

const TASK_COUNT = 3;

export default class TasksModel {
  get tasks = Array.from({ length: TASK_COUNT }, getRandomTask);

  get tasks
}

let tasksModel = new TasksModel()


// console.log(mockTasks);
const presenter = new Presenter();
presenter.init();
