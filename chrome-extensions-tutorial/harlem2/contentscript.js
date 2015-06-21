// Start the shaking!
function startShake() {
  var divArray = document.body.getElementsByTagName('div');
  for(var i=0; i < divArray.length; i++) {
    var div = divArray[i];
    div.style['-webkit-animation-name'] = 'spaceboots';
    div.style['-webkit-animation-duration'] = '0.8s';
    div.style['-webkit-transform-origin'] = '20% 20%';
    div.style['-webkit-animation-iteration-count'] = '100';
    div.style['-webkit-animation-timing-function'] = 'linear';
  }
};

// Stop the shaking!
function stopShake() {
  var divArray = document.body.getElementsByTagName('div');
  for(var i=0; i < divArray.length; i++) {
    var div = divArray[i];
    div.style['-webkit-animation-name'] = '';
    div.style['-webkit-animation-duration'] = '';
    div.style['-webkit-transform-origin'] = '';
    div.style['-webkit-animation-iteration-count'] = '';
    div.style['-webkit-animation-timing-function'] = '';
  }
};

// Build the 'style' DOM element which we will use to make the page shake.
function buildStyleElement() {
  var styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  var rule = document.createTextNode(
      '@-webkit-keyframes spaceboots {' +
	    '0% { -webkit-transform: translate(2px, 1px) rotate(0deg); }'+
	    '10% { -webkit-transform: translate(-1px, -2px) rotate(-1deg); }'+
	    '20% { -webkit-transform: translate(-3px, 0px) rotate(1deg); }'+
	    '30% { -webkit-transform: translate(0px, 2px) rotate(0deg); }'+
	    '40% { -webkit-transform: translate(1px, -1px) rotate(1deg); }'+
	    '50% { -webkit-transform: translate(-1px, 2px) rotate(-1deg); }'+
	    '60% { -webkit-transform: translate(-3px, 1px) rotate(0deg); }'+
	    '70% { -webkit-transform: translate(2px, 1px) rotate(-1deg); }'+
	    '80% { -webkit-transform: translate(-1px, -1px) rotate(1deg); }'+
	    '90% { -webkit-transform: translate(2px, 2px) rotate(0deg); }'+
	    '100% { -webkit-transform: translate(1px, -2px) rotate(-1deg); }'+
      '}');
  styleElement.appendChild(rule);
  return styleElement;
}

// Check if "Harlem" appears anywhere in the page.
function foundMatch() {
  var regex = /Harlem/gi;
  var divArray = document.body.getElementsByTagName('div');
  for(var i=0; i < divArray.length; i++) {
    var div = divArray[i];
    matches = div.innerText.match(regex);
    if (matches) {
      return true;
    }
  }
  return false;
}

// If we find the word "Harlem":
if (foundMatch()) {
  // Build the element that makes the page shake, and attach it to the DOM.
  var styleElement = buildStyleElement();
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(styleElement);

  // The regular expression produced a match, so notify the background page (to
  // show the pageAction).
  chrome.extension.sendRequest({}, function(response) {});

  // Listen for the background page to tell us that the "stop" pageAction was
  // clicked. (Execute the "stopShake" method once this happens).
  chrome.extension.onMessage.addListener(stopShake);

  // Start the shaking.
  startShake();
}
