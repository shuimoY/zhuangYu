(function(cjs) {
	cjs.utils = {};
	var _self = this;

	//createjs
	var canvas, stage, exportRoot;
	var gameContainer;
	var domContainer;
	var context;
	var loader = null;
	var sprites;
	//stage update flag
	var update = false;

	//settings
	var defaultConfig = {
		container: 'animation_container',
		canvas: 'canvas',
		width: 1920,
		height: 1080,
		autoRefresh: false,
		lib_name: 'index',
		loading: {
			bg: 'images/loading.png',
			progress: 'images/progress.png'
		},
		libs: [],
		modules: []
	};
	/*
	 * module instance & vars
	 */

	//loading
	var _loading = null;

	/*
	 * main
	 */
	function _setup(config) {
		extend(config, defaultConfig);
		domContainer = document.getElementById("dom_overlay_container");
		gameContainer = document.getElementById(defaultConfig["container"]);
		canvas = document.getElementById(defaultConfig["canvas"]);
		context = canvas.getContext('2d');
	}

	function isMobile() {
		var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		return isAndroid || isiOS;
	}

	function init() {
		//		var url = "../path.json";
		//		$.getJSON(url, function(data) {
		//			window.root=data.assetsTwoUrl;
		//			console.log(window.root);
		//		});

//		$.ajax({
//			type: "GET",
//			url: "http://172.19.11.165:8080/SVN/zhuangyu/path.json", //访问的链接
//			dataType: "json", //数据格式设置为jsonp
//			success: function(data) { //成功的回调函数
//				window.rootUrl = data.assetsTwoUrl;
//				window.assetsPath = window.rootUrl + "/assets/audio/";
//				window.PIC_PATH = window.rootUrl + "/assets/images/lessons/";
//				window.PIC_CHAPTER_PATH = window.rootUrl + "/assets/images/chapters/";
				initRoot();
//			},
//			error: function(e) {}
//		});
	}

	function initRoot() {
		onWindowResize();
		//		if(!isMobile()){
		window.onresize = onWindowResize;
		//		}
		showLoading();
		if(lib.properties.manifest.length == 0) {
			handleComplete(null);
		} else {
			images = images || {};
			sprites = sprites || {};

			loader = new cjs.LoadQueue(false);
			createjs.Sound.alternateExtensions = ["mp3"];
			loader.installPlugin(cjs.Sound);
			loader.addEventListener("complete", handleComplete);
			loader.addEventListener("fileload", handleFileLoad);
			loader.loadManifest(lib.properties.manifest);
		}
	}

	function handleFileLoad(evt) {
		if(evt.item.type == "image") {
			images[evt.item.id] = evt.result;
		}
		if(evt.item.type == "spritesheet") {
			sprites[evt.item.id] = evt.result;
		}
		setLoadProgress(parseInt(loader.progress * 100));
	}

	function handleComplete(evt) {
		var isAnimateCC = true;
		var root = ss;
		if(lib.hasOwnProperty(defaultConfig.lib_name)) {
			isAnimateCC = true;
			root = ss;
		} else {
			isAnimateCC = false;
			root = window;
		}
		if(evt) {
			var queue = evt.target;
			var ssMetadata = lib.ssMetadata;
			for(i = 0; i < ssMetadata.length; i++) {
				root[ssMetadata[i].name] = new createjs.SpriteSheet({
					"images": [queue.getResult(ssMetadata[i].name)],
					"frames": ssMetadata[i].frames,
					"animations": ssMetadata[i].animations,
				})
			}
		} else {}
		if(isAnimateCC) {
			exportRoot = new lib[defaultConfig.lib_name]();
			//			exportRoot.scaleX = exportRoot.scaleY = 0.5;
		} else {
			exportRoot = new cjs.Container();
		}
		stage = new cjs.Stage(canvas);
		stage.addChild(exportRoot);
		stage.update();

		//		cjs.Touch.enable(stage);

		//		cjs.Ticker.addEventListener("tick", tick);
		onWindowResize();
		if(cjs.utils.onStart) {
			cjs.utils.onStart.call(_self, exportRoot, lib, stage, sprites);
		}
		hideLoading();
	}

	function onWindowResize() {
		var ow = defaultConfig.width;
		var oh = defaultConfig.height;
		var gw = window.innerWidth;
		var gh = window.innerHeight;
		var originalRatio = ow / oh;
		var currentRatio = gw / gh;
		var w, h;
		if(currentRatio > originalRatio) {
			w = ow / oh * gh;
			h = gh;

			gameContainer.style.margin = '0 ' + (gw - w) * .5 + 'px';
		} else {
			w = gw;
			h = oh / ow * gw;
			gameContainer.style.margin = (gh - h) * .5 + 'px 0';
		}
		gameContainer.style.width = w + 'px';
		gameContainer.style.height = h + 'px';

		var ratio = getPixelRatio(context);

		//		w = defaultConfig.width;
		//		h = defaultConfig.height;

		domContainer.style.width = canvas.style.width = w + 'px';
		domContainer.style.height = canvas.style.height = h + 'px';
		domContainer.style.width = canvas.width = w * ratio;
		domContainer.style.height = canvas.height = h * ratio;

		if(stage) {
			stage.scaleX = w / ow * ratio;
			//			alert("ratio " + ratio + "stage.scaleX " + stage.scaleX);
			stage.scaleY = h / oh * ratio;
			stage.update();
			htmlFontSizeByScale(stage.scaleX);
		}
	}

	function htmlFontSizeByScale(scale_) {
		var fontSize = 10 * scale_ + "px";
		//		alert(fontSize);
		if(document.all) { // document.createStyleSheet(url)
			window.style = "html{font-size:" + fontSize + ";}";
			document.createStyleSheet("javascript:style");
		} else { //document.createElement(style)
			var style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML = "html{font-size:" + fontSize + ";}";
			document.getElementsByTagName('HEAD').item(0).appendChild(style);
		}
	}

	function tick(event) {
		if(defaultConfig.autoRefresh) {
			stage.update(event);
		} else {
			if(update) {
				update = false;
				stage.update(event);
			}
		}
	}

	/*
	 * loading
	 */
	function Loading() {
		this.el = null;
		this.img = null;
		this.text = null;
	}

	Loading.prototype._init = function() {
		this.el = newElement('div');
		gameContainer.appendChild(this.el);
		this.el.setAttribute('id', 'loading');

		var loadStyle = this.el.style;
		loadStyle.position = 'absolute';
		loadStyle.width = '100%';
		loadStyle.height = '100%';
		loadStyle.top = 0;
		loadStyle.left = 0;
		loadStyle.zIndex = "1000";
		loadStyle.display = 'none';

		this.initLoadingStyle({
			img: defaultConfig['loading'].bg,
			progress: defaultConfig['loading'].progress
		});
	}

	Loading.prototype.initLoadingStyle = function(opt) {
		var img = newElement('img');
		this.el.appendChild(img);
		img.src = opt.img;
		img.style.width = "100%";

		this.img = img;

		var text = newElement('div');
		this.el.appendChild(text);

		text.style.position = 'absolute';
		text.style.top = '48%';
		text.style.left = '28%';
		text.style.width = '44%';
		text.style.height = '4%';

		var imgProgress = newElement('img');
		text.appendChild(imgProgress);
		imgProgress.src = opt.progress;
		imgProgress.style.width = '0%';
		imgProgress.style.height = '100%';

		this.text = imgProgress;
	}

	Loading.prototype.show = function(isShowText) {
		this.el.style.display = 'block';

		isShowText = isShowText == undefined ? true : isShowText;
		if(isShowText) {
			this.text.style.display = "block";
		} else {
			this.text.style.display = "none";
		}
	}

	Loading.prototype.hide = function() {
		this.el.style.display = 'none';
	}

	Loading.prototype.setLoadProgress = function(percent) {
		this.text.style.width = percent + '%';
		if(stage) {
			stage.update();
		}
	}

	Loading.getInstance = function() {
		if(!_loading) {
			_loading = new Loading();
			_loading._init();
		}

		return _loading;
	}

	function _initLoading() {
		_loading = Loading.getInstance();
	}

	function showLoading(isShowText) {
		var loading = Loading.getInstance();
		loading.show();
	}

	function hideLoading() {
		var loading = Loading.getInstance();
		loading.hide();
	}

	function setLoadProgress(percent) {
		var loading = Loading.getInstance();
		loading.setLoadProgress(percent);
	}

	function setLoadingStyle(styleObj) {
		var text = Loading.getInstance().text;
		for(var prop in styleObj) {
			if(styleObj.hasOwnProperty(prop)) {
				text.style[prop] = styleObj[prop];
			}
		}
	}

	/*
	 * frames
	 */
	function prevFrame(timeline) {
		timeline = timeline || exportRoot;
		var frame = timeline.currentFrame;
		frame--;
		if(frame < 0) {
			frame = 0;
			return;
		}
		viewFrame(frame, timeline);
	}

	function nextFrame(timeline) {
		timeline = timeline || exportRoot;
		var frame = timeline.currentFrame;
		frame++;
		if(frame > timeline.totalFrames - 1) {
			frame = timeline.totalFrames - 1;
			return;
		}
		viewFrame(frame, timeline);
	}

	function getCurrentFrame(timeline) {
		timeline = timeline || exportRoot;
		return timeline.currentFrame;
	}

	function viewFrame(idx, timeline) {
		timeline = timeline || exportRoot;
		timeline.gotoAndStop(idx);
		// stopAllSounds();
	}

	/*
	 * event handle
	 */
	var on = function(obj, eventType, handleFunc) {
		obj.on(eventType, handleFunc);
	}

	/*
	 * Utils
	 */
	var extend = function(source, target) {
		for(var key in source) {
			if(source.hasOwnProperty(key)) {
				target[key] = source[key];
			}
		}

		return target;
	}

	var isString = function(obj) {
		return typeof obj == 'string' && Object.prototype.toString.call(obj) == '[object String]';
	}

	var newElement = function(name) {
		name = name.toString().toLocaleLowerCase();
		var element;
		switch(name) {
			case 'div':
				element = document.createElement('div');
				break;
			case 'span':
				element = document.createElement('span');
				break;
			case 'style':
				element = document.createElement('style');
				break;
			case 'audio':
				element = document.createElement('audio');
				break;
			case 'video':
				element = document.createElement('video');
				break;
			case 'img':
				element = document.createElement('img');
				break;
			default:
				element = document.createElement('div');
		}

		return element;
	};

	var getPixelRatio = function(context) {
		var backingStore = context.backingStorePixelRatio ||
			context.webkitBackingStorePixelRatio ||
			context.mozBackingStorePixelRatio ||
			context.msBackingStorePixelRatio ||
			context.oBackingStorePixelRatio ||
			context.backingStorePixelRatio || 1;

		return(window.devicePixelRatio || 1) / backingStore;
	};

	var parseAudioToDict = function(manifest, data) {
		manifest = manifest || [];
		manifest.forEach(function(item) {
			if(item.src.indexOf('.mp3') > -1) {
				data[item.id] = {
					play: false,
					instance: null,
					time: 0,
					sprite: null,
					callback: null
				};
			}
		});
	}

	function loadJS(url, callback) {
		var _doc = document.getElementsByTagName("head")[0];
		var script = document.createElement("script");
		script.setAttribute("type", "text/javascript");
		script.setAttribute("src", url);
		_doc.appendChild(script);
		script.onload = script.onreadystatechange = function() {
			if(!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
				callback();
			}
			script.onload = script.onreadystatechange = null
		}
	}

	//output
	cjs.utils = {
		init: function(config) {
			_setup(config);
			_initLoading();
			init();
		},

		//frame
		prevFrame: prevFrame,
		nextFrame: nextFrame,
		getCurrentFrame: getCurrentFrame,
		viewFrame: viewFrame,

		//event
		on: on
	};
})(createjs = createjs || {});