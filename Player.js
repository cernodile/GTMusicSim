var arr = [];
var furthest = 0;
var state = 0;
var loopTimer = 150;
var repeatProgress = [0, 0];
var repeats = {
    "begins": [],
    "ends": []
};
for (var d = 0; d < 400; d++) {
    var arrColumn = [null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    arr.push(arrColumn);
}
var i = 1;
var locked = false;
var loop = true;

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

function typeReverse(id) {
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
        default:
            return null;
    }
}

function getBpm(x) {
    return 60000 / (4 * x);
}

function gearData(x) {
    return alert("You'd have to input following text to audio gear(s) to recreate this line:\n" + arr[x].toString().replace(new RegExp(",", "g"), ""));
}

function save() {
    var a = document.createElement('a');
    var blob = new Blob(["%cernmusicsim;\nbpm=" + (15000 / loopTimer) + "\n" + arr.join("\n")], {
        'type': 'application/octet-stream'
    });
    a.href = window.URL.createObjectURL(blob);
    a.download = "song-" + Date.now() + ".gtmusic";
    a.click();
}

function loadSave(saveData) {
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
                var typ = typeReverse(lines[c]);
                lines[c] = toNote(key, typ);
            } else lines[c] = null;
        }
    }
    arr = newArr;
    var data = {
        "piano": 0,
        "flat_piano": 0,
        "sharp_piano": 0,
        "drum": 0,
        "bass": 0,
        "flat_bass": 0,
        "sharp_bass": 0,
        "spooky": 0,
        "sax": 0,
        "flat_sax": 0,
        "sharp_sax": 0,
        "blank": 0,
        "repeat_begin": 0,
        "repeat_end": 0
    }
    for (var m in arr) {
        for (var n in arr[m]) {
            if (arr[m][n] !== null) {
                data[arr[m][n].type]++;
            }
        }
    }
    for (var key in data) {
        document.getElementById("count_" + key).innerHTML = "<img src='./assets/" + key + ".png'/>" + data[key];
    }
    if (furthest === 0) {
        furthest = 400;
        reDraw();
        updateFurthest();
    } else {
        updateFurthest()
        reDraw();
    }
    return;
}

function note(id, elem) {
    state = id;
    document.getElementById("active").id = "";
    switch (state) {
        case 0:
            img = im;
            return elem.id = "active";
        case 1:
            img = im_flat;
            return elem.id = "active";
        case 2:
            img = im_sharp;
            return elem.id = "active";
        case 3:
            img = im_drum;
            return elem.id = "active";
        case 4:
            img = im_bass;
            return elem.id = "active";
        case 5:
            img = im_flat_bass;
            return elem.id = "active";
        case 6:
            img = im_sharp_bass;
            return elem.id = "active";
        case 7:
            img = im_spooky;
            return elem.id = "active";
        case 8:
            img = im_sax;
            return elem.id = "active";
        case 9:
            img = im_flat_sax;
            return elem.id = "active";
        case 10:
            img = im_sharp_sax;
            return elem.id = "active";
        case 11:
            img = im_repeat_begin;
            return elem.id = "active";
        case 12:
            img = im_repeat_end;
            return elem.id = "active";
        case 13:
            img = im_blank;
            return elem.id = "active";
    }
}

