(function() {
	window.ui = window.ui || {};
	var LessonTwoInputContainer_1 = function(name_) {
		ui.BaseDialog.call(this);
		this.name = name_;
		var this_ = this;
		var yy = 204;
		var xx = 82;
		var inputs = [];
		var inputs_ = [];
		var answers = [];
		var answerTxts = [];
		var maxLengths = [];
		var btnRightWrongNums = 0;
		var carousel;
		var recordPlayManager;
		var suenvaSoundManager;
		var btnRightWrongLen;
		var suenvaSoundNames = {
			"uiSuenvaFive_11": [3, 2]
		}
		var rightAnswerTexts = ["uiLessonOneEx_11",
			"uiLessonOneEx_14",
			"uiLessonTwoEx_11",
			"uiLessonThreeExercise_13",
			"uiSuenvaOne_6",
			"uiLessonFourEx_12",
			"uiLessonFiveExercise_8",
			"uiLessonSixExercise_14",
			"uiLessonSevenExercise_11",
			"uiSuenvaThree_0",
			"uiSuenvaThree_6",
			"uiLessonTenExercise_8",
			"uiLessonEleven_8",
			"uiLessonElevenExercise_9",
			"uiLessonTwelve_6",
			"uiLessonTwelveExercise_11",
			"uiSuenvaFour_10",
			"uiLessonFifteenExercise_13",
			"uiLessonFifteenExercise_16",
			"uiLessonSixteenExercise_11",
			"uiLessonSeventeenExercise_14",
			"uiLessonEighteenExercise_13",
			"uiGenjcwzdizGeizSatbyai_11"
		];

		rightAnswerTexts = [];
		this.resetView = function() {
			var dom = document.getElementById("dom_overlay_container");
			var input_;
			for(var i = 0, len = inputs.length; i < len; i++) {
				input_ = inputs[i];
				if(input_.parentNode) {
					dom.removeChild(input_);
				}
			}
			if(carousel) {
				carousel.removeCarousel();
			}
			if(recordPlayManager) {
				recordPlayManager.releaseSound();
			}
		}
		this.initView = function(parent_) {
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
			if(carousel) {
				carousel.addCarousel();
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
			if(this.name == "uiLessonFiveExercise_3") {
				maxLengths = [4];
			} else if(this.name == "uiLessonTenExercise_2" || this.name == "uiLessonTenExercise_1" || this.name == "uiGenjcwzdizGeizSatbyai_4") {
				maxLengths = [5];
			} else if(this.name == "uiLessonFiveExercise_6" || this.name == "uiSuenvaThree_0" || this.name == "uiLessonSixteenExercise_4") {
				maxLengths = [6];
				if(this.name == "uiSuenvaThree_0") {
					answers = ["eng", "ap", "q", "ieng", "wg", "ing"];
				}
			} else if(this.name == "uiLessonFiveExercise_2" || this.name == "uiLessonOneEx_7" || this.name == "uiLessonOneEx_8" || this.name == "uiLessonTwoEx_10" || this.name == "uiLessonThreeExercise_8" ||
				this.name == "uiLessonFiveExercise_5" || this.name == "uiLessonSixExercise_8" || this.name == "uiLessonSixExercise_9" || this.name == "uiLessonSevenExercise_2" || this.name == "uiLessonSevenExercise_7" ||
				this.name == "uiLessonEightExercise_3" || this.name == "uiLessonEightExercise_4" || this.name == "uiLessonNineExercise_8" || this.name == "uiLessonNineExercise_9" || this.name == "uiSuenvaThree_3" ||
				this.name == "uiSuenvaThree_4" || this.name == "uiSuenvaThree_5" || this.name == "uiLessonTenExercise_4" || this.name == "uiLessonElevenExercise_7" || this.name == "uiLessonTwelveExercise_9" ||
				this.name == "uiSuenvaFour_3" || this.name == "uiLessonFourteen_7" || this.name == "uiLessonFifteenExercise_4" || this.name == "uiLessonFifteenExercise_5") {
				maxLengths = [23];
			} else if(this.name == "uiGenjcwzdizGeizSatbyai_8") {
				maxLengths = [8];
				//				if(this.name == "uiSuenvaFive_13") {
				//					answers = [",", "!", "?"];
				//				}
			} else if(this.name == "uiLessonSixteenExercise_6" || this.name == "uiSuenvaFive_5" || this.name == "uiSuenvaFive_4" || this.name == "uiSuenvaTwo_2" || this.name == "uiGenjcwzdizGeizSatbyai_5") {
				maxLengths = [10];
			} else if(this.name == "uiLessonSeventeenExercise_8" || this.name == "uiLessonSixteenExercise_5" || this.name == "uiLessonOneEx_14" || this.name == "uiLessonEighteenExercise_13") {
				maxLengths = [11];
				if(this.name == "uiLessonOneEx_14") {
					answers = ["sam", "saekhenj", "saekhau", "saekloeg"];
				} else if(this.name == "uiLessonEighteenExercise_13") {
					answers = ["coh", "lai", "simndei", "guhcaeg", "gang", "leix"];
				}
			} else if(this.name == "uiLessonFifteenExercise_7" || this.name == "uiSuenvaSix_4") {
				maxLengths = [12];
			} else if(this.name == "uiLessonFifteenExercise_16") {
				maxLengths = [20];
				answers = ["sam", "hauxreih haeuxnaz", "duhdoem", "haeuxfiengj"];
			} else if(this.name == "uiGenjcwzdizGeizSatbyai_11" || this.name == "uiLessonSeventeenExercise_9" || this.name == "uiLessonSeventeen_7" || this.name == "uiSuenvaOne_4") {
				maxLengths = [15];
				if(this.name == "uiGenjcwzdizGeizSatbyai_11") {
					answers = ["Bou simndei", "boux guhcaeg", "Cax miz gang", "vunz rox leix"];
				}
			} else if(this.name == "uiLessonTwoEx_11") {
				maxLengths = [40];
				answers = ["fag yaekseiz", "hab saek hoengzhoengz heiheu", "feihdauh"];
			} else if(this.name == "uiLessonEleven_8") {
				maxLengths = [25];
				answers = ["baebae dauqdauq", "haeujhaeuj okok"];
			} else if(this.name == "uiLessonNineExercise_10" || this.name == "uiLessonSixteenExercise_11" || this.name == "uiSuenvaFour_10" || this.name == "uiSuenvaSix_11") {
				maxLengths = [35];
				if(this.name == "uiSuenvaFour_10") {
					answers = [" baenzlawz ndaej nyib buh", "Haeux ndei baengh gyaj", "couh miz gwn miz daenj"];
				} else if(this.name == "uiLessonSixteenExercise_11") {
					answers = ["ngoenz doek ngoenz", "bi doek bi", "siengjh aeu maz ndaej maz", "cwxcaih youh vifung"];
				}
			} else if(this.name == "uiSuenvaOne_6") {
				maxLengths = [35];
				answers = ["Seiz cou dwg saekloeg", "Seiz cou dwg saekhau", "Seiz cou dwg saekloeg"];
			} else if(this.name == "uiLessonFifteenExercise_13") {
				maxLengths = [52];
				answers = ["mbouj miz dungx cix iek", "Riengz raze naed de saeq", "noix donq iek daimaez"];
			} else if(this.name == "uiLessonEighteenExercise_7") {
				maxLengths = [11];
				answers = ["ngoemx", "goz", "huk"];
			} else if(this.name == "uiGenjcwzdizGeizSatbyai_0") {
				maxLengths = [1];
				answers = ["a", "d", "f", "h", "j", "b", "e", "g", "i", "l"]
			} else if(this.name == "uiLessonOneEx_11") {
				maxLengths = [19, 18, 50];
				answers = ["saekhenj", "saekloeg", "lai saek lai yiengh"];
			} else if(this.name == "uiLessonThreeExercise_1") {
				maxLengths = [5, 6, 5, 5, 6, 5];
				btnRightWrongLen = 2;
				answers = ["m", "aeu", "q", "r", "ung", "h"];
			} else if(this.name == "uiLessonThreeExercise_2") {
				maxLengths = [5, 6, 5, 5, 6, 5];
				answers = ["d", "ueng", "h", "d", "au", "q"];
				btnRightWrongLen = 2;
			} else if(this.name == "uiLessonFourEx_5") {
				maxLengths = [1];
				answers = ["G", "N", "D", "H", "M", "B"];
			} else if(this.name == "uiSuenvaFive_1") {
				maxLengths = [8];
				answers = ["oi", "oi", "oem"];
			} else if(this.name == "uiGenjcwzdizGeizSatbyai_6") {
				maxLengths = [8];
				answers = ["gonq", "noix", "iq", "sang"];
			} else if(this.name == "uiLessonThirteenExercise_1") {
				maxLengths = [8];
				answers = ["q", "j", "z", "q", "z", "z", "x", "h", "j", "z", "z", "j"];
				btnRightWrongLen = 6;
			} else if(this.name == "uiLessonThreeExercise_3") {
				maxLengths = [1];
				answers = ["y", "g", "m", "h", "b", "n", "r", "l", "a", "e", "i", "q"];
			} else if(this.name == "uiSuenvaTwo_4") {
				answers = ["laj", "gonq", "iq", "noix", "ok", "daemq"];
				maxLengths = [23];
			} else if(this.name == "uiLessonTwoEx_6") {
				maxLengths = [16];
				answers = ["haep", "haeu", "gwnz", "hung", "ndatfwdfwd"];
			} else if(this.name == "uiLessonThreeExercise_13") {
				maxLengths = [40, 40, 14, 14, 35];
				answers = ["vamauxdan", "vahaeux", "ranz", "rungh", "mbouj loenq"];
			} else if(this.name == "uiLessonTenExercise_8") {
				maxLengths = [35, 45, 30, 25];
				answers = ["diuq gvaq dah", "haeb dawz rieng duzguk", "Duzguk", "duzgoep"];
			} else if(this.name == "uiLessonElevenExercise_5") {
				maxLengths = [12, 18, 23, 12, 18, 23, 6, 18, 23, 12, 18, 23, ];
			} else if(this.name == "uiLessonElevenExercise_9") {
				maxLengths = [30, 30, 30, 30, 55];
				answers = ["simnyap raixcaix", "luenh moeb luenh bangx", "riengzhaeux sanq", "faekduh dek", "gyoengqvunz couh bae ndaw reih ndaw naz sou gyoengqde"];
			} else if(this.name == "uiLessonFourteenExercise_1") {
				maxLengths = [4];
				answers = ["x", "x", "h", "h", "z", "z", "h", "j", "j", "z", "q", "z"];
				btnRightWrongLen = 6;
			} else if(this.name == "uiLessonSixExercise_14") {
				maxLengths = [40, 40, 10, 20];
				answers = ["Yaek aeu lwg baenz vunz", "Bouxlaux gyaez lwgnyez", "lij", "haeuj"];
			} else if(this.name == "uiLessonTwelveExercise_11") {
				maxLengths = [25, 30, 30, 28];
				answers = ["fwnmaemq yaek daengz", "Meuz gwn raemx ndit ndat", "saekseiz fwn couh daengz", "Saidoengz youq baihdoeng"];
			} else if(this.name == "uiLessonElevenExercise_6") {
				maxLengths = [23];
			} else if(this.name == "uiLessonTwelve_6") {
				maxLengths = [30, 25, 30];
				answers = ["gaeq dak fwed fwn doek", "Saidoengz youq baihsae", "gyangngoenz cingx ndit ndat"];
			} else if(this.name == "uiLessonFourEx_12") {
				maxLengths = [23];
				answers = ["gyaez", "beiz mbonq", "beizmbinj", "beiz swiz", "raeuj mbonq"];
			} else if(this.name == "uiLessonFiveExercise_8") {
				maxLengths = [10, 30, 40, 40, 40];
				answers = ["gip", "gvih roengzdaeuj bang", "Baenz! Gvaq 5 ngoenz le", "caeux di daeuj raen gou", "5 ngoenz caiq daeuj"];
			} else if(this.name == "uiLessonSevenExercise_11") {
				maxLengths = [10, 24, 12, 12, 20, 20, 20]
				answers = ["ranznden", "haujlai gyaeqgaeq ", "gaeq meh", "faeggyaeq", "dendwngh", "denyingj miz sing", "gohyozgyah"];
			} else if(this.name == "uiLessonNineExercise_7") {
				maxLengths = [12, 23, 12, 23, 12, 23, 12, 23];
			} else if(this.name == "uiLessonSeventeenExercise_14") {
				maxLengths = [18, 28, 23, 35, 20];
				answers = ["song ga capmax", "gwnz hwet naep miz baujgiemq", "gyaeuj daenj mauhdingj", "ngeng ndang song ga vangungj", "lumj diuqfoux"];
			} else if(this.name == "uiSuenvaThree_6") {
				maxLengths = [35];
				answers = ["lij haeb ndaej bouxvunz", "Duzvaiz yienznaeuz hung", "ndaej byaij geijlai gyae"];
			} else if(this.name == "uiLessonFifteen_7") {
				maxLengths = [22, 18];
				answers = ["ngveih haeuxfiengj", "Vahaeux"];
			} else {
				maxLengths = [2000];
				this_.view.input_0._handleDrawEnd = _handleDrawEnd;
			}
			if(this.view.lessonName) {
				this.view.x = 82;
				this.view.y = 140;
			} else {
				this.view.x = xx;
				this.view.y = yy;
			}

			initInputs();
			initCarousel();
			initImg();
			initRecordPlay();
			initSuenvaSound();
			initBtnRightWrong();
		}

		function initBtnRightWrong() {
			for(var i = 0; i < btnRightWrongNums; i++) {
				this_.view["btnRightWrong_" + i].visible = false;
				this_.view["btnRightWrong_" + i].gotoAndStop(0);
			}
		}

		function initRecordPlay() {
			var audioPlayBack = this_.view.audioPlayBack || this_.view.audioplayBack;
			var btnRecord;
			var btnPlay;
			if(audioPlayBack) {
				btnRecord = audioPlayBack.btnRecord;
				btnPlay = audioPlayBack.btnPlay;
			} else {
				btnRecord = this_.view.btnRecord;
				btnPlay = this_.view.btnPlay;
			}
			if(btnRecord && !recordPlayManager) {
				recordPlayManager = new ui.RecordPlayContainer(btnRecord, btnPlay, this_.name);
			}
		}

		function initCarousel() {
			var startIndex = 0;
			if(this_.view.carousel) {
				carousel = new ui.CarouselContainer(this_.view.carousel, this_.lib, this_.lessonData, this_.name, startIndex);
			}
		}

		function initImg() {
			for(var i = 0; i < 10; i++) {
				if(!this_.view["fillImg_" + i]) {
					break;
				} else {
					this_.view["fillImg_" + i].removeAllChildren();
					if(this_.view["fillImg_" + i].instance) {
						this_.view["fillImg_" + i].instance.spriteSheet = "";
						this_.view["fillImg_" + i].instance = null;
					}
					if(this_.view["fillImg_" + i].shape) {
						this_.view["fillImg_" + i].shape.graphics.clear();
						this_.view["fillImg_" + i].shape = null;
					}
					if(this_.lessonData.suenvaId) {
						var bit = new createjs.Bitmap(window.PIC_PATH + "suenva_" + this_.lessonData.suenvaId + "/input_" + i + ".jpg")
					} else if(this_.lessonData.lessonId) {
						var bit = new createjs.Bitmap(window.PIC_PATH + "lesson_" + this_.lessonData.lessonId + "/input_" + i + ".jpg")
					}
					bit.scaleX = bit.scaleY = 0.6;
					bit.alpha = 1;
					this_.view["fillImg_" + i].img = bit;
					this_.view["fillImg_" + i].addChild(bit);
				}
			}
		}

		function initInputs() {
			for(var i = 0; i < 100; i++) {
				if(this_.view["btnRightWrong_" + i]) {
					btnRightWrongNums++;
				} else {
					break;
				}
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
//						tar.value = tar.value.replace(/[^A-Za-z0-9,.?!:;''"" ，。？！：；‘’“”\n\r]/g, "");
					}
					inputs.push(input_);
					inputs_.push(this_.view["input_" + i]);
				}
				//多行输入文本位置设置
				var textareas = document.getElementsByTagName("textarea");
				var textarea_;
				for(var j = 0; j < textareas.length; j++) {
					textarea_ = textareas[j];
					if(textarea_) {
						textarea_.onkeydown = function(e) {
							var textareaT = e.target;
							if(e.keyCode == "13") {
								setTimeout(function() {
									textareaT.scrollTop = textareaT.scrollHeight;
								}, 10);
							}
						}
					}
				}

				if(this_.view.btnReset) {
					this_.view.btnReset.cursor = "pointer";
					this_.view.btnReset.mouseChildren = false;
					this_.view.btnReset.on("click", clickBtnReset, null, false, null, false);
					this_.view.btnReset.on("pressup", function(e) {
						this_.view.btnReset.scaleX = this_.view.btnReset.scaleY = 1;
					}, null, false, null, false);
					this_.view.btnReset.on("mousedown", function(e) {
						this_.view.btnReset.scaleX = this_.view.btnReset.scaleY = 1.5;
					}, null, false, null, false);
				}
				if(this_.view.btnJudgment) {
					this_.view.btnJudgment.cursor = "pointer";
					this_.view.btnJudgment.mouseChildren = false;
					if(rightAnswerTexts.indexOf(this_.name) != -1) {
						initRightAnswerTxt();
						this_.view.btnJudgment.on("click", displayAnswer);
					} else {
						this_.view.btnJudgment.on("click", clickBtnJudgment);
					}
					this_.view.btnJudgment.on("pressup", function(e) {
						this_.view.btnJudgment.scaleX = this_.view.btnJudgment.scaleY = 1;
					}, null, false, null, false);
					this_.view.btnJudgment.on("mousedown", function(e) {
						this_.view.btnJudgment.scaleX = this_.view.btnJudgment.scaleY = 1.5;
					}, null, false, null, false);
				}

			}, 50);
			//重置按钮
		}

		function displayAnswer(e) {
			var btnJudgment = this_.view.btnJudgment;
			btnJudgment.isClick = !btnJudgment.isClick;
			for(var i = 0, len = answerTxts.length; i < len; i++) {
				answerTxts[i].visible = btnJudgment.isClick;
			}
		}

		function initRightAnswerTxt() {
			var answerTxt;
			var input_;
			for(var i = 0, len = answers.length; i < len; i++) {
				answerTxt = new createjs.Text(answers[i], "46px 'Times New Roman'", "#f00");
				input_ = inputs_[i];
				answerTxt.x = input_.x;
				answerTxt.y = input_.y - 26;
				answerTxt.textAlign = "center";
				answerTxt.lineHeight = input_.lineHeight;
				answerTxt.lineWidth = inputs_.lineWidth;
				this_.view.addChild(answerTxt);
				answerTxts.push(answerTxt);
				answerTxt.visible = false;
			}
		}

		function clickBtnReset() {
			var ipts = document.querySelectorAll(".ui-textinput") || document.querySelectorAll("ui-textarea");
			for(var i = 0, len = ipts.length; i < len; i++) {
				ipts[i].value = "";
			}
			initBtnRightWrong();
		}

		function clickBtnJudgment() {
			var rightNum = 0;
			createjs.Sound.stop();
			if(btnRightWrongNums) {
				if(btnRightWrongLen) {
					for(var i = 0; i < btnRightWrongLen; i++) {
						var inputRightNum = 0;
						for(var j = 0; j < answers.length / btnRightWrongLen; j++) {
							if(answers[i * answers.length / btnRightWrongLen + j] == inputs[i * answers.length / btnRightWrongLen + j].value) {
								inputRightNum++;
							}
						}
						if(inputRightNum == answers.length / btnRightWrongLen) {
							rightNum++;
							this_.view["btnRightWrong_" + i].gotoAndStop(0);
						} else {
							this_.view["btnRightWrong_" + i].gotoAndStop(1);
						}
						this_.view["btnRightWrong_" + i].visible = true;
					}
				} else {
					for(var i = 0; i < btnRightWrongNums; i++) {
						if(inputAndAnswerStrTrans(answers[i]) == inputAndAnswerStrTrans(inputs[i].value)) {
							this_.view["btnRightWrong_" + i].gotoAndStop(0);
							rightNum++;
						} else {
							this_.view["btnRightWrong_" + i].gotoAndStop(1);
						}
						this_.view["btnRightWrong_" + i].visible = true;
					}
				}
				if(rightNum == btnRightWrongNums) {
					createjs.Sound.play(window.ANSWER_RIGHT_Id);
				} else {
					createjs.Sound.play(window.ANSWER_WRONG_Id);
				}
			} else {
				for(var i = 0, len = inputs.length; i < len; i++) {
					inputs[i].value = answers[i];
				}
			}
		}

		function inputAndAnswerStrTrans(str_) {
			str_ = str_.toLowerCase().replace(/\s\s+/g, ' ');
			str_ = str_.replace(/(^\s+)|(\s+$)/g, '');
			str_ = str_.replace(/？/g, "?");
			str_ = str_.replace(/，/g, ",");
			str_ = str_.replace(/！/g, "!");
			str_ = str_.replace(/。/g, ".");
			str_ = str_.replace(/：/g, ":");
			str_ = str_.replace(/；/g, ";");
			return str_;
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

		function _handleDrawEnd(evt) {
			var props = this.getConcatenatedDisplayProps(this._props),
				mat = props.matrix;
			var tx1 = mat.decompose();
			var sx = tx1.scaleX;
			var sy = tx1.scaleY;
			var dp = window.devicePixelRatio || 1;
			var w = this.nominalBounds.width * sx;
			var h = this.nominalBounds.height * sy;
			mat.tx /= dp;
			mat.ty /= dp;
			mat.a /= (dp * sx);
			mat.b /= (dp * sx);
			mat.c /= (dp * sy);
			mat.d /= (dp * sy);
			this._element.setProperty('transform-origin', this.regX + 'px ' + this.regY + 'px');
			var x = (mat.tx + this.regX * mat.a + this.regY * mat.c - this.regX);
			var y = (mat.ty + this.regX * mat.b + this.regY * mat.d - this.regY);
			var tx = 'matrix(' + mat.a + ',' + mat.b + ',' + mat.c + ',' + mat.d + ',' + x + ',' + y + ')';
			this._element.setProperty('transform', tx);
			this._element.setProperty('width', w);
			this._element.setProperty('height', h);
			this._element.setProperty('line-height', h / this._element._options.rows);
			this._element.update();
		}

	}
	var Super = function() {};
	Super.prototype = ui.BaseDialog.prototype;
	LessonTwoInputContainer_1.prototype = new Super();
	window.ui.LessonTwoInputContainer_1 = LessonTwoInputContainer_1;
})();