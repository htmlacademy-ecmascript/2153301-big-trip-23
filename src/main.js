import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter';
import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import TripNewView from './view/trip-new-view';

const main = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');

const filterModel = new FilterModel();
const pointModel = new PointModel();

const mainPresenter = new MainPresenter({
  boardMainContainer: main,
  pointModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});

const newPointButtonComponent = new TripNewView({
  onClick: handleNewPointButtonClick
});

function handleNewPointButtonClick() {
  mainPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

const filterPresenter = new FilterPresenter({
  filterContainer,
  filterModel,
  pointModel,
});

pointModel.init();
mainPresenter.init();
filterPresenter.init();
