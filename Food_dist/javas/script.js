window.addEventListener('DOMContentLoaded', function() {
    
    // TABS 

	let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
	});

    // TIMER

const deadline = "2022-03-01";

function getTimeRemaining(endtime) {
    const t = Date.parse (endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000*60*60*24)),
          hours = Math.floor((t / (1000*60*60) % 24)),
          minutes = Math.floor((t / 1000 / 60) % 60),
          second = Math.floor((t / 1000) % 60);
    
    return {
        "total": t,
        "days": days,
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds
    };
}   

/*создаем функцию которая будет определять разницу между дедлайном и нашим текущим временем 
"2022-03-01" - эту строку рекомендуется использовать, но нужно ее превратить во что-то осизаемое, то что мы сможем
использовать и сделаем мы это благодаря Date.parse ()  
Date.parse (endtime) - здесь мы получим милисекунды которые будут в нашем конечном времени к которому нам нужно дойти
дальше так как нам необходимо найти разницу мы просто отнимаем нашу текущую дату в количестве милисекунд

дальше используем такую команду как Math.floor() - это округление до ближайшего целого и во внутрь мы ложем переменую
t где находится к-ство милисекунд и мы его делим на произведение 1000*60 (так мы получаем кство мс в одной минуте)
дальше еще на 60 что бы получить в одном часе и дальше еще на 24 что бы в днях
И теперь когда мы поделили t на дневную сумму мс, мы получим сколько времени останится до конца даты deadline а хвостик 
что там останится просто отбросится благодаря опперации math.floor

в hours делим к=ство мс что осталось в t на кство которое осталось в одном часе
((t / 1000*60*60)) -  мы получим общее кство часов которое нам осталось до этого таймера deadline

% опператор который делит что-то на что-то в нашем случае 24 и возвращает нам остаток от деления : к примеру
если 5 поделить 2 , то опператор вернет 1 потому что 1 уже никуда не идет

% ставим перед 24 потому что в одном дне 24 часа и перед минутами потому что в одной минуте 60 секунд и ровно как и в днях
мы получим хвостик который будем отображать на сайте сколько осталось до конца акции и он будет не больше 24 часов и не больше
60 минут

опператор return используем что бы вернуть ф-цию внаружу, но при этом мы будем возвращать объект помни что в {} = хранится
объект

мы создаем свойство total = общеее воличество мс и в него помещаем t . Он нам в будущем еще понадобиться потому что а 
вдруг таймер уже закончился и здесь будет отрицательно значение , потому что дату к которой мы стремились уже прошла */

    function getZero(num) {
        if (num >= 0 && num<10) {
            return `0 ${num}`;
        } else {
            return num;
        }
    }
/* добавляем 0 что бы было понятней  пользователю

эта фция в себя будет принимать какое-то числа и что-то делать внутри, оно больше или ровно 0 И условие 
выполнится только тогда когда число меньше 10 

если это произошло условие то мы возвращаем модифицированное значение через ` и можно заметить что мы 
числовый тип данных возвращаем через строку но в этом нет абсолютно никакой проблемы потому что мы строчку
просто помещаем на страницу

и если вдруг нам приходит число больше 10 , например 20,30, то в else мы просто возвращаем это число
без каких либо изменений

Что бы все это пременилось в нужном нам месте мы 
теперь передаем ф-цию getZero в days.innerHTML + hours + second + minutes */

