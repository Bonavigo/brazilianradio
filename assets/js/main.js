const AUDIO = {
	audio_tag: document.querySelector(".audio-tag"),
	centralPlayerButton: document.querySelector("#player_button"),
	startup() {
		var songs = document.querySelectorAll("[data-name]");
		for (let i = 0; i < songs.length; i++) {
			songs[i].addEventListener("click", function() { AUDIO.playSong(songs[i].dataset.name) });
		}
		this.audio_tag.volume = "0.4";
		this.audio_tag.addEventListener("onended", AUDIO.playerButton());
		this.centralPlayerButton.addEventListener("click", function() { AUDIO.playerButton() });

		var vol_down = document.querySelector("#vol_down");
		vol_down.addEventListener("click", function() { AUDIO.toggleVolume("down") });
		var vol_up = document.querySelector("#vol_up");
		vol_up.addEventListener("click", function() { AUDIO.toggleVolume("up") });

		this.audio_tag.src = "assets/audio/independencia.mp3";
	},
	playSong(song) {
		this.audio_tag.src = `assets/audio/${song}`;
		this.audio_tag.dataset.status = "pause";
		AUDIO.playerButton();
	},
	playerButton() {
		if (this.audio_tag.src !== "") {
			var status = this.audio_tag.dataset.status;
			switch (status) {
				case "pause":
					this.audio_tag.play();
					this.centralPlayerButton.firstChild.classList.remove('fa-play');
					this.centralPlayerButton.firstChild.classList.add('fa-pause');
					this.audio_tag.dataset.status = "play";
					break;
				case "play":
					this.audio_tag.pause();
					this.centralPlayerButton.firstChild.classList.add('fa-play');
					this.centralPlayerButton.firstChild.classList.remove('fa-pause');
					this.audio_tag.dataset.status = "pause";
					break;
			}
		}
	},
	toggleVolume(to) {
		if (to == 'up') {
			try {
				this.audio_tag.volume += 0.1;
			}
			catch (e) {
				alert("O volume já está no máximo!");
			}
		} else {
			try {
				this.audio_tag.volume -= 0.1;
			}
			catch (e) {
				alert("O volume já está no mínimo!");
			}
		}
	}
}

const KEYS_INTERPRETER = {
	interpret(event) {
		if (event.keyCode == '32') {
			AUDIO.playerButton();
		} else if (event.keyCode == '38') {
			AUDIO.toggleVolume("up");
		} else if (event.keyCode == '40') {
			AUDIO.toggleVolume("down");
		}
	}
}

document.addEventListener("DOMContentLoaded", function(event) {
	AUDIO.startup();
});

document.addEventListener("keydown", function(event) {
	KEYS_INTERPRETER.interpret(event);
});