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
