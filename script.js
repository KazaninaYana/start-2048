'use strict';

const colorCell = [
    '#afa192',
    '#eee4da',
    '#ede0c8',
    '#f2b179',
    '#ffcea4',
    '#e8c064',
    '#ffab6e',
    '#fd9982',
    '#ead79c',
    '#76daff',
    '#beeaa5',
    '#d7d4f0',
];
const gridDisplay = document.querySelector('.grid-container');
const scoreDisplay = document.querySelector('.score');
const resultDisplay = document.querySelector('.result');
const widthBoard = 4;

let squares = [];
let score = 0;

/* Подготовка поля для игры */

// Добавление цвета ячейкам с цифрами
function addColours() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colorCell[Math.trunc(Math.sqrt(squares[i].innerHTML))];
    }
}

// заполнение поля 16 ячейками
function createBoard() {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < widthBoard * widthBoard; i++) {
        const square = document.createElement('div');
        square.innerHTML = '';
        square.className = 'grid-cell ';

        fragment.appendChild(square);
        squares.push(square);
    }

    gridDisplay.appendChild(fragment);

    generateNewCell()
    generateNewCell()
    // создать 2 ячейки для начального состояния игры
}

/* Основная логика */

// Заполнение пустой ячейки новым значением
function generateNewCell() {
    const randomNumber = Math.floor(Math.random() * squares.length);

    if (squares[randomNumber].innerHTML === '') {
        squares[randomNumber].innerHTML = 2;
        addColours();
        // проверить на GameOver
    } else {
        generateNewCell();
    }
}

// добавление на поле новой ячейки с задержкой 0,2 сек, чтобы было видно, куда добавляется ячейка после перемещения
function generaleNewElement() {
    setTimeout(() => {
        generateNewCell();
    }, 200);
}

// объединение значений в строках
function fillRow(rowIndex, isLeft) {
    const row = [];

    for (let i = 0; i < widthBoard; i++) {
        row.push(squares[rowIndex + i].innerHTML);
    }

    let filteredRow = row.filter(num => num);
    let emptyCellInRowSize = widthBoard - filteredRow.length;

    let newRow = makeNewSequence(filteredRow, emptyCellInRowSize, isLeft);

    newRow.forEach((value, i) => {
        squares[rowIndex + i].innerHTML = value;
    });
}

// объединение значений в столбцах
function fillColumn(indexColumn, isUp) {
    const column = [];

    for (let i = 0; i < widthBoard; i++) {
        column.push(squares[indexColumn + widthBoard * i ].innerHTML);
    }

    let filteredColumn = column.filter(num => num);
    let emptyCellInColumnSize = widthBoard - filteredColumn.length;

    let newColumn = makeNewSequence(filteredColumn, emptyCellInColumnSize, isUp);

    newColumn.forEach((value, i) => {
        squares[indexColumn + (widthBoard * i)].innerHTML = value;
    });
}

// После сложения, добавляем пустые значения, чтобы получить 4 элемента в строке или столбце (после сложения их становится меньше)
function makeNewSequence(numbers, emptySequensSize, isReverse) {
    let emptySequence = Array(emptySequensSize).fill('');

    return isReverse ? numbers.concat(emptySequence) : emptySequence.concat(numbers);
}

function movingRow(direction) {
    for (let i = 0; i < widthBoard * widthBoard; i++) {
        if (i % 4 === 0) {
            fillRow(i, direction === 'left');
        }
    }
}

function movingColumn(direction) {
    for (let i = 0; i < widthBoard; i++) {
        fillColumn(i, direction === 'up');
    }
}


function combineRow() {
    for (let i = 15; i > 1; i--) {
        if ((squares[i].innerHTML === squares[i - 1].innerHTML) && squares[i].innerHTML !== '' && i % 4 !== 0) {
            let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i - 1].innerHTML)
            
            squares[i].innerHTML = combinedTotal;
            squares[i - 1].innerHTML = '';
        }
    }
    
    // проверить на выигрыш
}

function combineColumn() {
    for (let i = 15; i >= 4; i--) {
        if ((squares[i].innerHTML === squares[i - widthBoard].innerHTML) && squares[i].innerHTML !== '') {
            let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i - widthBoard].innerHTML);
            
            squares[i].innerHTML = combinedTotal;
            squares[i - widthBoard].innerHTML = '';
        }
    }
    
    // проверить на выигрыш
}

/* Точка входа, начало работы */
createBoard();
