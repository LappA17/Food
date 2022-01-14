function closeModal(modalSelector) {

    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}
/* теперь modalSelector подставили в openModal и closeModal
    Тепреь когда будет вызыватьс эта функция она не будет знать с чем она работает, только по селектору
    она будет определять какой-то элемент и уже с ним работать
    И теперь мы помещаем modal = document.querySelector(modalSelector); в переменную modal
    И теперь веззде где есть openModal мы передаем modalSelector на всей странице
    closeModal то же самое */

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    console.log(modalTimerId);
    if(modalTimerId){
        clearInterval(modalTimerId);
    }
}
/* ТЕПЕРЬ ПОРАБОТАЕМ С TimerId 
    
    Здесь я понимаю что если моя функцию openModal работает с таким параметром modalTimerId, то
        я бы хотел получать его в качестве аргумента
    Дальше я хотел бы спросить, что если этот modalTimerId был передан или существует ли 
        он вообще , то только в таком случае я буду запускать clearInterval, if(modalTimerId) то я его
        запускаю очистку моего таймера
    У нас есть еще есть много переменных где openModal задействуется , по этому прям в modalSelector
        нам необходимо передать уникальный индфикатор нашего ТАЙМЕРА, который где-то будет создаваться.
        По этому мы создаем еще аргумент и подставляем его в function modal. И ТЕПЕРЬ Я БУДУ ПЕРЕДАВАТЬ
        ЭТОТ АЙДИ ВЕЗДЕ ГДЕ ВЫЗЫВАЕТСЯ ФУНКЦИЯ openModal, внутри функции modal 
    И теперь самый главный вопрос - откуда нам будет приходить аргумент(этот айдишник) с нашим таймером.
        Рас уж он будет использоваться во многих местах в modals, и так же в форме, то я просто возьму 
        и буду создавать этот таймер в SCRIPT.JS
    Я вырезаю const modalTimerId = setTimeout(openModal, 300000);
    
    closeModal(".modal"); /* Передаем селектор того модельного окна который будем закрывать в формс 
        в самом низу
    Сечас мы там в форме передавали ".modal" и modalTimerId и глоьально , там такая каша началась
        но за то теперь когда мы отправляем заявку нет никакой ошибки*/


function modal(triggerSelector, modalSelector, modalTimerId) {
/* Теперь я буду использовать triggerSelector, modalSelector когда буду вызывать функцию modal */

    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);
    /* мы вырезали data-modal и modal и поместили их в глобальный скрипт как аргументы функции 
    а вместо них тригер и модал селектор*/

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });
    /* Здесь есть одно НО, когда мы передаем callback функцию в обработчик события, то мне должны её 
        вызывать, а просто объявить. Она уже сама вызовится после клика, по этому не так 
        openModal(modalSelector), а вот так () =>  */

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal(modalSelector);
        }
    });

    
    // Изменил значение, чтобы не отвлекало

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};