function setClock (selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector("#days"),//просто ищем внутри таймера с уникальным айди
          hours = timer.querySelector("#hours"),
          minutes = timer.querySelector("#minutes"),
          seconds = timer.querySelector("#seconds"), // это все нужно было что бы просто получить элементы со страницы 
          timeInterval = setInterval(updateCLock, 1000);

    updateCLock();
    
    function updateCLock () {
        const t = getTimeRemaining(endtime);

        days.innerHTML = getZero (t.days);
        hours.innerHTML = getZero (t.hours);
        minutes.innerHTML = getZero (t.minutes);
        seconds.innerHTML = getZero (t.seconds);

        if(t.total <= 0) {
            clearInterval(timeInterval);
        }//если время уже вышло то мы наш таймер не обновляем 

    }

}
setClock(".timer", deadline);
/*напишем функцию которая будет устанавливать наш таймер прям на страничку 
с помощью timer достаем элемент со страницы 
timer = document.querySelector(selector) и дальше мы от этого таймера можем уже отталкиваться а делаем мы это для того что бы
в будущем была возможность создавать еще какие то таймеры на странице 

updateCLock фция нужна что бы обновлять наш таймер каждую секунду 
эта фция будет содержать три самых главных действия

const t = getTimeRemaining; во первых это рассчет того времени которое у нас осталось прям на эту секунду , для этого
мы воспользуемся этой ф-цией , потому что она нам будет возвращать объект return все что там есть

и мы передаем в нее endtime - тот дедлайн которые мы будем передавать setClock

теперь нужно рассчетные величины которые мы получили поместить на страницу благодаря days.innerHTML (но так же можно
и через textContent)

еще раз t - это результат всей той работы что мы сделали сначала 

timeInterval = setInterval(updateCLock, 1000); - мы создаем для того что бы функция запускалась каждую секунду , что бы на 
сайте каждую секуду менялось значение таймера

const t = Date.parse (endtime) - Date.parse(new Date()),
"total": t
мы понимм что мы изначально рассчитали эту переменую, и теперь будем ее использовать ведь в ней содержаться кство мс
которое у нас там есть

ТЕПЕРЬ таймер работает но есть два микро бага: 1) при обновление странички мегает верстка таймера 2)нужно добавить 0
либо к часам либо к дням что бы отличатлось
1) вызываем фцию updateClock в самом начале. Прям сейчас из-за того что в setClock интервал запускается с 1000 мс 
проиходит мигание верстки по этому мы вручную запустим updateClock
 */

//Создаем форму свяжитесь с нами где нужно оставить имя и номер телефона

/* на html странице нужно задать data атрибуты, потому что разные теги могут иметь одно и то же действие
по этому легче всего задавать это дейсвтие по data атрибуту , по-этому на кнопку свяжитесь со мной я пишу
data атрибут . на 21 и 89 есть две кнпопки свяжитесь со мной и в них задаем дата атрибут

теперь нам нужно повести data close на какой-то элемент, на хтмл это 294 строчка, там есть modal_close
и туда мы прописываем дата атрибут клоуз*/

    const modalTrigger = document.querySelector("[data-modal]"),
          modal = document.querySelector(".modal"),//переменая которая отвечает за самое переменное окно
          modalClose = document.querySelector("[data-close]");

    // [] - что бы получить через дата атрибут элемент со страницы
// НАМ НУЖНО БУДЕТ ДВЕ ФУНКЦИИ : ОДНА КОТОРАЯ ОТВЕЧАЕТ ЗА ОТКРЫТИЕ МОДЕЛЬНО ОКНА ПОСЛЕ НАЖАТИЯ СВЯЖИТЕСЬ
// С НАМИ, А ВТОРАЯ ЗА ЕГО ЗАКРЫТИЕ

/*     const modalTrigger = document.querySelector("[data-modal]") ПЕРВЫЙ ВАРИАНТ С ОДНОЙ КНОПКОЙ А НЕ АЛЛ
потому что нужно для начала проверить или все будет работать с одной кнопкой, если да то уже переведем на все
*/
modalTrigger.addEventListener("click", () => {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
});
/* когда мы кликаем на эту кнопочку нам должно показаться модельное окно, это значит что нам нужна переменная modal
добавляем в нее класс который отвечает за показ и скрытие, а именно show
и нужно убрать класс hide если он вдруг появился 

теперь мне нужно сделать обратную опперацию*/

