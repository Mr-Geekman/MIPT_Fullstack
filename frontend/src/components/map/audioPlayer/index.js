import * as Constants from "../../../constants/constants";

function to_array(audio_map) {
    let result = audio_map.split(',');
    for (let i in result) {
        result[i] = (result[i].trim()).split(' ');
    }
    for (let i in result) {
        for (let j in result) {
            let temp = result[i][j];
            result[i][j] = result[j][i];
            result[j][i] = temp;
        }
    }
    return result;
}

function to_dict(tracks) {
    let result = {}
    tracks.forEach(track => {
        result[track.id] = Constants.BACKEND_PREFIX + track.file;
    });
    return result;
}


class AudioPlayer {
    constructor (audio_map, tracks) {
        this.audio_map = to_array(audio_map);
        this.tracks = to_dict(tracks)
        this.player = new Audio();
        this.player.loop = true;
        this.i = -1;
        this.j = -1;
    }

    stop() {
        this.player.pause();
        this.i = -1;
        this.j = -1;
    }

    change(i, j) {
        if (this.i == -1 || this.audio_map[i][j] != this.audio_map[this.i][this.j]) {
            this.i = i;
            this.j = j;
            try {
                this.player.pause();
                this.player.src = this.tracks[this.audio_map[this.i][this.j]];
                this.player.currentTime = 0;
                this.player.play();
            }
            catch (e) {
                //пока ошибки оставим в покое
            }
        }
    }
}

export default AudioPlayer;