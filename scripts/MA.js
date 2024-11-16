/* jQuery based Multiple Answer Question - C2 XZ - Sept. 2013 */
var triesUser = 0;
var triesLimit = 2;
var letters = new Array("A", "B", "C", "D", "E", "F", "G", "H");

var fdbkWrong0  = "<p>You have not made any selections.  Please try again.</p>"
 
var judgeInteraction = function() {
	var strTemp;
	
	ansUser = $("input:checkbox").map( function() {
		return (this[checked="checked"]) ? this.id : "";
	}).get().join("");
	if (ansUser == "") {
		strTemp = fdbkWrong0;
	} else {
		triesUser += 1;
		if (ansUser == strCorrectAns) {
			triesUser = triesLimit;
			//if (parent.inQuiz) parent.quiz[qID] = 1;	//set question status
			strTemp = fdbkCorrect;
			disableQ();
		} else {
			if (triesUser == triesLimit) {
				for (var i=0; i<nItems; i++) {
					$("input:checkbox[id='" + letters[i] + "']").attr("checked", false);
				}
				for (var i=0; i<strCorrectAns.length; i++) {
					$("input:checkbox[id='" + strCorrectAns.charAt(i) + "']").attr("checked", true);
				}
				//if (parent.inQuiz) parent.quiz[qID] = 0;	//set question status
				strTemp = fdbkWrong2;
				disableQ();
			} else {
				strTemp = fdbkWrong1;
			}
		}
	}
	showFeedback(strTemp);
}

function disableQ() {
	$("input:checkbox").attr("disabled", "disabled");
    //$("#qTable td").css("cursor", "default");
    $("input[name='ma']").css("cursor", "default");
}

/********** disable context menu *************/
var message="This function is disabled!"; 
document.oncontextmenu = new Function("alert(message); return false;");

jQuery( function($) {
  $("input[name='ma']").css("cursor", "pointer");
});