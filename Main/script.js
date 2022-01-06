const log = function(a, b, ...rest) { //эта функция у нас принимает аргумент a, b обязательно, а вот дальше мы уже не знаем сколько аргументом будет у этой функции, может еще 1, может 0 или 1000
    console.log(a, b, rest);
}
log("basic", "rest", "operator", "usage");
// rest опператор записывается всегда последним как ... и назвать его можно как угодном, можно ...rest можно ...c То-есть rest опператор формулирует все отсавшиеся и делает из него МАССИВ 
/* [Running] node "/Users/Ruslan/Desktop/Work/Project/Main/tempCodeRunnerFile.js"
basic rest [ 'operator', 'usage' ]*/

function calcOrDouble (number, basis) {
    console.log(number * basis);
}
calcOrDouble(3,5);
//будет 15, но что если я хочу сделать так что бы не было второго аргумента и он подставлялся по умолчанию
function calcOrDouble (number, basis) {
     basis = basis || 2; //бейсис ровно бейсис или 2, ОППЕРАТОР ИЛИ ВЕРНЕТ 1 ПРАВДУ. Если мы не зададим значения для бейсис то он превращается в undefined , андефайнд у нас равняется false , а 2 ровно тру
    console.log(number * basis);
}
calcOrDouble(3);
/* [Running] node "/Users/Ruslan/Desktop/Work/Project/Main/tempCodeRunnerFile.js"
6
ЭТО СТАРЫЙ ВАРИАНТ РЕШЕНИЕ, В ЕС6 ВСЕ СТАЛО ПРОЩЕ*/
function calcOrDouble (number, basis = 2) {
   console.log(number * basis);
}
calcOrDouble(3);
/*[Running] node "/Users/Ruslan/Desktop/Work/Project/Main/tempCodeRunnerFile.js"
6 */

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

        if(this.class.length === 0 ) { //length - мы обращаемся к его количеству элементом
            this.element = "menu__item";
            element.classList.add(this.element);//можно было сразу добавить меню айтем в (), но если в будущем нам этот класс еще понадобиться то лучше его добавить в this.element и уже this.element передать в скобки, ваня так раньше делал часто с переменными 
        } else {
            this.classes.forEach(className => {
                element.classList.add(className)//я обращаюсь к элемент(новосозданному что с дивом)
            });
        }

        /*this.classes.forEach(className => {
            element.classList.add(className)//я обращаюсь к элемент(новосозданному что с дивом)
        }); ЭТО МОЖНО УЖЕ ЗАКОММЕНТИРОВАТЬ ПОТОМУ ЧТО МЫ ЕГО ПЕРЕВЕЛИ В ЕЛС*/
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
        this.parent.append(element); /* <div class="menu__item"> я убрал этот див с верстки выше*/
    }
}
/* так как this.classes массив, нам нужно сначала обработать этот массив : пройтись по каждому элементу внутри, вытащить название этого класса и его подсойденить к этому диву  что мы создали*/

new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    ".menu .container"
    "menu__item",//это название класса с html страницы который нам нужно было поместить, обрати внимание что мы пишем его без точки в начале потому что мы его поом поместим в массив и используем уже в класс листе
    "big"//еще один класс
    //теперь когда я зайду на сайт в браузере, ничего внешне не помнеяется, но когда я кликну на карточку я увжиу что к ней добавился класс 
).render();