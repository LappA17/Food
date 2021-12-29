// To string 

console.log(typeof(String(null)))

/*[Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js"
string
стринг обернула налл в стринг, там можно даже число поставить
Это считается не удобный способоb */

console.log(typeof(5 + ""))

/* новый способ 
[Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js"
string
при сложение любого типа данных со строкой получется строка */

const num = 5;
console.log("https://vk.com/catalog" + num)
/*[Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js"
https://vk.com/catalog5
сейчас так не делают из-за того правила что ты уже учил интерпаляция, но такой код встречается в интернете и вот пример
зачем нужно преоброзовывать один тип данных в другой  */

const fontSize = 26 + "px" //еще пример

console.log(typeof(Number("4")))
/*[Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js"
number
тоже считается неудобным*/
console.log(typeof(+"4"));
//со строки получилось намбер, вот так делают сейчас благодаря унарному плюсу 

console.log(typeof(parseInt("15px", 10)));
/* будет тип данны намбер 
это третий способ*/

let answ = +prompt("hello", ""); //вот благодаря унарному плюсу дает возможность вводить намбер

//ВСЕ ДАННЫЕ ОТ ПОЛЬЗОВАТЕЛЯ ЭТО СТРОКИ НО МЫ ИХ МОЖЕМ ПРИОБРАЗОВЫВАТЬ В ТО ЧТО НАМ НУЖНО

0, "", null, undefined, NaN = это все фолс 
но все пустые массивы, строки и тд = Тру


let switcher = null;
if (switcher){
    console.log("working")
} /* работать не будет потому что нал это фолс */
let switcher = 1;
if (switcher){
    console.log("working") } //теперь все работает. это был первый способ

console.log(typeof(Boolean("4")))
[Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js"
boolean //это второй способ которым почту никто не пользуется

console.log(typeof(!!"4444"))
[Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js"
boolean
