const num = new Function(3);
console.log(num)
/* создание новой функции равнаяется созданию НОВОГО ОБЪЕКТА, свойства которого уже будут ровны новой функции
ЭТО СТАРЫЙ ПРИМЕР ТАК ДЕЛАТЬ НЕ НАДО*/

function User (name, id) {
    this.name = name;
    this.id = id;
    this.human = true;
    this.hello = function(){
        console.log(`Hello ${this.name}`)
    }
}

User.prototype.exit = function() {
    console.log(`пользователь ${this.name} покинул `)
}
//при помощи prototype мы можем добавлять новые методы или свойства в наш конструктор и они будут наследоваться у потомков
//exit - это метод выхода пользователя из системы 
//теперь этом метод будет прототипно наследоваться у всех потомков которые были созданы после этого метода пользователь Ivan покинул 


const ivan = new User ("Ivan", 28);
const alex = new User ("Alex", 30);
ivan.hello();
alex.hello();
console.log(ivan)

ivan.exit();




/* благодаря this name=name и id мы сделали так что у каждого пользователя своей уникальному имя и id
    this.human = true; = каждый пользователь будет человеком

Теперь когда мы использовали такой конструктор - наша функция стала объектом со своими данными

создадим переменую ivan, внутрь нее добавим данные о пользователи и самое интересное что теперь в этой переменной находится не функция а ОБЪЕКТ, потому что User функция стала конструктуром и теперь вызывается как объект с теми свойстввами что мы сейчас туда вписываем

[Running] node "/Users/Ruslan/Desktop/Work/Project/Main/tempCodeRunnerFile.js"
User { name: 'Ivan', id: 28, human: true }
User { name: 'Alex', id: 30, human: true }

В таких функция нам не нужен return , мы с них ничего не возвращаем

this.hello - это МЕТОД, по этому мы в нее кладем ФУНКЦИЮ. которая будет говорить привет конкретному пользователю
[Running] node "/Users/Ruslan/Desktop/Work/Project/Main/tempCodeRunnerFile.js"
Hello Ivan
Hello Alex
 */