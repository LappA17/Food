 Какое будет выведено значение: let x = 5; alert( x++ ); ?
Будет 5 , потому что перед тем как добавить единичку оно сначало верент 5ку а потом поменяет на 1чку больше 
Но если мы напишем такой код ++х тогда будет 6ка 

 Чему равно такое выражение: [ ] + false - null + true ?
Если массив добавить фолс мы получаем Строку. Потому что [] + false = "false"
Когда мы работает с пустым массивом то это СТРОКА !
[] + false - null + tru = NaN // потому что мы исполнем мат опперации 

 Что выведет этот код: let y = 1; let x = y = 2; alert(x); ?
2йка

 Чему равна сумма [ ] + 1 + 2?
Будет "12" как обычная строка

Что выведет этот код: alert("1"[0])?
Каждому эллементу строки можно обратиться по его индексу(символу), наша строка из одного символа
то будет 1 (с индексом 0 внутри)

 Чему равно 2 && 1 && null && 0 && undefined ?
Будет налл
потому что 2 это правдивое вырожение в логическом контексте, 1 тоже
а нал это ничего, потому что код запнулся на нал и будет его возвращать, дальше код не пойдет
И запинается на лжи, а ИЛИ всегда запинается на правде

 Есть ли разница между выражениями? !!( a && b ) и (a && b)?
Будет Фолс , потому что !! привращает следующее за ним выражение булиновое

 Что выведет этот код: alert( null || 2 && 3 || 4 ); ?
Зайти нужно в таблицу приоритетов опператоров : логическая И имеет приоритет выше 
по этому между 2 и 3 будет 3
Вспоминаем что ИЛИ запинается на правде, нал у нас - не правда, а тройка выше
дальше 3 или 4,  ИЛИ запинается на правде, по этому будет тройка 

 a = [1, 2, 3]; b = [1, 2, 3]; Правда ли что a == b ?
а не равно б потому что две разные переменные которые просто содержат одинаковые данные 
это разные хранилище информации , и не важно что информация похожа, само хронилище разное

 Что выведет этот код: alert( +"Infinity");
сам код выведет инфинити, но тип данных ЧИСЛО

 Верно ли сравнение: "Ёжик" > "яблоко"?
верхний регистр имеет больше приоритет

 Чему равно 0 || "" || 2 || undefined || true || falsе ?
или запинается на правде
0 в логическом контекст фолс
пустрая строка в логическом контексте фолс
а 2 = тру. дальше код просто не пойдет, по этому получим 2
