function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // Tabs
    
	let tabs = document.querySelectorAll(tabsSelector),
		tabsContent = document.querySelectorAll(tabsContentSelector),
		tabsParent = document.querySelector(tabsParentSelector);

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('activeClass');
    }
    
    hideTabContent();
    showTabContent();

    /* Теперь очень важно 'tabheader__item' здесь и тот что мы передали в табы - разные, тот с 
    точкой!  'tabheader__item' - здесь мы ориентировали на тег, а там с точкой тоесть это селектор(класс)

    По-этому этот тег мы можем просто модифицировать, вспомниай методы у строк и мы берем tabssELECTOR,
    подставляем вместо этого тега, и просто удалить точку от нашей строки slice(1) - сформулирует новую
    строку без первого символа*/
	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
    });
}

export default tabs;