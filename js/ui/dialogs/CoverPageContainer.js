(function() {
	window.ui = window.ui || {};

	var CoverPageContainer = function() {
		var view = null;
		var DIS_WID = 1920;
		var DIS_HEI = 1082;

		this.removeView = function() {
			if(view && view.parent) {
				view.parent.removeChild(view);
			}
		}
		this.addView = function(parent_) {
			parent_.addChild(view);
		}
		this.getView = function() {
			return view;
		}
		this.datas = function() {
			return window.data.chapters;
		}
		this.init = function(view_, lib_, callback_) {
			view = view_;
			//  		view.x = (DIS_WID - view.getBounds().width)/2;
			//  		view.y = (DIS_HEI - view.getBounds().height)/2;
			view.on("click", function() {
				callback_();
			});
			if(window.isAndroid){
				if(view.tempTxt.getMeasuredLineHeight() - view.tempTxt.lineHeight > 2) {
					window.androidOffsetFontSize = 10;
				} else {
					window.androidOffsetFontSize = 6;
				}
			}
			view.tempTxt.visible = false;
		}

	}
	window.ui.CoverPageContainer = CoverPageContainer;
})();