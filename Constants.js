// Images
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const compressor = audioCtx.createDynamicsCompressor();
compressor.connect(audioCtx.destination);
//compressor.release.value = 0.14;
const gain = audioCtx.createGain();
gain.gain.value = 0.20;
//gain.gain.setValueAtTime(0.33, audioCtx.CurrentTime)
gain.connect(compressor);
function Asset(src) {
    var im = new Image();
    im.addEventListener("load", sAsset)
    im.src = "./assets/" + src;
    return im;
}

var HIGHEST_NOTE_ID = 32;
function imgIdToName(x) {
    if (x == 0) return "piano";
    if (x == 1) return "flat_piano";
    if (x == 2) return "sharp_piano";
    if (x == 3) return "drum";
    if (x == 4) return "bass";
    if (x == 5) return "flat_bass";
    if (x == 6) return "sharp_bass";
    if (x == 7) return "spooky_note";
    if (x == 8) return "sax";
    if (x == 9) return "flat_sax";
    if (x == 10) return "sharp_sax";
    if (x == 11) return "repeat_begin";
    if (x == 12) return "repeat_end";
    if (x == 13) return "blank";
    if (x == 14) return "festive_note";
    if (x == 15) return "flute";
    if (x == 16) return "flat_flute";
    if (x == 17) return "sharp_flute";
    if (x == 18) return "spanish_guitar";
    if (x == 19) return "flat_spanish_guitar";
    if (x == 20) return "sharp_spanish_guitar";
    if (x == 21) return "violin";
    if (x == 22) return "flat_violin";
    if (x == 23) return "sharp_violin";
    if (x == 24) return "lyre";
    if (x == 25) return "flat_lyre";
    if (x == 26) return "sharp_lyre";
    if (x == 27) return "electric_guitar";
    if (x == 28) return "flat_electric_guitar";
    if (x == 29) return "sharp_electric_guitar";
    if (x == 30) return "mexican_trumpet";
    if (x == 31) return "flat_mexican_trumpet";
    if (x == 32) return "sharp_mexican_trumpet";
    return "piano";
}
window.addEventListener("loadImg", () => {
    imgdata = {};
    imgdata["gear"] = Asset("gear.png");
    imgdata["arack"] = {"off": Asset("arack.png"), "on": Asset("arack_on.png")};
    imgdata["piano"] = {"off": Asset("piano.png"), "on": Asset("piano_on.png")};
    imgdata["flat_piano"] = {"off": Asset("flat_piano.png"), "on": Asset("flat_piano_on.png")};
    imgdata["sharp_piano"] = {"off": Asset("sharp_piano.png"), "on": Asset("sharp_piano_on.png")};
    imgdata["drum"] = {"off": Asset("drum.png"), "on": Asset("drum_on.png")};
    imgdata["bass"] = {"off": Asset("bass.png"), "on": Asset("bass_on.png")};
    imgdata["flat_bass"] = {"off": Asset("flat_bass.png"), "on": Asset("flat_bass_on.png")};
    imgdata["sharp_bass"] = {"off": Asset("sharp_bass.png"), "on": Asset("sharp_bass_on.png")};
    imgdata["spooky_note"] = {"off": Asset("spooky_note.png"), "on": Asset("spooky_on.png")};
    imgdata["festive_note"] = {"off": Asset("festive_note.png"), "on": Asset("festive_on.png")};
    imgdata["sax"] = {"off": Asset("sax.png"), "on": Asset("sax_on.png")};
    imgdata["flat_sax"] = {"off": Asset("flat_sax.png"), "on": Asset("flat_sax_on.png")};
    imgdata["sharp_sax"] = {"off": Asset("sharp_sax.png"), "on": Asset("sharp_sax_on.png")};
    imgdata["repeat_begin"] = {"off": Asset("repeat_begin.png"), "on": Asset("repeat_begin_on.png")};
    imgdata["repeat_end"] = {"off": Asset("repeat_end.png"), "on": Asset("repeat_end_on.png")};
    imgdata["blank"] = {"off": Asset("blank.png"), "on": Asset("blank_on.png")};
    imgdata["flute"] = {"off": Asset("flute.png"), "on": Asset("flute_on.png")};
    imgdata["flat_flute"] = {"off": Asset("flat_flute.png"), "on": Asset("flat_flute_on.png")};
    imgdata["sharp_flute"] = {"off": Asset("sharp_flute.png"), "on": Asset("sharp_flute_on.png")};
    imgdata["spanish_guitar"] = {"off": Asset("spanish_guitar.png"), "on": Asset("spanish_guitar_on.png")};
    imgdata["flat_spanish_guitar"] = {"off": Asset("flat_spanish_guitar.png"), "on": Asset("flat_spanish_guitar_on.png")};
    imgdata["sharp_spanish_guitar"] = {"off": Asset("sharp_spanish_guitar.png"), "on": Asset("sharp_spanish_guitar_on.png")};
    imgdata["violin"] = {"off": Asset("violin.png"), "on": Asset("violin_on.png")};
    imgdata["flat_violin"] = {"off": Asset("flat_violin.png"), "on": Asset("flat_violin_on.png")};
    imgdata["sharp_violin"] = {"off": Asset("sharp_violin.png"), "on": Asset("sharp_violin_on.png")};
    imgdata["lyre"] = {"off": Asset("lyre.png"), "on": Asset("lyre_on.png")};
    imgdata["flat_lyre"] = {"off": Asset("flat_lyre.png"), "on": Asset("flat_lyre_on.png")};
    imgdata["sharp_lyre"] = {"off": Asset("sharp_lyre.png"), "on": Asset("sharp_lyre_on.png")};
    imgdata["electric_guitar"] = {"off": Asset("el_guitar.png"), "on": Asset("el_guitar_on.png")};
    imgdata["flat_electric_guitar"] = {"off": Asset("flat_el_guitar.png"), "on": Asset("flat_el_guitar_on.png")};
    imgdata["sharp_electric_guitar"] = {"off": Asset("sharp_el_guitar.png"), "on": Asset("sharp_el_guitar_on.png")};
    imgdata["mexican_trumpet"] = {"off": Asset("mexican_trumpet.png"), "on": Asset("mexican_trumpet_on.png")};
    imgdata["flat_mexican_trumpet"] = {"off": Asset("flat_mexican_trumpet.png"), "on": Asset("flat_mexican_trumpet_on.png")};
    imgdata["sharp_mexican_trumpet"] = {"off": Asset("sharp_mexican_trumpet.png"), "on": Asset("sharp_mexican_trumpet_on.png")};

    img = imgdata["piano"].off;
});

