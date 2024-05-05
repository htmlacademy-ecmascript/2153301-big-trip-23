import MainPresenter from './presenter/main-presenter.js';
import HeaderPresenter from './presenter/header-presenter';
import PointModel from './model/point-model.js';

const pointModel = new PointModel();
pointModel.init();

const main = document.querySelector('.trip-events');

const mainPresenter = new MainPresenter({
  boardMainContainer: main,
  pointModel: pointModel
});

const headerPresenter = new HeaderPresenter();

mainPresenter.init();
headerPresenter.init();
