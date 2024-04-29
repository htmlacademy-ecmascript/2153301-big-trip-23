import { getRandomTask } from '../mock/task.js';

const TASK_COUNT = 3;

export default class TasksModel {
  tasksTemplate = Array.from({length: TASK_COUNT}, getRandomTask);

  get tasks() {
    return this.tasksTemplate;
  }
}
