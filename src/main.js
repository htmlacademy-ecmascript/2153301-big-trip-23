import MainPresenter from './presenter/main-presenter.js';
import HeaderPresenter from './presenter/header-presenter';
import PointModel from './model/point-model.js';
import { generateFilter } from './mock/mock-filter.js';

const main = document.querySelector('.trip-events');

const pointModel = new PointModel();
pointModel.init();

const mainPresenter = new MainPresenter({
  boardMainContainer: main,
  pointModel
});

// const filtersBox = document.querySelector('.trip-controls__filters');
const filters = generateFilter(pointModel.points);

const headerPresenter = new HeaderPresenter({  filters });

mainPresenter.init();
headerPresenter.init();
