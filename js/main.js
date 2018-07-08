(function() {
	var app = {
		initialize: function() {
			//      this.bindEvents();
			this.receivedEvent();
		},
		bindEvents: function() {
			document.addEventListener('deviceready', this.onDeviceReady, false);
		},
		onDeviceReady: function() {
			app.receivedEvent('deviceready');
		},
		receivedEvent: function(id) {
			window.onload = function() {
				var utils = createjs.utils;
				utils.onStart = onGameStart;
				var config = {};
				utils.init(config);
			};

			function onGameStart(exportRoot_, lib_, stage_, sprites) {
				stage = stage_;
				root = exportRoot_;

				createjs.Touch.enable(stage);
				stage.enableMouseOver(10);
				stage.enableDOMEvents(true);
				stage.mouseMoveOutside = true;
				//			createjs.RotationPlugin.install();

				window.mainSceneManager.init(lib_, stage_);
				createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
				createjs.Ticker.framerate = 30;
				createjs.Ticker.addEventListener("tick", stage);
			}
		}
	};
	app.initialize();
}());