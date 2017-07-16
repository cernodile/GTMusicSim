class Note {
    constructor(args) {
        this.file = args.path;
        this.type = args.type || "Unidentified";
        if (!this.type.includes("repeat") && !this.type.includes("blank")) {
            this.Audio = new Audio("./notes/" + this.file);
            this.Audio.autoplay = true;
            this.Audio.volume = 0.00000001;
            this.Audio.load();
        }
        this.key = args.key || "?";
    }
    load() {
        if (!this.type.includes("repeat") && !this.type.includes("blank")) {
            this.Audio = new Audio("./notes/" + this.file);
            this.Audio.autoplay = true;
            this.Audio.volume = 0.00000001;
            this.Audio.load();
        }
    }
    play() {
        if (!this.type.includes("repeat") && !this.type.includes("blank")) {
            this.Audio = new Audio("./notes/" + this.file);
            this.Audio.autoplay = true;
            this.Audio.volume = 0.5;
            this.Audio.load();
            this.Audio.play();
        }
    }
    toString() {
        let t = "P";
        let k = this.key;
        let n = "-";
        switch (this.type) {
            case "piano":
                t = "P";
                n = "-";
                break;
            case "flat_piano":
                t = "P";
                n = "b";
                break;
            case "sharp_piano":
                t = "P";
                n = "#";
                break;
            case "spooky":
                t = "H";
                n = "-";
                break;
            case "drum":
                t = "D";
                n = "-";
                break;
            case "bass":
                t = "B";
                n = "-";
                break;
            case "flat_bass":
                t = "B";
                n = "b";
                break;
            case "sharp_bass":
                t = "B";
                n = "#";
                break;
            case "sax":
                t = "S";
                n = "-";
                break;
            case "flat_sax":
                t = "S";
                n = "b";
                break;
            case "sharp_sax":
                t = "S";
                n = "#";
                break;
            case "repeat_begin":
                t = "r";
                n = "-";
                break;
            case "repeat_end":
                t = "R";
                n = "-";
                break;
            case "blank":
                t = "L";
                n = "-";
                break;
            default:
                break;
        }
        return t + k + n;
    }
    copy(type) {
        let n = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        if (type === "sharp") {
            n.type = n.type.replace("flat", "sharp");
            n.key = line(lineReverse(n.key) + 1);
            switch (n.key) {
                case "e":
                    n.file = n.file.replace("5", "6");
                    break;
                case "b":
                    n.file = n.file.replace("12", "13");
                    break;
                case "E":
                    n.file = n.file.replace("17", "18");
                    break;
            }
        }
        return n;
    }
}
