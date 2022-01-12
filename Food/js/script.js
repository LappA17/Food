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

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
            });
        });

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

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
    
        return await res.json();
    };

    async function getResource(url) {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    function bindPostData(form) {
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

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
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

    // Slider

    let offset = 0;
    let slideIndex = 1;

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector('.offer__slider-inner');

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent =  `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent =  slideIndex;
    }
    
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `; // Если хотите - добавьте в стили, но иногда у нас нет доступа к стилям
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        if (offset == (deleteNotDigits(width) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width); 
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex-1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex-1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent =  `0${slideIndex}`;
            } else {
                current.textContent =  slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = ".5");
            dots[slideIndex-1].style.opacity = 1;
        });
    });

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    // CALCULATOR
    /* в html добавляем уникальные индфикаторы мужчине и женщине, а именно id male female
    
        Дальше к каждому нужному элементу добавляем data-атрибут
        data-ratio="1.2" Мы каждой активности добавили свой коеифициент с рандомного диетологического сайта
        */

    const result = document.querySelector(".calculating__result span");
    /* Я буду получать главный элемент куда я буду все это дело запиывать
    .calculating__result span - это там где число с вашей суточной нормой каллорий  */

    let sex = "female", height, weight, age, ratio = "1.375"; /* Мы задали значеие женщине и активности
    потому что на сайте они подефолту горят зеленым и даже если я сразу не укажу пол и активность то
    они будут стоять по дефолту */
    /* пол, рост, вес, возраст, коеф активности = то что будет меняться  */

    function calcTotal () {
        if(!sex || !height|| !weight|| !age|| !ratio) {
            result.textContent = "____";
            return;
        }/* эту функцию мы будем запускать каждый раз когда будет какое-то изменение, если пользователь ввел 
    какое-то другой элемент или вел что то в инпуте, что бы мы могли нормально пересчитать значение
    СРАЗУ нужно сделать так что бы эта функия работала только тогда когда пользователь ввел абсолютно все 
    данные ВАШ ПОЛ, ВАША КОНСТИТУЦИЯ , ФИЗ АКТИВНОСТЬ.
    Что бы это сделать нужно что бы если хотя бы что-то одно из let sex, height, weight, age, ratio будет 
    false то функци не работает */
        if (sex === "female") {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
            /* формула с левого сайта того с диетой  */
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
        /* Math.round - округляет до ближйшего значения что бы не было условно 2100.41459595959, a 2100 */
    } 
    calcTotal ();

    function getStaticInformation (parentSelector, activeClass) {/* теперь нужно оживить наши div где ведите 
        ваш вес, рост и тд, потому что пока что это просто блоки в которые нельзя ничего ввести */
 /* parentSelector - мы будем применять нашу функцию getStaticInformation на нескольких элементах по этому 
 мы поместили parentSelector 
 И кроме этого мы будем менять класс активности activeClass, наша функция должна знать какой класс переключать
 по-этому мы помещаем в нее  */

        const elements = document.querySelectorAll(`${parentSelector} div`);
        /* Я говорю что внутри этого родителя я буду получать все div */

        /* В конце урока Ваня захотел поправить баг что когда мы кликаем чуть мимо дивов 
        с таблицами(рост, вес, пол, активноть и так далее, то-есть все) то у него ломается верстка
        Такое происходит потому что мы используем делегирование событий
        Нужно использовать просто навешивание событий
        И вместо того что бы вешать на родителя обработчик событий document.querySelector(parentSelector)
        мы вешаем обработчик событий на каждый элемент*/
        elements.forEach(elem => {
            elem.addEventListener("click", (e) => {
                if(e.target.getAttribute("data-ratio")){
                    ratio = +e.target.getAttribute("data-ratio");
            /*Дословно это значит что если пользователь кликнул на умеренная активнось, то мы просто берем 
            и вытаскиваем эту активность которая у него стоит внутри этого атрибута, а если низкая активность, 
            то у нас просто переключится значение, но если кликнет в пол то такое не сработает потому что
            там нет такого атрибута */
                } else {
                    sex = e.target.getAttribute("id");
                }
                /* если мы работаем с "выберите ваш пол", то мы работает с уникальными id которые мы туда
            поместили. А если работаем с "ФИЗ АКТИВНОСТЬ" то мы обращаемся к атрибуту data-ratio.
            ПО-ЭТОМУ мы пишем условие где говорим что если пользователь кликнул на элемент где есть
            атрибут data-ratio то мы работаем с ним, а если этого атрибута нет то будет работать
            "ваш пол" по айди */
    
                //console.log(ratio, sex); // просто посмотреть на значение переменной
    
                /* Теперь необходимо поработать с классами активностей */
                elements.forEach(elem => { /*говорич что каждый элемент внутри будет избавляться 
                    от своего аткивного класса */
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass) /* Тому Диву на который кликнет пользователь назначается
                класс Активности ! */
    
                calcTotal();
            });
        });
    }
        /* Это устаревший код, я его вырезал и поместил в elements.forEach(elem => {
            elem  вместо document.querySelector(parentSelector) */

        /*теперь мы должны отслеживать клики внутри родительского элемента parentSelector  */
       /* document.querySelector(parentSelector).addEventListener("click", (e) => {
            if(e.target.getAttribute("data-ratio")){
                ratio = +e.target.getAttribute("data-ratio");
        /*Дословно это значит что если пользователь кликнул на умеренная активнось, то мы просто берем 
        и вытаскиваем эту активность которая у него стоит внутри этого атрибута, а если низкая активность, 
        то у нас просто переключится значение, но если кликнет в пол то такое не сработает потому что
        там нет такого атрибута */
           /* } else {
                sex = e.target.getAttribute("id");
            }
            /* если мы работаем с "выберите ваш пол", то мы работает с уникальными id которые мы туда
        поместили. А если работаем с "ФИЗ АКТИВНОСТЬ" то мы обращаемся к атрибуту data-ratio.
        ПО-ЭТОМУ мы пишем условие где говорим что если пользователь кликнул на элемент где есть
        атрибут data-ratio то мы работаем с ним, а если этого атрибута нет то будет работать
        "ваш пол" по айди */

            //console.log(ratio, sex); // просто посмотреть на значение переменной

            /* Теперь необходимо поработать с классами активностей */
            /*elements.forEach(elem => { /*говорич что каждый элемент внутри будет избавляться 
                от своего аткивного класса */
           /*     elem.classList.remove(activeClass);
            });
            e.target.classList.add(activeClass) /* Тому Диву на который кликнет пользователь назначается
            класс Активности ! */

          /*  calcTotal();
        });
    } */
    getStaticInformation("#gender", "calculating__choose-item_active"); 
    /* Назначаем parentSelector, activeClass */
    getStaticInformation(".calculating__choose_big", "calculating__choose-item_active"); /* calculating__choose_big обязательно с точкой потому что это селектор */

    function getDynamicInformation(selector) { /*будет принимать в себя тот селектор инпута который нас 
        интересует */
        const input = document.querySelector(selector);
        /* дальше нам нужно отслеживать что пользоваьель ввел в инпут, например в ваш вес */
        input.addEventListener("input", () => { /*теперь нам нужно сказать что нужно делать когда пользователь
            что-то вводит */
            switch(input.getAttribute("id")){ /* Нам нужно проверить если пользователь кликает в инпут с 
                id условно рост, то мы записываем данное значение прям в переменную рост */

                /* внутри switch проверяем на строку */
                case "height":
                    height = +input.value; //у input есть какое-то значение
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
        /* ТЕПЕРЬ КОГДА МЫ ЧТО-ТО БУДЕМ ВВОДИТЬ, ФУНКЦИЯ БУДЕТ ОТТАЛКИВАТЬСЯ ОТ id И ВВОДИТЬ РЕЗУЛЬТАТ
        ВВОДА В ИНПУТ В ПЕРЕМЕННУЮ */   
            }
            calcTotal();
        });
    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

    /*  ПОМНИ ЧТО У НАС ЕСТЬ ФУНКЦИЯ calcTotal КОТОРАЯ ДОЛЖНА ПОСТОЯННО РЕАГИРОВАТЬ НА ТО ЧТО ВВЕЛ ПОЛЬЗОВАТЕЬ
    УСЛОНО УДАЛИЛ ЛИ ОН ЧТО-ТО ИЗ ВЕСА, ИЛИ ДОБАВИЛ НА В РОСТ НЕ 189 А 190, НЕ ДОПИСАЛ КАКИЕ-ТО ДАННЫЕ,
     ФУНКЦИЯ ПОСТОЯННО ДОЛЖНО  ПОДСТРАИАВТЬСЯ ПОД ЧТО ОН ВВЕЛ */

});