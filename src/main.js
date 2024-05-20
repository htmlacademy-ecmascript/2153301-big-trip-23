import MainPresenter from './presenter/main-presenter.js';
import HeaderPresenter from './presenter/header-presenter';
import PointModel from './model/point-model.js';
import { generateFilter } from './mock/mock-filter.js';

const pointModel = new PointModel();
pointModel.init();

const main = document.querySelector('.trip-events');

const mainPresenter = new MainPresenter({
  boardMainContainer: main,
  pointModel
});

const filters = generateFilter(pointModel.points);

const headerPresenter = new HeaderPresenter();

mainPresenter.init();
headerPresenter.init();
