var currentSlideNo;

function getSlide(slideNo) {
  if (slideNo > 0) {
    return $('.slide').eq(slideNo - 1);
  } else {
    return null;
  }
};

function getSlideTitle(slideNo) {
  var el = getSlide(slideNo);
  return el ? el.find('header').html() : null;
};


function updateSlideClasses() {
  window.location.hash = "slide" + currentSlideNo;
  setSlideClass(getSlide(currentSlideNo - 2), 'far-past');
  setSlideClass(getSlide(currentSlideNo - 1), 'past');
  setSlideClass(getSlide(currentSlideNo), 'current');
  setSlideClass(getSlide(currentSlideNo + 1), 'future');
  setSlideClass(getSlide(currentSlideNo + 2), 'far-future');
};

function nextSlide() {
  if (currentSlideNo < $('.slide').length) {
    var reveals = getSlide(currentSlideNo).find('.reveal.unrevealed');
    if (reveals.length > 0) {
      reveals.eq(0).removeClass('unrevealed');
    } else {
      currentSlideNo++;
      getSlide(currentSlideNo).find('.reveal').addClass('unrevealed');
    }
  }
  updateSlideClasses();
};

function prevSlide() {
  if (currentSlideNo > 1) {
    getSlide(currentSlideNo).find('.reveal').addClass('unrevealed');
    currentSlideNo--;
  }
  updateSlideClasses();
};

function handleBodyKeyDown(event) {
  switch (event.keyCode) {
    case 37: // left arrow
      prevSlide();
      break;
    case 39: // right arrow
      nextSlide();
      break;
  }
};

function setSlideClass(slides, className) {
  if (slides && slides.length > 0) {
    console.log(slides, className);
    var classes = 'far-past past current future far-future';
    slides.addClass('hidden').removeClass(classes).addClass(className).removeClass('hidden');
  }
};