function sAsset(f) {
    return window.dispatchEvent(new CustomEvent("loadedAsset", {
        detail: {
            file: f.target.src
        }
    }));
}

var audioStor = {};
audioStor["spooky"] = {"regular": {}};
audioStor["piano"] = {"regular": {}, "flat": {}, "sharp": {}};
audioStor["drum"] = {"regular": {}};
audioStor["bass"] = {"regular": {}, "flat": {}, "sharp": {}};
audioStor["sax"] = {"regular": {}, "flat": {}, "sharp": {}};
audioStor["festive"] = {"regular": {}, "flat": {}, "sharp": {}};
audioStor["flute"] = {"regular": {}, "flat": {}, "sharp": {}};
audioStor["spanish_guitar"] = {"regular": {}, "flat": {}, "sharp": {}};
audioStor["violin"] = {"regular": {}, "flat": {}, "sharp": {}};
audioStor["lyre"] = {"regular": {}, "flat": {}, "sharp": {}};
audioStor["electric_guitar"] = {"regular": {}, "flat": {}, "sharp": {}};
audioStor["mexican_trumpet"] = {"regular": {}, "flat": {}, "sharp": {}};

var range_normal = [1, 3, 5, 6, 8, 10, 12, 13, 15, 17, 18, 20, 22, 24];
var range_letters = ["c","d","e","f","g","a","b","C","D","E","F","G","A","B"];
var range_flat = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 25];
var half_range = [6, 5, 4, 3, 2, 1, 0];
var half_letters = ["C","D","E","F","G","A","B"];
function createAudioStorCache(stem, fullRange, hasFlats, letter, numType, fileStem) {
    var res = {"regular":{}};
    if (hasFlats === true && fullRange) {
        res["flat"] = {};
        res["sharp"] = {};
    }
    if (!fileStem)
        fileStem = stem;
    var rangeToUse = fullRange ? range_normal : half_range;
    var letters = rangeToUse.length == 7 ? half_letters : range_letters;
    for (var k = 0; k < rangeToUse.length; k++) {
        var noteBuild = new Note_V2({
            key: letters[k],
            path: fileStem + "_" + rangeToUse[k] + ".wav",
            type: stem,
            stem: stem,
            numType: numType,
            gearType: letter,
            audioCtx: audioCtx
        });
        res.regular[k] = noteBuild;
        // e# -> f, E# -> F, b# -> C
        if (hasFlats === true && fullRange == true && (letters[k] == "f" || letters[k] == "F" || letters[k] == "C")) {
            var noteBuild = new Note_V2({
                key: range_letters[k-1],
                path: fileStem + "_" + rangeToUse[k] + ".wav",
                type: "sharp_" + stem,
                stem: stem,
                numType: numType + 2,
                gearType: letter,
                audioCtx: audioCtx
            });
            res.sharp[k-1] = noteBuild;
        }
    }
    if (hasFlats == true && fullRange == true) {
        for (var k = 0; k < range_flat.length - 1; k++) {
            var noteBuild = new Note_V2({
                key: letters[k],
                path: fileStem + "_" + range_flat[k] + ".wav",
                type: "flat_" + stem,
                stem: stem,
                flat: true,
                numType: numType + 1,
                gearType: letter,
                audioCtx: audioCtx
            });
            res.flat[k] = noteBuild;
            if (letters[k] != "e" && letters[k] != "E" && letters[k] != "b") {
                var noteBuild = new Note_V2({
                    key: range_letters[k],
                    path: fileStem + "_" + range_flat[k+1] + ".wav",
                    type: "sharp_" + stem,
                    stem: stem,
                    sharp: true,
                    numType: numType +2,
                    gearType: letter,
                    audioCtx: audioCtx
                });
                res.sharp[k] = noteBuild;
            }
        }
    }
    return res;
}

