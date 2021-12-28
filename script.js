let a = 5,
    b = a; 
b = b + 5
console.log(a);
console.log(b);  
/* [Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js"
5
10
б поменяло значение потому что лет, если бы было конст то выдало бы ошибку*/

const obj = { 
    a: 5,
    b: 1
}

const copy = obj;
copy.a = 10;
console.log(copy);
console.log(obj);
/* [Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js"
{ a: 10, b: 1 }
{ a: 10, b: 1 }
даже не смотря на то что мы модефицировали копию и то что объект был создал через конст 
значение поменялось и модифицировало изначальный объект

КОГДА МЫ РАБОТАЕТ С ПРИМЕТИВНЫМИ ТИПАМИ ДАННЫХ ТИПА СТРОК ЦИФР И ТД ТО ОНИ ПЕРЕДАЮТСЯ ПО 
ЗНАЧЕНИЮ КАК В ПЕРВОМ ВАРИАНТ С А И Б

А ВО ВТОРОМ ВАРИАНТЕ ПЕРЕДАЧА ИДЕТ НЕ ПО ЗНАЧЕНИЮ А ПО СЫЛКЕ

ТО-ЕСТЬ МЫ В КОПИ НЕ СКОПИРОВАЛИ ОБЖЕКТ И ТАМ ЧТО ТО СДЕЛАЛИ, А ПО ССЫЛКЕ МОДИФИЦИУРЕМ ИЗНАЧАЛЬНЫЙ
ОБЪЕКТ , НЕ КОПИЮ
ЭТО НАЗЫВАЕТСЯ ПЕРЕДАЧА ПО ССЫЛКЕ*/

function copy (mainObj) {
    let objCopy = {};

    let key;
    for (let key in mainObj) {
        objCopy[key] = mainObj;
    }

    return objCopy;
}
/* copy это название функции а мейнобж ее аргумент
    for (let key in mainObj)  переводится у нас есть ключи внутри объекта мейнобдж
    то-есть мы пройдемя по старому нашему объекту мениобджект, скоипируем все свойства которые 
    там есть и поместим их в нашу новую копию objCopy которая изначально было пустым объектом

    и мы при помощи ретерн возвращаем внаружу objcopy
*/
/* Теперь мы протестируем новую функцию */
function copy (mainObj) {
    let objCopy = {};

    let key;
    for (key in mainObj) {
        objCopy[key] = mainObj[key];
    }

    return objCopy;
}

const numbers = {
    a: 2,
    b: 5,
    c: {
        x:7,
        y:4
    }
};
const newNumbers = copy(numbers);
newNumbers.a = 10;
console.log(newNumbers);
console.log(numbers);
/* в newNumbers воспользуемся функцие копи , потому что она приймет в себя объект numbers
и вернет нам новый объект который будет копией
запускаем функцию copy(numbers) а во внутрь передаем намберс
и вот теперь произошлоа КЛОНИРОВАНИЕ ОБЪЕКТА !!!
что бы убедиться берем ньюнамберс, обращаемся к свойству а

[Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js"
{ a: 10, b: 5, c: { x: 7, y: 4 } } 

теперь что бы проверить или изменятеся наша изначальная конструкция добавляем второй консоль лог 
с намберс и смотрим 

[Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js"
{ a: 10, b: 5, c: { x: 7, y: 4 } }
{ a: 2, b: 5, c: { x: 7, y: 4 } }

мы видим два разных объекта, где намберс поменялся и где скопировался (а =2 а превом а втором 10)*/
function copy (mainObj) {
    let objCopy = {};

    let key;
    for (key in mainObj) {
        objCopy[key] = mainObj[key];
    }

    return objCopy;
}

const numbers = {
    a: 2,
    b: 5,
    c: {
        x:7,
        y:4
    }
};
const newNumbers = copy(numbers);
newNumbers.a = 10;
newNumbers.c.x = 10;
console.log(newNumbers);
console.log(numbers);
/* обратились к с и поменяли значение на 10 и оно опять поменялось в двух местах и в скопированном и 
в главном хотя должен быть 7
потому что существуеют ГЛУБОКИЕ И ПОВЕРХНОСТНЫЕ КОПИИ ОБЪЕКТОВ !!! 
только что была поверхностная , она берет обычные свойства родителей, но как только появляется вложе
нная структура, например одно из свой будет содержать объект как с ил массив например, то свойствво
будет иметь ссылочный тип данных
ВСЕ ЧТО ЗДЕСЬ БЫЛО ЭТО БЫЛ ПЕРВЫЙ СПОСОБ ПОВЕРХНОСТНОЙ КОПИИ БЛАГОДРЯ ЦИКЛУ */

const numbers = {
    a: 2,
    b: 5,
    c: {
        x:7,
        y:4
    }
};

const add = {
    d: 17,
    e: 20
};
console.log(Object.assign(numbers, add))
/* если мы хотим в объект поместить объект по меньше у которого будут еще несколько свойств,
 к примеру адд в намберс 

 console.log(Object.assign(numbers, add)) первая стоит намберс потому что первое стоит то во что
 помещаем а второе то что помещается, благодаря вот этой команде)

 { a: 2, b: 5, c: { x: 7, y: 4 }, d: 17, e: 20 }    */

const add = {
    d: 17,
    e: 20
};

const clone = Object.assign({}, add);
clone.d = 20;
console.log(add);
console.log(clone);
/* { d: 17, e: 20 }
{ d: 20, e: 20 }
это мы сделали с пустым объектом, просто заменив намберс на пустой объект что бы просто получить
отдельную копию*/

const oldArray = ["a", "b", "c"];
const newArray = oldArray.slice();
newArray[1] = "asdasdada";
console.log(newArray);
console.log(oldArray);
/* если просто сделать вот так  const newArray = oldArray то мы просто изменим массив но не скопируем
в slice можно передать аргумент по количеству этих эллементов
[Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js"
[ 'a', 'asdasdada', 'c' ]
[ 'a', 'b', 'c' ]*/

/* ОППЕРАТОР СПРЕД (РАЗВОРОТА) : */
const video = ["youtube", "vimeo", "rutube"],
      blogs = ["wordpress", "livejournal", "blogger"],
      internet = [...video, ...blogs, "vk", "facebook", "instagram"];
console.log(internet)
/*опператор разворота развернул этру стркутуру на отдельаные эллементы и теперь в консоли
интернет будет иметь значения и видео и блогс и свои  */

function log(a, b, c) {
    console.log(a);
    console.log(b);
    console.log(c);
}

const num = [2, 5, 7];

log(...num);
/* представь что вместо 2 5 7 стоит ссылка на видео, видеопревью и условно ссылка на автора
по аналогии чисто для примера и все эти три аргумента нам необходимо передать в ф-цию лог
log(...numbers); - с помощью этого мы разложим массив на три отдельных эллемента 
[Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js"
2
5
7
*/

const array = ["a", "b"];
const newArray = [...array];
console.log(newArray);
const q = {
    one: 1,
    two: 2
}
const newObj = {...q};
console.log(newObj);
/*[Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js"
[ 'a', 'b' ]
{ one: 1, two: 2 } */
