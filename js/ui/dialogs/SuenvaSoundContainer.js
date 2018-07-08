(function() {
	window.ui = window.ui || {};
	var SuenvaSoundContainer = function(view_, subjectData_, partId_, sujectId_) {
		var view = view_;
		var btnSounds = [];
		var txts = [];
		this.resetBtnSoundTextStatus = resetBtnSoundTextStatus;
//		titleSoundId:"01101.mp3",
//		sentences:{
//				soundId: "01102z.mp3",
//				scripts: {
//					"soundSentence_0": [0.19, 0.63],
//					"soundSentence_1": [0.67, 12],
//			}
//		}
//	subjectSound_3_2
		initTitle(subjectData_.titleSoundId, partId_, sujectId_);
		loadWordSound(subjectData_.sentences, partId_, sujectId_);
		this.initOnePageManySound = function(onePageManySoundSubjectData_, partId_, sujectId_){
			loadWordSound(onePageManySoundSubjectData_.sentences, partId_, sujectId_);
		}
		function loadWordSound(wordsData_,partId_, sujectId_) {
			var soundsObj = wordsData_.scripts;
			var soundsArr = [];
			var obj;
			var i = 0;
			var btnSound;
			var txt;
			var soundId = wordsData_.soundId;
			var fonts
			var sentanceTxt;
			for(var i=0;i<1000;i++){
				sentanceTxt=view["sentanceTxt_" + partId_ + "_" + sujectId_ +"_"+ i];
				if(sentanceTxt){
					fonts = sentanceTxt.font.split("px ");
					break;
				}
			}
			i= 0;
			for(var key in soundsObj) {
				btnSound = view["subjectSound_" + partId_ + "_" + sujectId_ + "_" + i];
				if(!btnSound){
					i++;
					continue;
				}
				btnSound.cursor = "pointer";
				btnSound.mouseChildren = false;
				txt = view["sentanceTxt_" + partId_ + "_" + sujectId_ + "_" + i];
				btnSound.txt = txt;
				btnSounds.push(btnSound);
				txts.push(txt);
				if(!btnSound) {
					continue;
				}
				if(window.isAndroid) {
					txt.font = fonts[0] - window.androidOffsetFontSize + "px " + fonts[1];
				}
				btnSound.soundIndex = key;
				btnSound.addEventListener("click", function(e) {
					e.stopPropagation();
					var btn = e.currentTarget;
					resetBtnSoundTextStatus(btn);
					btn.isClick = !btn.isClick;
					createjs.Sound.stop();
					var txt = btn.txt;
					txt.color = "#333333";
					if(btn.isClick) {
						txt.color = "#ff0000";
						btn.gotoAndStop(1);
						if(window.isSoundLoadObj[soundId]) {
							createjs.Sound.play(btn.soundIndex);
						}
					} else {
						btn.gotoAndStop(0);
					}
				}, false);
				obj = {};
				obj.id = key;
				obj.startTime = soundsObj[key][0] * 1000;
				obj.duration = (soundsObj[key][1] - soundsObj[key][0]) * 1000;
				soundsArr.push(obj);
				i++;
			}
			wordsLength = i;
			var sounds = [{
				src: soundId,
				data: {
					audioSprite: soundsArr
				}
			}];
			createjs.Sound.addEventListener("fileload", loadSound, false);
			createjs.Sound.registerSounds(sounds, assetsPath);
			// 加载完成后

			function loadSound(e) {
				e.stopPropagation();
				window.isSoundLoadObj[soundId] = true;
			}
		}
		function playNameSound(e) {
			e.stopPropagation();
			var btn = e.target;
			resetBtnSoundTextStatus(btn);
			btn.isClick = !btn.isClick;
			createjs.Sound.stop();
			var txt = btn.txt;
			txt.color = "#6B4A15";
			var soundId = btn.soundId;
			if(btn.isClick) {
				txt.color = "#ff0000";
				if(window.isSoundLoadObj.hasOwnProperty(soundId) && window.isSoundLoadObj[soundId]) {
					createjs.Sound.play(soundId);
				} else {
					createjs.Sound.addEventListener("fileload", soundLoaded); // add an event listener for when load is completed
					createjs.Sound.registerSound(window.assetsPath + soundId, soundId);
				}
				btn.gotoAndStop(1);
			} else {
				btn.gotoAndStop(0);
			}

			function soundLoaded(e) {
				e.stopPropagation();
				window.isSoundLoadObj[soundId] = true;
				if(btn.isClick) {
					createjs.Sound.stop();
					createjs.Sound.play(soundId);
				}
			}
		}
		function resetBtnSoundTextStatus(btn_) {
			for(var i = 0; i < txts.length; i++) {
				txt = txts[i];
				txt.color = "#333333";
				btnSound = btnSounds[i];
				if(btn_) {
					if(btn_ != btnSound) {
						btnSound.gotoAndStop(0);
						btnSound.isClick = false;
					}
				} else {
					btnSound.isClick = false;
				}
			}
		}
		function initTitle(soundId_, partId_, sujectId_){
			if(soundId_.toString().length <= 0){
				return;
			}
			var txt = view["subjectTxt_" + partId_ + "_" + sujectId_];
			if(!txt){
				return;
			}
			var fonts = txt.font.split("px ");
			if(window.isAndroid) {
				txt.font = fonts[0] - window.androidOffsetFontSize + "px " + fonts[1];
			}
			txts.push(txt);
			var btnSound = view["subjectSound_" + partId_ + "_" + sujectId_];
			btnSound.mouseChildren = false;
			btnSound.curosr = "pointer";
			btnSound.addEventListener("click", playNameSound, false);
			btnSounds.push(btnSound);
			btnSound.txt = txt;
			btnSound.soundId = soundId_;
		}
	}
	window.ui.SuenvaSoundContainer = SuenvaSoundContainer;
})();