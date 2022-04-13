window.onload = () => {
  const parallax = document.querySelector('.parallax');

  if (parallax) {
    const content = document.querySelector('.content__container'),
          clouds = document.querySelector('.images-parallax__clouds'),
          mountains = document.querySelector('.images-parallax__mountains'),
          human = document.querySelector('.images-parallax__human'),
          
          forClouds = 40,
          forMountains = 20,
          forHuman = 10,
          
          speed = 0.1;

    let positionX = 0, positionY = 0;
    let coordXpercent = 0, coordYpercent = 0;

    const setMouseParallaxStyle = () => {
      const distX = coordXpercent - positionX, distY = coordYpercent - positionY;

      positionX = positionX + distX * speed, positionY = positionY + distY * speed;

      clouds.style.cssText = `transform: translate(${positionX / forClouds}%, ${positionY / forClouds}%);`;
      mountains.style.cssText = `transform: translate(${positionX / forMountains}%, ${positionY / forMountains}%);`;
      human.style.cssText = `transform: translate(${positionX / forHuman}%, ${positionY / forHuman}%);`;

      requestAnimationFrame(setMouseParallaxStyle);
    };

    setMouseParallaxStyle();

    parallax.addEventListener('mousemove', event => {
      const parallaxWidth = parallax.offsetWidth,
            parallaxHeight = parallax.offsetHeight,
            
            coordX = event.pageX - parallaxWidth / 2,
            coordY = event.pageY - parallaxHeight / 2;
      
      coordXpercent = coordX / parallaxWidth * 100;
      coordYpercent = coordY / parallaxHeight * 100;
    });

    let thresholdSets = [];
    for (let i = 0; i <= 1.0; i += 0.005) {
      thresholdSets.push(i);
    }
    
    const callback = (entries, observer) => {
      const scrollTopPercent = window.pageYOffset / parallax.offsetHeight * 100;
      setParallaxItemsStyle(scrollTopPercent);
    };

    const observer = new IntersectionObserver(callback, { threshold: thresholdSets });

    observer.observe(document.querySelector('.content'));

    const setParallaxItemsStyle = scrollTopPercent => {
      content.style.cssText = `transform: translate(0%, -${scrollTopPercent / 9}%);`;
      mountains.parentElement.style.cssText = `transform: translate(0%, -${scrollTopPercent / 6}%);`;
      human.parentElement.style.cssText = `transform: translate(0%, -${scrollTopPercent / 3}%);`;
    };
  }
};