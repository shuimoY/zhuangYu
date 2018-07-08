(function() {
	window.ui = window.ui || {};
	var BaseDialog = function() {
		this.DIS_WID = 1920;
		this.DIS_HEI = 1082;
		this.view = null;
		this.lib = null;
		this.mainScene = null;
		this.commonBarCallback = null;
		this.temIndex = 0;
		this.chapterLessonIds = null;
		this.lessonData = null;
		this.txtLength = 12;
		this.isAndroidChangeTxt = true;

		this.resetView = function() {}
		this.initView = function() {}
	}
	BaseDialog.prototype.removeView = function() {
		this.resetView();
//		createjs.Sound.stop();
		if(this.view && this.view.parent) {
			this.view.parent.removeChild(this.view);
		}
	}
	BaseDialog.prototype.getView = function() {
		return this.view;
	}
	BaseDialog.prototype.addView = function(parent_) {
		this.initView();
		var titleArrs=["It Yijyinh","Ngeih Swzyij","Sam Vahgawq","Ngeih Swzyij ","It Yijyinh ( 40  faen )","Ngeih Swzyij ( 40  faen )","Sam Vahgawq ( 20  faen )"];
		if(this.isAndroidChangeTxt) {
			this.isAndroidChangeTxt = false;
			var txt;
			var fonts;
			for(var i = 0, len = this.txtLength; i < len; i++) {
				if(i == 0) {
					txt = this.view["text"];
				} else {
					txt = this.view["text_" + i];
				}
				if(txt) {
					if(titleArrs.indexOf(txt.text)!=-1){
						txt.text=txt.text.replace(/\s/,". ");
					}
					fonts = txt.font.split("px ");
						if(window.isAndroid) {
						if(fonts[0] > 50){
							txt.font = fonts[0] - window.androidOffsetFontSize*2 + "px " + fonts[1];
						}else{
							txt.font = fonts[0] - window.androidOffsetFontSize + "px " + fonts[1];
						}
					}
				}
			}
		} 
		parent_.addChild(this.view);
	}
	BaseDialog.prototype.datas = function() {
		return window.data.chapters;
	}
	BaseDialog.prototype.getDataById = function(chapterId, lessonId) {
		return window.data.getDataById(chapterId, lessonId);
	}

	window.ui.BaseDialog = BaseDialog;
})();
