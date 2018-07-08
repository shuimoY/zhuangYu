(function() {
	window.ui = window.ui || {};

	var ChapterContainer = function(name_) {
		ui.BaseDialog.call(this);
		this.name = name_;
		var this_ = this;
		var yy = 204;
		var xx = 96;
		this.initView = function() {
			if(this_.lessonData) {
				this_.commonBarCallback(this_.lessonData.title);
			}
		}
		this.resetView = function() {
			resetBtnSoundTextStatus();
			createjs.Sound.stop();
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
			lessonData = this.getDataById(chapterLessonIds_[0]);
			this_.lessonData = lessonData;
			this_.commonBarCallback(this_.lessonData.title);
			
			this_.view.x = xx;
			this_.view.y = yy;
			
			initImg();
			var btnSound = this_.view.btnSound;
			btnSound.on("click", playSound, null, false, lessonData);
			var fonts = this_.view["txt_0"].font.split("px ");
			if(window.isAndroid) {
				this_.view["txt_0"].font = fonts[0] - window.androidOffsetFontSize + "px " + fonts[1];
				this_.view["txt_0"].text="  "+this_.view["txt_0"].text;
			}
			playBGSound(lessonData);
		}
		function initImg(){
			this_.view.fillImg.removeAllChildren();
			var bit = new createjs.Bitmap(window.PIC_CHAPTER_PATH + "chapter_" + this_.lessonData.chapterId + ".jpg");
			bit.scaleX = bit.scaleY = 0.8;
			this_.view.fillImg.addChild(bit);
		}
		function resetBtnSoundTextStatus() {
			this_.view.btnSound.gotoAndStop(0);
			this_.view.txt_0.color = "#694C12";
		}

		function playSound(e, chapterData_) {
			var btn = e.currentTarget;
			btn.isClick = !btn.isClick;
			createjs.Sound.stop();
			var txt = this_.view["txt_0"];
			txt.color = "#694C12";
			var soundId = chapterData_.soundId;
			if(btn.isClick) {
				txt.color = "#ff0000";
				if(window.isSoundLoadObj.hasOwnProperty(soundId) && window.isSoundLoadObj[soundId]) {
					createjs.Sound.play(soundId);
				} else {
					createjs.Sound.addEventListener("fileload", soundLoaded);
					createjs.Sound.registerSound(window.assetsPath + soundId, soundId);
				}
				btn.gotoAndStop(1);
			} else {
				btn.gotoAndStop(2);
			}

			function soundLoaded(e) {
				window.isSoundLoadObj[soundId] = true;
				if(btn.isClick) {
					txt.color = "#ff0000";
					createjs.Sound.stop();
					createjs.Sound.play(soundId);
				}
			}
		}

		function playBGSound(chapterData_) {
			var soundId = chapterData_.bgMusicId;
			if(window.isSoundLoadObj.hasOwnProperty(soundId) && window.isSoundLoadObj[soundId]) {
				createjs.Sound.play(soundId);
			} else {
				createjs.Sound.addEventListener("fileload", soundBgLoaded);
				createjs.Sound.registerSound(window.assetsPath + soundId, soundId);
			}

			function soundBgLoaded(e) {
				window.isSoundLoadObj[soundId] = true;
				createjs.Sound.play(soundId);
			}
		}
	}
	var Super = function() {};
	Super.prototype = ui.BaseDialog.prototype;
	ChapterContainer.prototype = new Super();
	window.ui.ChapterContainer = ChapterContainer;
})();