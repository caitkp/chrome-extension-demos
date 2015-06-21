// Send the new search term to the page so it can update highlighting.
function SendToContentScript() {
  var input = document.getElementById('search-term');
  var text = input.value;
  chrome.extension.sendRequest(
      {action: "update_search_term", new_term: text},
      function(){console.log("update done")});
  window.close();
}

// Check if enter was pressed.
function SubmitOnEnter(event) {
  if (event.keyCode == 13) {
   SendToContentScript();
   return false;
  }
}

// Set up event listeners.
document.addEventListener('DOMContentLoaded', function() {
  console.log("loading");
  // Update search-term when "submit" button is clicked or enter is pressed.
  document.getElementById("submit-button").onclick = SendToContentScript;
  document.getElementById("search-term").onkeydown = SubmitOnEnter;
});




