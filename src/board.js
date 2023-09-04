import knight from './imgs/knight.svg';

class Board {
  _parentElement = document.querySelector('.board');
  _img = document.createElement('img');
  _buttons = document.querySelectorAll('button');
  _message = document.querySelector('.message');
  _curMode = 0; // 0 = start, 1 = end, null = run
  _startPosition = [];
  _endPosition = [];
  _path = [];

  constructor() {
    this._img.src = knight;
    this._img.alt = 'knight';
    this._createBoard();
    this._startBtnClick();
    this._endBtnClick();
  }

  addHandlerClickBoard(handlerStart, handlerEnd) {
    this._parentElement.addEventListener('click', e => {
      if (this._curMode === null) return;
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

  addHandlerClickRun(handler) {
    this._buttons[2].addEventListener('click', () => {
      this._curMode = null;
      if (!this._startPosition.length) {
        this._message.textContent = 'Please select a starting point!';
        return;
      }
      if (!this._endPosition.length) {
        this._message.textContent = 'Please select a ending point!';
        return;
      }
      this._toggleActiveBtn(2);
      handler();
      this._message.textContent = `You made it in ${
        this._path.length - 1
      } moves!`;
      this._animate();
    });
  }

  addHandlerClickClear(handler) {
    this._buttons[3].addEventListener('click', () => {
      this._parentElement.querySelectorAll('.box').forEach(box => {
        box.innerHTML = '';
        box.classList.remove('mark');
      });
      this._startPosition = [];
      this._endPosition = [];
      this._message.textContent = 'Please select a starting point : )';
      this._curMode = 0;
      this._path = '';
      this._toggleActiveBtn(0);
      handler();
    });
  }

  getPaths(path) {
    this._path = path;
  }

  _startBtnClick() {
    this._buttons[0].addEventListener('click', () => {
      this._toggleActiveBtn(0);
      this._curMode = 0;
    });
  }

  _endBtnClick() {
    this._buttons[1].addEventListener('click', () => {
      this._toggleActiveBtn(1);
      this._curMode = 1;
    });
  }

  _toggleActiveBtn(i) {
    this._clearActiveBtn();
    this._buttons[i].classList.add('active');
  }

  _clearActiveBtn() {
    document.querySelector('.active').classList.remove('active');
  }

  _animate(temp = this._path.slice(1), count = 0) {
    if (temp.length === 0) return;
    let pos = JSON.parse(temp.shift());
    let box = document.querySelector(
      `[data-row='${pos[0]}'][data-column='${pos[1]}']`
    );
    box.innerHTML = '';
    box.appendChild(this._img);

    setTimeout(() => {
      box.textContent = ++count;
      this._animate(temp, count);
    }, 1000);
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