window.addEventListener("loadAudio", () => {
audioStor["spooky"] = createAudioStorCache("spooky_note", true, false, "-", 7, "spooky");
audioStor["festive"] = createAudioStorCache("festive_note", true, false, "-", 14, "festive");
audioStor["piano"] = createAudioStorCache("piano", true, true, "P", 0);
audioStor["drum"] = createAudioStorCache("drum", false, false, "D", 3);
audioStor["bass"] = createAudioStorCache("bass", true, true, "B", 4);
audioStor["sax"] = createAudioStorCache("sax", true, true, "S", 8);
audioStor["flute"] = createAudioStorCache("flute", true, true, "F", 15);
audioStor["spanish_guitar"] = createAudioStorCache("spanish_guitar", true, true, "G", 18);
audioStor["violin"] = createAudioStorCache("violin", true, true, "V", 21);
audioStor["lyre"] = createAudioStorCache("lyre", true, true, "L", 24);
audioStor["electric_guitar"] = createAudioStorCache("electric_guitar", true, true, "E", 27);
audioStor["mexican_trumpet"] = createAudioStorCache("mexican_trumpet", true, true, "T", 30);
});

function createAtlas() {
    //window.atlas = document.createElement("canvas");
    window.atlas = new OffscreenCanvas(canvas.width, canvas.height);
    var noteIDs = 32;
    window.atlasContext = atlas.getContext('2d', { alpha: false });
    window.atlasContext.imageSmoothingEnabled = false;
    for (var i = 0; i <= noteIDs; i++) {
        var imgContext = imgdata[imgIdToName(i)];
        atlasContext.drawImage(imgContext.off, i * 32, 0, 32, 32);
        atlasContext.drawImage(imgContext.on, i * 32, 32, 32, 32);
    }
    atlasContext.drawImage(imgdata["arack"].off, (noteIDs + 1) * 32, 0, 32, 32);
    atlasContext.drawImage(imgdata["arack"].on, (noteIDs + 1) * 32, 32, 32, 32);
    atlasContext.drawImage(imgdata["gear"], (noteIDs + 2) * 32, 0, 32, 32);
    atlasContext.drawImage(imgdata["gear"], (noteIDs + 2) * 32, 32, 32, 32);
    //document.body.appendChild(window.atlas);
}

