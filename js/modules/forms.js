import {closeModal, openModal} from "./modal";
import {postData} from "../services/services";

function forms(formSelector, modalTimerId) { /* Сюда тоже передаем аргумент modalTimerId */
    // Forms

    const forms = document.querySelectorAll(formSelector);
    /* Нам нужно 'form' вынести как аргумент, по-этому мы вместо 'form' создаем formSelector 
        А в самый главный файл помещаем просто селектор с тегом форм 'form'*/
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

   /*  const postData = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
    
        return await res.json();
    }; 
        Нам нужно перенести эту функцию в отдельную созданную папку services по приччине того что 
            когда мы работаем с сервером, то может быть в проекте много раз когда нам нужно с ней 
            взаимодействовать и нам лучше выносить в отдельную папку */



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
        openModal(".modal", modalTimerId); /* Точно так же передаем селектор модал и в глобальном скрипте передаем
        наш modalTimerId */

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
            closeModal(".modal"); /* Передаем селектор того модельного окна который будем закрывать */
        }, 4000);
    }
}

export default forms;