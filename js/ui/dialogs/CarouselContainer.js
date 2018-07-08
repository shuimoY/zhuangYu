(function() {
	window.ui = window.ui || {};
	var CarouselContainer = function(view_, lib_, lessonData_, name_, startIndex_) {
		var carousel = view_;
		var lib = lib_;
		var lessonData = lessonData_;
		var picWid = 712;
		var picHei = 462;
		var picLength = 2;
		var items = [];
		var btns = [];
		var item;
		var nextItem;
		var itemIndex = 0;
		var flag=1;
		init();
		
		function init(){
			carousel.removeAllChildren();
			var mask = new createjs.Shape();
			mask.graphics.beginFill("#fff");
			mask.graphics.drawRect(0, 0, picWid, picHei);
			carousel.addChild(mask);
			var list = new createjs.Container();
			carousel.kuang.x-=10;
			carousel.kuang.y-=10;
			carousel.list = list;
			carousel.addChild(list);
			carousel.list.mask = mask;
			
			var bitmap;
			var btnCarousel;
			
			var btnLeft=new lib.uiBtnLeftImg();
			var btnRight=new lib.uiBtnRightImg();
			btnLeft.x=0;
			btnLeft.y=picHei/2-20;
			btnRight.x=picWid-55 ;
			btnRight.y=picHei/2-20;
			carousel.addChild(btnLeft);
			carousel.addChild(btnRight);
			btnLeft.mouseChildren = false;
			btnRight.mouseChildren = false;
			btnLeft.addEventListener("click", clickBtnCarousel, false);
			btnRight.addEventListener("click", clickBtnCarousel, false);
			
			var buttomMask = new createjs.Shape();
			buttomMask.y=picHei-70;
			buttomMask.alpha = 0.4;
			buttomMask.graphics.beginFill("#666");
			buttomMask.graphics.drawRect(0, 0, picWid, 70);
			carousel.addChild(buttomMask);
	
			var lessonStr = "";
			for(var i = 0; i < picLength; i++) {
				if(lessonData.lessonId == -1){
					lessonStr = "suenva_" + lessonData.suenvaId;
				}else{
					lessonStr = "lesson_" + lessonData.lessonId;
				}
				if(name_.indexOf("Ex") != -1){
					bitmap = new createjs.Bitmap(window.PIC_PATH + lessonStr + "/" + "carousel_ex_" + (i + startIndex_) + ".jpg");
				}else{
					bitmap = new createjs.Bitmap(window.PIC_PATH + lessonStr + "/" + "carousel_" + (i + startIndex_) + ".jpg");
				}
				bitmap.x = i * picWid; 
				bitmap.y = 0;
				list.addChild(bitmap);
				items.push(bitmap);
				btnCarousel = new lib.uiBtnScrollbarListCircle();
				btnCarousel.key = i;
				btnCarousel.x =(i+1)*picWid/(4*picLength+4)+picWid*3/8;
//				btnCarousel.x = (picWid - 2 * 80)/2 + i * 80 - 10;
//				if(i == 1){
//				btnCarousel.x = (picWid - 2 * 80)/2 + i * 80 + 50;	
//				}
				btnCarousel.y = picHei-40;
				carousel.addChild(btnCarousel);
				btns.push(btnCarousel);
				btnCarousel.mouseChildren = false;
//				btnCarousel.addEventListener("click", clickBtnCarousel, false);
			}
			
		}

		
		function clickBtnCarousel(e) {
			
			var btn = e.target;
			for(var i = 0; i < picLength; i++) {
				items[i].x = i * picWid;
				btns[i].gotoAndStop(0);
			}
			flag=(flag+1)%picLength;
			itemIndex = btn.x==0?0:1;
			item = items[flag];
			item.x = 0;
			btns[flag].gotoAndStop(1);
			nextItem = items[(flag + 1) % picLength];
			if(itemIndex==0){
				nextItem.x = -picWid;
				createjs.Tween.get(item, {
					override: true
				}).to({
					x: picWid
				}, 1000).addEventListener("change", handleChange);
			}else{
				nextItem.x = picWid;
				createjs.Tween.get(item, {
					override: true
				}).to({
					x: -picWid
				}, 1000).addEventListener("change", handleChange);
			}
		}

		function handleChange(e) {
			if(itemIndex==0){
				nextItem.x = item.x - picWid;
			}else{
				nextItem.x = item.x + picWid;
			}
			if(item.x <= -picWid) {
				itemIndex++;
			}
		}

		
		this.addCarousel = function() {
		}
		this.removeCarousel = function() {
		}
	}

	window.ui.CarouselContainer = CarouselContainer;
})();
