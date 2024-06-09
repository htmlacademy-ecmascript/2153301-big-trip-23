import MainPresenter from './presenter/main-presenter.js';
import HeaderPresenter from './presenter/header-presenter';
import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';

const main = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');
const filterModel = new FilterModel();

const pointModel = new PointModel();
pointModel.init();

const mainPresenter = new MainPresenter({
  boardMainContainer: main,
  pointModel,
});

const headerPresenter = new HeaderPresenter({ filterContainer, filterModel, pointModel });

mainPresenter.init();
headerPresenter.init();
