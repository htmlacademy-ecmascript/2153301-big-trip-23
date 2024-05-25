import MainPresenter from './presenter/main-presenter.js';
import HeaderPresenter from './presenter/header-presenter';
import PointModel from './model/point-model.js';
import { generateFilter } from './mock/mock-filter.js';

const main = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');

const pointModel = new PointModel();
pointModel.init();

const filters = generateFilter(pointModel.points);

const mainPresenter = new MainPresenter({
  boardMainContainer: main,
  pointModel
});

const headerPresenter = new HeaderPresenter({ filterContainer, filters });

mainPresenter.init();
headerPresenter.init();


