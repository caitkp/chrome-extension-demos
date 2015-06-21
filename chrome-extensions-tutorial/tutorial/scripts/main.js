
$(document).ready(function() {
  console.log("Ready");
  localizeTags();

  if (window.location.hash != "") {
    console.log(window.location.hash);
    currentSlideNo = Number(window.location.hash.replace('#slide', ''));
    console.log(currentSlideNo);
  } else {
    currentSlideNo = 1;
  }
  document.body.addEventListener('keydown', handleBodyKeyDown, false);

  var slides = $('.slide');
  slides.each(function(index) {
    $(this).append("<p class='slidecount'>" + (index + 1) + "/" + slides.length + "</p>");
  });

  $('.reveal').addClass('unrevealed');
  setSlideClass($('.slide'), 'far-future');
  updateSlideClasses();

  $('#animate-button').click(animateIcon);

  $('#badge-text-button').click(function(){setBadgeText('#badgetext');});

  $('#clear-badge-text-button').click(clearBadgeText);

  $('#badge-color-button-1').click(function(){setBadgeColor(255, 0, 0, 255);});
  $('#badge-color-button-2').click(function(){setBadgeColor(0, 255, 0, 255);});
  $('#badge-color-button-3').click(function(){setBadgeColor(0, 0, 255, 255);});

  $('#content-script-demo').click(runContentScriptDemo);
});






// Browser action slide -- badge changer
function setBadgeText(selector) {
  var elem = $(selector);
  var text = elem.val();
  elem.val('');
  chrome.browserAction.setBadgeText({ 'text' : text });
};

function clearBadgeText() {
  chrome.browserAction.setBadgeText({ 'text' : '' });
};

function setBadgeColor(r, g, b, a) {
  chrome.browserAction.setBadgeBackgroundColor({ 'color' : [r, g, b, a] });
};

// Browser action slide -- icon spinner
var timeout = 2000;
function drawFrame(context, icon, step) {
  step += 10;
  context.save();
  context.clearRect(0, 0, 100, 100);
  context.translate(9.5, 9.5);
  context.rotate(step * Math.PI/180);
  context.drawImage(icon, -9.5, -9.5, 19, 19);
  context.restore();
  if (step < 1440) {
    chrome.browserAction.setIcon({
      'imageData' : context.getImageData(0, 0, 19, 19)
    });
    setTimeout(drawFrame, 10, context, icon, step);
  } else {
    chrome.browserAction.setIcon({
      'path' : 'icon-19.png'
    });
  }
};

function animateIcon() {
  var canvas = document.getElementById("canvasicon");
  var context = canvas.getContext("2d");
  var icon = new Image();
  icon.src = "icon-19.png";
  icon.onload = function() {
    drawFrame(context, icon, 0);
  };
};

function initIcon() {
  var icon = new Image();
  icon.src = "icon-19.png";
  icon.onload = function() {
    var canvas = document.getElementById("canvasicon");
    var context = canvas.getContext("2d");
    context.drawImage(icon, 0, 0, 19, 19);
  };
};
$(document).ready(initIcon);

// Content script slide -- background changer
function runContentScriptDemo() {
  // Hacked due to a bug in the way permissions work
  var old_bg = $(document.body).css('background-color');
  $(document.body).css("background-color", "#ff6600");
  window.setTimeout(function() {
    $(document.body).css('background-color', old_bg);
  }, 2000);
};
