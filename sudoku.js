//чтение файла и переменные
const fs = require("fs");
const text = fs.readFileSync("./puzzles.txt", "utf-8");
let n = Number(process.argv[2]) + 1; //номер судоку задаем через консоль
//функция создания нерешенного судоку
function getSudoku() {
  let sudoku = [];
  let bigArr = text.split("\n");
  let arr = bigArr[n].split("");
  for (let i = 0; arr.length; i++) {
    sudoku.push(arr.splice(0, 9));
  }
  return sudoku;
}
console.log(getSudoku());
/**
 * Принимает игровое поле в формате строки — как в файле sudoku-puzzles.txt.
 * Возвращает игровое поле после попытки его решить.
 * Договорись со своей командой, в каком формате возвращать этот результат.
 */
function solve() {}

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает булевое значение — решено это игровое поле или нет.
 */
function isSolved(board) {}

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает строку с игровым полем для последующего вывода в консоль.
 * Подумай, как симпатичнее сформировать эту строку.
 */
function prettyBoard(board) {}

// Экспортировать функции для использования в другом файле (например, readAndSolve.js).
module.exports = {
  solve,
  isSolved,
  prettyBoard,
};
