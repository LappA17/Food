//ОДИН ИЗ САМЫХ ВАЖНЫХ УРОКОВ
const btn = document.querySelector("button");
/* для начала нужен эллемент на который будем вешать обработчик событий*/

btn.onclick = function() {
    alert("click");
}
//в реальных проектах такой код почти НИКОГДА НЕ ИСПОЛЬЗУЕТСЯ

btn.addEventListener("click", () => {
alert("click");
});
/* здесь мы говорим что назначем Джаве Скрипту следить за этим эллементом если у нас произошло событие
которые мы там назначим то он запустит
CALLBACK функции это функции которые выполняются строго за другими. то-есть только после клика
пользователя что то там произойдет*/

btn.addEventListener("click", () => {
    alert("Second click");
    });
    //второе действие
btn.addEventListener("mouseenter", () => {
console.log("Hover")  ;      
});
//mouseenter когда пользователь наводит мышкой происходит анимация

btn.addEventListener("mouseenter", (event) => {
    console.log(event)
    });
/* Событие Евент, передается как аргумент в коллбек функцию , можно вместо евент сокращенно (е)
ОН ВСЕГДА ИДЕТ С ПЕРВЫМ АРГУМЕНТОМ
На странице браузера будет благодаря Ивент описываться все что произошла с элементом на странице: это
навод мыши , кординаты по х у, отступы и очень много чего. Но главное : type :это событие (например
    маус ентер событие покажет), target : элемент на котором произошло событие
*/
btn.addEventListener("mouseenter", (e) => {
    console.log(e.target);
    e.target.remove();
    });
/* в консоли появится доступ к этому эллементу из html !!!
и после этого благодря к примеру 
Теперь наводим на элемент и он просто пропадает со страницы 
Это очень и очень полезная возможность*/

const deleteElement = (e) => {
    console.log(e.target);
    e.target.remove();
    };
btn.addEventListener('click', deleteElement);
/* НЕЛЬЗЯ СОЗДАТЬ ДВЕ ОДИНАКОВЫХ ФУНКЦИИ И ДУМАТЬ ЧТО ОНИ БУДУТ РАВНЫ по этому нужно создавать новую даже
если значение одинаковое 
нельзя создать константу delete ! есть в жс зарезервированные именна
МЫ ПРОСТО ПЕРЕДАЕ ДЕЛИТЖЛЕМЕНТ И ПЕРЕДАЕМ, МЫ ПРОСТО ГОВОРИМ ЧТО ПОСЛЕ ТОГО КАК У НАС ВЫПОЛНИТЬСЯ
КЛИК ПО БТН, У НАС ВЫПОЛНИТЬСЯ ФУНКЦИЯ ДЕЛИТЭЛЕМЕНТ. ТО ЕСТЬ МЫ ЕЕ НЕ ВЫЗЫВАЕМ, А ПРОСТО НА НЕЕ ССЫЛАЕМСЯ
 */
let i = 0;
const deleteElement = (e) => {
    console.log(e.target);
    e.target.remove();
    i++;
    if (i == 1){
        btn.removeEventListener('click', deleteElement);
    }
    };
btn.addEventListener('click', deleteElement);
/* ТАКИМ ОБРАЗОМ СОБЫТИЕ ПРОИЗОЙДЕТ ТОЛЬКО ОДИН РАЗ, КЛИЕНТ УСЛОВНО НАЖИМАЕТ НА КАКУЕ-ТО КНОПКУ
НА САЙТЕ, ОНО НАЖИМАЕТСЯ ОДИН РАЗ НО ВТОРОЙ РАЗ НАЖАТЬ УЖЕ НЕ ПОЛУЧИТЬСЯ*/

const overlay = document.querySelector(".overlay");
const deleteElement = (e) => {
    console.log(e.target);
    console.log(e.type);
    overlay.addEventListener('click', deleteElement);

/* Иван взял с хтмл оверлей - это обычный класс дива где находтся кнопки
из-за того что может быть такая ситуация где в одном родители будет две кнопки которые
могут обрабатывать одно и то же событие то мы задаем для родителя свойство
    console.log(e.type); выводит в консоль событие которое произошло

    У Ивана пояится небольшая обертка визуальная рамка на кнопке
    Событие сначала произойдет на вложенном элементе а именно кнопке и потом пойдет выше по иерархии
    на розовую рамку и в консоли появится два события - два клика по кнопке Бтн
*/
const overlay = document.querySelector(".overlay");
const deleteElement = (e) => {
    console.log(e.currentTarget);
    console.log(e.type);
    overlay.addEventListener('click', deleteElement);
/* теперь же событие из-за карренттаргет. А теперь на бтн , а второй клик на Оверлеи, но на практике
как правило только е.target используем
ВСЫПЛЫТИЕ СОБЫТИЙ - ЭТО КОГДА ЭЛЕМЕНТ ОТРАБАТЫВАЕТ СНАЧАЛА НА ВЛОЖЕННОМ ЭЛЕМЕНТЕ , ПОТОМ НА РОДИТЕЛИ И
ВЫШЕ И ВЫШЕ*/

const link = document.querySelector("a");//у вани только одна ссылка в хтмл
link.addEventListener("click", (event) => {
event.preventDefault();
console.log(event.target);
}
/* event.preventDefault() = этот метод говорит браузеру не перезодить по ссылке и он помещается в самое
самое начало 
И ТЕПЕРЬ ЕСЛИ МЫ КЛИКНЕМ ПО ССЫЛКЕ НА САЙТЕ ТО НАС НЕ ПЕРЕВОДЕТ ПО ССЫЛКЕ МЫ ПРОСТО ВЫВОДИМ ЭЛЕМЕНТ В
КОНСОЛИ И МЫ БУДЕМ ОЧЕНЬ И ОЧЕНЬ ЧАСТО ЭТО ИСПОЛЬЗОВАТЬ - event.preventdefault для блокировки ссылки*/
const deleteElement = (e) => {
    console.log(e.currentTarget);
    console.log(e.type);
    overlay.addEventListener('click', deleteElement);

const btns = document.querySelectorAll("button");
btns.forEach(item => {
    item.addEventListener("click", deleteElement, {once: true });
});
/* таким образом мы задаем событие для КАЖДОЙ кнопки в хтмл
Что бы не использовать постоянно removeEventlistener можно задать опцию ONCE , и теперь нажатие
будет только один раз
, {once: true } делается это таким образом */

