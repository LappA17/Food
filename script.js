/* Задание на урок:
1) У нас уже есть рабочее приложение, состоящее из отдельных функций. Представьте, что
перед вами стоит задача переписать его так, чтобы все функции стали методами объекта personalMovieDB
Такое случается в реальных продуктах при смене технологий или подхода к архитектуре программы
2) Создать метод toggleVisibleMyDB, который при вызове будет проверять свойство privat. Если оно false - он
переключает его в true, если true - переключает в false. Протестировать вместе с showMyDB.
3) В методе writeYourGenres запретить пользователю нажать кнопку "отмена" или оставлять пустую строку. 
Если он это сделал - возвращать его к этому же вопросу. После того, как все жанры введены - 
при помощи метода forEach вывести в консоль сообщения в таком виде:
"Любимый жанр #(номер по порядку, начиная с 1) - это (название из массива)"*/
'use strict';

const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
    start: function() {
        personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
    
        while (personalMovieDB.count == '' || personalMovieDB.count == null || isNaN(personalMovieDB.count)) {
            personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
        }
    },
    rememberMyFilms: function() {
        for (let i = 0; i < 2; i++) {
            const a = prompt('Один из последних просмотренных фильмов?', ''),
                  b = prompt('На сколько оцените его?', '');
        
            if (a != null && b != null && a != '' && b != '' && a.length < 50) {
                personalMovieDB.movies[a] = b;
                console.log('done');
            } else {
                console.log('error');
                i--;
            }
        }
    },
    detectPersonalLevel: function() {
        if (personalMovieDB.count < 10) {
            console.log("Просмотрено довольно мало фильмов");
        } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
            console.log("Вы классический зритель");
        } else if (personalMovieDB.count >= 30) {
            console.log("Вы киноман");
        } else {
            console.log("Произошла ошибка");
        }
    },
    showMyDB: function (hidden) {
        if (!hidden) {
            console.log(personalMovieDB);
        }
    },  
    writeYourGenres: function() {
        for (let i = 1; i <= 3; i++) {
            let genre = prompt(`Ваш любимый жанр под номером ${i}`);
            if (genre == "" || genre == null) {
                console.log("вы ввели некоректные данные или не вели их вовсе");;
                i--;
            } else {
                personalMovieDB.genres[ i - 1] = genre;
                  /* тут мы переделываем всё.
    после genre можно и == или === потому что из промто нам возвращается строка
     */
            }
        }
        personalMovieDB.genres.forEach(item, i) => {
            console.log(`Любимый жанр ${i + 1} - это ${item}`);
        }
        /*здесь же будем делать стрелочные КОЛЛБЕК функцию
        item = каждый эллемент в массиве который мы перебираем (жанр номер 1, жанр номер 2...)
        i - это номер по порядку */
    } ,
    writeYourGenres: function() {
        for (let i = 1; i <= 3; i++) {
            let genre = prompt(`Ведите ваши любимые жанры через запятую`);
            if (genre == "" || genre == null) {
                console.log("вы ввели некоректные данные или не вели их вовсе");;
                i--;
            } else {
                personalMovieDB.genres = genre.split(", ");
                personalMovieDB.genres.sort - ОТСАРТИРУЕТ ВСЕ ПО АЛФАВИТЕ. Все буквы с большой буквы будут первее 
                чем те что с маленьких даже если маленькая - а, а вторая большая Ю, ю будет первее
                но все фикситься елси для prompt(`Ведите ваши любимые жанры через запятую`).toLowerCase
                  
            }
        } 
/*меняе i<=3 на i<2  то-етсь цикл запускается один раз так как не нужно три раза отвечать а через запятую
Здесь начинается самое интересное personalMovieDB.genres[ i - 1] = genre;
переменную genre меняем на genres
ТАКИМ ОБРАЗОМ ДЖАВАСКРИПТ АВТОМАТИЧЕСКИ РОЗДЕЛИТЬ ОТЕТ ПОЛЬЗОВАТЕЛЯ НА ЧАСТИ МАССИВА ТАМ ГДЕ ОН УКАЖЕТ ЗАПЯТУЮ
 */
        personalMovieDB.genres.forEach(item, i) => {
            console.log(`Любимый жанр ${i + 1} - это ${item}`);
        }
        
    } ,
    toggleVisibleMyDB: function () {
        if (personalMovieDB.privat) {

        } else {
            personalMovieDB.privat = true;
        }
    } 
    /* не до конца понял ,но суть в том что у нас изначально приват стоит фолс , по-этому в иф мы просто пишем 
    personalMovieDB.privat помня что там уже стоит фолс , а в else тру
    Но если бы в приват было бы Тру, то в иф попадает правидвое выражение а в {мы меняем его на фолс}
    toggleVisibleMyDB: function () {
        if (personalMovieDB.privat) {
            personalMovieDB.privat = false
        } else {
            personalMovieDB.privat = true;
        }
    } 


};
/* Чтобы переписать все функции так что бы они стали методами объекта нужно просто скопировать и вставить внутрь объекта ф-цию
а метод с ф-цией поменять места то-есть не function (start), а теперь start: function () {}
переменную намбер оф филмс просто напросто удаляем потому что она больше не нужно вверху , и то что осталось от ф-ции вверху
start () и function тоже просто удаляем. Вместо намбероффилм в каунт ставим 0 
и вместо намбероффилм в ф-ции старт personalMovieDB. count

То же делаем с ремембермайфилмс

detectpersonallevel тоже  и так далее

все эти старт, ремембермайфилмс, дект и тд это все методе объекта*/







