function songChanged(mutations, observer) {
		var title = document.getElementById("currently-playing-title").innerHTML;
		var artist = document.getElementById("player-artist").innerHTML;
		chrome.runtime.sendMessage({currentTitle: title, currentArtist: artist});
}

window.onload = function() {
		alert('new music');
		var songInfoWrapper = document.getElementById("playerSongInfo");

		var infoObserver = new MutationObserver(songChanged);
		infoObserver.observe(songInfoWrapper, {attributes: false, childList: true, characterData: false});
};

window.onunload = function() {
}