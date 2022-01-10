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
        modal = document.querySelector('.modal');

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

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 300000);
    // Изменил значение, чтобы не отвлекало

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

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => { /*отвечает за постинг данных когда мы отправляем их на сервер. Мы поместили url и data так как нам необхидмо дальше передавать url ссылку и данные которые будут поститься в этой функции */
        const res = await fetch(url, {/* res - то-есть result  а во внутрь будет возвращать промис который идет от fetch */
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        });
        return await res.json();//будем возвращать в json формате. 
    };
    /* даже опытные программисты совершают здесь ошибку, а именно забывают что этот код который мы только что писали - асинхронный, это значит что что пока нам прийдет ответ от сервера в fetch может пройти какое-то время а переменная res ждать не будет и она не знает что такое json безе фетча, по-этому нам нужно сделать 
    синхроный код
    
    мы ставим перед скобками const postData = (url, data) опператор async - тем самым говоря что у нас будет какой-то асинхроный код 
    а дальше нам нужно использовать его парный опператор await. Эти опператоры всегда используются в паре
    
    Теперь javascript дождется результата await и только тогда вернет res в котором уже будет fetch в json
    
    return await res.json() теперь наш код дожидается конца работы res.json и только потом его уже возвращает*/

    
    function bindPostData(form) { // а эта будет отвечать за привязку постинга
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
        
            const formData = new FormData(form);

            /* const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });  ПРИОБРАЗИМ КОД, ЭТОТ УЖЕ НЕ НУЖЕН */

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            /* БЛАГОДРАЯ МЕТОДУ Object.fromEntries МЫ ОБРАЩАЕМСЯ К ГЛОБАЛЬНОМУ ОБЪЕКТУ И ДЕЛАЙ ВСЕ
            НАОБОРОТ ОТ МЕТОДЕ  entries , а именно из массива делаем ОБЪЕКТ */

            /*const obj = {a: 23, b: 50};
            console.log(Object.entries(obj)) 
            Ваня хочет сделать тоже самое с переменно json что : из обхекта сделать массив*/

            /* fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(object)
            }) этот старый код уже не нужен*/
            postData('http://localhost:3000/requests', json)/* JSON.stringify(object)) /* по аналогии с url и data которые мы указывали в
            скобках в postData. теперь мы в ту функцию передали server.php и JSON.stringify(object) 
            
            Ваня сделал по элегентному и тепреь вместо JSON.stringify(object) мы получаем переменую json которые уже в себе содержит объект*/
            .then(data => { 
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    // NPM - это кусочки кода которые лежат на серверах проектов которые мы можем устанавливать себе в проекты для использования
// НИКОГДА НЕ ТРОГАТЬ ПАПКУ node_modules
// Если мы скачиваем с гитхаба проект и понимаем что нам нужны node_modules мы просто npm i прописывам в терминале

    fetch("http://localhost:3000/requests")
        .then(data => data.json()) //я говорю что я возьму ответ от сервере то-есть data и преврощу его в обычный javascript объект
        .then(res => console.log(res));//и тот результат что получится выведем в консоль
/* в консоли получим объект 

Ruslan@MacBook-Pro-EGO projectServer % npx json-server db.json

  
  \{^_^}/ hi!

  Loading db.json
  Done

  Resources
  http://localhost:3000/menu
  http://localhost:3000/requests

  Home
  http://localhost:3000

  Type s + enter at any time to create a snapshot of the database
Some error occurred Error: listen EADDRINUSE: address already in use 127.0.0.1:3000
    at Server.setupListenHandle [as _listen2] (node:net:1334:16)
    at listenInCluster (node:net:1382:12)
    at GetAddrInfoReqWrap.doListen [as callback] (node:net:1520:7)
    at GetAddrInfoReqWrap.onlookup [as oncomplete] (node:dns:73:8) {
  code: 'EADDRINUSE',
  errno: -48,
  syscall: 'listen',
  address: '127.0.0.1',
  port: 3000
}*/
});