modalClose.addEventListener("click", () => {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
});
/* теперь делаем все тоже самое для modalClose только меняем местами хайд и шоу

ТЕПЕРЬ НУЖНО ЗАФИКСИРОВАТЬ СТРАНИЦУ ЧТО БЫ ОНА НЕ СКРОЛИЛАСЬ КОГДА ПОЯВЛЯЕТСЯ МОДЕЛЬНО ОКНО
за прокрутку отвечает свойсвто overflow
делаем мы это все в  modaltrigger*
я обращаюсь к корневому тегу body потом к нему приписываю стайл оверфлай и в него хайден
теперь когда я открываю модельное окно нам добавляется стиль который запрещает прокручивать модельное окно
Главное не забыть что когда мы закрывает модельное окно нам нужно востановить скрол и для этого в modalClose
нужно поставить все то же самое только ковычки пустые оставить и браузер сам решит что ему там делать */

//ТЕПЕРЬ ВТОРОЙ ВАРИАНТ РЕШЕНИЯ ДАННОЙ ЗАДАЧИ ЧЕРЕЗ toggle

// 1) закрываем модельное окно в хтмл на 290 странице modal hide. То-есть мы будем отталкиваться от того что наше моде
//льное окно изначально скрыто

modalTrigger.addEventListener("click", () => {
    modal.classList.toggle("show");
    document.body.style.overflow = "";
});

modalClose.addEventListener("click", () => {
    modal.classList.toggle("show");
    
    document.body.style.overflow = "";
});
/* toggle -  переключатель. Если класса такого нет то он его добавить, а если он есть то мы его уберем*/

const modalTrigger = document.querySelectorAll("[data-modal]"),//изначально стояло без all. теперь добавили all
          modal = document.querySelector(".modal")
          modalClose = document.querySelector("[data-close]");
});

//Задача на несколько кнопок сделать этот обработчик событий. НА САЙТЕ ТАКИХ КНОПОК МОЖЕТ БЫТЬ БОЛЬШЕ 2-3 
//Нужно моделтригер перебрать потому что мы не можем работать напрямую с псевдомассивом

