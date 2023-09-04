import './style.css';
import board from './board.js';
import { state, moveKnights } from './moveKnights.js';

const controlStart = function (position) {
  state.start = position;
};

const controlEnd = function (position) {
  state.end = position;
};

const controlRun = function () {
  board.getPaths(moveKnights());
};

const controlClear = function () {
  state.start = [];
  state.end = [];
};

const init = function () {
  board.addHandlerClickBoard(controlStart, controlEnd);
  board.addHandlerClickRun(controlRun);
  board.addHandlerClickClear(controlClear);
};
init();
