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
function unhighlight() {
  $('.cs-highlight').removeClass('cs-highlight');
}

function highlight_words(word) {
  if(word) {
    var textNodes;
    word = word.replace(/\W/g, '');
    var str = word.split(" ");
    $(str).each(function() {
        var term = this;
        var textNodes = $('*').contents().filter(function() { return this.nodeType === 3 });
        textNodes.each(function() {
          var content = $(this).text();
          var regex = new RegExp(term, "gi");
          content = content.replace(regex, '<span class="cs-highlight">' + term + '</span>');
          $(this).replaceWith(content);
        });
    });
  }
}

// Check if "Harlem" appears anywhere in the page.
function checkMatch(search_term) {
  console.log("unhighlighting");
  unhighlight();
  console.log("checking match");
  /*var divArray = document.body.getElementsByTagName('div');
  for(var i=0; i < divArray.length; i++) {
    var div = divArray[i];*/
    highlight_words(search_term);
    /*matches = div.innerText.match(search_term);
    if (matches) {
      //div.style.background = "blue";
      var re = new RegExp(search_term, 'g');
      var inner_html = div.innerHTML;
      inner_html = inner_html.replace(re, '<span class="cs-highlight" style="background-color:blue">'+search_term+'</span>');
      div.innerHTML = inner_html;
      console.log("found match");
    }
  }*/
}

function handle_request(request, sender, sendResponse) {
  if(request && request.action && request.action == 'check_match') {
    checkMatch(request.search_term);
  }
  if(sendResponse) {
    sendResponse("done");
  }
}


chrome.extension.sendRequest({action:"get_search_term"}, checkMatch);
chrome.extension.onMessage.addListener(handle_request);


/*// If we find the word "Harlem":
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
}*/
