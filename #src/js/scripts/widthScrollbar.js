// ширина скроллбара
const getScrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
let scrollBarVar = getComputedStyle(document.documentElement).getPropertyValue('--widthscrollbar');
document.documentElement.style.setProperty('--widthscrollbar', getScrollbarWidth + 'px');
