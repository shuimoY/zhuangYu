(function() {
	window.ui = window.ui || {};

	var LessonOneRecordContainer_5 = function(name_) {
		ui.BaseDialog.call(this);
		this.name = name_;
		var this_ = this;
		var yy = 204;
		var xx = 82;
		var DIS_WID = 1920;
		var DIS_HEI = 1082;
		var paragraphsLength;
		var wordsLength;
		var mcPlay;
		var carousel;
		var recordPlayManager;
		this.initView = function() {
			if(this_.lessonData) {
				this_.commonBarCallback("", this_.lessonData);
			}
			if(carousel) {
				carousel.addCarousel();
			}
			if(this_.view.audioPlayBack){
				mcPlay=setInterval(function(){
					this_.view.audioPlayBack.mc.gotoAndPlay(0);
				},700)
			}
		}
		this.resetView = function() {
			if(carousel) {
				carousel.removeCarousel();
			}
			resetWordBtnTextColor();
			resetBtnTextColor();
			clearInterval(mcPlay);
			if(recordPlayManager){
				recordPlayManager.releaseSound();
			}
		}
		this.init = function(view_, itemIndex_, chapterLessonIds_, lib_, mainScene_, commonBarCallback_) {
			this.view = view_;
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
			if(chapterLessonIds_[0] > 0) {
				lessonData = this.getDataById(chapterLessonIds_[0], chapterLessonIds_[1]);
			} else {
				lessonData = this.getDataById(chapterLessonIds_[0]);
			}
			commonBarCallback_("", lessonData);
			if(this.view.lessonName){
				this.view.x = 82; 
				this.view.y = 140;
			}else{
				this.view.x = xx;
				this.view.y = yy;
			}
			initCarousel();
			initRecordPlay();
		}
		function initCarousel(){
			var startIndex = 0;
			if(this_.view.carousel) {
				carousel = new ui.CarouselContainer(this_.view.carousel, this_.lib, this_.lessonData, this_.name, startIndex);
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

		function resetBtnTextColor(btn_) {
			var txt, btnSound;
			for(var i = 0; i < paragraphsLength; i++) {
				txt = this_.view["txt_" + i];
				txt.color = "#000000";
				btnSound = this_.view["btnSound_" + i];
				btnSound.gotoAndStop(0);
				if(btn_ != btnSound) {
					btnSound.isClick = false;
				}
			}
		}

		function playSound(e, lessonData_) {
			var btn = e.currentTarget;
			resetBtnTextColor(btn);
			btn.isClick = !btn.isClick;
			createjs.Sound.stop();
			var txt = this_.view[btn.txtName];
			txt.color = "#000000";
			var instance;
			var soundId = lessonData_.paragraphs[btn.paragraphIndex];
			if(!btn.hasOwnProperty("soundIndex")) {
				btn.soundIndex = 0;
			}
			if(btn.isClick) {
				txt.color = "#ff0000";
				if(window.isSoundLoadObj.hasOwnProperty(soundId) && window.isSoundLoadObj[soundId]) {
					createjs.Sound.play(soundId);
				} else {
					createjs.Sound.addEventListener("fileload", soundLoaded, false); // add an event listener for when load is completed
					createjs.Sound.registerSound(assetsPath + soundId, soundId);
				}
				btn.gotoAndStop(1);
			} else {
				btn.gotoAndStop(0);
			}

			function soundLoaded(e) {
				window.isSoundLoadObj[soundId] = true;
				if(btn.isClick) {
					txt.color = "#ff0000";
					createjs.Sound.stop();
					instance = null;
					instance = createjs.Sound.play(soundId);
				}
			}
		}

		function resetWordBtnTextColor(btn_) {
			var txt, btnSound;
			for(var i = 0; i < wordsLength; i++) {
				txt = this_.view["txt_" + i];
				txt.color = "#000000";
				btnSound = this_.view["btnWordSound_" + i];
				btnSound.gotoAndStop(2);
				if(btn_ != btnSound) {
					btnSound.isClick = false;
				}
			}
		}

		function loadWordSound(wordsData_) {
			var soundsObj = wordsData_.scripts;
			var soundsArr = [];
			var obj;
			var i = 0;
			var btnSound;
			var soundId = wordsData_.soundId;
			var fonts = this_.view["txt_0"].font.split("px ");
			for(var key in soundsObj) {
				btnSound = this_.view["btnWordSound_" + i];
				if(!btnSound) {
					continue;
				}
				if(window.isAndroid) {
					this_.view["txt_" + i].font = fonts[0] - window.androidOffsetFontSize + "px " + fonts[1];
				}
				btnSound.soundIndex = key;
				btnSound.txtName = "txt_" + i;
				btnSound.on("click", function(e) {
					var btn = e.currentTarget;
					resetWordBtnTextColor(btn);
					btn.isClick = !btn.isClick;
					createjs.Sound.stop();
					var txt = this_.view[btn.txtName];
					txt.color = "#000000";
					if(btn.isClick) {
						txt.color = "#ff0000";
						btn.gotoAndStop(1);
						if(window.isSoundLoadObj[soundId]) {
							createjs.Sound.play(btn.soundIndex);
						}
					} else {
						btn.gotoAndStop(2);
					}
				}, null, false, null, false);
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
			createjs.Sound.on("fileload", loadSound, null, false, null, false);
			createjs.Sound.registerSounds(sounds, assetsPath);
			// 加载完成后

			function loadSound() {
				window.isSoundLoadObj[soundId] = true;
			}
		}

	}
	var Super = function() {};
	Super.prototype = ui.BaseDialog.prototype;
	LessonOneRecordContainer_5.prototype = new Super();
	window.ui.LessonOneRecordContainer_5 = LessonOneRecordContainer_5;
})();