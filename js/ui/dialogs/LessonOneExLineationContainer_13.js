(function() {
	window.ui = window.ui || {};

	var LessonOneExLineationContainer_13 = function(name_) {
		ui.BaseDialog.call(this);
		this.name = name_;
		var this_ = this;
		var oneDimensionalSubNum = 3;
		var twoDimensionWords = ["faexcoengz", "saekloeg", "gyaeundei"];
		var BTN_TYPE_JUDMENT = 1;
		var BTN_TYPE_RESET = 2;
		var answerObj = {
			0: ["ae", "oeng"],
			1: ["aek", "oeg"],
			2: ["aeu", "ei"],
		}
		var xx=82;
		var yy=204;
		this.initView = function(){
			if(this_.lessonData){
				this_.commonBarCallback("", this_.lessonData);
			}
			if(popDialogManager){
				popDialogManager.initView();
			}
		}
		var popDialogManager;
		this.resetView = function() {
			if(popDialogManager){
				popDialogManager.resetView();
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
			if(this.name == "uiLessonOneEx_4") {
				oneDimensionalSubNum = 3;
				twoDimensionalSubNum = 0;
				twoDimensionWords = ["faexcoengz", "saekloeg", "gyaeundei"];
				answerObj = {
					0: ["ae", "oeng"],
					1: ["aek", "oeg"],
					2: ["aeu", "ei"],
				}
				initWords();
			} else if(this.name == "uiLessonOneEx_6") {
				oneDimensionalSubNum = 2;
				twoDimensionalSubNum = 0;
				twoDimensionWords = ["faexcoengz", "vagut"];
				answerObj = {
					0: [3],
					1: [1],
				}
				initSlashLine();
				initPop();
			} else if(this.name == "uiLessonOneEx_10") {
				oneDimensionalSubNum = 2;
				twoDimensionalSubNum = 2;
				twoDimensionWordObj = {
					0: ["gwn", "gwnz"],
					1: ["caeu", "cou"],
				}
				answerObj = {
					0: 0,
					1: 0,
				}
				initWordHorizontalLine();
			}else if(this.name == "uiLessonSevenExercise_8") {
				oneDimensionalSubNum = 4;
				twoDimensionalSubNum = 2;
				twoDimensionWordObj = {
					0: ["gae", "gaeq"],
					1: ["gei", "geiz"],
					2: ["dangq", "dang"],
					3: ["dau", "dauq"],
				}
				answerObj = {
					0: 0,
					1: 0,
					2: 1,
					3: 0,
				}
				initWordHorizontalLine();
			}else if(this.name == "uiLessonElevenExercise_4") {
				oneDimensionalSubNum = 6;
				twoDimensionalSubNum = 2;
				twoDimensionWordObj = {
					0: ["da", "dah"],
					1: ["nau", "nauh"],
					2: ["faex", "feix"],
					3: ["rieng", "riengz"],
					4: ["rongx", "rongh"],
					5: ["gamj", "ganj"],
				}
				answerObj = {
					0: 0,
					1: 0,
					2: 1,
					3: 0,	
					4: 0,
					5: 1,
				}
				initWordHorizontalLine();
			} else if(this.name == "uiLessonFiveExercise_4") {
				oneDimensionalSubNum = 4;
				twoDimensionalSubNum = 2;
				twoDimensionWordObj = {
					0: ["daengq", "daeng"],
					1: ["yum","nyum"],
					2: ["nomj", "momj"],
					3: ["nyaek","yaek"],
				}
				answerObj = {
					0: 1,
					1: 0,
					2: 0,
					3: 1,
				}
				initWordHorizontalLine();
			}  else if(this.name == "uiGenjcwzdizGeizSatbyai_7") {
				oneDimensionalSubNum = 4;
				twoDimensionalSubNum = 2;
				twoDimensionWordObj = {
					0: ["haeuj", "haeu"],
					1: ["hap","hab"],
					2: ["dox", "doz"],
					3: ["raemx","laemx"],
				}
				answerObj = {
					0: 1,
					1: 0,
					2: 1,
					3: 1,
				}
				initWordHorizontalLine();
			} else if(this.name == "uiSuenvaTwo_0") {
				oneDimensionalSubNum = 4;
				twoDimensionalSubNum = 2;
				twoDimensionWordObj = {
					0: ["haet", "hat"],
					1: ["lemx","lemz"],
					2: ["youz", "youx"],
					3: ["nyin","nyinh"],
				}
				answerObj = {
					0: 1,
					1: 1,
					2: 0,
					3: 0,
				}
				initWordHorizontalLine();
			} 
			else if(this.name == "uiLessonTwoEx_1") {
				oneDimensionalSubNum = 1;
				twoDimensionalSubNum = 0;
				twoDimensionWords = ["Mwngzyawjdedawzsaekhenjhawjmbawfaex"];
				answerObj = {
					0: ["M", "y", "d", "d", "s", "h", "h", "mb", "f"],
				}
				initWords();
			} else if(this.name == "uiLessonTwoEx_4") {
				oneDimensionalSubNum = 5;
				twoDimensionalSubNum = 0;
				twoDimensionWords = ["riengzhaeux", "feihdauh", "daiq", "hawj", "lajmbwn"];
				answerObj = {
					0: ["z", "x"],
					1: ["h", "h"],
					2: ["q"],
					3: ["j"],
					4: ["j"],
				}
				initWords();
			} else if(this.name == "uiLessonTwoEx_5") {
				oneDimensionalSubNum = 4;
				twoDimensionalSubNum = 0;
				twoDimensionWords = ["liengzsisi", "mbawfaex", "ciengqgo", "lwggyoij"];
				answerObj = {
					0: [5, 7],
					1: [3],
					2: [5],
					3: [2],
				}
				initSlashLine();
				initPop();
			}else if(this.name == "uiLessonSeventeenExercise_4") {
				oneDimensionalSubNum = 2;
				twoDimensionalSubNum = 0;
				twoDimensionWords = ["Dahmingzgyangh", "capmax"];
				answerObj = {
					0: [2,7],
					1: [2],
				}
				initSlashLine();
			}else if(this.name == "uiGenjcwzdizGeizSatbyai_3") {
				oneDimensionalSubNum = 6;
				twoDimensionalSubNum = 0;
				twoDimensionWords = ["siengq", "dat","dauq","dingh","saek","ngoenz"];
				answerObj = {
					0: [0,4],
					1: [0],
					2: [0,2],
					3: [0,3],
					4: [0],
					5: [1,4],
				}
				initSlashLine();
			}else if(this.name == "uiLessonSeventeenExercise_5") {
				oneDimensionalSubNum = 3;
				twoDimensionalSubNum = 0;
				twoDimensionWords = ["baujgimq", "mauhdingj", "ciuhgonq"];
				answerObj = {
					0: [3],
					1: [3],
					2: [3],
				}
				initSlashLine();
			}else if(this.name == "uiLessonSeventeenExercise_6") {
				oneDimensionalSubNum = 2;
				twoDimensionalSubNum = 0;
				twoDimensionWords = ["doenghyiengh", "dijbauj"];
				answerObj = {
					0: [0,4,5,6,10],
					1: [0,1,2,3,5],
				}
				initSlashLine();
			}else if(this.name == "uiLessonSeventeenExercise_7") {
				oneDimensionalSubNum = 2;
				twoDimensionalSubNum = 0;
				twoDimensionWords = ["bouxdaeuz", "loekci"];
				answerObj = {
					0: [0,2,3,4,8],
					1: [0,3,4],
				}
				initSlashLine();
			} else if(this.name == "uiSuenvaOne_1") {     //没有答案//没有答案//没有答案
				oneDimensionalSubNum = 4;
				twoDimensionalSubNum = 0;
				twoDimensionWords = ["hoengz", "ngux", "gyoengqvunz", "yaekseiz"];
				answerObj = {
						0:[0,4],
						1:[1,2],
						2:[6],
						3:[3],
				}
				initSlashLine();
			}else if(this.name == "uiLessonFiveExercise_1") {
				oneDimensionalSubNum = 1;
				twoDimensionalSubNum = 0;
				twoDimensionWords = ["DoeklaengCanghLiengznyinhcaendoegbonjsawbingfapneixcaenbaenzbouxcienghginhdahraix"];
				answerObj = {
					0: ["oek", "aeng", "ang", "ieng", "in", "aen", "oeg", "on", "aw", "ing", "ap", "ei", "aen", "aen", "ou", "ieng", "in","a","ai"],
				}
				initWords();
			}
			if(this.view.lessonName){
				this.view.x = 82; 
				this.view.y = 140;
			}else{
				this.view.x = xx;
				this.view.y = yy;
			}

		}
		function initPop(){
			var popDialog;
			if(this_.view.pop){
				popDialog = this_.view.pop;
				popDialog.visible = false;
				popDialogManager = new ui.LessonOneDrawWordContainer_3(this_.name + "_pop");
				popDialogManager.init(this_.view.pop);
				popDialogManager.initView();
				var btnOpenPop = this_.view.btnOpenPop;
				btnOpenPop.mouseChildren = false;
				btnOpenPop.cursor = "pointer";
				btnOpenPop.addEventListener("click", function(e){
					popDialog.visible = true;
				});
				popDialog.btnClose.mouseChildren = false;
				popDialog.btnClose.cursor = "pointer";
				popDialog.btnClose.addEventListener("click", function(e){
					popDialog.visible = false;
				});
				popDialog.addEventListener("click", function(e){
					e.stopPropagation();
				});
			}
		}

		function initSlashLine() {
			resetSlashLine(true);
			this_.view.btnJudgment.cursor = "pointer";
			this_.view.btnJudgment.mouseChildren = false;
			this_.view.btnJudgment.on("click", clickBtnJudgmentSlashLineRightWrong, null, false, null, false);
			this_.view.btnJudgment.on("pressup", function(e) {
				this_.view.btnJudgment.scaleX = this_.view.btnJudgment.scaleY = 1;
			}, null, false, null, false);
			this_.view.btnJudgment.on("mousedown", function(e) {
				this_.view.btnJudgment.scaleX = this_.view.btnJudgment.scaleY = 1.5;
			}, null, false, null, false);
			this_.view.btnReset.cursor = "pointer";
			this_.view.btnReset.mouseChildren = false;
			this_.view.btnReset.on("click", clickBtnResetSlashLine, null, false, null, false);
			this_.view.btnReset.on("pressup", function(e) {
				this_.view.btnReset.scaleX = this_.view.btnReset.scaleY = 1;
			}, null, false, null, false);
			this_.view.btnReset.on("mousedown", function(e) {
				this_.view.btnReset.scaleX = this_.view.btnReset.scaleY = 1.5;
			}, null, false, null, false);
		}

		function clickSlashLine(e) {
			var slashLine_ = e.currentTarget;
			slashLine_.isSelected = !slashLine_.isSelected;
			if(slashLine_.isSelected) {
				slashLine_.line.visible = true;
			} else {
				slashLine_.line.visible = false;
			}
			slashLine_.red.visible = false;
			slashLine_.green.visible = false;
		}

		function clickBtnJudgmentSlashLineRightWrong(e) {
			var twoDimensionalLen = 0;
			var words;
			var slashLine;
			var btnRightWrong;
			var rightNum = 0;
			var str = "";
			for(var i = 0; i < oneDimensionalSubNum; i++) {
				btnRightWrong = this_.view["btnRightWrong_" + i];
				btnRightWrong.visible = true;
				words = twoDimensionWords[i].split("");
				twoDimensionalLen = words.length;
				str = "";
				for(var j = 0; j < twoDimensionalLen; j++) {
					slashLine = this_.view["slashLine_" + i + "_" + j];
					if(slashLine) {
						if(slashLine.isSelected) {
							if(str.length > 0) {
								str += "," + slashLine.twoDimensionalIndex;
							} else {
								str += slashLine.twoDimensionalIndex;
							}
							if(answerObj[i].indexOf(slashLine.twoDimensionalIndex) != -1) {
								slashLine.green.visible = true;
							} else {
								slashLine.red.visible = true;
							}
						} else {}
					}
				}
				if(str === answerObj[i].toString()) {
					btnRightWrong.gotoAndStop(0);
					rightNum++;
				} else {
					btnRightWrong.gotoAndStop(1);
				}
			}
			if(rightNum >= oneDimensionalSubNum){
				createjs.Sound.play(window.ANSWER_RIGHT_Id);
			}else{
				createjs.Sound.play(window.ANSWER_WRONG_Id);
			}
		}

		function clickBtnResetSlashLine(e) {
			resetSlashLine(false);
		}

		function resetSlashLine(isAddEvent) {
			var twoDimensionalLen = 0;
			var words;
			var slashLine;
			var btnRightWrong;
			for(var i = 0; i < oneDimensionalSubNum; i++) {
				btnRightWrong = this_.view["btnRightWrong_" + i];
				btnRightWrong.visible = false;
				words = twoDimensionWords[i].split("");
				twoDimensionalLen = words.length;
				for(var j = 0; j < twoDimensionalLen; j++) {
					slashLine = this_.view["slashLine_" + i + "_" + j];
					if(slashLine) {
						slashLine.twoDimensionalIndex = j;
						slashLine.isSelected = false;
						slashLine.line.visible = false;
						slashLine.red.visible = false;
						slashLine.green.visible = false;
						if(isAddEvent) {
							slashLine.cursor = "pointer";
							slashLine.on("click", clickSlashLine, null, false, null, false);
						}
					}
				}
			}
		}

		function initWordHorizontalLine() {
			var wordHorizontalLine;
			var btnRightWrong;
//			var fonts = this_.view["wordHorizontalLine_0_1"].txt.font.split("px ");
			for(var i = 0; i < oneDimensionalSubNum; i++) {
				btnRightWrong = this_.view["btnRightWrong_" + i];
				btnRightWrong.visible = false;
				for(var j = 0; j < twoDimensionalSubNum; j++) {
					wordHorizontalLine = this_.view["wordHorizontalLine_" + i + "_" + j];
					wordHorizontalLine.cursor = "pointer";
					wordHorizontalLine.mouseChildren = false;
					wordHorizontalLine.oneDimensionalIndex = i;
					wordHorizontalLine.twoDimensionalIndex = j;
//					wordHorizontalLine.txt.visible=false;
//					wordHorizontalLine.txt.text = twoDimensionWordObj[i][j];
//					if(window.isAndroid) {
//						wordHorizontalLine.txt.font = fonts[0] - window.androidOffsetFontSize*2 + "px " + fonts[1];
//						wordHorizontalLine.line.y+=6;
//					}
					wordHorizontalLine.line.visible = false;
					wordHorizontalLine.addEventListener("click", clickWordHorizontalLine, false);
				}
			}
			initBtnJudgmentAndReset(this_.view["btnJudgment"], BTN_TYPE_JUDMENT);
			initBtnJudgmentAndReset(this_.view["btnReset"], BTN_TYPE_RESET);
		}
		function initBtnJudgmentAndReset(btn_, key_){
			if(!btn_){
				return;
			}
			btn_.mouseChildren = false;
			btn_.cursor = "pointer";
			btn_.key = key_;
			btn_.addEventListener("click", onClickHorizontalLine, false);
			btn_.addEventListener("pressup", onPressUp, false);
			btn_.addEventListener("mousedown", onMouseDown, false);
			function onPressUp(e){
				var btn = e.target;
				btn.scaleX = btn.scaleY = 1;
			}
			function onMouseDown(e){
				var btn = e.target;
				btn.scaleX = btn.scaleY = 1.5;
			}
		}

		function onClickHorizontalLine(e){
			var btn = e.target;
			var btnRightWrong;
			var scoreTotal = 0;
			if(btn.key == BTN_TYPE_JUDMENT){
				var wordHorizontalLine;
				for(var i = 0; i < oneDimensionalSubNum; i++) {
					btnRightWrong = this_.view["btnRightWrong_" + i];
					btnRightWrong.visible = true;
					for(var j = 0; j < twoDimensionalSubNum; j++) {
						wordHorizontalLine = this_.view["wordHorizontalLine_" + i + "_" + j];
						if(wordHorizontalLine.isClick){
							if(j == answerObj[i]) {
								btnRightWrong.gotoAndStop(0);
								scoreTotal++;
							} else {
								btnRightWrong.gotoAndStop(1);
							}
							break;
						}else{
							btnRightWrong.gotoAndStop(1);
						}
					}
				}
				if(scoreTotal >= oneDimensionalSubNum){
					createjs.Sound.play(window.ANSWER_RIGHT_Id);
				}else{
					createjs.Sound.play(window.ANSWER_WRONG_Id);
				}
			}else if(btn.key == BTN_TYPE_RESET){
				for(var i = 0; i < oneDimensionalSubNum; i++) {
					resetWordHorizontalLine(i);
				}
			}
		}
		function clickWordHorizontalLine(e) {
			var wordHorizontalLine_ = e.target;
			var i_ = wordHorizontalLine_.oneDimensionalIndex;
			var btnRightWrong_ = this_.view["btnRightWrong_" + i_];
			resetWordHorizontalLine(i_);
			wordHorizontalLine_.line.visible = true;
			wordHorizontalLine_.isClick = true;
		}

		function resetWordHorizontalLine(oneDimensional) {
			var i = oneDimensional;
			var btnRightWrong = this_.view["btnRightWrong_" + i];
			btnRightWrong.visible = false;
			var wordHorizontalLine;
			for(var j = 0; j < twoDimensionalSubNum; j++) {
				wordHorizontalLine = this_.view["wordHorizontalLine_" + i + "_" + j];
				wordHorizontalLine.line.visible = false;
				wordHorizontalLine.isClick = false;
			}
		}

		function initWords() {
			var twoDimensionalLen = 0;
			var words;
			var alphabetItem;
			var fonts = this_.view["alph_0_0"].txt.font.split("px ");
			var btnRightWrong;
			for(var i = 0; i < oneDimensionalSubNum; i++) {
				btnRightWrong = this_.view["btnRightWrong_" + i];
				btnRightWrong.visible = false;
				words = twoDimensionWords[i].split("");
				twoDimensionalLen = words.length;
				for(var j = 0; j < twoDimensionalLen; j++) {
					alphabetItem = this_.view["alph_" + i + "_" + j];
					if(window.isAndroid){
						alphabetItem.line.y +=15;
					}
					alphabetItem.cursor = "pointer";
					alphabetItem.txt.text = words[j];
					if(window.isAndroid) {
						alphabetItem.txt.font = fonts[0] - window.androidOffsetFontSize + "px " + fonts[1];
					}
					alphabetItem.red.visible = false;
					alphabetItem.green.visible = false;
					alphabetItem.line.visible = false;
					alphabetItem.isSelected = false;
					alphabetItem.on("click", clickAlphabetItem, null, false, null, false);
				}
			}
			this_.view.btnJudgment.cursor = "pointer";
			this_.view.btnJudgment.on("click", clickBtnJudgmentRightWrong, null, false, null, false);
			this_.view.btnJudgment.on("pressup", function(e) {
				this_.view.btnJudgment.scaleX = this_.view.btnJudgment.scaleY = 1;
			}, null, false, null, false);
			this_.view.btnJudgment.on("mousedown", function(e) {
				this_.view.btnJudgment.scaleX = this_.view.btnJudgment.scaleY = 1.5;
			}, null, false, null, false);
			this_.view.btnReset.cursor = "pointer";
			this_.view.btnReset.on("click", clickBtnResetWords);
			this_.view.btnReset.on("pressup", function(e) {
				this_.view.btnReset.scaleX = this_.view.btnReset.scaleY = 1;
			}, null, false, null, false);
			this_.view.btnReset.on("mousedown", function(e) {
				this_.view.btnReset.scaleX = this_.view.btnReset.scaleY = 1.5;
			}, null, false, null, false);
		}

		function clickAlphabetItem(e) {
			var alphabetItem_ = e.currentTarget;
			alphabetItem_.isSelected = !alphabetItem_.isSelected;
			if(alphabetItem_.isSelected) {
				alphabetItem_.line.visible = true;
			} else {
				alphabetItem_.line.visible = false;
			}
			alphabetItem_.red.visible = false;
			alphabetItem_.green.visible = false;
		}

		function clickBtnJudgmentRightWrong(e) {
			var twoDimensionalLen = 0;
			var words;
			var alphabetItem;
			var str = "",
				tempStr = "";
			var clickWords = [];
			var i = 0;
			for(i = 0; i < oneDimensionalSubNum; i++) {
				words = twoDimensionWords[i].split("");
				twoDimensionalLen = words.length;
				str = "";
				tempStr = "";
				var clickAlphabetItems = [];
				for(var j = 0; j < twoDimensionalLen; j++) {
					alphabetItem = this_.view["alph_" + i + "_" + j];
					if(alphabetItem.isSelected) {
						clickAlphabetItems.push(alphabetItem);
						str += alphabetItem.txt.text;
						tempStr += alphabetItem.txt.text;
						if(j == twoDimensionalLen - 1) {
							if(tempStr.length > 0) {
								if(answerObj[i].indexOf(tempStr) != -1) {
									changeBGColor(true, clickAlphabetItems);
								} else {
									changeBGColor(false, clickAlphabetItems);
								}
								tempStr = "";
								clickAlphabetItems = [];
							}
						}
					} else {
						if(tempStr.length > 0) {
							if(answerObj[i].indexOf(tempStr) != -1) {
								changeBGColor(true, clickAlphabetItems);
							} else {
								changeBGColor(false, clickAlphabetItems);
							}
							tempStr = "";
							clickAlphabetItems = [];
						}
					}
				}
				clickWords.push(str);
			}
		
			var btnRightWrong;
			var arr;
			var rightNum = 0;
			for(i = 0; i < oneDimensionalSubNum; i++) {
				btnRightWrong = this_.view["btnRightWrong_" + i];
				btnRightWrong.visible = true;
				if(clickWords[i] == answerObj[i].toString().replace(/[","]/g, '')) {
					btnRightWrong.gotoAndStop(0);
					rightNum++;
				} else {
					btnRightWrong.gotoAndStop(1);
				}
			}
			if(rightNum >= oneDimensionalSubNum){
				createjs.Sound.play(window.ANSWER_RIGHT_Id);
			}else{
				createjs.Sound.play(window.ANSWER_WRONG_Id);
			}
		}

		function changeBGColor(isRight, clickAlphabetItems) {
			var item;
			for(var m = 0, len = clickAlphabetItems.length; m < len; m++) {
				item = clickAlphabetItems[m];
//				item.line.visible = true;
				if(isRight) {
					item.green.visible = true;
					item.red.visible = false;
				} else {
					item.red.visible = true;
					item.green.visible = false;
				}
			}
		}

		function clickBtnResetWords(e) {
			var twoDimensionalLen = 0;
			var words;
			var alphabetItem;
			var btnRightWrong;
			for(var i = 0; i < oneDimensionalSubNum; i++) {
				btnRightWrong = this_.view["btnRightWrong_" + i];
				btnRightWrong.visible = false;
				words = twoDimensionWords[i].split("");
				twoDimensionalLen = words.length;
				for(var j = 0; j < twoDimensionalLen; j++) {
					alphabetItem = this_.view["alph_" + i + "_" + j];
					alphabetItem.txt.text = words[j];
					alphabetItem.red.visible = false;
					alphabetItem.green.visible = false;
					alphabetItem.line.visible = false;
					alphabetItem.isSelected = false;
				}
			}
		}
	}
	var Super = function() {};
	Super.prototype = ui.BaseDialog.prototype;
	LessonOneExLineationContainer_13.prototype = new Super();
	window.ui.LessonOneExLineationContainer_13 = LessonOneExLineationContainer_13;
})();
