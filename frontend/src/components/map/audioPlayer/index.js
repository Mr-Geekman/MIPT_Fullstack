import * as Constants from "../../../constants/constants";

function to_array(audio_map) {
    let result = audio_map.split(',');
    for (let i in result) {
        result[i] = (result[i].trim()).split(' ');
    }
    
    //транспонируем массив
    result = result[0].map((col, i) => result.map(row => row[i]));
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
        this.timer = null;
        this.player.loop = true;
        this.i = -1;
        this.j = -1;
        this.willPlay = 0;
        this.currentPlay = 0;
        this.stopped = 0;
    }

    stop() {
        clearTimeout(this.timer);
        this.player.pause();
        this.player.currentTime = 0;
        this.willPlay = 0;
        this.currentPlay = 0;
        this.i = -1;
        this.j = -1;
        this.stopped = 1;
    }

    unstop() {
        this.stopped = 0;
    }

    map_leaved() {
        clearTimeout(this.timer);
        this.willPlay = this.currentPlay;
    }

    change(i, j) {
        if (this.stopped) return;
        if (this.i == -1 || this.audio_map[i][j] != this.audio_map[this.i][this.j]) {
            this.i = i;
            this.j = j;
            this.willPlay = this.audio_map[i][j];
            clearTimeout(this.timer);
            if (this.willPlay != this.currentPlay) {
                this.timer = setTimeout(track_id => {
                    this.currentPlay = track_id;
                    this.player.pause();
                    if (this.audio_map[i][j] != "_") {
                        this.player.src = this.tracks[track_id];
                        this.player.currentTime = 0;
                        let play_promise = this.player.play();
                        
                        if (play_promise != undefined) {
                            play_promise.catch(error => {
                                console.log(error.message);
                            });
                        }
                    }
                }, 2000, this.audio_map[i][j]);
            }
        }
    }
}

export default AudioPlayer;