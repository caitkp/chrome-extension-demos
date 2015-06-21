function SendToContentScript() {
  var input = document.getElementById('search-term');
  var text = input.value;
  chrome.extension.sendRequest({action: "update_search_term", new_term: text}, function(){console.log("update done")});
  window.close();
}

function SubmitOnEnter(event) {
  if (event.keyCode == 13) {
   SendToContentScript();
   return false;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  console.log("loading");
  document.getElementById("submit-button").onclick = SendToContentScript;
  document.getElementById("submit-button").onkeydown = SubmitOnEnter;
});