function myLoop() {
    setTimeout(function() {
        i++;
        console.log("Playing Line: " + (i - 1));
        if (i <= furthest) {
            let bucket = {
                "ends": [],
                "begins": []
            };
            for (var k in repeats.ends) {
                let ob = repeats.ends[k];
                if (ob[0] === i - 1) {
                    bucket.ends.push([ob[0] - 1, ob[1]]);
                }
            }
            for (var k in repeats.begins) {
                let ob = repeats.begins[k];
                if (ob[0] < i && ob[0] > repeatProgress[0] || ob[0] < i && ob[0] === repeatProgress[0] && lineReverse(ob[1]) < repeatProgress[1]) {
                    bucket.begins.push([ob[0], ob[1]]);
                    break;
                }
            }
            if (bucket.ends.length > 0) {
                if (bucket.begins.length > 0) {
                    old = i;
                    i = bucket.begins[0][0];
                    repeatProgress = [i + 1, lineReverse(bucket.begins[0][1])];
                    reDrawFromTo(i, old);
                } else if (i > furthest - 1) {
                    if (loop) {
                        i = 1;
                        repeatProgress = [0, 0];
                        reDraw();
                    } else {
                        reDraw();
                        repeatProgress = [0, 0];
                        locked = false;
                        return;
                    }
                }
            } else if (i > furthest - 1) {
                if (loop) {
                    i = 1;
                    repeatProgress = [0, 0];
                    reDraw();
                } else {
                    reDraw();
                    repeatProgress = [0, 0];
                    locked = false;
                    return;
                }
            }
            myLoop();
        } else {
            if (loop && furthest > 0) {
                i = 1;
                repeatProgress = [0, 0];
                reDraw();
                myLoop();
            } else {
                reDraw();
                repeatProgress = [0, 0];
                locked = false;
            }
        }
        var x = i;
        highLight(x, furthest);
        for (var j in arr[i - 1]) {
            if (arr[i - 1][j] !== null) {
                arr[i - 1][j].play();
            }
        }
    }, loopTimer);
}

