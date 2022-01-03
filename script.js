window.addEventListener("DOMContentLoaded", () => {

    const tabs = document.querySelectorAll(".tabheader__item"),
          tabsContent = document.querySelectorAll(".tabcontent"),
          tabsParent = document.querySelector(".tabheader__items");
    /* tabs - у нас будут те вкладки там где фитнес на которые мы будем кликать
    tabContent - это весь контент который будет находится в нашей верстке
    tabHeader - для того что бы назнаить оброботчик события на родителя для того что бы мы могли управлять
    потоками*/
    
    function hideTabContent () {
        tabsContent.forEach(item => { 
            item.style.display = "none";
        });
        tabs.forEach( item => {
            item.classList.remove("tabheader__item_active");
        });
    }
    /*первая задача скрыть все не нужные нам табы 
    
    tabsContent - это псевдомассив и мы его должны перебрать
    
    все табы закрыты 
    
    ("tabheader__item_active"); точку перед началом ковычки не ставим, мы и так работаем с классами
    ТабхедерАйтемАктив - это первый активный таб*/
    
    function showTabContent (i) {
        tabsContent[i].style.display = "block";
        tabs[i].classList.add("tabheader__item_active");
    
    }
    hideTabContent();
    showTabContent(0);//у нас есть аргумент i который мы должны передавать, по этому первый слайд 0
    /*здесь нужно строго понимать к какому элементы мы обращаемся, i = это номер 
    
    ТЕПЕРЬ КОГДА МЫ ЗАХОДИМ НА СТРАНИЧКУ МЫ МОЖЕМ СКРЫТЬ ВСЕ ТАБЫ И ПОКАЗАТЬ ТОЛЬКО ТОТ КОТОРЫЙ НАС ИНТЕРЕСУЕТ
    */
    /*function showTabContent (i = 0) {
        tabsContent[i].style.display = "block";
        tabs[i].classList.add("tabheader__item_active");
    
    }
    showTabContent() 
    ТЕПЕРЬ i будет по умолчонию равно 0 если я не задам в ручную нужный мне номер, это тоже самое что 
    и написанно где showTabContent(0) 
    это новый стандарт жс6*/
    
    tabsParent.addEventListener("click", (event) => { 
     const target = event.target;
    
     if(target && target.classList.contains("tabheader__item")) {//нужно что бы точно кликнуло в таб а не чучуть в ливее или в другую зону в родителя
        tabs.forEach((item, i) => {
            if(target == item){
                hideTabContent();
                showTabContent(i);//i-это номер элемента в котором в этом условие совпал
            }
        })
    });
    /*Здесь мы делигируем события , но новым способом :
    ЕСЛИ МЫ ЧАСТО ИСПОЛЬЗУЕМ event.target ТО МЫ ЗАДАЕМ ЕГО В НОВУЮ ПЕРЕМЕННУЮ
    это делается просто потому что писать targer удобней и быстрее чем евенттаргет,
    в будушем когда буду работать с огромными проектами это поможет 
    
    Там где ИФ - зачем мы это сделали, логика в том что когда мы кликнули в те табы, например фитнес , премиум
    постное или сбалансированное, то мы должны определить номер его в списке этих табов и по этому номеру
    вызвать функцию showTabContent. Сделать мы можем обычным перебором в переменной tabs = а это псевдомассив 
    И будем сравнивать что если элемент который находится в этом псевдомассиве совпадает с тем элементом 
    в который кликнул пользователь тогда мы берем его номер и показываем на странице !!!
    ВЫЗЫВАЕМ ДВЕ функции потому что когда мы переключаем табы, остальные нужно скрыть
    
    В САМОМ КОНЦЕ ИВАН ПРОПИСАЛ В css КОД, ДОБАВИЛ ТАМ АНИМАЦИИ И В 
    function hideTabContent () {
        tabsContent.forEach(item => { 
            item.style.display = "none";
        });
        tabs.forEach( item => {
            item.classList.remove("tabheader__item_active");
        });
        ПОМЕНЯЛ style.display = "none" НА classList.add ("hide")
        и на classList.remove("show", "fade")
        ТЕМ САМЫМ ДОБАВИВ АНИМАЦИЮ НА СТРАНИЧКУ*/
    });