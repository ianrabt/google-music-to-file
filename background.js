chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
			console.log(request.currentTitle);
			console.log(request.currentArtist);
	}
);