function updateFurthest() {
    let tr = [].concat(arr);
    let fur = 0;
    repeats = {
        "begins": [],
        "ends": []
    };
    tr.forEach((k, idx) => {
        tr[idx] = [].concat(arr[idx]);
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
        if (tr[idx].sort()[0] !== null) {
            fur = idx + 2;
        }
    });
    furthest = fur;
    return fur;
}
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn").addEventListener("click", function(e) {
        if (!locked) {
            preloadMobileAudio(); // Support for Firefox Android and iOS Safari
            var timeout = 0;
            setTimeout(() => {
                i = 0;
                myLoop();
                locked = true;
            }, timeout);
        }
    });
    document.getElementById("bpm").addEventListener("click", function(e) {
        var val = prompt("Enter BPM speed", 15000 / loopTimer);
        if (isNaN(val)) {
            return alert("Please insert a number.");
        } else {
            if (val > 19 && val < 201) {
                loopTimer = getBpm(parseInt(val));
            } else {
                return alert("Growtopia only supports BPM ranging from 20 to 200.");
            }
        }
    });
    document.getElementById("pause").addEventListener("click", function(e) {
        i = furthest;
        locked = false;
        loop = false;
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
                return;
        }
    });
    var canvas = document.getElementById("loadout"),
        c = canvas.getContext("2d"),
        boxSize = 32
    canvas.addEventListener('click', handleClick);

    window.drawBox = function() {
        for (var row = 0; row < 15; row++) {
            for (var column = 0; column < 401; column++) {
                var x = column * boxSize;
                var y = (row) * boxSize;
                c.beginPath();
                c.lineWidth = 2;
                c.strokeStyle = 'black';
                if (x === 0 && y >= 32) {
                    c.fillStyle = "#499d2f";
                } else {
                    c.fillStyle = "#57ca32";
                }
                c.rect(x, y, boxSize, boxSize);
                c.fill();
                c.stroke();
                if (x === 0 && y > 0) {
                    c.font = "28px Gothic Century";
                    c.fillStyle = "black";
                    c.textAlign = "center";
                    c.fillText(line(row), x + 16, y + 24, boxSize, boxSize);
                }
                c.closePath();
                if (y === 0 & x > 0) {
                    c.drawImage(gear, x + 1, y + 1, 30, 30);
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

    function handleClick(e) {
        c.fillStyle = "black";
        var x = Math.floor(e.offsetX / boxSize) * boxSize / 32;
        var y = Math.abs(Math.floor(e.offsetY / boxSize) * boxSize / 32 - 14) + 3;
        if (x === 0) {
            return;
        } else x--;
        if (y === 17) {
            gearData(x);
            return;
        } else y -= 2;
        var clear = 0;
        var note = arr[x][y];
        if (note) {
            if (note.toString() === toNote(y, state).toString()) clear = 1;
        }
        if (clear) {
            c.clearRect(Math.floor(e.offsetX / boxSize) * boxSize,
                Math.floor(e.offsetY / boxSize) * boxSize,
                boxSize, boxSize);
            c.beginPath();
            c.fillStyle = "#57ca32";
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
            arr[x][y] = null;
        } else {
            arr[x][y] = toNote(y, state);
            arr[x][y].play();
            updateFurthest();
        }
        var data = {
            "piano": 0,
            "flat_piano": 0,
            "sharp_piano": 0,
            "drum": 0,
            "bass": 0,
            "flat_bass": 0,
            "sharp_bass": 0,
            "spooky": 0,
            "sax": 0,
            "flat_sax": 0,
            "sharp_sax": 0,
            "blank": 0,
            "repeat_begin": 0,
            "repeat_end": 0
        }
        for (var m in arr) {
            for (var n in arr[m]) {
                if (arr[m][n] !== null) {
                    data[arr[m][n].type]++;
                }
            }
        }
        for (var key in data) {
            document.getElementById("count_" + key).innerHTML = "<img src='./assets/" + key + ".png'/>" + data[key];
        }
    }
    var loaded = 0;
    var max = 29;
    window.addEventListener("loadedAsset", (obj) => {
        var file = obj.detail.file;
        loaded++;
        console.log(loaded + "/" + max + " - " + file);
        if (loaded === max) {
            if (furthest < 1) drawBox();
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
            c.beginPath();
            c.lineWidth = 2;
            c.strokeStyle = 'black';
            c.fillStyle = "#62f035";
            c.rect(x, y, boxSize, boxSize);
            c.fill();
            c.stroke();
            c.closePath();
            if (arr[arrX][arrY]) {
                var type = arr[arrX][arrY].type;
                var key = arr[arrX][arrY].key;
                switch (type) {
                    case "piano":
                        c.drawImage(im_on, x + 1, y + 1, 30, 30);
                        break;
                    case "flat_piano":
                        c.drawImage(im_flat_on, x + 1, y + 1, 30, 30);
                        break;
                    case "sharp_piano":
                        c.drawImage(im_sharp_on, x + 1, y + 1, 30, 30);
                        break;
                    case "drum":
                        c.drawImage(im_drum_on, x + 1, y + 1, 30, 30);
                        break;
                    case "bass":
                        c.drawImage(im_bass_on, x + 1, y + 1, 30, 30);
                        break;
                    case "flat_bass":
                        c.drawImage(im_flat_bass_on, x + 1, y + 1, 30, 30);
                        break;
                    case "sharp_bass":
                        c.drawImage(im_sharp_bass_on, x + 1, y + 1, 30, 30);
                        break;
                    case "spooky":
                        c.drawImage(im_spooky_on, x + 1, y + 1, 30, 30);
                        break;
                    case "sax":
                        c.drawImage(im_sax_on, x + 1, y + 1, 30, 30);
                        break;
                    case "flat_sax":
                        c.drawImage(im_flat_sax_on, x + 1, y + 1, 30, 30);
                        break;
                    case "sharp_sax":
                        c.drawImage(im_sharp_sax_on, x + 1, y + 1, 30, 30);
                        break;
                    case "repeat_begin":
                        c.drawImage(im_repeat_begin_on, x + 1, y + 1, 30, 30);
                        break;
                    case "repeat_end":
                        c.drawImage(im_repeat_end_on, x + 1, y + 1, 30, 30);
                        break;
                    case "blank":
                        c.drawImage(im_blank_on, x + 1, y + 1, 30, 30);
                        break;
                }
            }
            if (arrX > 0) {
                if (y !== 0) {
                    c.beginPath();
                    c.lineWidth = 2;
                    c.strokeStyle = 'black';
                    c.fillStyle = "#57ca32";
                    c.rect(x - 32, y, boxSize, boxSize);
                    c.fill();
                    c.stroke();
                    c.closePath();
                }
                if (arr[arrX - 1][arrY]) {
                    var type = arr[arrX - 1][arrY].type;
                    var key = arr[arrX - 1][arrY].key;
                    x = (column - 1) * boxSize;
                    switch (type) {
                        case "piano":
                            c.drawImage(im, x + 1, y + 1, 30, 30);
                            break;
                        case "flat_piano":
                            c.drawImage(im_flat, x + 1, y + 1, 30, 30);
                            break;
                        case "sharp_piano":
                            c.drawImage(im_sharp, x + 1, y + 1, 30, 30);
                            break;
                        case "drum":
                            c.drawImage(im_drum, x + 1, y + 1, 30, 30);
                            break;
                        case "bass":
                            c.drawImage(im_bass, x + 1, y + 1, 30, 30);
                            break;
                        case "flat_bass":
                            c.drawImage(im_flat_bass, x + 1, y + 1, 30, 30);
                            break;
                        case "sharp_bass":
                            c.drawImage(im_sharp_bass, x + 1, y + 1, 30, 30);
                            break;
                        case "spooky":
                            c.drawImage(im_spooky, x + 1, y + 1, 30, 30);
                            break;
                        case "sax":
                            c.drawImage(im_sax, x + 1, y + 1, 30, 30);
                            break;
                        case "flat_sax":
                            c.drawImage(im_flat_sax, x + 1, y + 1, 30, 30);
                            break;
                        case "sharp_sax":
                            c.drawImage(im_sharp_sax, x + 1, y + 1, 30, 30);
                            break;
                        case "repeat_begin":
                            c.drawImage(im_repeat_begin, x + 1, y + 1, 30, 30);
                            break;
                        case "repeat_end":
                            c.drawImage(im_repeat_end, x + 1, y + 1, 30, 30);
                            break;
                        case "blank":
                            c.drawImage(im_blank, x + 1, y + 1, 30, 30);
                            break;
                    }
                }
            }
            if (y === 0 && x > 0) {
                c.drawImage(gear, x + 1, y + 1, 30, 30);
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
                    c.fillStyle = "#499d2f";
                } else {
                    c.fillStyle = "#57ca32";
                }
                c.rect(x, y, boxSize, boxSize);
                c.fill();
                c.stroke();
                if (arr[arrX]) {
                    if (arr[arrX][arrY]) {
                        var type = arr[arrX][arrY].type;
                        var key = arr[arrX][arrY].key;
                        switch (type) {
                            case "piano":
                                c.drawImage(im, x + 1, y + 1, 30, 30);
                                break;
                            case "flat_piano":
                                c.drawImage(im_flat, x + 1, y + 1, 30, 30);
                                break;
                            case "sharp_piano":
                                c.drawImage(im_sharp, x + 1, y + 1, 30, 30);
                                break;
                            case "drum":
                                c.drawImage(im_drum, x + 1, y + 1, 30, 30);
                                break;
                            case "bass":
                                c.drawImage(im_bass, x + 1, y + 1, 30, 30);
                                break;
                            case "flat_bass":
                                c.drawImage(im_flat_bass, x + 1, y + 1, 30, 30);
                                break;
                            case "sharp_bass":
                                c.drawImage(im_sharp_bass, x + 1, y + 1, 30, 30);
                                break;
                            case "spooky":
                                c.drawImage(im_spooky, x + 1, y + 1, 30, 30);
                                break;
                            case "sax":
                                c.drawImage(im_sax, x + 1, y + 1, 30, 30);
                                break;
                            case "flat_sax":
                                c.drawImage(im_flat_sax, x + 1, y + 1, 30, 30);
                                break;
                            case "sharp_sax":
                                c.drawImage(im_sharp_sax, x + 1, y + 1, 30, 30);
                                break;
                            case "repeat_begin":
                                c.drawImage(im_repeat_begin, x + 1, y + 1, 30, 30);
                                break;
                            case "repeat_end":
                                c.drawImage(im_repeat_end, x + 1, y + 1, 30, 30);
                                break;
                            case "blank":
                                c.drawImage(im_blank, x + 1, y + 1, 30, 30);
                                break;
                        }
                    }
                }
                if (x === 0 && y > 0) {
                    c.font = "28px Gothic Century";
                    c.fillStyle = "black";
                    c.textAlign = "center";
                    c.fillText(line(row), x + 16, y + 24, boxSize, boxSize);
                }
                c.closePath();
                if (y === 0 && x > 0) {
                    c.drawImage(gear, x + 1, y + 1, 30, 30);
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
        for (var row = 0; row < 15; row++) {
            for (var column = 0; column < furthest + 2; column++) {
                var x = column * boxSize;
                var y = (row) * boxSize;
                var arrX = x / 32 - 1;
                var arrY = ((15 - row) * boxSize) / 32;
                c.beginPath();
                c.lineWidth = 2;
                c.strokeStyle = 'black';
                if (x === 0 && y >= 32) {
                    c.fillStyle = "#499d2f";
                } else {
                    c.fillStyle = "#57ca32";
                }
                c.rect(x, y, boxSize, boxSize);
                c.fill();
                c.stroke();
                if (arr[arrX]) {
                    if (arr[arrX][arrY]) {
                        var type = arr[arrX][arrY].type;
                        var key = arr[arrX][arrY].key;
                        switch (type) {
                            case "piano":
                                c.drawImage(im, x + 1, y + 1, 30, 30);
                                break;
                            case "flat_piano":
                                c.drawImage(im_flat, x + 1, y + 1, 30, 30);
                                break;
                            case "sharp_piano":
                                c.drawImage(im_sharp, x + 1, y + 1, 30, 30);
                                break;
                            case "drum":
                                c.drawImage(im_drum, x + 1, y + 1, 30, 30);
                                break;
                            case "bass":
                                c.drawImage(im_bass, x + 1, y + 1, 30, 30);
                                break;
                            case "flat_bass":
                                c.drawImage(im_flat_bass, x + 1, y + 1, 30, 30);
                                break;
                            case "sharp_bass":
                                c.drawImage(im_sharp_bass, x + 1, y + 1, 30, 30);
                                break;
                            case "spooky":
                                c.drawImage(im_spooky, x + 1, y + 1, 30, 30);
                                break;
                            case "sax":
                                c.drawImage(im_sax, x + 1, y + 1, 30, 30);
                                break;
                            case "flat_sax":
                                c.drawImage(im_flat_sax, x + 1, y + 1, 30, 30);
                                break;
                            case "sharp_sax":
                                c.drawImage(im_sharp_sax, x + 1, y + 1, 30, 30);
                                break;
                            case "repeat_begin":
                                c.drawImage(im_repeat_begin, x + 1, y + 1, 30, 30);
                                break;
                            case "repeat_end":
                                c.drawImage(im_repeat_end, x + 1, y + 1, 30, 30);
                                break;
                            case "blank":
                                c.drawImage(im_blank, x + 1, y + 1, 30, 30);
                                break;
                        }
                    }
                }
                if (x === 0 && y > 0) {
                    c.font = "28px Gothic Century";
                    c.fillStyle = "black";
                    c.textAlign = "center";
                    c.fillText(line(row), x + 16, y + 24, boxSize, boxSize);
                }
                c.closePath();
                if (y === 0 && x > 0) {
                    c.drawImage(gear, x + 1, y + 1, 30, 30);
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
});
