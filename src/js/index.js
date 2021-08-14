import {gsap} from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Cursor from './cursor';
import {preloader} from './preloader';
import LocomotiveScroll from 'locomotive-scroll';
import Menu from './menu';

gsap.registerPlugin(ScrollTrigger);

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

    const target = document.querySelector('.item.active');

    document.getElementById('trigger').onclick = function() {
      scroll.scrollTo(target, -200, 1300, [.74,.2,1,-0.22], true);
    };

    gsap.registerPlugin(ScrollTrigger);

    scroll.on("scroll", ScrollTrigger.update);
    
    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
      scrollTop(value) {
        return arguments.length
          ? scroll.scrollTo(value, 0, 0)
          : scroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      }
    });

    ScrollTrigger.defaults({
      toggleActions: "restart pause resume pause",
      scroller: "[data-scroll-container]"
    });

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".item.active",
        scrub: true,
        pin: true,
        start: "50% 50%",
        end: "+=100%"
      },
      onComplete: aClass
    })

    .fromTo(".item.active img", {translateY: 0, scale: 1}, {delay: 2, duration: 4.5, translateY: 1000, scale: 0.24, ease: "[0.74,0.2,1,-0.22]"})

    .from(".line-1", {
      scaleX:0,
      ease:"none",
      transformOrigin:"left top"
    }, 0)

    function aClass(){
      target.classList.add("gr");
    }

    ScrollTrigger.addEventListener("refresh", () => scroll.update());

    ScrollTrigger.refresh();

});


