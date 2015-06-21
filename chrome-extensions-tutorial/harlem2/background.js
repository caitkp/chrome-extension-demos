
var search_term;

function updateSearchTerm(new_term) {
  console.log("updating to:" + new_term);
  search_term = new_term;
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    for (index in tabs) {
      chrome.tabs.sendMessage(tabs[index].id, {action: 'check_match', search_term: search_term}, function(response) {
        console.log(response);
      });
    }
  });
};


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

// Listen for the popup or content script to send a message to the background page.
chrome.extension.onRequest.addListener(handle_request);


