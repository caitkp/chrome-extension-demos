$(document).ready(function() {
  localizeTags();
  $('a#start').click(startPreso);
  chrome.tabs.getSelected(null, function(tab) {
    if (tab.url.indexOf('chrome-extension://') > -1) {
      $('#popup-example').removeClass('hidden');
    } else {
      $('#popup-normal').removeClass('hidden');
    }
  })
});