function toNote(convert, state) {
    if (state === 13) return new Note_V2({
        key: line(14-convert),
        type: "blank",
        numType: 13,
        audioCtx: audioCtx
    });
    if (state > 10) {
        switch (state) {
            case 11:
                return new Note_V2({
                    key: line(14-convert),
                    type: "repeat_begin",
                    audioCtx: audioCtx,
                    numType: 11
                });
            case 12:
                return new Note_V2({
                    key: line(14-convert),
                    type: "repeat_end",
                    audioCtx: audioCtx,
                    numType: 12
                });
        }
    }
    if (state === -1) {
        var arr = [null, null, null, null, null, null, null];
        arr[5] = 1;
        arr[6] = audioCtx.createGain();
        arr[6].gain.value = 1;
        arr[6].connect(gain);
        return arr;
    }
    if (state === 0) { return audioStor["piano"].regular[convert-1]; }
    if (state === 1) { return audioStor["piano"].flat[convert-1]; }
    if (state === 2) { return audioStor["piano"].sharp[convert-1]; }

    if (state === 3) {
        if (convert > 7) { convert -= 7; }
        return audioStor["drum"].regular[convert - 1];
    }

    if (state === 4) { return audioStor["bass"].regular[convert-1]; }
    if (state === 5) { return audioStor["bass"].flat[convert-1]; }
    if (state === 6) { return audioStor["bass"].sharp[convert-1]; }

    if (state === 7) { return audioStor["spooky"].regular[convert-1]; }

    if (state === 8) { return audioStor["sax"].regular[convert-1]; }
    if (state === 9) { return audioStor["sax"].flat[convert-1]; }
    if (state === 10) { return audioStor["sax"].sharp[convert-1]; }

    if (state === 14) { return audioStor["festive"].regular[convert-1]; }

    if (state === 15) { return audioStor["flute"].regular[convert-1]; }
    if (state === 16) { return audioStor["flute"].flat[convert-1]; }
    if (state === 17) { return audioStor["flute"].sharp[convert-1]; }

    if (state === 18) { return audioStor["spanish_guitar"].regular[convert-1]; }
    if (state === 19) { return audioStor["spanish_guitar"].flat[convert-1]; }
    if (state === 20) { return audioStor["spanish_guitar"].sharp[convert-1]; }

    if (state === 21) { return audioStor["violin"].regular[convert-1]; }
    if (state === 22) { return audioStor["violin"].flat[convert-1]; }
    if (state === 23) { return audioStor["violin"].sharp[convert-1]; }

    if (state === 24) { return audioStor["lyre"].regular[convert-1]; }
    if (state === 25) { return audioStor["lyre"].flat[convert-1]; }
    if (state === 26) { return audioStor["lyre"].sharp[convert-1]; }

    if (state === 27) { return audioStor["electric_guitar"].regular[convert-1]; }
    if (state === 28) { return audioStor["electric_guitar"].flat[convert-1]; }
    if (state === 29) { return audioStor["electric_guitar"].sharp[convert-1]; }

    if (state === 30) { return audioStor["mexican_trumpet"].regular[convert-1]; }
    if (state === 31) { return audioStor["mexican_trumpet"].flat[convert-1]; }
    if (state === 32) { return audioStor["mexican_trumpet"].sharp[convert-1]; }
    return null;
}
