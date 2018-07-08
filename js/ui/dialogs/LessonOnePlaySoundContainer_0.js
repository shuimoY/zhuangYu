(function() {
	window.ui = window.ui || {};

	var LessonOnePlaySoundContainer_0 = function(name_) {
		ui.BaseDialog.call(this);
		this.name = name_;
		var this_ = this;
		var xx = 82;
		var yy = 204;
		var paragraphsLength = 0;
		var wordsLength = 0;
		var imgWords;
		var mcPlay;
		var num = 0;
		var hideTxts;
		var txts = [];
		var btnSounds = [];
		var recordPlayManager;
		var suenvaSoundManager;
		var viewClickWordNames = {};
		var suenvaSoundNames = {
			"uiSuenvaOne_7": [3, 2],
			"uiSuenvaTwo_1": [1, 2],
			"uiSuenvaTwo_7": [3, 2],
			"uiSuenvaTwo_8": [3, 3],
			"uiSuenvaThree_1": [1, 2],
			"uiSuenvaThree_7": [3, 2],
			"uiSuenvaFour_1": [1, 2],
			"uiSuenvaFour_11": [3, 3],
			"uiSuenvaFive_0": [1, 1],
			"uiSuenvaFive_3": [1, 4],
			"uiSuenvaFive_10": [3, 1],
			"uiSuenvaFive_12": [3, 3],
			"uiSuenvaSix_0": [1, 1],
			"uiSuenvaSix_1": [1, 1],
			"uiSuenvaSix_3": [1, 3],
			"uiSuenvaSix_13": [3, 4],
			"uiSwz_0": [1, 1],
			"uiSwz_1": [1, 1],
			"uiSwz_2": [1, 1], //2
			"uiSwz_3": [1, 2],
			"uiSwz_4": [1, 2],
			"uiSwz_5": [1, 2], //3
			"uiSwz_6": [1, 3],
			"uiSwz_7": [1, 3], //4
			"uiSwz_8": [1, 4],
			"uiSwz_9": [1, 4],
		};
		var poetryObj = {
			"uiLessonNine_0": 0,
			"uiLessonNine_1": 0,
			"uiLessonNine_3": 0,
			"uiLessonNine_4": 0,
			"uiLessonTwelve_0": 0,
			"uiLessonTwelve_2": 0,
			"uiLessonFifteen_0": 0,
			"uiLessonFifteen_1": 0,
			"uiLessonFifteen_3": 0,
			"uiLessonFifteen_4": 0,
			"uiLessonFifteen_5": 0,
			"uiLessonEighteen_0": 0,
			"uiLessonEighteen_2": 0,
			"uiLessonSix_0": 0,
			"uiLessonSix_1": 0,
			"uiLessonSix_3": 0,
			"uiLessonSix_4": 0,

		};

		var onePageManySoundObj = {
			"uiSwz_2": [1, 2],
			"uiSwz_5": [1, 3],
			"uiSwz_7": [1, 4],
		}
		var viewXY = {
			"uiLessonSixteen_4": [82, 159],
			"uiLessonTwo_2": [320, 280],
			"uiLessonThree_1": [310, 220],
			"uiLessonFour_2": [320, 240],
			"uiLessonFive_3": [345, 220],
			"uiLessonSeven_3": [345, 210],
			"uiLessonEight_2": [320, 210],
			"uiLessonNine_2": [330, 210],
			"uiLessonTen_2": [330, 210],
			"uiLessonEleven_2": [330, 210],
			"uiLessonTwelve_1": [350, 300],
			"uiLessonFifteen_2": [360, 200],
			"uiLessonEighteen_1": [370, 250],
			"uiLessonFourteen_1": [82, 180],
		};
		var hideObject = {
			"uiLessonNine_3": ["txt_0", "txt_1", "txt_2"],
			"uiLessonNine_4": ["txt_0"],
			"uiLessonTwelve_2": ["txt_0", "txt_1", "txt_2", "txt_3"],
			"uiLessonEighteen_2": ["txt_0", "txt_1", "txt_2", "txt_3"],
			"uiLessonTwo_3": ["txt_0", "txt_1", "txt_2"],
			"uiLessonTwo_4": ["txt_0", "txt_1", "txt_2"],
			"uiLessonFifteen_3": ["txt_0", "txt_1"],
			"uiLessonFifteen_4": ["txt_0", "txt_1"],
			"uiLessonFifteen_5": ["txt_0", "txt_1"],
		}
		var isTitleSounding = false;
		this.initView = function() {
			if(this_.lessonData) {
				this_.commonBarCallback("", this_.lessonData);
			}
			if(this_.view.audioplayback) {
				mcPlay = setInterval(function() {
					this_.view.audioplayback.mc.gotoAndPlay(0);
				}, 700)
			}
		}
		this.resetView = function() {
			if(!isTitleSounding){
				createjs.Sound.stop();
			}
			resetBtnSoundTextStatus();
			clearInterval(mcPlay);
			if(recordPlayManager) {
				recordPlayManager.releaseSound();
			}
			if(suenvaSoundManager){
				suenvaSoundManager.resetBtnSoundTextStatus();
			}
		}
		this.init = function(view_, itemIndex_, chapterLessonIds_, lib_, mainScene_, commonBarCallback_) {
			var view = this.view = view_;
			this.temIndex = itemIndex_;
			this.chapterLessonIds = chapterLessonIds_;
			this.lib = lib_;
			this.mainScene = mainScene_;
			this.commonBarCallback = commonBarCallback_;
			var lessonData;
			var itemIndexArr = itemIndex_ ? itemIndex_.split("-") : null;
			if(chapterLessonIds_[0] > 0) {
				lessonData = this.getDataById(chapterLessonIds_[0], chapterLessonIds_[1]);
			} else {
				lessonData = this.getDataById(chapterLessonIds_[0]);
			}
			this_.lessonData = lessonData;
			this_.commonBarCallback("", lessonData);

			initSuenvaSound();
			initRecordPlay();
			initClickWord();
			initWordImg();
			initWord();
			initLessonNameAndParagraphSounds(itemIndexArr);
			if(view.lessonName) {
				if(this_.name.indexOf("iSwz") > 0) {
					view.x = 194;
				} else {
					view.x = 82;
				}
				view.y = 140;
			} else if(viewXY.hasOwnProperty(this.name)) {
				view.x = viewXY[this.name][0];
				view.y = viewXY[this.name][1];
			} else if(this_.name.indexOf("iSwz") > 0) {
				view.x = 194;
				view.y = 204;
			} else {
				view.x = xx;
				view.y = yy;
			}

			initBtnBack();
		}

		function initSuenvaSound() {
			if(suenvaSoundNames.hasOwnProperty(this_.name)) {
				var lessonData = this_.lessonData;
				var subjectData = window.data.getSubjectDataByI(this_.lessonData.subjects, suenvaSoundNames[this_.name][0], suenvaSoundNames[this_.name][1]);
				if(!suenvaSoundManager) {
					suenvaSoundManager = new ui.SuenvaSoundContainer(this_.view, subjectData, suenvaSoundNames[this_.name][0], suenvaSoundNames[this_.name][1]);
				}
				if(onePageManySoundObj.hasOwnProperty(this_.name)) {
					var arr = onePageManySoundObj[this_.name];
					subjectData = window.data.getSubjectDataByI(this_.lessonData.subjects, arr[0], arr[1]);
					suenvaSoundManager.initOnePageManySound(subjectData, arr[0], arr[1]);
				}
			}
		}

		function initClickWord() {
			if(viewClickWordNames.hasOwnProperty(this_.name)) {
				imgWords = viewClickWordNames[this_.name];
			}
			initWordOrExerciseSoundAndFont(this_.lessonData);
		}

		function initBtnBack() {
			var btnBack = this_.view.btnBack;
			if(btnBack) {
				btnBack.mouseChildren = false;
				btnBack.isClick = false;
				btnBack.addEventListener("click", hideTxt, false);
				btnBack.addEventListener("pressup", function(e) {
					btnBack.scaleX = btnBack.scaleY = 1;
				}, false);
				btnBack.addEventListener("mousedown", function(e) {
					btnBack.scaleX = btnBack.scaleY = 1.5;
				}, false);
			}
		}

		function hideTxt() {
			hideTxts = hideObject[this_.name];
			if(num == 0) {
				for(var i = 0; i < hideTxts.length; i++) {
					this_.view[hideTxts[i]].visible = false;
				}
				num = 1;
			} else {
				for(var i = 0; i < hideTxts.length; i++) {
					this_.view[hideTxts[i]].visible = true;
				}
				num = 0;
			}
		}

		function initRecordPlay() {
			var audioPlayBack = this_.view.audioPlayBack || this_.view.audioplayback;
			var btnRecord = null;
			var btnPlay = null;
			if(audioPlayBack) {
				btnRecord = audioPlayBack.btnRecord;
				btnPlay = audioPlayBack.btnPlay;
			} else {
				btnRecord = this_.view.btnRecord;
				btnPlay = this_.view.btnPlay;
			}
			if(btnPlay && !recordPlayManager) {
				recordPlayManager = new ui.RecordPlayContainer(btnRecord, btnPlay, this_.name);
			}
		}

		function initWord() {
			if(this_.view.word_0) {
				xx = 301;
				yy = 194;
			}
		}

		function initWordImg() {
			var wordImg = this_.view.wordImg || this_.view.fillImg;
			if(wordImg) {
				if(wordImg.instance) {
					wordImg.instance.spriteSheet = "";
					wordImg.instance = null;
				}
				if(wordImg.shape) {
					wordImg.shape.graphics.clear();
					wordImg.shape = null;
				}
				if(this_.name == "uiLessonOne_10") {
					wordImg.scaleX = wordImg.scaleY = 0.6;
				} else if(this_.name == "uiLessonEleven_0") {
					wordImg.scaleX = wordImg.scaleY = 0.9;
				}
				var changeImg;
				var bit = new createjs.Bitmap(window.PIC_PATH + "lesson_" + this_.lessonData.lessonId + "/lesson_" + this_.lessonData.lessonId + ".jpg");
				wordImg.img = bit;
				bit.alpha = 1;
				//				if(this_.view.word_0){
				//					wordImg.txt.text = this_.view.word_0.text;
				//				}
				wordImg.addChild(bit);
			}
			//			if(imgWords){
			//				for(var i = 0, len = imgWords.length; i < len; i++) {
			//					changeImg = this_.view["changeImg_" + i];
			//					changeImg.cursor = "pointer";
			//					changeImg.key = i;
			//					changeImg.word = imgWords[i];
			//					changeImg.on("click", changeImgAndWord, null, false, null, false);
			//				}
			//			}
		}

		function initWordOrExerciseSoundAndFont(lessonData) {
			var isExerciseTxt = false;
			var startIndex = 0;
			for(var i = 0; i < 10; i++) {
				if(this_.view["exerciseTxt_" + i]) {
					isExerciseTxt = true;
					startIndex = i;
					break;
				}
			}
			var fonts;
			var namePrefix = "";
			var btnPrefix = "";
			if(this_.view["word_0"]) {
				namePrefix = "word_";
				btnPrefix = "btnWordSound_";
				loadWordOrExerciseSound(lessonData.words, namePrefix, btnPrefix);
			} else if(isExerciseTxt) {
				namePrefix = "exerciseTxt_";
				btnPrefix = "btnExerciseSound_";
				loadWordOrExerciseSound(lessonData.exercises, namePrefix, btnPrefix);
			}
			if(namePrefix.length > 0) {
				fonts = this_.view[namePrefix + startIndex].font.split("px ");
				for(var i = 0; i < wordsLength; i++) {
					txt = this_.view[namePrefix + i];
					if(window.isAndroid) {
						txt.font = fonts[0] - window.androidOffsetFontSize + "px " + fonts[1];
					}
				}
			}
		}

		function initLessonNameAndParagraphSounds(itemIndexArr_) {
			var fonts;
			var view = this_.view;
			var txt = view["lessonName"] || view["lessonId"];
			if(txt) {
				fonts = txt.font.split("px ");
				if(window.isAndroid) {
					if(view["lessonId"]) {
						view["lessonId"].font = fonts[0] - window.androidOffsetFontSize + "px " + fonts[1];
					}
					if(view["lessonName"]) {
						view["lessonName"].font = fonts[0] - window.androidOffsetFontSize + "px " + fonts[1];
					}
				}
			}
			if(view["lessonName"]) {
				var btnSound = view["btnSound"];
				if(btnSound) {
					btnSound.cursor = "pointer";
					btnSound.mouseChildren = false;
					btnSound.soundId = this_.lessonData.titleSound;
					txt = view["lessonName"];
					btnSound.txt = txt;
					btnSound.txtColor = txt.color;
					txts.push(txt);
					btnSounds.push(btnSound);
					btnSound.isTitle = true;
					btnSound.addEventListener("click", playLessonNameAndParagraphSound, false);
				}
			}
			var paragraphs = this_.lessonData.paragraphs;
			if(itemIndexArr_) {
				paragraphsLength = itemIndexArr_[1] - itemIndexArr_[0];
			} else {
				paragraphsLength = paragraphs.length;
			}

			if(view["txt_0"]) {
				fonts = view["txt_0"].font.split("px ");
				for(var i = 0; i < paragraphsLength; i++) {
					txt = view["txt_" + i];
					if(!txt) {
						continue;
					}
					if(poetryObj.hasOwnProperty(this_.name)) {
						if(window.isAndroid) {
							txt.font = fonts[0] - window.androidOffsetFontSize + "px " + fonts[1];
						} else {
							txt.font = fonts[0] - window.commonOffsetFontSize + "px " + fonts[1];
						}
					} else {
						if(window.isAndroid) {
							txt.text = "  " + txt.text;
							txt.font = fonts[0] - window.androidOffsetFontSize + "px " + fonts[1];
						} else {
							txt.text = " " + txt.text;
							txt.font = fonts[0] - window.commonOffsetFontSize + "px " + fonts[1];
						}
					}
					btnSound = view["btnSound_" + i];
					if(!btnSound) {
						continue;
					}
					btnSound.txtColor = txt.color;
					btnSound.cursor = "pointer";
					btnSound.mouseChildren = false;
					if(itemIndexArr_) {
						btnSound.soundId = this_.lessonData.paragraphs[i + parseInt(itemIndexArr_[0])];
					} else {
						btnSound.soundId = this_.lessonData.paragraphs[i];
					}
					btnSound.txt = txt;
					txts.push(txt);
					btnSounds.push(btnSound);
					btnSound.lessonData = this_.lessonData;
					btnSound.addEventListener("click", playLessonNameAndParagraphSound, false);
				}
			}
		}

		//		function changeImgAndWord(e) {
		//			var changeImg = e.currentTarget;
		//			this_.view.wordImg.txt.text = changeImg.word;
		//			this_.view.wordImg.img.image.src = window.PIC_PATH + "lesson_" + this_.lessonData.lessonId + "/word_" + changeImg.key + ".jpg";
		//		}

		function playLessonNameAndParagraphSound(e) {
			e.stopPropagation();
			var btn = e.target;
			resetBtnSoundTextStatus(btn);
			btn.isClick = !btn.isClick;
			createjs.Sound.stop();
			var txt = btn.txt;
			txt.color = btn.txtColor;
			var soundId = btn.soundId;
			if(btn.isClick) {
				txt.color = "#ff0000";
				if(btn.isTitle){
					isTitleSounding = true;
				}else{
					isTitleSounding = false;
				}
				if(window.isSoundLoadObj.hasOwnProperty(soundId) && window.isSoundLoadObj[soundId]) {
					if(btn.soundIndex) {
						createjs.Sound.play(btn.soundIndex);
					}else{
						createjs.Sound.play(soundId);
					}
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
				btnSound = btnSounds[i];
				txt = txts[i];
				if(txt) {
					txt.color = btnSound.txtColor;
				}
				if(btn_) {
					if(btn_ != btnSound) {
						btnSound.gotoAndStop(0);
						btnSound.isClick = false;
					}
				} else {
					if(btnSound) {
						btnSound.gotoAndStop(0);
						btnSound.isClick = false;
					}
				}
			}
		}

		function loadWordOrExerciseSound(wordsData_, namePrefix_, btnPrefix_) {
			var soundsObj = wordsData_.scripts;
			var soundsArr = [];
			var obj;
			var i = 0;
			var btnSound;
			var soundId = wordsData_.soundId;
			for(var key in soundsObj) {
				btnSound = this_.view[btnPrefix_ + i];
				if(!btnSound) {
					continue;
				}
				btnSound.cursor = "pointer";
				btnSound.mouseChildren = false;
				btnSound.soundIndex = key;
				btnSound.soundId = soundId;
				btnSound.txt = this_.view[namePrefix_ + i];
				btnSounds.push(btnSound);
				txts.push(this_.view[namePrefix_ + i]);
				btnSound.addEventListener("click", playLessonNameAndParagraphSound);
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
			createjs.Sound.on("fileload", loadSound);
			createjs.Sound.registerSounds(sounds, window.assetsPath);
			// 加载完成后

			function loadSound() {
				createjs.Sound.stop();
				window.isSoundLoadObj[soundId] = true;
			}
		}

	}
	var Super = function() {};
	Super.prototype = ui.BaseDialog.prototype;
	LessonOnePlaySoundContainer_0.prototype = new Super();
	window.ui.LessonOnePlaySoundContainer_0 = LessonOnePlaySoundContainer_0;
})();