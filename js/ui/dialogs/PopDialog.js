(function () {
    window.ui = window.ui || {};
	
    var PopDialog = function (spriteSheet_) {
    	this.spriteSheet = spriteSheet_;
    }
    
    window.VIEW_WIDTH = 1280;
    
    var p = PopDialog.prototype = new createjs.Container();
    p.POP_ANSWER = 'PopAnswerDialog';
	p.POP_HELP = 'PopHelpDialog';

    p.Container_initialize = p.initialize;

    p.initialize = function () {
        this.Container_initialize();
        
        var mask = new createjs.Shape();
        mask.graphics.beginFill(createjs.Graphics.getRGB(0, 0, 0, 0.5));
        mask.graphics.drawRect(0, 0, 1280, 720);
        mask.x = 0;
        mask.y = 0;
        this.addChild(mask);
        
        var mask1_ = new createjs.Shape();
        mask1_.graphics.beginFill(createjs.Graphics.getRGB(0, 0, 0, 0.6));
        mask1_.graphics.drawRect(0, 0, 1088, 588);
        mask1_.x = 96;
        mask1_.y = 56;
        this.addChild(mask1_);
        
        var mask1 = new createjs.Shape();
        mask1.graphics.beginFill(createjs.Graphics.getRGB(234, 234, 234, 1));
        mask1.graphics.drawRect(0, 0, 1080, 580);
        mask1.x = 100;
        mask1.y = 60;
        this.addChild(mask1);
        
        var mask2 = new createjs.Shape();
        mask2.graphics.beginFill(createjs.Graphics.getRGB(255, 255, 255, 1));
        mask2.graphics.drawRect(0, 0, 1080, 500);
        mask2.x = 100;
        mask2.y = 100;
        this.addChild(mask2);
        
        var mask3 = new createjs.Shape();
        mask3.graphics.beginFill(createjs.Graphics.getRGB(227, 227, 227, 1));
        mask3.graphics.drawRect(0, 0, 880, 470);
        mask3.x = 210;
        mask3.y = 120;
        this.addChild(mask3);
        
        var mask4 = new createjs.Shape();
        mask4.graphics.beginFill(createjs.Graphics.getRGB(183, 184, 187, 1));
        mask4.graphics.drawRect(0, 0, 880, 470);
        mask4.x = 200;
        mask4.y = 110;
        this.addChild(mask4);

        //closebtn
        var btnClose;
        btnClose = new ui.SpriteSheetButton(this.spriteSheet, 'close');
        btnClose.set({ x: 1170, y: 50 });
        this.addChild(btnClose);
        btnClose.cursor = "pointer";
        btnClose.on("click", function() {
            this.parent.removeChild(this);
        }, this);
        //logo
        var logo = new createjs.Sprite(this.spriteSheet, "logo-up");
        logo.set({ x: 106, y: 64, scaleX: 0.8, scaleY: 0.8 });
        this.addChild(logo);
    }
    
    p.show = function(type, stage_){
        if(type === this.POP_HELP){
        	if(!this[this.POP_HELP]){
        		this.initialize();
	            var text = new createjs.Text("操作提示", "40px 汉仪大黑简", "#000");
	            text.x = window.VIEW_WIDTH/2;
	            text.textAlign = "center";
	            text.y = 220;
	            this.addChild(text);
	            
	            var text1 = new createjs.Text("请把算式拖到你认为正确的位置。", "28px 汉仪中黑简", "#000");
	            text1.x = window.VIEW_WIDTH/2;
	            text1.textAlign = "center";
	            text1.y = 360;
	            this.addChild(text1);
        	}
        }else if(type === this.POP_ANSWER){
        	if(!this[this.POP_ANSWER]){
        		this.initialize();
        		var text = new createjs.Text("参考答案", "40px 汉仪大黑简", "#000");
	            text.x = window.VIEW_WIDTH/2;
	            text.textAlign = "center";
	            text.y = 180;
	            this.addChild(text);
	            
	            var answerImg = new createjs.Bitmap('images/AnswerImg.png');
	            answerImg.x = 260;
	            answerImg.y = 260;
	            this.addChild(answerImg);
        	}
        }
        stage_.addChild(this);
    }
    
    window.ui.PopDialog = PopDialog;
})();
