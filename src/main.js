import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import TripNewView from './view/trip-new-view.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic er143jdzfrw';
const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';

const main = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');

const filterModel = new FilterModel();
const pointModel = new PointModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});

console.log(pointModel);

const newPointButtonComponent = new TripNewView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

const mainPresenter = new MainPresenter({
  boardMainContainer: main,
  pointModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
  newPointButtonComponent: newPointButtonComponent,
});

function handleNewPointButtonClick() {
  mainPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

const filterPresenter = new FilterPresenter({
  filterContainer,
  filterModel,
  pointModel,
});

pointModel.init();
mainPresenter.init();
filterPresenter.init();
