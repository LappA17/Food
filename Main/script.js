post-запроссы = запроссы когда мы после заполнения формы отправляем на сайт свои данные условно

get-запрос - когда мы условно что то гуглим

const persone = {
    name: "Ivan",
    tel: "+380990314699"
};

console.log(JSON.stringify(persone));
//с фронт енда на бекенд мы передаем запросы , условно говоря вот данные клиента 
//JSON.parson и stringify - только два метода у у джсона
/* [Running] node "/Users/Ruslan/Desktop/Work/Project/Main/tempCodeRunnerFile.js"
{"name":"Ivan","tel":"+380990314699"}

самое главное правило что все в Джсоне передается в ковычках
stringify - отправляет данные на сервер
parson - получает данные с сервера */
const persone = {
    name: "Ivan",
    tel: "+380990314699"
};
console.log(JSON.parse(JSON.stringify(persone)));//так как мы сами себе на сервер выслали данные, мы их и получаем с сервера 
/* [Running] node "/Users/Ruslan/Desktop/Work/Project/Main/tempCodeRunnerFile.js"
{ name: 'Ivan', tel: '+380990314699' } 
обратно мы получили объект */

const persone = {
    name: "Ivan",
    tel: "+380990314699",
    parents: {
        mom: "Olga",
        dad: "Kiril"
    }
};//сделаем наш объект немного более вложенным. И сейчас мы сделаем глубокую копию этого объекта
    const clone = JSON.parse(JSON.stringify(persone));
// создадим переменую клон, JSON.stringify(persone) - это операция создаст копию JSON , а эта JSON.parse вернёт обратно данные в виде объекта. И таким образом мы просто получаем самый настоящий объект , и у нас создан теперь глубокий клон, который никаким образом не зависит от нашего первоначального объекта persone 
clone.parents.mom = "Ann";
console.log(persone);
console.log(clone);
/* [Running] node "/Users/Ruslan/Desktop/Work/Project/Main/tempCodeRunnerFile.js"
{
  name: 'Ivan',
  tel: '+380990314699',
  parents: { mom: 'Olga', dad: 'Kiril' }
}
{
  name: 'Ivan',
  tel: '+380990314699',
  parents: { mom: 'Ann', dad: 'Kiril' }
}
clone.parents.mom = "Ann"; - помни что так мы можем обращаться к нашему объекту и менять там свойства 
*/