/*если функция стоит перед какой-то это не значит что данная функция выполнится раньше
та что стоит после может выполниться первее, они запускается одна за другой но спокойно могут не выпол-
нятся одна за другой
callback - это фция которая должна быть выполнена сразу после того как другая фцияЗавершилаСвоеВыполнение
*/
function learnJS(lang, callback) {
    console.log(`Я учу ${lang}`);
    callback();
}
function done () {
    console.log("Я прошел этот урок");
}
learnJS('JavaScript', done)
/* [Running] node "/Users/Ruslan/Desktop/Work/Project/tempCodeRunnerFile.js"
Я учу JavaScript
Я прошел этот урок
callback значит что в будущем мы сможем передать одну функцию в другую
обрати внимание как записано done после джс , без скобок или чего-то там, то-есть
мы просто обращаем к функции лерн жс только тогда когда ты к ней только дойдешь */

