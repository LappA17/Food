const now = new Date ();
//мы создаем новую дату и помещаем ее в переменную now. Скобки не заполняем 

console .log(now);
/* [Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js"
2022-01-03T16:52:49.422Z*/

const now = new Date ("2022-01-03");
console .log(now);
/* [Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js"
2022-01-03T00:00:00.000Z
задавали в виде строки*/ 

const now = new Date(2022, 1, 3, 20);
console .log(now);
/* без нулей, 20 - это количество часов
[Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js"
2022-02-03T18:00:00.000Z
месяцы в дате считаются с 0 если мы передаем ,
18 я получил потому что дата учитывает часовой пояс, я живу в +2 по этому 18*/

const now = new Date(0);
console .log(now);
/* [Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js"
1970-01-01T00:00:00.000Z
отчет идет с 1970 года и всегда в МИЛЛИСЕКУНДАХ*/
const now = new Date(-9999);
console .log(now)
/*[Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js"
1969-12-31T23:59:50.001Z
мы получим дату до 1970 года благодаря отрицательному значению
ВООБЩЕ СУЩЕСТВУЮТ ОЧЕНЬ МНОГО МЕТОДОВ ДЛЯ ДАТЫ ВСЕ ОНИ ОЧЕНЬ ПОХОЖИ ДРУГ НА ДРУГА И ЕСТЬ В ДОКУМЕНТАЦИИ К ДАННОМ УРОКУ*/

const now = new Date();
console .log(now.getFullYear());
console .log(now.getMonth());
console .log(now.getDate());//дни месяца исесляются от 1 до 31 и ТАКИХ КОМАНД ДО МИЛЛИСЕКУНД 
console .log(now.getDay());//получает номер дня недели, нумерация начинается с восскресенье, а он = 0 :)
console .log(now.getUTCHours());//время по UTC

console.log(now.getTimezoneOffset());//разница между часовым пояссом и utc, разница будет в минутах
console.log(now.getTime());//нам покажет количество миллесекунд которое прошло после 1970 года и это число можно обратно
// превратить в Дату если поместить его в скобки в Date() !!!

const now = new Date();
console .log(now.setHours(18));
console .log(now)
/* [Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js"
1641226820245
2022-01-03T16:20:20.245Z 
Мы вручную перевели в дату, но этой консоли как видно есть особенность внутри вс кода, она не ориентируется на наши локальные 
данные которые у нас есть в компе а на  utc  зону , но в браузере будет 18 часов а не 16*/

console .log(now.setHours(18, 40));// 40  это минуты :) тоесть время будет 18:40
console .log(now)

const now = new Date("2022-01-03");
new Date.parse("2022-01-03");
/* конструкция Date.parse  отдаст нам ровно такое же значине как в new Date("2022-01-03") просто там где parse 
мы используем метод но они не чем не отличаются  */

let start = new Date();

for (let i = 0; i < 100000; i++) {
    let some = i ** 3;//i выводим в 3 степень благодаря новому опператору **
}

let end = new Date();

alert(`Цикл отработал за ${} миллесекунд`); // покажет за сколько отработал цикл
alert(`Цикл отработал за ${end - start} миллесекунд`);//покажет разницу двух даь :))
/*мы создаем новую переменую а дальше мы будем выполнять дейсвтие что бы засечь время
let end используем что бы засечь время когда цикл закончится 
теперь у нас две даты, первая что в начале и та что в енде и мы можем посмотреть на разницу этих двух дат*/ 

