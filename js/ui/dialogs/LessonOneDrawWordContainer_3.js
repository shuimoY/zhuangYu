(function() {
	window.ui = window.ui || {};

	var LessonOneDrawWordContainer_3 = function(name_) {
		ui.BaseDialog.call(this);
		this.name = name_;
		var this_ = this;
		var xx = 82;
		var yy = 204;
		var wordNum = 3;
		var words = ["gohaeux", "vagut", "faexcoengz"];

		var drawingCanvas;
		var oldPt;
		var oldMidPt;
		var color = "#F95900";
		var stroke = 10;

		var isPlayCartoon = false;
		var playCartoonTime = 0;
		var playCartoonIndex = 0;
		var letterLength = 0;
		var drawCartoonCon;
		var clickTxtKey = -1;
		var limitRight = 1468;
		var limitBottom = 337;
		this.initView = function(parent_) {
			if(this_.lessonData) {
				this_.commonBarCallback("", this_.lessonData);
			}
			setTimeout(function() {
				this_.view["btnWriteWord_0"].dispatchEvent("click");
			}, 50);
			createjs.Ticker.addEventListener("tick", playCartoon);
		}
		this.resetView = function() {
			resetBtnAndCartoon();
			createjs.Ticker.removeEventListener("tick", playCartoon);
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
			if(chapterLessonIds_) {
				if(chapterLessonIds_[0] > 0) {
					lessonData = this.getDataById(chapterLessonIds_[0], chapterLessonIds_[1]);
				} else {
					lessonData = this.getDataById(chapterLessonIds_[0]);
				}
				this_.lessonData = lessonData;
				this_.commonBarCallback("", lessonData);
			}
			drawingCanvas = new createjs.Shape();
			drawingCanvas.x = 190;
			drawingCanvas.y = 418;
			if(this.name == "uiLessonOne_4") {
				words = ["gohaeux", "vagut", "faexcoengz"];
				wordNum = 3;
			} else if(this.name == "uiLessonEight_8") {
				words = ["dwgrengz", "angqvauvau", "naekgywg"];
				wordNum = 3;
			} else if(this.name == "uiLessonFourteen_8") {
				words = ["hab'eiq", "gvigawj", "hozgaek"];
				wordNum = 3;
			} else if(this.name == "uiLessonFourteen_9") {
				words = ["saedceij", "gwndaenj"];
				wordNum = 2;
			} else if(this.name == "uiLessonEight_9") {
				words = ["haenqrengz", "yietnaiq"];
				wordNum = 2;
			} else if(this.name == "uiLessonOne_5") {
				words = ["gwnzbiengz", "seizcou"];
				wordNum = 2;
			} else if(this.name == 'uiLessonSeven_8') {
				words = ["gaeqlwg", "soemsutsut", "dendwngh"];
				wordNum = 3;
			} else if(this.name == 'uiLessonSeven_9') {
				words = ["denyingj", "doenghyiengh"];
				wordNum = 2;
			} else if(this.name == "uiLessonSevenExercise_4") {
				words = ["byukgyaeq", "goemq", "bomz"];
				wordNum = 3;
			} else if(this.name == "uiLessonSixteen_6") {
				words = ["hawriengx", "hwnzngoenz", "seiqhenz"];
				wordNum = 3;
			} else if(this.name == "uiLessonSixteenExercise_2") {
				words = ["cwxcaih ", "doekgumh ", "u reamx"];
				wordNum = 3;
			} else if(this.name == "uiLessonEighteen_4") {
				words = ["simsoh", "ninzndaek", "aek dot"];
				wordNum = 3;
			} else if(this.name == "uiLessonEighteenExercise_4") {
				words = ["simsoh", "gvenq", "cimz"];
				wordNum = 3;
			} else if(this.name == "uiLessonEighteenExercise_5") {
				words = ["ninznaek", "aek dot"];
				wordNum = 2;
			} else if(this.name == "uiLessonEighteen_5") {
				words = ["rox leix", "sim ndei"];
				wordNum = 2;
			} else if(this.name == "uiLessonSeventeen_8") {
				words = ["byaraiz", "dozveh", "capmax"];
				wordNum = 3;
			} else if(this.name == "uiLessonSeventeenExercise_2") {
				words = ["siengq", "vunz", "ngeng"];
				wordNum = 3;
			} else if(this.name == "uiLessonSeventeenExercise_3") {
				words = ["ndang", "riuzmingz"];
				wordNum = 2;
			} else if(this.name == "uiLessonSeventeen_9") {
				words = ["dijbauj", "bangxdat"];
				wordNum = 2;
			} else if(this.name == "uiLessonSixteenExercise_3") {
				words = ["henzre"];
				wordNum = 1;
			} else if(this.name == "uiLessonSixteen_7") {
				words = ["bienqvaq", "cungqcax"];
				wordNum = 2;
			} else if(this.name == "uiLessonSevenExercise_5") {
				words = ["ranzndeu"];
				wordNum = 1;
			} else if(this.name == "uiLessonThirteen_7") {
				words = ["daejnga'nga", "catsaij", "duzroeg"];
				wordNum = 3;
			} else if(this.name == "uiLessonFifteen_8") {
				words = ["hai va", "laj doem", "gyaeq bya"];
				wordNum = 3;
				drawingCanvas.x = 140;
			} else if(this.name == "uiLessonFifteen_9") {
				words = ["rieng", "doenghgo"];
				wordNum = 2;
				drawingCanvas.x = 140;
			} else if(this.name == "uiLessonFifteenExercise_2") {
				words = ["roengz", "onj", "daimaez"];
				wordNum = 3;
				drawingCanvas.x = 140;
			} else if(this.name == "uiLessonFifteenExercise_3") {
				words = ["dawz"];
				wordNum = 1;
				drawingCanvas.x = 140;
			} else if(this.name == "uiLessonThirteenExercise_3") {
				words = ["ap", "oeg", "oek"];
				wordNum = 3;
			} else if(this.name == "uiLessonThirteenExercise_4") {
				words = ["aek", "et", "aet"];
				wordNum = 3;
			} else if(this.name == "uiLessonThirteenExercise_5") {
				words = ["ik"];
				wordNum = 1;
			} else if(this.name == "uiLessonThirteen_8") {
				words = ["gvaqbae", "duzbya"];
				wordNum = 2;
			} else if(this.name == "uiLessonOneEx_9") {
				words = ["riengzhaeux", "fwn’iq", "gwnzbbinengz"];
				wordNum = 3;
			} else if(this.name == "uiLessonSix_6") {
				words = ["buet", "daenj", "soengq"];
				wordNum = 3;
			} else if(this.name == "uiLessonSix_7") {
				words = ["baenz", "gvaq", "nyienh"];
				wordNum = 3;
			} else if(this.name == "uiLessonTwelveExercise_2") {
				words = ["wed", "aek", "it"];
				wordNum = 3;
			} else if(this.name == "uiLessonTwelveExercise_3") {
				words = ["at", "aem", "oeng"];
				wordNum = 3;
			} else if(this.name == "uiLessonTwelveExercise_4") {
				words = ["wn"];
				wordNum = 1;
			} else if(this.name == "uiLessonSixExercise_2") {
				words = ["aek", "wg", "oek"];
				wordNum = 3;
			} else if(this.name == "uiLessonSixExercise_3") {
				words = ["ag", "aet", "uet"];
				wordNum = 3;
			} else if(this.name == "uiLessonSixExercise_5") {
				words = ["gwn", "gyaez", "cungj"];
				wordNum = 3;
			} else if(this.name == "uiLessonSixExercise_6") {
				words = ["laux", "gvaq", "nyienh"];
				wordNum = 3;
			} else if(this.name == "uiLessonOneEx_2") {
				words = ["seizocou", "laeglemx", "vagut"];
				wordNum = 3;
			} else if(this.name == "uiLessonEleven_9") {
				words = ["nauhhuhu", "luenhlablab", "doenghbaez"];
				wordNum = 3;
			} else if(this.name == "uiLessonEleven_10") {
				words = ["seizneix", "gyoengqde"];
				wordNum = 2;
			} else if(this.name == "uiLessonOneEx_3") {
				words = ["gwnzbiengz"];
				wordNum = 1;
			} else if(this.name == "uiLessonTwelve_4") {
				words = ["saek", "naemq", "dak"];
				wordNum = 3;
			} else if(this.name == "uiLessonTwelve_5") {
				words = ["doek", "cingx"];
				wordNum = 2;
			} else if(this.name == "uiLessonTwo_6") {
				words = ["vaiqvued", "yaekseiz", "hoengzhoengz" + " " + "heuheu"];
				wordNum = 3;
				drawingCanvas.x = 80;
				drawingCanvas.y = 470;
				limitRight = 1600;
				limitBottom = 254;
			} else if(this.name == "uiLessonTwo_7") {
				words = ["henjgim", "doenghnaz"];
				wordNum = 2;
				drawingCanvas.x = 80;
				drawingCanvas.y = 440;
				limitRight = 1600;
				limitBottom = 340;
			} else if(this.name == "uiLessonThree_5") {
				words = ["ndwencaet", "ndwenbet", "maeuqmaeuq"];
				wordNum = 3;
			} else if(this.name == "uiLessonThree_6") {
				words = ["vamauxdan", "bouxlawz"];
				wordNum = 2;
			} else if(this.name == "uiLessonTwoEx_3") {
				words = ["yaekseiz", "haeujsim", "hoengzhoengz heuheu"];
				wordNum = 3;
				limitRight = 1600;
				limitBottom = 254;
				drawingCanvas.x = 80;
				drawingCanvas.y = 470;
			} else if(this.name == "uiLessonThreeExercise_5") {
				words = ["wen", "wn", "ung"];
				wordNum = 3;
				drawingCanvas.x = 145;
			} else if(this.name == "uiLessonThreeExercise_6") {
				words = ["ueng", "aeu", "ou"];
				wordNum = 3;
				drawingCanvas.x = 145;
			} else if(this.name == "uiLessonElevenExercise_2") {
				words = ["doenghbaez", "gomiuz", "lwgsau"];
				wordNum = 3;
			} else if(this.name == "uiLessonElevenExercise_3") {
				words = ["gyoengqvunz"];
				wordNum = 1;
			} else if(this.name == "uiLessonThreeExercise_7") {
				words = ["ae", "ei"];
				wordNum = 2;
				drawingCanvas.x = 145;
			} else if(this.name == "uiSuenvaOne_2") {
				words = ["riengzhaeux", "fwn'iq", "gwnzbiengz"];
				wordNum = 3;
			} else if(this.name == "uiSuenvaOne_3") {
				words = ["fungsou", "lwgnyez"];
				wordNum = 2;
			} else if(this.name == "uiLessonFour_6") {
				words = ["lwgnyez", "bouxdog", "hwngqfwngfwng"];
				wordNum = 3;
				drawingCanvas.x = 100;
				limitRight = 1689;
				limitBottom = 337;
			} else if(this.name == "uiLessonFour_7") {
				words = ["nitsausau", "vunzlai"];
				wordNum = 2;
				limitRight = 1468;
				limitBottom = 337;
			} else if(this.name == "uiLessonFourEx_2") {
				words = ["gvaqseiq", "hauqswnh", "mbinj"];
				wordNum = 3;
				limitRight = 1468;
				limitBottom = 337;
			} else if(this.name == "uiLessonFourEx_3") {
				words = ["swiz", "nyungz", "swhgeij"];
				wordNum = 3;
				limitRight = 1468;
				limitBottom = 337;
			} else if(this.name == "uiLessonFourEx_4") {
				words = ["doenghbaez", "hwngfwngfwng"];
				wordNum = 2;
				drawingCanvas.x = 60;
				limitRight = 1630;
				limitBottom = 337;
			} else if(this.name == "uiLessonFive_8") {
				words = ["youzlangh", "ngaekgyaeuj", "hoznyaek"];
				wordNum = 3;
				limitRight = 1468;
				limitBottom = 337;
			} else if(this.name == "uiLessonFive_9") {
				words = ["mboujliuh", "goenglaux"];
				wordNum = 2;
				limitRight = 1468;
				limitBottom = 337;
			} else if(this.name == "uiLessonNine_6") {
				words = ["baengh", "hangz", "mae"];
				wordNum = 3;
				limitRight = 1468;
				limitBottom = 337;
			} else if(this.name == "uiLessonNine_7") {
				words = ["lau", "mak"];
				wordNum = 2;
				limitRight = 1468;
				limitBottom = 337;
			} else if(this.name == "uiLessonNineExercise_2") {
				words = ["ak", "it", "ieg"];
				wordNum = 3;
				limitRight = 1468;
				limitBottom = 337;
			} else if(this.name == "uiLessonNineExercise_3") {
				words = ["ag", "ang", "aeng"];
				wordNum = 3;
				limitRight = 1468;
				limitBottom = 337;
			} else if(this.name == "uiLessonNineExercise_4") {
				words = ["aen", "eu"];
				wordNum = 2;
				limitRight = 1468;
				limitBottom = 337;
			} else if(this.name == "uiLessonTen_7") {
				words = ["doxdax", "bonjseah", "baihlaeng"];
				wordNum = 3;
				limitRight = 1468;
				limitBottom = 337;
			} else if(this.name == "uiLessonTen_8") {
				words = ["geizheih", "okdaeuj"];
				wordNum = 2;
				limitRight = 1468;
				limitBottom = 337;
			} else if(this.name == "uiLessonOneEx_6_pop") {
				words = ["faexcoengz", "vagut"];
				wordNum = 2;
				limitRight = 1468;
				limitBottom = 337;
				drawingCanvas.x -= 10;
				drawingCanvas.y -= 10;
			} else if(this.name == "uiLessonTwoEx_5_pop") {
				words = ["liengzsisi", "mbawfaex", "ciengqgo", "lwggyoij"];
				wordNum = 4;
				limitRight = 1468;
				limitBottom = 337;
				drawingCanvas.x -= 10;
				drawingCanvas.y -= 10;
			}
			if(this.view.lessonName) {
				this.view.x = 82;
				this.view.y = 140;
			} else if(this.name == "uiLessonOneEx_6_pop" || this.name == "uiLessonTwoEx_5_pop") {

			} else {
				this.view.x = xx;
				this.view.y = yy;
			}
			var shape = new createjs.Shape();
			shape.graphics.beginFill("#fff");
			shape.graphics.drawRect(0, 0, limitRight, limitBottom);
			shape.x = drawingCanvas.x;
			shape.y = drawingCanvas.y;
			shape.alpha = 0.01;
			this_.view.addChild(shape);
//			drawingCanvas.width = limitRight;
//			drawingCanvas.height = limitBottom;
//			drawingCanvas.graphics.beginFill("#FFf");
//			drawingCanvas.graphics.drawRect(0, 0, limitRight, limitBottom);
//			this.view.addChild(drawingCanvas);
			if(chapterLessonIds_) {
				if(chapterLessonIds_[0] > 0) {
					lessonData = this.getDataById(chapterLessonIds_[0], chapterLessonIds_[1]);
				} else {
					lessonData = this.getDataById(chapterLessonIds_[0]);
				}
				if(commonBarCallback_) {
					commonBarCallback_("", lessonData);
				}
			}

			var btnPlay = this_.view.btnPlay;
			btnPlay.cursor = "pointer";
			btnPlay.mouseChildren = false;
			btnPlay.on("click", clickBtnPlay, null, false, null, false);
			var btnWrite = this_.view.btnWrite;
			btnWrite.cursor = "pointer";
			btnWrite.mouseChildren = false;
			btnWrite.on("click", clickBtnWrite, null, false, null, false);
			var btnSave;
			if(this_.view.btnSave) {
				btnSave = this_.view.btnSave;
				btnSave.cursor = "pointer";
				btnSave.mouseChildren = false;
				btnSave.on("click", clickBtnSave, null, false, null, false);
			}
			var btnDelete = this_.view.btnDelete;
			btnDelete.cursor = "pointer";
			btnDelete.mouseChildren = false;
			btnDelete.on("click", clickBtnDelete, null, false, null, false);
			var btnWriteWord;
			var drawCartoonCon;
			//			var fonts = this_.view["btnWriteWord_0"].txt.font.split("px ");
			for(var i = 0; i < wordNum; i++) {
				btnWriteWord = this_.view["btnWriteWord_" + i];
				btnWriteWord.key = i;
				//				btnWriteWord.txt.text = words[i];
				//				btnWriteWord.txt.textBaseline  = "top";
				//				if(window.isAndroid) {
				//					btnWriteWord.txt.font = fonts[0] - window.androidOffsetFontSize + "px " + fonts[1];
				//				}
				btnWriteWord.on("click", clickBtnWriteWord, null, false, null, false);
				btnWriteWord.mouseChildren = false;

				drawCartoonCon = this_.view["drawCartoonCon_" + i];
				drawCartoonCon.key = i;
				drawCartoonCon.cartoonTxt = words[i];
			}
			//			resetBtnAndCartoon();
			resetDrawCartoonCon();
		}

		function clickBtnDelete(e) {
			if(!drawingCanvas.parent) {
				return;
			}
			var btn = e.currentTarget;
			drawingCanvas.graphics.clear();
		}

		function clickBtnWriteWord(e) {
			resetBtnAndCartoon();
			var target = e.currentTarget;
			clickTxtKey = target.key;
			drawCartoonCon = this_.view["drawCartoonCon_" + clickTxtKey];
			drawCartoonCon.visible = true;
			this_.view.btnWrite.isClick = true;
			this_.view.btnWrite.gotoAndStop(1);
			beginDrawWord(this_.view.btnWrite);
		}

		function playCartoon(e) {
			//			console.log("xxx");
			if(isPlayCartoon) {
				//				console.log(this_.name);
				if(playCartoonTime == 0) {
					drawCartoonCon["cartoon_" + playCartoonIndex].gotoAndPlay("start");
				}
				playCartoonTime++;
				if(playCartoonTime == 40) {
					playCartoonTime = 0;
					playCartoonIndex++;
					if(playCartoonIndex == letterLength) {
						isPlayCartoon = false;
					}
				}
			}
		}

		function clickBtnSave(e) {
			if(clickTxtKey < 0 || clickTxtKey >= wordNum || !drawingCanvas.parent) {
				return;
			}
			//  		resetBtnAndCartoon();
			//(x,y,width,height)187 418 1467 337 

			var cloneWriteCanvas = drawingCanvas.clone(true);
			var rect = drawingCanvas.getBounds();
			cloneWriteCanvas.cache(0, 0, limitRight, limitBottom, 1, {
				useGL: "stage"
			});
			var btnSaveWord = this_.view["btnSaveWord_" + clickTxtKey]; //btnSaveWord width 375 height66
			var rect = btnSaveWord.getBounds();
			cloneWriteCanvas.scaleX = rect.width * btnSaveWord.scaleX / limitRight;
			cloneWriteCanvas.scaleY = rect.height * btnSaveWord.scaleY / limitBottom;
			cloneWriteCanvas.x = btnSaveWord.x - rect.width * btnSaveWord.scaleX / 2;
			cloneWriteCanvas.y = btnSaveWord.y - rect.height * btnSaveWord.scaleY / 2;
			if(btnSaveWord.cloneWriteCanvas && btnSaveWord.cloneWriteCanvas.parent) {
				this_.view.removeChild(btnSaveWord.cloneWriteCanvas);
			}
			this_.view.addChild(cloneWriteCanvas);
			btnSaveWord.cloneWriteCanvas = cloneWriteCanvas;
		}

		function resetDrawCartoonCon() {
			var drawCartoonCon;
			for(var i = 0; i < wordNum; i++) {
				drawCartoonCon = this_.view["drawCartoonCon_" + i];
				drawCartoonCon.visible = false;
				drawCartoonCon.cartoonTxt = drawCartoonCon.cartoonTxt.replace(/[" "]/g, '');
				for(var j = 0, len = drawCartoonCon.cartoonTxt.length; j < len; j++) {
					if(drawCartoonCon["cartoon_" + j]) {
						drawCartoonCon["cartoon_" + j].gotoAndStop("start");
					}
				}
			}
		}

		function clickBtnPlay(e) {
			if(clickTxtKey < 0 || clickTxtKey >= wordNum) {
				return;
			}
			resetBtnAndCartoon();
			var btn = e.currentTarget;
			btn.isClick = !btn.isClick;
			var drawCartoonCon = this_.view["drawCartoonCon_" + clickTxtKey];
			drawCartoonCon.visible = true;
			if(btn.isClick) {
				letterLength = drawCartoonCon.cartoonTxt.length;
				playCartoonIndex = 0;
				isPlayCartoon = true;
				btn.gotoAndStop(1);
			} else {
				isPlayCartoon = false;
				btn.gotoAndStop(0);
			}
		}

		function resetBtnAndCartoon() {
			resetDrawCartoonCon();
			this_.view.removeChild(drawingCanvas);
			this_.view.removeEventListener("mousedown", false);
			this_.view.removeEventListener("pressup", false);
			playCartoonTime = 0;
			playCartoonIndex = 0;
			isPlayCartoon = false;
			this_.view.btnPlay.isClick = false;
			this_.view.btnPlay.gotoAndStop(0);
			this_.view.btnWrite.isClick = false;
			this_.view.btnWrite.gotoAndStop(0);
			this_.view.btnSave.isClick = false;
			this_.view.btnSave.gotoAndStop(0);
		}

		function clickBtnWrite(e) {
			if(clickTxtKey < 0 || clickTxtKey >= wordNum) {
				return;
			}
			resetBtnAndCartoon();
			var btn = e.currentTarget;
			btn.isClick = !btn.isClick;
			if(btn.isClick) {
				btn.gotoAndStop(1);
			} else {
				btn.gotoAndStop(0);
			}
			beginDrawWord(btn);
		}

		function beginDrawWord(btn) {
			var drawCartoonCon = this_.view["drawCartoonCon_" + clickTxtKey];
			drawCartoonCon.visible = true;
			if(btn.isClick) {
				this_.view.addChild(drawingCanvas);
				drawingCanvas.graphics.clear();
				this_.view.addEventListener("mousedown", handleMouseDown, false);
				this_.view.addEventListener("pressup", handleMouseUp, false);
			}
		}

		function handleMouseDown(event) {
//			if(!event.primary) {
//				return;
//			}
			//				oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
			var pt = drawingCanvas.globalToLocal(event.stageX, event.stageY);
			if(pt.x < 0 || pt.x > limitRight || pt.y < 0 || pt.y > limitBottom) {
				return;
			}
			oldPt = drawingCanvas.globalToLocal(event.stageX, event.stageY);
			oldMidPt = oldPt.clone();
			this_.view.addEventListener("pressmove", handleMouseMove, false);
		}

		function handleMouseMove(event) {
			if(!event.primary) {
				return;
			} //(x,y,width,height)187 418 1467 337 
			var pt = drawingCanvas.globalToLocal(event.stageX, event.stageY);
			if(pt.x < 0 || pt.x > limitRight || pt.y < 0 || pt.y > limitBottom) {
				return;
			}
			var midPt = new createjs.Point(oldPt.x + pt.x >> 1, oldPt.y + pt.y >> 1);
			drawingCanvas.graphics.setStrokeStyle(stroke, 'round', 'round').beginStroke(color).moveTo(midPt.x, midPt.y).curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);
			oldPt.x = pt.x;
			oldPt.y = pt.y;
			oldMidPt.x = midPt.x;
			oldMidPt.y = midPt.y;
		}

		function handleMouseUp(event) {
			if(!event.primary) {
				return;
			}
			this_.view.removeEventListener("pressmove", handleMouseMove, false);
		}

	}
	var p = LessonOneDrawWordContainer_3.prototype = new ui.BaseDialog();
	window.ui.LessonOneDrawWordContainer_3 = LessonOneDrawWordContainer_3;
})();