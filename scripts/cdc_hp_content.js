var flashID = "";
var hasAudio = false;
var autoPlay = false;
var blnLastPage = false;
var enableNext = true;
var enableBack = true;
var closing = true;
var secondAudio = false;
var itemsViewed = "0";

/**************** Course Comment Tool ****************/
var vpPath = "http://prod.c2ti.com/CommentTool/";	//path to Virtual Pilot site

function addComment() {
	comWin = window.open(vpPath + "addComment.asp?uID=NA&cID=CDC_HPEvaluation&mID=1&lID="+getLesson() + "&pID="+getPage(), "Comments", "width=800,height=600,scrollbars=no");
}

function viewComment() {
	viewWin = window.open(vpPath + "reviewComments.asp?uID=NA&cID=CDC_HPEvaluation&mID=1&lID="+getLesson() + "&pID="+getPage(), "Comments", "width=800,height=600,scrollbars=yes");
}
/**************** End of Comment Tool ****************/

function exitConfirm(){
	if (confirm("Do you wish to exit the course?")==true) {
		exitCourse(true);
	}
}

function goNext() {
	gotoPage("f", nextURL);
	return false;
}

function goBack() {
	gotoPage("b", backURL);
	return false;
}

function goMenu() {
	toMenu();
	return false;
}

function show508version( pgURL ) {
	closing = false;
	window.location.href = pgURL;
}

function showNext() {
	$("#next").css("display", "block");
}

function checkStatus( iTerm ) {
	//iTerm start from 1.  itemsViewed needs to be defined in content page.
	itemsViewed = itemsViewed.substring(0,iTerm-1) + "1" + itemsViewed.substring(iTerm);
	if (itemsViewed.indexOf('0') == -1) {
		showNext();
	}
}
/*********************** Audio Functions **********************************/
function playAudio(audioFile) {
	$("#jquery_jplayer").jPlayer("setMedia", {
		mp3: "../audios/" + audioFile + ".mp3",
		oga: "../audios/" + audioFile + ".ogg"
	}).jPlayer("play");
}

function enableSlideButtons() {
}

/*********************** End of Audio Functions **********************************/

/*********************** Open Popup Functions **********************************/
function openWinCentered(myUrl, myTitle, myWidth, myHeight, scrollbar, resize ) {
	// open the window
	positionTop = (screen.height - myHeight)/2 - 25;
	positionLeft = (screen.width - myWidth)/2 - 5;
	newWin = window.open (myUrl,myTitle,"toolbar=no,location=no,width="+myWidth+",height="+myHeight+",menubar=no,resizable="+resize+",status=no,scrollbars="+scrollbar+",top="+positionTop+",left="+positionLeft+"");
	if (window.focus) newWin.focus();
	return newWin;
}

function refreshPage() {
	closing = false;
	window.location.reload();
}

function openHelp() {
//openWinCentered("../resources/Help.html", "Help", 880, 500, "no", "no");	
	window.open("../resources/FAQs.pdf", "Help");
}

function openGlossary() {
	openWinCentered("../resources/glossary.html", "Glossary", 880, 500, "no", "no");
}

function openResources() {
	lesNum = getLesson();
	if ( (lesNum == 0) || (lesNum == 6) ) {
	  alert("There are no resources for this lesson.");
	} else if (lesNum == 5) {
		resPath = "../resources/resources.pdf";
		openWinCentered(resPath, "Resources", 880, 500, "no", "yes");
	} else {
	  resPath = "../resources/resources_lesson" + lesNum + ".html";
	  openWinCentered(resPath, "Resources", 880, 500, "no", "no");
	}
}

function show_cc() {
	if ( arguments.length > 0 ) {
		filename = "../generic_cc.html";
	} else {
		filename = getPage() + "_cc.html";
	}
	openWinCentered( filename, "AudioTranscript", 543, 321, "no", "yes" );
}

function showPopup(iTerm) {
    filename = getPage() + "_pop.html?popterm=" + iTerm;
    openWinCentered( filename, "popupText", 880, 500, "no", "yes" );
}

function pageTitlePDF(url,title) {
	window.open("../resources/" + url, title);
 }
/*********************** End of Open Popup Functions **********************************/

/********************** Question Feedback *************************/
function showFeedback(fdbkText) {
	if (triesUser == triesLimit) {
		$("#next").css("display", "block");
		//There is no submit button for drag to trash can.
		if ($("#submit").length > 0) $("#submit").hide();
	}

	document.getElementById('fdbkTxt').innerHTML = fdbkText;
	document.getElementById('feedback').style.display = 'block';	
	document.getElementById('feedback').focus();	
}
/********************** End of Question Feedback *************************/

if ( inLMS == true ) {
	window.onunload = callExitCourse;
	//window.onbeforeunload = callExitCourse;
	initializePage();
}

/*********** Enable Next button - disabled for interactions ****************/
document.onkeydown = function(e) {
  var evtobj = window.event ? event : e;
  var code = evtobj.charCode ? evtobj.charCode : evtobj.keyCode;
  var keyPressed = String.fromCharCode(code);
  if (code == 39) { //right arrow key
	showNext();
  }
}

$(document).ready(function () {
    $("#next").on("click", goNext);
    $("#back").on("click", goBack);
	$("#refresh").on("click", refreshPage);
    $("#menu").on("click", goMenu);
    $("#resources").on("click", openResources);
    $("#glossary").on("click", openGlossary);
	$("#help").on("click", openHelp);
    $("#exit").on("click", exitConfirm);
    if (!enableNext) $("#next").addClass("disabled");
    if (!enableBack) $("#back").addClass("disabled");
	$("img").attr("title", function() { return this.alt; } );
	$("a").each(function() {
	  if ( ($(this).attr("rel") != undefined) && ($(this).attr("rel").search("shadowbox") != -1) ) { 
		  $(this).click( function () {
			  $(this).addClass("sb_visited");
		  });
	  }
	});
	if (hasAudio) {
	  if (autoPlay) {
		$("#jquery_jplayer").jPlayer({
			ready: function () {
				$(this).jPlayer("setMedia", {
					mp3: "../audios/" + audioFile + ".mp3",
					oga: "../audios/" + audioFile + ".ogg"
				}).jPlayer("play");
			},
			swfPath: "../scripts",
			supplied: "mp3, oga",
			cssSelectorAncestor: "#jp_container",
			wmode: "window"
		});
	  } else {
		$("#jquery_jplayer").jPlayer({
		  	ended: enableSlideButtons,
		  	errorAlerts: true,
			swfPath: "../scripts",
			supplied: "mp3, oga",
			cssSelectorAncestor: "#jp_container",
			wmode: "window"
		});
	  }
	}
});
