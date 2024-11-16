/* jQuery based Multiple Choice Question with distractor specific feedback
 * C2 XZ - Sept 2013
 */
var triesUser = 0;
var triesLimit = 2;
var letters = new Array("A", "B", "C", "D", "E", "F", "G", "H");

var fdbkIncorrect0  = "<p>You have not made any selections.  Please try again.</p>"

function judgeInteraction() {
	var strTemp;
	ansUser = $("input:radio:checked").attr("id");
	if (ansUser == undefined) {
		strTemp = fdbkIncorrect0;
	} else {
		triesUser += 1;
		if (ansUser == ansCorrect) {
			triesUser = triesLimit;
			strTemp = fdbkCorrect;
			disableQ();
		} else {
			if (triesUser == triesLimit) {
				$("input:radio").attr("checked", function(i, value) {
					if ( i == (ansCorrect.charCodeAt(0)-65) ) return "checked";
					//else return "";
				});
				strTemp = fdbkFinalIncorrect;
				disableQ();
			} else {
				strTemp = fdbkIncorrect1[ansUser.charCodeAt(0)-65];
			}
		}
	}
	showFeedback(strTemp);
}


function disableQ() {
	$("input:radio").attr("disabled", "disabled");
    //$("#qTable td").css("cursor", "default");
    $("input[name='mc']").css("cursor", "default");
}

/********** disable context menu *************/
var message="This function is disabled!"; 
document.oncontextmenu = new Function("alert(message); return false;");

jQuery( function($) {
  $("input[name='mc']").css("cursor", "pointer");
});