const options = {
    name: "test",
    width: 1024,
    height: 1024,
    colors: {
        border: "black",
        bg: "red"
    }
};
console.log(options.name)
//[Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js" test

delete options.name;
console.log(options)
//НОВЫЙ ОППЕРАТОР ДЕЛИТ. удалило свойсвто из объекта
/*[Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js"
test
{ width: 1024, height: 1024, colors: { border: 'black', bg: 'red' } }
*/
const options = {
    name: "test",
    width: 1024,
    height: 1024,
    colors: {
        border: "black",
        bg: "red"
    }
};
for (let key in options) {
console.log(`свойство ${key} имеет значение ${options[key]}`)
}
/* FOR IN
 ключ : значение. условно нейм это ключ а значение тест и так далее
в этом цикле цикл будет повторяться столько раз сколько свойств у этого объекта
console.log(свойство ${key} имеет значение ${options[key]}) - таким образом мы будем получать значение
ключа который перебирается в этой итерации цифр
свойство name имеет значение test
свойство width имеет значение 1024
свойство height имеет значение 1024
свойство colors имеет значение [object Object] - ОБРАТИ ВНИМАНИЕ ЧТО ЖС НЕ МОЖЕТ РАСПОЗНАТЬ СТРОКУ В
ОБЪЕКТЕ, ПО ЭТОМУ НАПИСАЛ ОБЪЕКТ ОБЪЕКТ
 ТАКИМ ОБРАЗОМ МЫ МОЖЕМ ПЕРЕБИРАТЬ ОБЪЕКТЫ И С НИМИ ВЗАИМОДЕЙСТВОВАТЬ */
 const options = {
    name: "test",
    width: 1024,
    height: 1024,
    colors: {
        border: "black",
        bg: "red"
    }
};

 for (let key in options) {
     if (typeof(options[key]) === "object") {
        for (let i in options[key]) {
            console.log(`свойство ${i} имеет значение ${options[key][i]}`)}
        } else {
            console.log(`свойство ${key} имеет значение ${options[key]}`)

        }
     }
    
    /* if(typeof(options[key])) === "object") если это объект то 
    создаем переменную i вместо кей потому что кей уже есть и будет пересеченее и после in мы обращаемся
    к объекту options[key]
    ${options[key][i]} - это тоже самое что  и ["colors"] ["border"] мы бы прописали в консоль логе
    свойство name имеет значение test
свойство width имеет значение 1024
свойство height имеет значение 1024
свойство border имеет значение black
свойство bg имеет значение red */
const options = {
    name: "test",
    width: 1024,
    height: 1024,
    colors: {
        border: "black",
        bg: "red"
    }
};
let counter = 0;
for (let key in options) {
     if (typeof(options[key]) === "object") {
        for (let i in options[key]) {
            console.log(`свойство ${i} имеет значение ${options[key][i]}`);
            counter++
        }
    } else {
            console.log(`свойство ${key} имеет значение ${options[key]}`);
            counter++

        }
     }
     console.log(counter);
     /* свойство name имеет значение test
свойство width имеет значение 1024
свойство height имеет значение 1024
свойство border имеет значение black
свойство bg имеет значение red
5
Благодаря каунтер мы можем посчитать сколько всего свойств в объекте
Если мы удалим каунтер с for  то нам покажет значения только на верхнем уровне , а именно
name width height colors 3 или так же может быть 4*/
const options = {
    name: "test",
    width: 1024,
    height: 1024,
    colors: {
        border: "black",
        bg: "red"
    }
};
console.log(Object.keys(options));
/*Это метод где на основое нашего объекта делается массив где все основание это ключи на первой позиции 
(то-есть нейм , калер видтх хайт)
[Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js"
[ 'name', 'width', 'height', 'colors' ] */
const options = {
    name: "test",
    width: 1024,
    height: 1024,
    colors: {
        border: "black",
        bg: "red"
    }
};
console.log(Object.keys(options).length);
/*[Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js"
4*
Благодрая length мы можем узнать кство эллементов в массиве , с объектом ленгхт не работает
ПРИЕМ ЧЕРЕЗ КАУНТЕР РАНЕЕ АБСОЛЮТНО ПУСТАЯ ТРАТА ВРЕМЕНИ ПОТМОУ ЧТО ПЕРЕВЕДЯ ОБЪЕКТ В МАССИВ
И С ПОМОЩЬЮ ЛЕНГТХ МОЖНО СЭКОНОМИТЬ КУЧУ ВРЕМЕНИ/*/
const options = {
    name: "test",
    width: 1024,
    height: 1024,
    colors: {
        border: "black",
        bg: "red"
    },
    makeTest: function () {
        console.log("test");
    }
};
    options.makeTest();

console.log(Object.keys(options).length);
/* makeTest: function () {
        console.log("test");
    } Благодаря этому мы создали метод самостоятельно а не строенный в джава скрипт и 
    спокойно можем запускать методы либо фции благодаря этому коду

    options.makeTest(); - а благодаря этому мы запускаем метод , то что в скобках значит 
    либо старт ф-ции либо метода 

    [Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js"
test */

const options = {
    name: "test",
    width: 1024,
    height: 1024,
    colors: {
        border: "black",
        bg: "red"
    }
};

const {border, bg} = options.colors;
console.log(border)
/* Деструктуризация Объекта
то-есть будем вытаскивать бордер и бг в качестве отдельных структур, которые мы будем выносить за наш 
объект

const {border, bg} = options.colors - если это переводить на язык то , я хочу вытащить эти объекты
с опшин калерс в качестве отдельной преременной !

[Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js"
black
