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

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    //  Используем классы для карточек

    class MenuCard {
        constructor (src, alt, title, descr, price, parentSelector) {//аргументы мы брали с сайта src = это путь по корому мы получали наше изобрежение, алт = альтернативный текст и так далее все как в верстке
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelectorAll(parentSelector);//теперь в свойстве перент лежит именно дом элемент,до этого там были текста , срк, а сейчас именно дом
            this.transfer = 27; // курс доллара.но мы его в аргументы не помещали по этому он не будет к нам приходить 
            this.changeToUAH ();
        }
        changeToUAH() {//конвертация курса валют
            this.price = this.price * this.transfer;
        } 
        render() {
            const element = document.createElement("div");
            element.innerHTML = `<div class="menu__field">
            <div class="container">
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div> `//так мы обращаемся к новосозданному элементу в html, а innerHTML позволит динамически сформировать эту структуру. У нас будет этот див внутри еще одного дива который мы создали document.createElement("div")

                this.parent.append(element);//append это метод дом родителя. Создали мы этот метод для того что бы наш новый дом элемент мы поместили внутрь того же элемента
        }
    }
    const div = new MenuCard ();
    div.render(); //ЭТО ПЕРВЫЙ СПОСОБ ВСЕ ЗАПУСТИТЬ

    new MenuCard(
        "img/tabs/vegy.jpg", // это значение нужно передавать в ковычках
        "vegy",
        'Меню "Фитнес"',//здесь Фитнес находится в двойных ковычках, по этому нельзя их комбинировать
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!'
        9, //передаем как число в долларах
        ".menu .container "// это немного не понял зачем он сделал
    ).render();//это второй способ. То есть мы просто создаем объект и сразу вызываем метод render и он исчезнет потому что на него больше не будет ссылок, он только один раз отработал и он нам больше не нужен
});
/* создаем новый аргумент parentSelector и помещаем его в констуктор. Этот аргумент мы создали для того что бы у нас был родитель в который мы должны помещать все эти карточки. 
И соотвественно нам необходимо получить элемент со страницы в который мы будем пушить и сделаем мы это в констукторе с помощью this 

теперь мы удаляем <img src="img/tabs/vegy.jpg" alt="vegy"> и всю ту информацию которая к нам будет приходить как аргумент

<span>${this.price}</span> - сюда будет приходить значение уже через функцию changeToUAH в формате конвертации в доллар

теперь после всего этого у меня появилась 4 карточка 
представь что нам нужно создать еще пару карточек, нам нужно помнить за DONT REPEAT YOURSELF*/
new MenuCard(
    "img/tabs/vegy.jpg", 
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!'
    9,
    ".menu .container "
).render();

new MenuCard(
    "img/tabs/vegy.jpg", 
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!'
    9,
    ".menu .container "
).render();
//тепреь мы создали 3 новых карточки но в будущем мы так делать не будем из-за донтрепит юрселф. И ОЧЕНЬ ВАЖНО . В ВИДЕО ВАНЯ С КАЖДОЙ НОВОЙ КАРТОЧКИ КОПИРОВАЛ ПО НОВОЙ НОВОЕ ФОТО, ТАЙТЛ, АЛТ И ТАК ДАЛЕЕ, Я ЖЕ ПРОСТО ВСТАВИЛ И ПОМНЮ ПРО ТО ЧТО НУЖНО ВЕЗДЕ ВСЕ НОВОЕ ПОДОБРАТЬ ПОД НОВУЮ КАРТОЧКУ

//теперь нужно удалить с верстки данные этих старых картоек что бы у нас получилось не 6 ( 3 новые 3 старые и каждые две повторяются), а именно 3 новые карточки


