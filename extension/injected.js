var visibilityObserverCreated = false;

function sendMessage (playing, title, artist, album) {
		chrome.runtime.sendMessage({
				state: playing ? "playing" : "stopped",
				currentTitle: title,
				currentArtist: artist
		});
}

function songChanged (mutations, observer) {
		var title = document.getElementById("currently-playing-title").innerHTML;
		var artist = document.getElementById("player-artist").innerHTML;
		sendMessage(true, title, artist);
}

// returns null if the page was opened without focus (and therefore is not fully loaded)
function getInfoWrapper () {
		var wrapper = document.getElementById("playerSongInfo");
		return wrapper;
} 

// watch the wrapper element, and send updated song information to background.js
function startObservers () {
		// now that the tab has focus, remove the observer for visibility changes
		if (visibilityObserverCreated) {
				document.removeEventListener("visibilitychange", startObservers);
				visibilityObserverCreated = false;
				console.log("loading extension");
		}

		songInfoElement = getInfoWrapper();

		// loop this function until songInfoElement can be set (i.e. the page is fully loaded)
		if (songInfoElement == null) {
				window.setTimeout(startObservers, 2500);
				return;
		}

		var infoObserver = new MutationObserver(songChanged);
		infoObserver.observe(songInfoElement, {attributes: false, childList: true, characterData: false});
}

window.onload = function () {
		sendMessage(false);

		if (document.hidden) {
				document.addEventListener("visibilitychange", startObservers);
				visibilityObserverCreated = true;
				return;
		}
		startObservers();
};

window.onunload = function () {
		sendMessage(false);
}
