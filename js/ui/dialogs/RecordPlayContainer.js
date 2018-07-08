(function() {
	window.ui = window.ui || {};
	var RecordPlayContainer = function(btnRecord_, btnPlay_, name_) {
		this_ = this;
		var mediaRec;
		var btnRecord = btnRecord_;
		var btnPlay = btnPlay_;
		btnRecord.cursor = "pointer";
		btnRecord.mouseChildren = false;
		btnRecord.addEventListener("click", clickBtnRecord, false);
		btnPlay.cursor = "pointer";
		btnPlay.mouseChildren = false;
		btnPlay.addEventListener("click", clickBtnPlay, false);
		
		function clickBtnRecord(e) {
			e.stopPropagation();
			if(btnPlay.isSelect) {
				return;
			}
			btnRecord.isSelect = !btnRecord.isSelect;
			if(btnRecord.isSelect) {
				this_.releaseSound();
				var random = new Date().getTime();
				var src = name_ + "_" + random + ".wav";
				if(!mediaRec){
					mediaRec = new Media(src, function(){}, function(err){}, function(mediaStatus){});
				}
				mediaRec.startRecord();
				btnRecord.gotoAndStop(1);
			} else {
				mediaRec.stopRecord();
				btnRecord.gotoAndStop(0);
			}
		}
		
		function clickBtnPlay(e) {
			e.stopPropagation();
			if(btnRecord.isSelect) {
				return;
			}
			btnPlay.isSelect = !btnPlay.isSelect;
			if(btnPlay.isSelect) {
				mediaRec.play();
				btnPlay.gotoAndStop(1);
			} else {
				mediaRec.stop();
				btnPlay.gotoAndStop(0);
			}
		}
		
		this.releaseSound = function(){
			if(mediaRec){
				mediaRec.release();
			}
		}
	}

	window.ui.RecordPlayContainer = RecordPlayContainer;
})();