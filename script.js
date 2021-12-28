let str = "some";
let strObj = new String(str);

console.log(typeof(str));
console.log(typeof(strObj));
/*[Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js"
string
object 
когда мы пытаемся использовать какой-то метод на строке получается объект
он оборачивает строку в какой то объект потом использует какой то метод который есть у этого объекта
а потом возвращает все обратно
let str = "some"; - это был примитивный тип данных. потом в работе он привратился в объект
и потом обратно в примитив*/

console.dir([1, 2, 3]);
/* в браузере мы получаем какой-то экземпляр массива
в array мы увидем все методы которые могут применяться (прототип)
в прототипе будут все методы которые мы можем ипользовать для каждого экхемпляра в массиве
и дальше мы переходим к объекту (смотри на скаченное фото в телеге)
то-есть те методы которых нет в прототипе но они откуда-то берутся у экземпляра массива (1,2,3)
они берутся именно от объекта, например toString
так что любые конструкции прототипно у нас наследуются объектно.
И так работает не только с массиов но и с функциями , числом */

const soldier = {
    health: 400,
    armor: 100
};
const john = {
    health: 100  
}
john.__proto__ = soldier;
console.log(john.armor)
/* мы создаем солдата , у которого 400 здоровье, отдеально создаем под-солдата джона у которого
будет все тоже самое что и у обычного солдата но только здоровье 100 лично его
СЕЙЧАС БУДЕТ ПРИМЕР УСТАРЕВШОГО КОДА, КОТОРЫЙ В РЕАЛЬНЫХ ПРОЕКТАХ УЖЕ НЕ ИСПОЛЬЗУЕТСЯ 
НО ВСТРЕЧАЕТСЯ В СТАРЫХ
[Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js"
{ health: 100 }
это мы выводили в консоль console.log(john)
но если добавить console.log(john.armor)
ТО ДЖОНУ БУДЕТ ПЕРЕДОВАТЬСЯ ЗНАЧЕНИЕ АРМОР У СОЛДАТА
Правило: все массивы могут брать свойства из своего прототипа, из объекта */
const soldier = {
    health: 400,
    armor: 100,
    sayHello: function () {
        console.log("hello");
    }
};
const john = {
    health: 100  
}
john.__proto__ = soldier;

john.sayHello ();
/* [Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js"
hello */

/* НОВЫЙ МЕТОД !!!  */

const soldier = {
    health: 400,
    armor: 100,
    sayHello: function () {
        console.log("hello");
    }
};
const john = {
    health: 100  
}

Object.setPrototypeOf(john, soldier);
john.sayHello ();
/*[Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js"
hello 
Object.setPrototypeOf(john, soldier); - по современному*/
const soldier = {
    health: 400,
    armor: 100,
    sayHello: function () {
        console.log("hello");
    }
};
const john = Object.create(soldier);
john.sayHello ();

/*Object.create - создает новый объект 
мы создаем объект Джон который будет прототипно наследоваться от Солдата
[Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js"
hello */