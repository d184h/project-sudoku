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
module.exports = getSudoku;
