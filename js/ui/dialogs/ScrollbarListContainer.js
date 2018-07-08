(function() {
	window.ui = window.ui || {};
	var ScrollbarListContainer = function(view_, lib_) {
		var view = view_;
		var lib = lib_;
		var scrollbarList = view.scrollbarList;
		var scrollbar = new createjs.Shape();
		var list = new createjs.Container();
		var itemNum = 3;
		var scrollbarInitY = 0;
		var scrollbarMaxY = 0;
		var scrollbarOffsetY = 0;
		var scrollbarCurY = 0;
		var scrollbarListWidth = 1700;
		var scrollbarItemHeight = 400;
		var scrollbarHeight = 358;
		var page = 0;
		var items = [];
		var drawingCanvas;
		var limitRight = scrollbarListWidth;
		var limitBottom = scrollbarItemHeight * itemNum; //		itemNum * scrollbarItemHeight;
		var oldPt;
		var oldMidPt;
		var color = "#666";
		var stroke = 10;
		init();

		this.clear = function() {
			drawingCanvas.graphics.clear();
			list.y = 0;
			page = 0;
			scrollbarCurY = 0;
			scrollbarList.scrollbar.y = 0;
		}
		this.cloneWriteCanvas= function(){
			var cloneWriteCanvas_;
			var rect = drawingCanvas.getBounds();
			for(var i = 0; i <3; i++){
				cloneWriteCanvas_  = drawingCanvas.clone(true);
				cloneWriteCanvas_.cache(0, i*400, limitRight, 300, 1, {
					useGL: "stage"
				});
				var btnSaveWord = view_["btnSaveWord_"+i];//btnSaveWord width 375 height66
				var btnSaveWordRect = btnSaveWord.getBounds();
				cloneWriteCanvas_.scaleX  = btnSaveWordRect.width*btnSaveWord.scaleX/limitRight;
				cloneWriteCanvas_.scaleY  = btnSaveWordRect.height*btnSaveWord.scaleY/300;
				cloneWriteCanvas_.x = btnSaveWord.x - btnSaveWordRect.width*btnSaveWord.scaleX/2;
				cloneWriteCanvas_.y = btnSaveWord.y - btnSaveWordRect.height*btnSaveWord.scaleY/2 - i*400*cloneWriteCanvas_.scaleY;
				if(btnSaveWord.cloneWriteCanvas && btnSaveWord.cloneWriteCanvas.parent) {
					view_.removeChild(btnSaveWord.cloneWriteCanvas);
				}
				view_.addChild(cloneWriteCanvas_);
				btnSaveWord.cloneWriteCanvas = cloneWriteCanvas_;
			}
		}
		this.addMyEventListener = function(){
			view.addEventListener("mousedown", handleMouseDown, false);
			view.addEventListener("pressup", handleMouseUp, false);
		}
		this.removeMyEventListener = function(){
			view.removeEventListener("mousedown", handleMouseDown, false);
			view.removeEventListener("pressup", handleMouseUp, false);
		}

		function init() {
			var mask = new createjs.Shape();
			mask.graphics.beginFill("#fff");
			mask.graphics.drawRect(0, 0, scrollbarListWidth, scrollbarHeight + 4);
			scrollbarList.addChild(mask);

			list.x = 0;
			list.y = 0;
			scrollbarList.addChild(list);
			scrollbarList.list = list;
			list.mask = mask;
			var item;
			for(var i = 0; i < itemNum; i++) {
				item = new lib.uiFourWireItem();
				item.x = 0;
				item.y = (scrollbarItemHeight) * i;
				list.addChild(item);
				items.push(item);
			}
			var clickArea = new createjs.Shape();
			clickArea.graphics.beginFill("#E1DEDD");
			clickArea.graphics.drawRoundRect(0, 0, 100, 358, 20);

			scrollbar.graphics.beginFill("#E1DEDD");
			scrollbar.graphics.drawRoundRect(0, 0, 25, 358, 20);
			scrollbar.x = scrollbarListWidth + 10;
			scrollbar.y = 0;
			scrollbar.hitArea = clickArea;
			scrollbarList.addChild(scrollbar);
			scrollbarList.scrollbar = scrollbar;
			scrollbar.scaleY = scrollbarHeight / (scrollbarItemHeight * itemNum);
			scrollbarMaxY = scrollbarHeight - scrollbar.scaleY * scrollbarHeight;

			scrollbar.addEventListener("mousedown", onMouseDown, false);

			var btnTop = scrollbarList.btnTop;
			btnTop.curosr = "pointer";
			btnTop.visible = false;
			btnTop.addEventListener("click", function(e) {
				e.stopPropagation();
				scrollbar.y -= 100;
				moveScrollbarY(scrollbar.y);
			}, false);
			var btnBottom = scrollbarList.btnBottom;
			btnBottom.curosr = "pointer";
			btnBottom.visible = false;
			btnBottom.addEventListener("click", function(e) {
				e.stopPropagation();
				scrollbar.y += 100;
				moveScrollbarY(scrollbar.y);
			}, false);
			drawingCanvas = new createjs.Shape();
			drawingCanvas.x = 0;
			drawingCanvas.y = 0;
			scrollbarList.list.addChild(drawingCanvas);
		}

		function onMouseDown(e) {
			e.stopPropagation();
			var pt = scrollbarList.globalToLocal(stage.mouseX, stage.mouseY);
			scrollbarOffsetY = pt.y - scrollbarCurY;
			scrollbar.y = pt.y - scrollbarOffsetY;
			//				list.y = 0 - scrollbar.y / scrollbar.scaleY;
			scrollbar.addEventListener("pressmove", onPressMove, false);
			scrollbar.addEventListener("pressup", onPressUp, false);
		}

		function onPressMove(e) {
			e.stopPropagation();
			var pt = scrollbarList.globalToLocal(stage.mouseX, stage.mouseY);
			moveScrollbarYMove(pt.y);
		}

		function onPressUp(e) {
			e.stopPropagation();
			var pt = scrollbarList.globalToLocal(stage.mouseX, stage.mouseY);
			moveScrollbarYUp(pt.y);
			scrollbar.removeEventListener("pressmove", onPressMove, false);
			scrollbar.removeEventListener("pressup", onPressUp, false);
		}

		function moveScrollbarYMove(y_) {
			if(scrollbar.y < 100) {
				page = 0;
			}
			if(scrollbar.y > 80) {
				page = 1;
			}
			if(scrollbar.y > 180) {
				page = 2;
			}
			if(y_ > scrollbarMaxY + scrollbarOffsetY) {
				scrollbar.y = scrollbarMaxY;
				list.y = 0 - scrollbar.y / scrollbar.scaleY;
			} else if(y_ <= scrollbarOffsetY) {
				scrollbar.y = 0;
				list.y = 0;
			} else if(y_ > scrollbarHeight / 3 + 20 && y_ < scrollbarHeight / 3 + 60) {
				scrollbar.y = y_ - scrollbarOffsetY;
				list.y = -372;
			} else if(y_ > scrollbarHeight * 2 / 3 + 50) {
				scrollbar.y = y_ - scrollbarOffsetY;
				list.y = -745;
			} else {
				scrollbar.y = y_ - scrollbarOffsetY;
				list.y = 0 - scrollbar.y / scrollbar.scaleY;
			}
			if(list.y < -745) {
				list.y = -745;
			}
			scrollbarCurY = scrollbar.y;
		}

		function moveScrollbarYUp(y_) {
			if(y_ > scrollbarMaxY + scrollbarOffsetY) {
				scrollbar.y = scrollbarMaxY;
				list.y = 0 - scrollbar.y / scrollbar.scaleY;
			} else if(y_ <= scrollbarOffsetY) {
				scrollbar.y = 0;
				list.y = 0;
			} else if(y_ > scrollbarHeight / 3 + 20 && y_ < scrollbarHeight / 3 + 40) {
				scrollbar.y = y_ - scrollbarOffsetY;
				list.y = -372;
			} else if(y_ > scrollbarHeight * 2 / 3 + 50) {
				scrollbar.y = y_ - scrollbarOffsetY;
				list.y = -745;
			} else {
				scrollbar.y = y_ - scrollbarOffsetY;
				list.y = 0 - scrollbar.y / scrollbar.scaleY;
			}
			scrollbarCurY = scrollbar.y;
			if(list.y < -745) {
				list.y = -745;
			}
		}

		function handleMouseDown(event) {
			if(!event.primary) {
				return;
			}
			var pt = drawingCanvas.globalToLocal(stage.mouseX, stage.mouseY);
			if(pt.x < 0 || pt.x > limitRight || pt.y < page * scrollbarItemHeight || pt.y > scrollbarItemHeight * (page + 1)) {
				return;
			}
			oldPt = drawingCanvas.globalToLocal(stage.mouseX, stage.mouseY);
			oldMidPt = oldPt.clone();
			view.addEventListener("pressmove", handleMouseMove, false);
		}

		function handleMouseMove(event) {
			if(!event.primary) {
				return;
			}
			var pt = drawingCanvas.globalToLocal(stage.mouseX, stage.mouseY);
			if(pt.x < 0 || pt.x > limitRight || pt.y < page * scrollbarItemHeight || pt.y > scrollbarItemHeight * (page + 1)) {
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
			view.removeEventListener("pressmove", handleMouseMove, false);
		}

	}

	window.ui.ScrollbarListContainer = ScrollbarListContainer;
})();