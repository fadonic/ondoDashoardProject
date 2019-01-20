/**
 * This code is written for auto submit of the form when Enter Key on the Keyboard is pressed instead
 * of clicking on the submit button.
 */ 

$("input").keypress(function(event) {
	    if (event.which == 13) {
	        event.preventDefault();
	        var fName = $("#btnSend").attr('onClick');
	        var fName = fName.replace(/[()]/g, "");
	        var fName = window[fName];
	        if(typeof fName == "function")
	        	fName();
	    }
	});