//импортирую функцию
const getSudoku = require("./getSudoku");
//получаю массив массивов судоку
const sudoku = getSudoku();
//данная функция выдает число для замены, либо 0
function scanGet(i, j) {
  let arrNumb = [];
  let row;
  let column = [];
  let square = [];
  let megaArr = [];

  // i ряд
  row = sudoku[i];

  // i столбец
  for (let z = 0; z < 9; z++) {
    column.push(sudoku[z][j]);
  }
  //квадраты
  const squareRow = Math.floor(i / 3);
  const squareCol = Math.floor(j / 3);
  for (let r = squareRow * 3; r < (squareRow + 1) * 3; r++) {
    for (let c = squareCol * 3; c < (squareCol + 1) * 3; c++) {
      square.push(sudoku[r][c]);
    }
  }

  //   if (i >= 0 && i < 3 && j >= 0 && j < 3) {
  //     // 1 квадрат
  //     for (let z = 0; z < 3; z++) {
  //       for (let a = 0; a < 3; a++) {
  //         square.push(sudoku[z][a]);
  //       }
  //     }
  //   } else if (i >= 0 && i < 3 && j >= 3 && j < 5) {
  //     // 2 квадрат
  //     for (let z = 0; z < 3; z++) {
  //       for (let a = 3; a < 6; a++) {
  //         square.push(sudoku[z][a]);
  //       }
  //     }
  //   } else if (i >= 0 && i < 3 && j >= 6 && j < 9) {
  //     // 3 квадрат
  //     for (let z = 0; z < 3; z++) {
  //       for (let a = 6; a < 9; a++) {
  //         square.push(sudoku[z][a]);
  //       }
  //     }
  //   } else if (i >= 3 && i < 6 && j >= 0 && j < 3) {
  //     // 4 квадрат
  //     for (let z = 3; z < 6; z++) {
  //       for (let a = 0; a < 3; a++) {
  //         square.push(sudoku[z][a]);
  //       }
  //     }
  //   } else if (i >= 3 && i < 6 && j >= 3 && j < 5) {
  //     // 5 квадрат
  //     for (let z = 3; z < 6; z++) {
  //       for (let a = 3; a < 6; a++) {
  //         square.push(sudoku[z][a]);
  //       }
  //     }
  //   } else if (i >= 3 && i < 6 && j >= 6 && j < 9) {
  //     // 6 квадрат
  //     for (let z = 3; z < 6; z++) {
  //       for (let a = 6; a < 9; a++) {
  //         square.push(sudoku[z][a]);
  //       }
  //     }
  //   } else if (i >= 6 && i < 9 && j >= 0 && j < 3) {
  //     // 7 квадрат
  //     for (let z = 6; z < 9; z++) {
  //       for (let a = 0; a < 3; a++) {
  //         square.push(sudoku[z][a]);
  //       }
  //     }
  //   } else if (i >= 6 && i < 9 && j >= 3 && j < 5) {
  //     // 8 квадрат
  //     for (let z = 6; z < 9; z++) {
  //       for (let a = 3; a < 6; a++) {
  //         square.push(sudoku[z][a]);
  //       }
  //     }
  //   } else if (i >= 6 && i < 9 && j >= 6 && j < 9) {
  //     // 9 квадрат
  //     for (let z = 6; z < 9; z++) {
  //       for (let a = 6; a < 9; a++) {
  //         square.push(sudoku[z][a]);
  //       }
  //     }
  //   }
  //пушу в большой массив
  arrNumb.push(...row, ...column, ...square);
  arrNumb.sort((a, b) => a - b);
  //удаляю повторения индексОф находит последнее вхождение//можно через new set нужно про него прочитать
  megaArr = arrNumb.filter((element, index) => {
    return arrNumb.indexOf(element) === index && element !== 0;
  });

  //ищу возможные числа

  let allNumb = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let possibleNumb = [];
  //   let numb;
  for (let i = 0; i < allNumb.length; i++) {
    //     numb = false;
    //     for (let j = 0; j < possibleNumb.length; j++) {
    //       if (allNumb[i] == megaArr[j]) numb = true;
    //     }
    //     if (numb == false) possibleNumb.push(allNumb[i]);
    if (!megaArr.includes(allNumb[i])) {
      possibleNumb.push(allNumb[i]);
    }
  }
  if (possibleNumb.length === 1) {
    return possibleNumb[0];
  } else return 0;
}

//данная функция проверяет поле и если 0 - заменяет число, если оно одно
let counter = 0;
function solve(sudoku) {
  counter++;
  //первый проход
  for (let i = 0; i < sudoku.length; i++) {
    for (let j = 0; j < sudoku[i].length; j++) {
      if (sudoku[i][j] === 0) {
        sudoku[i][j] = scanGet(i, j);
      }
    }
  }
  // проверка есть ли 0
  for (let i = 0; i < sudoku.length; i++) {
    for (let j = 0; j < sudoku[i].length; j++) {
      if (counter > 165) return "стек сдох";
      if (sudoku[i][j] == 0) {
        //рекурсия
        solve(sudoku);
      }
    }
  }
  return sudoku;
}
console.log(solve(sudoku));
