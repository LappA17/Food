window.addEventListener('DOMContentLoaded', function() {

    // Tabs
    
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
    
    // Timer

    const deadline = '2020-05-11';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }
    
    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal();
        }
    });

    // const modalTimerId = setTimeout(openModal, 3000);
    // Закомментировал, чтобы не отвлекало

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    // Используем классы для создание карточек меню

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH(); 
        }

        changeToUAH() {
            this.price = this.price * this.transfer; 
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        ".menu .container"
    ).render(); 

    // Forms

    const forms = document.querySelectorAll("from"); //начнем с получения всех форм которые у нас есть на странице по тегу form

    const message = { // этот объект будет содержать список всех фраз которыя я хочу показывать в разных ситуациях
        loadind: "загрузка",
        success: "спасибо, скоро свяжимся",
        failure: "ошибка"
    };

   forms.forEach(item =>{ //нужно взять все наши формы и уже под каждую из них подвязать функцию postData
    postData(item);
   }); 

    function postData(form) { // эта функция будет принимать в себя какуе-то form и эта функция будет отвечать за постинг данных. Мы передаем какуе-то форму потому что нам на эту форму будет легко просто взять и навесить обработчик событий
        form.addEventListener("submit", (e) => {// submit срабатывает каждый раз когда мы пытаемся отправить какуе-то форму. На сайте есть кнопка перезвоните мне, и когда мы заполняем данные и отправляет то сабмит срабатывает каждый раз как это происходит и отправляет данные нам на сервер.

        /* добавляем e потому что нам нужно отключить стандартное поведение браузера, потому что каждый раз как мы отправляет форму страничка перезагружается*/
            e.preventDefault();

            const statusMessage = document.createElement ("div"); //создаем переменую с новым элментом на странице для того что бы реализовать новосозданную переменую message 
            statusMessage.classList.add("status");

            statusMessage.textContent = message.loadind; //  во внутрь нашей переменной благодаря textContet помещаем сообщение которое мы хотим показать пользователю в ответ на его действие. Самое первое это загрузка потому что как только он что-то сделал происходит сначала загрузка, он увидет это смс только в случае очень медленого интернета

            form.append(statusMessage); //теперь очень важно отправить это сообщение statusMessage куда-то на страницу ведь пока что он существует только в javascript

            const request = new XMLHttpRequest();//помни что всегд опен вызывается что бы настроитьXMLHttpRequest 
            request.open("POST", "server.php");// сервер.пхп - путь на который мы будем ссылаться
            
            //request.setRequestHeader("Content-type", "multipart/form-data"); //сначала ваня сделал тот код чо ниже (формДата) и потом пошел делать вот эти заголовки
            /* !!! сейчас когда мы используем связку XMLHttpRequest + FormData, то нам заголовок устанавливат не нужно - он устанавливается автоматически. ЭТО ОЧЕНЬ ВАЖНЫЙ НЮАНС !!!  */

            // ТЕПЕРЬ РАЗБЕРЕМ ЕСЛИ ДАННЫЕ НУЖНО ПЕРЕДАВАТЬ В ФОРМАТЕ JSON (Это Ваня в конце видео показал как в формате не FormData а JSON данные передавать)

        request.setRequestHeader("Content-type", "application/json"); // это прийдется уже расскомментировать

            const formData = new FormData(form);// ОЧЕНЬ ВАЖНО new FormData - это такой же тип данных как JSON ! переменная formData будет в себе помещать все данные отправленные пользователем (тоже ввиду формат, ключ, значение). В new FormData мы помещаем форму из котороя нам нужно собрать данные, то-есть (form). 

            const object = {}; // что бы поменять данные FormData на JSON мы создаем новый объект
            formData.forEach(function(value, key) { //метод forEach переберет все в form что бы потом поместить в object.
                object[key] = value; //то-есь на основание тех данных которые были в formData мы мы сформулируем object при помощи обычного перебора
            });

            const json = JSON.stringify(object);//этот метод привращает обычный объект в json. И ТЕПЕРЬ ВСЕ ЧТО НА НУЖНО СДЕЛАТЬ ЭТО ВЗЯТЬ json  и пометсить reques.send(json) вместо форм дата


            /* ЗДЕСЬ ЕСТЬ ОЧЕНЬ ВАЖНЫЙ МОМЕНТ КОТОРЫЙ ЗАВИСИТ ОТ ВЕРСТАЛЬЩИКА И КАК СВЕРСТАНЫ ИНПУТЫ(ЛИБО ОПШИНЫ ЛИБО ТЕКСТ ЕРЕА) - ТО ЕСТЬ ТЕ ДАННЫЕ КОТОРЫЕ БУДУТ ИДТИ НА СЕРВЕР, МЫ ДОЛЖНЫ АБСОЛЮТНО ВСЕГДА ЗАДАВАТЬ АТРИБУТ name (и name не должны повторяться) */

            request.send(formData); // отправляем форм дата которая была основана на основание того всего что мы написали 

            request.addEventListener("load", () => { //мы отслеживаем load - конечную загрузку нашего запроса
                if (request.status === 200 ) {
                    console.log(request.response); // нам нужно пользователя проинформировать что все хорошо, ты все правильно сделал, идеальный пример это как с на нашем сайте т500 после того как пользователь оставил свои данные - ему приходила инфа наш менеджер с вами свяжиться. По этому мы сейчас вверху создаем новую переменую message

                    statusMessage.textContent = message.success;// если все хорошо то будет сюксес и помещаем мы это в условие где request.status === 200 - очень хорошо

                    form.reset();//форма очиститься, то-есть имя и номер телефона что мы указали просто пропадут после того как пользователь оставил заявку

                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);//это что бы надписа спасибо мы с вами свяжимся пропала через 2 секунды

                } else {
                    statusMessage.textContent = message.failure;
                }
            }); 

        }); 



    }
    // CMND + SHIFT + R = СБРОСС КЕША, ПОСЛЕ КАЖДЫХ ИЗМЕНЕНИЙ НА СЕРВЕРЕ, ВСЁ НОВОЕ ЧТО Я СДЕЛАЛ ДОЛЖНО ПОДГРУЗИТЬСЯ ПОСЛЕ СБРОССА КЕША
});