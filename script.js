const box = document.getElementById("box"),
      btns = document.getElementsByTagName("button"),
      hearts = document.querySelectorAll(".heart"),
      circles = document.getElementsByClassName ("circle"),
      oneHeart = document.querySelector (".heart");

console.dir(box);
/* мы посмотрим на бокс в качестве объекта. нужно помни что жс самое главное это объект, поэтому будут все свойства и методы
этого объекта , стили

СЕГОДНЯ БУДЕМ РАБОТАТЬ С ИНЛАЙН СТИЛЯМИ
ВСЕ СТИЛИ В ЖС ПИШЕМ ЧЕРЕЗ ТОЧКУ И ТОЧНО ТАК ЖЕ КАК В ССС*/
box.style.backgroundColor = "blue";
box.style.width = "500px"; //все передаем в ввиде строки. инлайн стили самые приоритетные в хтмл даже чем в самом ссс
btns[1].style.borderRadius = "100%";

circles.style.backgroundColor = "red"//БУДЕТ ОШИБКА(ОЧЕНЬ ЧАСТАЯ), ПОТОМУ ЧТО Я ОБРАЩАЮСЬ НЕ К ОБЪЕКТУ А ПСЕВДОМАССИВУ
circles[0].style.backgroundColor = "red" //так правильно

box.style.cssText = "background-color: blue; width: 500px" 
box.style.cssText = `background-color: blue; width: ${num}px` //даже можно переменную подставлять

for (let i = 0; i < hearts.length; i++) {
hearts[i].style.backgroundColor = blue;
}

/* если хотим обратиться к многим классам условно , то с помощью цикла фор 
i <h1 hearts.length = наш цикл будет работать до тех пор пока у нас отстануться эллементы в этом псевдомассиве 
hearts[i] - итератор ставят в эти квад скобки что бы постепенно с 0 эллемента до последнего их получать */

hearts.forEach(item => {
    item.style.backgroundColor = "blue"
} // БУДЕТ РАБОТАТЬ ТОЧНО ТАК ЖЕ КАК ФОР , ТОЛЬКО ТАК ЛЕГЧЕ

const div = document.createElement("div");
/* во внутрь помещаем название того тега который мы создаем
он существует только внутри джаваскрипта*/
const text = docuent.createTextNote ("Тут был я ")//такой метод очень редко используется но на страницу появится тут был я

div.classList.add("black")
./* МЫ ДОБАВИЛИ КЛАСС КОТОРЫЙ ЕСТЬ ТОЛЬКО В ЖС */

// ЗАДАНИЕ: нужно добавить наш ДИВ в конец бади 
document.body.append(div);
//теперь будет черный фон из-за div.classList.add("black") в конце бади (в конце страницы)

const wrapper = document.querySelector(".wrapper")//но если мы используем его только один раз!ПЕРЕМЕННУЮ можно не задавать!
document.querySelector(".wrapper").append(div)
/* это переводится так: я обращаюсь к классу враппер и прям на нем использую метод аппенд */
wrapper.prepend(div);
//ПОМЕЩАЕМ ДИВ В НАЧАЛО РОДИТЕЛЯ
hearts[0].before(div)
//помещаем перед 0 хартс наш ДИВ
hearts[0].after(div) 
//появился после
circles[0].remove;
//просто удаляет
hearts[0].replaceWith(circles[0]);
//сначала указывает какой эллемент хотим заменить, потом на какой

wrapper.appendChild(div)// ТОЖЕ САМОЕ ЧТО И РАНЬШЕ ТОЛЬКО СТАРЫЙ СПОСОБ КОТОРЫЙ МОЖЕТ ВСТРЕТИТЬСЯ В СТАРОМ КОДЕ
wrapper.insertBefore(div, hearts[0])//ТОТ ЖЕ СТАРЫЙ СПОСОБ , СНАЧАЛА ЧТО НА ЧТО ЗАМЕНЯЕМ, ЧТО ЗАМЕНЯЕМ, НО ЭТО СТАРЫЙ СПОСОБ
wrapper.removeChild(hearts[1])//старый способ
wrapper.replaceChild(div, hearts[0])//СТАРЫЙ СПОСОБ, СНАЧАЛА НА ЧТО ЗАМЕНЯЕМ, И ЧТО ЗАМЕНЯЕМ

div.innerHTML = "Hello World"; //добавили в див Хелло Ворлд 
div.innerHTML = "<h1>Hello World<</h1>";//теперь будет в виде заголовка :)

div.textContent = "HELLO";//точно так же, но он работает только с текстом , ТУДА ХТМЛ ТЕГ НЕЛЬЗЯ ВСТАВИТЬ 

div.insertAdjacentHTML("beforebegin", "<h2>Hello</h2>")
/* там где первы ковычки можно вставить 4 слова 
afterbegin; afterend; beforebegin; beforeend
Если мы введем бефорбегин к примеру то мы увидим что мы вставил хтмл код прям перед этим элементом
афтербегин в начало ставляет
бефоренд в конец
афтеренд после элемента*/

const   wrapper = document.querySelector(".wrapper"), 
        hearts = document.querySelectorAll(".heart"),
        oneHeart = wrapper.querySelector (".heart");

hearts[0].replaceWith(circles[0]);
/* ЭТО ЗНАЧИТ ЧТО ПЕРЕМЕННЫЕ хертс И ВАНХАРТ ПОЙДУТ ТОЛЬКО ТЕ ЭЛЕМЕНТЫ КОТОРЫЕ ПОДОЙДУТ ПО ОПРЕДЕЛЕНОМУ СЕЛЕКТОРУ .heart условно
и находится внутри wrapper*
Таким образом я говорю внутри чего я ищу
hearts[0].replaceWith(circles[0]); - и это будет работать
ЭТО ПРОСТО НУЖНО ПОМНИТЬ ЧТО ТАКОЕ ВОЗМОЖНО
/
