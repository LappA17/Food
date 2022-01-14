        import tabs from './modules/tabs';
        import modal from './modules/modal';
        import timer from './modules/timer';
        import cards from './modules/cards';
        import calc from './modules/calc';
        import forms from './modules/forms';
        import slider from './modules/slider';
        import {openModal} from "./modules/modal";

window.addEventListener('DOMContentLoaded', function() {

    const modalTimerId = setTimeout(() => openModal(".modal", modalTimerId), 300000);
    /* Я говорю что я буду создавать переменную modalTimerId, которая записывает в себе уникальный модификатор
        таймера, который будет выполнен через опред промежуток времени.
    И здесь будет запускать функцию openModal,  но она должно в себя принимать два аргумента: селектор
        модельно окна, и уник модификатор таймера по этому мы передаем СТРЕЛОЧНУЮ ФУНКЦИЮ и сюда записываем
        openModal с определенным аргументами. Т.е у меня у меня через 300000 запуститься вот эта функция, 
        которая уже внутри себя запустит openModal 
    Так же нам нужно импортировать нашу функцию openModal*/
        

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    /* Наконец-то я понял, мы даем рандомные названия для аругментов :tabsSelector, tabsContentSelector, 
    tabsParentSelector, activeClass, и подставляем аргументам нужное нам значение:
      tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active')*/
    modal('[data-modal]', '.modal', modalTimerId);
    /* И наша большая функция тоже принимает этот индификатор */
    timer(".timer", "2022-02-25");
    cards();
    calc();
    forms("form", modalTimerId);
    slider({ /* Мы сюда передаем не какой-то один аргумент, а целый объект 
        Обрати внимание что в перемешку передавали аргументы и все нормально :) */
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
});