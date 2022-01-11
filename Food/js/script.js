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

    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');

    //         element.classList.add("menu__item");

    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;
    //         document.querySelector(".menu .container").append(element);
    //     });
    // }

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

    /* ВСЕ СЛАЙДЫ В ХТМЛ ОБОРАЧИВАЕМ ЕЩЕ В ОДНУ ОБЕРКТУ c дивом
    offer__slider-inner
    делается это для того что бы главная обертко у нас была как окошка через который мы можем видеть
    текущий слайд*/

    const slides = document.querySelectorAll(".offer__slide"), //количество слайдов которое у меня есть на страничке
          prev =  document.querySelector(".offer__slider-prev"), //стрелочка для переключателя слайла влево
          next = document.querySelector(".offer__slider-next"), // вправо
          total = document.querySelector("#total"), // цыфра который показывает номер слайда условно 3 или 4
          current = document.querySelector("#current"), // поточная цыфра
          slidedsWrapper = document.querySelector(".offer__slider-wrapper"), /* wrapper нам нужен
          что бы при перекрутки слайдов мы не переключали его а передвигали по отношению к wrapper
          происходит это благодрая трансформ который мы будем принимать к иннеру*/
          slidesField = document.querySelector(".offer__slider-inner"), //поле с нашими слайдами, тот иннер что мы только что создали
          width = window.getComputedStyle(slidedsWrapper).width;
          /* нам нужно знать ширину блока который отвечает за слайдер, то-есть .offer__slider-wrapper
          то окошко через которое мы будем видеть наш слайдер. ПО ЭТОМУ нам изначально нужно получить ширину
          которая была предпринята по отношениж к этому блоку
          width = window.getComputedStyle(slidedsWrapper) - это в консоли есть такая фигня где ваня в прошлых уроках рассказывал
          как черещ computed можно смотреть в окне. А во внтурь помещаем мы тот элемент который нас 
          интересует
          
          window.getComputedStyle(slidedsWrapper) = тут вернется объект а благодаря width - я из него
          вытащу только ширину*/

    let slideIndex = 1; 
    let offset = 0; //создаем перемуную что бы понимать на сколько мы уступили влево,вправо при помощи трансформа

    if(sliides.length < 10){
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + "%"; /* все что необходимо это умножить количество слайдов на сто процентов
    
    % добавялем потому что мы записываем в css стили и передаем в виде строки потому что на там необходима 
    единица измерения
    
    ВСЮ ЭТУ ОППЕРАЦИЮ МЫ ДЕЛАЛИ ДЛЯ ТОГО ЧТО БЫ ВЗЯТЬ ВСЕ СЛАЙДЫ ЧТО ЕСТЬ НА СТРАНИЦЕ 
    И ПОМЕСТИТЬ В slides.Field и что бы они помещались полностью*/

    /*все дивы в которых находятся img со слайдерами могут быть разной ширины или высоты и не фиксированы */
    
    slidesField.style.display = "flex";/*у нас все слайдеры расположились сверху вниз а не в слайдере
    по этому мы обращаемся к флексам что бы разместить их по центру */
    slidesField.style.transition = "0.5s all"; /*теперь у нас верстка пошла по цента от того места
    где она была изначально аж далеко-далеко за межи страницы . ЧТО БЫ ЭТО ПОФИКСИТЬ НУЖНО ВЗЯТЬ
    НА wrapper и ограничить показ в нем элементов*/
    slidesWrapper.style.overflow = "hidden"; //теперь элементы которые скрыты от области видимости не попадают в наш wrapper

    /* теперь у нас есть иннер , в одну полоск расположены слайды и теперь что бы передвигать стрелочками
    наш слайдер мы будет трансформировать его сдвигом либо в лево либо в право что бы показывать нужный слайдер*/


    slides.forEach(slide => {
        slide.style.width = width; /*теперь мы точно уверены что все слайды одиноковой ширины и что все они 
        поместяться в slideField */
    });
    
    next.addEventListener("click", () => {

        if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))){ /*мы говорим что если наш ОТСТУП будет равен ширине одного слайда умноженого на количество слайдов - 1 то offset = 0 , а это значит что мы долистали до самого конца и нам необходимо вернуться к самому началу 
            (slides.length - 1) обернули в скобки для вышего приоритета

        а в переменной ширины у нас дословно лежит вот такое значение = "500px", то-есть строка, а если
        мы строку будем умножать на число то мы получим ошибку
        По-этому мы к width добавляем + что бы получить числовый тип данных
        и вспоминаем за метод slice который вырезает определенный участок строки и делать мы это будем начиная
        с 0го символа и так же нам необходимо исключить два последних сивола - для этого обращаемся к переменной
        берем ее длину и отнимаем два последних символа  */
            offset = 0;
        } else { /* если у нас это не последний слайд то мы будем использовать смищение
            мы используем коротки опператор добавления +=
            ДОСЛОВНО ЭТО ЗНАЧИТ что как только мы нажимаем стрелочку перемотки слайдера к нам добавляет 
            сразу новый слева который к нам смещается*/
            offset += +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) { /*если мой слайдиндекс будет равен количеству слайдов что вообще у меня
            есть на странице то я дошел до конца слайдер  */

            slideIndex = 1; // то мне необходимо вернуться на первую позицию
        } else {
            slideIndex++;
        }

        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    });
    /* когда я нажимаю на кнопочку вперед мне нужно двигать слайд
    для этого я обращаюсь к slidesField*
    
    translateX - это двигать слайдер по оси x и тут нам нужно четко сказать на сколько и куда мы будем смещать
    данный элемент. В css влево = минус , вправо = плюс 
    ${offset} = благодаря этому мы будем понимать на сколько мы хотим сдвинуться влево или вправо
    
    нам нужно при нажатие next придусмотреть конечный вариант передвижение , для этого прописываем 
    условие if */

    prev.addEventListener("click", () => { /*теперь для prev нужно все поменять местами по анлогии и что
        бы когда я нажимал на последнем слайде назад меня возвращало не первый слайд
        
        Здесь мы в условие должны проверять другое значение, ен последний сайт, а первый. А последний 
        слайд у нас будет когда offset будет равен 0
        
        Обрати внимание что здесь мы offset == 0 не примсваевыаем а именно сравниваем 

        offset = +wid... а здесь мы присваеваем наш последний слайд который вычесляется по той формуле
        что мы записали. 

        И по аналогии не добавялем а отнимаем - в ELSE
        */
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }
    
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) { // когда мы находимя на первом слайде при клике на кнопку придыдущего будет...
            slideIndex = slides.length; //при клики на предыд слайд мы будем смещатся в самый конец
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }
    });

    

    

 });
        