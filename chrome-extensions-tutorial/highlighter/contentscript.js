// Unhighlight the previous query.
function unhighlight() {
  $('.cs-highlight').removeClass('cs-highlight');
}

// Highlight all occurences of the current query.
function highlight_words(word) {
  if(word) {
    var textNodes;
    word = word.replace(/\W/g, '');
    var str = word.split(" ");
    $(str).each(function() {
        var term = this;
        var textNodes = $('*').contents().filter(
            function() { return this.nodeType === 3 });
        textNodes.each(function() {
          var content = $(this).text();
          var regex = new RegExp(term, "gi");
          content = content.replace(regex,
              '<span class="cs-highlight">' + term + '</span>');
          $(this).replaceWith(content);
        });
    });
  }
}

// Check if the search term appears anywhere in the page.
function checkMatch(search_term) {
  console.log("unhighlighting");
  unhighlight();
  console.log("checking match");
  highlight_words(search_term);
}

// Dispatcher function to handle incoming messages.
function handle_request(request, sender, sendResponse) {
  if(request && request.action && request.action == 'check_match') {
    checkMatch(request.search_term);
  }
  if(sendResponse) {
    sendResponse("done");
  }
}


// Make a call to the background page to get the search term.
chrome.extension.sendRequest({action:"get_search_term"}, checkMatch);

// Listen for updates to the search term.
chrome.extension.onMessage.addListener(handle_request);
