(function() {
	window.ui = window.ui || {};
	var LessonOneConnectionLineContainer_2 = function(name_) {
		ui.BaseDialog.call(this);
		this.name = name_;
		var this_ = this;
		var yy = 204;
		var xx = 82;
		var itemNum = 0;
		var inputs = [];
		var clickQuestion = null;
		var clickAnswer = null;
		var rightAnswers = [];
		var wordMaskTxt;
		var maxLengths;
		this.initView = function() {
			if(this_.lessonData) {
				this_.commonBarCallback("", this_.lessonData);
			}
			var dom = document.getElementById("dom_overlay_container");
			var input_;
			for(var i = 0, len = inputs.length; i < len; i++) {
				input_ = inputs[i];
				if(!input_.parentNode) {
					dom.appendChild(input_);
				}
			}
		}
		this.resetView = function() {
			var dom = document.getElementById("dom_overlay_container");
			var input_;
			for(var i = 0, len = inputs.length; i < len; i++) {
				input_ = inputs[i];
				if(input_.parentNode) {
					dom.removeChild(input_);
				}
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
			if(this.name == "uiLessonOne_3") {
				rightAnswers = [3, 1, 2];
			} else if(this.name == "uiLessonThree_4") {
				rightAnswers = [2, 1];
				wordMaskTxt = "hai";
			} else if(this.name == "uiLessonSevenExercise_6") {
				rightAnswers = [4, 1, 2, 3];
			} else if(this.name == "uiSuenvaOne_5") {
				rightAnswers = [2, 1];
				wordMaskTxt = "hawj";
			} else if(this.name == "uiLessonFifteenExercise_8") {
				rightAnswers = [3, 1, 2];
				wordMaskTxt = "dwg";
			} else if(this.name == "uiLessonEightExercise_5") {
				rightAnswers = [3, 1, 4, 2];
			} else if(this.name == "uiLessonElevenExercise_8") {
				rightAnswers = [5, 4, 1, 2, 3];
			} else if(this.name == "uiLessonTwelveExercise_10") {
				rightAnswers = [2, 3, 4, 1];
			} else if(this.name == "uiLessonEighteenExercise_12") {
				rightAnswers = [4,3,1,2,7,5,6];
			} else if(this.name == "uiSuenvaSix_5") {
				rightAnswers = [4, 1, 2, 3];
			} else if(this.name == "uiLessonFourteenExercise_8") {
				rightAnswers = [3, 1, 5, 2, 4];
				maxLengths = [15];
			}
			itemNum = rightAnswers.length;
			if(this.view.lessonName) {
				this.view.x = 82;
				this.view.y = 140;
			} else {
				this.view.x = xx;
				this.view.y = yy;
			}
			if(wordMaskTxt) {
				this_.view.wordMask.txt.text = wordMaskTxt;
			}
			buildLines();
			initInputs();
		}

		function initInputs() {
			if(!maxLengths) {
				return;
			}
			this_.view.addEventListener("click", function() {
				for(var i = 0; i < inputs.length; i++) {
					inputs[i].blur();
				}
			});
			setTimeout(function() {
				var input_;
				var inputNum = document.querySelectorAll(".ui-textinput");
				for(var i = 0, len = inputNum.length; i < len; i++) {
					input_ = document.getElementById("input_" + i);
					maxLengths[i] = maxLengths[i] ? maxLengths[i] : maxLengths[0];
					input_.setAttribute("maxlength", maxLengths[i]);
					input_.setAttribute("spellcheck", "false");
					input_.oninput = function(e) {
						var tar = e.currentTarget;
						tar.value = tar.value.replace(/[^A-Za-z, .?''""\n\r]/g, "");
					}
					inputs.push(input_);
				}
				if(this_.view.btnInputReset) {
					this_.view.btnInputReset.mouseChildren = false;
					this_.view.btnInputReset.on("click", function() {
						var ipts = document.querySelectorAll(".ui-textinput") || document.querySelectorAll("ui-textarea");
						for(var i = 0, len = ipts.length; i < len; i++) {
							ipts[i].value = "";
						}
					}, null, false, null, false);
					this_.view.btnInputReset.on("pressup", function(e) {
						this_.view.btnInputReset.scaleX = this_.view.btnInputReset.scaleY = 1;
					}, null, false, null, false);
					this_.view.btnInputReset.on("mousedown", function(e) {
						this_.view.btnInputReset.scaleX = this_.view.btnInputReset.scaleY = 1.5;
					}, null, false, null, false);
				}
			}, 50);
		}

		function buildLines() {
			var question;
			var answer;
			var line;
			for(var i = 1; i < itemNum + 1; i++) {
				question = this_.view["circleLeft_" + i];
				question.answerKey = "";
				question.cursor = "pointer";
				question.key = String(i);
				question.addEventListener("click", onClickQuestion, false);
				answer = this_.view["circleRight_" + i];
				answer.cursor = "pointer";
				answer.key = String(i);
				answer.addEventListener("click", onClickAnswer, false);

				line = new createjs.Shape();
				line.key = String(i);
				this_.view["line_" + i] = line;
			}
			if(this_.view.btnReset) {
				this_.view.btnReset.on("click", onClickBtnReset, null, false, null, false);
				this_.view.btnReset.on("pressup", function(e) {
					this_.view.btnReset.scaleX = this_.view.btnReset.scaleY = 1;
				});
				this_.view.btnReset.on("mousedown", function(e) {
					this_.view.btnReset.scaleX = this_.view.btnReset.scaleY = 1.5;
				});
				this_.view.btnReset.mouseChildren = false;
			}

			if(this_.view.btnJudgment) {
				this_.view.btnJudgment.on("click", onClickBtnJudgment, null, false, null, false);
				this_.view.btnJudgment.on("pressup", function(e) {
					this_.view.btnJudgment.scaleX = this_.view.btnJudgment.scaleY = 1;
				});
				this_.view.btnJudgment.on("mousedown", function(e) {
					this_.view.btnJudgment.scaleX = this_.view.btnJudgment.scaleY = 1.5;
				});
				this_.view.btnJudgment.mouseChildren = false;
			}
		}

		function onClickQuestion(e) {
			var ques = e.currentTarget;
			//判断点击了右边
			if(clickQuestion && !(clickQuestion.answerKey.length > 0)) {
				//清除上一个左边
				clickQuestion.gotoAndStop(0);
			}
			clickQuestion = ques;
			clickQuestion.gotoAndStop(1);
		}

		function onClickAnswer(e) {
			clickAnswer = e.currentTarget;
			dealLine();
		}
		function dealLine() {
			var ques = clickQuestion;
			var ans = clickAnswer;
			var line;
			var mask=this_.view.wordMask;
			if(ques) {
				line = this_.view["line_" + ques.key];
				if(ans.hasOwnProperty("questionKey") && ans.questionKey != "" && ans.questionKey.length > 0) {
					this_.view["circleLeft_" + ans.questionKey].gotoAndStop(0);
					clickQuestion.gotoAndStop(1);
					if(this_.view["line_" + ans.questionKey].lineLeft){
						this_.view["line_" + ans.questionKey].lineLeft.graphics.clear();
						this_.view["line_" + ans.questionKey].lineRight.graphics.clear();
					}
					this_.view["line_" + ans.questionKey].graphics.clear();
					this_.view.removeChild(this_.view["line_" + ans.questionKey]);
					var ques_ = this_.view["circleLeft_" + ans.questionKey];

					ans.questionKey = "";
					ques_.answerKey = "";
				}
				if(ques.hasOwnProperty("answerKey") && ques.answerKey != "" && ques.answerKey.length > 0) {
					var ans_ = this_.view["circleRight_" + ques.answerKey];
					ans_.gotoAndStop(0);
					if(this_.view.hasOwnProperty("line_" + ans_.questionKey)) {
						this_.view["line_" + ans_.questionKey].graphics.clear();
						this_.view.removeChild(this_.view["line_" + ans_.questionKey]);
					}
					ans_.questionKey = "";
				}
				clickAnswer.gotoAndStop(1);
				line.x = 0;
				line.y = 0;
				line.graphics.clear();
				line.graphics.setStrokeStyle(5);
				line.graphics.beginStroke('#F7C108');
				line.graphics.moveTo(ques.x, ques.y);
				line.graphics.lineTo(ans.x, ans.y);
				if(wordMaskTxt){
					line.alpha=0.01;
					if(line.lineLeft){
						line.lineLeft.graphics.clear();
					}if(line.lineRight){
						line.lineRight.graphics.clear();
					}
					var color='#' + (function(color){return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])  && (color.length == 6) ?  color : arguments.callee(color); })('');
					var lineLeft= new createjs.Shape();
					var lineRight=new createjs.Shape();
					line.lineLeft=lineLeft;
				  line.lineRight=lineRight;
					lineLeft.graphics.setStrokeStyle(5).beginStroke(color).moveTo(ques.x, ques.y).lineTo(mask.x,mask.y);
					lineLeft.graphics.setStrokeStyle(5).beginStroke(color).moveTo(mask.x,mask.y).lineTo(ans.x,ans.y);
					this_.view.addChild(lineRight);
					this_.view.addChild(lineLeft);
				}
				ans.questionKey = ques.key;
				ques.answerKey = ans.key;
				this_.view.addChild(line);
				this_.view.addChild(ans);
				this_.view.addChild(ques);
				this_.view.addChild(mask);

			}
		}

		function judgeAnswer() {
			for(var i = 1; i < itemNum + 1; i++) {
				if(this_.view["circleRight_" + i].questionKey) {
					this_.view["btnRightWrong_" + i].visible = true;
					if(this_.view["circleRight_" + i].questionKey == rightAnswers[i - 1]) {
						this_.view["btnRightWrong_" + i].gotoAndStop(0);
						this_.view["circleRight_" + i].removeAllEventListeners();
						this_.view["circleLeft_" + this_.view["circleRight_" + i].questionKey].removeAllEventListeners();
					} else {
						this_.view["btnRightWrong_" + i].gotoAndStop(1);
					}
				} else {
					this_.view["btnRightWrong_" + i].visible = true;
					this_.view["btnRightWrong_" + i].gotoAndStop(1);
				}
			}
			createjs.Sound.stop();
			var num = 0;
			for(var j = 1; j < itemNum + 1; j++) {
				if(this_.view["circleRight_" + j].questionKey == rightAnswers[j - 1]) {
					num++;
				}
			}
			if(num == itemNum) {
				createjs.Sound.play(window.ANSWER_RIGHT_Id);
			} else {
				createjs.Sound.play(window.ANSWER_WRONG_Id);
			}
			 clickQuestion = null;
		   clickAnswer = null;
		}

		function onClickBtnJudgment() {
			judgeAnswer();
		}

		function onClickBtnReset() {
			for(var i = 1; i < itemNum + 1; i++) {
				this_.view["circleLeft_" + i].gotoAndStop(0);
				this_.view["circleRight_" + i].gotoAndStop(0);
				this_.view["line_" + i].graphics.clear();
				this_.view["btnRightWrong_" + i].gotoAndStop(0);
				this_.view["btnRightWrong_" + i].visible = false;
				this_.view["circleLeft_" + i].answerKey = "";
				this_.view["circleRight_" + i].questionKey = "";
				this_.view.removeChild(this_.view["line_" + i]);
				this_.view.removeChild(this_.view["line_" + i].lineRight);
				this_.view.removeChild(this_.view["line_" + i].lineLeft);
				clickQuestion = null;
				clickAnswer = null;
				this_.view["circleLeft_" + i].addEventListener("click", onClickQuestion, false);
				this_.view["circleRight_" + i].addEventListener("click", onClickAnswer, false);
			}
		}
	}
	var Super = function() {};
	Super.prototype = ui.BaseDialog.prototype;
	LessonOneConnectionLineContainer_2.prototype = new Super();
	window.ui.LessonOneConnectionLineContainer_2 = LessonOneConnectionLineContainer_2;
})();
