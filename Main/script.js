"use strict"

class Rectangle {//* класс создаем с большой буквы всегда !
    constructor(height, width) {//свойство constructor занимается констурированием класса

        this.height = height //this - если мы используем this  то мы будем обращатсья к экхемпляру новосозданного объекта, к каждому отдельном квадратику и мы говорим что в каждый такой новый объект мы записываем какое-то свойство , например высота и берем мы ее из аргументов (там где constructor)
        this.width = width;
    }
    calcArea () { // метод благодаря которому мы посчитаем площадь нашего квадратика
        return this.height * this.width;//мы хотим вернуть площать этого квадратика, благодаря this мы с сылаемся на объект который будет там создан выше и берем свойсвто height которое было взято из-вне и умножаем на ширину 
    }
}
const square = new Rectangle(10, 10) // создаем переменую в которую помещаем объект созданный с помощью класса и во внутрь помещаем два аргумента. Cвойства которые я передаю в этот объект запишуться прям в этой
console.log(square.calcArea());
/* [Running] node "/Users/Ruslan/Desktop/Work/Project/Main/tempCodeRunnerFile.js"
100 */
class Rectangle {
    constructor(height, width) {

        this.height = height 
        this.width = width;
    }
    calcArea () { 
        return this.height * this.width;
    }
}
const square = new Rectangle(10, 10) 
const long = new Rectangle(20, 100) строчке !
console.log(long.calcArea());
/*[Running] node "/Users/Ruslan/Desktop/Work/Project/Main/tempCodeRunnerFile.js"
2000 */

class Rectangle {
    constructor(height, width) {

        this.height = height 
        this.width = width;
    }
    calcArea () { 
        return this.height * this.width;
    }
}

class ColorRedRectangleWidthText  extends Rectangle {// этот класс будет наследоваться от нашего большого класса, по этому ширину и высоту можно не задавать и просто наследовать
//extands Rectangle - это дословно "наследуется от Риктенгел"
constructor (height, width, text,bgColor) {
    super(height, width);//что бы не делать cntr c + cntr v this у главного родителя, есть такой метод super - который вызывает суперконструктор родителя. Она просто вызывает то же самое что было у родителя.ЕСТЬ ГЛАВНОЕ ПРАВИЛО ЧТО super ВСЕГДА ДОЛЖНА БЫТЬ НА ПЕРВОМ МЕСТЕ В КОНСТРУКТОРЕ
    this.text = text;
    this.bgColor = color;
}
showMyProps () { //покажи мне мои свойства
    console.log(`Текст : ${this.text}, цвет : ${this.bgColor}`);
}
}
const div = new ColorRedRectangleWidthText(25,10, "hello world", "red");//теперь у нас есть такой объект который содержит все эти свойства что мы так долго задавали :)
div.showMyProps();
console.log(div.calcArea());
/* Текст: "hello world", цвет: red - это сработал метод showMyProps
250 - это calcArea*/
 


