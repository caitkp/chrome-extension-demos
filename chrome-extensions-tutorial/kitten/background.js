var imageSearch;
var imageNum = 0;
var pageNum = 0;
var next = null;
var loaded= false;

// If we are at the end of this page of search results, go to the next page.
function maybeUpdatePage() {
 	if (imageNum >= imageSearch.results.length) {
	  imageNum = 0;
    pageNum++;
    imageSearch.gotoPage(pageNum);
  } else {
    imageNum++;
  }
};

function loadNextImage() {
  // Check that we got results
  if (imageSearch.results && imageSearch.results.length > 0) {
    next = imageSearch.results[imageNum];
  } else {
    next = null;
  }
  maybeUpdatePage();
};

function getNextImage() {
  return next;
}

function getImageData(image) {
  var image_data = null;
  if (image) {
    var scaledWidth = 400*image.width/image.height;
    image_data = {url: image.url,
            titleNoFormatting: image.titleNoFormatting,
            height: ''+400,
            width: ''+scaledWidth
    };
  }
  return image_data;
}

// Do a search for kittens.
function loadImages() {
  // Create an Image Search instance.
  imageSearch = new google.search.ImageSearch();
  imageSearch.setResultSetSize(8);
  imageSearch.setRestriction(
    google.search.ImageSearch.RESTRICT_IMAGESIZE,
    google.search.ImageSearch.IMAGESIZE_MEDIUM);

  // Include the required Google branding
  google.search.Search.getBranding('branding');

  // Set searchComplete as the callback function when a search is
  // complete.  The imageSearch object will have results in it.
  imageSearch.setSearchCompleteCallback(this, getNextImage, null);

  // Find me kittens!!
  imageSearch.execute("kittens");
};

// Load the search API.
function firstLoad() {
  google.load('search', '1');
  google.setOnLoadCallback(loadImages);
};

// Handles requests sent by the popup (returns a kitten image).
function onKittenRequest(request, sender, sendResponse) {
  if (!loaded)
    return;
  var nextKitten = getNextImage();
  var imageData = getImageData(nextKitten);
  sendResponse(imageData);
  // Pre-load the next image now.
  loadNextImage();
};

// Listen for the popup to send a message to the background page.
chrome.extension.onRequest.addListener(onKittenRequest);

// Pre-load the kittens.
if (!loaded) {
  firstLoad();
  loaded = true;
};

