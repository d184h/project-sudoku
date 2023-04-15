// //импортирую функцию
// const getSudoku = require("./getSudoku");
const fs = require("fs");
const text = fs.readFileSync("./puzzles.txt", "utf-8");
let n =
  Number(process.argv[2]) - 1 >= 0 && Number(process.argv[2]) - 1 < 15
    ? Number(process.argv[2]) - 1
    : 0;

function getSudoku() {
  let sudokuString = [];
  let bigArr = text.split("\n");
  let arr = bigArr[n].split("");
  for (let i = 0; arr.length; i++) {
    sudokuString.push(arr.splice(0, 9));
  }
  let sudokuNumb = sudokuString.map((el) =>
    el.map((item) => {
      if (item == "-") return (item = 0);
      else return Number(item);
    })
  );
  return sudokuNumb;
}

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
      if (sudoku[i][j] == 0) {
        //рекурсия
        solve(sudoku);
      } else if (counter > 165) return "стек сдох";
    }
  }
  return sudoku;
}
// console.log(solve(sudoku));

function issolved(sudokuNumb) {
  const er = `\n--Не смогли решить судоку--\n`;
  let string = 0;
  let column = 0;
  let square = 0;
  let result = 0;
  for (let i = 0; i < sudoku.length; i++) {
    if (new Set(sudoku[i]).size === 9) {
      string += 1;
    }
  }

  if (string === 9) {
    result += 1;
  } else {
    return er;
  }

  let col = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      col.push(sudoku[j][i]);
    }
  }

  let col2 = [];
  for (let i = 0; i <= col.length; i++) {
    col2.push(col.splice(0, 9));
    if (col.length === 10) {
      break;
    }
  }

  for (let i = 0; i < col2.length; i++) {
    if (new Set(col2[i]).size === 9) {
      column += 1;
    }
  }

  if (column === 9) {
    result += 1;
  } else {
    return er;
  }

  let sq1 = [
    sudoku[0][0],
    sudoku[0][1],
    sudoku[0][2],
    sudoku[1][0],
    sudoku[1][1],
    sudoku[1][2],
    sudoku[2][0],
    sudoku[2][1],
    sudoku[2][2],
  ];

  let sq2 = [
    sudoku[0][3],
    sudoku[0][4],
    sudoku[0][5],
    sudoku[1][3],
    sudoku[1][4],
    sudoku[1][5],
    sudoku[2][3],
    sudoku[2][4],
    sudoku[2][5],
  ];

  let sq3 = [
    sudoku[0][6],
    sudoku[0][7],
    sudoku[0][8],
    sudoku[1][6],
    sudoku[1][7],
    sudoku[1][8],
    sudoku[2][6],
    sudoku[2][7],
    sudoku[2][8],
  ];

  let sq4 = [
    sudoku[3][0],
    sudoku[3][1],
    sudoku[3][2],
    sudoku[4][0],
    sudoku[4][1],
    sudoku[4][2],
    sudoku[5][0],
    sudoku[5][1],
    sudoku[5][2],
  ];

  let sq5 = [
    sudoku[3][3],
    sudoku[3][4],
    sudoku[3][5],
    sudoku[4][3],
    sudoku[4][4],
    sudoku[4][5],
    sudoku[5][3],
    sudoku[5][4],
    sudoku[5][5],
  ];

  let sq6 = [
    sudoku[3][6],
    sudoku[3][7],
    sudoku[3][8],
    sudoku[4][6],
    sudoku[4][7],
    sudoku[4][8],
    sudoku[5][6],
    sudoku[5][7],
    sudoku[5][8],
  ];

  let sq7 = [
    sudoku[6][0],
    sudoku[6][1],
    sudoku[6][2],
    sudoku[7][0],
    sudoku[7][1],
    sudoku[7][2],
    sudoku[8][0],
    sudoku[8][1],
    sudoku[8][2],
  ];

  let sq8 = [
    sudoku[6][3],
    sudoku[6][4],
    sudoku[6][5],
    sudoku[7][3],
    sudoku[7][4],
    sudoku[7][5],
    sudoku[8][3],
    sudoku[8][4],
    sudoku[8][5],
  ];

  let sq9 = [
    sudoku[6][6],
    sudoku[6][7],
    sudoku[6][8],
    sudoku[7][6],
    sudoku[7][7],
    sudoku[7][8],
    sudoku[8][6],
    sudoku[8][7],
    sudoku[8][8],
  ];

  let square2 = [sq1, sq2, sq3, sq4, sq5, sq6, sq7, sq8, sq9];

  for (let i = 0; i < square2.length; i++) {
    if (new Set(square2[i]).size === 9) {
      square += 1;
    }
  }

  if (square === 9) {
    result += 1;
  } else {
    return er;
  }

  if (result === 3) {
    return sudoku;
  } else {
    return er;
  }
}

function prettyBoard(board) {
  if (typeof board === "string") {
    return board;
  }
  const arr = [[], ["--Судоку решена!--"], []];
  for (let i = 0; i < board.length; i += 1) {
    arr.push(board[i].join("|").split(","));
    arr.push(["- - - - - - - - -"]);
  }
  const newArr = [];
  for (let j = 0; j < arr.length; j += 1) {
    newArr.push(arr[j].join(""));
  }
  newArr.pop();
  const resultString = newArr.join("\n");
  return resultString + "\n";
}
console.table(prettyBoard(issolved(solve(sudoku))));

// console.log(issolved(sudoku));
