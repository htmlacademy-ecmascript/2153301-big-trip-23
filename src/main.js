import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter';
import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import TripNewView from './view/trip-new-view';

const main = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');
// const newPointButtonComponent = new TripNewView({
//   onClick: handleNewPointButtonClick
// });
const filterModel = new FilterModel();
const pointModel = new PointModel();
pointModel.init();

const mainPresenter = new MainPresenter({
  boardMainContainer: main,
  pointModel,
  filterModel,
});

const filterPresenter = new FilterPresenter({
  filterContainer,
  filterModel,
  pointModel,
});

mainPresenter.init();
filterPresenter.init();
