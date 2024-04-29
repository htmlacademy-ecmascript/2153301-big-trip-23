import { mockTasks } from './mock/task';
import Presenter from './presenter/presenter.js';

console.log(mockTasks);
const presenter = new Presenter();
presenter.init();
