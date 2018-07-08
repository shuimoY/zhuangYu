(function() {
	window.ui = window.ui || {};

	var LessonOneDragExContainer_5 = function(name_) {
		ui.BaseDialog.call(this);
		this.name = name_;
		var this_ = this;
		var xx = 82;
		var yy = 204;
		var frames = [];
		var frameWidth = 710;
		var frameHeight = 105;
		var frameXs = [];
		var frameYs = [];
		var ans = ["lwnh", "naeuz", "saek", "yiengh"];
		var items = [];
		var dragTexts = [];
		var tempNums = [];
		var limitDragNum = 0;
		var dragItem;
		var offetX;
		var offetY;
		var dragType; //1: 自判断  0: 拖拽多个item到一个frame 2: 一个item可以拖拽多次
		var tempText;
		var fonts;
		var maxDrag = 10000;
		var recordPlayManager;
		var popDialogManager;
		this.initView = function() {
			if(this_.lessonData) {
				this_.commonBarCallback("", this_.lessonData);
			}
			if(popDialogManager){
				popDialogManager.initView();
			}
		}
		this.resetView = function(){
			if(recordPlayManager){
				recordPlayManager.releaseSound();
			}
			if(popDialogManager){
				popDialogManager.resetView();
			}
		}
		this.init = function(view_, itemIndex_, chapterLessonIds_, lib_, mainScene_, commonBarCallback_) {
			if(window.isAndroid) {
				tempText = new createjs.Text("", "57px 'Times New Roman'");
			} else {
				tempText = new createjs.Text("", "71px 'Times New Roman'");
			}
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
			this_.view.addChild(tempText);
			tempText.visible = false;
			
			if(this.name == "uiLessonEightExercise_2") {
				dragTexts = ["l", "a", "aem", "n", "q", "x", "aen", "j", "ng", "nd", "au", "z"];
				ans = {
					0: ["l", "n", "ng", "nd"],
					1: ["a", "aem", "aen", "au"],
					2: ["q", "x", "j", "z"]
				};
//				ans = {
//					0: ["ngndnl", "ndngnl", "nndngl", "ndnngl", "nngndl", "ngnndl", "ngndln", "ndngln", "lndngn", "ndlngn", "lngndn", "nglndn", "nndlng", "ndnlng", "lndnng", "ndlnng", "lnndng", "nlndng", "nnglnd", "ngnlnd", "lngnnd", "nglnnd", "lnngnd", "nlngnd"],
//					1: ["aenauaema", "auaenaema", "aemauaena", "auaemaena", "aemaenaua", "aenaemaua", "aenauaaem", "auaenaaem", "aauaenaem", "auaaenaem", "aaenauaem", "aenaauaem", "aemauaaen", "auaemaaen", "aauaemaen", "auaaemaen", "aaemauaen", "aemaauaen", "aemaenaau", "aenaemaau", "aaenaemau", "aenaaemau", "aaemaenau", "aemaaenau"],
//					2: ["jzxq", "zjxq", "xzjq", "zxjq", "xjzq", "jxzq", "jzqx", "zjqx", "qzjx", "zqjx", "qjzx", "jqzx", "xzqj", "zxqj", "qzxj", "zqxj", "qxzj", "xqzj", "xjqz", "jxqz", "qjxz", "jqxz", "qxjz", "xqjz"]
//				};
				limitDragNum = 4;
				dragType = 0;
			}
			
			
			else if(this.name == "uiLessonFourteenExercise_3") {
				dragTexts = ["gv", "g", "d", "g", "d", "aeng", "aw", "i", "wn", "ai","aen","j","j","j"];
				ans=["gvi","gawj","gwn","daengj","daenj","ai"]
				limitDragNum = 3;
				dragType = 2;
			}else if(this.name == "uiLessonOneEx_5") {
				dragTexts = ["l", "n", "s", "y", "wn", "aeu", "ieng", "aek", "h", "z", "h"];
				limitDragNum = 5;
				dragType = 2;
			} else if(this.name == "uiLessonFiveExercise_7") {
				dragTexts = ["daengq", "daeg", "mbwn", "sim", "momj", "nyap"];
				limitDragNum = 3;
				dragType = 2;
			} else if(this.name == "uiLessonOneEx_9") {
				dragTexts = ["go", "va", "saek", "gut", "miz", "haeux", "hau", "naj"];
				limitDragNum = 4;
				dragType = 2;
			}else if(this.name == "uiLessonTenExercise_3") {
				dragTexts = ["d", "ny", "b", "s", "in", "iu", "ae", "on", "q", "h", "j", "h"];
				limitDragNum = 4;
				dragType = 2;
			} else if(this.name == "uiLessonSixExercise_7") {
				dragTexts = ["l", "y", "r", "m", "im", "um", "ing", "aek", "eng", "q", "j", "z", "h"];
				limitDragNum = 3;
				dragType = 2;
			}else if(this.name == "uiLessonEighteenExercise_6") {
				dragTexts = ["r", "l", "c", "gv", "en", "ei", "ae", "im", "x", "h", "q", "z"];
				limitDragNum = maxDrag;
				dragType = 2;
			}else if(this.name == "uiSuenvaSix_2") {
				dragTexts = ["g", "by", "ngv", "ny", "my", "mb", "b", "aek", "uk", "an", "i", "ai","ae","o","z","j","x","q","h"];
				limitDragNum = 3;
				dragType = 2;
			}else if(this.name == "uiGenjcwzdizGeizSatbyai_2") {
				dragTexts = ["b", "y", "s", "nd", "y", "g", "d", "s", "ou", "aeng", "im", "ei","ou","aen","oeg","aw","z","x","q","j"];
				limitDragNum = 3;
				dragType = 2;
			} else if(this.name == "uiSuenvaFour_0") {
				dragTexts = ["gy", "wn", "un", "v", "oeng", "g", "h", "aeu", "q", "z"];
				limitDragNum = 5;
				dragType = 2;
			}else if(this.name == "uiSuenvaFive_2") {
				dragTexts = ["v", "mb", "l", "s", "gv", "nd", "au", "an", "ieng", "ang","ing","z","j","x","q","h"];
				limitDragNum = 3;
				dragType = 2;
			} else if(this.name == "uiSuenvaFour_4") {
				dragTexts = ["dauqcawq", "dauqdaej"];
				ans = {
					0:["dauqdaej"],
					1:["dauqcawq"]
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiSuenvaFive_6") {
				dragTexts = ["hab’eiq", "hozgaek"];
				ans = {
					0:["hab’eiq"]
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiLessonEighteenExercise_8") {
				dragTexts = ["simndei", "simsoh"];
				ans = {
					0:["simsoh"]
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiGenjcwzdizGeizSatbyai_9") {
				dragTexts = ["yaek", "daek"];
				ans = {
					0:["daek"],
					1:["yaek"]
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiGenjcwzdizGeizSatbyai_10") {
				dragTexts = ["doek", "boek"];
				ans = {
					0:["doek"],
					1:["boek"]
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiLessonEighteenExercise_9") {
				dragTexts = ["simndei", "simsoh"];
				ans = {
					0:["simndei"]
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiLessonEighteenExercise_10") {
				dragTexts = ["lai", "gvai"];
				ans = {
					0:["lai"]
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiLessonEighteenExercise_11") {
				dragTexts = ["lai", "gvai"];
				ans = {
					0:["gvai"]
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiSuenvaFive_7") {
				dragTexts = ["hab’eiq", "hozgaek"];
				ans = {
					0:["hozgaek"]
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiLessonSixteenExercise_7") {
				dragTexts = ["roh", "soh"];
				ans = {
					0:["soh"]
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiLessonSixteenExercise_8") {
				dragTexts = ["roh", "soh"];
				ans = {
					0:["roh"]
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiLessonSeventeenExercise_10") {
				dragTexts = ["yaengx", "daengj"];
				ans = {
					0:["yaengx"]
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiLessonSeventeenExercise_11") {
				dragTexts = ["yaengx", "daengj"];
				ans = {
					0:["daengj"]
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiLessonSeventeenExercise_12") {
				dragTexts = ["naep", "raek"];
				ans = {
					0:["raek"]
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiLessonSeventeenExercise_13") {
				dragTexts = ["naep", "raek"];
				ans = {
					0:["naep"]
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiLessonSixteenExercise_9") {
				dragTexts = ["nyengh", "ngeng"];
				ans = {
					0:["nyengh"]
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiLessonSixteenExercise_10") {
				dragTexts = ["nyengh", "ngeng"];
				ans = {
					0:["ngeng"]
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiSuenvaSix_6") {
				dragTexts = ["naep", "daenj"];
				ans = {
					0:["daenj"],
					1:["naep"]
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiSuenvaSix_7") {
				dragTexts = ["roh", "soh"];
				ans = {
					0:["roh"],
					1:["soh"]
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiSuenvaSix_12") {
				dragTexts = [",","?","?"];
				ans = {
					0:[","],
					1:["?"],
					2:["?"],
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiSuenvaFive_8") {
				dragTexts = ["doeksaet", "doeknaiq"];
				ans = {
					0:["doeknaiq"]
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiSuenvaFive_9") {
				dragTexts = ["doeksaet", "doeknaiq"];
				ans = {
					0:["doeksaet"]
				};
				limitDragNum = 1;
				dragType = 0;
			} else if(this.name == "uiLessonFourEx_6") {
				dragTexts = ["l", "ny", "e", "z", "b", "ou", "d", "og", "h", "s", "w", "ei", "j", "wg", "x", "g"];
				limitDragNum = 8;
				dragType = 2;
			} else if(this.name == "uiLessonFourEx_7") {
				dragTexts = ["beiz", "doengh", "mbaw", "seiq", "baez", "gvaq"];
				limitDragNum = 3;
				dragType = 2;
			} else if(this.name == "uiSuenvaThree_2") {
				dragTexts = ["nd", "h", "r", "j", "aeu", "x", "q", "gv", "y", "iu", "z", "aw", "ieng", "gy", "wen"];
				limitDragNum = 6;
				dragType = 2;
			} else if(this.name == "uiLessonFourEx_9") {
				dragTexts = ["hauqswnh", "ndiepgyaez"];
				ans = {
					0: ["hauqswnh"]
				};
				limitDragNum = 1;
				dragType = 0;
			} else if(this.name == "uiLessonFourEx_10") {
				dragTexts = ["hauqswnh", "ndiepgyaez"];
				ans = {
					0: ["ndiepgyaez"]
				};
				limitDragNum = 1;
				dragType = 0;
			} else if(this.name == "uiLessonSevenExercise_9") {
				dragTexts = ["bomz", "comz"];
				ans = {
					0: ["bomz"]
				};
				limitDragNum = 1;
				dragType = 0;
			} else if(this.name == "uiLessonSevenExercise_10") {
				dragTexts = ["fag", "faeg"];
				ans = {
					0: ["faeg"]
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiLessonFifteenExercise_9") {
				dragTexts = ["gyaeq", "saeq"];
				ans = {
					0: ["saeq"]
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiLessonFifteenExercise_10") {
				dragTexts = ["gyaeq", "saeq"];
				ans = {
					0: ["gyaeq"]
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiLessonFourteenExercise_4") {
				dragTexts = ["niuj", "fad"];
				ans = {
					0: ["fad"]
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiLessonFourteenExercise_5") {
				dragTexts = ["niuj", "fad"];
				ans = {
					0: ["niuj"]
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiLessonFourteenExercise_6") {
				dragTexts = ["huzgaek", "hab’eiq"];
				ans = {
					0: ["hab’eiq"]
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiLessonFourteenExercise_7") {
				dragTexts = ["hozgaek", "hab’eiq"]
				ans = {
					0: ["huzgaek"]
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiLessonFifteenExercise_11") {
				dragTexts = ["onj", "donq"];
				ans = {
					0: ["onj"]
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiLessonFifteenExercise_12") {
				dragTexts = ["onj", "donq"];
				ans = {
					0: ["donq"]
				};
				limitDragNum = 1;
				dragType = 0;
			} else if(this.name == "uiLessonFourEx_11") {
				dragTexts = ["haenh", "haenz"];
				ans = {
					0: ["haenh"]
				}
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiLessonThirteenExercise_7") {
				dragTexts = ["dingqraen", "dingqnyi"];
				ans = {
					0: ["dingqnyi"]
				}
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiLessonThirteenExercise_8") {
				dragTexts = ["hojlienz", "hojguh"];
				ans = {
					0: ["hojlienz"]
				}
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiLessonThirteenExercise_9") {
				dragTexts = ["riunyaen", "riunyum"];
				ans = {
					0: ["riunyaen"]
				}
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiLessonThirteenExercise_10") {
				dragTexts = ["gamz", "mboek","deuz","doek"];
				ans = {
					0: ["mboek"],
					1: ["deuz"]
				}
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiLessonThirteenExercise_11") {
				dragTexts = ["gamz", "mboek","deuz","doek"];
				ans = {
					0: ["doek"],
					1: ["gamz"]
				}
				limitDragNum = 1;
				dragType = 0;
			}  else if(this.name == "uiLessonTenExercise_5") {
				dragTexts = ["duz", "aen", "boux", "mbaw"];
				ans = {
					0: ["aen"],
					1: ["boux"],
					2: ["mbaw"],
					3: ["duz"]
				};
				limitDragNum = 1;
				dragType = 0;
			} else if(this.name == "uiLessonThreeExercise_9") {
				dragTexts = ["rim", "lim"];
				ans = {
					0: ["rim"]
				};
				limitDragNum = 1;
				dragType = 0;
			} else if(this.name == "uiLessonThreeExercise_10") {
				dragTexts = ["mouqmouq", "maeuqmaeuq"];
				ans = {
					0: ["maeuqmaeuq"]
				};
				limitDragNum = 1;
				dragType = 0;
			} else if(this.name == "uiLessonEightExercise_6") {
				dragTexts = ["daem", "caem"];
				ans = {
					0: ["daem"]
				};
				limitDragNum = 1;
				dragType = 0;
			} else if(this.name == "uiLessonEightExercise_7") {
				dragTexts = ["daem", "caem"];
				ans = {
					0: ["caem"]
				};
				limitDragNum = 1;
				dragType = 0;
			} else if(this.name == "uiLessonEightExercise_8") {
				dragTexts = ["bengz", "beng"];
				ans = {
					0: ["bengz"]
				};
				limitDragNum = 1;
				dragType = 0;
			} else if(this.name == "uiLessonEightExercise_9") {
				dragTexts = ["bengz", "beng"];
				ans = {
					0: ["beng"]
				};
				limitDragNum = 1;
				dragType = 0;
			} else if(this.name == "uiLessonThreeExercise_11") {
				dragTexts = ["duengh", "cuengh"];
				ans = {
					0: ["duengh"]
				};
				limitDragNum = 1;
				dragType = 0;
			} else if(this.name == "uiLessonTenExercise_6") {
				dragTexts = ["danghnaeuz", "nyinhnaeuz"];
				ans = {
					0: ["nyinhnaeuz"]
				};
				limitDragNum = 1;
				dragType = 0;
			} else if(this.name == "uiLessonTenExercise_7") {
				dragTexts = ["bonjsaeh", "bonjdieg"];
				ans = {
					0: ["bonjsaeh"]
				};
				limitDragNum = 1;
				dragType = 0;
			} else if(this.name == "uiLessonThreeExercise_12") {
				dragTexts = ["roen", "loenq"];
				ans = {
					0: ["loenq"]
				};
				limitDragNum = 1;
				dragType = 0;
			} else if(this.name == "uiLessonTwoEx_7") {
				dragTexts = ["haeujsim", "haeujsin"];
				ans = {
					0: ["haeujsim"]
				};
				limitDragNum = 1;
				dragType = 0;
			} else if(this.name == "uiLessonTwoEx_8") {
				dragTexts = ["fungcou", "fungsou"];
				ans = {
					0: ["fungsou"]
				};
				limitDragNum = 1;
				dragType = 0;
			} else if(this.name == "uiLessonSixExercise_10") {
				dragTexts = ["nyienh", "nyiengh"];
				ans = {
					0: ["nyienh"]
				};
				limitDragNum = 1;
				dragType = 0;
			} else if(this.name == "uiLessonTwelveExercise_7") {
				dragTexts = ["yaek", "saek"];
				ans = {
					0: ["yaek"]
				};
				limitDragNum = 1;
				dragType = 0;
			} else if(this.name == "uiLessonTwelveExercise_8") {
				dragTexts = ["yaek", "saek"];
				ans = {
					0: ["saek"]
				};
				limitDragNum = 1;
				dragType = 0;
			} else if(this.name == "uiLessonSixExercise_11") {
				dragTexts = ["nyienh", "nyiengh"];
				ans = {
					0: ["nyiengh"]
				};
				limitDragNum = 1;
				dragType = 0;
			} else if(this.name == "uiLessonSixExercise_12") {
				dragTexts = ["buet", "duet"];
				ans = {
					0: ["duet"]
				};
				limitDragNum = 1;
				dragType = 0;
			} else if(this.name == "uiLessonSixExercise_13") {
				dragTexts = ["buet", "duet"];
				ans = {
					0: ["buet"],
					1: ["buet"]
				};
				limitDragNum = 1;
				dragType = 2;
			} else if(this.name == "uiLessonTwoEx_9") {
				dragTexts = ["vaiqvued", "vaivued"];
				ans = {
					0: ["vaiqvued"],
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiSuenvaFive_13"){
				dragTexts = ["?", ",", "!"];
				ans = {
					0: [","],
					1: ["!"],
					2: ["?"],
				};
				limitDragNum = 1;
				dragType = 0;
			}else if(this.name == "uiLessonThirteenExercise_6"){
				dragTexts = ["c", "s", "h", "l", "y", "g", "at","ai","o", "ien","ou","aen", "j","j","g", "q","a"];
				limitDragNum = 20;
				dragType = 2;
				initPop();
			}

			if(this.view.lessonName){
				this.view.x = 82; 
				this.view.y = 140;
			}else{
				this.view.x = xx;
				this.view.y = yy;
			}
			this_.view.visible = false;
			setTimeout(function() {
				this_.view.visible = true;
				buildFrames();
				initItems();
			}, 100);
		}
		function initPop(){
			var popDialog;
			if(this_.view.pop){
				popDialog = this_.view.pop;
				popDialog.visible = false;
				popDialogManager = new ui.LessonOneExDrawSentenceContainer_12(this_.name + "_pop");
				popDialogManager.init(this_.view.pop, 0, 0, this_.lib);
				popDialogManager.initView();
				var btnOpenPop = this_.view.btnOpenPop;
				btnOpenPop.mouseChildren = false;
				btnOpenPop.cursor = "pointer";
				btnOpenPop.addEventListener("click", function(e){
					popDialog.parent.addChild(popDialog);
					popDialog.visible = true;
//					popDialog.x = 1020;
//					popDialog.y = 500;
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

		function initItems() {
			var item;
			fonts = this_.view["item_0"].txt.font.split("px ");
			for(var i = 0, len = dragTexts.length; i < len; i++) {
				item = this_.view["item_" + i];
				item.num = 0;
				item.txt.text = dragTexts[i];
				if(window.isAndroid) {
					if(fonts[0] > 50) {
						item.txt.font = fonts[0] - window.androidOffsetFontSize * 2 + "px " + fonts[1];
					} else {
						item.txt.font = fonts[0] - window.androidOffsetFontSize + "px " + fonts[1];
					}
				} else {
					item.txt.font = fonts[0] - window.commonOffsetFontSize + "px " + fonts[1];
				}
				item.mouseChildren = false;
				item.addEventListener("mousedown", startDrag, false);
				item.homeX = item.x;
				item.homeY = item.y;
				item.key = i;
				items.push(item);
			}
			initBtnJudgmentAndReset();
			initRecordPlay();
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
			if(!btnPlay){
				return;
			}
			var instance;
			if(!btnRecord){
				for(var i = 0; i < 10; i++){
					if(i == 0){
						instance = this_.view.instance;
					}else{
						instance = this_.view["instance_" + i];
					}
					if(!instance || !(typeof(instance) == Object)){
						break;
					}else{
						if(!btnRecord){
							btnRecord = instance instanceof this_.lib.BtnRecord ? instance : null;
						}
						if(!btnPlay){
							btnPlay = instance instanceof this_.lib.BtnPlay ? instance : null;
						}
					}
				}
			}
			if(btnPlay && !recordPlayManager) {
				recordPlayManager = new ui.RecordPlayContainer(btnRecord, btnPlay, this_.name);
			}
		}
		function initBtnJudgmentAndReset() {
			var btnJudgment = this_.view.btnJudgment;
			if(btnJudgment) {
				btnJudgment.curosr = "pointer";
				btnJudgment.mouseChildren = false;
				btnJudgment.addEventListener("click", checkGame, false);
				btnJudgment.addEventListener("pressup", function(e) {
					e.stopPropagation();
					btnJudgment.scaleX = btnJudgment.scaleY = 1;
				}, false);
				btnJudgment.addEventListener("mousedown", function(e) {
					e.stopPropagation();
					btnJudgment.scaleX = btnJudgment.scaleY = 1.5;
				}, false);
			}
			var btnReset = this_.view.btnReset;
			if(btnReset) {
				btnReset.curosr = "pointer";
				btnReset.mouseChildren = false;
				btnReset.addEventListener("click", resetGame, false);
				btnReset.on("pressup", function(e) {
					e.stopPropagation();
					btnReset.scaleX = btnReset.scaleY = 1;
				}, false);
				btnReset.addEventListener("mousedown", function(e) {
					e.stopPropagation();
					btnReset.scaleX = btnReset.scaleY = 1.5;
				}, false);
			}
		}

		function resetGame(e) {
			if(e) {
				e.stopPropagation();
			}
			var btnRightWrong;
			var frame_;
			for(var i = 0, len = frames.length; i < len; i++) {
				if(this_.view["btnRightWrong_0"]) {
					btnRightWrong = this_.view["btnRightWrong_" + i];
					btnRightWrong.visible = false;
				}
				frame_ = frames[i];
				frame_.isRight = false;
				frame_.dragItemSequences = [];
			}
			if(e) {
				if(dragType == 0) {
					resetItem(items);
				} else {
					resetItem(tempNums);
				}
			}

			function resetItem(arr) {
				var item;
				if(dragType == 2) {
					for(var j = 0, len = arr.length; j < len; j++) {
						item = arr[j];
						item.num = 0;
						arr[j].visible = false;
						item.frameKey = -1;
						item.removeAllEventListeners();
						item.addEventListener("mousedown", startDrag, false);
						item.mouseChildren = false;
					}
				} else {
					for(var j = 0, len = arr.length; j < len; j++) {
						item = arr[j];
						item.num = 0;
						item.x = item.homeX;
						item.y = item.homeY;
						item.frameKey = -1;
						item.removeAllEventListeners();
						item.addEventListener("mousedown", startDrag, false);
						item.mouseChildren = false;
					}
				}
			}
		}

		function buildFrames() {
			var box_;
			var frame_;
			var rect_;
			var box;
			var hei_;
			var wid_;
			for(var i = 0; i < 20; i++) {
				box_ = this_.view["box_" + i];
				if(!box_) {
					break;
				} else {
					rect_ = box_.getBounds();
					wid_ = rect_.width * box_.scaleX;
					hei_ = rect_.height * box_.scaleY;
					if(box_.shape){
						box_.shape.graphics.clear();
						box_.shape_1.graphics.clear();
						box_.shape = null;
					}
					box = new createjs.Shape();
					box.graphics.setStrokeDash([20, 6], 0).setStrokeStyle(6).beginStroke('#04CBCD').moveTo(0, 0).lineTo(wid_, 0);
					box.graphics.beginFill(createjs.Graphics.getRGB(136, 255, 255, 0.23));
					box.graphics.drawRect(0, 0, wid_, hei_);
					box.x = box_.x - wid_ / 2;
					box.y = box_.y - hei_ / 2;
					this_.view.addChildAt(box, 0);
					this_.view.removeChild(box_);
					this_.view["box_" + i] = null;
				}
			}
			for(var i = 0; i < 100; i++) {
				frame_ = this_.view["frame_" + i];
				if(!frame_) {
					break;
				} else {
					if(frame_.shape){
						frame_.shape.graphics.clear();
						frame_.shape_1.graphics.clear();
					}
					rect_ = frame_.getBounds();
					frameWidth = rect_.width * frame_.scaleX;
					frameHeight = rect_.height * frame_.scaleY;
					frameXs.push(frame_.x);
					frameYs.push(frame_.y);
					frame_.parent.removeChild(frame_);
					this_.view["frame_" + i] = null;
				}
			}

			var i, frame_;
			var item;
			for(i = 0, len = frameXs.length; i < len; i++) {
				frame_ = new createjs.Shape();
				frame_.graphics.setStrokeStyle(3).beginStroke('#04CBCD').moveTo(0, 0).lineTo(frameWidth, 0);
				frame_.graphics.beginFill(createjs.Graphics.getRGB(136, 255, 255, 0.23));
				frame_.graphics.drawRect(0, 0, frameWidth, frameHeight);
				frame_.regX = frameWidth / 2;
				frame_.regY = frameHeight / 2;
				frame_.width = frameWidth;
				frame_.height = frameHeight;
				frame_.key = i;
				frame_.dragItemSequences = [];
				frame_.x = frameXs[i];
				frame_.y = frameYs[i];
				this_.view.addChild(frame_);
				frames.push(frame_);
				this_.view.addChild(this_.view["btnRightWrong_" + i]);
				//				frame_.alpha = 1;
			}
		}

		function cloneNum(temp_) {
			temp_.num++;
			var bmp = temp_.clone(true);
			tempNums.push(bmp);
			this_.view.addChild(bmp);
			bmp.txt.text = temp_.txt.text;
			if(window.isAndroid) {
				if(fonts[0] > 50) {
					bmp.txt.font = fonts[0] - window.androidOffsetFontSize * 2 + "px " + fonts[1];
				} else {
					bmp.txt.font = fonts[0] - window.androidOffsetFontSize + "px " + fonts[1];
				}
			}
			bmp.copyKey = temp_.key;
			bmp.key = temp_.key;
			bmp.homeX = bmp.x = temp_.x;
			bmp.homeY = bmp.y = temp_.y;
			bmp.mouseChildren = false;
			bmp.addEventListener("mousedown", startDrag, false);
			return bmp;
		}

		function startDrag(e) {
			if(dragType == 2) {
				var target = e.currentTarget;
				if(target.num >= maxDrag) {
					return;
				}
				if(!target.hasOwnProperty("copyKey")) {
					dragItem = cloneNum(target);
				} else {
					dragItem = target;
				}
			} else {
				dragItem = e.currentTarget;
			}
//			this_.view.addChild(dragItem);
			this_.view.setChildIndex(dragItem, this_.view.getNumChildren() - 1);
			var pp = stage.globalToLocal(e.stageX, e.stageY);
			offetX = pp.x - dragItem.x;
			offetY = pp.y - dragItem.y;
			stage.addEventListener('stagemousemove', stageMouseMove, false);
			stage.addEventListener('stagemouseup', stageMouseUp, false);
		}

		function stageMouseMove(e) {
			var pp = stage.globalToLocal(e.stageX, e.stageY);
			dragItem.x = pp.x - offetX;
			dragItem.y = pp.y - offetY;
		}

		function stageMouseUp(e) {
			stage.removeAllEventListeners();
			var pt_ = stage.globalToLocal(stage.mouseX, stage.mouseY);
			var mouseX = pt_.x;
			var mouseY = pt_.y;
			var frame_;
			var dragInFrame_;
			var isDragIn = false;
			for(var i = 0, len = frames.length; i < len; i++) {
				frame_ = frames[i];
				var btRightWrong = this_.view["btnRightWrong_" + i];
				if(!frame_.isRight && frame_.dragItemSequences.length < limitDragNum && dragItem.x > (frame_.x - frameWidth / 2) &&
					dragItem.x < (frame_.x + frameWidth / 2) && dragItem.y > (frame_.y - frameHeight / 2) &&
					dragItem.y < (frame_.y + frameHeight / 2)) {
					dragInFrame_ = frame_;
					isDragIn = true;
					continue;
				} else {}
			}
			if(isDragIn) {
				resetFrameByItemPop();
				if(dragInFrame_.dragItemSequences.indexOf(dragItem) == -1) {
					dragItem.frameKey = String(dragInFrame_.key);
					dragInFrame_.dragItemSequences.push(dragItem);
				} else {}
				//				if(dragType == 0) {
				itemInFrameX(dragInFrame_);
				createjs.Tween.get(dragItem).to({
					x: dragItem.x,
					y: dragInFrame_.y
				}, 200, createjs.Ease.quadOut).call(function() {});
				//				} 
				//				else {
				//					createjs.Tween.get(dragItem).to({
				//						x: dragInFrame_.x,
				//						y: dragInFrame_.y
				//					}, 200, createjs.Ease.quadOut).call(checkGame);
				//				}
			} else {
				if(dragType == 2) {
					resetFrameByItemPop();
					createjs.Tween.get(dragItem).to({
						x: dragItem.homeX,
						y: dragItem.homeY
					}, 200, createjs.Ease.quadOut).call(function() {
						dragItem.parent.removeChild(dragItem);
					});
				} else {
					resetFrameByItemPop();
					createjs.Tween.get(dragItem).to({
						x: dragItem.homeX,
						y: dragItem.homeY
					}, 200, createjs.Ease.quadOut).call(function() {});
				}
			}
		}

		function checkGame(e) {
			if(!this_.view["btnRightWrong_0"]) {
				return;
			}
			var btnRightWrong;
			var str;
			var dragItemSequences;
			var ans_;
			var nums = 0;
			var oldstrs = [];
			for(var i = 0, len = frames.length; i < len; i++) {
				str = "";
				btnRightWrong = this_.view["btnRightWrong_" + i];
				btnRightWrong.visible = true;
				frame_ = frames[i];
				dragItemSequences = frame_.dragItemSequences;
				for(var j = 0; j < dragItemSequences.length; j++) {
					str += dragItemSequences[j].txt.text;
				}
				if(ans instanceof Array) {
					ans_ = ans;
				} else {
					ans_ = ans[i];
				}
				if(this_.name == "uiLessonEightExercise_2"){ //特殊处理 多答案无序
					var flag=0;
					for(var j = 0; j < dragItemSequences.length; j++) {
						for(var t=0;t<ans_.length;t++){
							if(dragItemSequences[j].txt.text == ans_[t]){
								flag++;
							}
						}
					}
					if(flag == ans_.length){
						btnRightWrong.gotoAndStop(0);
						nums++;
						frame_.isRight = true;
						for(var m = 0, len_ = dragItemSequences.length; m < len_; m++) {
							dragItemSequences[m].removeAllEventListeners();
						}
						oldstrs.push(str);
					}else{
						btnRightWrong.gotoAndStop(1);
					}
				}else if(ans_.indexOf(str) != -1 ) {//&& oldstrs.indexOf(str) == -1    不知道干嘛的
					btnRightWrong.gotoAndStop(0);
					nums++;
					frame_.isRight = true;
					for(var m = 0, len_ = dragItemSequences.length; m < len_; m++) {
						dragItemSequences[m].removeAllEventListeners();
					}
					oldstrs.push(str);
				} else {
					btnRightWrong.gotoAndStop(1);
				}
			}
			if(nums >= frameXs.length) {
				createjs.Sound.play(window.ANSWER_RIGHT_Id);
			} else {
				createjs.Sound.play(window.ANSWER_WRONG_Id);
			}
		}

		function itemInFrameX(dragFrame) {
			if(dragType == 0 || dragType == 2) {
				var offsetX = 0;
				var str = "";
				var dragInItem;
				for(var i = 0, len = dragFrame.dragItemSequences.length; i < len; i++) {
					dragInItem = dragFrame.dragItemSequences[i];
					str += dragInItem.txt.text;
				}
				tempText.text = str;
				offsetX = (frameWidth - tempText.getMeasuredWidth()) / 2;
				var itemX;
				for(var i = 0, len = dragFrame.dragItemSequences.length; i < len; i++) {
					str = "";
					dragInItem = dragFrame.dragItemSequences[i];
					for(var j = 0; j < i; j++) {
						if(this_.name == "uiLessonEightExercise_2"||this_.name == "uiSuenvaThree_2"){
								str += dragFrame.dragItemSequences[j].txt.text+" ";
						}else{
							str += dragFrame.dragItemSequences[j].txt.text;
						}
					}
					tempText.text = str;
					itemX = tempText.getMeasuredWidth();
					dragInItem.x = dragFrame.x - frameWidth / 2 + itemX + dragInItem.txt.getMeasuredWidth() / 2 + offsetX;
				}
			}

		}

		function resetFrameByItemPop() {
			
			if(dragItem.hasOwnProperty("frameKey") && dragItem["frameKey"].length > 0) {
				var dragFrame = frames[dragItem.frameKey];
				var foundArrIndex = dragFrame.dragItemSequences.indexOf(dragItem);
				if(foundArrIndex != -1) {
					dragFrame.dragItemSequences.splice(foundArrIndex, 1);
				}
				itemInFrameX(dragFrame);
			}
		}

	}
	var Super = function() {};
	Super.prototype = ui.BaseDialog.prototype;
	LessonOneDragExContainer_5.prototype = new Super();
	window.ui.LessonOneDragExContainer_5 = LessonOneDragExContainer_5;
})();
