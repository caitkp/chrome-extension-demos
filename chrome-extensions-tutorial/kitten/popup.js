function buildHTML(result) {
  var imgContainer = document.createElement('div');
  var title = document.createElement('div');

  // We use titleNoFormatting so that no HTML tags are left in the
  // title
  title.innerHTML = result.titleNoFormatting;
  var newImg = document.createElement('img');

  // There is also a result.url property which has the escaped version
  newImg.src= result.url;
  newImg.height=result.height;
  newImg.width=result.width;
  imgContainer.appendChild(title);
  imgContainer.appendChild(newImg);
  return imgContainer;
}

function foundAKitten(kitten) {
  // Grab our content div, clear it.
  var contentDiv = document.getElementById('content');
  contentDiv.innerHTML = '';

  // Build HTML for new image:
  var imgContainer = buildHTML(kitten);

  // Put our title + image in the content:
  contentDiv.appendChild(imgContainer);
};

chrome.extension.sendRequest("ICanHazKitten", foundAKitten);



