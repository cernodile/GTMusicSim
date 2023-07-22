class Note_V2 {
    constructor(args) {
        this.file = args.path;
        this.numType = args.numType;
        this.stem = args.stem;
        this.gearType = args.gearType || "-";
        this.type = args.type || "Unidentified";
        this.flat = args.flat || false;
        this.sharp = args.sharp || false;
        if (args.audioCtx == null)
            throw new Error(`Missing context for ${args.path}`);
        this.audioCtx = args.audioCtx;
        if (this.type != "repeat_begin" && this.type != "repeat_end" && this.type != "blank") {
            this.source = this.audioCtx.createBufferSource();
            const request = new XMLHttpRequest();
            request.open("GET", "./notes/" + this.file);
            request.responseType = "arraybuffer";
            request.onload = () => {
                const audioData = request.response;
                audioCtx.decodeAudioData(
                    audioData,
                    (buffer) => {
                        this.source.buffer = buffer;
                    }, (err) => console.error(err.err),
                );
                window.dispatchEvent(new CustomEvent("loadedAsset", {
                    detail: {
                        file: "./notes/" + this.file
                    }
                }));
            }
            request.send();
        }
        this.key = args.key || "?";
    }
    play(volume = 0.33) {
        if (this.type != "repeat_begin" && this.type != "repeat_end" && this.type != "blank") {
            var x = this.audioCtx.createBufferSource();
            x.buffer = this.source.buffer;
            if (volume != 0.33) {
                var note_gain = audioCtx.createGain();
                note_gain.gain.value = volume;
                note_gain.connect(audioCtx.destination);
                x.connect(note_gain);
                x.addEventListener("ended", () => {note_gain.disconnect(audioCtx.destination);});
            } else x.connect(gain);
            x.start();
        }
    }
    toString() {
        let t = this.gearType;
        let k = this.key;
        let n = "-";
        if (this.type.includes("flat"))
            n = "b";
        else if (this.type.includes("sharp"))
            n = "#";
        return t + k + n;
    }
}
