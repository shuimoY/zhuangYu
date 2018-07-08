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
(function() {

	window.data = window.data || {};

	var ChapterData = {};

	ChapterData = [{
			title: "",
			originalBookNum: "",
			pageNum: 1,
			bgMusicId: "00101.mp3",
			soundId: "00102.mp3",
			chapterIndex: 3,
			chapterId: 1,
			lessons: [{
					lessonIndex: 4,
					workbookIndex: 11,
					lessonId: 1,
					pageNum: 2,
					lessonName: "Saek Seizcou",
					titleSound: "00201z.mp3",
					originalBookNum: "2",
					paragraphs: ["00202.mp3", "00203.mp3", "00204.mp3", "00205.mp3", "00206.mp3"],
					words: {
						soundId: "00207.mp3",
						scripts: {
							"soundWord_1_0": [0.564, 1.785],
							"soundWord_1_1": [2.806, 3.547],
							"soundWord_1_2": [6.443, 7.143],
							"soundWord_1_3": [4.695, 5.495],
							"soundWord_1_4": [8.049, 8.900],
							"soundWord_1_5": [9.484, 10.395],
							"soundWord_1_6": [10.934, 12.425]
						}
					},
					//					exercises: {   //课后习题数据结构
					//						soundId: "00207.mp3",
					//						scripts: {
					//							"soundExercise_1_0": [0.564, 1.785],
					//							"soundExercise_1_1": [2.806, 3.547]
					//						}
					//					}
				},
				{
					lessonIndex: 25,
					workbookIndex: 34,
					lessonId: 2,
					pageNum: 2,
					lessonName: "Fwn Seizcou",
					titleSound: "00402z.mp3",
					originalBookNum: "4",
					paragraphs: ["00403.mp3", "00404.mp3", "00405.mp3", "00501.mp3", "00502.mp3", "00503.mp3"],
					words: {
						soundId: "00504.mp3",
						scripts: {
							"soundWord_2_0": [1.5, 2.3],
							"soundWord_2_1": [3.75, 4.6],
							"soundWord_2_2": [6.5, 7.4],
							"soundWord_2_3": [9.0, 10.0],
							"soundWord_2_4": [11.5, 12.35],
							"soundWord_2_5": [14.0, 14.84]
						}
					}
				},
				{
					lessonIndex: 47, //阅读课文的页数
					workbookIndex: 55, //?
					lessonId: 3,
					pageNum: 2,
					lessonName: "Fwen Va",
					titleSound: "00801z.mp3",
					originalBookNum: "8",
					paragraphs: ["00802.mp3", "00803.mp3"],
					words: {
						soundId: "00804.mp3",
						scripts: {
							"soundWord_3_0": [1.2, 2.4],
							"soundWord_3_1": [3.5, 4.2],
							"soundWord_3_2": [5.4, 6.0],
							"soundWord_3_3": [7.3, 7.9],
							"soundWord_3_4": [9.3, 10.0],
							"soundWord_3_5": [11.4, 12.2],
							"soundWord_3_6": [13.25, 14.0],
							"soundWord_3_7": [15.07, 15.56]
						}
					}
				},
				{
					lessonIndex: 70,
					workbookIndex: 6,
					lessonId: -1,
					suenvaId: 1,
					pageNum: 2,
					lessonName: "Suenva Yijvwnz It",
					titleSound: "",
					originalBookNum: "10",
					paragraphs: [],
					words: {
						soundId: "",
						scripts: {}
					},
					subjects: {
						3: { //第三部分
							2: { //第二题
								titleSoundId: "01101.mp3",
								sentences: {
									soundId: "01102z.mp3",
									scripts: {
										"soundSentence_1_3_2_0": [0.19, 6.3],
										"soundSentence_1_3_2_1": [6.7, 12],
									}
								}
							}
						}
					}
				},

			]
		},
		//2
		{
			title: "",
			originalBookNum: "", //第2课书上开始的页数
			pageNum: 3,
			bgMusicId: "00101.mp3",
			soundId: "01302.mp3", //标题音频
			chapterIndex: 2, //跳转页数
			chapterId: 2,
			lessons: [{
					lessonIndex: 80, //网页页面跳转的页数
					workbookIndex: 89,
					lessonId: 4,
					pageNum: 2,
					lessonName: "Vangz Yangh Raeuj Mbonq",
					titleSound: "01401z.mp3",
					originalBookNum: "14",
					paragraphs: ["01402.mp3", "01403.mp3", "01404.mp3", "01405.mp3", "01501.mp3"],
					words: {
						soundId: "01502.mp3",
						scripts: {
							"soundWord_4_0": [0.6, 1.7],
							"soundWord_4_1": [2.5, 3.8],
							"soundWord_4_2": [4.7, 5.5],
							"soundWord_4_3": [7.2, 8.0],
							"soundWord_4_4": [9.0, 9.9],
							"soundWord_4_5": [11.2, 12.1],
							"soundWord_4_6": [13.1, 14.1],
							"soundWord_4_7": [15.2, 16.2]
						}
					}
				},
				{
					lessonIndex: 103,
					workbookIndex: 114,
					lessonId: 5,
					pageNum: 2,
					lessonName: "Cangh Liengz Baiq Sae",
					titleSound: "01701z.mp3",
					originalBookNum: "17",
					paragraphs: ["01702.mp3", "01703.mp3", "01704.mp3", "01705.mp3", "01801.mp3", "01802.mp2", "01803.mp3"],
					words: {
						soundId: "01901.mp3",
						scripts: {
							"soundWord_5_0": [2, 3.14],
							"soundWord_5_1": [4.4, 5.2],
							"soundWord_5_2": [7.1, 7.8],
							"soundWord_5_3": [9.9, 10.8],
							"soundWord_5_4": [12.6, 13.5],
							"soundWord_5_5": [14.6, 15.6],
							"soundWord_5_6": [17.3, 18.3],
							"soundWord_5_7": [19.8, 20.5]
						}
					}
				},
				{
					lessonIndex: 124,
					workbookIndex: 132,
					lessonId: 6,
					pageNum: 2,
					lessonName: "Gaej Lumz Cingz Bohmeh",
					titleSound: "02102z.mp3",
					originalBookNum: "21",
					paragraphs: ["02103.mp3", "02104.mp3", "02201.mp3"],
					words: {
						soundId: "02202.mp3",
						scripts: {
							"soundWord_6_0": [0.6, 1.0],
							"soundWord_6_1": [2.2, 2.8],
							"soundWord_6_2": [3.6, 4.3],
							"soundWord_6_3": [5.3, 5.8],
							"soundWord_6_4": [6.8, 7.36],
							"soundWord_6_5": [8.6, 9.3],
							"soundWord_6_6": [10.2, 11.0],
							"soundWord_6_7": [12, 12.7],
						}
					}
				},
				{
					lessonIndex: 148,
					workbookIndex: 148,
					lessonId: -1,
					suenvaId: 2,
					pageNum: 2,
					lessonName: "Suenva Yijvwnz Ngeih",
					titleSound: "00201.mp3",
					originalBookNum: "24",
					paragraphs: [],
					words: {
						soundId: "",
						scripts: {}
					},
					subjects: {
						1: { //第三部分
							2: { //第二题
								titleSoundId: "02401.mp3",
								sentences: {
									soundId: "02402.mp3",
									scripts: {
										"soundSentence_2_1_2_0": [0.74, 1.86],
										"soundSentence_2_1_2_1": [2.8, 3.5],
										"soundSentence_2_1_2_2": [4.7, 5.6],
										"soundSentence_2_1_2_3": [6.6, 7.6],
										"soundSentence_2_1_2_4": [8.6, 9.5],
										"soundSentence_2_1_2_5": [10.6, 11.5],
										"soundSentence_2_1_2_6": [12.6, 13.7],
										"soundSentence_2_1_2_7": [14.7, 15.5],
										"soundSentence_2_1_2_8": [16.7, 17.7],
										"soundSentence_2_1_2_9": [18.7, 19.8],
										"soundSentence_2_1_2_10": [21, 22],
										"soundSentence_2_1_2_11": [23, 23.8]
									}
								}
							}
						},
						3: {
							2: {
								titleSoundId: "02501.mp3",
								sentences: {
									soundId: "02502z.mp3",
									scripts: {
										"soundSentence_2_3_2_0": [0.5, 4.85],
										"soundSentence_2_3_2_1": [5.3, 12.6],
										"soundSentence_2_3_2_2": [13.3, 20.3]
									}
								}
							},
							3: {
								titleSoundId: "02602.mp3",
								sentences: {
									soundId: "02603z.mp3",
									scripts: {
										"soundSentence_2_3_3_0": [1, 5],
										"soundSentence_2_3_3_1": [5.2, 9.5],
										"soundSentence_2_3_3_2": [9.5, 14],
										"soundSentence_2_3_3_3": [14.2, 19]
									}
								}
							}
						}
					}
				},

			]
		},
		//3
		{
			title: "",
			originalBookNum: "",
			pageNum: 2,
			bgMusicId: "02801.mp3",
			soundId: "02701.mp3",
			chapterIndex: 3,
			chapterId: 3,
			lessons: [{
					lessonIndex: 159,
					workbookIndex: 170,
					lessonId: 7,
					pageNum: 2,
					lessonName: "Faeg Gyaeq",
					titleSound: "02802z.mp3",
					originalBookNum: "28",
					paragraphs: ["02803.mp3", "02804.mp3", "02901.mp3", "02902.mp3", "02903.mp3", "02904.mp3", "02905.mp3", "02906.mp3", "03001.mp3", "03002.mp3"],
					words: {
						soundId: "03003.mp3",
						scripts: {
							"soundWord_7_0": [0.8, 1.4],
							"soundWord_7_1": [2.67, 3.6],
							"soundWord_7_2": [4.7, 5.3],
							"soundWord_7_3": [6.9, 8.0],
							"soundWord_7_4": [9.5, 10.2],
							"soundWord_7_5": [11.5, 12.6],
							"soundWord_7_6": [13.7, 14.2],
							"soundWord_7_7": [15.4, 16.1],
						}
					}
				},
				{
					lessonIndex: 182,
					workbookIndex: 192,
					lessonId: 8,
					pageNum: 2,
					lessonName: "Lij Sw’gvangh Daem Haeux",
					titleSound: "03201z.mp3",
					originalBookNum: "32",
					paragraphs: ["03202.mp3", "03203.mp3", "03204.mp3", "03205.mp3", "03206.mp3", "03207.mp3", "03301.mp3", "03302.mp3"],
					words: {
						soundId: "03303.mp3",
						scripts: {
							"soundWord_8_0": [0.6, 1.3],
							"soundWord_8_1": [2.8, 3.5],
							"soundWord_8_2": [4.7, 5.1],
							"soundWord_8_3": [6.3, 7.0],
							"soundWord_8_4": [8.2, 9.0],
							"soundWord_8_5": [10.0, 10.9],
							"soundWord_8_6": [12.0, 12.5],
							"soundWord_8_7": [13.6, 14.4],
						}
					}
				},
				{
					lessonIndex: 204,
					workbookIndex: 213,
					lessonId: 9,
					pageNum: 2,
					lessonName: "Vahsug",
					titleSound: "03501z.mp3",
					originalBookNum: "35",
					paragraphs: ["03502.mp3", "03503.mp3", "03504.mp3", "03505.mp3"],
					words: {
						soundId: "03506.mp3",
						scripts: {
							"soundWord_9_0": [0.7, 1.3],
							"soundWord_9_1": [2.1, 2.8],
							"soundWord_9_2": [3.7, 4.36],
							"soundWord_9_3": [5.34, 6.0],
							"soundWord_9_4": [7.0, 7.7],
							"soundWord_9_5": [8.7, 9.5],
							"soundWord_9_6": [10.4, 11.3],
							"soundWord_9_7": [12.4, 13.3]
						}
					},
					exercises: { //课后习题数据结构
						soundId: "03501z.mp3",
						scripts: {
							"soundExercise_9_0": [3.3, 9.5],
							"soundExercise_9_1": [19, 25],
						}
					}
				},
				{
					lessonIndex: 226,
					workbookIndex: 226,
					lessonId: -1,
					suenvaId: 3,
					pageNum: 2,
					lessonName: "Suenva Yijvwnz Sam",
					titleSound: "00201.mp3",
					originalBookNum: "37",
					paragraphs: [],
					words: {
						soundId: "",
						scripts: {}
					},
					subjects: {
						1: { //第三部分
							2: { //第二题
								titleSoundId: "03701.mp3",
								sentences: {
									soundId: "03702.mp3",
									scripts: {
										"soundSentence_3_1_2_0": [0.6, 1.34],
										"soundSentence_3_1_2_1": [2.6, 3.15],
										"soundSentence_3_1_2_2": [4.4, 5.27],
										"soundSentence_3_1_2_3": [6.4, 7.3],
										"soundSentence_3_1_2_4": [8.48, 9],
										"soundSentence_3_1_2_5": [10, 11.1],
										"soundSentence_3_1_2_6": [12.2, 12.6],
										"soundSentence_3_1_2_7": [13.8, 14.8],
										"soundSentence_3_1_2_8": [16, 16.5],
										"soundSentence_3_1_2_9": [17.7, 18.7],
										"soundSentence_3_1_2_10": [20, 20.5],
									}
								}
							}
						},
						3: {
							2: {
								titleSoundId: "03801.mp3",
								sentences: {
									soundId: "03802z.mp3",
									scripts: {
										"soundSentence_3_3_2_0": [0, 10],
										"soundSentence_3_3_2_1": [10.6, 23],
									}
								}
							},
						}
					}
				},
			]
		},

		//4
		{
			title: "",
			originalBookNum: "",
			pageNum: 4,
			bgMusicId: "00000.mp3",
			soundId: "04001.mp3",
			chapterIndex: 3,
			chapterId: 4,
			lessons: [{
					lessonIndex: 239,
					workbookIndex: 248,
					lessonId: 10,
					pageNum: 2,
					lessonName: "Duzguk Caeuq Duzgoep",
					titleSound: "04101z.mp3",
					originalBookNum: "41",
					paragraphs: ["04102.mp3", "04103.mp3", "04104.mp3", "04105.mp3", "04106.mp3", "04107.mp3", "04201.mp3", "04202.mp3", "04203.mp3", "04204.mp3"],
					words: {
						soundId: "04205.mp3",
						scripts: {
							"soundWord_10_0": [0.47, 1.0],
							"soundWord_10_1": [2.8, 3.8],
							"soundWord_10_2": [5.0, 5.8],
							"soundWord_10_3": [7.1, 7.6],
							"soundWord_10_4": [9.4, 10.4],
							"soundWord_10_5": [11.6, 12.6],
							"soundWord_10_6": [15.8, 16.8],
							"soundWord_10_7": [18.4, 19.4],
							"soundWord_10_8": [20.8, 21.38]
						}
					}
				},
				{
					lessonIndex: 259,
					workbookIndex: 270,
					lessonId: 11,
					pageNum: 2,
					lessonName: "Gomiuz Vihmaz Mbouj Gag Ma Ranz Lo",
					titleSound: "04401z.mp3",
					originalBookNum: "44",
					paragraphs: ["04402.mp3", "04403.mp3", "04404.mp3", "04405.mp3", "04501.mp3", "04502.mp3"],
					words: {
						soundId: "04601.mp3",
						scripts: {
							"soundWord_11_0": [0.7, 1.5],
							"soundWord_11_1": [2.6, 3.3],
							"soundWord_11_2": [4.4, 5.2],
							"soundWord_11_3": [6, 6.5],
							"soundWord_11_4": [6.7, 8.2],
							"soundWord_11_5": [9.1, 9.9],
							"soundWord_11_6": [11, 11.43],
							"soundWord_11_7": [12.34, 13.12]
						}
					}
				},
				{
					lessonIndex: 281,
					workbookIndex: 288,
					lessonId: 12,
					pageNum: 2,
					lessonName: "Vahsug",
					titleSound: "04801z.mp3",
					originalBookNum: "48",
					paragraphs: ["04802.mp3", "04803.mp3", "04804.mp3", "04901.mp3"],
					words: {
						soundId: "04902.mp3",
						scripts: {
							"soundWord_12_0": [0.76, 1.88],
							"soundWord_12_1": [3.3, 4.4],
							"soundWord_12_2": [5.6, 6.2],
							"soundWord_12_3": [7.6, 8.4],
							"soundWord_12_4": [9.9, 10.8],
							"soundWord_12_5": [11.9, 12.4]
						}
					}
				},
				{
					lessonIndex: 301,
					workbookIndex: 301,
					lessonId: -1,
					suenvaId: 4,
					pageNum: 2,
					lessonName: "Suenva Yijvwnz Seiq",
					titleSound: "",
					originalBookNum: "51",
					paragraphs: [],
					words: {
						soundId: "",
						scripts: {}
					},
					subjects: {
						1: { //第三部分
							2: { //第二题
								titleSoundId: "05101.mp3",
								sentences: {
									soundId: "05102.mp3",
									scripts: {
										"soundSentence_4_1_2_0": [0.68, 1.5],
										"soundSentence_4_1_2_1": [2.9, 3.4],
										"soundSentence_4_1_2_2": [4.8, 5.7],
										"soundSentence_4_1_2_3": [6.8, 7.9],
										"soundSentence_4_1_2_4": [9.17, 10.14],
										"soundSentence_4_1_2_5": [11.14, 12.11],
										"soundSentence_4_1_2_6": [13.3, 13.8],
										"soundSentence_4_1_2_7": [14.9, 16],
										"soundSentence_4_1_2_8": [17, 17.7],
										"soundSentence_4_1_2_9": [18.3, 19.3],
									}
								}
							}
						},
						2: {
							3: {
								titleSoundId: "05201.mp3",
								sentences: {
									soundId: "05202z.mp3",
									scripts: {
										"soundSentence_4_2_3_0": [0.67, 10],
										"soundSentence_4_2_3_1": [10.5, 19],
									}
								}
							},
						},
						3: {
							3: {
								titleSoundId: "05301.mp3",
								sentences: {
									soundId: "05302z.mp3",
									scripts: {
										"soundSentence_4_3_3_0": [0, 6],
										"soundSentence_4_3_3_1": [6.5, 12],
										"soundSentence_4_3_3_2": [12.2, 18],
										"soundSentence_4_3_3_3": [18.4, 24],
										"soundSentence_4_3_3_4": [24.6, 31],
									}
								}
							},
						}
					}
				},
			]
		},
		{
			title: "",
			originalBookNum: "",
			pageNum: 5,
			bgMusicId: "05601.mp3",
			soundId: "05501.mp3",
			chapterIndex: 3,
			chapterId: 5,
			lessons: [{
					lessonIndex: 315,
					workbookIndex: 324,
					lessonId: 13,
					pageNum: 2,
					lessonName: "Duzbaeu Caeuq Roegdingdiuj",
					titleSound: "05602z.mp3",
					originalBookNum: "56",
					paragraphs: ["05603.mp3", "05604.mp3", "05605.mp3", "05606.mp3", "05701.mp3", "05702.mp3"],
					words: {
						soundId: "05703.mp3",
						scripts: {
							"soundWord_13_0": [0.86, 1.66],
							"soundWord_13_1": [3, 4],
							"soundWord_13_2": [5.8, 6.23],
							"soundWord_13_3": [7.83, 8.12],
							"soundWord_13_4": [9.86, 10.64],
							"soundWord_13_5": [12, 13],
							"soundWord_13_6": [14.56, 15.5],
							"soundWord_13_7": [16.94, 17.86]
						}
					}
				},
				{
					lessonIndex: 340,
					workbookIndex: 350,
					lessonId: 14,
					pageNum: 2,
					lessonName: "Beixnuengx Ndaem Gva",
					titleSound: "05901z.mp3",
					originalBookNum: "59", //课文插图背景音乐 06001
					paragraphs: ["05902.mp3", "05903.mp3", "05904.mp3", "05905.mp3", "06002.mp3", "06003.mp3", "06004.mp3", "06101.mp3"],
					words: {
						soundId: "06102.mp3",
						scripts: {
							"soundWord_14_0": [1, 1.8],
							"soundWord_14_1": [3, 3.65],
							"soundWord_14_2": [4.85, 5.5],
							"soundWord_14_3": [6.8, 7.5],
							"soundWord_14_4": [8.56, 9.5],
							"soundWord_14_5": [10.5, 11.37],
							"soundWord_14_6": [12.38, 13.22],
							"soundWord_14_7": [14.5, 15.6],
							"soundWord_14_8": [17, 17.43],
							"soundWord_14_9": [18.7, 19.34],
						}
					}
				},
				{
					lessonIndex: 361,
					workbookIndex: 371,
					lessonId: 15,
					pageNum: 2,
					lessonName: "Cam Doenghgo",
					titleSound: "06401z.mp3",
					originalBookNum: "64", //课文插图背景音乐 06501
					paragraphs: ["06402.mp3", "06403.mp3", "06404.mp3", "06405.mp3", "06502.mp3", "06503.mp3"],
					words: {
						soundId: "06504.mp3",
						scripts: {
							"soundWord_15_0": [0.8, 1.8],
							"soundWord_15_1": [2.29, 3.56],
							"soundWord_15_2": [4.5, 5.5],
							"soundWord_15_3": [6.7, 7.38],
							"soundWord_15_4": [8.4, 9.4],
							"soundWord_15_5": [10.6, 11.5],
							"soundWord_15_6": [12.3, 13],
							"soundWord_15_7": [14, 15],
						}
					}
				},
				{
					lessonIndex: 387,
					workbookIndex: 387,
					lessonId: -1,
					suenvaId: 5,
					pageNum: 2,
					lessonName: "Suenva Yijvwnz Haj",
					titleSound: "",
					originalBookNum: "68",
					paragraphs: [],
					words: {
						soundId: "",
						scripts: {}
					},
					subjects: {
						1: { //第三部分
							1: { //第二题
								titleSoundId: "06801.mp3",
								sentences: {
									soundId: "06802.mp3",
									scripts: {
										"soundSentence_5_1_1_0": [0.9, 1.6],
										"soundSentence_5_1_1_1": [2.8, 4],
										"soundSentence_5_1_1_2": [5.2, 6, ],
										"soundSentence_5_1_1_3": [7.4, 8.4],
										"soundSentence_5_1_1_4": [10, 10.64],
										"soundSentence_5_1_1_5": [11.94, 12.65],
										"soundSentence_5_1_1_6": [14.2, 15.1],
										"soundSentence_5_1_1_7": [16.5, 17.4],
										"soundSentence_5_1_1_8": [18.8, 19.6],
									}
								}
							},
							4: {
								titleSoundId: "06803.mp3",
								sentences: {
									soundId: "06804z.mp3",
									scripts: {
										"soundSentence_5_1_4_0": [1, 14.36],
										"soundSentence_5_1_4_1": [15, 27.6],
									}
								}
							},
						},
						3: {
							1: {
								titleSoundId: "07001.mp3",
								sentences: {
									soundId: "07002z.mp3",
									scripts: {
										"soundSentence_5_3_1_0": [1.1, 7.4],
										"soundSentence_5_3_1_1": [8, 14],
										"soundSentence_5_3_1_2": [14, 20],
										"soundSentence_5_3_1_3": [20, 25.5],
									}
								}
							},
							2: {
								titleSoundId: "07006.mp3",
								sentences: {
									soundId: "07007z.mp3",
									scripts: {
										"soundSentence_5_3_2_0": [0.6, 8.14],
										"soundSentence_5_3_2_1": [8.7, 20.2],
									}
								}
							},
							3: {
								titleSoundId: "07102.mp3",
								sentences: {
									soundId: "07103z.mp3",
									scripts: {
										"soundSentence_5_3_3_0": [0.6, 3.5],
										"soundSentence_5_3_3_1": [4.2, 7.6],
										"soundSentence_5_3_3_2": [7.6, 10.6],
									}
								}
							},
						}
					}
				},

			]
		},
		{
			title: "",
			originalBookNum: "",
			pageNum: 6,
			bgMusicId: "00000.mp3",
			soundId: "07201.mp3",
			chapterIndex: 3,
			chapterId: 6,
			lessons: [{
					lessonIndex: 403,
					workbookIndex: 411,
					lessonId: 16,
					pageNum: 2,
					lessonName: "Gamjgoeng",
					titleSound: "07301z.mp3",
					originalBookNum: "73",
					paragraphs: ["07302.mp3", "07303.mp3", "07304.mp3", "07401.mp3"],
					words: {
						soundId: "07402.mp3",
						scripts: {
							"soundWord_16_0": [0.5, 1.5],
							"soundWord_16_1": [2.7, 3.6],
							"soundWord_16_2": [5, 6],
							"soundWord_16_3": [7, 7.8],
							"soundWord_16_4": [8.9, 9.77],
							"soundWord_16_5": [10.9, 11.3],
							"soundWord_16_6": [12.6, 13.4],
							"soundWord_16_7": [14.5, 15.1],
						}
					}
				},
				{
					lessonIndex: 423,
					workbookIndex: 433,
					lessonId: 17,
					pageNum: 2,
					lessonName: "Dozveh Bangxdat Byaraiz",
					titleSound: "07601z.mp3",
					originalBookNum: "76",
					paragraphs: ["07602.mp3", "07603.mp3", "07604.mp3", "07701.mp3"],
					words: {
						soundId: "07702.mp3",
						scripts: {
							"soundWord_17_0": [1.2, 1.9],
							"soundWord_17_1": [3.6, 4.8],
							"soundWord_17_2": [5.7, 6.8],
							"soundWord_17_3": [7.5, 8.5],
							"soundWord_17_4": [9, 9.7],
							"soundWord_17_5": [11.18, 11.94],
							"soundWord_17_6": [13, 13.8],
							"soundWord_17_7": [15, 15.73],
						}
					}
				},
				{
					lessonIndex: 448,
					workbookIndex: 455,
					lessonId: 18,
					pageNum: 2,
					lessonName: "Vahsug",
					titleSound: "07901z.mp3",
					originalBookNum: "79",
					paragraphs: ["07902.mp3", "07903.mp3", "07904.mp3", "07905.mp3"],
					words: {
						soundId: "07906.mp3",
						scripts: {
							"soundWord_18_0": [0.5, 1.56],
							"soundWord_18_1": [2.58, 3.62],
							"soundWord_18_2": [4.5, 5.5],
							"soundWord_18_3": [6.24, 7],
							"soundWord_18_4": [7.7, 8.5],
							"soundWord_18_5": [9.32, 9.8],
							"soundWord_18_6": [10.8, 11.6],
							"soundWord_18_7": [12.6, 13.34],
						}
					}
				},
				{
					lessonIndex: 471,
					workbookIndex: 471,
					lessonId: -1,
					suenvaId: 6,
					pageNum: 2,
					lessonName: "Suenva Yijvwnz Roek",
					titleSound: "00201.mp3",
					originalBookNum: "81",
					paragraphs: [],
					words: {
						soundId: "",
						scripts: {}
					},
					subjects: {
						1: { //第三部分
							1: { //第二题
								titleSoundId: "08101.mp3",
								sentences: {
									soundId: "08102.mp3",
									scripts: {
										"soundSentence_6_1_1_0": [0.6, 1.58],
										"soundSentence_6_1_1_1": [2.8, 3.4],
										"soundSentence_6_1_1_2": [4.6, 5.6],
										"soundSentence_6_1_1_3": [6.6, 7.85],
										"soundSentence_6_1_1_4": [8.79, 9.33],
										"soundSentence_6_1_1_5": [10.6, 11.6],
										"soundSentence_6_1_1_6": [12.7, 13.2],
										"soundSentence_6_1_1_7": [14.4, 15.5],
										"soundSentence_6_1_1_8": [16.6, 17.2],
										"soundSentence_6_1_1_9": [18, 19.5],
										"soundSentence_6_1_1_10": [20.5, 21.5],
										"soundSentence_6_1_1_11": [22, 23.5],
										"soundSentence_6_1_1_12": [24, 25.5],
										"soundSentence_6_1_1_13": [26, 27],
										"soundSentence_6_1_1_14": [28, 29],
										"soundSentence_6_1_1_15": [30, 31],
										"soundSentence_6_1_1_16": [31.5, 33],
										"soundSentence_6_1_1_17": [33, 34.5],
										"soundSentence_6_1_1_18": [35.5, 37],
										"soundSentence_6_1_1_19": [37.5, 38.5],
										"soundSentence_6_1_1_20": [40, 41.5],
										"soundSentence_6_1_1_21": [42, 43],
										"soundSentence_6_1_1_22": [43.5, 45],
										"soundSentence_6_1_1_23": [45.5, 46.5],
										"soundSentence_6_1_1_24": [47.5, 48.5],
										"soundSentence_6_1_1_25": [49, 50],
										"soundSentence_6_1_1_26": [51, 52],
										"soundSentence_6_1_1_27": [52, 54],
										"soundSentence_6_1_1_28": [54.5, 55.5],
										"soundSentence_6_1_1_29": [56.5, 57.0]
									}
								}
							},
							3: {
								titleSoundId: "08105.mp3",
								sentences: {
									soundId: "08106z.mp3",
									scripts: {
										"soundSentence_6_1_3_0": [0.3, 6.5],
										"soundSentence_6_1_3_1": [7, 13],
									}
								}
							}
						},
						3: {
							4: {
								titleSoundId: "08401.mp3",
								sentences: {
									soundId: "08402z.mp3",
									scripts: {
										"soundSentence_6_3_4_0": [0.36, 5.5],
										"soundSentence_6_3_4_1": [5.5, 11.5],
										"soundSentence_6_3_4_2": [11.5, 17],
										"soundSentence_6_3_4_3": [17.3, 21.6],
									}
								}
							},
						}
					}
				},
			]
		}
		,{
			title: "",
			originalBookNum: "",
			pageNum: 6,
			bgMusicId: "00000.mp3",
			soundId: "07201.mp3",
			chapterIndex: 3,
			chapterId: 7,
			lessons: [
				{
					lessonIndex: 486,
					workbookIndex: 486,
					lessonId: 19,
					pageNum: 100,
					lessonName: "Genjcwzdiz Geiz Satbyai",
					titleSound: "",
					originalBookNum: "85",
					paragraphs: [],
					words: {
						soundId: "",
						scripts: {}
					}
				},
				{
					lessonIndex: 501,
					workbookIndex: 501,
					lessonId: 20,
					pageNum: 100,
					lessonName: "Cihmoq Sawcuengh Sawgun Doiqciuq",
					titleSound: "",
					originalBookNum: "56",
					paragraphs: [],
					words: {
						soundId: "",
						scripts: {}
					},
					subjects: {
						1: {
							1: {
								titleSoundId: "",
								sentences: {
									soundId: "08502.mp3",
									scripts: {
										"soundSentence_7_1_1_0": [0.72, 4.25],
										"soundSentence_7_1_1_1": [5.1, 9.5],
										"soundSentence_7_1_1_2": [10.1, 13.77],
										"soundSentence_7_1_1_3": [14.34, 17.5],
										"soundSentence_7_1_1_4": [17.8, 20.5],
										"soundSentence_7_1_1_5": [20.8, 25.3],
										"soundSentence_7_1_1_6": [26.7, 29.2],
										"soundSentence_7_1_1_7": [30.8, 34],
										"soundSentence_7_1_1_8": [34.6, 37.5],
										"soundSentence_7_1_1_9": [37.8, 40.5],
										"soundSentence_7_1_1_10": [41.1, 47],
										"soundSentence_7_1_1_11": [47.1, 50],
										"soundSentence_7_1_1_12": [50.2, 54],
										"soundSentence_7_1_1_13": [54.3, 57.5],
										"soundSentence_7_1_1_14": [57.7, 60.5],
										"soundSentence_7_1_1_15": [61, 63.1],
										"soundSentence_7_1_1_16": [63.7, 67.1],
										"soundSentence_7_1_1_17": [67.6, 71],
										"soundSentence_7_1_1_18": [71.8, 75],
										"soundSentence_7_1_1_19": [75.1, 77],
										"soundSentence_7_1_1_20": [77.3, 82],
										"soundSentence_7_1_1_21": [82.4, 85],
										"soundSentence_7_1_1_22": [60 + 25.6, 60 + 29.1],
										"soundSentence_7_1_1_23": [60 + 29.7, 60 + 34.2],
										"soundSentence_7_1_1_24": [60 + 34.7, 60 + 37.7],
										"soundSentence_7_1_1_25": [60 + 38.4, 60 + 42.2],
										"soundSentence_7_1_1_26": [60 + 42.8, 60 + 47],
										"soundSentence_7_1_1_27": [60 + 47.2, 60 + 50.66],
										"soundSentence_7_1_1_28": [60 + 51, 60 + 54],
										"soundSentence_7_1_1_29": [60 + 54.7, 60 + 57.6],
										"soundSentence_7_1_1_30": [60 + 58.1, 120 + 3.2],
										"soundSentence_7_1_1_31": [120 + 3.8, 120 + 7],
										"soundSentence_7_1_1_32": [120 + 7.8, 120 + 12],
										"soundSentence_7_1_1_33": [120 + 12.2, 120 + 15],
										"soundSentence_7_1_1_34": [120 + 15.7, 120 + 19.5],
										"soundSentence_7_1_1_35": [120 + 19.7, 120 + 23.5],
										"soundSentence_7_1_1_36": [120 + 23.6, 120 + 27.5],
									}
								}
							},
							2: {
								titleSoundId: "",
								sentences: {
									soundId: "08601.mp3",
									scripts: {
										"soundSentence_7_1_2_0": [0.3, 4.8],
										"soundSentence_7_1_2_1": [5.9, 8.4],
										"soundSentence_7_1_2_2": [9.9, 13.2],
										"soundSentence_7_1_2_3": [13.5, 16.3],
										"soundSentence_7_1_2_4": [16.7, 22],
										"soundSentence_7_1_2_5": [22.2, 25.5],
										"soundSentence_7_1_2_6": [26.2, 28.5],
										"soundSentence_7_1_2_7": [30.2, 33.9],
										"soundSentence_7_1_2_8": [34.3, 37.5],
										"soundSentence_7_1_2_9": [37.9, 41],
										"soundSentence_7_1_2_10": [41.3, 44.5],
										"soundSentence_7_1_2_11": [44.7, 48],
										"soundSentence_7_1_2_12": [48.2, 50.0],
										"soundSentence_7_1_2_13": [51.0, 53.1],
										"soundSentence_7_1_2_14": [53.9,56.5],
										"soundSentence_7_1_2_15": [57.5,59.9],
										"soundSentence_7_1_2_16": [60, 60 + 2.9],
										"soundSentence_7_1_2_17": [60 + 3, 60 + 7],
										"soundSentence_7_1_2_18": [60 + 7.4, 60 + 10.6],
										"soundSentence_7_1_2_19": [60 + 10.9, 60 + 14.5],
										"soundSentence_7_1_2_20": [60 + 14.6, 60 + 17.5],
										"soundSentence_7_1_2_21": [60 + 17.8, 60 + 22],
										"soundSentence_7_1_2_22": [60 + 22.2, 60 + 26.2],
										"soundSentence_7_1_2_23": [60 + 26.5, 60 + 30],
										"soundSentence_7_1_2_24": [60 + 30.5, 60 + 35.5],
										"soundSentence_7_1_2_25": [60 + 35.7, 60 + 39.5],
										"soundSentence_7_1_2_26": [60 + 39.9, 60 + 43],
										"soundSentence_7_1_2_27": [60 + 43.2, 60 + 46.5],
										"soundSentence_7_1_2_28": [60 + 47, 60 + 51],
										"soundSentence_7_1_2_29": [60 + 51.3, 60 + 55],
										"soundSentence_7_1_2_30": [60 + 55.2, 60 + 58.5],
										"soundSentence_7_1_2_31": [60 + 59, 120 + 3.2],
										"soundSentence_7_1_2_32": [120 + 3.5, 120 + 8.5],
										"soundSentence_7_1_2_33": [120 + 8.9, 120 + 12.5],
										"soundSentence_7_1_2_34": [120 + 13, 120 + 17],
										"soundSentence_7_1_2_35": [120 + 17.32, 120 + 21.5],
										"soundSentence_7_1_2_36": [120 + 22, 120 + 25],
										"soundSentence_7_1_2_37": [120 + 25.7, 120 + 30],
										"soundSentence_7_1_2_38": [120 + 30.5, 120 + 34],
										"soundSentence_7_1_2_39": [120 + 34.3, 120 + 38],
										"soundSentence_7_1_2_40": [120 + 38.2, 120 + 42],
										"soundSentence_7_1_2_41": [120 + 42.1, 120 + 45],
										"soundSentence_7_1_2_42": [120 + 45.4, 120 + 47.5],
									}
								}
							},
							3: {
								titleSoundId: "",
								sentences: {
									soundId: "08701.mp3",
									scripts: {
										"soundSentence_7_1_3_0": [1.6, 7],
										"soundSentence_7_1_3_1": [7.8, 16.3],
										"soundSentence_7_1_3_2": [16.8, 20.5],
										"soundSentence_7_1_3_3": [21, 26],
										"soundSentence_7_1_3_4": [26.3, 29.5],
										"soundSentence_7_1_3_5": [30, 34.5],
										"soundSentence_7_1_3_6": [34.9, 39],
										"soundSentence_7_1_3_7": [39.2, 45],
										"soundSentence_7_1_3_8": [45.4, 48.5],
										"soundSentence_7_1_3_9": [49, 56],
										"soundSentence_7_1_3_10": [57.3, 60 + 1.7],
										"soundSentence_7_1_3_11": [60 + 3.5, 60 + 5.4],
										"soundSentence_7_1_3_12": [60 + 6.7, 60 + 9.2],
										"soundSentence_7_1_3_13": [60 + 10.8, 60 + 15.8],
										"soundSentence_7_1_3_14": [60 + 17.6, 60 + 20],
										"soundSentence_7_1_3_15": [60 + 20.9, 60 + 25.9],
										"soundSentence_7_1_3_16": [60 + 27.2, 60 + 32.7],
										"soundSentence_7_1_3_17": [60 + 34, 60 + 38.6],
										"soundSentence_7_1_3_18": [60 + 40, 60 + 44.5],
										"soundSentence_7_1_3_19": [60 + 46.2, 60 + 48.8],
										"soundSentence_7_1_3_20": [110, 112.8],
										"soundSentence_7_1_3_21": [60+53.8,60+57],
										"soundSentence_7_1_3_22": [60 + 57.5, 60 + 59.7],
										"soundSentence_7_1_3_23": [120 + 1.4, 120 + 6.3],
										"soundSentence_7_1_3_24": [120 + 7.4, 120 + 10.5],
										"soundSentence_7_1_3_25": [120 + 11.4, 120 + 13.6],
										"soundSentence_7_1_3_26": [120 + 15, 120 + 18.6],
										"soundSentence_7_1_3_27": [120 + 20.3, 120 + 25.6],
										"soundSentence_7_1_3_28": [120 + 26.6, 120 + 31.5],
										"soundSentence_7_1_3_29": [120 + 32.9, 120 + 35.6],
										"soundSentence_7_1_3_30": [120 + 36.8, 120 + 43.3],
										"soundSentence_7_1_3_31": [120 + 44.2, 120 + 48.7],
										"soundSentence_7_1_3_32": [120 + 50.3, 120 + 53],
										"soundSentence_7_1_3_33": [120 + 54.2, 120 + 56.9],
										"soundSentence_7_1_3_34": [120+58,180+3.5],
										"soundSentence_7_1_3_35": [180+4.1,180+8],
										"soundSentence_7_1_3_36": [180 + 8.5, 180 + 12],
										"soundSentence_7_1_3_37": [180 + 12.5, 180 + 15.5],
										"soundSentence_7_1_3_38": [180 + 16, 180 + 20],
										"soundSentence_7_1_3_39": [180 + 20.5, 180 + 23.5],
										"soundSentence_7_1_3_40": [180 + 24, 180 + 29.5],
									}
								}
							},
							4: {
								titleSoundId: "",
								sentences: {
									soundId: "08801.mp3",
									scripts: {
										"soundSentence_7_1_4_0": [1.2, 5.5],
										"soundSentence_7_1_4_1": [5.7, 11],
										"soundSentence_7_1_4_2": [11.4, 15],
										"soundSentence_7_1_4_3": [15.3, 19],
										"soundSentence_7_1_4_4": [19.5, 25],
										"soundSentence_7_1_4_5": [25.1, 31],
										"soundSentence_7_1_4_6": [31.1, 36.5],
										"soundSentence_7_1_4_7": [36.8, 40.5],
										"soundSentence_7_1_4_8": [40.8, 45.5],
										"soundSentence_7_1_4_9": [46, 49],
										"soundSentence_7_1_4_10": [49.3, 52.5],
										"soundSentence_7_1_4_11": [52.8, 56],
										"soundSentence_7_1_4_12": [56.2, 59],
										"soundSentence_7_1_4_13": [59.65, 60 + 2.8],
										"soundSentence_7_1_4_14": [60 + 3, 60 + 6],
										"soundSentence_7_1_4_15": [60 + 6.2, 60 + 10.5],
										"soundSentence_7_1_4_16": [60 + 11, 60 + 16],
										"soundSentence_7_1_4_17": [60 + 16.4, 60 + 20],
										"soundSentence_7_1_4_18": [60 + 20.5, 60 + 23],
										"soundSentence_7_1_4_19": [60 + 23.5, 60 + 26.5],
										"soundSentence_7_1_4_20": [60 + 27, 60 + 29.5],
									}
								}
							},
						},
					}
				},
			]
		}
		
	]

	window.data.chapters = ChapterData;
	window.data.getDataById = function(chapterId, lessonId) {
		var chapters = window.data.chapters;
		var chapterData;
		var lessonData;
		var lessons;
		for(var i = 0; i < chapters.length; i++) {
			chapterData = chapters[i];
			if(chapterData.chapterId == chapterId) {
				if(!lessonId || lessonId.length <= 0) {
					return chapterData;
				}
				lessons = chapterData.lessons;
				for(var j = 0; j < lessons.length; j++) {
					lessonData = lessons[j];
					if(lessonData.lessonId == lessonId) {
						return lessonData;
					}
				}
			}
		}
	}
	window.data.getSubjectDataByI = function(subjectObj_, partId_, sujectId_) {
		return subjectObj_[partId_][sujectId_];
	}

}());
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
})();


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
(function() {
	window.ui = window.ui || {};

	var ChapterContainer = function(name_) {
		ui.BaseDialog.call(this);
		this.name = name_;
		var this_ = this;
		var yy = 204;
		var xx = 96;
		this.initView = function() {
			if(this_.lessonData) {
				this_.commonBarCallback(this_.lessonData.title);
			}
		}
		this.resetView = function() {
			resetBtnSoundTextStatus();
			createjs.Sound.stop();
		}
		this.init = function(view_, itemIndex_, chapterLessonIds_, lib_, mainScene_, commonBarCallback_) {
			this.view = view_;
			this.temIndex = itemIndex_;
			this.chapterLessonIds = chapterLessonIds_;
			this.lib = lib_;
			this.mainScene = mainScene_;
			this.commonBarCallback = commonBarCallback_;
			var lessonData;
			var itemIndexArr = itemIndex_ ? itemIndex_.split("-") : null;
			lessonData = this.getDataById(chapterLessonIds_[0]);
			this_.lessonData = lessonData;
			this_.commonBarCallback(this_.lessonData.title);
			
			this_.view.x = xx;
			this_.view.y = yy;
			
			initImg();
			var btnSound = this_.view.btnSound;
			btnSound.on("click", playSound, null, false, lessonData);
			var fonts = this_.view["txt_0"].font.split("px ");
			if(window.isAndroid) {
				this_.view["txt_0"].font = fonts[0] - window.androidOffsetFontSize + "px " + fonts[1];
				this_.view["txt_0"].text="  "+this_.view["txt_0"].text;
			}
			playBGSound(lessonData);
		}
		function initImg(){
			this_.view.fillImg.removeAllChildren();
			var bit = new createjs.Bitmap(window.PIC_CHAPTER_PATH + "chapter_" + this_.lessonData.chapterId + ".jpg");
			bit.scaleX = bit.scaleY = 0.8;
			this_.view.fillImg.addChild(bit);
		}
		function resetBtnSoundTextStatus() {
			this_.view.btnSound.gotoAndStop(0);
			this_.view.txt_0.color = "#694C12";
		}

		function playSound(e, chapterData_) {
			var btn = e.currentTarget;
			btn.isClick = !btn.isClick;
			createjs.Sound.stop();
			var txt = this_.view["txt_0"];
			txt.color = "#694C12";
			var soundId = chapterData_.soundId;
			if(btn.isClick) {
				txt.color = "#ff0000";
				if(window.isSoundLoadObj.hasOwnProperty(soundId) && window.isSoundLoadObj[soundId]) {
					createjs.Sound.play(soundId);
				} else {
					createjs.Sound.addEventListener("fileload", soundLoaded);
					createjs.Sound.registerSound(window.assetsPath + soundId, soundId);
				}
				btn.gotoAndStop(1);
			} else {
				btn.gotoAndStop(2);
			}

			function soundLoaded(e) {
				window.isSoundLoadObj[soundId] = true;
				if(btn.isClick) {
					txt.color = "#ff0000";
					createjs.Sound.stop();
					createjs.Sound.play(soundId);
				}
			}
		}

		function playBGSound(chapterData_) {
			var soundId = chapterData_.bgMusicId;
			if(window.isSoundLoadObj.hasOwnProperty(soundId) && window.isSoundLoadObj[soundId]) {
				createjs.Sound.play(soundId);
			} else {
				createjs.Sound.addEventListener("fileload", soundBgLoaded);
				createjs.Sound.registerSound(window.assetsPath + soundId, soundId);
			}

			function soundBgLoaded(e) {
				window.isSoundLoadObj[soundId] = true;
				createjs.Sound.play(soundId);
			}
		}
	}
	var Super = function() {};
	Super.prototype = ui.BaseDialog.prototype;
	ChapterContainer.prototype = new Super();
	window.ui.ChapterContainer = ChapterContainer;
})();
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
(function() {
	window.ui = window.ui || {};
	var ExerciseSoundContainer = function(view_, exerciseData_) {
		var view = view_;
		var btnSounds = [];
		var txts = [];

		loadWordSound(exerciseData_);

		function loadWordSound(wordsData_) {
			var soundsObj = wordsData_.scripts;
			var soundsArr = [];
			var obj;
			var i = 0;
			var btnSound;
			var txt;
			var soundId = wordsData_.soundId;
			var isExerciseTxt = false;
			var fonts;
			for(var i = 0; i < 100; i++) {
				if(view["exerciseTxt_" + i]) {
					fonts = view["exerciseTxt_" + i].font.split("px ");
					break;
				}
			}
			i = 0;
			for(var key in soundsObj) {
				btnSound = view["exerciseSound_" + i];
				if(!btnSound){
					i++;
					continue;
				}
				btnSound.cursor = "pointer";
				btnSound.mouseChildren = false;
				txt = view["exerciseTxt_" + i];
				btnSound.txt = txt;
				btnSounds.push(btnSound);
				txts.push(txt);
				if(window.isAndroid) {
					txt.font = fonts[0] - window.androidOffsetFontSize + "px " + fonts[1];
				}
				btnSound.soundIndex = key;
				btnSound.addEventListener("click", function(e) {
					e.stopPropagation();
					var btn = e.currentTarget;
					resetBtnSoundTextStatus(btn);
					btn.isClick = !btn.isClick;
					createjs.Sound.stop();
					var txt = btn.txt;
					txt.color = "#000000";
					if(btn.isClick) {
						txt.color = "#ff0000";
						btn.gotoAndStop(1);
						if(window.isSoundLoadObj[soundId]) {
							createjs.Sound.play(btn.soundIndex);
						} else {
							createjs.Sound.addEventListener("fileload", soundLoaded); // add an event listener for when load is completed
							createjs.Sound.registerSound(window.assetsPath + soundId, soundId);
						}
					} else {
						btn.gotoAndStop(0);
					}
				}, false);
				obj = {};
				obj.id = key;
				obj.startTime = soundsObj[key][0] * 1000;
				obj.duration = (soundsObj[key][1] - soundsObj[key][0]) * 1000;
				soundsArr.push(obj);
				i++;
			}
			wordsLength = i;
			var sounds = [{
				src: soundId,
				data: {
					audioSprite: soundsArr
				}
			}];
			createjs.Sound.addEventListener("fileload", loadSound, false);
			createjs.Sound.registerSounds(sounds, assetsPath);
			// 加载完成后

			function loadSound(e) {
				e.stopPropagation();
				window.isSoundLoadObj[soundId] = true;
			}
		}

		function resetBtnSoundTextStatus(btn_) {
			for(var i = 0; i < txts.length; i++) {
				txt = txts[i];
				txt.color = "#000";
				btnSound = btnSounds[i];
				if(btn_) {
					if(btn_ != btnSound) {
						btnSound.gotoAndStop(0);
						btnSound.isClick = false;
					}
				} else {
					btnSound.isClick = false;
				}
			}
		}
	}

	window.ui.ExerciseSoundContainer = ExerciseSoundContainer;
})();
(function() {
	window.ui = window.ui || {};
	var JundgeRightOrWrong = function(name_) {
		ui.BaseDialog.call(this);
		this.name = name_;
		var this_ = this;
		var yy = 204;
		var xx = 82;
		var questionNum = 4;  //选项数目
		var answer = [3];		  //正确答案是第几个,可以是多个
		var fourCheckbox;        //默认为二选一 哪几个为四选一
		this.resetView = function() {}
		this.initView = function(parent_) {
			if(this_.lessonData) {
				this_.commonBarCallback("", this_.lessonData);
			}
		}
		
		this.init = function(view_, itemIndex_, chapterLessonIds_, lib_, mainScene_, commonBarCallback_) {
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
			if(this.view.lessonName){
				this.view.x = 82; 
				this.view.y = 140;
			}else{
				this.view.x = xx;
				this.view.y = yy;
			}
			if(this.name == "uiLessonFourEx_8"){
				fourCheckbox=[0,1,2,3];
				answer=[1];
			}else if(this.name == "uiLessonSevenExercise_1"){
				answer=[1,2];
			}else if(this.name == "uiSuenvaFour_2"){
				answer=[1,2,4];
				questionNum = 6; 
			}else if(this.name == "uiLessonFourteenExercise_2"){
				answer=[0,5];
				fourCheckbox=[0,1,2,3];
				questionNum = 6; 
			}else if(this.name == "uiGenjcwzdizGeizSatbyai_1"){
				answer=[1,2];
			}else if(this.name == "uiLessonEightExercise_1"){
				fourCheckbox=[0,1,2,3];
				answer=[2];
			}
//			setTimeout(init,50); //why?
			init();
			if(this_.view.btnReset){
				this_.view.btnReset.on("click", clickBtnReset);
				this_.view.btnReset.on("pressup", function(e) {
					this_.view.btnReset.scaleX = this_.view.btnReset.scaleY = 1;
				}, null, false, null, false);
				this_.view.btnReset.on("mousedown", function(e) {
					this_.view.btnReset.scaleX = this_.view.btnReset.scaleY = 1.5;
				}, null, false, null, false);
				this_.view.btnReset.mouseChildren = false;
			}
			if(this_.view.btnJudgment){
				this_.view.btnJudgment.on("click", clickBtnJudgment);
				this_.view.btnJudgment.on("pressup", function(e) {
					this_.view.btnJudgment.scaleX = this_.view.btnJudgment.scaleY = 1;
				}, null, false, null, false);
				this_.view.btnJudgment.on("mousedown", function(e) {
					this_.view.btnJudgment.scaleX = this_.view.btnJudgment.scaleY = 1.5;
				}, null, false, null, false);
				this_.view.btnJudgment.mouseChildren = false;
			}

			function init() {
				for(var i = 0; i < questionNum; i++) {
					this_.view["btnRightWrong_" + i].gotoAndStop(1);
					this_.view["btnRightWrong_" + i].visible = false;
					this_.view["btnJudge_" + i].key = i;
					this_.view["btnJudge_" + i].mouseChildren = false;
					this_.view["btnJudge_" + i].on("click", checkAnswer);
				}
			}

			function checkAnswer(e) {
				btn=e.target;
				if(fourCheckbox && fourCheckbox.hasOwnProperty(btn.key)){
					for(var i=fourCheckbox[0];i<fourCheckbox.length;i++){
						this_.view["btnJudge_"+i].isClick=false;
						this_.view["btnJudge_"+i].gotoAndStop(0);
						this_.view["btnRightWrong_" + i].visible=false;
					}
				}else{
					if(btn.key%2){
						this_.view["btnJudge_" + (btn.key-1)].isClick=false;
						this_.view["btnJudge_" + (btn.key-1)].gotoAndStop(0);
						this_.view["btnRightWrong_" + (btn.key-1)].visible=false;
					}else{
						this_.view["btnJudge_" + (btn.key+1)].isClick=false;
						this_.view["btnJudge_" + (btn.key+1)].gotoAndStop(0);
						this_.view["btnRightWrong_" + (btn.key+1)].visible=false;
					}
				}
				if(btn.isClick){
					btn.isClick=false;
					btn.gotoAndStop(0);
				}else{
					btn.isClick=true;
					btn.gotoAndStop(1);
				}
			}
			function clickBtnJudgment(){
				var rightNum=0;
				var clickNum=0;
				createjs.Sound.stop();
				for(var i=0;i<questionNum;i++){
					this_.view["btnRightWrong_" + i].gotoAndStop(1);
					this_.view["btnRightWrong_" + i].visible = false;
					if(this_.view["btnJudge_" + i].isClick){
						this_.view["btnRightWrong_" + i].visible = true;
						clickNum++;
					}
					for(var j=0,len=answer.length;j<len;j++){
						if(this_.view["btnJudge_" + i].isClick&&this_.view["btnJudge_" + i].key==answer[j]){
							this_.view["btnRightWrong_" + i].gotoAndStop(0);
							rightNum++;
						}
					}
				}
				if(rightNum == answer.length && rightNum == clickNum){
					createjs.Sound.play(window.ANSWER_RIGHT_Id);
				}else{
					createjs.Sound.play(window.ANSWER_WRONG_Id);
				}
			}
			function clickBtnReset() {
				for(var i = 0; i < questionNum; i++) {
					this_.view["btnRightWrong_" + i].visible = false;
					this_.view["btnJudge_"+i].gotoAndStop(0);
					this_.view["btnJudge_"+i].isClick=false;
				}
			}
		}

	}
	var Super = function() {};
	Super.prototype = ui.BaseDialog.prototype;
	JundgeRightOrWrong.prototype = new Super();
	window.ui.JundgeRightOrWrong = JundgeRightOrWrong;
})();
(function() {
	window.ui = window.ui || {};
	var LessonOneConnectionLineContainer_2 = function(name_) {
		ui.BaseDialog.call(this);
		this.name = name_;
		var this_ = this;
		var yy = 204;
		var xx = 82;
		var itemNum = 0;
		var inputs = [];
		var clickQuestion = null;
		var clickAnswer = null;
		var rightAnswers = [];
		var wordMaskTxt;
		var maxLengths;
		this.initView = function() {
			if(this_.lessonData) {
				this_.commonBarCallback("", this_.lessonData);
			}
			var dom = document.getElementById("dom_overlay_container");
			var input_;
			for(var i = 0, len = inputs.length; i < len; i++) {
				input_ = inputs[i];
				if(!input_.parentNode) {
					dom.appendChild(input_);
				}
			}
		}
		this.resetView = function() {
			var dom = document.getElementById("dom_overlay_container");
			var input_;
			for(var i = 0, len = inputs.length; i < len; i++) {
				input_ = inputs[i];
				if(input_.parentNode) {
					dom.removeChild(input_);
				}
			}
		}
		this.init = function(view_, itemIndex_, chapterLessonIds_, lib_, mainScene_, commonBarCallback_) {
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
			if(this.name == "uiLessonOne_3") {
				rightAnswers = [3, 1, 2];
			} else if(this.name == "uiLessonThree_4") {
				rightAnswers = [2, 1];
				wordMaskTxt = "hai";
			} else if(this.name == "uiLessonSevenExercise_6") {
				rightAnswers = [4, 1, 2, 3];
			} else if(this.name == "uiSuenvaOne_5") {
				rightAnswers = [2, 1];
				wordMaskTxt = "hawj";
			} else if(this.name == "uiLessonFifteenExercise_8") {
				rightAnswers = [3, 1, 2];
				wordMaskTxt = "dwg";
			} else if(this.name == "uiLessonEightExercise_5") {
				rightAnswers = [3, 1, 4, 2];
			} else if(this.name == "uiLessonElevenExercise_8") {
				rightAnswers = [5, 4, 1, 2, 3];
			} else if(this.name == "uiLessonTwelveExercise_10") {
				rightAnswers = [2, 3, 4, 1];
			} else if(this.name == "uiLessonEighteenExercise_12") {
				rightAnswers = [4,3,1,2,7,5,6];
			} else if(this.name == "uiSuenvaSix_5") {
				rightAnswers = [4, 1, 2, 3];
			} else if(this.name == "uiLessonFourteenExercise_8") {
				rightAnswers = [3, 1, 5, 2, 4];
				maxLengths = [15];
			}
			itemNum = rightAnswers.length;
			if(this.view.lessonName) {
				this.view.x = 82;
				this.view.y = 140;
			} else {
				this.view.x = xx;
				this.view.y = yy;
			}
			if(wordMaskTxt) {
				this_.view.wordMask.txt.text = wordMaskTxt;
			}
			buildLines();
			initInputs();
		}

		function initInputs() {
			if(!maxLengths) {
				return;
			}
			this_.view.addEventListener("click", function() {
				for(var i = 0; i < inputs.length; i++) {
					inputs[i].blur();
				}
			});
			setTimeout(function() {
				var input_;
				var inputNum = document.querySelectorAll(".ui-textinput");
				for(var i = 0, len = inputNum.length; i < len; i++) {
					input_ = document.getElementById("input_" + i);
					maxLengths[i] = maxLengths[i] ? maxLengths[i] : maxLengths[0];
					input_.setAttribute("maxlength", maxLengths[i]);
					input_.setAttribute("spellcheck", "false");
					input_.oninput = function(e) {
						var tar = e.currentTarget;
						tar.value = tar.value.replace(/[^A-Za-z, .?''""\n\r]/g, "");
					}
					inputs.push(input_);
				}
				if(this_.view.btnInputReset) {
					this_.view.btnInputReset.mouseChildren = false;
					this_.view.btnInputReset.on("click", function() {
						var ipts = document.querySelectorAll(".ui-textinput") || document.querySelectorAll("ui-textarea");
						for(var i = 0, len = ipts.length; i < len; i++) {
							ipts[i].value = "";
						}
					}, null, false, null, false);
					this_.view.btnInputReset.on("pressup", function(e) {
						this_.view.btnInputReset.scaleX = this_.view.btnInputReset.scaleY = 1;
					}, null, false, null, false);
					this_.view.btnInputReset.on("mousedown", function(e) {
						this_.view.btnInputReset.scaleX = this_.view.btnInputReset.scaleY = 1.5;
					}, null, false, null, false);
				}
			}, 50);
		}

		function buildLines() {
			var question;
			var answer;
			var line;
			for(var i = 1; i < itemNum + 1; i++) {
				question = this_.view["circleLeft_" + i];
				question.answerKey = "";
				question.cursor = "pointer";
				question.key = String(i);
				question.addEventListener("click", onClickQuestion, false);
				answer = this_.view["circleRight_" + i];
				answer.cursor = "pointer";
				answer.key = String(i);
				answer.addEventListener("click", onClickAnswer, false);

				line = new createjs.Shape();
				line.key = String(i);
				this_.view["line_" + i] = line;
			}
			if(this_.view.btnReset) {
				this_.view.btnReset.on("click", onClickBtnReset, null, false, null, false);
				this_.view.btnReset.on("pressup", function(e) {
					this_.view.btnReset.scaleX = this_.view.btnReset.scaleY = 1;
				});
				this_.view.btnReset.on("mousedown", function(e) {
					this_.view.btnReset.scaleX = this_.view.btnReset.scaleY = 1.5;
				});
				this_.view.btnReset.mouseChildren = false;
			}

			if(this_.view.btnJudgment) {
				this_.view.btnJudgment.on("click", onClickBtnJudgment, null, false, null, false);
				this_.view.btnJudgment.on("pressup", function(e) {
					this_.view.btnJudgment.scaleX = this_.view.btnJudgment.scaleY = 1;
				});
				this_.view.btnJudgment.on("mousedown", function(e) {
					this_.view.btnJudgment.scaleX = this_.view.btnJudgment.scaleY = 1.5;
				});
				this_.view.btnJudgment.mouseChildren = false;
			}
		}

		function onClickQuestion(e) {
			var ques = e.currentTarget;
			//判断点击了右边
			if(clickQuestion && !(clickQuestion.answerKey.length > 0)) {
				//清除上一个左边
				clickQuestion.gotoAndStop(0);
			}
			clickQuestion = ques;
			clickQuestion.gotoAndStop(1);
		}

		function onClickAnswer(e) {
			clickAnswer = e.currentTarget;
			dealLine();
		}
		function dealLine() {
			var ques = clickQuestion;
			var ans = clickAnswer;
			var line;
			var mask=this_.view.wordMask;
			if(ques) {
				line = this_.view["line_" + ques.key];
				if(ans.hasOwnProperty("questionKey") && ans.questionKey != "" && ans.questionKey.length > 0) {
					this_.view["circleLeft_" + ans.questionKey].gotoAndStop(0);
					clickQuestion.gotoAndStop(1);
					if(this_.view["line_" + ans.questionKey].lineLeft){
						this_.view["line_" + ans.questionKey].lineLeft.graphics.clear();
						this_.view["line_" + ans.questionKey].lineRight.graphics.clear();
					}
					this_.view["line_" + ans.questionKey].graphics.clear();
					this_.view.removeChild(this_.view["line_" + ans.questionKey]);
					var ques_ = this_.view["circleLeft_" + ans.questionKey];

					ans.questionKey = "";
					ques_.answerKey = "";
				}
				if(ques.hasOwnProperty("answerKey") && ques.answerKey != "" && ques.answerKey.length > 0) {
					var ans_ = this_.view["circleRight_" + ques.answerKey];
					ans_.gotoAndStop(0);
					if(this_.view.hasOwnProperty("line_" + ans_.questionKey)) {
						this_.view["line_" + ans_.questionKey].graphics.clear();
						this_.view.removeChild(this_.view["line_" + ans_.questionKey]);
					}
					ans_.questionKey = "";
				}
				clickAnswer.gotoAndStop(1);
				line.x = 0;
				line.y = 0;
				line.graphics.clear();
				line.graphics.setStrokeStyle(5);
				line.graphics.beginStroke('#F7C108');
				line.graphics.moveTo(ques.x, ques.y);
				line.graphics.lineTo(ans.x, ans.y);
				if(wordMaskTxt){
					line.alpha=0.01;
					if(line.lineLeft){
						line.lineLeft.graphics.clear();
					}if(line.lineRight){
						line.lineRight.graphics.clear();
					}
					var color='#' + (function(color){return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])  && (color.length == 6) ?  color : arguments.callee(color); })('');
					var lineLeft= new createjs.Shape();
					var lineRight=new createjs.Shape();
					line.lineLeft=lineLeft;
				  line.lineRight=lineRight;
					lineLeft.graphics.setStrokeStyle(5).beginStroke(color).moveTo(ques.x, ques.y).lineTo(mask.x,mask.y);
					lineLeft.graphics.setStrokeStyle(5).beginStroke(color).moveTo(mask.x,mask.y).lineTo(ans.x,ans.y);
					this_.view.addChild(lineRight);
					this_.view.addChild(lineLeft);
				}
				ans.questionKey = ques.key;
				ques.answerKey = ans.key;
				this_.view.addChild(line);
				this_.view.addChild(ans);
				this_.view.addChild(ques);
				this_.view.addChild(mask);

			}
		}

		function judgeAnswer() {
			for(var i = 1; i < itemNum + 1; i++) {
				if(this_.view["circleRight_" + i].questionKey) {
					this_.view["btnRightWrong_" + i].visible = true;
					if(this_.view["circleRight_" + i].questionKey == rightAnswers[i - 1]) {
						this_.view["btnRightWrong_" + i].gotoAndStop(0);
						this_.view["circleRight_" + i].removeAllEventListeners();
						this_.view["circleLeft_" + this_.view["circleRight_" + i].questionKey].removeAllEventListeners();
					} else {
						this_.view["btnRightWrong_" + i].gotoAndStop(1);
					}
				} else {
					this_.view["btnRightWrong_" + i].visible = true;
					this_.view["btnRightWrong_" + i].gotoAndStop(1);
				}
			}
			createjs.Sound.stop();
			var num = 0;
			for(var j = 1; j < itemNum + 1; j++) {
				if(this_.view["circleRight_" + j].questionKey == rightAnswers[j - 1]) {
					num++;
				}
			}
			if(num == itemNum) {
				createjs.Sound.play(window.ANSWER_RIGHT_Id);
			} else {
				createjs.Sound.play(window.ANSWER_WRONG_Id);
			}
			 clickQuestion = null;
		   clickAnswer = null;
		}

		function onClickBtnJudgment() {
			judgeAnswer();
		}

		function onClickBtnReset() {
			for(var i = 1; i < itemNum + 1; i++) {
				this_.view["circleLeft_" + i].gotoAndStop(0);
				this_.view["circleRight_" + i].gotoAndStop(0);
				this_.view["line_" + i].graphics.clear();
				this_.view["btnRightWrong_" + i].gotoAndStop(0);
				this_.view["btnRightWrong_" + i].visible = false;
				this_.view["circleLeft_" + i].answerKey = "";
				this_.view["circleRight_" + i].questionKey = "";
				this_.view.removeChild(this_.view["line_" + i]);
				this_.view.removeChild(this_.view["line_" + i].lineRight);
				this_.view.removeChild(this_.view["line_" + i].lineLeft);
				clickQuestion = null;
				clickAnswer = null;
				this_.view["circleLeft_" + i].addEventListener("click", onClickQuestion, false);
				this_.view["circleRight_" + i].addEventListener("click", onClickAnswer, false);
			}
		}
	}
	var Super = function() {};
	Super.prototype = ui.BaseDialog.prototype;
	LessonOneConnectionLineContainer_2.prototype = new Super();
	window.ui.LessonOneConnectionLineContainer_2 = LessonOneConnectionLineContainer_2;
})();

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
				dragTexts = ["huzgaek", "hab’eiq"]
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

