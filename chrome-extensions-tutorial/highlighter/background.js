
// Variable to store the current search term value.
var search_term;

// Update the search term and tell all active tabs in the current window that
// it had been updated.
function updateSearchTerm(new_term) {
  console.log("updating to:" + new_term);
  search_term = new_term;
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    for (index in tabs) {
      chrome.tabs.sendMessage(
          tabs[index].id,
          {action: 'check_match', search_term: search_term},
          function(response) {
            console.log(response);
      });
    }
  });
};

// Dispatcher function to handle incoming requests. The background page needs to
// listen to both the content script (which may request the search term when it
// loads into a new tab), and the browser action, which may notify that the
// search term has been updated.
function handle_request(request, sender, sendResponse) {
  if (request.action == 'get_search_term') {
    console.log("sending search term...");
    if (search_term)
      sendResponse(search_term);
  } else if (request.action == 'update_search_term') {
    console.log("updating search term...");
    updateSearchTerm(request.new_term);
  }
}

// Listen for the popup or content script to send a message to the background
// page.
chrome.extension.onRequest.addListener(handle_request);


