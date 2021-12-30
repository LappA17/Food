console.log(document.body);//так можем обратиться к любому тегу, методегу (хеду,бади)
console.log(document.documentElement)// обращаемся к главному тегу HTML
console.log(document.body.childNodes)//получаем псевдомассив где будут все дети Бади в консоли браузера
 /* там будет все запутано, какие-то переносы, 4 тего выдало, потом динамические теги которые браузер
 сам дополнил
 
 Все что мы видим в тегах будет дом=элементами, а все что не видим дом=узлом(переносы строк, текстовые
    элементы)
    <li>1</li> - 1 будет дом узел
    
    благодаря childNodes мы получаем доступ ко всем все ноды, все узлы которые находястя внутри
    родители*/

    console.log(document.body.firstChild)
    console.group(document.body.lastChild)

    console.log(document.querySelector("#current")).parentNode;
    //current - это просто айди тега батон с его хтмл

    //если мы планируем использовать элемент один раз то можно не помещать его в переменную
    /* у вани стоит три кнопки баттон и у них родитель див с классом ферст и ему нужно его получить
    .parentNode - благодаря этой команде он может получить родителя и в консоле браузере он отобъется
    
    теперь ваня хочет получить родителя ферст а именно дис с классом враппер и для этого эту
    комманду нужно продублировать два раза */
    console.log(document.querySelector("#current")).parentNode.parentNode;

    /* ДАТА-АТРИБУТЫ
   <li data-current="3">3</li> после data-можно писать все что угодно
   <li data-current="true" булиновое значение тоже можно задавать
*/
   console.log(document.querySelector("[data-current='3']").nextSibling)
   /* допустим что нам нужно получить элемент после этого элемента с этим датой атрибута
   для этого используем nextSibling
   но самое интересное что html коде там стоит перенос строки и именно его мы получи :)
   text# именно это выдаст консоль в браузере */
   console.log(document.querySelector("[data-current='3']").previousSibling)
   /* и мы опять получаем тектовоую ноту, мы можем спокойно попасть на текстовые узлы*/
   console.log(document.querySelector("[data-current='3']").nextElementSibling)
   previousElementSibling - тоже есть
   /*и вот только сейчас в консоли я получу 4
    */
   console.log(document.querySelector("#current")).parentElement;
   /* таким образом точно получу елемент*/
   console.log(document.body.firstElementChild) // та же история, будет wrapper

   for (let node of document.body.childNodes){
       if(node.nodeName == "#text"){
           continue;
       }
       console.log(node)
   }
   /* Иногда фор ич не работает и тут нужен фор оф
   Я хочу перебрать все ноды в бади 
   
   Нам нужно вывести текущую ноду, но при этом избавиться от текстовых нот, для этого заходим в браузер
   и заходим там в текст. У объекта есть свойства, в том числе nodeName которая равна #text
   И как обычно использует цикл :)
   И если я хочу что бы при наткнавение цикла на текстовую ноду цикл остановился используем continue
   Continue останавливает цикл и просто продолжает его с новым элементом 
   Break полностью прирывает цикл 
   фор оф перебрал все элементы в бади и оставил нам только их, без узлов, а именно элементы*/

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        
        <div class="wrapper">
            <div class="first">
                <button></button>
                <button id="current"></button>
                <button></button>
            </div>
            <div class="second">
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li data-current="3">3</li>
    
                    <li>4</li>
                    <li>5</li>
                </ul>
            </div>
            <div class="third"></div>
        </div>
        <!-- renernh -->
        <script src="script.js"></script>
    </body>
    </html>
