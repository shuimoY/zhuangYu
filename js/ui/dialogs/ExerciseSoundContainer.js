(function() {
	window.ui = window.ui || {};
	var ExerciseSoundContainer = function(view_, exerciseData_) {
		var view = view_;
		var btnSounds = [];
		var txts = [];

		loadWordSound(exerciseData_);

		function loadWordSound(wordsData_) {
			var soundsObj = wordsData_.scripts;
			var soundsArr = [];
			var obj;
			var i = 0;
			var btnSound;
			var txt;
			var soundId = wordsData_.soundId;
			var isExerciseTxt = false;
			var fonts;
			for(var i = 0; i < 100; i++) {
				if(view["exerciseTxt_" + i]) {
					fonts = view["exerciseTxt_" + i].font.split("px ");
					break;
				}
			}
			i = 0;
			for(var key in soundsObj) {
				btnSound = view["exerciseSound_" + i];
				if(!btnSound){
					i++;
					continue;
				}
				btnSound.cursor = "pointer";
				btnSound.mouseChildren = false;
				txt = view["exerciseTxt_" + i];
				btnSound.txt = txt;
				btnSounds.push(btnSound);
				txts.push(txt);
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
					txt.color = "#000000";
					if(btn.isClick) {
						txt.color = "#ff0000";
						btn.gotoAndStop(1);
						if(window.isSoundLoadObj[soundId]) {
							createjs.Sound.play(btn.soundIndex);
						} else {
							createjs.Sound.addEventListener("fileload", soundLoaded); // add an event listener for when load is completed
							createjs.Sound.registerSound(window.assetsPath + soundId, soundId);
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

		function resetBtnSoundTextStatus(btn_) {
			for(var i = 0; i < txts.length; i++) {
				txt = txts[i];
				txt.color = "#000";
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
	}

	window.ui.ExerciseSoundContainer = ExerciseSoundContainer;
})();