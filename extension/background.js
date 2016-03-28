chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
			console.log(request.currentTitle);
			console.log(request.currentArtist);

			chrome.runtime.sendNativeMessage(
				'net.ianrabt.google_music_to_file',
				{
						text: request.currentTitle + " - " + request.currentArtist,
						path: "/home/ianrtaylor/test"
				},

				function(response) {
						console.log("received " + response);
				}
			);
	}
);
