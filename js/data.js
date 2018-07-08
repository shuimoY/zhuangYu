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
							"soundWord_16_0": [0.5, 3.6],
							"soundWord_16_1": [5,6],
							"soundWord_16_2": [7,7.8],
							"soundWord_16_3": [8.9,9.77],
							"soundWord_16_4": [10.9,11.3],
							"soundWord_16_5": [12.6, 13.4],
							"soundWord_16_6": [14.5, 15.1],
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