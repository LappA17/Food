/*Всего существует 6 моб события и все начинаются со слова ТАЧ */
touchstart - событие срабатывает при касание элемента 
tochmove - если палец при касание начинает двигаться
touchend - когда палец оторвался от элемента
touchenter - когда ведем пальцем по экрану и наскакиваем на элемент с этим событием, как только палец
                зашел на пределы этого элемента
touchleave - противоположное, когда палец вышел за пределы элемента
touchcancel - точка соприкосновения больше не региструция на поверзности, если палец вышел за пределы
                браузера

document.addEventListener("DOMContent", () =>{/*все контент узлы готовы */
const box = document.querySelector(".box")
box.addEventListener("touchstart", (e) => {//нуженХотяБыОдинОбработчикСобытийКоторыйБудетCвязанCМобУстройствами
e.preventDefault;
console.log("start");
});
/*создаем коллбекс ф-цию которая должна выполниться сразу после того как выполнилось это наше событие
когда делаем мобильные событие рекомундуется всегда ставить в ( ) е , то-есть (e)
    e.peventDefault - для того что бы всегда отменять станд поведение браузера) 
    
Помни что нужно зайти в режим адаптации и выбрать мобайл, потому там сенсорное действеи а у тебя комп
*/

box.addEventListener("touchmove", (e) => {//нуженХотяБыОдинОбработчикСобытийКоторыйБудетCвязанCМобУстройствами
    e.preventDefault;
    console.log("Move");
    });
    //теперь если зажать мышку и двигать по картинка тач то будет кучу событий в консоли

box.addEventListener("touchend", (e) => {//нуженХотяБыОдинОбработчикСобытийКоторыйБудетCвязанCМобУстройствами
    e.preventDefault;
    console.log("End");
    });
   // когда пальчик оторвем - напишет в консоль енд
   /* Это все нужно что бы когда в будушем в на сайте будет слайдер или увеличение, то это все нужно будет
   настраивать*/
   
   Существует три главных свойства у сенсорных телефоном :

   1)touches = список всех пальцев который взаимодействую в экраном в моменте

   box.addEventListener("touchstart", (e) => {//нуженХотяБыОдинОбработчикСобытийКоторыйБудетCвязанCМобУстройствами
    e.preventDefault;
    console.log("start");
    console.log("e.touches");//в консоли появится объект тач лист: сначало кство пальцев
    //и там кординаты, угол наклона и тд, много свойств
    });

    2)targetTouches 

    box.addEventListener("touchstart", (e) => {//нуженХотяБыОдинОбработчикСобытийКоторыйБудетCвязанCМобУстройствами
        e.preventDefault;
        console.log("start");
        console.log("e.targetTouches")
});

    3)changedTouches - список пальцев которые участвую в текущем событие, пальцы которые совериши оперед
    еленное действие, например touchend

    box.addEventListener("touchstart", (e) => {//нуженХотяБыОдинОбработчикСобытийКоторыйБудетCвязанCМобУстройствами
        e.preventDefault;
        console.log("e.targetTouches[0].pageX");
// [0] - палец к которому обращаюсь. pageX - кординаты, можно их отслеживать
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>Document</title>
	<style>
		body {
			height: 1000px;
		}
		.box {
			width: 150px;
			height: 100px;
			background-color: red;
		}
	</style>
</head>
<body>
	
	<div class="box">
		Touch me!
	</div>

	<script src="script.js"></script>
</body>
</html>