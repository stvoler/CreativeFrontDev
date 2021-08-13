import Cursor from './cursor';
import {preloader} from './preloader';
import LocomotiveScroll from 'locomotive-scroll';
import Menu from './menu';

// menu (<nav> element)
const menuEl = document.querySelector('[data-scroll-container]');

// preload the images set as data attrs in the menu items
preloader('.item').then(() => {
    // initialize the smooth scroll
    const scroll = new LocomotiveScroll({el: menuEl, smooth: true});

    // initialize custom cursor
    const cursor = new Cursor(document.querySelector('.cursor'));

    // initialize menu
    new Menu(menuEl);

    document.getElementById('trigger').onclick = function() {
    
      const target = document.querySelector('#js-target');
      scroll.scrollTo(target);
    };
    
});


