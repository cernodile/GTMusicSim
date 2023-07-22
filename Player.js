var song = [];
var furthest = 0;
var state = 0;
var hl = true;
var filesLoaded = false;
var loopTimer = 150;
var repeatProgress = [0, 0];
var sidebarColour = "#6088CD";
var primaryAccentColour = "#95DAFA";
var secondaryAccentColour = "#85C2DF";
var trackHighlightColour = "#C8E9F9";
var repeats = {
    "begins": [],
    "ends": []
};
for (var d = 0; d < 400; d++) {
    var arrColumn = [null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    song.push(arrColumn);
}
var lp = 1;
var locked = false;
var loop = true;
var playing = false;

function line(id) {
    switch (id) {
        case 1:
            return "B";
        case 2:
            return "A";
        case 3:
            return "G";
        case 4:
            return "F";
        case 5:
            return "E";
        case 6:
            return "D";
        case 7:
            return "C";
        case 8:
            return "b";
        case 9:
            return "a";
        case 10:
            return "g";
        case 11:
            return "f";
        case 12:
            return "e";
        case 13:
            return "d";
        case 14:
            return "c";
        default:
            return "?";
    }
}

function lineReverse(id) {
    switch (id) {
        case "B":
            return 1;
        case "A":
            return 2;
        case "G":
            return 3;
        case "F":
            return 4;
        case "E":
            return 5;
        case "D":
            return 6;
        case "C":
            return 7;
        case "b":
            return 8;
        case "a":
            return 9;
        case "g":
            return 10;
        case "f":
            return 11;
        case "e":
            return 12;
        case "d":
            return 13;
        case "c":
            return 14;
    }
}

function legacyTypeReverse(id) {
    let arg = id.split("");
    let type = arg[0] + arg[2];
    switch (type) {
        case "P-":
            return 0;
        case "Pb":
            return 1;
        case "P#":
            return 2;
        case "D-":
            return 3;
        case "B-":
            return 4;
        case "Bb":
            return 5;
        case "B#":
            return 6;
        case "H-":
            return 7;
        case "S-":
            return 8;
        case "Sb":
            return 9;
        case "S#":
            return 10;
        case "r-":
            return 11;
        case "R-":
            return 12;
        case "L-":
            return 13;
        case "F-":
            return 14;
        case "f-":
            return 15;
        case "fb":
            return 16;
        case "f#":
            return 17;
        case "s-":
            return 18;
        case "sb":
            return 19;
        case "s#":
            return 20;
        case "V-":
            return 21;
        case "Vb":
            return 22;
        case "V#":
            return 23;
        case "l-":
            return 24;
        case "lb":
            return 25;
        case "l#":
            return 26;
        case "E-":
            return 27;
        case "Eb":
            return 28;
        case "E#":
            return 29;
        case "T-":
            return 30;
        case "Tb":
            return 31;
        case "T#":
            return 32;
        default:
            return null;
    }
}

function getBpm(x) {
    return 60000 / (4 * x);
}

function gearData(x) {
    var res = [];
    for (var idx in song[x]) {
        var note = song[x][idx];
        if (note !== null) {
            if (!Array.isArray(note)) {
                var noteString = note.toString();
                if (!noteString.startsWith("-")) {
                    res.push(note.toString());
                }
            } else {
                for (var k = 0; k < 5; k++) {
                    if (note[k] !== null) {
                        var noteString = note[k].toString();
                        if (!noteString.startsWith("-")) {
                            res.push(note[k].toString());
                        }
                    }
                }
            }
        }
    }
    return alert("You'd have to input following text to audio gear(s) to recreate this line:\n" + res.join(" ").replace(new RegExp(",", "g"), ""));
}
function convertGMSFNoteType(x) {
  if (x == 1) return 0;
  if (x == 2) return 2;
  if (x == 3) return 1;
  if (x == 4) return 4;
  if (x == 5) return 6;
  if (x == 6) return 5;
  if (x == 7) return 3;
  if (x == 8) return 13;
  if (x == 9) return 8;
  if (x == 10) return 10;
  if (x == 11) return 9;
  if (x == 14) return 7;
  if (x == 16) return 15;
  if (x == 17) return 17;
  if (x == 18) return 16;
  if (x == 19) return 14;
  if (x == 20) return 18;
  if (x == 21) return 20;
  if (x == 22) return 19;
  if (x == 23) return 21;
  if (x == 24) return 23;
  if (x == 25) return 22;
  if (x == 26) return 24;
  if (x == 27) return 26;
  if (x == 28) return 25;
  if (x == 29) return 27; // EL
  if (x == 30) return 29;
  if (x == 31) return 28;
  if (x == 32) return 30; // Trumpet
  if (x == 33) return 32;
  if (x == 34) return 31;
  return 0;
}
function convertToGMSFNoteType(x) {
  if (x == 0) return 1;
  if (x == 1) return 3;
  if (x == 2) return 2;
  if (x == 3) return 7;
  if (x == 4) return 4;
  if (x == 5) return 6;
  if (x == 6) return 5;
  if (x == 7) return 14;
  if (x == 8) return 9;
  if (x == 9) return 11;
  if (x == 10) return 10;
  if (x == 11) return 12;
  if (x == 12) return 13;
  if (x == 13) return 8;
  if (x == 14) return 19;
  if (x == 15) return 16;
  if (x == 16) return 18;
  if (x == 17) return 17;
  if (x == 18) return 20;
  if (x == 19) return 22;
  if (x == 20) return 21;
  if (x == 21) return 23;
  if (x == 22) return 25;
  if (x == 23) return 24;
  if (x == 24) return 26;
  if (x == 25) return 28;
  if (x == 26) return 27;
  if (x == 27) return 29;
  if (x == 28) return 31;
  if (x == 29) return 30;
  return 0;
}
function updateNoteCount() {
    var data = {
        "piano": 0,
        "flat_piano": 0,
        "sharp_piano": 0,
        "drum": 0,
        "bass": 0,
        "flat_bass": 0,
        "sharp_bass": 0,
        "spooky_note": 0,
        "sax": 0,
        "flat_sax": 0,
        "sharp_sax": 0,
        "blank": 0,
        "repeat_begin": 0,
        "repeat_end": 0,
        "festive_note": 0,
        "flute": 0,
        "flat_flute": 0,
        "sharp_flute": 0,
        "spanish_guitar": 0,
        "flat_spanish_guitar": 0,
        "sharp_spanish_guitar": 0,
        "violin": 0,
        "flat_violin": 0,
        "sharp_violin": 0,
        "lyre": 0,
        "flat_lyre": 0,
        "sharp_lyre": 0,
        "electric_guitar": 0,
        "flat_electric_guitar": 0,
        "sharp_electric_guitar": 0,
        "mexican_trumpet": 0,
        "flat_mexican_trumpet": 0,
        "sharp_mexican_trumpet": 0
    }
    for (var m in song) {
        for (var n in song[m]) {
            if (song[m][n] !== null) {
                if (Array.isArray(song[m][n])) {
                    for (var k = 0; k < 5; k++) { if (song[m][n][k] !== null) { data[song[m][n][k].type]++; } }
                } else data[song[m][n].type]++;
            }
        }
    }
    for (var key in data) {
        var elem = document.getElementById("count_" + key);
        elem.innerHTML = "<img src='./assets/" + key + ".png'/>" + data[key];
        elem.style.display = data[key] == 0 ? "none" : "inline";
    }
}
function saveMusic() {
    var a = document.createElement('a');
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    var blob = new Blob(["%cernmusicsim;\nbpm=" + (15000 / loopTimer) + "\n" + song.join("\n")], {
        'type': 'application/octet-stream'
    });
    a.href = window.URL.createObjectURL(blob);
    a.download = "song-" + Date.now() + ".gtmusic";
    a.click();
    a.remove();
}
function saveMusicGMSF() {
    var data = new Uint8Array(12 + (song.length * 14 * 11));
    data[0] = 71; // G
    data[1] = 77; // M
    data[2] = 83; // S
    data[3] = 70; // F
    // versioning?
    data[4] = 0x01;
    data[5] = 0x0F;
    // rowlengths
    data[8] = song.length & 0xFF;
    data[9] = (song.length >> 8) & 0xFF;
    data[10] = 14;
    // bpm
    data[6] = Math.round(15000 / loopTimer);
    // clean the buffer
    for (var i = 11; i < data.length; i++) {
        data[i] = 0;
    }
    var seek = 12;
    for (var y = 14; y > 0; y--) {
        for (var x = 0; x < song.length; x++) {
            var note = song[x][y];
            var yOff = 14;
            if (note !== null && note !== undefined) {
                if (Array.isArray(note)) {
                    // serialize it now
                    data[seek + ((yOff - y) * song.length) + x] = 15;
                    seek++;
                    for (var k = 0; k < 5; k++) {
                        var rackNote = note[k];
                        if (rackNote !== null) {
                            var rackNoteID = convertToGMSFNoteType(rackNote.numType);
                            data[seek + ((yOff - y) * song.length) + x + (k * 2)] = rackNoteID;
                            data[seek + ((yOff - y) * song.length) + x + (k * 2) + 1] = lineReverse(rackNote.key) - 1;
                        } else {
                            data[seek + ((yOff - y) * song.length) + x + (k * 2)] = 0;
                            data[seek + ((yOff - y) * song.lengtH) + x + (k * 2) + 1] = 0;
                        }
                    }
                    data[seek + ((yOff - y) * song.length) + x + 10] = Math.round(note[5] * 3.03 * 100);
                    seek += 10;
                } else {
                    data[seek + ((yOff - y) * song.length) + x] = convertToGMSFNoteType(note.numType);
                }
            } else data[seek + ((yOff - y) * song.length) + x] = 0;
        }
    }
    // signoff
    var len = seek + (song.length * 14);
    data[len] = 0x4D;
    data[len+1] = 0x45;
    data[len+2] = 0x54;
    data[len+3] = 0x41;
    data[len+4] = 0x00;
    data[len+5] = 0x46;
    data[len+6] = 0x53;
    data[len+7] = 0x4D;
    data[len+8] = 0x47;
    var a = document.createElement('a');
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    var blob = new Blob([data.subarray(0, seek + (song.length * 14) + 9)], {type:"application/octet-stream"});
    a.href = window.URL.createObjectURL(blob);
    a.download = "song-" + Date.now() + ".GMSF";
    a.click();
    a.remove();
}
function loadGMSF(x) {
    if (x.getUint8(0, true) != 71 && x.getUint8(1, true) != 77 && x.getUint8(2, true) != 83 && x.getUint(3, true) != 70) {
        alert("Corrupt .GMSF file.");
        return;
    };
    if (window.looper !== null && playing) { clearInterval(window.looper); playing = false; lp = 0; };
    loopTimer = getBpm(x.getUint8(6, true));
    var rowLength = x.getUint16(8, true);
    song = [];
    var rowsToUse = rowLength > 400 ? rowLength : 400;
    for (var d = 0; d < rowsToUse; d++) {
        var arrColumn = [null, null, null, null, null, null, null, null, null, null, null, null, null, null];
        song.push(arrColumn);
    }
    if (rowsToUse > 400) {
        document.getElementById("loadout").width = (rowsToUse * 32) + 32;
        var canvas = document.getElementById("loadout");
        if (canvas.width > 32767)
            canvas.width = 32767;
        c = canvas.getContext("2d");
    }
    var seek = 12;
    for (var i = 0; i < 14; i++) {
        for (var j = 0; j < rowLength; j++) {
            var noteID = x.getUint8(seek, true);
            seek++;
            switch (noteID) {
                case 1: // piano
                    song[j][14 - i] = toNote(14 - i, 0);
                    break;
                case 2: // sharp
                    song[j][14 - i] = toNote(14 - i, 2);
                    break;
                case 3: // flat
                    song[j][14 - i] = toNote(14 - i, 1);
                    break;
                case 4: // bass
                    song[j][14 - i] = toNote(14 - i, 4);
                    break;
                case 5: // sharp bass
                    song[j][14 - i] = toNote(14 - i, 6);
                    break;
                case 6: // flat bass
                    song[j][14 - i] = toNote(14 - i, 5);
                    break;
                case 7: // drum
                    song[j][14 - i] = toNote(14 - i, 3);
                    break;
                case 8: // blank
                    song[j][14 - i] = toNote(14 - i, 13);
                    break;
                case 9: // sax
                    song[j][14 - i] = toNote(14 - i, 8);
                    break;
                case 10: // sharp sax
                    song[j][14 - i] = toNote(14 - i, 10);
                    break;
                case 11: // flat sax
                    song[j][14 - i] = toNote(14 - i, 9);
                    break;
                case 12: // repeat begin
                    song[j][14 - i] = toNote(14 - i, 11);
                    break;
                case 13: // repeat end
                    song[j][14 - i] = toNote(14 - i, 12);
                    break;
                case 14: // spooky
                    song[j][14 - i] = toNote(14 - i, 7);
                    break;
                case 15:
                    song[j][14 - i] = [null, null, null, null, null, null];
                    // seek 5x
                    for (var k = 0; k < 5; k++) {
                        var rackNoteID = x.getUint8(seek++, true);
                        var position = x.getUint8(seek++, true);
                        if (convertGMSFNoteType(rackNoteID) != 0) {
                            song[j][14 - i][k] = toNote(14 - position, convertGMSFNoteType(rackNoteID));
                        }
                    }
                    song[j][14 - i][5] = x.getUint8(seek++, true) / 100 * 0.33;
                    break;
               case 16: // flute
                   song[j][14 - i] = toNote(14 - i, 15);
                   break;
               case 17: // sharp flute
                   song[j][14 - i] = toNote(14 - i, 17);
                   break;
               case 18: // flat flute
                   song[j][14 - i] = toNote(14 - i, 16);
                   break;
               case 19: // festive
                   song[j][14 - i] = toNote(14 - i, 14);
                   break;
               case 20: // spanish guitar
                   song[j][14 - i] = toNote(14 - i, 18);
                   break;
               case 21: // sharp spanish guitar
                   song[j][14 - i] = toNote(14 - i, 20);
                   break;
               case 22: // flat spanish guitar
                   song[j][14 - i] = toNote(14 - i, 19);
                   break;
               case 23: // violin
                   song[j][14 - i] = toNote(14 - i, 21);
                   break;
               case 24: // sharp violin
                   song[j][14 - i] = toNote(14 - i, 23);
                   break;
               case 25: // flat violin
                   song[j][14 - i] = toNote(14 - i, 22);
                   break;
               case 26: // lyre
                   song[j][14 - i] = toNote(14 - i, 24);
                   break;
               case 27: // sharp lyre
                   song[j][14 - i] = toNote(14 - i, 26);
                   break;
               case 28: // flat lyre
                   song[j][14 - i] = toNote(14 - i, 25);
                   break;
               case 29: // el guitar
                   song[j][14 - i] = toNote(14 - i, 27);
                   break;
               case 30: // sharp el guitar
                   song[j][14 - i] = toNote(14 - i, 29);
                   break;
               case 31: // flat el guitar
                   song[j][14 - i] = toNote(14 - i, 28);
                   break;
               case 32: // trumpet
                   song[j][14 - i] = toNote(14 - i, 30);
                   break;
               case 33: // sharp trumpet
                   song[j][14 - i] = toNote(14 - i, 32);
                   break;
               case 34: // flat trumpet
                   song[j][14 - i] = toNote(14 - i, 31);
                   break;
            }
        }
    }
    updateFurthest();
    updateNoteCount();
    drawBox();
    reDraw();
}

var savefile = false;
function loadMusicSave(saveData) {
    var newArr = saveData.substr("%cernmusicsim;\n".length).split("\n");
    loopTimer = getBpm(parseInt(newArr[0].split("=")[1]));
    newArr.splice(0, 1);
    for (var k in newArr) {
        var lines = newArr[k].split(",");
        if (lines.length === 1) {
            lines = [null, null, null, null, null, null, null, null, null, null, null, null, null, null];
        }
        newArr[k] = lines;
        for (var c in lines) {
            if (lines[c] !== null && lines[c] !== "") {
                var key = 15 - lineReverse(lines[c].charAt(1));
                var typ = legacyTypeReverse(lines[c]);
                lines[c] = toNote(key, typ);
            } else lines[c] = null;
        }
    }
    song = newArr;
    updateNoteCount();
    savefile = true;
    if (furthest === 0) {
        furthest = 400;
    }
    updateFurthest();
    if (filesLoaded) {
        reDraw();
    }
    return;
}

function note(id, elem) {
    state = id;
    document.getElementById("active").id = "";
    switch (state) {
        case 0:
            img = imgdata["piano"].off;
            return elem.id = "active";
        case 1:
            img = imgdata["flat_piano"].off;
            return elem.id = "active";
        case 2:
            img = imgdata["sharp_piano"].off;
            return elem.id = "active";
        case 3:
            img = imgdata["drum"].off;
            return elem.id = "active";
        case 4:
            img = imgdata["bass"].off;
            return elem.id = "active";
        case 5:
            img = imgdata["flat_bass"].off;
            return elem.id = "active";
        case 6:
            img = imgdata["sharp_bass"].off;
            return elem.id = "active";
        case 7:
            img = imgdata["spooky_note"].off;
            return elem.id = "active";
        case 8:
            img = imgdata["sax"].off;
            return elem.id = "active";
        case 9:
            img = imgdata["flat_sax"].off;
            return elem.id = "active";
        case 10:
            img = imgdata["sharp_sax"].off;
            return elem.id = "active";
        case 11:
            img = imgdata["repeat_begin"].off;
            return elem.id = "active";
        case 12:
            img = imgdata["repeat_end"].off;
            return elem.id = "active";
        case 13:
            img = imgdata["blank"].off;
            return elem.id = "active";
        case 14:
            img = imgdata["festive_note"].off;
            return elem.id = "active";
        case 15:
            img = imgdata["flute"].off;
            return elem.id = "active";
        case 16:
            img = imgdata["flat_flute"].off;
            return elem.id = "active";
        case 17:
            img = imgdata["sharp_flute"].off;
            return elem.id = "active";
        case 18:
            img = imgdata["spanish_guitar"].off;
            return elem.id = "active";
        case 19:
            img = imgdata["flat_spanish_guitar"].off;
            return elem.id = "active";
        case 20:
            img = imgdata["sharp_spanish_guitar"].off;
            return elem.id = "active";
        case 21:
            img = imgdata["violin"].off;
            return elem.id = "active";
        case 22:
            img = imgdata["flat_violin"].off;
            return elem.id = "active";
        case 23:
            img = imgdata["sharp_violin"].off;
            return elem.id = "active";
        case 24:
            img = imgdata["lyre"].off;
            return elem.id = "active";
        case 25:
            img = imgdata["flat_lyre"].off;
            return elem.id = "active";
        case 26:
            img = imgdata["sharp_lyre"].off;
            return elem.id = "active";
        case 27:
            img = imgdata["electric_guitar"].off;
            return elem.id = "active";
        case 28:
            img = imgdata["flat_electric_guitar"].off;
            return elem.id = "active";
        case 29:
            img = imgdata["sharp_electric_guitar"].off;
            return elem.id = "active";
        case 30:
            img = imgdata["mexican_trumpet"].off;
            return elem.id = "active";
        case 31:
            img = imgdata["flat_mexican_trumpet"].off;
            return elem.id = "active";
        case 32:
            img = imgdata["sharp_mexican_trumpet"].off;
            return elem.id = "active";
    }
}

function myLoop() {
    if (!playing || !locked) { clearInterval(window.looper); return; }
        lp++;
        if (lp <= furthest) {
            let bucket = {
                "ends": [],
                "begins": []
            };
            for (var k in repeats.ends) {
                let ob = repeats.ends[k];
                if (ob[0] === lp - 1) {
                    bucket.ends.push([ob[0] - 1, ob[1]]);
                }
            }
            for (var k in repeats.begins) {
                let ob = repeats.begins[k];
                if (ob[0] < lp && ob[0] > repeatProgress[0] || ob[0] < lp && ob[0] === repeatProgress[0] && lineReverse(ob[1]) < repeatProgress[1]) {
                    bucket.begins.push([ob[0], ob[1]]);
                    break;
                }
            }
            if (bucket.ends.length > 0) {
                if (bucket.begins.length > 0) {
                    var old = lp;
                    lp = bucket.begins[0][0];
                    repeatProgress = [lp + 1, lineReverse(bucket.begins[0][1])];
                    if (hl) reDrawFromTo(lp, old);
                } else if (lp > furthest - 1) {
                    if (loop) {
                        var old = lp;
                        lp = 1;
                        repeatProgress = [0, 0];
                        if (hl) reDrawFromTo(old - 1, old);
                    } else {
                        if (hl) reDrawFromTo(lp - 1, lp);
                        repeatProgress = [0, 0];
                        locked = false;
                        playing = false;
                        clearInterval(window.looper);
                        return;
                    }
                }
            } else if (lp > furthest - 1) {
                if (loop) {
                    var old = lp
                    lp = 1;
                    repeatProgress = [0, 0];
                    if (hl) reDrawFromTo(old - 1, old);
                } else {
                    if (hl) reDrawFromTo(lp - 1, lp);
                    repeatProgress = [0, 0];
                    locked = false;
                    playing = false;
                    clearInterval(window.looper);
                    return;
                }
            }
            //myLoop();
        } else {
            if (loop && furthest > 0) {
                var old = lp
                lp = 1;
                repeatProgress = [0, 0];
                if (hl) reDrawFromTo(old - 1, old);
                //myLoop();
            } else {
                if (hl) reDrawFromTo(lp - 1, lp);
                repeatProgress = [0, 0];
                locked = false;
                playing = false;
                clearInterval(window.looper);
            }
        }
        var x = lp;
        if (hl) highLight(x, furthest);
        for (var j in song[lp - 1]) {
            if (song[lp - 1][j] !== null) {
                if (Array.isArray(song[lp - 1][j])) {
                  for (var k = 0; k < 5; k++) {
                      if (song[lp - 1][j][k] !== null) {
                          song[lp - 1][j][k].play(song[lp - 1][j][5]);
                      }
                  }
                } else song[lp - 1][j].play();
            }
        }
}

function updateFurthest() {
    let tr = [].concat(song);
    let fur = 0;
    repeats = {
        "begins": [],
        "ends": []
    };
    tr.forEach((k, idx) => {
        tr[idx] = [].concat(song[idx]);
        for (var k in tr[idx]) {
            if (tr[idx][k] !== null) {
                if (tr[idx][k].type === "repeat_begin") {
                    repeats.begins.push([idx + 1, tr[idx][k].key]);
                }
                if (tr[idx][k].type === "repeat_end") {
                    repeats.ends.push([idx + 1, tr[idx][k].key]);
                }
            }
        }
        if (tr[idx].sort(function(a, b){ return (a===null)-(b===null) || +(a>b)||-(a<b);})[0] !== null) {
            fur = idx + 2;
        }
    });
    furthest = fur;
    return fur;
}
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn").addEventListener("click", function(e) {
        if (!locked) {
            var timeout = 0;
            lp = 0;
            playing = true;
            locked = true;
            window.looper = setInterval(function() {
                if (playing) {
                    myLoop();
                }
            }, loopTimer);
        }
    });
    document.getElementById("hl").addEventListener("click", function(e) {
        switch (hl) {
            case true:
                hl = false;
                return document.getElementById("hl").innerText = "Highlight: OFF";
            case false:
                hl = true;
                return document.getElementById("hl").innerText = "Highlight: ON";
        }
    });
    document.getElementById("bpm").addEventListener("click", function(e) {
        var val = prompt("Enter BPM speed", 15000 / loopTimer);
        if (isNaN(val)) {
            return alert("Please insert a number.");
        } else {
            if (val > 19 && val < 201) {
                loopTimer = getBpm(parseInt(val));
                if (playing) {
                    clearInterval(window.looper);
                    window.looper = setInterval(function() { if (playing) {myLoop();} }, loopTimer);
                }
            } else {
                return alert("Growtopia only supports BPM ranging from 20 to 200.");
            }
        }
    });
    document.getElementById("pause").addEventListener("click", function(e) {
        lp = furthest;
        locked = false;
        playing = false;
        loop = false;
        clearInterval(window.looper);
        document.getElementById("loop").innerText = "Loop: OFF";
        setTimeout(() => {
            reDraw();
        }, loopTimer);
    });
    document.getElementById("loop").addEventListener("click", function(e) {
        switch (loop) {
            case true:
                loop = false;
                return document.getElementById("loop").innerText = "Loop: OFF";
            case false:
                loop = true;
                return document.getElementById("loop").innerText = "Loop: ON";
        }
    });
    var canvas = document.getElementById("loadout");
    window.c = canvas.getContext("2d");
    var boxSize = 32;
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        handleClick(e, true);
    });
    window.drawBox = function() {
        for (var row = 0; row < 16; row++) {
            for (var column = 0; column < 401; column++) {
                var x = column * boxSize;
                var y = (row) * boxSize;
                c.beginPath();
                c.lineWidth = 2;
                c.strokeStyle = 'black';
                if (x === 0 && y >= 32) {
                    c.fillStyle = sidebarColour;
                } else {
                    if (row % 2 == 1) c.fillStyle = secondaryAccentColour;
                    else c.fillStyle = primaryAccentColour;
                }
                if (row === 15) c.fillStyle = "#fff";
                c.rect(x, y, boxSize, boxSize);
                c.fill();
                c.stroke();
                if (x === 0 && y > 0 && row !== 15) {
                    c.font = "bold 26px Century Gothic";
                    c.fillStyle = "black";
                    c.textAlign = "center";
                    c.fillText(line(row), x + 16, y + 24, boxSize, boxSize);
                }
                if (row === 15 && column > 0) {
                    c.font = "bold 26px Century Gothic";
                    c.fillStyle = "black";
                    c.textAlign = "center";
                    number = ((column - 1) % 100) + 1;
                    c.fillText(number, x + 16, y + 24, boxSize, boxSize);
                }
                c.closePath();
                if (y === 0 & x > 0) {
                    c.drawImage(imgdata["gear"], x + 1, y + 1, 30, 30);
                } else if (y === 0) {
                    c.beginPath();
                    c.lineWidth = 2;
                    c.strokeStyle = 'black';
                    c.fillStyle = "#000000";
                    c.rect(x, y, boxSize, boxSize);
                    c.fill();
                    c.stroke();
                    c.closePath();
                }
            }
        }
    }

    function handleClick(e, del) {
        c.fillStyle = "black";
        var x = Math.floor(e.offsetX / boxSize) * boxSize / 32;
        var y = Math.abs(Math.floor(e.offsetY / boxSize) * boxSize / 32 - 15) + 3;
        if (x === 0 || y === 3) {
            return;
        } else x--;
        if (y === 18) {
            gearData(x);
            return;
        } else y -= 3;
        var clear = 0;
        var note = song[x][y];
        if (note != null) {
            if (Array.isArray(note)) {
                var res = [];
                for (var k = 0; k < 5; k++) {
                    if (note[k] !== null) {
                        var noteString = note[k].toString();
                        if (!noteString.startsWith("-")) {
                            res.push(note[k].toString());
                        }
                    }
                }
                alert("To make this audio rack, set volume to " + Math.round(note[5] * 3.03 * 100) + " and input: " + res.join(" "));
                return;
            }
            if (note.toString() === toNote(y, state).toString()) clear = 1;
        }
        if (del) clear = 1;
        if (clear) {
            c.clearRect(Math.floor(e.offsetX / boxSize) * boxSize,
                Math.floor(e.offsetY / boxSize) * boxSize,
                boxSize, boxSize);
            c.beginPath();
            if (y % 2 == 0) c.fillStyle = secondaryAccentColour;
            else c.fillStyle = primaryAccentColour;
            c.lineWidth = 2;
            c.strokeStyle = 'black';
            c.rect(Math.floor(e.offsetX / boxSize) * boxSize,
                Math.floor(e.offsetY / boxSize) * boxSize,
                boxSize, boxSize);
            c.fill();
            c.stroke();
            c.closePath();
        } else {
            c.drawImage(img, Math.floor(e.offsetX / boxSize) * boxSize + 1,
                Math.floor(e.offsetY / boxSize) * boxSize + 1,
                boxSize - 2, boxSize - 2);
        }
        if (clear === 1) {
            song[x][y] = null;
        } else {
            song[x][y] = toNote(y, state);
            song[x][y].play();
        }
        updateFurthest();
        updateNoteCount();
    }
    var loaded = 0;
    var max = 120; // give leeway like 10+ assets that could be missed
    window.addEventListener("loadedAsset", (obj) => {
        loaded++;
        if (loaded === max) {
            drawBox();
            (savefile ? reDraw() : null);
            document.getElementById("loading").remove();
            filesLoaded = true;
        }
    });
    window.dispatchEvent(new CustomEvent("loadImg"));
    window.highLight = function(x) {
        column = x;
        for (var row = 0; row < 15; row++) {
            var x = column * boxSize;
            var y = (row) * boxSize;
            var arrX = x / 32 - 1;
            var arrY = ((15 - row) * boxSize) / 32;
            if (song[arrX][arrY]) {
                var type = song[arrX][arrY].type;
                var key = song[arrX][arrY].key;
                if (Array.isArray(song[arrX][arrY])) { c.drawImage(imgdata["arack"].on, x, y, 32, 32); }
                else if (imgdata[type] !== null) { c.drawImage(imgdata[type].on, x, y, boxSize, boxSize); }
                c.strokeRect(x, y, boxSize, boxSize);
            } else if (y != 0) {
                c.beginPath();
                c.lineWidth = 2;
                c.strokeStyle = 'black';
                c.fillStyle = trackHighlightColour;
                c.rect(x, y, boxSize, boxSize);
                c.fill();
                c.stroke();
                c.closePath();
            }
            if (arrX > 0) {
                reDrawFromTo(arrX - 1, arrX + 1);
            }
        }
    }
    window.reDrawFromTo = function(a, b) {
        for (var row = 0; row < 15; row++) {
            for (var column = a; column < b; column++) {
                var x = column * boxSize;
                var y = (row) * boxSize;
                var arrX = x / 32 - 1;
                var arrY = ((15 - row) * boxSize) / 32;
                c.beginPath();
                c.lineWidth = 2;
                c.strokeStyle = 'black';
                if (x === 0 && y >= 32) {
                    c.fillStyle = sidebarColour;
                } else {
                    if (row % 2 == 1) c.fillStyle = secondaryAccentColour;
                    else c.fillStyle = primaryAccentColour;
                }
                c.rect(x, y, boxSize, boxSize);
                c.fill();
                c.stroke();
                if (song[arrX]) {
                    if (song[arrX][arrY]) {
                        var type = song[arrX][arrY].type;
                        var key = song[arrX][arrY].key;
                        if (Array.isArray(song[arrX][arrY])) { c.drawImage(imgdata["arack"].off, x, y, 32, 32); }
                        else if (imgdata[type] !== null) { c.drawImage(imgdata[type].off, x, y, boxSize, boxSize); }
                        c.strokeRect(x, y, boxSize, boxSize);
                    }
                }
                if (x === 0 && y > 0) {
                    c.font = "bold 26px Century Gothic";
                    c.fillStyle = "black";
                    c.textAlign = "center";
                    c.fillText(line(row), x + 16, y + 24, boxSize, boxSize);
                }
                c.closePath();
                if (y === 0 && x > 0) {
                    c.drawImage(imgdata["gear"], x + 1, y + 1, 30, 30);
                } else if (y === 0) {
                    c.beginPath();
                    c.lineWidth = 2;
                    c.strokeStyle = 'black';
                    c.fillStyle = "#000000";
                    c.rect(x, y, boxSize, boxSize);
                    c.fill();
                    c.stroke();
                }
            }
        }
    }
    window.reDraw = function() {
        reDrawFromTo(0, furthest + 2);
    }
});