(function() {
	window.ui = window.ui || {};

	var LessonOneDrawWordContainer_3 = function(name_) {
		ui.BaseDialog.call(this);
		this.name = name_;
		var this_ = this;
		var xx = 82;
		var yy = 204;
		var wordNum = 3;
		var words = ["gohaeux", "vagut", "faexcoengz"];

		var drawingCanvas;
		var oldPt;
		var oldMidPt;
		var color = "#F95900";
		var stroke = 10;

		var isPlayCartoon = false;
		var playCartoonTime = 0;
		var playCartoonIndex = 0;
		var letterLength = 0;
		var drawCartoonCon;
		var clickTxtKey = -1;
		var limitRight = 1468;
		var limitBottom = 337;
		this.initView = function(parent_) {
			if(this_.lessonData) {
				this_.commonBarCallback("", this_.lessonData);
			}
			setTimeout(function() {
				this_.view["btnWriteWord_0"].dispatchEvent("click");
			}, 50);
			createjs.Ticker.addEventListener("tick", playCartoon);
		}
		this.resetView = function() {
			resetBtnAndCartoon();
			createjs.Ticker.removeEventListener("tick", playCartoon);
		}
		this.init = function(view_, itemIndex_, chapterLessonIds_, lib_, mainScene_, commonBarCallback_) {
			var view = this.view = view_;
			this.temIndex = itemIndex_;
			this.chapterLessonIds = chapterLessonIds_;
			this.lib = lib_;
			this.mainScene = mainScene_;
			this.commonBarCallback = commonBarCallback_;
			var lessonData;
			var itemIndexArr = itemIndex_ ? itemIndex_.split("-") : null;
			if(chapterLessonIds_) {
				if(chapterLessonIds_[0] > 0) {
					lessonData = this.getDataById(chapterLessonIds_[0], chapterLessonIds_[1]);
				} else {
					lessonData = this.getDataById(chapterLessonIds_[0]);
				}
				this_.lessonData = lessonData;
				this_.commonBarCallback("", lessonData);
			}
			drawingCanvas = new createjs.Shape();
			drawingCanvas.x = 190;
			drawingCanvas.y = 418;
			if(this.name == "uiLessonOne_4") {
				words = ["gohaeux", "vagut", "faexcoengz"];
				wordNum = 3;
			} else if(this.name == "uiLessonEight_8") {
				words = ["dwgrengz", "angqvauvau", "naekgywg"];
				wordNum = 3;
			} else if(this.name == "uiLessonFourteen_8") {
				words = ["hab'eiq", "gvigawj", "hozgaek"];
				wordNum = 3;
			} else if(this.name == "uiLessonFourteen_9") {
				words = ["saedceij", "gwndaenj"];
				wordNum = 2;
			} else if(this.name == "uiLessonEight_9") {
				words = ["haenqrengz", "yietnaiq"];
				wordNum = 2;
			} else if(this.name == "uiLessonOne_5") {
				words = ["gwnzbiengz", "seizcou"];
				wordNum = 2;
			} else if(this.name == 'uiLessonSeven_8') {
				words = ["gaeqlwg", "soemsutsut", "dendwngh"];
				wordNum = 3;
			} else if(this.name == 'uiLessonSeven_9') {
				words = ["denyingj", "doenghyiengh"];
				wordNum = 2;
			} else if(this.name == "uiLessonSevenExercise_4") {
				words = ["byukgyaeq", "goemq", "bomz"];
				wordNum = 3;
			} else if(this.name == "uiLessonSixteen_6") {
				words = ["hawriengx", "hwnzngoenz", "seiqhenz"];
				wordNum = 3;
			} else if(this.name == "uiLessonSixteenExercise_2") {
				words = ["cwxcaih ", "doekgumh ", "u reamx"];
				wordNum = 3;
			} else if(this.name == "uiLessonEighteen_4") {
				words = ["simsoh", "ninzndaek", "aek dot"];
				wordNum = 3;
			} else if(this.name == "uiLessonEighteenExercise_4") {
				words = ["simsoh", "gvenq", "cimz"];
				wordNum = 3;
			} else if(this.name == "uiLessonEighteenExercise_5") {
				words = ["ninznaek", "aek dot"];
				wordNum = 2;
			} else if(this.name == "uiLessonEighteen_5") {
				words = ["rox leix", "sim ndei"];
				wordNum = 2;
			} else if(this.name == "uiLessonSeventeen_8") {
				words = ["byaraiz", "dozveh", "capmax"];
				wordNum = 3;
			} else if(this.name == "uiLessonSeventeenExercise_2") {
				words = ["siengq", "vunz", "ngeng"];
				wordNum = 3;
			} else if(this.name == "uiLessonSeventeenExercise_3") {
				words = ["ndang", "riuzmingz"];
				wordNum = 2;
			} else if(this.name == "uiLessonSeventeen_9") {
				words = ["dijbauj", "bangxdat"];
				wordNum = 2;
			} else if(this.name == "uiLessonSixteenExercise_3") {
				words = ["henzre"];
				wordNum = 1;
			} else if(this.name == "uiLessonSixteen_7") {
				words = ["bienqvaq", "cungqcax"];
				wordNum = 2;
			} else if(this.name == "uiLessonSevenExercise_5") {
				words = ["ranzndeu"];
				wordNum = 1;
			} else if(this.name == "uiLessonThirteen_7") {
				words = ["daejnga'nga", "catsaij", "duzroeg"];
				wordNum = 3;
			} else if(this.name == "uiLessonFifteen_8") {
				words = ["hai va", "laj doem", "gyaeq bya"];
				wordNum = 3;
				drawingCanvas.x = 140;
			} else if(this.name == "uiLessonFifteen_9") {
				words = ["rieng", "doenghgo"];
				wordNum = 2;
				drawingCanvas.x = 140;
			} else if(this.name == "uiLessonFifteenExercise_2") {
				words = ["roengz", "onj", "daimaez"];
				wordNum = 3;
				drawingCanvas.x = 140;
			} else if(this.name == "uiLessonFifteenExercise_3") {
				words = ["dawz"];
				wordNum = 1;
				drawingCanvas.x = 140;
			} else if(this.name == "uiLessonThirteenExercise_3") {
				words = ["ap", "oeg", "oek"];
				wordNum = 3;
			} else if(this.name == "uiLessonThirteenExercise_4") {
				words = ["aek", "et", "aet"];
				wordNum = 3;
			} else if(this.name == "uiLessonThirteenExercise_5") {
				words = ["ik"];
				wordNum = 1;
			} else if(this.name == "uiLessonThirteen_8") {
				words = ["gvaqbae", "duzbya"];
				wordNum = 2;
			} else if(this.name == "uiLessonOneEx_9") {
				words = ["riengzhaeux", "fwn’iq", "gwnzbbinengz"];
				wordNum = 3;
			} else if(this.name == "uiLessonSix_6") {
				words = ["buet", "daenj", "soengq"];
				wordNum = 3;
			} else if(this.name == "uiLessonSix_7") {
				words = ["baenz", "gvaq", "nyienh"];
				wordNum = 3;
			} else if(this.name == "uiLessonTwelveExercise_2") {
				words = ["wed", "aek", "it"];
				wordNum = 3;
			} else if(this.name == "uiLessonTwelveExercise_3") {
				words = ["at", "aem", "oeng"];
				wordNum = 3;
			} else if(this.name == "uiLessonTwelveExercise_4") {
				words = ["wn"];
				wordNum = 1;
			} else if(this.name == "uiLessonSixExercise_2") {
				words = ["aek", "wg", "oek"];
				wordNum = 3;
			} else if(this.name == "uiLessonSixExercise_3") {
				words = ["ag", "aet", "uet"];
				wordNum = 3;
			} else if(this.name == "uiLessonSixExercise_5") {
				words = ["gwn", "gyaez", "cungj"];
				wordNum = 3;
			} else if(this.name == "uiLessonSixExercise_6") {
				words = ["laux", "gvaq", "nyienh"];
				wordNum = 3;
			} else if(this.name == "uiLessonOneEx_2") {
				words = ["seizocou", "laeglemx", "vagut"];
				wordNum = 3;
			} else if(this.name == "uiLessonEleven_9") {
				words = ["nauhhuhu", "luenhlablab", "doenghbaez"];
				wordNum = 3;
			} else if(this.name == "uiLessonEleven_10") {
				words = ["seizneix", "gyoengqde"];
				wordNum = 2;
			} else if(this.name == "uiLessonOneEx_3") {
				words = ["gwnzbiengz"];
				wordNum = 1;
			} else if(this.name == "uiLessonTwelve_4") {
				words = ["saek", "naemq", "dak"];
				wordNum = 3;
			} else if(this.name == "uiLessonTwelve_5") {
				words = ["doek", "cingx"];
				wordNum = 2;
			} else if(this.name == "uiLessonTwo_6") {
				words = ["vaiqvued", "yaekseiz", "hoengzhoengz" + " " + "heuheu"];
				wordNum = 3;
				drawingCanvas.x = 80;
				drawingCanvas.y = 470;
				limitRight = 1600;
				limitBottom = 254;
			} else if(this.name == "uiLessonTwo_7") {
				words = ["henjgim", "doenghnaz"];
				wordNum = 2;
				drawingCanvas.x = 80;
				drawingCanvas.y = 440;
				limitRight = 1600;
				limitBottom = 340;
			} else if(this.name == "uiLessonThree_5") {
				words = ["ndwencaet", "ndwenbet", "maeuqmaeuq"];
				wordNum = 3;
			} else if(this.name == "uiLessonThree_6") {
				words = ["vamauxdan", "bouxlawz"];
				wordNum = 2;
			} else if(this.name == "uiLessonTwoEx_3") {
				words = ["yaekseiz", "haeujsim", "hoengzhoengz heuheu"];
				wordNum = 3;
				limitRight = 1600;
				limitBottom = 254;
				drawingCanvas.x = 80;
				drawingCanvas.y = 470;
			} else if(this.name == "uiLessonThreeExercise_5") {
				words = ["wen", "wn", "ung"];
				wordNum = 3;
				drawingCanvas.x = 145;
			} else if(this.name == "uiLessonThreeExercise_6") {
				words = ["ueng", "aeu", "ou"];
				wordNum = 3;
				drawingCanvas.x = 145;
			} else if(this.name == "uiLessonElevenExercise_2") {
				words = ["doenghbaez", "gomiuz", "lwgsau"];
				wordNum = 3;
			} else if(this.name == "uiLessonElevenExercise_3") {
				words = ["gyoengqvunz"];
				wordNum = 1;
			} else if(this.name == "uiLessonThreeExercise_7") {
				words = ["ae", "ei"];
				wordNum = 2;
				drawingCanvas.x = 145;
			} else if(this.name == "uiSuenvaOne_2") {
				words = ["riengzhaeux", "fwn'iq", "gwnzbiengz"];
				wordNum = 3;
			} else if(this.name == "uiSuenvaOne_3") {
				words = ["fungsou", "lwgnyez"];
				wordNum = 2;
			} else if(this.name == "uiLessonFour_6") {
				words = ["lwgnyez", "bouxdog", "hwngqfwngfwng"];
				wordNum = 3;
				drawingCanvas.x = 100;
				limitRight = 1689;
				limitBottom = 337;
			} else if(this.name == "uiLessonFour_7") {
				words = ["nitsausau", "vunzlai"];
				wordNum = 2;
				limitRight = 1468;
				limitBottom = 337;
			} else if(this.name == "uiLessonFourEx_2") {
				words = ["gvaqseiq", "hauqswnh", "mbinj"];
				wordNum = 3;
				limitRight = 1468;
				limitBottom = 337;
			} else if(this.name == "uiLessonFourEx_3") {
				words = ["swiz", "nyungz", "swhgeij"];
				wordNum = 3;
				limitRight = 1468;
				limitBottom = 337;
			} else if(this.name == "uiLessonFourEx_4") {
				words = ["doenghbaez", "hwngfwngfwng"];
				wordNum = 2;
				drawingCanvas.x = 60;
				limitRight = 1630;
				limitBottom = 337;
			} else if(this.name == "uiLessonFive_8") {
				words = ["youzlangh", "ngaekgyaeuj", "hoznyaek"];
				wordNum = 3;
				limitRight = 1468;
				limitBottom = 337;
			} else if(this.name == "uiLessonFive_9") {
				words = ["mboujliuh", "goenglaux"];
				wordNum = 2;
				limitRight = 1468;
				limitBottom = 337;
			} else if(this.name == "uiLessonNine_6") {
				words = ["baengh", "hangz", "mae"];
				wordNum = 3;
				limitRight = 1468;
				limitBottom = 337;
			} else if(this.name == "uiLessonNine_7") {
				words = ["lau", "mak"];
				wordNum = 2;
				limitRight = 1468;
				limitBottom = 337;
			} else if(this.name == "uiLessonNineExercise_2") {
				words = ["ak", "it", "ieg"];
				wordNum = 3;
				limitRight = 1468;
				limitBottom = 337;
			} else if(this.name == "uiLessonNineExercise_3") {
				words = ["ag", "ang", "aeng"];
				wordNum = 3;
				limitRight = 1468;
				limitBottom = 337;
			} else if(this.name == "uiLessonNineExercise_4") {
				words = ["aen", "eu"];
				wordNum = 2;
				limitRight = 1468;
				limitBottom = 337;
			} else if(this.name == "uiLessonTen_7") {
				words = ["doxdax", "bonjseah", "baihlaeng"];
				wordNum = 3;
				limitRight = 1468;
				limitBottom = 337;
			} else if(this.name == "uiLessonTen_8") {
				words = ["geizheih", "okdaeuj"];
				wordNum = 2;
				limitRight = 1468;
				limitBottom = 337;
			} else if(this.name == "uiLessonOneEx_6_pop") {
				words = ["faexcoengz", "vagut"];
				wordNum = 2;
				limitRight = 1468;
				limitBottom = 337;
				drawingCanvas.x -= 10;
				drawingCanvas.y -= 10;
			} else if(this.name == "uiLessonTwoEx_5_pop") {
				words = ["liengzsisi", "mbawfaex", "ciengqgo", "lwggyoij"];
				wordNum = 4;
				limitRight = 1468;
				limitBottom = 337;
				drawingCanvas.x -= 10;
				drawingCanvas.y -= 10;
			}
			if(this.view.lessonName) {
				this.view.x = 82;
				this.view.y = 140;
			} else if(this.name == "uiLessonOneEx_6_pop" || this.name == "uiLessonTwoEx_5_pop") {

			} else {
				this.view.x = xx;
				this.view.y = yy;
			}
			var shape = new createjs.Shape();
			shape.graphics.beginFill("#fff");
			shape.graphics.drawRect(0, 0, limitRight, limitBottom);
			shape.x = drawingCanvas.x;
			shape.y = drawingCanvas.y;
			shape.alpha = 0.01;
			this_.view.addChild(shape);
//			drawingCanvas.width = limitRight;
//			drawingCanvas.height = limitBottom;
//			drawingCanvas.graphics.beginFill("#FFf");
//			drawingCanvas.graphics.drawRect(0, 0, limitRight, limitBottom);
//			this.view.addChild(drawingCanvas);
			if(chapterLessonIds_) {
				if(chapterLessonIds_[0] > 0) {
					lessonData = this.getDataById(chapterLessonIds_[0], chapterLessonIds_[1]);
				} else {
					lessonData = this.getDataById(chapterLessonIds_[0]);
				}
				if(commonBarCallback_) {
					commonBarCallback_("", lessonData);
				}
			}

			var btnPlay = this_.view.btnPlay;
			btnPlay.cursor = "pointer";
			btnPlay.mouseChildren = false;
			btnPlay.on("click", clickBtnPlay, null, false, null, false);
			var btnWrite = this_.view.btnWrite;
			btnWrite.cursor = "pointer";
			btnWrite.mouseChildren = false;
			btnWrite.on("click", clickBtnWrite, null, false, null, false);
			var btnSave;
			if(this_.view.btnSave) {
				btnSave = this_.view.btnSave;
				btnSave.cursor = "pointer";
				btnSave.mouseChildren = false;
				btnSave.on("click", clickBtnSave, null, false, null, false);
			}
			var btnDelete = this_.view.btnDelete;
			btnDelete.cursor = "pointer";
			btnDelete.mouseChildren = false;
			btnDelete.on("click", clickBtnDelete, null, false, null, false);
			var btnWriteWord;
			var drawCartoonCon;
			//			var fonts = this_.view["btnWriteWord_0"].txt.font.split("px ");
			for(var i = 0; i < wordNum; i++) {
				btnWriteWord = this_.view["btnWriteWord_" + i];
				btnWriteWord.key = i;
				//				btnWriteWord.txt.text = words[i];
				//				btnWriteWord.txt.textBaseline  = "top";
				//				if(window.isAndroid) {
				//					btnWriteWord.txt.font = fonts[0] - window.androidOffsetFontSize + "px " + fonts[1];
				//				}
				btnWriteWord.on("click", clickBtnWriteWord, null, false, null, false);
				btnWriteWord.mouseChildren = false;

				drawCartoonCon = this_.view["drawCartoonCon_" + i];
				drawCartoonCon.key = i;
				drawCartoonCon.cartoonTxt = words[i];
			}
			//			resetBtnAndCartoon();
			resetDrawCartoonCon();
		}

		function clickBtnDelete(e) {
			if(!drawingCanvas.parent) {
				return;
			}
			var btn = e.currentTarget;
			drawingCanvas.graphics.clear();
		}

		function clickBtnWriteWord(e) {
			resetBtnAndCartoon();
			var target = e.currentTarget;
			clickTxtKey = target.key;
			drawCartoonCon = this_.view["drawCartoonCon_" + clickTxtKey];
			drawCartoonCon.visible = true;
			this_.view.btnWrite.isClick = true;
			this_.view.btnWrite.gotoAndStop(1);
			beginDrawWord(this_.view.btnWrite);
		}

		function playCartoon(e) {
			//			console.log("xxx");
			if(isPlayCartoon) {
				//				console.log(this_.name);
				if(playCartoonTime == 0) {
					drawCartoonCon["cartoon_" + playCartoonIndex].gotoAndPlay("start");
				}
				playCartoonTime++;
				if(playCartoonTime == 40) {
					playCartoonTime = 0;
					playCartoonIndex++;
					if(playCartoonIndex == letterLength) {
						isPlayCartoon = false;
					}
				}
			}
		}

		function clickBtnSave(e) {
			if(clickTxtKey < 0 || clickTxtKey >= wordNum || !drawingCanvas.parent) {
				return;
			}
			//  		resetBtnAndCartoon();
			//(x,y,width,height)187 418 1467 337 

			var cloneWriteCanvas = drawingCanvas.clone(true);
			var rect = drawingCanvas.getBounds();
			cloneWriteCanvas.cache(0, 0, limitRight, limitBottom, 1, {
				useGL: "stage"
			});
			var btnSaveWord = this_.view["btnSaveWord_" + clickTxtKey]; //btnSaveWord width 375 height66
			var rect = btnSaveWord.getBounds();
			cloneWriteCanvas.scaleX = rect.width * btnSaveWord.scaleX / limitRight;
			cloneWriteCanvas.scaleY = rect.height * btnSaveWord.scaleY / limitBottom;
			cloneWriteCanvas.x = btnSaveWord.x - rect.width * btnSaveWord.scaleX / 2;
			cloneWriteCanvas.y = btnSaveWord.y - rect.height * btnSaveWord.scaleY / 2;
			if(btnSaveWord.cloneWriteCanvas && btnSaveWord.cloneWriteCanvas.parent) {
				this_.view.removeChild(btnSaveWord.cloneWriteCanvas);
			}
			this_.view.addChild(cloneWriteCanvas);
			btnSaveWord.cloneWriteCanvas = cloneWriteCanvas;
		}

		function resetDrawCartoonCon() {
			var drawCartoonCon;
			for(var i = 0; i < wordNum; i++) {
				drawCartoonCon = this_.view["drawCartoonCon_" + i];
				drawCartoonCon.visible = false;
				drawCartoonCon.cartoonTxt = drawCartoonCon.cartoonTxt.replace(/[" "]/g, '');
				for(var j = 0, len = drawCartoonCon.cartoonTxt.length; j < len; j++) {
					if(drawCartoonCon["cartoon_" + j]) {
						drawCartoonCon["cartoon_" + j].gotoAndStop("start");
					}
				}
			}
		}

		function clickBtnPlay(e) {
			if(clickTxtKey < 0 || clickTxtKey >= wordNum) {
				return;
			}
			resetBtnAndCartoon();
			var btn = e.currentTarget;
			btn.isClick = !btn.isClick;
			var drawCartoonCon = this_.view["drawCartoonCon_" + clickTxtKey];
			drawCartoonCon.visible = true;
			if(btn.isClick) {
				letterLength = drawCartoonCon.cartoonTxt.length;
				playCartoonIndex = 0;
				isPlayCartoon = true;
				btn.gotoAndStop(1);
			} else {
				isPlayCartoon = false;
				btn.gotoAndStop(0);
			}
		}

		function resetBtnAndCartoon() {
			resetDrawCartoonCon();
			this_.view.removeChild(drawingCanvas);
			this_.view.removeEventListener("mousedown", false);
			this_.view.removeEventListener("pressup", false);
			playCartoonTime = 0;
			playCartoonIndex = 0;
			isPlayCartoon = false;
			this_.view.btnPlay.isClick = false;
			this_.view.btnPlay.gotoAndStop(0);
			this_.view.btnWrite.isClick = false;
			this_.view.btnWrite.gotoAndStop(0);
			this_.view.btnSave.isClick = false;
			this_.view.btnSave.gotoAndStop(0);
		}

		function clickBtnWrite(e) {
			if(clickTxtKey < 0 || clickTxtKey >= wordNum) {
				return;
			}
			resetBtnAndCartoon();
			var btn = e.currentTarget;
			btn.isClick = !btn.isClick;
			if(btn.isClick) {
				btn.gotoAndStop(1);
			} else {
				btn.gotoAndStop(0);
			}
			beginDrawWord(btn);
		}

		function beginDrawWord(btn) {
			var drawCartoonCon = this_.view["drawCartoonCon_" + clickTxtKey];
			drawCartoonCon.visible = true;
			if(btn.isClick) {
				this_.view.addChild(drawingCanvas);
				drawingCanvas.graphics.clear();
				this_.view.addEventListener("mousedown", handleMouseDown, false);
				this_.view.addEventListener("pressup", handleMouseUp, false);
			}
		}

		function handleMouseDown(event) {
//			if(!event.primary) {
//				return;
//			}
			//				oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
			var pt = drawingCanvas.globalToLocal(event.stageX, event.stageY);
			if(pt.x < 0 || pt.x > limitRight || pt.y < 0 || pt.y > limitBottom) {
				return;
			}
			oldPt = drawingCanvas.globalToLocal(event.stageX, event.stageY);
			oldMidPt = oldPt.clone();
			this_.view.addEventListener("pressmove", handleMouseMove, false);
		}

		function handleMouseMove(event) {
			if(!event.primary) {
				return;
			} //(x,y,width,height)187 418 1467 337 
			var pt = drawingCanvas.globalToLocal(event.stageX, event.stageY);
			if(pt.x < 0 || pt.x > limitRight || pt.y < 0 || pt.y > limitBottom) {
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
			this_.view.removeEventListener("pressmove", handleMouseMove, false);
		}

	}
	var p = LessonOneDrawWordContainer_3.prototype = new ui.BaseDialog();
	window.ui.LessonOneDrawWordContainer_3 = LessonOneDrawWordContainer_3;
})();
(function() {
	window.ui = window.ui || {};
	var LessonOneExDrawSentenceContainer_12 = function(name_) {
		ui.BaseDialog.call(this);
		this.name = name_;
		var this_ = this;
		var xx = 82;
		var yy = 204;
		var recordPlayManager;
		var suenvaSoundManager;
		var scrollbarListManager;
		var exerciseSoundManager;
		var suenvaSoundNames = {
		}
		this.initView = function() {
			if(this_.lessonData) {
				this_.commonBarCallback("", this_.lessonData);
			}
			if(scrollbarListManager){
				scrollbarListManager.addMyEventListener();
			}
		}
		this.resetView = function() {
			if(this_.lessonData) {
				this_.commonBarCallback("", this_.lessonData);
			}
			if(scrollbarListManager){
				scrollbarListManager.removeMyEventListener();
			}
			if(recordPlayManager){
				recordPlayManager.releaseSound();
			}
		}
		this.init = function(view_, itemIndex_, chapterLessonIds_, lib_, mainScene_, commonBarCallback_) {
			this.view = view_;
			this.temIndex = itemIndex_;
			this.chapterLessonIds = chapterLessonIds_;
			this.lib = lib_;
			this.mainScene = mainScene_;
			this.commonBarCallback = commonBarCallback_;
			var lessonData;
			if(chapterLessonIds_){
				if(chapterLessonIds_[0] > 0) {
					lessonData = this.getDataById(chapterLessonIds_[0], chapterLessonIds_[1]);
				} else {
					lessonData = this.getDataById(chapterLessonIds_[0]);
				}
				this_.lessonData = lessonData;
				this_.commonBarCallback("", lessonData);
			}
			
			if(this.view.lessonName){
				this.view.x = 82; 
				this.view.y = 140;
			}else if(this.name == "uiLessonThirteenExercise_6_pop"){
				
			}else{
				this.view.x = xx;
				this.view.y = yy;
			}
			//重置按钮
			this_.view.btnReset.mouseChildren = false;
			this_.view.btnReset.cursor = "pointer";
			this_.view.btnReset.addEventListener("pressup", function(e) {
				scrollbarListManager.clear();
				this_.view.btnReset.scaleX = this_.view.btnReset.scaleY = 1;
			}, false);
			this_.view.btnReset.addEventListener("mousedown", function(e) {
				this_.view.btnReset.scaleX = this_.view.btnReset.scaleY = 1.5;
			}, false);
			var btnWordSave;
			if(this_.view.btnWordSave){
				btnWordSave = this_.view.btnWordSave;
				btnWordSave.cursor = "pointer";
				btnWordSave.mouseChildren = false;
				btnWordSave.on("click", clickBtnSave, false);
			}
			
			initScrollbarList();
			initRecordPlay();
			initSuenvaSound();
			initExerciseSound();
		}
		function initScrollbarList(){
			scrollbarListManager = new ui.ScrollbarListContainer(this_.view, this_.lib);
		}
		function initExerciseSound() {
			var isExerciseTxt = false;
			var startIndex = 0;
			for(var i = 0; i < 10; i++) {
				if(this_.view["exerciseTxt_" + i]) {
					isExerciseTxt = true;
					startIndex = i;
					break;
				}
			}
			var lessonData = this_.lessonData;
			if(isExerciseTxt) {
				exerciseSoundManager = new ui.ExerciseSoundContainer(this_.view, lessonData.exercises);
			}
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
			var instance;
			if(!btnRecord) {
				for(var i = 0; i < 10; i++) {
					if(i == 0) {
						instance = this_.view.instance;
					} else {
						instance = this_.view["instance_" + i];
					}
					if(!instance || !(typeof(instance) == Object)) {
						break;
					} else {
						if(!btnRecord) {
							btnRecord = instance instanceof this_.lib.BtnRecord ? instance : null;
						}
						if(!btnPlay) {
							btnPlay = instance instanceof this_.lib.BtnPlay ? instance : null;
						}
					}
				}
			}
			if(btnPlay && !recordPlayManager) {
				recordPlayManager = new ui.RecordPlayContainer(btnRecord, btnPlay, this_.name);
			}
		}
		
		function clickBtnSave(e) {
			scrollbarListManager.cloneWriteCanvas();
		}
		

		function initSuenvaSound() {
			if(suenvaSoundNames.hasOwnProperty(this_.name)) {
				var lessonData = this_.lessonData;
				var subjectData = window.data.getSubjectDataByI(this_.lessonData.subjects, suenvaSoundNames[this_.name][0], suenvaSoundNames[this_.name][1])
				if(!suenvaSoundManager) {
					suenvaSoundManager = new ui.SuenvaSoundContainer(this_.view, subjectData, suenvaSoundNames[this_.name][0], suenvaSoundNames[this_.name][1]);
				}
			}
		}
	}
	var Super = function() {};
	Super.prototype = ui.BaseDialog.prototype;
	LessonOneExDrawSentenceContainer_12.prototype = new Super();
	window.ui.LessonOneExDrawSentenceContainer_12 = LessonOneExDrawSentenceContainer_12;
})();
(function() {
	window.ui = window.ui || {};

	var LessonOneExLineationContainer_13 = function(name_) {
		ui.BaseDialog.call(this);
		this.name = name_;
		var this_ = this;
		var oneDimensionalSubNum = 3;
		var twoDimensionWords = ["faexcoengz", "saekloeg", "gyaeundei"];
		var BTN_TYPE_JUDMENT = 1;
		var BTN_TYPE_RESET = 2;
		var answerObj = {
			0: ["ae", "oeng"],
			1: ["aek", "oeg"],
			2: ["aeu", "ei"],
		}
		var xx=82;
		var yy=204;
		this.initView = function(){
			if(this_.lessonData){
				this_.commonBarCallback("", this_.lessonData);
			}
			if(popDialogManager){
				popDialogManager.initView();
			}
		}
		var popDialogManager;
		this.resetView = function() {
			if(popDialogManager){
				popDialogManager.resetView();
			}
		}
		this.init = function(view_, itemIndex_, chapterLessonIds_, lib_, mainScene_, commonBarCallback_) {
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
			if(this.name == "uiLessonOneEx_4") {
				oneDimensionalSubNum = 3;
				twoDimensionalSubNum = 0;
				twoDimensionWords = ["faexcoengz", "saekloeg", "gyaeundei"];
				answerObj = {
					0: ["ae", "oeng"],
					1: ["aek", "oeg"],
					2: ["aeu", "ei"],
				}
				initWords();
			} else if(this.name == "uiLessonOneEx_6") {
				oneDimensionalSubNum = 2;
				twoDimensionalSubNum = 0;
				twoDimensionWords = ["faexcoengz", "vagut"];
				answerObj = {
					0: [3],
					1: [1],
				}
				initSlashLine();
				initPop();
			} else if(this.name == "uiLessonOneEx_10") {
				oneDimensionalSubNum = 2;
				twoDimensionalSubNum = 2;
				twoDimensionWordObj = {
					0: ["gwn", "gwnz"],
					1: ["caeu", "cou"],
				}
				answerObj = {
					0: 0,
					1: 0,
				}
				initWordHorizontalLine();
			}else if(this.name == "uiLessonSevenExercise_8") {
				oneDimensionalSubNum = 4;
				twoDimensionalSubNum = 2;
				twoDimensionWordObj = {
					0: ["gae", "gaeq"],
					1: ["gei", "geiz"],
					2: ["dangq", "dang"],
					3: ["dau", "dauq"],
				}
				answerObj = {
					0: 0,
					1: 0,
					2: 1,
					3: 0,
				}
				initWordHorizontalLine();
			}else if(this.name == "uiLessonElevenExercise_4") {
				oneDimensionalSubNum = 6;
				twoDimensionalSubNum = 2;
				twoDimensionWordObj = {
					0: ["da", "dah"],
					1: ["nau", "nauh"],
					2: ["faex", "feix"],
					3: ["rieng", "riengz"],
					4: ["rongx", "rongh"],
					5: ["gamj", "ganj"],
				}
				answerObj = {
					0: 0,
					1: 0,
					2: 1,
					3: 0,	
					4: 0,
					5: 1,
				}
				initWordHorizontalLine();
			} else if(this.name == "uiLessonFiveExercise_4") {
				oneDimensionalSubNum = 4;
				twoDimensionalSubNum = 2;
				twoDimensionWordObj = {
					0: ["daengq", "daeng"],
					1: ["yum","nyum"],
					2: ["nomj", "momj"],
					3: ["nyaek","yaek"],
				}
				answerObj = {
					0: 1,
					1: 0,
					2: 0,
					3: 1,
				}
				initWordHorizontalLine();
			}  else if(this.name == "uiGenjcwzdizGeizSatbyai_7") {
				oneDimensionalSubNum = 4;
				twoDimensionalSubNum = 2;
				twoDimensionWordObj = {
					0: ["haeuj", "haeu"],
					1: ["hap","hab"],
					2: ["dox", "doz"],
					3: ["raemx","laemx"],
				}
				answerObj = {
					0: 1,
					1: 0,
					2: 1,
					3: 1,
				}
				initWordHorizontalLine();
			} else if(this.name == "uiSuenvaTwo_0") {
				oneDimensionalSubNum = 4;
				twoDimensionalSubNum = 2;
				twoDimensionWordObj = {
					0: ["haet", "hat"],
					1: ["lemx","lemz"],
					2: ["youz", "youx"],
					3: ["nyin","nyinh"],
				}
				answerObj = {
					0: 1,
					1: 1,
					2: 0,
					3: 0,
				}
				initWordHorizontalLine();
			} 
			else if(this.name == "uiLessonTwoEx_1") {
				oneDimensionalSubNum = 1;
				twoDimensionalSubNum = 0;
				twoDimensionWords = ["Mwngzyawjdedawzsaekhenjhawjmbawfaex"];
				answerObj = {
					0: ["M", "y", "d", "d", "s", "h", "h", "mb", "f"],
				}
				initWords();
			} else if(this.name == "uiLessonTwoEx_4") {
				oneDimensionalSubNum = 5;
				twoDimensionalSubNum = 0;
				twoDimensionWords = ["riengzhaeux", "feihdauh", "daiq", "hawj", "lajmbwn"];
				answerObj = {
					0: ["z", "x"],
					1: ["h", "h"],
					2: ["q"],
					3: ["j"],
					4: ["j"],
				}
				initWords();
			} else if(this.name == "uiLessonTwoEx_5") {
				oneDimensionalSubNum = 4;
				twoDimensionalSubNum = 0;
				twoDimensionWords = ["liengzsisi", "mbawfaex", "ciengqgo", "lwggyoij"];
				answerObj = {
					0: [5, 7],
					1: [3],
					2: [5],
					3: [2],
				}
				initSlashLine();
				initPop();
			}else if(this.name == "uiLessonSeventeenExercise_4") {
				oneDimensionalSubNum = 2;
				twoDimensionalSubNum = 0;
				twoDimensionWords = ["Dahmingzgyangh", "capmax"];
				answerObj = {
					0: [2,7],
					1: [2],
				}
				initSlashLine();
			}else if(this.name == "uiGenjcwzdizGeizSatbyai_3") {
				oneDimensionalSubNum = 6;
				twoDimensionalSubNum = 0;
				twoDimensionWords = ["siengq", "dat","dauq","dingh","saek","ngoenz"];
				answerObj = {
					0: [0,4],
					1: [0],
					2: [0,2],
					3: [0,3],
					4: [0],
					5: [1,4],
				}
				initSlashLine();
			}else if(this.name == "uiLessonSeventeenExercise_5") {
				oneDimensionalSubNum = 3;
				twoDimensionalSubNum = 0;
				twoDimensionWords = ["baujgimq", "mauhdingj", "ciuhgonq"];
				answerObj = {
					0: [3],
					1: [3],
					2: [3],
				}
				initSlashLine();
			}else if(this.name == "uiLessonSeventeenExercise_6") {
				oneDimensionalSubNum = 2;
				twoDimensionalSubNum = 0;
				twoDimensionWords = ["doenghyiengh", "dijbauj"];
				answerObj = {
					0: [0,4,5,6,10],
					1: [0,1,2,3,5],
				}
				initSlashLine();
			}else if(this.name == "uiLessonSeventeenExercise_7") {
				oneDimensionalSubNum = 2;
				twoDimensionalSubNum = 0;
				twoDimensionWords = ["bouxdaeuz", "loekci"];
				answerObj = {
					0: [0,2,3,4,8],
					1: [0,3,4],
				}
				initSlashLine();
			} else if(this.name == "uiSuenvaOne_1") {     //没有答案//没有答案//没有答案
				oneDimensionalSubNum = 4;
				twoDimensionalSubNum = 0;
				twoDimensionWords = ["hoengz", "ngux", "gyoengqvunz", "yaekseiz"];
				answerObj = {
						0:[0,4],
						1:[1,2],
						2:[6],
						3:[3],
				}
				initSlashLine();
			}else if(this.name == "uiLessonFiveExercise_1") {
				oneDimensionalSubNum = 1;
				twoDimensionalSubNum = 0;
				twoDimensionWords = ["DoeklaengCanghLiengznyinhcaendoegbonjsawbingfapneixcaenbaenzbouxcienghginhdahraix"];
				answerObj = {
					0: ["oek", "aeng", "ang", "ieng", "in", "aen", "oeg", "on", "aw", "ing", "ap", "ei", "aen", "aen", "ou", "ieng", "in","a","ai"],
				}
				initWords();
			}
			if(this.view.lessonName){
				this.view.x = 82; 
				this.view.y = 140;
			}else{
				this.view.x = xx;
				this.view.y = yy;
			}

		}
		function initPop(){
			var popDialog;
			if(this_.view.pop){
				popDialog = this_.view.pop;
				popDialog.visible = false;
				popDialogManager = new ui.LessonOneDrawWordContainer_3(this_.name + "_pop");
				popDialogManager.init(this_.view.pop);
				popDialogManager.initView();
				var btnOpenPop = this_.view.btnOpenPop;
				btnOpenPop.mouseChildren = false;
				btnOpenPop.cursor = "pointer";
				btnOpenPop.addEventListener("click", function(e){
					popDialog.visible = true;
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

		function initSlashLine() {
			resetSlashLine(true);
			this_.view.btnJudgment.cursor = "pointer";
			this_.view.btnJudgment.mouseChildren = false;
			this_.view.btnJudgment.on("click", clickBtnJudgmentSlashLineRightWrong, null, false, null, false);
			this_.view.btnJudgment.on("pressup", function(e) {
				this_.view.btnJudgment.scaleX = this_.view.btnJudgment.scaleY = 1;
			}, null, false, null, false);
			this_.view.btnJudgment.on("mousedown", function(e) {
				this_.view.btnJudgment.scaleX = this_.view.btnJudgment.scaleY = 1.5;
			}, null, false, null, false);
			this_.view.btnReset.cursor = "pointer";
			this_.view.btnReset.mouseChildren = false;
			this_.view.btnReset.on("click", clickBtnResetSlashLine, null, false, null, false);
			this_.view.btnReset.on("pressup", function(e) {
				this_.view.btnReset.scaleX = this_.view.btnReset.scaleY = 1;
			}, null, false, null, false);
			this_.view.btnReset.on("mousedown", function(e) {
				this_.view.btnReset.scaleX = this_.view.btnReset.scaleY = 1.5;
			}, null, false, null, false);
		}

		function clickSlashLine(e) {
			var slashLine_ = e.currentTarget;
			slashLine_.isSelected = !slashLine_.isSelected;
			if(slashLine_.isSelected) {
				slashLine_.line.visible = true;
			} else {
				slashLine_.line.visible = false;
			}
			slashLine_.red.visible = false;
			slashLine_.green.visible = false;
		}

		function clickBtnJudgmentSlashLineRightWrong(e) {
			var twoDimensionalLen = 0;
			var words;
			var slashLine;
			var btnRightWrong;
			var rightNum = 0;
			var str = "";
			for(var i = 0; i < oneDimensionalSubNum; i++) {
				btnRightWrong = this_.view["btnRightWrong_" + i];
				btnRightWrong.visible = true;
				words = twoDimensionWords[i].split("");
				twoDimensionalLen = words.length;
				str = "";
				for(var j = 0; j < twoDimensionalLen; j++) {
					slashLine = this_.view["slashLine_" + i + "_" + j];
					if(slashLine) {
						if(slashLine.isSelected) {
							if(str.length > 0) {
								str += "," + slashLine.twoDimensionalIndex;
							} else {
								str += slashLine.twoDimensionalIndex;
							}
							if(answerObj[i].indexOf(slashLine.twoDimensionalIndex) != -1) {
								slashLine.green.visible = true;
							} else {
								slashLine.red.visible = true;
							}
						} else {}
					}
				}
				if(str === answerObj[i].toString()) {
					btnRightWrong.gotoAndStop(0);
					rightNum++;
				} else {
					btnRightWrong.gotoAndStop(1);
				}
			}
			if(rightNum >= oneDimensionalSubNum){
				createjs.Sound.play(window.ANSWER_RIGHT_Id);
			}else{
				createjs.Sound.play(window.ANSWER_WRONG_Id);
			}
		}

		function clickBtnResetSlashLine(e) {
			resetSlashLine(false);
		}

		function resetSlashLine(isAddEvent) {
			var twoDimensionalLen = 0;
			var words;
			var slashLine;
			var btnRightWrong;
			for(var i = 0; i < oneDimensionalSubNum; i++) {
				btnRightWrong = this_.view["btnRightWrong_" + i];
				btnRightWrong.visible = false;
				words = twoDimensionWords[i].split("");
				twoDimensionalLen = words.length;
				for(var j = 0; j < twoDimensionalLen; j++) {
					slashLine = this_.view["slashLine_" + i + "_" + j];
					if(slashLine) {
						slashLine.twoDimensionalIndex = j;
						slashLine.isSelected = false;
						slashLine.line.visible = false;
						slashLine.red.visible = false;
						slashLine.green.visible = false;
						if(isAddEvent) {
							slashLine.cursor = "pointer";
							slashLine.on("click", clickSlashLine, null, false, null, false);
						}
					}
				}
			}
		}

		function initWordHorizontalLine() {
			var wordHorizontalLine;
			var btnRightWrong;
//			var fonts = this_.view["wordHorizontalLine_0_1"].txt.font.split("px ");
			for(var i = 0; i < oneDimensionalSubNum; i++) {
				btnRightWrong = this_.view["btnRightWrong_" + i];
				btnRightWrong.visible = false;
				for(var j = 0; j < twoDimensionalSubNum; j++) {
					wordHorizontalLine = this_.view["wordHorizontalLine_" + i + "_" + j];
					wordHorizontalLine.cursor = "pointer";
					wordHorizontalLine.mouseChildren = false;
					wordHorizontalLine.oneDimensionalIndex = i;
					wordHorizontalLine.twoDimensionalIndex = j;
//					wordHorizontalLine.txt.visible=false;
//					wordHorizontalLine.txt.text = twoDimensionWordObj[i][j];
//					if(window.isAndroid) {
//						wordHorizontalLine.txt.font = fonts[0] - window.androidOffsetFontSize*2 + "px " + fonts[1];
//						wordHorizontalLine.line.y+=6;
//					}
					wordHorizontalLine.line.visible = false;
					wordHorizontalLine.addEventListener("click", clickWordHorizontalLine, false);
				}
			}
			initBtnJudgmentAndReset(this_.view["btnJudgment"], BTN_TYPE_JUDMENT);
			initBtnJudgmentAndReset(this_.view["btnReset"], BTN_TYPE_RESET);
		}
		function initBtnJudgmentAndReset(btn_, key_){
			if(!btn_){
				return;
			}
			btn_.mouseChildren = false;
			btn_.cursor = "pointer";
			btn_.key = key_;
			btn_.addEventListener("click", onClickHorizontalLine, false);
			btn_.addEventListener("pressup", onPressUp, false);
			btn_.addEventListener("mousedown", onMouseDown, false);
			function onPressUp(e){
				var btn = e.target;
				btn.scaleX = btn.scaleY = 1;
			}
			function onMouseDown(e){
				var btn = e.target;
				btn.scaleX = btn.scaleY = 1.5;
			}
		}

		function onClickHorizontalLine(e){
			var btn = e.target;
			var btnRightWrong;
			var scoreTotal = 0;
			if(btn.key == BTN_TYPE_JUDMENT){
				var wordHorizontalLine;
				for(var i = 0; i < oneDimensionalSubNum; i++) {
					btnRightWrong = this_.view["btnRightWrong_" + i];
					btnRightWrong.visible = true;
					for(var j = 0; j < twoDimensionalSubNum; j++) {
						wordHorizontalLine = this_.view["wordHorizontalLine_" + i + "_" + j];
						if(wordHorizontalLine.isClick){
							if(j == answerObj[i]) {
								btnRightWrong.gotoAndStop(0);
								scoreTotal++;
							} else {
								btnRightWrong.gotoAndStop(1);
							}
							break;
						}else{
							btnRightWrong.gotoAndStop(1);
						}
					}
				}
				if(scoreTotal >= oneDimensionalSubNum){
					createjs.Sound.play(window.ANSWER_RIGHT_Id);
				}else{
					createjs.Sound.play(window.ANSWER_WRONG_Id);
				}
			}else if(btn.key == BTN_TYPE_RESET){
				for(var i = 0; i < oneDimensionalSubNum; i++) {
					resetWordHorizontalLine(i);
				}
			}
		}
		function clickWordHorizontalLine(e) {
			var wordHorizontalLine_ = e.target;
			var i_ = wordHorizontalLine_.oneDimensionalIndex;
			var btnRightWrong_ = this_.view["btnRightWrong_" + i_];
			resetWordHorizontalLine(i_);
			wordHorizontalLine_.line.visible = true;
			wordHorizontalLine_.isClick = true;
		}

		function resetWordHorizontalLine(oneDimensional) {
			var i = oneDimensional;
			var btnRightWrong = this_.view["btnRightWrong_" + i];
			btnRightWrong.visible = false;
			var wordHorizontalLine;
			for(var j = 0; j < twoDimensionalSubNum; j++) {
				wordHorizontalLine = this_.view["wordHorizontalLine_" + i + "_" + j];
				wordHorizontalLine.line.visible = false;
				wordHorizontalLine.isClick = false;
			}
		}

		function initWords() {
			var twoDimensionalLen = 0;
			var words;
			var alphabetItem;
			var fonts = this_.view["alph_0_0"].txt.font.split("px ");
			var btnRightWrong;
			for(var i = 0; i < oneDimensionalSubNum; i++) {
				btnRightWrong = this_.view["btnRightWrong_" + i];
				btnRightWrong.visible = false;
				words = twoDimensionWords[i].split("");
				twoDimensionalLen = words.length;
				for(var j = 0; j < twoDimensionalLen; j++) {
					alphabetItem = this_.view["alph_" + i + "_" + j];
					if(window.isAndroid){
						alphabetItem.line.y +=15;
					}
					alphabetItem.cursor = "pointer";
					alphabetItem.txt.text = words[j];
					if(window.isAndroid) {
						alphabetItem.txt.font = fonts[0] - window.androidOffsetFontSize + "px " + fonts[1];
					}
					alphabetItem.red.visible = false;
					alphabetItem.green.visible = false;
					alphabetItem.line.visible = false;
					alphabetItem.isSelected = false;
					alphabetItem.on("click", clickAlphabetItem, null, false, null, false);
				}
			}
			this_.view.btnJudgment.cursor = "pointer";
			this_.view.btnJudgment.on("click", clickBtnJudgmentRightWrong, null, false, null, false);
			this_.view.btnJudgment.on("pressup", function(e) {
				this_.view.btnJudgment.scaleX = this_.view.btnJudgment.scaleY = 1;
			}, null, false, null, false);
			this_.view.btnJudgment.on("mousedown", function(e) {
				this_.view.btnJudgment.scaleX = this_.view.btnJudgment.scaleY = 1.5;
			}, null, false, null, false);
			this_.view.btnReset.cursor = "pointer";
			this_.view.btnReset.on("click", clickBtnResetWords);
			this_.view.btnReset.on("pressup", function(e) {
				this_.view.btnReset.scaleX = this_.view.btnReset.scaleY = 1;
			}, null, false, null, false);
			this_.view.btnReset.on("mousedown", function(e) {
				this_.view.btnReset.scaleX = this_.view.btnReset.scaleY = 1.5;
			}, null, false, null, false);
		}

		function clickAlphabetItem(e) {
			var alphabetItem_ = e.currentTarget;
			alphabetItem_.isSelected = !alphabetItem_.isSelected;
			if(alphabetItem_.isSelected) {
				alphabetItem_.line.visible = true;
			} else {
				alphabetItem_.line.visible = false;
			}
			alphabetItem_.red.visible = false;
			alphabetItem_.green.visible = false;
		}

		function clickBtnJudgmentRightWrong(e) {
			var twoDimensionalLen = 0;
			var words;
			var alphabetItem;
			var str = "",
				tempStr = "";
			var clickWords = [];
			var i = 0;
			for(i = 0; i < oneDimensionalSubNum; i++) {
				words = twoDimensionWords[i].split("");
				twoDimensionalLen = words.length;
				str = "";
				tempStr = "";
				var clickAlphabetItems = [];
				for(var j = 0; j < twoDimensionalLen; j++) {
					alphabetItem = this_.view["alph_" + i + "_" + j];
					if(alphabetItem.isSelected) {
						clickAlphabetItems.push(alphabetItem);
						str += alphabetItem.txt.text;
						tempStr += alphabetItem.txt.text;
						if(j == twoDimensionalLen - 1) {
							if(tempStr.length > 0) {
								if(answerObj[i].indexOf(tempStr) != -1) {
									changeBGColor(true, clickAlphabetItems);
								} else {
									changeBGColor(false, clickAlphabetItems);
								}
								tempStr = "";
								clickAlphabetItems = [];
							}
						}
					} else {
						if(tempStr.length > 0) {
							if(answerObj[i].indexOf(tempStr) != -1) {
								changeBGColor(true, clickAlphabetItems);
							} else {
								changeBGColor(false, clickAlphabetItems);
							}
							tempStr = "";
							clickAlphabetItems = [];
						}
					}
				}
				clickWords.push(str);
			}
		
			var btnRightWrong;
			var arr;
			var rightNum = 0;
			for(i = 0; i < oneDimensionalSubNum; i++) {
				btnRightWrong = this_.view["btnRightWrong_" + i];
				btnRightWrong.visible = true;
				if(clickWords[i] == answerObj[i].toString().replace(/[","]/g, '')) {
					btnRightWrong.gotoAndStop(0);
					rightNum++;
				} else {
					btnRightWrong.gotoAndStop(1);
				}
			}
			if(rightNum >= oneDimensionalSubNum){
				createjs.Sound.play(window.ANSWER_RIGHT_Id);
			}else{
				createjs.Sound.play(window.ANSWER_WRONG_Id);
			}
		}

		function changeBGColor(isRight, clickAlphabetItems) {
			var item;
			for(var m = 0, len = clickAlphabetItems.length; m < len; m++) {
				item = clickAlphabetItems[m];
//				item.line.visible = true;
				if(isRight) {
					item.green.visible = true;
					item.red.visible = false;
				} else {
					item.red.visible = true;
					item.green.visible = false;
				}
			}
		}

		function clickBtnResetWords(e) {
			var twoDimensionalLen = 0;
			var words;
			var alphabetItem;
			var btnRightWrong;
			for(var i = 0; i < oneDimensionalSubNum; i++) {
				btnRightWrong = this_.view["btnRightWrong_" + i];
				btnRightWrong.visible = false;
				words = twoDimensionWords[i].split("");
				twoDimensionalLen = words.length;
				for(var j = 0; j < twoDimensionalLen; j++) {
					alphabetItem = this_.view["alph_" + i + "_" + j];
					alphabetItem.txt.text = words[j];
					alphabetItem.red.visible = false;
					alphabetItem.green.visible = false;
					alphabetItem.line.visible = false;
					alphabetItem.isSelected = false;
				}
			}
		}
	}
	var Super = function() {};
	Super.prototype = ui.BaseDialog.prototype;
	LessonOneExLineationContainer_13.prototype = new Super();
	window.ui.LessonOneExLineationContainer_13 = LessonOneExLineationContainer_13;
})();

(function() {
	window.ui = window.ui || {};

	var LessonOnePlaySoundContainer_0 = function(name_) {
		ui.BaseDialog.call(this);
		this.name = name_;
		var this_ = this;
		var xx = 82;
		var yy = 204;
		var paragraphsLength = 0;
		var wordsLength = 0;
		var imgWords;
		var mcPlay;
		var num = 0;
		var hideTxts;
		var txts = [];
		var btnSounds = [];
		var recordPlayManager;
		var suenvaSoundManager;
		var viewClickWordNames = {};
		var suenvaSoundNames = {
			"uiSuenvaOne_7": [3, 2],
			"uiSuenvaTwo_1": [1, 2],
			"uiSuenvaTwo_7": [3, 2],
			"uiSuenvaTwo_8": [3, 3],
			"uiSuenvaThree_1": [1, 2],
			"uiSuenvaThree_7": [3, 2],
			"uiSuenvaFour_1": [1, 2],
			"uiSuenvaFour_11": [3, 3],
			"uiSuenvaFive_0": [1, 1],
			"uiSuenvaFive_3": [1, 4],
			"uiSuenvaFive_10": [3, 1],
			"uiSuenvaFive_12": [3, 3],
			"uiSuenvaSix_0": [1, 1],
			"uiSuenvaSix_1": [1, 1],
			"uiSuenvaSix_3": [1, 3],
			"uiSuenvaSix_13": [3, 4],
			"uiSwz_0": [1, 1],
			"uiSwz_1": [1, 1],
			"uiSwz_2": [1, 1], //2
			"uiSwz_3": [1, 2],
			"uiSwz_4": [1, 2],
			"uiSwz_5": [1, 2], //3
			"uiSwz_6": [1, 3],
			"uiSwz_7": [1, 3], //4
			"uiSwz_8": [1, 4],
			"uiSwz_9": [1, 4],
		};
		var poetryObj = {
			"uiLessonNine_0": 0,
			"uiLessonNine_1": 0,
			"uiLessonNine_3": 0,
			"uiLessonNine_4": 0,
			"uiLessonTwelve_0": 0,
			"uiLessonTwelve_2": 0,
			"uiLessonFifteen_0": 0,
			"uiLessonFifteen_1": 0,
			"uiLessonFifteen_3": 0,
			"uiLessonFifteen_4": 0,
			"uiLessonFifteen_5": 0,
			"uiLessonEighteen_0": 0,
			"uiLessonEighteen_2": 0,
			"uiLessonSix_0": 0,
			"uiLessonSix_1": 0,
			"uiLessonSix_3": 0,
			"uiLessonSix_4": 0,

		};

		var onePageManySoundObj = {
			"uiSwz_2": [1, 2],
			"uiSwz_5": [1, 3],
			"uiSwz_7": [1, 4],
		}
		var viewXY = {
			"uiLessonSixteen_4": [82, 159],
			"uiLessonTwo_2": [320, 280],
			"uiLessonThree_1": [310, 220],
			"uiLessonFour_2": [320, 240],
			"uiLessonFive_3": [345, 220],
			"uiLessonSeven_3": [345, 210],
			"uiLessonEight_2": [320, 210],
			"uiLessonNine_2": [330, 210],
			"uiLessonTen_2": [330, 210],
			"uiLessonEleven_2": [330, 210],
			"uiLessonTwelve_1": [350, 300],
			"uiLessonFifteen_2": [360, 200],
			"uiLessonEighteen_1": [370, 250],
			"uiLessonFourteen_1": [82, 180],
		};
		var hideObject = {
			"uiLessonNine_3": ["txt_0", "txt_1", "txt_2"],
			"uiLessonNine_4": ["txt_0"],
			"uiLessonTwelve_2": ["txt_0", "txt_1", "txt_2", "txt_3"],
			"uiLessonEighteen_2": ["txt_0", "txt_1", "txt_2", "txt_3"],
			"uiLessonTwo_3": ["txt_0", "txt_1", "txt_2"],
			"uiLessonTwo_4": ["txt_0", "txt_1", "txt_2"],
			"uiLessonFifteen_3": ["txt_0", "txt_1"],
			"uiLessonFifteen_4": ["txt_0", "txt_1"],
			"uiLessonFifteen_5": ["txt_0", "txt_1"],
		}
		var isTitleSounding = false;
		this.initView = function() {
			if(this_.lessonData) {
				this_.commonBarCallback("", this_.lessonData);
			}
			if(this_.view.audioplayback) {
				mcPlay = setInterval(function() {
					this_.view.audioplayback.mc.gotoAndPlay(0);
				}, 700)
			}
		}
		this.resetView = function() {
			if(!isTitleSounding){
				createjs.Sound.stop();
			}
			resetBtnSoundTextStatus();
			clearInterval(mcPlay);
			if(recordPlayManager) {
				recordPlayManager.releaseSound();
			}
			if(suenvaSoundManager){
				suenvaSoundManager.resetBtnSoundTextStatus();
			}
		}
		this.init = function(view_, itemIndex_, chapterLessonIds_, lib_, mainScene_, commonBarCallback_) {
			var view = this.view = view_;
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

			initSuenvaSound();
			initRecordPlay();
			initClickWord();
			initWordImg();
			initWord();
			initLessonNameAndParagraphSounds(itemIndexArr);
			if(view.lessonName) {
				if(this_.name.indexOf("iSwz") > 0) {
					view.x = 194;
				} else {
					view.x = 82;
				}
				view.y = 140;
			} else if(viewXY.hasOwnProperty(this.name)) {
				view.x = viewXY[this.name][0];
				view.y = viewXY[this.name][1];
			} else if(this_.name.indexOf("iSwz") > 0) {
				view.x = 194;
				view.y = 204;
			} else {
				view.x = xx;
				view.y = yy;
			}

			initBtnBack();
		}

		function initSuenvaSound() {
			if(suenvaSoundNames.hasOwnProperty(this_.name)) {
				var lessonData = this_.lessonData;
				var subjectData = window.data.getSubjectDataByI(this_.lessonData.subjects, suenvaSoundNames[this_.name][0], suenvaSoundNames[this_.name][1]);
				if(!suenvaSoundManager) {
					suenvaSoundManager = new ui.SuenvaSoundContainer(this_.view, subjectData, suenvaSoundNames[this_.name][0], suenvaSoundNames[this_.name][1]);
				}
				if(onePageManySoundObj.hasOwnProperty(this_.name)) {
					var arr = onePageManySoundObj[this_.name];
					subjectData = window.data.getSubjectDataByI(this_.lessonData.subjects, arr[0], arr[1]);
					suenvaSoundManager.initOnePageManySound(subjectData, arr[0], arr[1]);
				}
			}
		}

		function initClickWord() {
			if(viewClickWordNames.hasOwnProperty(this_.name)) {
				imgWords = viewClickWordNames[this_.name];
			}
			initWordOrExerciseSoundAndFont(this_.lessonData);
		}

		function initBtnBack() {
			var btnBack = this_.view.btnBack;
			if(btnBack) {
				btnBack.mouseChildren = false;
				btnBack.isClick = false;
				btnBack.addEventListener("click", hideTxt, false);
				btnBack.addEventListener("pressup", function(e) {
					btnBack.scaleX = btnBack.scaleY = 1;
				}, false);
				btnBack.addEventListener("mousedown", function(e) {
					btnBack.scaleX = btnBack.scaleY = 1.5;
				}, false);
			}
		}

		function hideTxt() {
			hideTxts = hideObject[this_.name];
			if(num == 0) {
				for(var i = 0; i < hideTxts.length; i++) {
					this_.view[hideTxts[i]].visible = false;
				}
				num = 1;
			} else {
				for(var i = 0; i < hideTxts.length; i++) {
					this_.view[hideTxts[i]].visible = true;
				}
				num = 0;
			}
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
			if(btnPlay && !recordPlayManager) {
				recordPlayManager = new ui.RecordPlayContainer(btnRecord, btnPlay, this_.name);
			}
		}

		function initWord() {
			if(this_.view.word_0) {
				xx = 301;
				yy = 194;
			}
		}

		function initWordImg() {
			var wordImg = this_.view.wordImg || this_.view.fillImg;
			if(wordImg) {
				if(wordImg.instance) {
					wordImg.instance.spriteSheet = "";
					wordImg.instance = null;
				}
				if(wordImg.shape) {
					wordImg.shape.graphics.clear();
					wordImg.shape = null;
				}
				if(this_.name == "uiLessonOne_10") {
					wordImg.scaleX = wordImg.scaleY = 0.6;
				} else if(this_.name == "uiLessonEleven_0") {
					wordImg.scaleX = wordImg.scaleY = 0.9;
				}
				var changeImg;
				var bit = new createjs.Bitmap(window.PIC_PATH + "lesson_" + this_.lessonData.lessonId + "/lesson_" + this_.lessonData.lessonId + ".jpg");
				wordImg.img = bit;
				bit.alpha = 1;
				//				if(this_.view.word_0){
				//					wordImg.txt.text = this_.view.word_0.text;
				//				}
				wordImg.addChild(bit);
			}
			//			if(imgWords){
			//				for(var i = 0, len = imgWords.length; i < len; i++) {
			//					changeImg = this_.view["changeImg_" + i];
			//					changeImg.cursor = "pointer";
			//					changeImg.key = i;
			//					changeImg.word = imgWords[i];
			//					changeImg.on("click", changeImgAndWord, null, false, null, false);
			//				}
			//			}
		}

		function initWordOrExerciseSoundAndFont(lessonData) {
			var isExerciseTxt = false;
			var startIndex = 0;
			for(var i = 0; i < 10; i++) {
				if(this_.view["exerciseTxt_" + i]) {
					isExerciseTxt = true;
					startIndex = i;
					break;
				}
			}
			var fonts;
			var namePrefix = "";
			var btnPrefix = "";
			if(this_.view["word_0"]) {
				namePrefix = "word_";
				btnPrefix = "btnWordSound_";
				loadWordOrExerciseSound(lessonData.words, namePrefix, btnPrefix);
			} else if(isExerciseTxt) {
				namePrefix = "exerciseTxt_";
				btnPrefix = "btnExerciseSound_";
				loadWordOrExerciseSound(lessonData.exercises, namePrefix, btnPrefix);
			}
			if(namePrefix.length > 0) {
				fonts = this_.view[namePrefix + startIndex].font.split("px ");
				for(var i = 0; i < wordsLength; i++) {
					txt = this_.view[namePrefix + i];
					if(window.isAndroid) {
						txt.font = fonts[0] - window.androidOffsetFontSize + "px " + fonts[1];
					}
				}
			}
		}

		function initLessonNameAndParagraphSounds(itemIndexArr_) {
			var fonts;
			var view = this_.view;
			var txt = view["lessonName"] || view["lessonId"];
			if(txt) {
				fonts = txt.font.split("px ");
				if(window.isAndroid) {
					if(view["lessonId"]) {
						view["lessonId"].font = fonts[0] - window.androidOffsetFontSize + "px " + fonts[1];
					}
					if(view["lessonName"]) {
						view["lessonName"].font = fonts[0] - window.androidOffsetFontSize + "px " + fonts[1];
					}
				}
			}
			if(view["lessonName"]) {
				var btnSound = view["btnSound"];
				if(btnSound) {
					btnSound.cursor = "pointer";
					btnSound.mouseChildren = false;
					btnSound.soundId = this_.lessonData.titleSound;
					txt = view["lessonName"];
					btnSound.txt = txt;
					btnSound.txtColor = txt.color;
					txts.push(txt);
					btnSounds.push(btnSound);
					btnSound.isTitle = true;
					btnSound.addEventListener("click", playLessonNameAndParagraphSound, false);
				}
			}
			var paragraphs = this_.lessonData.paragraphs;
			if(itemIndexArr_) {
				paragraphsLength = itemIndexArr_[1] - itemIndexArr_[0];
			} else {
				paragraphsLength = paragraphs.length;
			}

			if(view["txt_0"]) {
				fonts = view["txt_0"].font.split("px ");
				for(var i = 0; i < paragraphsLength; i++) {
					txt = view["txt_" + i];
					if(!txt) {
						continue;
					}
					if(poetryObj.hasOwnProperty(this_.name)) {
						if(window.isAndroid) {
							txt.font = fonts[0] - window.androidOffsetFontSize + "px " + fonts[1];
						} else {
							txt.font = fonts[0] - window.commonOffsetFontSize + "px " + fonts[1];
						}
					} else {
						if(window.isAndroid) {
							txt.text = "  " + txt.text;
							txt.font = fonts[0] - window.androidOffsetFontSize + "px " + fonts[1];
						} else {
							txt.text = " " + txt.text;
							txt.font = fonts[0] - window.commonOffsetFontSize + "px " + fonts[1];
						}
					}
					btnSound = view["btnSound_" + i];
					if(!btnSound) {
						continue;
					}
					btnSound.txtColor = txt.color;
					btnSound.cursor = "pointer";
					btnSound.mouseChildren = false;
					if(itemIndexArr_) {
						btnSound.soundId = this_.lessonData.paragraphs[i + parseInt(itemIndexArr_[0])];
					} else {
						btnSound.soundId = this_.lessonData.paragraphs[i];
					}
					btnSound.txt = txt;
					txts.push(txt);
					btnSounds.push(btnSound);
					btnSound.lessonData = this_.lessonData;
					btnSound.addEventListener("click", playLessonNameAndParagraphSound, false);
				}
			}
		}

		//		function changeImgAndWord(e) {
		//			var changeImg = e.currentTarget;
		//			this_.view.wordImg.txt.text = changeImg.word;
		//			this_.view.wordImg.img.image.src = window.PIC_PATH + "lesson_" + this_.lessonData.lessonId + "/word_" + changeImg.key + ".jpg";
		//		}

		function playLessonNameAndParagraphSound(e) {
			e.stopPropagation();
			var btn = e.target;
			resetBtnSoundTextStatus(btn);
			btn.isClick = !btn.isClick;
			createjs.Sound.stop();
			var txt = btn.txt;
			txt.color = btn.txtColor;
			var soundId = btn.soundId;
			if(btn.isClick) {
				txt.color = "#ff0000";
				if(btn.isTitle){
					isTitleSounding = true;
				}else{
					isTitleSounding = false;
				}
				if(window.isSoundLoadObj.hasOwnProperty(soundId) && window.isSoundLoadObj[soundId]) {
					if(btn.soundIndex) {
						createjs.Sound.play(btn.soundIndex);
					}else{
						createjs.Sound.play(soundId);
					}
				} else {
					createjs.Sound.addEventListener("fileload", soundLoaded); // add an event listener for when load is completed
					createjs.Sound.registerSound(window.assetsPath + soundId, soundId);
				}
				btn.gotoAndStop(1);
			} else {
				btn.gotoAndStop(0);
			}

			function soundLoaded(e) {
				e.stopPropagation();
				window.isSoundLoadObj[soundId] = true;
				if(btn.isClick) {
					createjs.Sound.stop();
					createjs.Sound.play(soundId);
				}
			}
		}

		function resetBtnSoundTextStatus(btn_) {
			for(var i = 0; i < txts.length; i++) {
				btnSound = btnSounds[i];
				txt = txts[i];
				if(txt) {
					txt.color = btnSound.txtColor;
				}
				if(btn_) {
					if(btn_ != btnSound) {
						btnSound.gotoAndStop(0);
						btnSound.isClick = false;
					}
				} else {
					if(btnSound) {
						btnSound.gotoAndStop(0);
						btnSound.isClick = false;
					}
				}
			}
		}

		function loadWordOrExerciseSound(wordsData_, namePrefix_, btnPrefix_) {
			var soundsObj = wordsData_.scripts;
			var soundsArr = [];
			var obj;
			var i = 0;
			var btnSound;
			var soundId = wordsData_.soundId;
			for(var key in soundsObj) {
				btnSound = this_.view[btnPrefix_ + i];
				if(!btnSound) {
					continue;
				}
				btnSound.cursor = "pointer";
				btnSound.mouseChildren = false;
				btnSound.soundIndex = key;
				btnSound.soundId = soundId;
				btnSound.txt = this_.view[namePrefix_ + i];
				btnSounds.push(btnSound);
				txts.push(this_.view[namePrefix_ + i]);
				btnSound.addEventListener("click", playLessonNameAndParagraphSound);
				obj = {};
				obj.id = key;
				obj.startTime = soundsObj[key][0] * 1000;
				obj.duration = (soundsObj[key][1] - soundsObj[key][0]) * 1000;
				soundsArr.push(obj);
				i++;
			}
			wordsLength = i;
			var sounds = [{
				src: soundId,
				data: {
					audioSprite: soundsArr
				}
			}];
			createjs.Sound.on("fileload", loadSound);
			createjs.Sound.registerSounds(sounds, window.assetsPath);
			// 加载完成后

			function loadSound() {
				createjs.Sound.stop();
				window.isSoundLoadObj[soundId] = true;
			}
		}

	}
	var Super = function() {};
	Super.prototype = ui.BaseDialog.prototype;
	LessonOnePlaySoundContainer_0.prototype = new Super();
	window.ui.LessonOnePlaySoundContainer_0 = LessonOnePlaySoundContainer_0;
})();
(function() {
	window.ui = window.ui || {};

	var LessonOneRecordContainer_5 = function(name_) {
		ui.BaseDialog.call(this);
		this.name = name_;
		var this_ = this;
		var yy = 204;
		var xx = 82;
		var DIS_WID = 1920;
		var DIS_HEI = 1082;
		var paragraphsLength;
		var wordsLength;
		var mcPlay;
		var carousel;
		var recordPlayManager;
		this.initView = function() {
			if(this_.lessonData) {
				this_.commonBarCallback("", this_.lessonData);
			}
			if(carousel) {
				carousel.addCarousel();
			}
			if(this_.view.audioPlayBack){
				mcPlay=setInterval(function(){
					this_.view.audioPlayBack.mc.gotoAndPlay(0);
				},700)
			}
		}
		this.resetView = function() {
			if(carousel) {
				carousel.removeCarousel();
			}
			resetWordBtnTextColor();
			resetBtnTextColor();
			clearInterval(mcPlay);
			if(recordPlayManager){
				recordPlayManager.releaseSound();
			}
		}
		this.init = function(view_, itemIndex_, chapterLessonIds_, lib_, mainScene_, commonBarCallback_) {
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
			if(chapterLessonIds_[0] > 0) {
				lessonData = this.getDataById(chapterLessonIds_[0], chapterLessonIds_[1]);
			} else {
				lessonData = this.getDataById(chapterLessonIds_[0]);
			}
			commonBarCallback_("", lessonData);
			if(this.view.lessonName){
				this.view.x = 82; 
				this.view.y = 140;
			}else{
				this.view.x = xx;
				this.view.y = yy;
			}
			initCarousel();
			initRecordPlay();
		}
		function initCarousel(){
			var startIndex = 0;
			if(this_.view.carousel) {
				carousel = new ui.CarouselContainer(this_.view.carousel, this_.lib, this_.lessonData, this_.name, startIndex);
			}
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
			if(btnPlay && !recordPlayManager) {
				recordPlayManager = new ui.RecordPlayContainer(btnRecord, btnPlay, this_.name);
			}
		}

		function resetBtnTextColor(btn_) {
			var txt, btnSound;
			for(var i = 0; i < paragraphsLength; i++) {
				txt = this_.view["txt_" + i];
				txt.color = "#000000";
				btnSound = this_.view["btnSound_" + i];
				btnSound.gotoAndStop(0);
				if(btn_ != btnSound) {
					btnSound.isClick = false;
				}
			}
		}

		function playSound(e, lessonData_) {
			var btn = e.currentTarget;
			resetBtnTextColor(btn);
			btn.isClick = !btn.isClick;
			createjs.Sound.stop();
			var txt = this_.view[btn.txtName];
			txt.color = "#000000";
			var instance;
			var soundId = lessonData_.paragraphs[btn.paragraphIndex];
			if(!btn.hasOwnProperty("soundIndex")) {
				btn.soundIndex = 0;
			}
			if(btn.isClick) {
				txt.color = "#ff0000";
				if(window.isSoundLoadObj.hasOwnProperty(soundId) && window.isSoundLoadObj[soundId]) {
					createjs.Sound.play(soundId);
				} else {
					createjs.Sound.addEventListener("fileload", soundLoaded, false); // add an event listener for when load is completed
					createjs.Sound.registerSound(assetsPath + soundId, soundId);
				}
				btn.gotoAndStop(1);
			} else {
				btn.gotoAndStop(0);
			}

			function soundLoaded(e) {
				window.isSoundLoadObj[soundId] = true;
				if(btn.isClick) {
					txt.color = "#ff0000";
					createjs.Sound.stop();
					instance = null;
					instance = createjs.Sound.play(soundId);
				}
			}
		}

		function resetWordBtnTextColor(btn_) {
			var txt, btnSound;
			for(var i = 0; i < wordsLength; i++) {
				txt = this_.view["txt_" + i];
				txt.color = "#000000";
				btnSound = this_.view["btnWordSound_" + i];
				btnSound.gotoAndStop(2);
				if(btn_ != btnSound) {
					btnSound.isClick = false;
				}
			}
		}

		function loadWordSound(wordsData_) {
			var soundsObj = wordsData_.scripts;
			var soundsArr = [];
			var obj;
			var i = 0;
			var btnSound;
			var soundId = wordsData_.soundId;
			var fonts = this_.view["txt_0"].font.split("px ");
			for(var key in soundsObj) {
				btnSound = this_.view["btnWordSound_" + i];
				if(!btnSound) {
					continue;
				}
				if(window.isAndroid) {
					this_.view["txt_" + i].font = fonts[0] - window.androidOffsetFontSize + "px " + fonts[1];
				}
				btnSound.soundIndex = key;
				btnSound.txtName = "txt_" + i;
				btnSound.on("click", function(e) {
					var btn = e.currentTarget;
					resetWordBtnTextColor(btn);
					btn.isClick = !btn.isClick;
					createjs.Sound.stop();
					var txt = this_.view[btn.txtName];
					txt.color = "#000000";
					if(btn.isClick) {
						txt.color = "#ff0000";
						btn.gotoAndStop(1);
						if(window.isSoundLoadObj[soundId]) {
							createjs.Sound.play(btn.soundIndex);
						}
					} else {
						btn.gotoAndStop(2);
					}
				}, null, false, null, false);
				obj = {};
				obj.id = key;
				obj.startTime = soundsObj[key][0] * 1000;
				obj.duration = (soundsObj[key][1] - soundsObj[key][0]) * 1000;
				soundsArr.push(obj);
				i++;
			}
			wordsLength = i;
			var sounds = [{
				src: soundId,
				data: {
					audioSprite: soundsArr
				}
			}];
			createjs.Sound.on("fileload", loadSound, null, false, null, false);
			createjs.Sound.registerSounds(sounds, assetsPath);
			// 加载完成后

			function loadSound() {
				window.isSoundLoadObj[soundId] = true;
			}
		}

	}
	var Super = function() {};
	Super.prototype = ui.BaseDialog.prototype;
	LessonOneRecordContainer_5.prototype = new Super();
	window.ui.LessonOneRecordContainer_5 = LessonOneRecordContainer_5;
})();
(function() {
	window.ui = window.ui || {};
	var LessonTwoInputContainer_1 = function(name_) {
		ui.BaseDialog.call(this);
		this.name = name_;
		var this_ = this;
		var yy = 204;
		var xx = 82;
		var inputs = [];
		var inputs_ = [];
		var answers = [];
		var answerTxts = [];
		var maxLengths = [];
		var btnRightWrongNums = 0;
		var carousel;
		var recordPlayManager;
		var suenvaSoundManager;
		var btnRightWrongLen;
		var suenvaSoundNames = {
			"uiSuenvaFive_11": [3, 2]
		}
		var rightAnswerTexts = ["uiLessonOneEx_11",
			"uiLessonOneEx_14",
			"uiLessonTwoEx_11",
			"uiLessonThreeExercise_13",
			"uiSuenvaOne_6",
			"uiLessonFourEx_12",
			"uiLessonFiveExercise_8",
			"uiLessonSixExercise_14",
			"uiLessonSevenExercise_11",
			"uiSuenvaThree_0",
			"uiSuenvaThree_6",
			"uiLessonTenExercise_8",
			"uiLessonEleven_8",
			"uiLessonElevenExercise_9",
			"uiLessonTwelve_6",
			"uiLessonTwelveExercise_11",
			"uiSuenvaFour_10",
			"uiLessonFifteenExercise_13",
			"uiLessonFifteenExercise_16",
			"uiLessonSixteenExercise_11",
			"uiLessonSeventeenExercise_14",
			"uiLessonEighteenExercise_13",
			"uiGenjcwzdizGeizSatbyai_11"
		];

		rightAnswerTexts = [];
		this.resetView = function() {
			var dom = document.getElementById("dom_overlay_container");
			var input_;
			for(var i = 0, len = inputs.length; i < len; i++) {
				input_ = inputs[i];
				if(input_.parentNode) {
					dom.removeChild(input_);
				}
			}
			if(carousel) {
				carousel.removeCarousel();
			}
			if(recordPlayManager) {
				recordPlayManager.releaseSound();
			}
		}
		this.initView = function(parent_) {
			if(this_.lessonData) {
				this_.commonBarCallback("", this_.lessonData);
			}
			var dom = document.getElementById("dom_overlay_container");
			var input_;
			for(var i = 0, len = inputs.length; i < len; i++) {
				input_ = inputs[i];
				if(!input_.parentNode) {
					dom.appendChild(input_);
				}
			}
			if(carousel) {
				carousel.addCarousel();
			}
		}
		this.init = function(view_, itemIndex_, chapterLessonIds_, lib_, mainScene_, commonBarCallback_) {
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
			if(this.name == "uiLessonFiveExercise_3") {
				maxLengths = [4];
			} else if(this.name == "uiLessonTenExercise_2" || this.name == "uiLessonTenExercise_1" || this.name == "uiGenjcwzdizGeizSatbyai_4") {
				maxLengths = [5];
			} else if(this.name == "uiLessonFiveExercise_6" || this.name == "uiSuenvaThree_0" || this.name == "uiLessonSixteenExercise_4") {
				maxLengths = [6];
				if(this.name == "uiSuenvaThree_0") {
					answers = ["eng", "ap", "q", "ieng", "wg", "ing"];
				}
			} else if(this.name == "uiLessonFiveExercise_2" || this.name == "uiLessonOneEx_7" || this.name == "uiLessonOneEx_8" || this.name == "uiLessonTwoEx_10" || this.name == "uiLessonThreeExercise_8" ||
				this.name == "uiLessonFiveExercise_5" || this.name == "uiLessonSixExercise_8" || this.name == "uiLessonSixExercise_9" || this.name == "uiLessonSevenExercise_2" || this.name == "uiLessonSevenExercise_7" ||
				this.name == "uiLessonEightExercise_3" || this.name == "uiLessonEightExercise_4" || this.name == "uiLessonNineExercise_8" || this.name == "uiLessonNineExercise_9" || this.name == "uiSuenvaThree_3" ||
				this.name == "uiSuenvaThree_4" || this.name == "uiSuenvaThree_5" || this.name == "uiLessonTenExercise_4" || this.name == "uiLessonElevenExercise_7" || this.name == "uiLessonTwelveExercise_9" ||
				this.name == "uiSuenvaFour_3" || this.name == "uiLessonFourteen_7" || this.name == "uiLessonFifteenExercise_4" || this.name == "uiLessonFifteenExercise_5") {
				maxLengths = [23];
			} else if(this.name == "uiGenjcwzdizGeizSatbyai_8") {
				maxLengths = [8];
				//				if(this.name == "uiSuenvaFive_13") {
				//					answers = [",", "!", "?"];
				//				}
			} else if(this.name == "uiLessonSixteenExercise_6" || this.name == "uiSuenvaFive_5" || this.name == "uiSuenvaFive_4" || this.name == "uiSuenvaTwo_2" || this.name == "uiGenjcwzdizGeizSatbyai_5") {
				maxLengths = [10];
			} else if(this.name == "uiLessonSeventeenExercise_8" || this.name == "uiLessonSixteenExercise_5" || this.name == "uiLessonOneEx_14" || this.name == "uiLessonEighteenExercise_13") {
				maxLengths = [11];
				if(this.name == "uiLessonOneEx_14") {
					answers = ["sam", "saekhenj", "saekhau", "saekloeg"];
				} else if(this.name == "uiLessonEighteenExercise_13") {
					answers = ["coh", "lai", "simndei", "guhcaeg", "gang", "leix"];
				}
			} else if(this.name == "uiLessonFifteenExercise_7" || this.name == "uiSuenvaSix_4") {
				maxLengths = [12];
			} else if(this.name == "uiLessonFifteenExercise_16") {
				maxLengths = [20];
				answers = ["sam", "hauxreih haeuxnaz", "duhdoem", "haeuxfiengj"];
			} else if(this.name == "uiGenjcwzdizGeizSatbyai_11" || this.name == "uiLessonSeventeenExercise_9" || this.name == "uiLessonSeventeen_7" || this.name == "uiSuenvaOne_4") {
				maxLengths = [15];
				if(this.name == "uiGenjcwzdizGeizSatbyai_11") {
					answers = ["Bou simndei", "boux guhcaeg", "Cax miz gang", "vunz rox leix"];
				}
			} else if(this.name == "uiLessonTwoEx_11") {
				maxLengths = [40];
				answers = ["fag yaekseiz", "hab saek hoengzhoengz heiheu", "feihdauh"];
			} else if(this.name == "uiLessonEleven_8") {
				maxLengths = [25];
				answers = ["baebae dauqdauq", "haeujhaeuj okok"];
			} else if(this.name == "uiLessonNineExercise_10" || this.name == "uiLessonSixteenExercise_11" || this.name == "uiSuenvaFour_10" || this.name == "uiSuenvaSix_11") {
				maxLengths = [35];
				if(this.name == "uiSuenvaFour_10") {
					answers = [" baenzlawz ndaej nyib buh", "Haeux ndei baengh gyaj", "couh miz gwn miz daenj"];
				} else if(this.name == "uiLessonSixteenExercise_11") {
					answers = ["ngoenz doek ngoenz", "bi doek bi", "siengjh aeu maz ndaej maz", "cwxcaih youh vifung"];
				}
			} else if(this.name == "uiSuenvaOne_6") {
				maxLengths = [35];
				answers = ["Seiz cou dwg saekloeg", "Seiz cou dwg saekhau", "Seiz cou dwg saekloeg"];
			} else if(this.name == "uiLessonFifteenExercise_13") {
				maxLengths = [52];
				answers = ["mbouj miz dungx cix iek", "Riengz raze naed de saeq", "noix donq iek daimaez"];
			} else if(this.name == "uiLessonEighteenExercise_7") {
				maxLengths = [11];
				answers = ["ngoemx", "goz", "huk"];
			} else if(this.name == "uiGenjcwzdizGeizSatbyai_0") {
				maxLengths = [1];
				answers = ["a", "d", "f", "h", "j", "b", "e", "g", "i", "l"]
			} else if(this.name == "uiLessonOneEx_11") {
				maxLengths = [19, 18, 50];
				answers = ["saekhenj", "saekloeg", "lai saek lai yiengh"];
			} else if(this.name == "uiLessonThreeExercise_1") {
				maxLengths = [5, 6, 5, 5, 6, 5];
				btnRightWrongLen = 2;
				answers = ["m", "aeu", "q", "r", "ung", "h"];
			} else if(this.name == "uiLessonThreeExercise_2") {
				maxLengths = [5, 6, 5, 5, 6, 5];
				answers = ["d", "ueng", "h", "d", "au", "q"];
				btnRightWrongLen = 2;
			} else if(this.name == "uiLessonFourEx_5") {
				maxLengths = [1];
				answers = ["G", "N", "D", "H", "M", "B"];
			} else if(this.name == "uiSuenvaFive_1") {
				maxLengths = [8];
				answers = ["oi", "oi", "oem"];
			} else if(this.name == "uiGenjcwzdizGeizSatbyai_6") {
				maxLengths = [8];
				answers = ["gonq", "noix", "iq", "sang"];
			} else if(this.name == "uiLessonThirteenExercise_1") {
				maxLengths = [8];
				answers = ["q", "j", "z", "q", "z", "z", "x", "h", "j", "z", "z", "j"];
				btnRightWrongLen = 6;
			} else if(this.name == "uiLessonThreeExercise_3") {
				maxLengths = [1];
				answers = ["y", "g", "m", "h", "b", "n", "r", "l", "a", "e", "i", "q"];
			} else if(this.name == "uiSuenvaTwo_4") {
				answers = ["laj", "gonq", "iq", "noix", "ok", "daemq"];
				maxLengths = [23];
			} else if(this.name == "uiLessonTwoEx_6") {
				maxLengths = [16];
				answers = ["haep", "haeu", "gwnz", "hung", "ndatfwdfwd"];
			} else if(this.name == "uiLessonThreeExercise_13") {
				maxLengths = [40, 40, 14, 14, 35];
				answers = ["vamauxdan", "vahaeux", "ranz", "rungh", "mbouj loenq"];
			} else if(this.name == "uiLessonTenExercise_8") {
				maxLengths = [35, 45, 30, 25];
				answers = ["diuq gvaq dah", "haeb dawz rieng duzguk", "Duzguk", "duzgoep"];
			} else if(this.name == "uiLessonElevenExercise_5") {
				maxLengths = [12, 18, 23, 12, 18, 23, 6, 18, 23, 12, 18, 23, ];
			} else if(this.name == "uiLessonElevenExercise_9") {
				maxLengths = [30, 30, 30, 30, 55];
				answers = ["simnyap raixcaix", "luenh moeb luenh bangx", "riengzhaeux sanq", "faekduh dek", "gyoengqvunz couh bae ndaw reih ndaw naz sou gyoengqde"];
			} else if(this.name == "uiLessonFourteenExercise_1") {
				maxLengths = [4];
				answers = ["x", "x", "h", "h", "z", "z", "h", "j", "j", "z", "q", "z"];
				btnRightWrongLen = 6;
			} else if(this.name == "uiLessonSixExercise_14") {
				maxLengths = [40, 40, 10, 20];
				answers = ["Yaek aeu lwg baenz vunz", "Bouxlaux gyaez lwgnyez", "lij", "haeuj"];
			} else if(this.name == "uiLessonTwelveExercise_11") {
				maxLengths = [25, 30, 30, 28];
				answers = ["fwnmaemq yaek daengz", "Meuz gwn raemx ndit ndat", "saekseiz fwn couh daengz", "Saidoengz youq baihdoeng"];
			} else if(this.name == "uiLessonElevenExercise_6") {
				maxLengths = [23];
			} else if(this.name == "uiLessonTwelve_6") {
				maxLengths = [30, 25, 30];
				answers = ["gaeq dak fwed fwn doek", "Saidoengz youq baihsae", "gyangngoenz cingx ndit ndat"];
			} else if(this.name == "uiLessonFourEx_12") {
				maxLengths = [23];
				answers = ["gyaez", "beiz mbonq", "beizmbinj", "beiz swiz", "raeuj mbonq"];
			} else if(this.name == "uiLessonFiveExercise_8") {
				maxLengths = [10, 30, 40, 40, 40];
				answers = ["gip", "gvih roengzdaeuj bang", "Baenz! Gvaq 5 ngoenz le", "caeux di daeuj raen gou", "5 ngoenz caiq daeuj"];
			} else if(this.name == "uiLessonSevenExercise_11") {
				maxLengths = [10, 24, 12, 12, 20, 20, 20]
				answers = ["ranznden", "haujlai gyaeqgaeq ", "gaeq meh", "faeggyaeq", "dendwngh", "denyingj miz sing", "gohyozgyah"];
			} else if(this.name == "uiLessonNineExercise_7") {
				maxLengths = [12, 23, 12, 23, 12, 23, 12, 23];
			} else if(this.name == "uiLessonSeventeenExercise_14") {
				maxLengths = [18, 28, 23, 35, 20];
				answers = ["song ga capmax", "gwnz hwet naep miz baujgiemq", "gyaeuj daenj mauhdingj", "ngeng ndang song ga vangungj", "lumj diuqfoux"];
			} else if(this.name == "uiSuenvaThree_6") {
				maxLengths = [35];
				answers = ["lij haeb ndaej bouxvunz", "Duzvaiz yienznaeuz hung", "ndaej byaij geijlai gyae"];
			} else if(this.name == "uiLessonFifteen_7") {
				maxLengths = [22, 18];
				answers = ["ngveih haeuxfiengj", "Vahaeux"];
			} else {
				maxLengths = [2000];
				this_.view.input_0._handleDrawEnd = _handleDrawEnd;
			}
			if(this.view.lessonName) {
				this.view.x = 82;
				this.view.y = 140;
			} else {
				this.view.x = xx;
				this.view.y = yy;
			}

			initInputs();
			initCarousel();
			initImg();
			initRecordPlay();
			initSuenvaSound();
			initBtnRightWrong();
		}

		function initBtnRightWrong() {
			for(var i = 0; i < btnRightWrongNums; i++) {
				this_.view["btnRightWrong_" + i].visible = false;
				this_.view["btnRightWrong_" + i].gotoAndStop(0);
			}
		}

		function initRecordPlay() {
			var audioPlayBack = this_.view.audioPlayBack || this_.view.audioplayBack;
			var btnRecord;
			var btnPlay;
			if(audioPlayBack) {
				btnRecord = audioPlayBack.btnRecord;
				btnPlay = audioPlayBack.btnPlay;
			} else {
				btnRecord = this_.view.btnRecord;
				btnPlay = this_.view.btnPlay;
			}
			if(btnRecord && !recordPlayManager) {
				recordPlayManager = new ui.RecordPlayContainer(btnRecord, btnPlay, this_.name);
			}
		}

		function initCarousel() {
			var startIndex = 0;
			if(this_.view.carousel) {
				carousel = new ui.CarouselContainer(this_.view.carousel, this_.lib, this_.lessonData, this_.name, startIndex);
			}
		}

		function initImg() {
			for(var i = 0; i < 10; i++) {
				if(!this_.view["fillImg_" + i]) {
					break;
				} else {
					this_.view["fillImg_" + i].removeAllChildren();
					if(this_.view["fillImg_" + i].instance) {
						this_.view["fillImg_" + i].instance.spriteSheet = "";
						this_.view["fillImg_" + i].instance = null;
					}
					if(this_.view["fillImg_" + i].shape) {
						this_.view["fillImg_" + i].shape.graphics.clear();
						this_.view["fillImg_" + i].shape = null;
					}
					if(this_.lessonData.suenvaId) {
						var bit = new createjs.Bitmap(window.PIC_PATH + "suenva_" + this_.lessonData.suenvaId + "/input_" + i + ".jpg")
					} else if(this_.lessonData.lessonId) {
						var bit = new createjs.Bitmap(window.PIC_PATH + "lesson_" + this_.lessonData.lessonId + "/input_" + i + ".jpg")
					}
					bit.scaleX = bit.scaleY = 0.6;
					bit.alpha = 1;
					this_.view["fillImg_" + i].img = bit;
					this_.view["fillImg_" + i].addChild(bit);
				}
			}
		}

		function initInputs() {
			for(var i = 0; i < 100; i++) {
				if(this_.view["btnRightWrong_" + i]) {
					btnRightWrongNums++;
				} else {
					break;
				}
			}
			this_.view.addEventListener("click", function() {
				for(var i = 0; i < inputs.length; i++) {
					inputs[i].blur();
				}
			});
			setTimeout(function() {
				var input_;
				var inputNum = document.querySelectorAll(".ui-textinput");
				for(var i = 0, len = inputNum.length; i < len; i++) {
					input_ = document.getElementById("input_" + i);
					maxLengths[i] = maxLengths[i] ? maxLengths[i] : maxLengths[0];
					input_.setAttribute("maxlength", maxLengths[i]);
					input_.setAttribute("spellcheck", "false");
					input_.oninput = function(e) {
						var tar = e.currentTarget;
						tar.value = tar.value.replace(/[^A-Za-z0-9,.?!:;''"" ，。？！：；‘’“”\n\r]/g, "");
					}
					inputs.push(input_);
					inputs_.push(this_.view["input_" + i]);
				}
				//多行输入文本位置设置
				var textareas = document.getElementsByTagName("textarea");
				var textarea_;
				for(var j = 0; j < textareas.length; j++) {
					textarea_ = textareas[j];
					if(textarea_) {
						textarea_.onkeydown = function(e) {
							var textareaT = e.target;
							if(e.keyCode == "13") {
								setTimeout(function() {
									textareaT.scrollTop = textareaT.scrollHeight;
								}, 10);
							}
						}
					}
				}

				if(this_.view.btnReset) {
					this_.view.btnReset.cursor = "pointer";
					this_.view.btnReset.mouseChildren = false;
					this_.view.btnReset.on("click", clickBtnReset, null, false, null, false);
					this_.view.btnReset.on("pressup", function(e) {
						this_.view.btnReset.scaleX = this_.view.btnReset.scaleY = 1;
					}, null, false, null, false);
					this_.view.btnReset.on("mousedown", function(e) {
						this_.view.btnReset.scaleX = this_.view.btnReset.scaleY = 1.5;
					}, null, false, null, false);
				}
				if(this_.view.btnJudgment) {
					this_.view.btnJudgment.cursor = "pointer";
					this_.view.btnJudgment.mouseChildren = false;
					if(rightAnswerTexts.indexOf(this_.name) != -1) {
						initRightAnswerTxt();
						this_.view.btnJudgment.on("click", displayAnswer);
					} else {
						this_.view.btnJudgment.on("click", clickBtnJudgment);
					}
					this_.view.btnJudgment.on("pressup", function(e) {
						this_.view.btnJudgment.scaleX = this_.view.btnJudgment.scaleY = 1;
					}, null, false, null, false);
					this_.view.btnJudgment.on("mousedown", function(e) {
						this_.view.btnJudgment.scaleX = this_.view.btnJudgment.scaleY = 1.5;
					}, null, false, null, false);
				}

			}, 50);
			//重置按钮
		}

		function displayAnswer(e) {
			var btnJudgment = this_.view.btnJudgment;
			btnJudgment.isClick = !btnJudgment.isClick;
			for(var i = 0, len = answerTxts.length; i < len; i++) {
				answerTxts[i].visible = btnJudgment.isClick;
			}
		}

		function initRightAnswerTxt() {
			var answerTxt;
			var input_;
			for(var i = 0, len = answers.length; i < len; i++) {
				answerTxt = new createjs.Text(answers[i], "46px 'Times New Roman'", "#f00");
				input_ = inputs_[i];
				answerTxt.x = input_.x;
				answerTxt.y = input_.y - 26;
				answerTxt.textAlign = "center";
				answerTxt.lineHeight = input_.lineHeight;
				answerTxt.lineWidth = inputs_.lineWidth;
				this_.view.addChild(answerTxt);
				answerTxts.push(answerTxt);
				answerTxt.visible = false;
			}
		}

		function clickBtnReset() {
			var ipts = document.querySelectorAll(".ui-textinput") || document.querySelectorAll("ui-textarea");
			for(var i = 0, len = ipts.length; i < len; i++) {
				ipts[i].value = "";
			}
			initBtnRightWrong();
		}

		function clickBtnJudgment() {
			var rightNum = 0;
			createjs.Sound.stop();
			if(btnRightWrongNums) {
				if(btnRightWrongLen) {
					for(var i = 0; i < btnRightWrongLen; i++) {
						var inputRightNum = 0;
						for(var j = 0; j < answers.length / btnRightWrongLen; j++) {
							if(answers[i * answers.length / btnRightWrongLen + j] == inputs[i * answers.length / btnRightWrongLen + j].value) {
								inputRightNum++;
							}
						}
						if(inputRightNum == answers.length / btnRightWrongLen) {
							rightNum++;
							this_.view["btnRightWrong_" + i].gotoAndStop(0);
						} else {
							this_.view["btnRightWrong_" + i].gotoAndStop(1);
						}
						this_.view["btnRightWrong_" + i].visible = true;
					}
				} else {
					for(var i = 0; i < btnRightWrongNums; i++) {
						if(inputAndAnswerStrTrans(answers[i]) == inputAndAnswerStrTrans(inputs[i].value)) {
							this_.view["btnRightWrong_" + i].gotoAndStop(0);
							rightNum++;
						} else {
							this_.view["btnRightWrong_" + i].gotoAndStop(1);
						}
						this_.view["btnRightWrong_" + i].visible = true;
					}
				}
				if(rightNum == btnRightWrongNums) {
					createjs.Sound.play(window.ANSWER_RIGHT_Id);
				} else {
					createjs.Sound.play(window.ANSWER_WRONG_Id);
				}
			} else {
				for(var i = 0, len = inputs.length; i < len; i++) {
					inputs[i].value = answers[i];
				}
			}
		}

		function inputAndAnswerStrTrans(str_) {
			str_ = str_.toLowerCase().replace(/\s\s+/g, ' ');
			str_ = str_.replace(/(^\s+)|(\s+$)/g, '');
			str_ = str_.replace(/？/g, "?");
			str_ = str_.replace(/，/g, ",");
			str_ = str_.replace(/！/g, "!");
			str_ = str_.replace(/。/g, ".");
			str_ = str_.replace(/：/g, ":");
			str_ = str_.replace(/；/g, ";");
			return str_;
		}

		function initSuenvaSound() {
			if(suenvaSoundNames.hasOwnProperty(this_.name)) {
				var lessonData = this_.lessonData;
				var subjectData = window.data.getSubjectDataByI(this_.lessonData.subjects, suenvaSoundNames[this_.name][0], suenvaSoundNames[this_.name][1])
				if(!suenvaSoundManager) {
					suenvaSoundManager = new ui.SuenvaSoundContainer(this_.view, subjectData, suenvaSoundNames[this_.name][0], suenvaSoundNames[this_.name][1]);
				}
			}
		}

		function _handleDrawEnd(evt) {
			var props = this.getConcatenatedDisplayProps(this._props),
				mat = props.matrix;
			var tx1 = mat.decompose();
			var sx = tx1.scaleX;
			var sy = tx1.scaleY;
			var dp = window.devicePixelRatio || 1;
			var w = this.nominalBounds.width * sx;
			var h = this.nominalBounds.height * sy;
			mat.tx /= dp;
			mat.ty /= dp;
			mat.a /= (dp * sx);
			mat.b /= (dp * sx);
			mat.c /= (dp * sy);
			mat.d /= (dp * sy);
			this._element.setProperty('transform-origin', this.regX + 'px ' + this.regY + 'px');
			var x = (mat.tx + this.regX * mat.a + this.regY * mat.c - this.regX);
			var y = (mat.ty + this.regX * mat.b + this.regY * mat.d - this.regY);
			var tx = 'matrix(' + mat.a + ',' + mat.b + ',' + mat.c + ',' + mat.d + ',' + x + ',' + y + ')';
			this._element.setProperty('transform', tx);
			this._element.setProperty('width', w);
			this._element.setProperty('height', h);
			this._element.setProperty('line-height', h / this._element._options.rows);
			this._element.update();
		}

	}
	var Super = function() {};
	Super.prototype = ui.BaseDialog.prototype;
	LessonTwoInputContainer_1.prototype = new Super();
	window.ui.LessonTwoInputContainer_1 = LessonTwoInputContainer_1;
})();
(function () {

    window.ui = window.ui || {};

    var Page = function () {
        this.initialize();
    }
    var p = Page.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;

    p.initialize = function () {
        this.Container_initialize();
    }
    
    window.ui.Page = Page;
})();

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
(function() {
	window.ui = window.ui || {};
	var SuenvaSoundContainer = function(view_, subjectData_, partId_, sujectId_) {
		var view = view_;
		var btnSounds = [];
		var txts = [];
		this.resetBtnSoundTextStatus = resetBtnSoundTextStatus;
//		titleSoundId:"01101.mp3",
//		sentences:{
//				soundId: "01102z.mp3",
//				scripts: {
//					"soundSentence_0": [0.19, 0.63],
//					"soundSentence_1": [0.67, 12],
//			}
//		}
//	subjectSound_3_2
		initTitle(subjectData_.titleSoundId, partId_, sujectId_);
		loadWordSound(subjectData_.sentences, partId_, sujectId_);
		this.initOnePageManySound = function(onePageManySoundSubjectData_, partId_, sujectId_){
			loadWordSound(onePageManySoundSubjectData_.sentences, partId_, sujectId_);
		}
		function loadWordSound(wordsData_,partId_, sujectId_) {
			var soundsObj = wordsData_.scripts;
			var soundsArr = [];
			var obj;
			var i = 0;
			var btnSound;
			var txt;
			var soundId = wordsData_.soundId;
			var fonts
			var sentanceTxt;
			for(var i=0;i<1000;i++){
				sentanceTxt=view["sentanceTxt_" + partId_ + "_" + sujectId_ +"_"+ i];
				if(sentanceTxt){
					fonts = sentanceTxt.font.split("px ");
					break;
				}
			}
			i= 0;
			for(var key in soundsObj) {
				btnSound = view["subjectSound_" + partId_ + "_" + sujectId_ + "_" + i];
				if(!btnSound){
					i++;
					continue;
				}
				btnSound.cursor = "pointer";
				btnSound.mouseChildren = false;
				txt = view["sentanceTxt_" + partId_ + "_" + sujectId_ + "_" + i];
				btnSound.txt = txt;
				btnSounds.push(btnSound);
				txts.push(txt);
				if(!btnSound) {
					continue;
				}
				if(window.isAndroid) {
					txt.font = fonts[0] - window.androidOffsetFontSize + "px " + fonts[1];
				}
				btnSound.soundIndex = key;
				btnSound.addEventListener("click", function(e) {
					e.stopPropagation();
					var btn = e.currentTarget;
					resetBtnSoundTextStatus(btn);
					btn.isClick = !btn.isClick;
					createjs.Sound.stop();
					var txt = btn.txt;
					txt.color = "#333333";
					if(btn.isClick) {
						txt.color = "#ff0000";
						btn.gotoAndStop(1);
						if(window.isSoundLoadObj[soundId]) {
							createjs.Sound.play(btn.soundIndex);
						}
					} else {
						btn.gotoAndStop(0);
					}
				}, false);
				obj = {};
				obj.id = key;
				obj.startTime = soundsObj[key][0] * 1000;
				obj.duration = (soundsObj[key][1] - soundsObj[key][0]) * 1000;
				soundsArr.push(obj);
				i++;
			}
			wordsLength = i;
			var sounds = [{
				src: soundId,
				data: {
					audioSprite: soundsArr
				}
			}];
			createjs.Sound.addEventListener("fileload", loadSound, false);
			createjs.Sound.registerSounds(sounds, assetsPath);
			// 加载完成后

			function loadSound(e) {
				e.stopPropagation();
				window.isSoundLoadObj[soundId] = true;
			}
		}
		function playNameSound(e) {
			e.stopPropagation();
			var btn = e.target;
			resetBtnSoundTextStatus(btn);
			btn.isClick = !btn.isClick;
			createjs.Sound.stop();
			var txt = btn.txt;
			txt.color = "#6B4A15";
			var soundId = btn.soundId;
			if(btn.isClick) {
				txt.color = "#ff0000";
				if(window.isSoundLoadObj.hasOwnProperty(soundId) && window.isSoundLoadObj[soundId]) {
					createjs.Sound.play(soundId);
				} else {
					createjs.Sound.addEventListener("fileload", soundLoaded); // add an event listener for when load is completed
					createjs.Sound.registerSound(window.assetsPath + soundId, soundId);
				}
				btn.gotoAndStop(1);
			} else {
				btn.gotoAndStop(0);
			}

			function soundLoaded(e) {
				e.stopPropagation();
				window.isSoundLoadObj[soundId] = true;
				if(btn.isClick) {
					createjs.Sound.stop();
					createjs.Sound.play(soundId);
				}
			}
		}
		function resetBtnSoundTextStatus(btn_) {
			for(var i = 0; i < txts.length; i++) {
				txt = txts[i];
				txt.color = "#333333";
				btnSound = btnSounds[i];
				if(btn_) {
					if(btn_ != btnSound) {
						btnSound.gotoAndStop(0);
						btnSound.isClick = false;
					}
				} else {
					btnSound.isClick = false;
				}
			}
		}
		function initTitle(soundId_, partId_, sujectId_){
			if(soundId_.toString().length <= 0){
				return;
			}
			var txt = view["subjectTxt_" + partId_ + "_" + sujectId_];
			if(!txt){
				return;
			}
			var fonts = txt.font.split("px ");
			if(window.isAndroid) {
				txt.font = fonts[0] - window.androidOffsetFontSize + "px " + fonts[1];
			}
			txts.push(txt);
			var btnSound = view["subjectSound_" + partId_ + "_" + sujectId_];
			btnSound.mouseChildren = false;
			btnSound.curosr = "pointer";
			btnSound.addEventListener("click", playNameSound, false);
			btnSounds.push(btnSound);
			btnSound.txt = txt;
			btnSound.soundId = soundId_;
		}
	}
	window.ui.SuenvaSoundContainer = SuenvaSoundContainer;
})();
(function() {
	//develop by alice
  window.ui = window.ui || {};
  window.assets = window.assets || {};
  window.events = window.events || {};
  window.dialogs = window.dialogs || {};
  window.isSoundLoadObj = window.isSoundLoadObj || {};
  window.events.PAGE_NUM = 'page_num';
  window.androidOffsetY = 0;
  window.androidOffsetFontSize = 10;
  window.commonOffsetFontSize = 0;
  window.assetsPath = "./assets/audio/";
  window.ANSWER_RIGHT_Id = "answerRight";
  window.ANSWER_WRONG_Id = "answerWrong";
  window.PIC_PATH = "./assets/images/lessons/";
  window.PIC_CHAPTER_PATH = "./assets/images/chapters/";
  function MainSceneManager() {
    var MAX_PAGE = 511;
    ///////////////////////373
    var CUR_PAGE_INDEX = 0;//467
//  21 24 44 67 76 100 121 145 180 226 232 255 267 278 287 298 
//311 383 386 421 446 467 497
    var btnCatalog;
    var chapterName;
    var lessonId;
    var lessonName;
    var btnLesson;
    var btnWorkbook;
    var btnPre;
    var btnNext;
    var pageNum;
    var bg;
    var curIndex = 0;
    var lessonIndex = 0;
    var workbookIndex = 0;
    var curPage;
    var mainScene;
    var wordBG;
    var lib;
    var stage;
    var dialogNameObj = {
    	0:{"dialogName":"uiCoverPage","instance":new ui.CoverPageContainer()},
    	1:{"dialogName":"uiCatalogPage_0","instance":new ui.CatalogPageContainer("Catalog_0")},
    	2:{"dialogName":"uiCatalogPage_1","instance":new ui.CatalogPageContainer("Catalog_1")},
    	3:{"dialogName":"uiChapter_1","instance":new ui.ChapterContainer("uiChapter_1")},
    	4:{"dialogName":"uiLessonOne_0","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonOne_0")},
    	5:{"dialogName":"uiLessonOne_1","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonOne_1")},
    	6:{"dialogName":"uiLessonOne_2","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonOne_2")},
    	7:{"dialogName":"uiLessonOne_3","instance":new ui.LessonOneConnectionLineContainer_2("uiLessonOne_3")},
    	8:{"dialogName":"uiLessonOne_4","instance":new ui.LessonOneDrawWordContainer_3("uiLessonOne_4")},
    	9:{"dialogName":"uiLessonOne_5","instance":new ui.LessonOneDrawWordContainer_3("uiLessonOne_5")},
    	10:{"dialogName":"uiLessonOne_6","instance":new ui.LessonTwoInputContainer_1("uiLessonOne_6")},
    	11:{"dialogName":"uiLessonOneEx_1","instance":new ui.LessonOneRecordContainer_5("uiLessonOneEx_1")},
    	12:{"dialogName":"uiLessonOneEx_2","instance":new ui.LessonOneDrawWordContainer_3("uiLessonOneEx_2")},
    	13:{"dialogName":"uiLessonOneEx_3","instance":new ui.LessonOneDrawWordContainer_3("uiLessonOneEx_3")},
    	14:{"dialogName":"uiLessonOneEx_4","instance":new ui.LessonOneExLineationContainer_13("uiLessonOneEx_4")},
    	15:{"dialogName":"uiLessonOneEx_5","instance":new ui.LessonOneDragExContainer_5("uiLessonOneEx_5")},
    	16:{"dialogName":"uiLessonOneEx_6","instance":new ui.LessonOneExLineationContainer_13("uiLessonOneEx_6")},
    	17:{"dialogName":"uiLessonOneEx_7","instance":new ui.LessonTwoInputContainer_1("uiLessonOneEx_7")},
    	18:{"dialogName":"uiLessonOneEx_8","instance":new ui.LessonTwoInputContainer_1("uiLessonOneEx_8")},
    	19:{"dialogName":"uiLessonOneEx_9","instance":new ui.LessonOneDragExContainer_5("uiLessonOneEx_9")},
    	20:{"dialogName":"uiLessonOneEx_10","instance":new ui.LessonOneExLineationContainer_13("uiLessonOneEx_10")},
    	21:{"dialogName":"uiLessonOneEx_11","instance":new ui.LessonTwoInputContainer_1("uiLessonOneEx_11")},
    	22:{"dialogName":"uiLessonOneEx_12","instance":new ui.LessonTwoInputContainer_1("uiLessonOneEx_12")},
    	23:{"dialogName":"uiLessonOneEx_13","instance":new ui.LessonTwoInputContainer_1("uiLessonOneEx_13")},
    	24:{"dialogName":"uiLessonOneEx_14","instance":new ui.LessonTwoInputContainer_1("uiLessonOneEx_14")},
    	25:{"dialogName":"uiLessonTwo_0","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonTwo_0")},
    	26:{"dialogName":"uiLessonTwo_1","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonTwo_1")},
    	27:{"dialogName":"uiLessonTwo_2","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonTwo_2")},
    	28:{"dialogName":"uiLessonTwo_3","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonTwo_3")},
    	29:{"dialogName":"uiLessonTwo_4","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonTwo_4")},
    	30:{"dialogName":"uiLessonTwo_5","instance":new ui.LessonTwoInputContainer_1("uiLessonTwo_5")},
	    31:{"dialogName":"uiLessonTwo_6","instance":new ui.LessonOneDrawWordContainer_3("uiLessonTwo_6")},
    	32:{"dialogName":"uiLessonTwo_7","instance":new ui.LessonOneDrawWordContainer_3("uiLessonTwo_7")},
    	33:{"dialogName":"uiLessonTwo_8","instance":new ui.LessonTwoInputContainer_1("uiLessonTwo_8")},
    	34:{"dialogName":"uiLessonTwoEx_1","instance":new ui.LessonOneExLineationContainer_13("uiLessonTwoEx_1")},
    	35:{"dialogName":"uiLessonTwoEx_2","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonTwoEx_2")},
    	36:{"dialogName":"uiLessonTwoEx_3","instance":new ui.LessonOneDrawWordContainer_3("uiLessonTwoEx_3")},
    	37:{"dialogName":"uiLessonTwoEx_4","instance":new ui.LessonOneExLineationContainer_13("uiLessonTwoEx_4")},
    	38:{"dialogName":"uiLessonTwoEx_5","instance":new ui.LessonOneExLineationContainer_13("uiLessonTwoEx_5")},
    	39:{"dialogName":"uiLessonTwoEx_6","instance":new ui.LessonTwoInputContainer_1("uiLessonTwoEx_6")},
    	40:{"dialogName":"uiLessonTwoEx_7","instance":new ui.LessonOneDragExContainer_5("uiLessonTwoEx_7")},
    	41:{"dialogName":"uiLessonTwoEx_8","instance":new ui.LessonOneDragExContainer_5("uiLessonTwoEx_8")},
    	42:{"dialogName":"uiLessonTwoEx_9","instance":new ui.LessonOneDragExContainer_5("uiLessonTwoEx_9")},
    	43:{"dialogName":"uiLessonTwoEx_10","instance":new ui.LessonTwoInputContainer_1("uiLessonTwoEx_10")},
    	44:{"dialogName":"uiLessonTwoEx_11","instance":new ui.LessonTwoInputContainer_1("uiLessonTwoEx_11")},
    	45:{"dialogName":"uiLessonTwoEx_12","instance":new ui.LessonTwoInputContainer_1("uiLessonTwoEx_12")},
    	46:{"dialogName":"uiLessonTwoEx_13","instance":new ui.LessonTwoInputContainer_1("uiLessonTwoEx_13")},
    	47:{"dialogName":"uiLessonThree_0","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonThree_0")},
    	48:{"dialogName":"uiLessonThree_1","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonThree_1")},
    	49:{"dialogName":"uiLessonThree_2","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonThree_2")}, 	
    	50:{"dialogName":"uiLessonThree_3","instance":new ui.LessonTwoInputContainer_1("uiLessonThree_3")},
    	51:{"dialogName":"uiLessonThree_4","instance":new ui.LessonOneConnectionLineContainer_2("uiLessonThree_4")},
    	52:{"dialogName":"uiLessonThree_5","instance":new ui.LessonOneDrawWordContainer_3("uiLessonThree_5")},
    	53:{"dialogName":"uiLessonThree_6","instance":new ui.LessonOneDrawWordContainer_3("uiLessonThree_6")},
    	54:{"dialogName":"uiLessonThree_7","instance":new ui.LessonTwoInputContainer_1("uiLessonThree_7")},
    	55:{"dialogName":"uiLessonThreeExercise_1","instance":new ui.LessonTwoInputContainer_1("uiLessonThreeExercise_1")},
    	56:{"dialogName":"uiLessonThreeExercise_2","instance":new ui.LessonTwoInputContainer_1("uiLessonThreeExercise_2")},
    	57:{"dialogName":"uiLessonThreeExercise_3","instance":new ui.LessonTwoInputContainer_1("uiLessonThreeExercise_3")},
    	58:{"dialogName":"uiLessonThreeExercise_4","instance":new ui.LessonOneRecordContainer_5("uiLessonThreeExercise_4")},
    	59:{"dialogName":"uiLessonThreeExercise_5","instance":new ui.LessonOneDrawWordContainer_3("uiLessonThreeExercise_5")},
    	60:{"dialogName":"uiLessonThreeExercise_6","instance":new ui.LessonOneDrawWordContainer_3("uiLessonThreeExercise_6")},
    	61:{"dialogName":"uiLessonThreeExercise_7","instance":new ui.LessonOneDrawWordContainer_3("uiLessonThreeExercise_7")},
    	62:{"dialogName":"uiLessonThreeExercise_8","instance":new ui.LessonTwoInputContainer_1("uiLessonThreeExercise_8")},
    	63:{"dialogName":"uiLessonThreeExercise_9","instance":new ui.LessonOneDragExContainer_5("uiLessonThreeExercise_9")},
    	64:{"dialogName":"uiLessonThreeExercise_10","instance":new ui.LessonOneDragExContainer_5("uiLessonThreeExercise_10")},
    	65:{"dialogName":"uiLessonThreeExercise_11","instance":new ui.LessonOneDragExContainer_5("uiLessonThreeExercise_11")},
    	66:{"dialogName":"uiLessonThreeExercise_12","instance":new ui.LessonOneDragExContainer_5("uiLessonThreeExercise_12")},
    	67:{"dialogName":"uiLessonThreeExercise_13","instance":new ui.LessonTwoInputContainer_1("uiLessonThreeExercise_13")},
    	68:{"dialogName":"uiLessonThreeExercise_14","instance":new ui.LessonTwoInputContainer_1("uiLessonThreeExercise_14")},
    	69:{"dialogName":"uiLessonThreeExercise_15","instance":new ui.LessonTwoInputContainer_1("uiLessonThreeExercise_15")},
    	70:{"dialogName":"uiSuenvaOne_0","instance":new ui.LessonOnePlaySoundContainer_0("uiSuenvaOne_0")},
    	71:{"dialogName":"uiSuenvaOne_1","instance":new ui.LessonOneExLineationContainer_13("uiSuenvaOne_1")},  //没有答案
    	72:{"dialogName":"uiSuenvaOne_2","instance":new ui.LessonOneDrawWordContainer_3("uiSuenvaOne_2")},
    	73:{"dialogName":"uiSuenvaOne_3","instance":new ui.LessonOneDrawWordContainer_3("uiSuenvaOne_3")},
    	74:{"dialogName":"uiSuenvaOne_4","instance":new ui.LessonTwoInputContainer_1("uiSuenvaOne_4")},
    	75:{"dialogName":"uiSuenvaOne_5","instance":new ui.LessonOneConnectionLineContainer_2("uiSuenvaOne_5")},
    	76:{"dialogName":"uiSuenvaOne_6","instance":new ui.LessonTwoInputContainer_1("uiSuenvaOne_6")},
    	77:{"dialogName":"uiSuenvaOne_7","instance":new ui.LessonOnePlaySoundContainer_0("uiSuenvaOne_7")},
    	78:{"dialogName":"uiSuenvaOne_8","instance":new ui.LessonTwoInputContainer_1("uiSuenvaOne_8")},
    	79:{"dialogName":"uiChapter_2","instance":new ui.ChapterContainer("uiChapter_2")},
    	80:{"dialogName":"uiLessonFour_0","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonFour_0")},
    	81:{"dialogName":"uiLessonFour_1","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonFour_1")},
    	82:{"dialogName":"uiLessonFour_2","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonFour_2")},
    	83:{"dialogName":"uiLessonFour_3","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonFour_3")},
    	84:{"dialogName":"uiLessonFour_4","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonFour_4")},
    	85:{"dialogName":"uiLessonFour_5","instance":new ui.LessonTwoInputContainer_1("uiLessonFour_5")},
    	86:{"dialogName":"uiLessonFour_6","instance":new ui.LessonOneDrawWordContainer_3("uiLessonFour_6")},
    	87:{"dialogName":"uiLessonFour_7","instance":new ui.LessonOneDrawWordContainer_3("uiLessonFour_7")},
    	88:{"dialogName":"uiLessonFour_8","instance":new ui.LessonTwoInputContainer_1("uiLessonFour_8")},
    	89:{"dialogName":"uiLessonFourEx_1","instance":new ui.LessonOneRecordContainer_5("uiLessonFourEx_1")},
    	90:{"dialogName":"uiLessonFourEx_2","instance":new ui.LessonOneDrawWordContainer_3("uiLessonFourEx_2")},
    	91:{"dialogName":"uiLessonFourEx_3","instance":new ui.LessonOneDrawWordContainer_3("uiLessonFourEx_3")},
    	92:{"dialogName":"uiLessonFourEx_4","instance":new ui.LessonOneDrawWordContainer_3("uiLessonFourEx_4")},
    	93:{"dialogName":"uiLessonFourEx_5","instance":new ui.LessonTwoInputContainer_1("uiLessonFourEx_5")},
    	94:{"dialogName":"uiLessonFourEx_6","instance":new ui.LessonOneDragExContainer_5("uiLessonFourEx_6")},
    	95:{"dialogName":"uiLessonFourEx_7","instance":new ui.LessonOneDragExContainer_5("uiLessonFourEx_7")},
    	96:{"dialogName":"uiLessonFourEx_8","instance":new ui.JundgeRightOrWrong("uiLessonFourEx_8")},
    	97:{"dialogName":"uiLessonFourEx_9","instance":new ui.LessonOneDragExContainer_5("uiLessonFourEx_9")},
    	98:{"dialogName":"uiLessonFourEx_10","instance":new ui.LessonOneDragExContainer_5("uiLessonFourEx_10")},
    	99:{"dialogName":"uiLessonFourEx_11","instance":new ui.LessonOneDragExContainer_5("uiLessonFourEx_11")},
    	100:{"dialogName":"uiLessonFourEx_12","instance":new ui.LessonTwoInputContainer_1("uiLessonFourEx_12")},
    	101:{"dialogName":"uiLessonFourEx_13","instance":new ui.LessonTwoInputContainer_1("uiLessonFourEx_13")},
    	102:{"dialogName":"uiLessonFourEx_14","instance":new ui.LessonTwoInputContainer_1("uiLessonFourEx_14")},
    	103:{"dialogName":"uiLessonFive_0","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonFive_0")},
    	104:{"dialogName":"uiLessonFive_1","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonFive_1")},
    	105:{"dialogName":"uiLessonFive_2","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonFive_2")},
    	106:{"dialogName":"uiLessonFive_3","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonFive_3")},
    	107:{"dialogName":"uiLessonFive_4","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonFive_4")},
    	108:{"dialogName":"uiLessonFive_5","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonFive_5")},
    	109:{"dialogName":"uiLessonFive_6","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonFive_6")},
    	110:{"dialogName":"uiLessonFive_7","instance":new ui.LessonTwoInputContainer_1("uiLessonFive_7")},
    	111:{"dialogName":"uiLessonFive_8","instance":new ui.LessonOneDrawWordContainer_3("uiLessonFive_8")},
    	112:{"dialogName":"uiLessonFive_9","instance":new ui.LessonOneDrawWordContainer_3("uiLessonFive_9")},
    	113:{"dialogName":"uiLessonFive_10","instance":new ui.LessonTwoInputContainer_1("uiLessonFive_10")}, 
    	114:{"dialogName":"uiLessonFiveExercise_1","instance":new ui.LessonOneExLineationContainer_13("uiLessonFiveExercise_1")},
    	115:{"dialogName":"uiLessonFiveExercise_2","instance":new ui.LessonTwoInputContainer_1("uiLessonFiveExercise_2")},
    	116:{"dialogName":"uiLessonFiveExercise_3","instance":new ui.LessonTwoInputContainer_1("uiLessonFiveExercise_3")},
    	117:{"dialogName":"uiLessonFiveExercise_4","instance":new ui.LessonOneExLineationContainer_13("uiLessonFiveExercise_4")},
    	118:{"dialogName":"uiLessonFiveExercise_5","instance":new ui.LessonTwoInputContainer_1("uiLessonFiveExercise_5")},
    	119:{"dialogName":"uiLessonFiveExercise_6","instance":new ui.LessonTwoInputContainer_1("uiLessonFiveExercise_6")},
    	120:{"dialogName":"uiLessonFiveExercise_7","instance":new ui.LessonOneDragExContainer_5("uiLessonFiveExercise_7")},
    	121:{"dialogName":"uiLessonFiveExercise_8","instance":new ui.LessonTwoInputContainer_1("uiLessonFiveExercise_8")},
    	122:{"dialogName":"uiLessonFiveExercise_9","instance":new ui.LessonTwoInputContainer_1("uiLessonFiveExercise_9")},
    	123:{"dialogName":"uiLessonFiveExercise_10","instance":new ui.LessonTwoInputContainer_1("uiLessonFiveExercise_10")},
    	124:{"dialogName":"uiLessonSix_0","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonSix_0")},
    	125:{"dialogName":"uiLessonSix_1","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonSix_1")},
    	126:{"dialogName":"uiLessonSix_2","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonSix_2")},
    	127:{"dialogName":"uiLessonSix_3","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonSix_3")},
    	128:{"dialogName":"uiLessonSix_4","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonSix_4")},
    	129:{"dialogName":"uiLessonSix_5","instance":new ui.LessonTwoInputContainer_1("uiLessonSix_5")},
    	130:{"dialogName":"uiLessonSix_6","instance":new ui.LessonOneDrawWordContainer_3("uiLessonSix_6")},
    	131:{"dialogName":"uiLessonSix_7","instance":new ui.LessonOneDrawWordContainer_3("uiLessonSix_7")},
    	132:{"dialogName":"uiLessonSixExercise_1","instance":new ui.LessonOneRecordContainer_5("uiLessonSixExercise_1")},
    	133:{"dialogName":"uiLessonSixExercise_2","instance":new ui.LessonOneDrawWordContainer_3("uiLessonSixExercise_2")},
    	134:{"dialogName":"uiLessonSixExercise_3","instance":new ui.LessonOneDrawWordContainer_3("uiLessonSixExercise_3")},
    	135:{"dialogName":"uiLessonSixExercise_4","instance":new ui.LessonOneRecordContainer_5("uiLessonSixExercise_4")},
    	136:{"dialogName":"uiLessonSixExercise_5","instance":new ui.LessonOneDrawWordContainer_3("uiLessonSixExercise_5")},
    	137:{"dialogName":"uiLessonSixExercise_6","instance":new ui.LessonOneDrawWordContainer_3("uiLessonSixExercise_6")},
    	138:{"dialogName":"uiLessonSixExercise_7","instance":new ui.LessonOneDragExContainer_5("uiLessonSixExercise_7")},
    	139:{"dialogName":"uiLessonSixExercise_8","instance":new ui.LessonTwoInputContainer_1("uiLessonSixExercise_8")},
    	140:{"dialogName":"uiLessonSixExercise_9","instance":new ui.LessonTwoInputContainer_1("uiLessonSixExercise_9")},
    	141:{"dialogName":"uiLessonSixExercise_10","instance":new ui.LessonOneDragExContainer_5("uiLessonSixExercise_10")},
    	142:{"dialogName":"uiLessonSixExercise_11","instance":new ui.LessonOneDragExContainer_5("uiLessonSixExercise_11")},
    	143:{"dialogName":"uiLessonSixExercise_12","instance":new ui.LessonOneDragExContainer_5("uiLessonSixExercise_12")},
    	144:{"dialogName":"uiLessonSixExercise_13","instance":new ui.LessonOneDragExContainer_5("uiLessonSixExercise_13")},
    	145:{"dialogName":"uiLessonSixExercise_14","instance":new ui.LessonTwoInputContainer_1("uiLessonSixExercise_14")},
    	146:{"dialogName":"uiLessonSixExercise_15","instance":new ui.LessonTwoInputContainer_1("uiLessonSixExercise_15")},
    	147:{"dialogName":"uiLessonSixExercise_16","instance":new ui.LessonTwoInputContainer_1("uiLessonSixExercise_16")},
    	
    	148:{"dialogName":"uiSuenvaTwo_0","instance":new ui.LessonOneExLineationContainer_13("uiSuenvaTwo_0")},
    	149:{"dialogName":"uiSuenvaTwo_1","instance":new ui.LessonOnePlaySoundContainer_0("uiSuenvaTwo_1")},
    	150:{"dialogName":"uiSuenvaTwo_2","instance":new ui.LessonTwoInputContainer_1("uiSuenvaTwo_2")},
    	151:{"dialogName":"uiSuenvaTwo_3","instance":new ui.LessonOneRecordContainer_5("uiSuenvaTwo_3")},
    	152:{"dialogName":"uiSuenvaTwo_4","instance":new ui.LessonTwoInputContainer_1("uiSuenvaTwo_4")},
    	153:{"dialogName":"uiSuenvaTwo_5","instance":new ui.LessonTwoInputContainer_1("uiSuenvaTwo_5")},
    	154:{"dialogName":"uiSuenvaTwo_6","instance":new ui.LessonTwoInputContainer_1("uiSuenvaTwo_6")},
    	155:{"dialogName":"uiSuenvaTwo_7","instance":new ui.LessonOnePlaySoundContainer_0("uiSuenvaTwo_7")},
    	156:{"dialogName":"uiSuenvaTwo_8","instance":new ui.LessonOnePlaySoundContainer_0("uiSuenvaTwo_8")},
    	157:{"dialogName":"uiSuenvaTwo_9","instance":new ui.LessonTwoInputContainer_1("uiSuenvaTwo_9")},
    	
    	158:{"dialogName":"uiChapter_3","instance":new ui.ChapterContainer("uiChapter_3")}, 
    	
    	159:{"dialogName":"uiLessonSeven_0","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonSeven_0")},
    	160:{"dialogName":"uiLessonSeven_1","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonSeven_1")},
    	161:{"dialogName":"uiLessonSeven_2","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonSeven_2")},
    	162:{"dialogName":"uiLessonSeven_3","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonSeven_3")},
    	163:{"dialogName":"uiLessonSeven_4","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonSeven_4")},
    	164:{"dialogName":"uiLessonSeven_5","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonSeven_5")},
    	165:{"dialogName":"uiLessonSeven_6","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonSeven_6")},
    	166:{"dialogName":"uiLessonSeven_7","instance":new ui.LessonTwoInputContainer_1("uiLessonSeven_7")},
    	167:{"dialogName":"uiLessonSeven_8","instance":new ui.LessonOneDrawWordContainer_3("uiLessonSeven_8")},
    	168:{"dialogName":"uiLessonSeven_9","instance":new ui.LessonOneDrawWordContainer_3("uiLessonSeven_9")},
    	169:{"dialogName":"uiLessonSeven_10","instance":new ui.LessonTwoInputContainer_1("uiLessonSeven_10")},
    	170:{"dialogName":"uiLessonSevenExercise_1","instance":new ui.JundgeRightOrWrong("uiLessonSevenExercise_1")},
    	171:{"dialogName":"uiLessonSevenExercise_2","instance":new ui.LessonTwoInputContainer_1("uiLessonSevenExercise_2")},
    	172:{"dialogName":"uiLessonSevenExercise_3","instance":new ui.LessonOneRecordContainer_5("uiLessonSevenExercise_3")},
    	173:{"dialogName":"uiLessonSevenExercise_4","instance":new ui.LessonOneDrawWordContainer_3("uiLessonSevenExercise_4")},
    	174:{"dialogName":"uiLessonSevenExercise_5","instance":new ui.LessonOneDrawWordContainer_3("uiLessonSevenExercise_5")},
    	175:{"dialogName":"uiLessonSevenExercise_6","instance":new ui.LessonOneConnectionLineContainer_2("uiLessonSevenExercise_6")},
    	176:{"dialogName":"uiLessonSevenExercise_7","instance":new ui.LessonTwoInputContainer_1("uiLessonSevenExercise_7")},
    	177:{"dialogName":"uiLessonSevenExercise_8","instance":new ui.LessonOneExLineationContainer_13("uiLessonSevenExercise_8")},
    	178:{"dialogName":"uiLessonSevenExercise_9","instance":new ui.LessonOneDragExContainer_5("uiLessonSevenExercise_9")},
    	179:{"dialogName":"uiLessonSevenExercise_10","instance":new ui.LessonOneDragExContainer_5("uiLessonSevenExercise_10")},
    	180:{"dialogName":"uiLessonSevenExercise_11","instance":new ui.LessonTwoInputContainer_1("uiLessonSevenExercise_11")},
    	181:{"dialogName":"uiLessonSevenExercise_12","instance":new ui.LessonTwoInputContainer_1("uiLessonSevenExercise_12")},
    	
    	182:{"dialogName":"uiLessonEight_0","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonEight_0")},
    	183:{"dialogName":"uiLessonEight_1","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonEight_1")},
    	184:{"dialogName":"uiLessonEight_2","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonEight_2")},
    	185:{"dialogName":"uiLessonEight_3","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonEight_3")},
    	186:{"dialogName":"uiLessonEight_4","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonEight_4")},
    	187:{"dialogName":"uiLessonEight_5","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonEight_5")},
    	188:{"dialogName":"uiLessonEight_6","instance":new ui.LessonTwoInputContainer_1("uiLessonEight_6")},
    	189:{"dialogName":"uiLessonEight_7","instance":new ui.LessonTwoInputContainer_1("uiLessonEight_7")},
    	190:{"dialogName":"uiLessonEight_8","instance":new ui.LessonOneDrawWordContainer_3("uiLessonEight_8")},
    	191:{"dialogName":"uiLessonEight_9","instance":new ui.LessonOneDrawWordContainer_3("uiLessonEight_9")},
    	192:{"dialogName":"uiLessonEightExercise_1","instance":new ui.JundgeRightOrWrong("uiLessonEightExercise_1")},
    	193:{"dialogName":"uiLessonEightExercise_2","instance":new ui.LessonOneDragExContainer_5("uiLessonEightExercise_2")},
    	194:{"dialogName":"uiLessonEightExercise_3","instance":new ui.LessonTwoInputContainer_1("uiLessonEightExercise_3")},
    	195:{"dialogName":"uiLessonEightExercise_4","instance":new ui.LessonTwoInputContainer_1("uiLessonEightExercise_4")},
    	196:{"dialogName":"uiLessonEightExercise_5","instance":new ui.LessonOneConnectionLineContainer_2("uiLessonEightExercise_5")},
    	197:{"dialogName":"uiLessonEightExercise_6","instance":new ui.LessonOneDragExContainer_5("uiLessonEightExercise_6")},
    	198:{"dialogName":"uiLessonEightExercise_7","instance":new ui.LessonOneDragExContainer_5("uiLessonEightExercise_7")},
    	199:{"dialogName":"uiLessonEightExercise_8","instance":new ui.LessonOneDragExContainer_5("uiLessonEightExercise_8")},
    	200:{"dialogName":"uiLessonEightExercise_9","instance":new ui.LessonOneDragExContainer_5("uiLessonEightExercise_9")},
    	201:{"dialogName":"uiLessonEightExercise_10","instance":new ui.LessonTwoInputContainer_1("uiLessonEightExercise_10")},
    	202:{"dialogName":"uiLessonEightExercise_11","instance":new ui.LessonTwoInputContainer_1("uiLessonEightExercise_11")},
    	203:{"dialogName":"uiLessonEightExercise_12","instance":new ui.LessonTwoInputContainer_1("uiLessonEightExercise_12")},
    	
    	
    	204:{"dialogName":"uiLessonNine_0","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonNine_0")},
    	205:{"dialogName":"uiLessonNine_1","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonNine_1")},
    	206:{"dialogName":"uiLessonNine_2","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonNine_2")},
    	207:{"dialogName":"uiLessonNine_3","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonNine_3")},
    	208:{"dialogName":"uiLessonNine_4","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonNine_4")},
    	209:{"dialogName":"uiLessonNine_5","instance":new ui.LessonTwoInputContainer_1("uiLessonNine_5")},
    	210:{"dialogName":"uiLessonNine_6","instance":new ui.LessonOneDrawWordContainer_3("uiLessonNine_6")},
    	211:{"dialogName":"uiLessonNine_7","instance":new ui.LessonOneDrawWordContainer_3("uiLessonNine_7")},
    	212:{"dialogName":"uiLessonNine_8","instance":new ui.LessonTwoInputContainer_1("uiLessonNine_8")},
    	
    	213:{"dialogName":"uiLessonNineExercise_1","instance":new ui.LessonOneRecordContainer_5("uiLessonNineExercise_1")},
    	214:{"dialogName":"uiLessonNineExercise_2","instance":new ui.LessonOneDrawWordContainer_3("uiLessonNineExercise_2")},
    	215:{"dialogName":"uiLessonNineExercise_3","instance":new ui.LessonOneDrawWordContainer_3("uiLessonNineExercise_3")},
    	216:{"dialogName":"uiLessonNineExercise_4","instance":new ui.LessonOneDrawWordContainer_3("uiLessonNineExercise_4")},
    	217:{"dialogName":"uiLessonNineExercise_5","instance":new ui.LessonOneExDrawSentenceContainer_12("uiLessonNineExercise_5")},
    	218:{"dialogName":"uiLessonNineExercise_6","instance":new ui.LessonOneExDrawSentenceContainer_12("uiLessonNineExercise_6")},
    	219:{"dialogName":"uiLessonNineExercise_7","instance":new ui.LessonTwoInputContainer_1("uiLessonNineExercise_7")},
    	220:{"dialogName":"uiLessonNineExercise_8","instance":new ui.LessonTwoInputContainer_1("uiLessonNineExercise_8")},
    	221:{"dialogName":"uiLessonNineExercise_9","instance":new ui.LessonTwoInputContainer_1("uiLessonNineExercise_9")},
    	222:{"dialogName":"uiLessonNineExercise_10","instance":new ui.LessonTwoInputContainer_1("uiLessonNineExercise_10")},
    	223:{"dialogName":"uiLessonNineExercise_11","instance":new ui.LessonTwoInputContainer_1("uiLessonNineExercise_11")},
    	224:{"dialogName":"uiLessonNineExercise_12","instance":new ui.LessonTwoInputContainer_1("uiLessonNineExercise_12")},
    	225:{"dialogName":"uiLessonNineExercise_13","instance":new ui.LessonTwoInputContainer_1("uiLessonNineExercise_13")},
    	
    	226:{"dialogName":"uiSuenvaThree_0","instance":new ui.LessonTwoInputContainer_1("uiSuenvaThree_0")},
    	227:{"dialogName":"uiSuenvaThree_1","instance":new ui.LessonOnePlaySoundContainer_0("uiSuenvaThree_1")},
    	228:{"dialogName":"uiSuenvaThree_2","instance":new ui.LessonOneDragExContainer_5("uiSuenvaThree_2")},
    	229:{"dialogName":"uiSuenvaThree_3","instance":new ui.LessonTwoInputContainer_1("uiSuenvaThree_3")},
    	230:{"dialogName":"uiSuenvaThree_4","instance":new ui.LessonTwoInputContainer_1("uiSuenvaThree_4")},
    	231:{"dialogName":"uiSuenvaThree_5","instance":new ui.LessonTwoInputContainer_1("uiSuenvaThree_5")},
    	232:{"dialogName":"uiSuenvaThree_6","instance":new ui.LessonTwoInputContainer_1("uiSuenvaThree_6")},
    	233:{"dialogName":"uiSuenvaThree_7","instance":new ui.LessonOnePlaySoundContainer_0("uiSuenvaThree_7")},
    	234:{"dialogName":"uiSuenvaThree_8","instance":new ui.LessonTwoInputContainer_1("uiSuenvaThree_8")},
    	235:{"dialogName":"uiSuenvaThree_9","instance":new ui.LessonTwoInputContainer_1("uiSuenvaThree_9")},
    	236:{"dialogName":"uiSuenvaThree_10","instance":new ui.LessonTwoInputContainer_1("uiSuenvaThree_10")},
		237:{"dialogName":"uiSuenvaThree_11","instance":new ui.LessonTwoInputContainer_1("uiSuenvaThree_11")},
		
		238:{"dialogName":"uiChapter_4","instance":new ui.ChapterContainer("uiChapter_4")},
		
		239:{"dialogName":"uiLessonTen_0","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonTen_0")},
		240:{"dialogName":"uiLessonTen_1","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonTen_1")},
		241:{"dialogName":"uiLessonTen_2","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonTen_2")},
		242:{"dialogName":"uiLessonTen_3","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonTen_3")},
		243:{"dialogName":"uiLessonTen_4","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonTen_4")},
		244:{"dialogName":"uiLessonTen_5","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonTen_5")},
		245:{"dialogName":"uiLessonTen_6","instance":new ui.LessonTwoInputContainer_1("uiLessonTen_6")},
		246:{"dialogName":"uiLessonTen_7","instance":new ui.LessonOneDrawWordContainer_3("uiLessonTen_7")},
		247:{"dialogName":"uiLessonTen_8","instance":new ui.LessonOneDrawWordContainer_3("uiLessonTen_8")},
		248:{"dialogName":"uiLessonTenExercise_1","instance":new ui.LessonTwoInputContainer_1("uiLessonTenExercise_1")},
		249:{"dialogName":"uiLessonTenExercise_2","instance":new ui.LessonTwoInputContainer_1("uiLessonTenExercise_2")},
		250:{"dialogName":"uiLessonTenExercise_3","instance":new ui.LessonOneDragExContainer_5("uiLessonTenExercise_3")},
		251:{"dialogName":"uiLessonTenExercise_4","instance":new ui.LessonTwoInputContainer_1("uiLessonTenExercise_4")},
		252:{"dialogName":"uiLessonTenExercise_5","instance":new ui.LessonOneDragExContainer_5("uiLessonTenExercise_5")},
		253:{"dialogName":"uiLessonTenExercise_6","instance":new ui.LessonOneDragExContainer_5("uiLessonTenExercise_6")},
		254:{"dialogName":"uiLessonTenExercise_7","instance":new ui.LessonOneDragExContainer_5("uiLessonTenExercise_7")},
		255:{"dialogName":"uiLessonTenExercise_8","instance":new ui.LessonTwoInputContainer_1("uiLessonTenExercise_8")},
		256:{"dialogName":"uiLessonTenExercise_9","instance":new ui.LessonTwoInputContainer_1("uiLessonTenExercise_9")},
		257:{"dialogName":"uiLessonTenExercise_10","instance":new ui.LessonTwoInputContainer_1("uiLessonTenExercise_10")},
		258:{"dialogName":"uiLessonTenExercise_11","instance":new ui.LessonTwoInputContainer_1("uiLessonTenExercise_11")},
    	
    	259:{"dialogName":"uiLessonEleven_0","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonEleven_0")},
    	260:{"dialogName":"uiLessonEleven_1","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonEleven_1")},
    	261:{"dialogName":"uiLessonEleven_2","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonEleven_2")},
    	262:{"dialogName":"uiLessonEleven_3","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonEleven_3")},
    	263:{"dialogName":"uiLessonEleven_4","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonEleven_4")},
    	264:{"dialogName":"uiLessonEleven_5","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonEleven_5")},
    	265:{"dialogName":"uiLessonEleven_6","instance":new ui.LessonOneExDrawSentenceContainer_12("uiLessonEleven_6")},
    	266:{"dialogName":"uiLessonEleven_7","instance":new ui.LessonOneExDrawSentenceContainer_12("uiLessonEleven_7")},
    	267:{"dialogName":"uiLessonEleven_8","instance":new ui.LessonTwoInputContainer_1("uiLessonEleven_8")},
    	268:{"dialogName":"uiLessonEleven_9","instance":new ui.LessonOneDrawWordContainer_3("uiLessonEleven_9")},
    	269:{"dialogName":"uiLessonEleven_10","instance":new ui.LessonOneDrawWordContainer_3("uiLessonEleven_10")},
    	270:{"dialogName":"uiLessonElevenExercise_1","instance":new ui.LessonOneRecordContainer_5("uiLessonElevenExercise_1")},
    	271:{"dialogName":"uiLessonElevenExercise_2","instance":new ui.LessonOneDrawWordContainer_3("uiLessonElevenExercise_2")},
    	272:{"dialogName":"uiLessonElevenExercise_3","instance":new ui.LessonOneDrawWordContainer_3("uiLessonElevenExercise_3")},
    	273:{"dialogName":"uiLessonElevenExercise_4","instance":new ui.LessonOneExLineationContainer_13("uiLessonElevenExercise_4")},
    	274:{"dialogName":"uiLessonElevenExercise_5","instance":new ui.LessonTwoInputContainer_1("uiLessonElevenExercise_5")},
    	275:{"dialogName":"uiLessonElevenExercise_6","instance":new ui.LessonTwoInputContainer_1("uiLessonElevenExercise_6")},
    	276:{"dialogName":"uiLessonElevenExercise_7","instance":new ui.LessonTwoInputContainer_1("uiLessonElevenExercise_7")},
    	277:{"dialogName":"uiLessonElevenExercise_8","instance":new ui.LessonOneConnectionLineContainer_2("uiLessonElevenExercise_8")},
    	278:{"dialogName":"uiLessonElevenExercise_9","instance":new ui.LessonTwoInputContainer_1("uiLessonElevenExercise_9")},
    	279:{"dialogName":"uiLessonElevenExercise_10","instance":new ui.LessonTwoInputContainer_1("uiLessonElevenExercise_10")},
    	280:{"dialogName":"uiLessonElevenExercise_11","instance":new ui.LessonTwoInputContainer_1("uiLessonElevenExercise_11")},
    	
    	281:{"dialogName":"uiLessonTwelve_0","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonTwelve_0")},
    	282:{"dialogName":"uiLessonTwelve_1","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonTwelve_1")},
			283:{"dialogName":"uiLessonTwelve_2","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonTwelve_2")},
			284:{"dialogName":"uiLessonTwelve_3","instance":new ui.LessonTwoInputContainer_1("uiLessonTwelve_3")},
			285:{"dialogName":"uiLessonTwelve_4","instance":new ui.LessonOneDrawWordContainer_3("uiLessonTwelve_4")},
			286:{"dialogName":"uiLessonTwelve_5","instance":new ui.LessonOneDrawWordContainer_3("uiLessonTwelve_5")},
			287:{"dialogName":"uiLessonTwelve_6","instance":new ui.LessonTwoInputContainer_1("uiLessonTwelve_6")},
			288:{"dialogName":"uiLessonTwelveExercise_1","instance":new ui.LessonOneRecordContainer_5("uiLessonTwelveExercise_1")},
			289:{"dialogName":"uiLessonTwelveExercise_2","instance":new ui.LessonOneDrawWordContainer_3("uiLessonTwelveExercise_2")},
			290:{"dialogName":"uiLessonTwelveExercise_3","instance":new ui.LessonOneDrawWordContainer_3("uiLessonTwelveExercise_3")},
			291:{"dialogName":"uiLessonTwelveExercise_4","instance":new ui.LessonOneDrawWordContainer_3("uiLessonTwelveExercise_4")},
			292:{"dialogName":"uiLessonTwelveExercise_5","instance":new ui.LessonOneExDrawSentenceContainer_12("uiLessonTwelveExercise_5")},
			293:{"dialogName":"uiLessonTwelveExercise_6","instance":new ui.LessonOneExDrawSentenceContainer_12("uiLessonTwelveExercise_6")},
			294:{"dialogName":"uiLessonTwelveExercise_7","instance":new ui.LessonOneDragExContainer_5("uiLessonTwelveExercise_7")},
			295:{"dialogName":"uiLessonTwelveExercise_8","instance":new ui.LessonOneDragExContainer_5("uiLessonTwelveExercise_8")},
			296:{"dialogName":"uiLessonTwelveExercise_9","instance":new ui.LessonTwoInputContainer_1("uiLessonTwelveExercise_9")},
			297:{"dialogName":"uiLessonTwelveExercise_10","instance":new ui.LessonOneConnectionLineContainer_2("uiLessonTwelveExercise_10")},
		298:{"dialogName":"uiLessonTwelveExercise_11","instance":new ui.LessonTwoInputContainer_1("uiLessonTwelveExercise_11")},
		299:{"dialogName":"uiLessonTwelveExercise_12","instance":new ui.LessonTwoInputContainer_1("uiLessonTwelveExercise_12")},
		300:{"dialogName":"uiLessonTwelveExercise_13","instance":new ui.LessonTwoInputContainer_1("uiLessonTwelveExercise_13")},
		
		301:{"dialogName":"uiSuenvaFour_0","instance":new ui.LessonOneDragExContainer_5("uiSuenvaFour_0")},
		302:{"dialogName":"uiSuenvaFour_1","instance":new ui.LessonOnePlaySoundContainer_0("uiSuenvaFour_1")},
		303:{"dialogName":"uiSuenvaFour_2","instance":new ui.JundgeRightOrWrong("uiSuenvaFour_2")},
		304:{"dialogName":"uiSuenvaFour_3","instance":new ui.LessonTwoInputContainer_1("uiSuenvaFour_3")},
		305:{"dialogName":"uiSuenvaFour_4","instance":new ui.LessonOneDragExContainer_5("uiSuenvaFour_4")},
		306:{"dialogName":"uiSuenvaFour_5","instance":new ui.LessonTwoInputContainer_1("uiSuenvaFour_5")},
		307:{"dialogName":"uiSuenvaFour_6","instance":new ui.LessonTwoInputContainer_1("uiSuenvaFour_6")},
		308:{"dialogName":"uiSuenvaFour_7","instance":new ui.LessonTwoInputContainer_1("uiSuenvaFour_7")},
		309:{"dialogName":"uiSuenvaFour_8","instance":new ui.LessonTwoInputContainer_1("uiSuenvaFour_8")},
		310:{"dialogName":"uiSuenvaFour_9","instance":new ui.LessonTwoInputContainer_1("uiSuenvaFour_9")},
		311:{"dialogName":"uiSuenvaFour_10","instance":new ui.LessonTwoInputContainer_1("uiSuenvaFour_10")},
		312:{"dialogName":"uiSuenvaFour_11","instance":new ui.LessonOnePlaySoundContainer_0("uiSuenvaFour_11")},
		313:{"dialogName":"uiSuenvaFour_12","instance":new ui.LessonTwoInputContainer_1("uiSuenvaFour_12")},
		
		314:{"dialogName":"uiChapter_5","instance":new ui.ChapterContainer("uiChapter_5")},
		
		315:{"dialogName":"uiLessonThirteen_0","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonThirteen_0")},
		316:{"dialogName":"uiLessonThirteen_1","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonThirteen_1")},
		317:{"dialogName":"uiLessonThirteen_2","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonThirteen_2")},
		318:{"dialogName":"uiLessonThirteen_3","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonThirteen_3")},
		319:{"dialogName":"uiLessonThirteen_4","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonThirteen_4")},
		320:{"dialogName":"uiLessonThirteen_5","instance":new ui.LessonTwoInputContainer_1("uiLessonThirteen_5")},
		321:{"dialogName":"uiLessonThirteen_6","instance":new ui.LessonTwoInputContainer_1("uiLessonThirteen_6")},
		322:{"dialogName":"uiLessonThirteen_7","instance":new ui.LessonOneDrawWordContainer_3("uiLessonThirteen_7")},
		323:{"dialogName":"uiLessonThirteen_8","instance":new ui.LessonOneDrawWordContainer_3("uiLessonThirteen_8")},
		
		
		324:{"dialogName":"uiLessonThirteenExercise_1","instance":new ui.LessonTwoInputContainer_1("uiLessonThirteenExercise_1")},
		325:{"dialogName":"uiLessonThirteenExercise_2","instance":new ui.LessonOneRecordContainer_5("uiLessonThirteenExercise_2")},
		326:{"dialogName":"uiLessonThirteenExercise_3","instance":new ui.LessonOneDrawWordContainer_3("uiLessonThirteenExercise_3")},
		327:{"dialogName":"uiLessonThirteenExercise_4","instance":new ui.LessonOneDrawWordContainer_3("uiLessonThirteenExercise_4")},
		328:{"dialogName":"uiLessonThirteenExercise_5","instance":new ui.LessonOneDrawWordContainer_3("uiLessonThirteenExercise_5")},
		329:{"dialogName":"uiLessonThirteenExercise_6","instance":new ui.LessonOneDragExContainer_5("uiLessonThirteenExercise_6")},
		330:{"dialogName":"uiLessonThirteenExercise_7","instance":new ui.LessonOneDragExContainer_5("uiLessonThirteenExercise_7")},
		331:{"dialogName":"uiLessonThirteenExercise_8","instance":new ui.LessonOneDragExContainer_5("uiLessonThirteenExercise_8")},
		332:{"dialogName":"uiLessonThirteenExercise_9","instance":new ui.LessonOneDragExContainer_5("uiLessonThirteenExercise_9")},
		333:{"dialogName":"uiLessonThirteenExercise_10","instance":new ui.LessonOneDragExContainer_5("uiLessonThirteenExercise_10")},
		334:{"dialogName":"uiLessonThirteenExercise_11","instance":new ui.LessonOneDragExContainer_5("uiLessonThirteenExercise_11")},
		335:{"dialogName":"uiLessonThirteenExercise_12","instance":new ui.LessonOneExDrawSentenceContainer_12("uiLessonThirteenExercise_12")},
		336:{"dialogName":"uiLessonThirteenExercise_13","instance":new ui.LessonOneExDrawSentenceContainer_12("uiLessonThirteenExercise_13")},
		337:{"dialogName":"uiLessonThirteenExercise_14","instance":new ui.LessonOneExDrawSentenceContainer_12("uiLessonThirteenExercise_14")},
		338:{"dialogName":"uiLessonThirteenExercise_15","instance":new ui.LessonTwoInputContainer_1("uiLessonThirteenExercise_15")},
		339:{"dialogName":"uiLessonThirteenExercise_16","instance":new ui.LessonTwoInputContainer_1("uiLessonThirteenExercise_16")},
		
		340:{"dialogName":"uiLessonFourteen_0","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonFourteen_0")},
		341:{"dialogName":"uiLessonFourteen_1","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonFourteen_1")},
		342:{"dialogName":"uiLessonFourteen_2","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonFourteen_2")},
		343:{"dialogName":"uiLessonFourteen_3","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonFourteen_3")},
		344:{"dialogName":"uiLessonFourteen_4","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonFourteen_4")},
		345:{"dialogName":"uiLessonFourteen_5","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonFourteen_5")},
		346:{"dialogName":"uiLessonFourteen_6","instance":new ui.LessonTwoInputContainer_1("uiLessonFourteen_6")},
		347:{"dialogName":"uiLessonFourteen_7","instance":new ui.LessonTwoInputContainer_1("uiLessonFourteen_7")},
		348:{"dialogName":"uiLessonFourteen_8","instance":new ui.LessonOneDrawWordContainer_3("uiLessonFourteen_8")},
		349:{"dialogName":"uiLessonFourteen_9","instance":new ui.LessonOneDrawWordContainer_3("uiLessonFourteen_9")},
		350:{"dialogName":"uiLessonFourteenExercise_1","instance":new ui.LessonTwoInputContainer_1("uiLessonFourteenExercise_1")},
		351:{"dialogName":"uiLessonFourteenExercise_2","instance":new ui.JundgeRightOrWrong("uiLessonFourteenExercise_2")},
		352:{"dialogName":"uiLessonFourteenExercise_3","instance":new ui.LessonOneDragExContainer_5("uiLessonFourteenExercise_3")},
		353:{"dialogName":"uiLessonFourteenExercise_4","instance":new ui.LessonOneDragExContainer_5("uiLessonFourteenExercise_4")},
		354:{"dialogName":"uiLessonFourteenExercise_5","instance":new ui.LessonOneDragExContainer_5("uiLessonFourteenExercise_5")},
		355:{"dialogName":"uiLessonFourteenExercise_6","instance":new ui.LessonOneDragExContainer_5("uiLessonFourteenExercise_6")},
		356:{"dialogName":"uiLessonFourteenExercise_7","instance":new ui.LessonOneDragExContainer_5("uiLessonFourteenExercise_7")},
		357:{"dialogName":"uiLessonFourteenExercise_8","instance":new ui.LessonOneConnectionLineContainer_2("uiLessonFourteenExercise_8")},
		358:{"dialogName":"uiLessonFourteenExercise_9","instance":new ui.LessonTwoInputContainer_1("uiLessonFourteenExercise_9")},
		359:{"dialogName":"uiLessonFourteenExercise_10","instance":new ui.LessonTwoInputContainer_1("uiLessonFourteenExercise_10")},
		360:{"dialogName":"uiLessonFourteenExercise_11","instance":new ui.LessonTwoInputContainer_1("uiLessonFourteenExercise_11")},
		
		361:{"dialogName":"uiLessonFifteen_0","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonFifteen_0")},
		362:{"dialogName":"uiLessonFifteen_1","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonFifteen_1")},
		363:{"dialogName":"uiLessonFifteen_2","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonFifteen_2")},
		364:{"dialogName":"uiLessonFifteen_3","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonFifteen_3")},
		365:{"dialogName":"uiLessonFifteen_4","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonFifteen_4")},
		366:{"dialogName":"uiLessonFifteen_5","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonFifteen_5")},
		367:{"dialogName":"uiLessonFifteen_6","instance":new ui.LessonTwoInputContainer_1("uiLessonFifteen_6")},
		368:{"dialogName":"uiLessonFifteen_7","instance":new ui.LessonTwoInputContainer_1("uiLessonFifteen_7")},
		369:{"dialogName":"uiLessonFifteen_8","instance":new ui.LessonOneDrawWordContainer_3("uiLessonFifteen_8")},
		370:{"dialogName":"uiLessonFifteen_9","instance":new ui.LessonOneDrawWordContainer_3("uiLessonFifteen_9")},
		371:{"dialogName":"uiLessonFifteenExercise_1","instance":new ui.LessonOneRecordContainer_5("uiLessonFifteenExercise_1")},
		372:{"dialogName":"uiLessonFifteenExercise_2","instance":new ui.LessonOneDrawWordContainer_3("uiLessonFifteenExercise_2")},
		373:{"dialogName":"uiLessonFifteenExercise_3","instance":new ui.LessonOneDrawWordContainer_3("uiLessonFifteenExercise_3")},
		374:{"dialogName":"uiLessonFifteenExercise_4","instance":new ui.LessonTwoInputContainer_1("uiLessonFifteenExercise_4")},
		375:{"dialogName":"uiLessonFifteenExercise_5","instance":new ui.LessonTwoInputContainer_1("uiLessonFifteenExercise_5")},
		376:{"dialogName":"uiLessonFifteenExercise_6","instance":new ui.LessonOneExDrawSentenceContainer_12("uiLessonFifteenExercise_6")},
		377:{"dialogName":"uiLessonFifteenExercise_7","instance":new ui.LessonTwoInputContainer_1("uiLessonFifteenExercise_7")},
		378:{"dialogName":"uiLessonFifteenExercise_8","instance":new ui.LessonOneConnectionLineContainer_2("uiLessonFifteenExercise_8")},
		379:{"dialogName":"uiLessonFifteenExercise_9","instance":new ui.LessonOneDragExContainer_5("uiLessonFifteenExercise_9")},
		380:{"dialogName":"uiLessonFifteenExercise_10","instance":new ui.LessonOneDragExContainer_5("uiLessonFifteenExercise_10")},
		381:{"dialogName":"uiLessonFifteenExercise_11","instance":new ui.LessonOneDragExContainer_5("uiLessonFifteenExercise_11")},
		382:{"dialogName":"uiLessonFifteenExercise_12","instance":new ui.LessonOneDragExContainer_5("uiLessonFifteenExercise_12")},
		383:{"dialogName":"uiLessonFifteenExercise_13","instance":new ui.LessonTwoInputContainer_1("uiLessonFifteenExercise_13")},
		384:{"dialogName":"uiLessonFifteenExercise_14","instance":new ui.LessonTwoInputContainer_1("uiLessonFifteenExercise_14")},
		385:{"dialogName":"uiLessonFifteenExercise_15","instance":new ui.LessonTwoInputContainer_1("uiLessonFifteenExercise_15")},
		386:{"dialogName":"uiLessonFifteenExercise_16","instance":new ui.LessonTwoInputContainer_1("uiLessonFifteenExercise_16")},
		
		387:{"dialogName":"uiSuenvaFive_0","instance":new ui.LessonOnePlaySoundContainer_0("uiSuenvaFive_0")},
		388:{"dialogName":"uiSuenvaFive_1","instance":new ui.LessonTwoInputContainer_1("uiSuenvaFive_1")},
		389:{"dialogName":"uiSuenvaFive_2","instance":new ui.LessonOneDragExContainer_5("uiSuenvaFive_2")},
		390:{"dialogName":"uiSuenvaFive_3","instance":new ui.LessonOnePlaySoundContainer_0("uiSuenvaFive_3")},
		391:{"dialogName":"uiSuenvaFive_4","instance":new ui.LessonTwoInputContainer_1("uiSuenvaFive_4")},
		392:{"dialogName":"uiSuenvaFive_5","instance":new ui.LessonTwoInputContainer_1("uiSuenvaFive_5")},
		393:{"dialogName":"uiSuenvaFive_6","instance":new ui.LessonOneDragExContainer_5("uiSuenvaFive_6")},
		394:{"dialogName":"uiSuenvaFive_7","instance":new ui.LessonOneDragExContainer_5("uiSuenvaFive_7")},
		395:{"dialogName":"uiSuenvaFive_8","instance":new ui.LessonOneDragExContainer_5("uiSuenvaFive_8")},
		396:{"dialogName":"uiSuenvaFive_9","instance":new ui.LessonOneDragExContainer_5("uiSuenvaFive_9")},
		397:{"dialogName":"uiSuenvaFive_10","instance":new ui.LessonOnePlaySoundContainer_0("uiSuenvaFive_10")},
		398:{"dialogName":"uiSuenvaFive_11","instance":new ui.LessonTwoInputContainer_1("uiSuenvaFive_11")},
		399:{"dialogName":"uiSuenvaFive_12","instance":new ui.LessonOnePlaySoundContainer_0("uiSuenvaFive_12")},
		400:{"dialogName":"uiSuenvaFive_13","instance":new ui.LessonOneDragExContainer_5("uiSuenvaFive_13")},
		401:{"dialogName":"uiSuenvaFive_14","instance":new ui.LessonTwoInputContainer_1("uiSuenvaFive_14")},
		
		402:{"dialogName":"uiChapter_6","instance":new ui.ChapterContainer("uiChapter_6")},



		403:{"dialogName":"uiLessonSixteen_0","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonSixteen_0")},
		404:{"dialogName":"uiLessonSixteen_1","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonSixteen_1")},
		405:{"dialogName":"uiLessonSixteen_2","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonSixteen_2")},
		406:{"dialogName":"uiLessonSixteen_3","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonSixteen_3")},
		
		407:{"dialogName":"uiLessonSixteen_4","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonSixteen_4")},
		408:{"dialogName":"uiLessonSixteen_5","instance":new ui.LessonTwoInputContainer_1("uiLessonSixteen_5")},
		409:{"dialogName":"uiLessonSixteen_6","instance":new ui.LessonOneDrawWordContainer_3("uiLessonSixteen_6")},
		410:{"dialogName":"uiLessonSixteen_7","instance":new ui.LessonOneDrawWordContainer_3("uiLessonSixteen_7")},
		
		411:{"dialogName":"uiLessonSixteenExercise_1","instance":new ui.LessonOneRecordContainer_5("uiLessonSixteenExercise_1")},
		412:{"dialogName":"uiLessonSixteenExercise_2","instance":new ui.LessonOneDrawWordContainer_3("uiLessonSixteenExercise_2")},
		413:{"dialogName":"uiLessonSixteenExercise_3","instance":new ui.LessonOneDrawWordContainer_3("uiLessonSixteenExercise_3")},
		414:{"dialogName":"uiLessonSixteenExercise_4","instance":new ui.LessonTwoInputContainer_1("uiLessonSixteenExercise_4")},
		415:{"dialogName":"uiLessonSixteenExercise_5","instance":new ui.LessonTwoInputContainer_1("uiLessonSixteenExercise_5")},
		416:{"dialogName":"uiLessonSixteenExercise_6","instance":new ui.LessonTwoInputContainer_1("uiLessonSixteenExercise_6")},
		417:{"dialogName":"uiLessonSixteenExercise_7","instance":new ui.LessonOneDragExContainer_5("uiLessonSixteenExercise_7")},
		418:{"dialogName":"uiLessonSixteenExercise_8","instance":new ui.LessonOneDragExContainer_5("uiLessonSixteenExercise_8")},
		419:{"dialogName":"uiLessonSixteenExercise_9","instance":new ui.LessonOneDragExContainer_5("uiLessonSixteenExercise_9")},
		420:{"dialogName":"uiLessonSixteenExercise_10","instance":new ui.LessonOneDragExContainer_5("uiLessonSixteenExercise_10")},
		421:{"dialogName":"uiLessonSixteenExercise_11","instance":new ui.LessonTwoInputContainer_1("uiLessonSixteenExercise_11")},
		422:{"dialogName":"uiLessonSixteenExercise_12","instance":new ui.LessonTwoInputContainer_1("uiLessonSixteenExercise_12")},
		
		423:{"dialogName":"uiLessonSeventeen_0","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonSeventeen_0")},
		424:{"dialogName":"uiLessonSeventeen_1","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonSeventeen_1")},
		425:{"dialogName":"uiLessonSeventeen_2","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonSeventeen_2")},
		426:{"dialogName":"uiLessonSeventeen_3","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonSeventeen_3")},
		427:{"dialogName":"uiLessonSeventeen_4","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonSeventeen_4")},
		428:{"dialogName":"uiLessonSeventeen_5","instance":new ui.LessonTwoInputContainer_1("uiLessonSeventeen_5")},
		429:{"dialogName":"uiLessonSeventeen_6","instance":new ui.LessonTwoInputContainer_1("uiLessonSeventeen_6")},
		430:{"dialogName":"uiLessonSeventeen_7","instance":new ui.LessonTwoInputContainer_1("uiLessonSeventeen_7")},
		431:{"dialogName":"uiLessonSeventeen_8","instance":new ui.LessonOneDrawWordContainer_3("uiLessonSeventeen_8")},
		432:{"dialogName":"uiLessonSeventeen_9","instance":new ui.LessonOneDrawWordContainer_3("uiLessonSeventeen_9")},
		433:{"dialogName":"uiLessonSeventeenExercise_1","instance":new ui.LessonOneRecordContainer_5("uiLessonSeventeenExercise_1")},
		434:{"dialogName":"uiLessonSeventeenExercise_2","instance":new ui.LessonOneDrawWordContainer_3("uiLessonSeventeenExercise_2")},
		435:{"dialogName":"uiLessonSeventeenExercise_3","instance":new ui.LessonOneDrawWordContainer_3("uiLessonSeventeenExercise_3")},
		436:{"dialogName":"uiLessonSeventeenExercise_4","instance":new ui.LessonOneExLineationContainer_13("uiLessonSeventeenExercise_4")},
		437:{"dialogName":"uiLessonSeventeenExercise_5","instance":new ui.LessonOneExLineationContainer_13("uiLessonSeventeenExercise_5")},
		438:{"dialogName":"uiLessonSeventeenExercise_6","instance":new ui.LessonOneExLineationContainer_13("uiLessonSeventeenExercise_6")},
		439:{"dialogName":"uiLessonSeventeenExercise_7","instance":new ui.LessonOneExLineationContainer_13("uiLessonSeventeenExercise_7")},
		440:{"dialogName":"uiLessonSeventeenExercise_8","instance":new ui.LessonTwoInputContainer_1("uiLessonSeventeenExercise_8")},
		441:{"dialogName":"uiLessonSeventeenExercise_9","instance":new ui.LessonTwoInputContainer_1("uiLessonSeventeenExercise_9")},
		442:{"dialogName":"uiLessonSeventeenExercise_10","instance":new ui.LessonOneDragExContainer_5("uiLessonSeventeenExercise_10")},
		443:{"dialogName":"uiLessonSeventeenExercise_11","instance":new ui.LessonOneDragExContainer_5("uiLessonSeventeenExercise_11")},
		444:{"dialogName":"uiLessonSeventeenExercise_12","instance":new ui.LessonOneDragExContainer_5("uiLessonSeventeenExercise_12")},
		445:{"dialogName":"uiLessonSeventeenExercise_13","instance":new ui.LessonOneDragExContainer_5("uiLessonSeventeenExercise_13")},
		446:{"dialogName":"uiLessonSeventeenExercise_14","instance":new ui.LessonTwoInputContainer_1("uiLessonSeventeenExercise_14")},
		447:{"dialogName":"uiLessonSeventeenExercise_15","instance":new ui.LessonTwoInputContainer_1("uiLessonSeventeenExercise_15")},
	
		448:{"dialogName":"uiLessonEighteen_0","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonEighteen_0")},
		449:{"dialogName":"uiLessonEighteen_1","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonEighteen_1")},
		450:{"dialogName":"uiLessonEighteen_2","instance":new ui.LessonOnePlaySoundContainer_0("uiLessonEighteen_2")},
		451:{"dialogName":"uiLessonEighteen_3","instance":new ui.LessonTwoInputContainer_1("uiLessonEighteen_3")},
		452:{"dialogName":"uiLessonEighteen_4","instance":new ui.LessonOneDrawWordContainer_3("uiLessonEighteen_4")},
		453:{"dialogName":"uiLessonEighteen_5","instance":new ui.LessonOneDrawWordContainer_3("uiLessonEighteen_5")},
		454:{"dialogName":"uiLessonEighteen_6","instance":new ui.LessonTwoInputContainer_1("uiLessonEighteen_6")},
		455:{"dialogName":"uiLessonEighteenExercise_1","instance":new ui.LessonOneExDrawSentenceContainer_12("uiLessonEighteenExercise_1")},
		456:{"dialogName":"uiLessonEighteenExercise_2","instance":new ui.LessonOneExDrawSentenceContainer_12("uiLessonEighteenExercise_2")},
		457:{"dialogName":"uiLessonEighteenExercise_3","instance":new ui.LessonOneRecordContainer_5("uiLessonEighteenExercise_3")},
		458:{"dialogName":"uiLessonEighteenExercise_4","instance":new ui.LessonOneDrawWordContainer_3("uiLessonEighteenExercise_4")},
		459:{"dialogName":"uiLessonEighteenExercise_5","instance":new ui.LessonOneDrawWordContainer_3("uiLessonEighteenExercise_5")},
		460:{"dialogName":"uiLessonEighteenExercise_6","instance":new ui.LessonOneDragExContainer_5("uiLessonEighteenExercise_6")},
		461:{"dialogName":"uiLessonEighteenExercise_7","instance":new ui.LessonTwoInputContainer_1("uiLessonEighteenExercise_7")},
		462:{"dialogName":"uiLessonEighteenExercise_8","instance":new ui.LessonOneDragExContainer_5("uiLessonEighteenExercise_8")},
		463:{"dialogName":"uiLessonEighteenExercise_9","instance":new ui.LessonOneDragExContainer_5("uiLessonEighteenExercise_9")},
		464:{"dialogName":"uiLessonEighteenExercise_10","instance":new ui.LessonOneDragExContainer_5("uiLessonEighteenExercise_10")},
		465:{"dialogName":"uiLessonEighteenExercise_11","instance":new ui.LessonOneDragExContainer_5("uiLessonEighteenExercise_11")},
		466:{"dialogName":"uiLessonEighteenExercise_12","instance":new ui.LessonOneConnectionLineContainer_2("uiLessonEighteenExercise_12")},
		467:{"dialogName":"uiLessonEighteenExercise_13","instance":new ui.LessonTwoInputContainer_1("uiLessonEighteenExercise_13")},
		468:{"dialogName":"uiLessonEighteenExercise_14","instance":new ui.LessonTwoInputContainer_1("uiLessonEighteenExercise_14")},
		469:{"dialogName":"uiLessonEighteenExercise_15","instance":new ui.LessonTwoInputContainer_1("uiLessonEighteenExercise_15")},
		470:{"dialogName":"uiLessonEighteenExercise_16","instance":new ui.LessonTwoInputContainer_1("uiLessonEighteenExercise_16")},
		
		471:{"dialogName":"uiSuenvaSix_0","instance":new ui.LessonOnePlaySoundContainer_0("uiSuenvaSix_0")},
		472:{"dialogName":"uiSuenvaSix_1","instance":new ui.LessonOnePlaySoundContainer_0("uiSuenvaSix_1")},
		473:{"dialogName":"uiSuenvaSix_2","instance":new ui.LessonOneDragExContainer_5("uiSuenvaSix_2")},
		474:{"dialogName":"uiSuenvaSix_3","instance":new ui.LessonOnePlaySoundContainer_0("uiSuenvaSix_3")},
		475:{"dialogName":"uiSuenvaSix_4","instance":new ui.LessonTwoInputContainer_1("uiSuenvaSix_4")},
		476:{"dialogName":"uiSuenvaSix_5","instance":new ui.LessonOneConnectionLineContainer_2("uiSuenvaSix_5")},
		477:{"dialogName":"uiSuenvaSix_6","instance":new ui.LessonOneDragExContainer_5("uiSuenvaSix_6")},
		478:{"dialogName":"uiSuenvaSix_7","instance":new ui.LessonOneDragExContainer_5("uiSuenvaSix_7")},
		479:{"dialogName":"uiSuenvaSix_8","instance":new ui.LessonTwoInputContainer_1("uiSuenvaSix_8")},
		480:{"dialogName":"uiSuenvaSix_9","instance":new ui.LessonTwoInputContainer_1("uiSuenvaSix_9")},
		481:{"dialogName":"uiSuenvaSix_10","instance":new ui.LessonTwoInputContainer_1("uiSuenvaSix_10")},
		482:{"dialogName":"uiSuenvaSix_11","instance":new ui.LessonTwoInputContainer_1("uiSuenvaSix_11")},
		483:{"dialogName":"uiSuenvaSix_12","instance":new ui.LessonOneDragExContainer_5("uiSuenvaSix_12")},
		484:{"dialogName":"uiSuenvaSix_13","instance":new ui.LessonOnePlaySoundContainer_0("uiSuenvaSix_13")},
		485:{"dialogName":"uiSuenvaSix_14","instance":new ui.LessonTwoInputContainer_1("uiSuenvaSix_14")},
		
		486:{"dialogName":"uiGenjcwzdizGeizSatbyai_0","instance":new ui.LessonTwoInputContainer_1("uiGenjcwzdizGeizSatbyai_0")},
		487:{"dialogName":"uiGenjcwzdizGeizSatbyai_1","instance":new ui.JundgeRightOrWrong("uiGenjcwzdizGeizSatbyai_1")},
		488:{"dialogName":"uiGenjcwzdizGeizSatbyai_2","instance":new ui.LessonOneDragExContainer_5("uiGenjcwzdizGeizSatbyai_2")},
		489:{"dialogName":"uiGenjcwzdizGeizSatbyai_3","instance":new ui.LessonOneExLineationContainer_13("uiGenjcwzdizGeizSatbyai_3")},
		490:{"dialogName":"uiGenjcwzdizGeizSatbyai_4","instance":new ui.LessonTwoInputContainer_1("uiGenjcwzdizGeizSatbyai_4")},
		491:{"dialogName":"uiGenjcwzdizGeizSatbyai_5","instance":new ui.LessonTwoInputContainer_1("uiGenjcwzdizGeizSatbyai_5")},
		492:{"dialogName":"uiGenjcwzdizGeizSatbyai_6","instance":new ui.LessonTwoInputContainer_1("uiGenjcwzdizGeizSatbyai_6")},
		493:{"dialogName":"uiGenjcwzdizGeizSatbyai_7","instance":new ui.LessonOneExLineationContainer_13("uiGenjcwzdizGeizSatbyai_7")},
		494:{"dialogName":"uiGenjcwzdizGeizSatbyai_8","instance":new ui.LessonTwoInputContainer_1("uiGenjcwzdizGeizSatbyai_8")},
		495:{"dialogName":"uiGenjcwzdizGeizSatbyai_9","instance":new ui.LessonOneDragExContainer_5("uiGenjcwzdizGeizSatbyai_9")},
		496:{"dialogName":"uiGenjcwzdizGeizSatbyai_10","instance":new ui.LessonOneDragExContainer_5("uiGenjcwzdizGeizSatbyai_10")},
		497:{"dialogName":"uiGenjcwzdizGeizSatbyai_11","instance":new ui.LessonTwoInputContainer_1("uiGenjcwzdizGeizSatbyai_11")},
		498:{"dialogName":"uiGenjcwzdizGeizSatbyai_12","instance":new ui.LessonOneExDrawSentenceContainer_12("uiGenjcwzdizGeizSatbyai_12")},
		499:{"dialogName":"uiGenjcwzdizGeizSatbyai_13","instance":new ui.LessonOneExDrawSentenceContainer_12("uiGenjcwzdizGeizSatbyai_13")},
		500:{"dialogName":"uiGenjcwzdizGeizSatbyai_14","instance":new ui.LessonTwoInputContainer_1("uiGenjcwzdizGeizSatbyai_14")},
		
		501:{"dialogName":"uiSwz_0","instance":new ui.LessonOnePlaySoundContainer_0("uiSwz_0")},
		502:{"dialogName":"uiSwz_1","instance":new ui.LessonOnePlaySoundContainer_0("uiSwz_1")},
		503:{"dialogName":"uiSwz_2","instance":new ui.LessonOnePlaySoundContainer_0("uiSwz_2")},
		504:{"dialogName":"uiSwz_3","instance":new ui.LessonOnePlaySoundContainer_0("uiSwz_3")},
		505:{"dialogName":"uiSwz_4","instance":new ui.LessonOnePlaySoundContainer_0("uiSwz_4")},
		506:{"dialogName":"uiSwz_5","instance":new ui.LessonOnePlaySoundContainer_0("uiSwz_5")},
		507:{"dialogName":"uiSwz_6","instance":new ui.LessonOnePlaySoundContainer_0("uiSwz_6")},
		508:{"dialogName":"uiSwz_7","instance":new ui.LessonOnePlaySoundContainer_0("uiSwz_7")},
		509:{"dialogName":"uiSwz_8","instance":new ui.LessonOnePlaySoundContainer_0("uiSwz_8")},
		510:{"dialogName":"uiSwz_9","instance":new ui.LessonOnePlaySoundContainer_0("uiSwz_9")},
	
		511:{"dialogName":"uiafterword","instance":new ui.LessonOnePlaySoundContainer_0("uiafterword")},
    }
    //一页的数据被拆分到多页后，每页的数据开头的index
    var onePageSplitMultiplyDataIndexObj = {
    }
    var chapterIdAndLessonIdObj = {
    }
    var dialogNameToPageNumObj = {
    	
    }
    var bgImgs=[5,27,48,82,106,126,162,184,206,241,261,282,317,342,363,405,425,449];//单词卡页数
    this.dialogNameObj = dialogNameObj;
    this.init = function(lib_, stage_) {
    	loadSound();
    	lib = lib_;
    	stage = stage_;
    	window.isMobile = isMobile();
			window.isAndroid = isAndroid();
    	initViewData();
      mainScene = new lib_.MainScene();
      stage_.addChild(mainScene);
      
      mainScene.addEventListener(window.events.PAGE_NUM, function(e){
      	curIndex = e.data.curIndex;
      	preNextPage();
      });
      bg = mainScene.bg;
      btnPre = mainScene.btnPre;
      btnPre.cursor = "pointer";
      btnNext = mainScene.btnNext;
      btnNext.cursor = "pointer";
      pageNum = mainScene.pageName;
      chapterName = mainScene.chapterName;
	    lessonId = mainScene.lessonId;
	    lessonName = mainScene.lessonName;
	    btnCatalog = mainScene.btnCatalog;
	    btnCatalog.cursor = "pointer";
    	btnCatalog.on("click", function(e){
    		curIndex = 1;
    		preNextPage();
    		commonBarCallback("Moegloeg");
    	});
    	btnLesson = mainScene.btnLesson;
    	btnLesson.cursor = "pointer";
    	btnLesson.on("click", function(){
    		curIndex = lessonIndex;
    		preNextPage();
    	});
	    btnWorkbook = mainScene.btnWorkbook;
	    btnWorkbook.cursor = "pointer";
	    btnWorkbook.on("click", function(){
    		curIndex = workbookIndex;
    		preNextPage();
    	});

      dealPreNextBtn();

      btnPre.on("click", function(e) {
        curIndex--;
        preNextPage();
      });
      btnNext.on("click", function(e) {
      	curIndex++;
      	preNextPage();
      });
      function preNextPage(){
//    	createjs.Sound.stop();
      	if(curIndex < 0){
      		curIndex = 0;
      	}else	if(curIndex > MAX_PAGE){
      		curIndex = MAX_PAGE;
      	}else{
      	}
      	localStorage.twopageNum = curIndex;
      	dealPreNextBtn();
      }
      jumpPageByNum();
      
      function jumpPageByNum(){
      	curIndex = CUR_PAGE_INDEX;
      	if(parseInt(localStorage.twopageNum) > 0){
      		curIndex = parseInt(localStorage.twopageNum);
      	}
      	preNextPage();
      }
    }
		function initViewData(){
      onePageSplitMultiplyDataIndexObj[dialogNameObj[1].dialogName] = "0-4";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[2].dialogName] = "4-7";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[25].dialogName] = "0-3";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[26].dialogName] = "3-6";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[28].dialogName] = "0-3";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[29].dialogName] = "3-6";
      
      onePageSplitMultiplyDataIndexObj[dialogNameObj[68+12].dialogName] = "0-3";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[69+12].dialogName] = "3-5"; 
      onePageSplitMultiplyDataIndexObj[dialogNameObj[71+12].dialogName] = "0-3";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[72+12].dialogName] = "3-5";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[91+12].dialogName] = "0-3"; 
      onePageSplitMultiplyDataIndexObj[dialogNameObj[92+12].dialogName] = "3-6";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[93+12].dialogName] = "6-7";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[95+12].dialogName] = "0-3"; 
      onePageSplitMultiplyDataIndexObj[dialogNameObj[96+12].dialogName] = "3-5";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[97+12].dialogName] = "5-7";
      
      onePageSplitMultiplyDataIndexObj[dialogNameObj[120+4].dialogName] = "0-2";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[121+4].dialogName] = "2-3";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[123+4].dialogName] = "0-2";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[124+4].dialogName] = "2-3";
      
      onePageSplitMultiplyDataIndexObj[dialogNameObj[159].dialogName] = "0-3";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[160].dialogName] = "3-8";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[161].dialogName] = "8-10";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[163].dialogName] = "0-4";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[164].dialogName] = "4-8";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[165].dialogName] = "8-10";
      
      onePageSplitMultiplyDataIndexObj[dialogNameObj[182].dialogName] = "0-4";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[183].dialogName] = "4-8";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[185].dialogName] = "0-4";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[186].dialogName] = "4-7";
	    onePageSplitMultiplyDataIndexObj[dialogNameObj[187].dialogName] = "7-8";
	  
	    onePageSplitMultiplyDataIndexObj[dialogNameObj[204].dialogName] = "0-3";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[205].dialogName] = "3-4";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[207].dialogName] = "0-3";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[208].dialogName] = "3-4";

	    onePageSplitMultiplyDataIndexObj[dialogNameObj[239].dialogName] = "0-5";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[240].dialogName] = "5-10";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[242].dialogName] = "0-5";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[243].dialogName] = "5-8";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[244].dialogName] = "8-10";
      
      onePageSplitMultiplyDataIndexObj[dialogNameObj[259].dialogName] = "0-3";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[260].dialogName] = "3-6";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[262].dialogName] = "0-3";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[263].dialogName] = "3-5";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[264].dialogName] = "5-6";

	    onePageSplitMultiplyDataIndexObj[dialogNameObj[315].dialogName] = "0-3";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[316].dialogName] = "3-6";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[318].dialogName] = "0-4";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[319].dialogName] = "4-6";
      
      onePageSplitMultiplyDataIndexObj[dialogNameObj[340].dialogName] = "0-3";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[341].dialogName] = "3-8";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[343].dialogName] = "0-3";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[344].dialogName] = "3-6";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[345].dialogName] = "6-8";
      
      onePageSplitMultiplyDataIndexObj[dialogNameObj[361].dialogName] = "0-2";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[362].dialogName] = "2-6";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[364].dialogName] = "0-2";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[365].dialogName] = "2-4";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[366].dialogName] = "4-6";
      
      onePageSplitMultiplyDataIndexObj[dialogNameObj[403].dialogName] = "0-2";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[404].dialogName] = "2-4";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[406].dialogName] = "0-2";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[407].dialogName] = "2-4";
      
      onePageSplitMultiplyDataIndexObj[dialogNameObj[423].dialogName] = "0-2";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[424].dialogName] = "2-4";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[426].dialogName] = "0-2";
      onePageSplitMultiplyDataIndexObj[dialogNameObj[427].dialogName] = "2-4";
     
      for(var i = 0; i <= MAX_PAGE; i++){
      	if(i < 3){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "0,0";
      	}else if(i == 3){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "1,0";
      	}else if(i <= 24){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "1,1";
      	}else if(i <=46){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "1,2";
      	}else if(i<=69){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "1,3";
      	}else if(i<=78){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "1,-1";
      	}else if(i == 79){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "2,0";
      	}else if(i<=102){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "2,4";
      	}else if(i<=123){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "2,5";
      	}else if(i<=147){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "2,6";
      	}else if(i<=157){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "2,-1";
      	}else if(i<=158){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "3,0";
      	}else if(i<=181){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "3,7";
      	}else if(i<=203){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "3,8";
      	}else if(i<=225){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "3,9";
      	}else if(i<=237){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "3,-1";
      	}else if(i<=238){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "4,0";
      	}else if(i<=258){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "4,10";
      	}else if(i<=280){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "4,11";
      	}else if(i<=300){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "4,12";
      	}else if(i<=313){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "4,-1";
      	}else if(i<=314){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "5,0";
      	}else if(i<=339){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "5,13";
      	}else if(i<=360){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "5,14";
      	}else if(i<=386){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "5,15";
      	}else if(i<=401){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "5,-1";
      	}else if(i<=402){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "6,0";
      	}else if(i<=422){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "6,16";
      	}else if(i<=447){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "6,17";
      	}else if(i<=470){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "6,18";
      	}else if(i<=485){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "6,-1";
      	}else if(i<=500){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "7,19";
      	}else if(i<=511){
      		chapterIdAndLessonIdObj[dialogNameObj[i].dialogName] = "7,20";
      	}
      }
      for(var pageIndex in dialogNameObj){
      	dialogNameToPageNumObj[dialogNameObj[pageIndex]] = pageIndex;
      }
		}
    function dealPreNextBtn() {
    	if(curPage){
    		curPage.removeView();
    	}
  		var key = dialogNameObj[curIndex].dialogName;
  		curPage = dialogNameObj[curIndex].instance;
      if (!curPage.getView()) {
      	if(curIndex == 0){
      		curPage.init(new lib[dialogNameObj[curIndex].dialogName](), lib, coverCallback);
      	}else{
      		curPage.init(new lib[dialogNameObj[curIndex].dialogName](), onePageSplitMultiplyDataIndexObj[key], chapterIdAndLessonIdObj[key].split(","), lib, mainScene, commonBarCallback);
      	}
      } else {

      }
      curPage.addView(mainScene);
//    mainScene.addChild(curPage.getView());
      if (curIndex == 0) {
        btnPre.visible = false;
      } else {
        btnPre.visible = true;
      }
      if (curIndex == MAX_PAGE) {
        btnNext.visible = false;
      } else {
        btnNext.visible = true;
      }
    }
    function coverCallback(){
    	btnNext.dispatchEvent("click");
    }
    function commonBarCallback(chaperName_, lessonData_){
    	chapterName.text = "";
  		lessonId.text = "";
  		lessonName.text = "";
  		if(curIndex > 2){
  			pageNum.text = curIndex - 2; //发布的时候-2页
  		}else{
  			pageNum.text = "";
  		}
    	if(lessonData_){
    		lessonIndex = lessonData_.lessonIndex;
    		workbookIndex = lessonData_.workbookIndex;
    		if(lessonData_.lessonId == -1||lessonData_.lessonId == 19||lessonData_.lessonId == 20){
    			lessonId.x = 40;
    			lessonName.x = 40;
    		}else{
    			lessonId.text = lessonData_.lessonId;
    			lessonId.x = 40;
    			lessonName.x = 80;
    		}
  			lessonName.text = lessonData_.lessonName;
  			var lessonNameLength = lessonName.getMeasuredWidth();
  			lessonName.lineHeight = 58;
  			btnLesson.x = lessonName.x + lessonNameLength + 50;
  			btnWorkbook.x = lessonName.x + lessonNameLength + 50 + btnLesson.getBounds().width + 10;
  			btnLesson.visible = true;
  			btnWorkbook.visible = true;
  			
  			
  			if(curIndex >= lessonData_.workbookIndex ){
	    		btnPre.gotoAndStop(1);
	    		btnNext.gotoAndStop(1);
	    		bg.gotoAndStop(1);
	    	}else{
	    		btnPre.gotoAndStop(0);
	    		btnNext.gotoAndStop(0);
	    		bg.gotoAndStop(0);
	    	}
    	}else{
    		chapterName.text = chaperName_;
  			btnLesson.visible = false;
  			btnWorkbook.visible = false;
  			btnPre.gotoAndStop(0);
    		btnNext.gotoAndStop(0);
    		bg.gotoAndStop(0);
    	}
    	if(bgImgs.indexOf(curIndex)!=-1){
    		if(!bg.img){
    			bg.img=new createjs.Bitmap(window.PIC_PATH + "lesson_" + lessonData_.lessonId + "/wordBG.jpg");
    		}
    		bg.img.image.src=window.PIC_PATH + "lesson_" + lessonData_.lessonId + "/wordBG.jpg";
    		bg.addChild(bg.img);
    	}else{
    		if(bg.img){
    			bg.img.image.src="";
    		}
    	}
    }
    function isAndroid() {
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			return isAndroid;
		}
		function isMobile(){
			 var u = navigator.userAgent;
		    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		    return isAndroid || isiOS;
		}
		function loadSound(){
			var manifest = [{
					id: window.ANSWER_RIGHT_Id,
					src: window.assetsPath + "right.mp3"
				},
				{
					id: window.ANSWER_WRONG_Id,
					src: window.assetsPath + "wrong.mp3"
				}
			]
			var queue = new createjs.LoadQueue();
			createjs.Sound.alternateExtensions = ["mp3"]; // add other extensions to try loading if the src file extension is not supported
			queue.installPlugin(createjs.Sound);
			queue.addEventListener("complete", function(){
				for(var i =0;i<manifest.length;i++){
					window.isSoundLoadObj[manifest[i].id]=true;
				}
			});
			queue.loadManifest(manifest);
		}
	}
  var mainSceneManager;
  MainSceneManager.getInstance = function() {
    if (!mainSceneManager) {
      mainSceneManager = new MainSceneManager();
    }
    return mainSceneManager;
  }
  window.mainSceneManager = MainSceneManager.getInstance();
})();