modelTrigger.forEach(btn => {
    btn.addEventListener("click", () => {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
})

modalCloseBtn.addEventListener("click", () => {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
});

/* бывает такое что закасчик хочет что бы модельное окно закрывалось при клике на escape или после нажатие на серую кнопку
перевзонить мне
*/

modal.addEventListener("click", (e)/*главное передаем объект события e*/ => {
    if(e.target === modal) {
        modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
    }
});
/*  e.target - это куда кликнул пользователь 
сначала навешиваем обработчик событий на модельное окно(НАМ НУЖНО СДЕЛАТЬ ТАК ЧТО ЕСЛИ ПОЛЬЗОВАТЕЛЬ КЛИКАЕТ ЗА МОДЕЛЬНОЕ
ОКНО СВЯЖИТЕСЬ С НАМИ ЧТО МЫ ЭТО ОКНО ЗАКРЫЛОСЬ

если пользователь кликает СТРОГО на модельное окно то происходят все те же дейсвтие что мы описывали ранее в modalClose!!!
 и если мы сейчас
кликнем левее модельного окна то оно закрывается

DONT REPEAR YOUR SELF - правило писание кода что бы ВАШ КОД НЕ ПОВТОРЯЛСЯ БОЛЬШЕ 1ГО РАЗА, ОБРАТИ ВНИМАНИЕ ЧТО ИВАН ВЫНЕС
МОДАЛ КЛОУЗ В if e.target. ПО-ЭТОМУ ЛУЧШЕ ПРОСТО СОЗДАТЬ Ф-ЦИЮ ЧТО БЫ НЕ БЫЛО ПОВТОРЕНИЕ КОДА*/

function closeModal () {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
};

modalCloseBtn.addEventListener("click", closeModal);
/* сначала создали ф-цию, туда все те же значение передаем что мы назначли для modalClose и самое главное мы в 
modalClose просто передаем эту ф-цию посел клика  */

modal.addEventListener("click", (e)/*главное передаем объект события e*/ => {
    if(e.target === modal) {
        closeModal();
});
/* теперь передаем фцию closeModal в условие и самое главное ее вызываем 
ВОТ ТАК ДОЛЖЕН ПИСАТЬСЯ КОД ПО ПРАВИЛЬНОМУ БЕЗ ПОВТОРЕНИЙ*/

//теперь escape 

document.addEventListener("keydown",(e) => {
    if(e.code === "Escape") {
        closeModal();
    }
});
//вешаем событие на документ а не на элемент
/* keydown - это событие которое позволяет отлавливать кнопки на клавиатуре после их нажатия
нам опять понадобыться элемент события 

у объекта события e есть свойство code
а у этого code есть все клавиши 
просто пиши в гугле event.code и там все кнопки от Ескейп до пробела

ТЕПЕРЬ СДЕЛАЕМ ТАК ЧТО БЫ НАШЕ МОДЕЛЬНОЕ ОКНО РЕАГИРОВАЛА НА КЛАВИШУ ЕСКЕЙП ТОЛЬКО ТОГДА КОГДА ОНО ОТКРЫТО*/
document.addEventListener("keydown",(e) => {
    if(e.code === "Escape" && modal.classList.contains("show")) {//если класс modal будет равен show тогда все будет работать
        closeModal();
    }
});

//сделаем так что бы модельно окно появлялось когда пользователь находится на сайте 15 секунд

function openModal () {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden"
} //modelTrigger там уже не нужно это все, мы задали функцией как и с клоуз

const modalTimerId = setTimeout (openModal, 15000);//внутрь прописываем функцию открытие модельного окна
/* теперь модельное окно появляется после того времени что мы задали, но НАМ НУЖНО СДЕЛАТЬ ТАК ЧТО ЕСЛИ ПОЛЬЗОВАТЕЛЬ
УЖЕ ОТКРЫВАЛ МОДЕЛЬНО ОКНО ТО ОНО ЕМУ УЖЕ НЕ ДОЛЖНО ВЫСКАКИВАТЬ*/

function openModal () {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden"
    clearInterval(modalTimerId);//теперь благодаря этому не будет открывать мод окно если пользователь его уже вызывал

    //теперь задача если ПОЛЬЗОВАТЕЛЬ ДОЛИСТАЛ ДО КОНЦА СТРАНИЦУ ТО ЕМУ ПОКАЗЫВАТЬ МОД ОКНО

    window.addEventListener("scroll", () => {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
        }
    })
/*document.documentElement.clientHeight -видимая часть которуя мы прям сейчас видим на сайте, без какой-то там прокрутки

pageYOffset - метод который отслеживаем окно, а именно оконные кординаты Y 

в самом конце после scrollHeight Ваня сказал что они с учениками на некоторых браузерах обнаружили баг, что так скрипт не работает и он сказал что просто нужно в конце поставить минус 1 пиксель, то-есть СКРИПТ БУДЕТ РАБОТАТЬ ЗА 1ПИКСЕЛЬ ДО КОНЦА ПРОКРУТКИ СТРАНИЦЫ 
if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {

Ну и в конец помещаем команду openModal, пользователь долистал до конца и все у него появляется ф-ция открытия модельного окна

Теперь у нас другая проблема, после того как пользователь постоянно долистывает до конца у него постоянно будет появляться модельное окно*/

function showModelByScroll () {
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal();
        window.removeEventListener("scroll", showModelByScroll);
    }
}
window.addEventListener("scroll", showModelByScroll);

/* создадим ф-цию и в конце этой функции добавим window.removeEventListener("scroll", showModelByScroll

ЧТО БЫ УДАЛИТЬ КАКОЙ-ТО ОБРАБОТЧИК СОБЫТИЙ МЫ ДОЛЖНЫ ДЕЛАТЬ ССЫЛКУ НА ФУНКЦИЮ КОТОРАЯ ИСПОЛНЯЛАСЬ 

window.removeEventListener передаем четко что я назачал: какое событие и какую функцию. а именно "scroll", showModelByScroll
*/


 








};
