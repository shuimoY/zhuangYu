(function() {
	window.ui = window.ui || {};

	var CatalogPageContainer = function(name_) {
//		this.BaseDialog_constructor();
		ui.BaseDialog.call(this);
		this.name = name_;
		var this_ = this;
		var xx = 50;
		var yy = 180;
		var list = [];
		var colNum = 2;
		var rowNum = 2;
		var rowGap = 60;
		var colGap = 45;
		var itemLineHeight = 70;
		var CLICK_BTN_SOUND = 1;
		var CLICK_BTN_LESSON = 2;
		var CLICK_BTN_WORKBOOK = 3;
		var lessonItems = [];
		this.initView = function(){
			this.commonBarCallback("Moegloeg");
		}
		this.resetView = function() {
			resetBtnSoundTextStatus();
		}
		this.init = function(view_, itemIndex_, chapterLessonIds_, lib_, mainScene_, commonBarCallback_) {
			this.view = view_;
			this.temIndex = itemIndex_;
			this.chapterLessonIds = chapterLessonIds_;
			this.lib = lib_;
			this.mainScene = mainScene_;
			this.commonBarCallback = commonBarCallback_;
			this.view.x = xx;
			this.view.y = yy;
			this.commonBarCallback("Moegloeg");
			var datas = this.datas();
			var catalogChapterItem;
			var catalogLessonItem;
			var rect;
			var row = 0;
			var col = 0;
			var lessons;
			var lessonData;
			var itemIndexArr = itemIndex_.split("-");
			var fontBigs = [48, 'Times New Roman'];
			var fontMids = [42, 'Times New Roman'];
			var fontSmas = [30, 'Times New Roman'];
			var preCatalogItemY = 0;
			for(var i = parseInt(itemIndexArr[0]); i < parseInt(itemIndexArr[1]); i++) {
				catalogChapterItem = new this.lib.uiCatalogChapterItem();
//				if(i == 6){
					catalogChapterItem.bookNums.visible=false;
//				}
				catalogChapterItem.name = "chapter_" + i;
				if(!datas[i]) {
					break;
				}
				if(window.isAndroid) {
					catalogChapterItem.txt.font = fontBigs[0] - window.androidOffsetFontSize + "px " + fontBigs[1];
					catalogChapterItem.originalBookNum.font = fontSmas[0] - window.androidOffsetFontSize + "px " + fontSmas[1];
				}
				catalogChapterItem.txt.text = datas[i].title;
				//  			catalogChapterItem.btnChapter.cursor = "pointer";
				//  			var chapterData_ = {curIndex: datas[i].chapterIndex}; 
				//  			catalogChapterItem.btnChapter.on("click", clickBtnChapter, null, false, chapterData_);
				catalogChapterItem.originalBookNum.text = datas[i].originalBookNum;
				lessons = datas[i].lessons;
				var list = new createjs.Container();
				list.x = 0;
				list.y = catalogChapterItem.txt.y + catalogChapterItem.txt.lineHeight;
				catalogChapterItem.list = list;
				catalogChapterItem.addChild(list);
				var preLessonItemY = 0;
				for(var j = 0; j < lessons.length; j++) {
					lessonData = lessons[j];
					catalogLessonItem = new this.lib.uiCatalogLessonItem();
					lessonItems.push(catalogLessonItem);
					if(window.isAndroid) {
						catalogLessonItem.lessonId.font = fontMids[0] - window.androidOffsetFontSize + "px " + fontMids[1];
						catalogLessonItem.lessonName.font = fontMids[0] - window.androidOffsetFontSize + "px " + fontMids[1];
						catalogLessonItem.originalBookNum.font = fontSmas[0] - window.androidOffsetFontSize + "px " + fontSmas[1];
						}
					catalogLessonItem.x = 0;
					catalogLessonItem.lessonId.text = lessonData.lessonId;
					if(lessonData.lessonId == -1||lessonData.lessonId == 20||lessonData.lessonId == 19) {
						catalogLessonItem.lessonName.x -= 30;
						catalogLessonItem.lessonId.text = "";
						catalogLessonItem.btnWorkbook.visible = false;
					}else{
						catalogLessonItem.lessonName.x = catalogLessonItem.lessonId.x + catalogLessonItem.lessonId.getMeasuredWidth() + 10;
						catalogLessonItem.btnWorkbook.visible = true;
					}
					if(lessonData.lessonId == 19){
						catalogLessonItem.btnWorkbook.visible = true;
						catalogLessonItem.btnWorkbook.x=catalogLessonItem.btnLesson.x;
						catalogLessonItem.btnLesson.visible = false;
					}
					if(lessonData.lessonId == 19||lessonData.lessonId == 20){
						list.x=81;
						catalogLessonItem.btnSound.visible=false;
					}
					if(lessonData.lessonId == -1){
						catalogLessonItem.btnSound.visible=false;
					}
					catalogLessonItem.lessonName.text = lessonData.lessonName;
					catalogLessonItem.lessonName.lineHeight = itemLineHeight;

					catalogLessonItem.originalBookNum.text = lessonData.originalBookNum;
					var btnLessonData = {
						curIndex: lessonData.lessonIndex,
						lessonIndex: lessonData.lessonIndex,
						workbookIndex: lessonData.workbookIndex,
						lessonId: lessonData.lessonId,
						lessonName: lessonData.lessonName
					};
					catalogLessonItem.btnSound.cursor = "pointer";
					catalogLessonItem.btnSound.soundIndex = 0;
					disabledAllChildren(catalogLessonItem.btnSound);
					catalogLessonItem.btnSound.clickType = CLICK_BTN_SOUND;
					catalogLessonItem.btnSound.soundData = lessonData;
//										catalogLessonItem.btnSound.on("click", clickPlaySound, null, false, lessonData);
					catalogLessonItem.btnLesson.cursor = "pointer";
					disabledAllChildren(catalogLessonItem.btnLesson);
					catalogLessonItem.btnLesson.clickType = CLICK_BTN_LESSON;
					catalogLessonItem.btnLesson.lessonData = btnLessonData;
					//					catalogLessonItem.btnLesson.on("click", clickBtnLessonOrWorkbook, null, false, btnLessonData);
					var btnWorkbookData = {
						curIndex: lessonData.workbookIndex,
						lessonIndex: lessonData.lessonIndex,
						workbookIndex: lessonData.workbookIndex,
						lessonId: lessonData.lessonId,
						lessonName: lessonData.lessonName
					};
					//					catalogLessonItem.btnWorkbook.on("click", clickBtnLessonOrWorkbook, null, false, btnWorkbookData);
					catalogLessonItem.btnWorkbook.cursor = "pointer";
					disabledAllChildren(catalogLessonItem.btnWorkbook);
					catalogLessonItem.btnWorkbook.clickType = CLICK_BTN_WORKBOOK;
					catalogLessonItem.btnWorkbook.workbookData = btnWorkbookData;
					catalogLessonItem.addEventListener("click", clickBtnLessonItem,false);
					if(i == 6 && j == 1){
						catalogLessonItem.y = preLessonItemY+7;
					}else{
						catalogLessonItem.y = preLessonItemY;
					}
					if(j == 0){
						catalogLessonItem.y = preLessonItemY+10;
					}
					preLessonItemY = catalogLessonItem.y + catalogLessonItem.getBounds().height;
					catalogChapterItem.list.addChild(catalogLessonItem);
				}
				rect = catalogChapterItem.getBounds();
				catalogChapterItem.x = (rect.width + rowGap) * col;
				catalogChapterItem.y = (preCatalogItemY + colGap) * row-40;
				preCatalogItemY = catalogChapterItem.y + rect.height;
				if(row != 0 && (row % (rowNum - 1)) === 0) {
					row = 0;
					col++;
				} else {
					row++; 
				}
				view_.addChild(catalogChapterItem);
			}
		}

		function disabledAllChildren(btn) {
			btn.mouseChildren = false;
//			btn.children.mouseEnabled = false;
//			var childrens = btn.children; 
//			for(var i = 0, len = childrens.length; i < len; i++) {
//				childrens[i].mouseEnabled = false;
//			}
		}

		function clickBtnLessonItem(e) {
			var btn = e.target;
			if(btn.clickType == CLICK_BTN_SOUND) {
				clickPlaySound(btn, btn.soundData);
			} else if(btn.clickType == CLICK_BTN_LESSON || btn.clickType == CLICK_BTN_WORKBOOK) {
				clickBtnLessonOrWorkbook(btn, btn.lessonData ? btn.lessonData : btn.workbookData);
			}
		}

		function clickBtnLessonOrWorkbook(btn, data) {
			var event = new createjs.Event(window.events.PAGE_NUM, false, false);
			event.data = data;
			this_.mainScene.dispatchEvent(event);
		}

		function resetBtnSoundTextStatus(lessonitem_) {
			createjs.Sound.stop();
			var lessonitem;
			for(var i = 0, len = lessonItems.length; i < len; i++) {
				lessonitem = lessonItems[i];
				if(lessonitem != lessonitem_) {
					lessonitem.btnSound.gotoAndStop(0);
					lessonitem.lessonName.color = "#6B4A15";
					lessonitem.btnSound.isClick = false;
				}
			}
		}

		function clickPlaySound(btn, soundData) {
			resetBtnSoundTextStatus(btn.parent);
			var txt = btn.parent["lessonName"];
			btn.isClick = !btn.isClick;
			var instance;
			var sounds = [];
			var obj;
//			for(var i = 0; i < soundData.titleSound.length; i++) {
				obj = {};
				obj.src = soundData.titleSound;
				obj.id = soundData.titleSound;
				sounds.push(obj);
//			}
			if(btn.isClick) {
				txt.color = "#ff0000";
				if(window.isSoundLoadObj.hasOwnProperty(sounds[btn.soundIndex].id) && window.isSoundLoadObj[sounds[btn.soundIndex].id]) {
					createjs.Sound.play(sounds[btn.soundIndex].id);
				} else {
					createjs.Sound.addEventListener("fileload", createjs.proxy(soundLoaded, this)); // add an event listener for when load is completed
					createjs.Sound.registerSounds(sounds, window.assetsPath);
				}
				btn.gotoAndStop(1);
			} else {
				btn.gotoAndStop(0);
			}

			function soundComplete(e) {
				btn.soundIndex++;
				if(btn.soundIndex < sounds.length) {
					soundLoaded();
					btn.soundIndex = 0;
				}
			}

			function soundLoaded(e) {
				window.isSoundLoadObj[sounds[btn.soundIndex].id] = true;
				if(btn.isClick) {
					createjs.Sound.stop();
					instance = null;
					instance = createjs.Sound.play(sounds[btn.soundIndex].id);
					instance.on("complete", soundComplete);
				}
			}
		}
	}
//	var p = createjs.extend(CatalogPageContainer, ui.BaseDialog);
	var Super = function() {};
	Super.prototype = ui.BaseDialog.prototype;
	CatalogPageContainer.prototype = new Super();

//	window.ui.CatalogPageContainer = createjs.promote(CatalogPageContainer, "BaseDialog");
	window.ui.CatalogPageContainer = CatalogPageContainer;
})();