gsap.registerPlugin(ScrollTrigger);

const body = document.querySelector('body');

const isMobile = window.matchMedia('(max-width : 769px)');

const initLenis = () => {
  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
};

let waitlistForm = document.getElementById('waitlist-form');

waitlistForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let userEmail = document.getElementById('user_email');

  if (userEmail?.value === '') {
    console.log('error', e);
  } else {
    console.log('email', userEmail?.value);
    userEmail.value = '';
  }
});

const initConnection = () => {
  const connect = document.querySelector('.connect');
  connectMedia = connect.querySelectorAll('.connect_media');

  connectMedia.forEach((media) => {
    media.classList.contains('image-front')
      ? gsap.set(media, { xPercent: -200, y: 0, yPercent: -50 })
      : gsap.set(media, { xPercent: 200, y: 0, yPercent: -50 });
  });

  const tlConnect = gsap.timeline({
    ease: 'none',
    scrollTrigger: {
      trigger: connect,
      start: 'top top',
      end: '+=0',
      scrub: 1,
      pin: true,
    },
  });

  tlConnect
    .to(connectMedia, {
      xPercent: 0,
    })
    .to(connectMedia, {
      scale: 0.5,
    });

  if (isMobile.matches) return;
  initHorizontal();
};

const initHorizontal = () => {
  const horizontal = document.querySelector('.horizontal');

  horizontalVerticalBoxes = horizontal.querySelectorAll(
    '.horizontal_box--vertical'
  );
  horizontalVerticalBoxes1 = horizontal.querySelectorAll(
    '.horizontal_box--vertical1'
  );

  const tHorizontal = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: horizontal,
      start: 'top top',
      end: () => '+=' + horizontal.offsetWidth,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });

  tHorizontal.to('.horizontal_wrapper', {
    x: () =>
      -(horizontal.scrollWidth - document.documentElement.clientWidth) + 'px',
  });

  gsap.set(horizontalVerticalBoxes, { y: '-10%' });
  gsap.set(horizontalVerticalBoxes1, { y: '-30%' });
  tHorizontal.to(
    horizontalVerticalBoxes,
    {
      y: '25%',
      stagger: 0.02,
    },
    0
  );
  tHorizontal.to(
    horizontalVerticalBoxes1,
    {
      y: '5%',
      stagger: 0.02,
    },
    0
  );
};

const init = () => {
  gsap.set(body, { overflow: 'hidden' });

  initLenis();
  initConnection();
};

window.addEventListener('DOMContentLoaded', () => {
  if (!isMobile.matches) {
    init();
  } else {
    initLenis();
    initConnection();
  }
  // init();
});
