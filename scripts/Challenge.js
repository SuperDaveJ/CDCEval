/* jQuery based Challenge Quextion for CDC
 * C2 XZ - Sept. 2013
 */
var triesUser = 0;
var triesLimit = 2;
var letters = new Array("A", "B", "C", "D");

function judgeInteraction() {
	var intTemp;
	ansUser = $("input:radio:checked").attr("id");
	if (ansUser == undefined) {
		intTemp = 1;
	} else {
		triesUser += 1;
		if (ansUser == ansCorrect) {
			triesUser = triesLimit;
			intTemp = 3;
			disableQ();
		} else {
			if (triesUser == triesLimit) {
				intTemp = 4;
			} else {
				intTemp = 2;
				$("input:radio").attr("checked", function(i, value) {
					if ( i == (ansCorrect.charCodeAt(0)-65) ) return "checked";
					//else return "";
				});
				disableQ();
			}
		}
		$("#next").css("display", "block"); 
		$("#giveAdvice").hide();
	}
	openShadowbox(intTemp);

/*
	if (triesUser > 0) { 
		$("#giveAdvice").hide();
		$("#tryAgain").css("display", "block");
	}
*/		
}


function openShadowbox(fdbkID) {
	Shadowbox.open({
		content: getPage() + "_pop.html?popterm=" + fdbkID,
		player: "iframe",
		width: 880,
		height: 500
	});
}



function disableQ() {
	$("input:radio").attr("disabled", "disabled");
    $("input[name='mc']").css("cursor", "default");
}

/********** disable context menu *************/
var message="This function is disabled!"; 
document.oncontextmenu = new Function("alert(message); return false;");

jQuery( function($) {
  $("input:radio").css("cursor", "pointer");
});