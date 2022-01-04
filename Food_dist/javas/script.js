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
});