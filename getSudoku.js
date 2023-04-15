//чтение файла и переменные
const fs = require("fs");
const text = fs.readFileSync("./puzzles.txt", "utf-8");
let n =
  Number(process.argv[2]) - 1 >= 0 && Number(process.argv[2]) - 1 < 15
    ? Number(process.argv[2]) - 1
    : 0; //номер судоку задаем через консоль. по дефолту выдает первый член
//функция создания нерешенного судоку
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
// console.log(getSudoku());
module.exports = getSudoku;
