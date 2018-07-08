(function() {
	window.ui = window.ui || {};
	var LessonOneExDrawSentenceContainer_12 = function(name_) {
		ui.BaseDialog.call(this);
		this.name = name_;
		var this_ = this;
		var xx = 82;
		var yy = 204;
		var recordPlayManager;
		var suenvaSoundManager;
		var scrollbarListManager;
		var exerciseSoundManager;
		var suenvaSoundNames = {
		}
		this.initView = function() {
			if(this_.lessonData) {
				this_.commonBarCallback("", this_.lessonData);
			}
			if(scrollbarListManager){
				scrollbarListManager.addMyEventListener();
			}
		}
		this.resetView = function() {
			if(this_.lessonData) {
				this_.commonBarCallback("", this_.lessonData);
			}
			if(scrollbarListManager){
				scrollbarListManager.removeMyEventListener();
			}
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
			if(chapterLessonIds_){
				if(chapterLessonIds_[0] > 0) {
					lessonData = this.getDataById(chapterLessonIds_[0], chapterLessonIds_[1]);
				} else {
					lessonData = this.getDataById(chapterLessonIds_[0]);
				}
				this_.lessonData = lessonData;
				this_.commonBarCallback("", lessonData);
			}
			
			if(this.view.lessonName){
				this.view.x = 82; 
				this.view.y = 140;
			}else if(this.name == "uiLessonThirteenExercise_6_pop"){
				
			}else{
				this.view.x = xx;
				this.view.y = yy;
			}
			//重置按钮
			this_.view.btnReset.mouseChildren = false;
			this_.view.btnReset.cursor = "pointer";
			this_.view.btnReset.addEventListener("pressup", function(e) {
				scrollbarListManager.clear();
				this_.view.btnReset.scaleX = this_.view.btnReset.scaleY = 1;
			}, false);
			this_.view.btnReset.addEventListener("mousedown", function(e) {
				this_.view.btnReset.scaleX = this_.view.btnReset.scaleY = 1.5;
			}, false);
			var btnWordSave;
			if(this_.view.btnWordSave){
				btnWordSave = this_.view.btnWordSave;
				btnWordSave.cursor = "pointer";
				btnWordSave.mouseChildren = false;
				btnWordSave.on("click", clickBtnSave, false);
			}
			
			initScrollbarList();
			initRecordPlay();
			initSuenvaSound();
			initExerciseSound();
		}
		function initScrollbarList(){
			scrollbarListManager = new ui.ScrollbarListContainer(this_.view, this_.lib);
		}
		function initExerciseSound() {
			var isExerciseTxt = false;
			var startIndex = 0;
			for(var i = 0; i < 10; i++) {
				if(this_.view["exerciseTxt_" + i]) {
					isExerciseTxt = true;
					startIndex = i;
					break;
				}
			}
			var lessonData = this_.lessonData;
			if(isExerciseTxt) {
				exerciseSoundManager = new ui.ExerciseSoundContainer(this_.view, lessonData.exercises);
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
			var instance;
			if(!btnRecord) {
				for(var i = 0; i < 10; i++) {
					if(i == 0) {
						instance = this_.view.instance;
					} else {
						instance = this_.view["instance_" + i];
					}
					if(!instance || !(typeof(instance) == Object)) {
						break;
					} else {
						if(!btnRecord) {
							btnRecord = instance instanceof this_.lib.BtnRecord ? instance : null;
						}
						if(!btnPlay) {
							btnPlay = instance instanceof this_.lib.BtnPlay ? instance : null;
						}
					}
				}
			}
			if(btnPlay && !recordPlayManager) {
				recordPlayManager = new ui.RecordPlayContainer(btnRecord, btnPlay, this_.name);
			}
		}
		
		function clickBtnSave(e) {
			scrollbarListManager.cloneWriteCanvas();
		}
		

		function initSuenvaSound() {
			if(suenvaSoundNames.hasOwnProperty(this_.name)) {
				var lessonData = this_.lessonData;
				var subjectData = window.data.getSubjectDataByI(this_.lessonData.subjects, suenvaSoundNames[this_.name][0], suenvaSoundNames[this_.name][1])
				if(!suenvaSoundManager) {
					suenvaSoundManager = new ui.SuenvaSoundContainer(this_.view, subjectData, suenvaSoundNames[this_.name][0], suenvaSoundNames[this_.name][1]);
				}
			}
		}
	}
	var Super = function() {};
	Super.prototype = ui.BaseDialog.prototype;
	LessonOneExDrawSentenceContainer_12.prototype = new Super();
	window.ui.LessonOneExDrawSentenceContainer_12 = LessonOneExDrawSentenceContainer_12;
})();