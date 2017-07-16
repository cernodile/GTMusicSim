// Images
function Asset (src) {
	var im = new Image();
	im.src = "./assets/" + src;
	im.addEventListener("load", sAsset)
	return im;
}
window.addEventListener("loadImg", () => {
	gear = Asset("gear.png");
	im = Asset("piano.png");
	img = im;
	im_flat = Asset("flat_piano.png");
	im_sharp = Asset("sharp_piano.png");
	im_drum = Asset("drum.png");
	im_bass = Asset("bass.png");
	im_flat_bass = Asset("flat_bass.png");
	im_sharp_bass = Asset("sharp_bass.png");
	im_spooky = Asset("spooky.png");
	im_sax = Asset("sax.png");
	im_flat_sax = Asset("flat_sax.png");
	im_sharp_sax = Asset("sharp_sax.png");
	im_repeat_begin = Asset("repeat_begin.png");
	im_repeat_end = Asset("repeat_end.png");
	im_blank = Asset("blank.png");
	// ON STATES
	im_on = Asset("piano_on.png");
	im_flat_on = Asset("flat_piano_on.png");
	im_sharp_on = Asset("sharp_piano_on.png");
	im_drum_on = Asset("drum_on.png");
	im_bass_on = Asset("bass_on.png");
	im_flat_bass_on = Asset("flat_bass_on.png");
	im_sharp_bass_on = Asset("sharp_bass_on.png");
	im_spooky_on = Asset("spooky_on.png");
	im_sax_on = Asset("sax_on.png");
	im_flat_sax_on = Asset("flat_sax_on.png");
	im_sharp_sax_on = Asset("sharp_sax_on.png");
	im_repeat_begin_on = Asset("repeat_begin_on.png");
	im_repeat_end_on = Asset("repeat_end_on.png");
	im_blank_on = Asset("blank_on.png");
});
function sAsset (f) {
	return window.dispatchEvent(new CustomEvent("loadedAsset", {detail: {file: f.path[0].src}}));
}
//Spooky
var s="spooky";
var spooky_c1=new Note({key:"C", path:s+"_1.wav",type:s});
var spooky_d1=new Note({key:"D", path:s+"_3.wav",type:s});
var spooky_e1=new Note({key:"E", path:s+"_5.wav",type:s});
var spooky_f1=new Note({key:"F", path:s+"_6.wav",type:s});
var spooky_g1=new Note({key:"G", path:s+"_8.wav",type:s});
var spooky_a1=new Note({key:"A", path:s+"_10.wav",type:s});
var spooky_b1=new Note({key:"B", path:s+"_12.wav",type:s});
var spooky_c2=new Note({key:"c", path:s+"_13.wav",type:s});
var spooky_d2=new Note({key:"d", path:s+"_15.wav",type:s});
var spooky_e2=new Note({key:"e", path:s+"_17.wav",type:s});
var spooky_f2=new Note({key:"f", path:s+"_18.wav",type:s});
var spooky_g2=new Note({key:"g", path:s+"_20.wav",type:s});
var spooky_a2=new Note({key:"a", path:s+"_22.wav",type:s});
var spooky_b2=new Note({key:"b", path:s+"_24.wav",type:s});
// Pianos
var p="piano";
var c1=new Note({key:"c", path:p+"_1.wav",type:p});
var d1=new Note({key:"d", path:p+"_3.wav",type:p});
var e1=new Note({key:"e", path:p+"_5.wav",type:p});
var f1=new Note({key:"f", path:p+"_6.wav",type:p});
var g1=new Note({key:"g", path:p+"_8.wav",type:p});
var a1=new Note({key:"a", path:p+"_10.wav",type:p});
var b1=new Note({key:"b", path:p+"_12.wav",type:p});
var c1_flat=new Note({key:"c", path:p+"_0.wav",type:"flat_"+p});
var d1_flat=new Note({key:"d", path:p+"_2.wav",type:"flat_"+p});
var e1_flat=new Note({key:"e", path:p+"_4.wav",type:"flat_"+p});
var f1_flat=new Note({key:"f", path:p+"_5.wav",type:"flat_"+p});
var g1_flat=new Note({key:"g", path:p+"_7.wav",type:"flat_"+p});
var a1_flat=new Note({key:"a", path:p+"_9.wav",type:"flat_"+p});
var b1_flat=new Note({key:"b", path:p+"_11.wav",type:"flat_"+p});
var c2=new Note({key:"C", path:p+"_13.wav",type:p});
var d2=new Note({key:"D", path:p+"_15.wav",type:p});
var e2=new Note({key:"E", path:p+"_17.wav",type:p});
var f2=new Note({key:"F", path:p+"_18.wav",type:p});
var g2=new Note({key:"G", path:p+"_20.wav",type:p});
var a2=new Note({key:"A", path:p+"_22.wav",type:p});
var b2=new Note({key:"B", path:p+"_24.wav",type:p});
var c2_flat=new Note({key:"C", path:p+"_12.wav",type:"flat_"+p});
var d2_flat=new Note({key:"D", path:p+"_14.wav",type:"flat_"+p});
var e2_flat=new Note({key:"E", path:p+"_16.wav",type:"flat_"+p});
var f2_flat=new Note({key:"F", path:p+"_17.wav",type:"flat_"+p});
var g2_flat=new Note({key:"G", path:p+"_19.wav",type:"flat_"+p});
var a2_flat=new Note({key:"A", path:p+"_21.wav",type:"flat_"+p});
var b2_flat=new Note({key:"B", path:p+"_23.wav",type:"flat_"+p});
var final_flat=new Note({key:"B", path:p+"_25.wav",type:"sharp_"+p});
// Drums
var drum_c=new Note({key:"C", path:"drum_6.wav",type:"drum"});
var drum_d=new Note({key:"D", path:"drum_5.wav",type:"drum"});
var drum_e=new Note({key:"E", path:"drum_4.wav",type:"drum"});
var drum_f=new Note({key:"F", path:"drum_3.wav",type:"drum"});
var drum_g=new Note({key:"G", path:"drum_2.wav",type:"drum"});
var drum_a=new Note({key:"A", path:"drum_1.wav",type:"drum"});
var drum_b=new Note({key:"B", path:"drum_0.wav",type:"drum"});
// Bass
var bass_c1=new Note({key:"c", path:"bass_1.wav",type:"bass"});
var bass_d1=new Note({key:"d", path:"bass_3.wav",type:"bass"});
var bass_e1=new Note({key:"e", path:"bass_5.wav",type:"bass"});
var bass_f1=new Note({key:"f", path:"bass_6.wav",type:"bass"});
var bass_g1=new Note({key:"g", path:"bass_8.wav",type:"bass"});
var bass_a1=new Note({key:"a", path:"bass_10.wav",type:"bass"});
var bass_b1=new Note({key:"b", path:"bass_12.wav",type:"bass"});
var bass_c1_flat=new Note({key:"c", path:"bass_0.wav",type:"flat_bass"});
var bass_d1_flat=new Note({key:"d", path:"bass_2.wav",type:"flat_bass"});
var bass_e1_flat=new Note({key:"e", path:"bass_4.wav",type:"flat_bass"});
var bass_f1_flat=new Note({key:"f", path:"bass_5.wav",type:"flat_bass"});
var bass_g1_flat=new Note({key:"g", path:"bass_7.wav",type:"flat_bass"});
var bass_a1_flat=new Note({key:"a", path:"bass_9.wav",type:"flat_bass"});
var bass_b1_flat=new Note({key:"b", path:"bass_11.wav",type:"flat_bass"});
var bass_c2=new Note({key:"C", path:"bass_13.wav",type:"bass"});
var bass_d2=new Note({key:"D", path:"bass_15.wav",type:"bass"});
var bass_e2=new Note({key:"E", path:"bass_17.wav",type:"bass"});
var bass_f2=new Note({key:"F", path:"bass_18.wav",type:"bass"});
var bass_g2=new Note({key:"G", path:"bass_20.wav",type:"bass"});
var bass_a2=new Note({key:"A", path:"bass_22.wav",type:"bass"});
var bass_b2=new Note({key:"B", path:"bass_24.wav",type:"bass"});
var bass_c2_flat=new Note({key:"C", path:"bass_12.wav",type:"flat_bass"});
var bass_d2_flat=new Note({key:"D", path:"bass_14.wav",type:"flat_bass"});
var bass_e2_flat=new Note({key:"E", path:"bass_16.wav",type:"flat_bass"});
var bass_f2_flat=new Note({key:"F", path:"bass_17.wav",type:"flat_bass"});
var bass_g2_flat=new Note({key:"G", path:"bass_19.wav",type:"flat_bass"});
var bass_a2_flat=new Note({key:"A", path:"bass_21.wav",type:"flat_bass"});
var bass_b2_flat=new Note({key:"B", path:"bass_23.wav",type:"flat_bass"});
var bass_final_flat=new Note({key:"B", path:"bass_25.wav",type:"sharp_bass"});
// Sax
var sax_c1=new Note({key:"c", path:"sax_1.wav",type:"sax"});
var sax_d1=new Note({key:"d", path:"sax_3.wav",type:"sax"});
var sax_e1=new Note({key:"e", path:"sax_5.wav",type:"sax"});
var sax_f1=new Note({key:"f", path:"sax_6.wav",type:"sax"});
var sax_g1=new Note({key:"g", path:"sax_8.wav",type:"sax"});
var sax_a1=new Note({key:"a", path:"sax_10.wav",type:"sax"});
var sax_b1=new Note({key:"b", path:"sax_12.wav",type:"sax"});
var sax_c1_flat=new Note({key:"c", path:"sax_0.wav",type:"flat_sax"});
var sax_d1_flat=new Note({key:"d", path:"sax_2.wav",type:"flat_sax"});
var sax_e1_flat=new Note({key:"e", path:"sax_4.wav",type:"flat_sax"});
var sax_f1_flat=new Note({key:"f", path:"sax_5.wav",type:"flat_sax"});
var sax_g1_flat=new Note({key:"g", path:"sax_7.wav",type:"flat_sax"});
var sax_a1_flat=new Note({key:"a", path:"sax_9.wav",type:"flat_sax"});
var sax_b1_flat=new Note({key:"b", path:"sax_11.wav",type:"flat_sax"});
var sax_c2=new Note({key:"C", path:"sax_13.wav",type:"sax"});
var sax_d2=new Note({key:"D", path:"sax_15.wav",type:"sax"});
var sax_e2=new Note({key:"E", path:"sax_17.wav",type:"sax"});
var sax_f2=new Note({key:"F", path:"sax_18.wav",type:"sax"});
var sax_g2=new Note({key:"G", path:"sax_20.wav",type:"sax"});
var sax_a2=new Note({key:"A", path:"sax_22.wav",type:"sax"});
var sax_b2=new Note({key:"B", path:"sax_24.wav",type:"sax"});
var sax_c2_flat=new Note({key:"C", path:"sax_12.wav",type:"flat_sax"});
var sax_d2_flat=new Note({key:"D", path:"sax_14.wav",type:"flat_sax"});
var sax_e2_flat=new Note({key:"E", path:"sax_16.wav",type:"flat_sax"});
var sax_f2_flat=new Note({key:"F", path:"sax_17.wav",type:"flat_sax"});
var sax_g2_flat=new Note({key:"G", path:"sax_19.wav",type:"flat_sax"});
var sax_a2_flat=new Note({key:"A", path:"sax_21.wav",type:"flat_sax"});
var sax_b2_flat=new Note({key:"B", path:"sax_23.wav",type:"flat_sax"});
var sax_final_flat=new Note({key:"B", path:"sax_25.wav",type:"sharp_sax"});
function preloadMobileAudio () {
	var base = "xx";
	var k;
	for (k = 0; k < 14; k += 1) {
		try {
		var base = line(k).toLowerCase();
		if (k > 7) base += "2";
		else base += "1";
	  eval(base + ".load()");
	} catch (e) {
		console.log(e)
	}
	}
}
function toNote (convert, state) {
	if (state === 13) return new Note({key: line(convert), type: "blank"});
	if (state > 10) {
		switch (state) {
			case 11:return new Note({key: line(convert), type: "repeat_begin"});
			case 12:return new Note({key: line(convert), type: "repeat_end"});
		}
	}
	if (state === 8) {
		switch (convert) {
case 1:return sax_c1;
case 2:return sax_d1;
case 3:return sax_e1;
case 4:return sax_f1;
case 5:return sax_g1;
case 6:return sax_a1;
case 7:return sax_b1;
case 8:return sax_c2;
case 9:return sax_d2;
case 10:return sax_e2;
case 11:return sax_f2;
case 12:return sax_g2;
case 13:return sax_a2;
	        case 14:return sax_b2;
	    }
	}
	if (state === 9 || state === 10) {
		if (state === 10) {
			convert += 1;
		}
		let s = (state===10?"sharp":"flat");
		switch (convert) {
case 1:return sax_c1_flat.copy(s);
case 2:return sax_d1_flat.copy(s);
case 3:return sax_e1_flat.copy(s);
case 4:return sax_f1_flat.copy(s);
case 5:return sax_g1_flat.copy(s);
case 6:return sax_a1_flat.copy(s);
case 7:return sax_b1_flat.copy(s);
case 8:return sax_c2_flat.copy(s);
case 9:return sax_d2_flat.copy(s);
case 10:return sax_e2_flat.copy(s);
case 11:return sax_f2_flat.copy(s);
case 12:return sax_g2_flat.copy(s);
case 13:return sax_a2_flat.copy(s);
case 14:return sax_b2_flat.copy(s);
case 15:return sax_final_flat;
		}
	}
	if (state === 7) {
		switch (convert) {
			case 1:return spooky_c1;
case 2:return spooky_d1;
case 3:return spooky_e1;
case 4:return spooky_f1;
case 5:return spooky_g1;
case 6:return spooky_a1;
case 7:return spooky_b1;
case 8:return spooky_c2;
case 9:return spooky_d2;
case 10:return spooky_e2;
case 11:return spooky_f2;
case 12:return spooky_g2;
case 13:return spooky_a2;
case 14:return spooky_b2;
		}
	}
	if (state === 5 || state === 6) {
		if (state === 6) {
			convert += 1;
		}
		let s = (state===6?"sharp":"flat");
		switch (convert) {
case 1:return bass_c1_flat.copy(s);
case 2:return bass_d1_flat.copy(s);
case 3:return bass_e1_flat.copy(s);
case 4:return bass_f1_flat.copy(s);
case 5:return bass_g1_flat.copy(s);
case 6:return bass_a1_flat.copy(s);
case 7:return bass_b1_flat.copy(s);
case 8:return bass_c2_flat.copy(s);
case 9:return bass_d2_flat.copy(s);
case 10:return bass_e2_flat.copy(s);
case 11:return bass_f2_flat.copy(s);
case 12:return bass_g2_flat.copy(s);
case 13:return bass_a2_flat.copy(s);
case 14:return bass_b2_flat.copy(s);
case 15:return bass_final_flat;
		}
	}
	if (state === 4) {
		switch (convert) {
case 1:return bass_c1;
case 2:return bass_d1;
case 3:return bass_e1;
case 4:return bass_f1;
case 5:return bass_g1;
case 6:return bass_a1;
case 7:return bass_b1;
case 8:return bass_c2;
case 9:return bass_d2;
case 10:return bass_e2;
case 11:return bass_f2;
case 12:return bass_g2;
case 13:return bass_a2;
	        case 14:return bass_b2;
	    }
	}
	if (state === 3) {
		if (convert > 7) {
			convert -= 7;
		}
		switch (convert) {
			case 1:return drum_c;
			case 2:return drum_d;
			case 3:return drum_e;
			case 4:return drum_f;
			case 5:return drum_g;
			case 6:return drum_a;
			case 7:return drum_b;
		}
	}
	if (state===1||state===2) {
		if (state===2) convert+=1;
		let s = (state===2?"sharp":"flat");
		switch (convert) {
case 1:return c1_flat.copy(s);
case 2:return d1_flat.copy(s);
case 3:return e1_flat.copy(s);
case 4:return f1_flat.copy(s);
case 5:return g1_flat.copy(s);
case 6:return a1_flat.copy(s);
case 7:return b1_flat.copy(s);
case 8:return c2_flat.copy(s);
case 9:return d2_flat.copy(s);
case 10:return e2_flat.copy(s);
case 11:return f2_flat.copy(s);
case 12:return g2_flat.copy(s);
case 13:return a2_flat.copy(s);
case 14:return b2_flat.copy(s);
case 15:return final_flat;}
	}
	if (state===0) {
    	switch (convert) {
    		case 1:return c1;
case 2:return d1;
case 3:return e1;
case 4:return f1;
case 5:return g1;
case 6:return a1;
case 7:return b1;
case 8:return c2;
case 9:return d2;
case 10:return e2;
case 11:return f2;
case 12:return g2;
case 13:return a2;
case 14:return b2;
	    }
	}
}
