const btns = document.querySelectorAll("button");

console.log(btns[0].classList.length);/*обращаемся к батенс, его первой кнопки в [] потому что это псевдомассив
дальше к списку классов и с помощью length после класлист нам покажет сколько данная кнопка имеет
классов и на сервере нам покажет ответ в косноли 2, значит что у данной первой кнопки 2 класса.
СВОЙСТВО КЛАССЛИСТ ИМЕЕТ МНОГО МЕТОДОВ*/

const btns = document.querySelectorAll("button");

console.log(btns[0].classList.item[0]); //item позволяет получить класс который идет под определенным индексом.
//например если я хочу получить класс который идет под номер один то я ставлю [0] и мне в консоли вы=
//даст blue потому это первый класс этой кнопки
console.log(btns[0].classList.add("red", "..."));//добавить класс red и через запятую можнодобавлятьмного
console.log(btns[0].classList.remove("blue"));//удалит класс
console.log(btns[0].classList.toggle("blue"));//тоглить значет если класс есть на элементе до он уберет
//а если нет то добавит

if (btns[1].classList.contains("red")) {
    console.log("red");
}
/* contains - содержать. если вторая кнопка баттон содержит класс ред то ... */

btns[0].addEventListener("click", () => {
    if (!btns[1].classList.contains("red")){
        btns[1].classList.add("red");
    } else {
        btns[1].classList.remove("red");

    }
})
/* if (!btns[1].classList.contains("red")) - дословно это читается что мы с вами проверяем наличие
у второй кнопки класса ред если пользователь кликнет на 1 кнопку, благодаря addEventListener мы говорим 
скрипту следить за этой кнопкой если пользователь на нее кликнет. То-есть вторая кнопка проверяетс 
тогда когда пользователь кликнет на первую кнопку */

btns[0].addEventListener("click", () => {
    btns[1].classList.toggle("red");
});

/* с тоггл будет работать все ровно так же как мы в иф прописывали, НО ВАНЯ СКАЗАЛ ЧТО ЭТО НЕ ВСЕГДА
БУДЕТ КОРРЕКТНО ТАК ДЕЛАТЬ ПОТОМУ ЧТО Я СЛОЖНЫХ СКРИПТАХ В РЕАЛЬНОЙ РАБОТЕ МОЖЕТ ВСЕ РАБОАТЬ ПО ДРУГОМУ*/

console.log(btns[0].className);//СТАРОЕ ПРАВИЛО КОТОРЫЕ ЮЗАТЬ НЕ НАДО, получим список классов как одну строку

// ДЕЛЛИГИРОВАНИЕ - НАЧАЛО НОВОЙ ТЕМЫ !

const wrapper = document.querySelector(".btn-block");
wrapper.addEventListener("click", (event) => {
    if (event.target && event.target.tagName == "BUTTON") {
        console.log("hello")
    }
})
/* event содержит в себе информацию об элементе на котором происходит событие 

console.dir(event.target) если мы просто выведем это в консоль то появится на странице браузера
div #first.btn-block , если кликнуть на кнопку то появится button. ЭТО ПРОСТО ИНФА ОТ ВАНИ
ЧТО ОБЫЧНАЯ ТАКАЯ КОМАНДА ДАЕТ МНОГО ИНФЫ О ОБЪЕКТЕ

после if(event.target.. - мы прописали потому что не все элементы в html структуреподдержиают 
события клики например тег который создает переносы

event.target.tagName == "BUTTON" а здесь мы проверяе тег нейм который будет являтся баттон

теперь когда ваня кликает именно на кнопку он получает hello */

const wrapper = document.querySelector(".btn-block");
wrapper.addEventListener("click", (event) => {
    if (event.target && event.target.classList.contains("blue")) {
        console.log("hello")
    }
})
// ТЕПЕРЬ ВСЕ КНОПКИ С КЛАССОМ БЛУ БУДУТ НАЖИМАТЬСЯ И ПИСАТЬ ХЕЛОУ 

const btn = document.createElement("button");
btn.classList.add("red");
wrapper.append(btn);
/* напоминаю что метод append позволит поместить новосозданную кнопку в оберточку wrapper 
ТЕПЕРЬ КОГДА Я НАЖМУ НА НОВОСОЗДАННУЮ КНОПКУ И КЛИКНУ ТО ТОЖЕ БУДЕТ ОТБИВАТЬСЯ ХЕЛОУ, ПОТОМУ ЧТО
СЕГОДНЯШНЯЯ ТЕМА ЭТО ДЕЛИГИРОВАНИЕ, ЗНАЧИТСЯ ВСЕ ЧТО Я ДОСОЗДАЮ БУДЕТ ИМЕТЬ ТЕ ЖЕ СВОЙСТВА ЧТО 
И КНОПКИ СОЗДАННЫЕ ИЗНАЧАЛЬНО */

btns.forEach(btn => { //помни что btn-это тот же item, грубо говоря это кнопка на которую мы что-то будем делать
    btn.addEventListener("click", () => {
    console.log("hello");
});
/* ЕСЛИ МЫ ЗАКОММЕНТИРУЕМ wrapper и СДЕЛАЕМ ЭТУ КОМАНДУ ТО НОВОСОЗДАННАЯ КРАССНАЯ КНОПКА НЕ БУДЕТ ОТКЛИКАТЬСЯ НА ЭТУ ФУНКЦИЮ ПОТОМУ ЧТО ОНА БЫЛА СОЗДАНА ДО
ТОГО КАК КРАСНАЯ КНОПКА ПОЯВИЛАСЬ НА СВЕТ ЕСЛИ МЫ НЕ ПРОПИШЕМ ВОТ ЭТО  const wrapper = document.querySelector(".btn-block");
wrapper.addEventListener("click", (event) => {
    if (event.target && event.target.classList.contains("blue")) {
        console.log("hello")
    }
}) 
ГРУБО ГОВОРЯ ВАНЯ ПРОСТО ПОКАЗАЛ КАК ПРОИСХОДИТ ОШИБКА */

const wrapper = document.querySelector(".btn-block");
wrapper.addEventListener("click", (event) => {
    if (event.target && event.target.matches("button.red")) {
        console.log("hello")
    }
})
/* метод matches - какой-то элемент совпадает с чем-то. Например кнопка с классом ред.  
Теперь будет работать хелоу с классом Ред */



/*<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
   	<title>JavaScript</title>
   	<link rel="stylesheet" href="style.css">
  </head>
  <body>

    <div id="first" class="btn-block">
      <button class="blue some"></button>
      <button></button>
      <button></button>
      <button></button>
      <button></button>
      <button></button>
      <button></button>
      <button></button>
    </div>
    
	<script src="script.js"></script>
  </body>
</html> */