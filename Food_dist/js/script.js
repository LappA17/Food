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
        /*modalCloseBtn = document.querySelector('[data-close]'); - в 54 уроке мы ее удаляем */

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
    
    //modalCloseBtn.addEventListener('click', closeModal); эту тоже удаляем 

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute("data-close" == "") {
            closeModal(); 
        } // или е-таргет будет этим крестиком непосредственно , благодаря тому что мы можем получить этот атрбиту благодаря команде гетАтрибут и в него поместим data-close, и нам нужно поместить в него пустую строку потому что это крестик. И теперь даже в том модельном окне что мы только что создали крестик тоже будет работать
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);
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
        loading: 'img/form/spinner.svg', // самое главное теперь правильно использовать это изображение и для этого мы смотрим где оно использовалось, в 232 div мы меняем на img 
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement("img")//('div'); был див стал img тег
            statusMessage.src = message.loading//classList.add('status'); у нас класса статус вообще не  существовало по этому там где див был мы поменяли на тег img  и этому тегу img добавляем атрибут src вот так :) statusMessage.src = message.loading 
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `//textContent = message.loading; это уже не надо а надо добавить новые стилистические данные, что бы изображение было по центру
            /* теперь появится крутящиеся кружочек после того как пользователь оставляет заявку и ему показывается что она обрабатывается  */
            //form.appendChild(statusMessage); это мы удаляем потому что спиннер крутится в перезвонить мне а не по центру экрана и добавляем команду ниже  
            form.insertAdjacentElement("afterend", statusMessage) //  теперь спинер распологается под формой
        
            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });
            const json = JSON.stringify(object);

            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    /*statusMessage.textContent*/showThanksModal(message.success) = message.success;
                    form.reset();
                    statusMessage.remove();
                    /*setTimeout(() => {
                        statusMessage.remove();
                    }, 2000); мы освобождаем от таймаута потому что у нас statusMessage будет использоваться только для loading. И теперь для statusMessage будет использоваться уже модельное окно
                    По этому мы удаляем  statusMessage.textContent и там где он был мы начнем вызывать нашу новую созданную функию */
                } else {
                    /*statusMessage.textContent*/ showThanksModal(message.failure); //то-есть теперь мы будем не statusMessage модифицировать а помещаем сообщение в данную функцию 
                }
            });
        });
    }

    // теперь будем создавать модельное окно как в т500 thanks , что тебя перебрасывает на мод окно с спасибо за покупку наш менедежр отзвонит, оно еще thanks называлось 

    function showThanksModal(message){ // смс о статусе отправки будем передавать как аргумент message и добавим его в новосозданное модельное окно и на самом деле мы будем брать этот аргумент из объекта создного выше 

        const prevModalDialog = document.querySelector(".modal__dialog"); // у нас на страничке уже есть модельное окно, когда мы до этого делали свяжитесь со мной, и нам нужно его сейчас получить что бы после того как пользователь оставлял заявку это модельное окно заменялось другим. Важно что мы модельное окно для пользователя старое не удаляем а просто скрываем

        prevModalDialog.classList.add("hide"); // таким образом с помощью класса hide мы можем скрыть модельное окно
        openModal(); //будет открывать новое модельное окно

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");// добавляем к новому окну тот же класс что бы мы один модел дайлег заменяли другим

        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>`;
/*modal__close - это класс где находится крестик закрытия окна , я его скопировал прям с html .
ОЧЕНЬ ВАЖНО а тот тут запутанно всё, этот крести там где дата клоуз был создан не автоматически благодаря html а динамически , вручную мной, я его вставил с верстки, по этому он функционально работать не будет, но тут мы вспоминаем что у нас есть функция закрытия модельного окна modalCloseBtn которую мы делали намного раньше (код в строке 101 и 120) 

теперь рас уж мы создали этот элемент внутри джаваскрипта нам нужно поместить его на страницу*/

document.querySelector(".modal").append(thanksModal); //  теперь наш элемент появится на странице, но если все так оставить то форма просто удалится, нам нужно сделать так что бы клиент всегда мог видеть форму на сайте для повторной отправки

setTimeout(() => {
    thanksModal.remove();
    prevModalDialog.classList.add("show");
    prevModalDialog.classList.remove("hide");
    closeModal();// из-за того что у пользователся начинается удалятся наша модалка и показываться предыдущий контент то мы просто должны закрыть модельное окно
}, 4000);
    
}; // Я СКАЧАЛ spinner.svd / потом в папке img создал папку form и в нее поместил спинер свжи и теперь что бы использовать эту картинке и вместо loading в measse подставляем путь к этой картинке
}); 