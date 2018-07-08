(function() {
	window.ui = window.ui || {};
	var JundgeRightOrWrong = function(name_) {
		ui.BaseDialog.call(this);
		this.name = name_;
		var this_ = this;
		var yy = 204;
		var xx = 82;
		var questionNum = 4;  //选项数目
		var answer = [3];		  //正确答案是第几个,可以是多个
		var fourCheckbox;        //默认为二选一 哪几个为四选一
		this.resetView = function() {}
		this.initView = function(parent_) {
			if(this_.lessonData) {
				this_.commonBarCallback("", this_.lessonData);
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
			if(this.view.lessonName){
				this.view.x = 82; 
				this.view.y = 140;
			}else{
				this.view.x = xx;
				this.view.y = yy;
			}
			if(this.name == "uiLessonFourEx_8"){
				fourCheckbox=[0,1,2,3];
				answer=[1];
			}else if(this.name == "uiLessonSevenExercise_1"){
				answer=[1,2];
			}else if(this.name == "uiSuenvaFour_2"){
				answer=[1,2,4];
				questionNum = 6; 
			}else if(this.name == "uiLessonFourteenExercise_2"){
				answer=[0,5];
				fourCheckbox=[0,1,2,3];
				questionNum = 6; 
			}else if(this.name == "uiGenjcwzdizGeizSatbyai_1"){
				answer=[1,2];
			}else if(this.name == "uiLessonEightExercise_1"){
				fourCheckbox=[0,1,2,3];
				answer=[2];
			}
//			setTimeout(init,50); //why?
			init();
			if(this_.view.btnReset){
				this_.view.btnReset.on("click", clickBtnReset);
				this_.view.btnReset.on("pressup", function(e) {
					this_.view.btnReset.scaleX = this_.view.btnReset.scaleY = 1;
				}, null, false, null, false);
				this_.view.btnReset.on("mousedown", function(e) {
					this_.view.btnReset.scaleX = this_.view.btnReset.scaleY = 1.5;
				}, null, false, null, false);
				this_.view.btnReset.mouseChildren = false;
			}
			if(this_.view.btnJudgment){
				this_.view.btnJudgment.on("click", clickBtnJudgment);
				this_.view.btnJudgment.on("pressup", function(e) {
					this_.view.btnJudgment.scaleX = this_.view.btnJudgment.scaleY = 1;
				}, null, false, null, false);
				this_.view.btnJudgment.on("mousedown", function(e) {
					this_.view.btnJudgment.scaleX = this_.view.btnJudgment.scaleY = 1.5;
				}, null, false, null, false);
				this_.view.btnJudgment.mouseChildren = false;
			}

			function init() {
				for(var i = 0; i < questionNum; i++) {
					this_.view["btnRightWrong_" + i].gotoAndStop(1);
					this_.view["btnRightWrong_" + i].visible = false;
					this_.view["btnJudge_" + i].key = i;
					this_.view["btnJudge_" + i].mouseChildren = false;
					this_.view["btnJudge_" + i].on("click", checkAnswer);
				}
			}

			function checkAnswer(e) {
				btn=e.target;
				if(fourCheckbox && fourCheckbox.hasOwnProperty(btn.key)){
					for(var i=fourCheckbox[0];i<fourCheckbox.length;i++){
						this_.view["btnJudge_"+i].isClick=false;
						this_.view["btnJudge_"+i].gotoAndStop(0);
						this_.view["btnRightWrong_" + i].visible=false;
					}
				}else{
					if(btn.key%2){
						this_.view["btnJudge_" + (btn.key-1)].isClick=false;
						this_.view["btnJudge_" + (btn.key-1)].gotoAndStop(0);
						this_.view["btnRightWrong_" + (btn.key-1)].visible=false;
					}else{
						this_.view["btnJudge_" + (btn.key+1)].isClick=false;
						this_.view["btnJudge_" + (btn.key+1)].gotoAndStop(0);
						this_.view["btnRightWrong_" + (btn.key+1)].visible=false;
					}
				}
				if(btn.isClick){
					btn.isClick=false;
					btn.gotoAndStop(0);
				}else{
					btn.isClick=true;
					btn.gotoAndStop(1);
				}
			}
			function clickBtnJudgment(){
				var rightNum=0;
				var clickNum=0;
				createjs.Sound.stop();
				for(var i=0;i<questionNum;i++){
					this_.view["btnRightWrong_" + i].gotoAndStop(1);
					this_.view["btnRightWrong_" + i].visible = false;
					if(this_.view["btnJudge_" + i].isClick){
						this_.view["btnRightWrong_" + i].visible = true;
						clickNum++;
					}
					for(var j=0,len=answer.length;j<len;j++){
						if(this_.view["btnJudge_" + i].isClick&&this_.view["btnJudge_" + i].key==answer[j]){
							this_.view["btnRightWrong_" + i].gotoAndStop(0);
							rightNum++;
						}
					}
				}
				if(rightNum == answer.length && rightNum == clickNum){
					createjs.Sound.play(window.ANSWER_RIGHT_Id);
				}else{
					createjs.Sound.play(window.ANSWER_WRONG_Id);
				}
			}
			function clickBtnReset() {
				for(var i = 0; i < questionNum; i++) {
					this_.view["btnRightWrong_" + i].visible = false;
					this_.view["btnJudge_"+i].gotoAndStop(0);
					this_.view["btnJudge_"+i].isClick=false;
				}
			}
		}

	}
	var Super = function() {};
	Super.prototype = ui.BaseDialog.prototype;
	JundgeRightOrWrong.prototype = new Super();
	window.ui.JundgeRightOrWrong = JundgeRightOrWrong;
})();