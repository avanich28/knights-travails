import knight from './imgs/knight.svg';

class Board {
  _parentElement = document.querySelector('.board');
  _img = document.createElement('img');
  _buttons = document.querySelectorAll('button');
  _curMode = 0; // 0 = start, 1 = end
  _startPosition = [0, 0];
  _endPosition = [0, 0];

  constructor() {
    this._img.src = knight;
    this._img.alt = 'knight';
    this._createBoard();
    this._startBtnClick();
    this._endBtnClick();
  }

  addHandlerClickBoard(handlerStart, handlerEnd) {
    this._parentElement.addEventListener('click', e => {
      const box = e.target.closest('.box');
      if (!box) return;
      if (this._curMode === 0) {
        // 1) Start position (knight image)
        // If the given child is a reference to an existing node in the document, appendChild() moves it from its current position to the new position.
        box.appendChild(this._img);
        this._startPosition[0] = +box.dataset.row;
        this._startPosition[1] = +box.dataset.column;
        handlerStart(this._startPosition);
      } else {
        // 2) Ending position (red box)
        let temp = this._parentElement.querySelector('.mark');
        if (temp) temp.classList.remove('mark');
        box.classList.add('mark');
        this._endPosition[0] = +box.dataset.row;
        this._endPosition[1] = +box.dataset.column;
        handlerEnd(this._endPosition);
      }
    });
  }

  addHandlerClickRun(handler) {}

  addHandlerClickClear(handler) {
    this._buttons[3].addEventListener('click', () => {
      this._parentElement.querySelectorAll('.box').forEach(box => {
        box.innerHTML = '';
        box.classList.remove('mark');
        this._startPosition = [0, 0];
        this._endPosition = [0, 0];
        handler();
      });
    });
  }

  _startBtnClick() {
    this._buttons[0].addEventListener('click', () => {
      this._curMode = 0;
    });
  }

  _endBtnClick() {
    this._buttons[1].addEventListener('click', () => {
      this._curMode = 1;
    });
  }

  _createBoard() {
    for (let i = 0; i < 8; i++) {
      const div = document.createElement('div');
      div.classList.add('container');
      for (let j = 0; j < 8; j++) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.dataset.row = i;
        box.dataset.column = j;
        if ((i % 2 === 0 && j % 2 === 0) || (i % 2 !== 0 && j % 2 !== 0))
          box.classList.add('light');
        else box.classList.add('dark');
        div.appendChild(box);
      }
      this._parentElement.appendChild(div);
    }
  }
}

export default new Board();
