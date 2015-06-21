function hidePageAction(tab) {
  // Hide the page action:
  chrome.pageAction.hide(tab.id);
  // Send a message to the content script on the tab where the click came from:
  chrome.tabs.sendMessage(
        tab.id, {action: "stop_shaking"}, function(response) {});
};

function showPageAction(request, sender, sendResponse) {
  // Show the page action for the tab that the sender (content script)
  // was on.
  chrome.pageAction.show(sender.tab.id);

  // Listen for when the user clicks on the page action.
  chrome.pageAction.onClicked.addListener(hidePageAction);
};

// Listen for the popup to send a message to the background page.
chrome.extension.onRequest.addListener(showPageAction);


