import Cursor from './cursor';
import {preloader} from './preloader';
import LocomotiveScroll from 'locomotive-scroll';
import Menu from './menu';

// menu (<nav> element)
const menuEl = document.querySelector('[data-scroll-container]');

// preload the images set as data attrs in the menu items
preloader('.item').then(() => {
    // initialize the smooth scroll
    const scroll = new LocomotiveScroll({el: menuEl, smooth: true, lerp: 0.1, multiplier: 0.6});

    // initialize custom cursor
    const cursor = new Cursor(document.querySelector('.cursor'));

    // initialize menu
    new Menu(menuEl);

    const target = document.querySelector('#target-item');

    document.getElementById('trigger').onclick = function() {
      scroll.scrollTo(target, -200, 1300, [.74,.2,1,-0.22], true)
    };

});


