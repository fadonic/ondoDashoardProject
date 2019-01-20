/**
 * 
 */
function getContextPath(){
	return window.location.pathname.substring(0, window.location.pathname.indexOf("/",2));
}

function setDataInStorage(key,dataToBeSaved){
	if (typeof(Storage) !== "undefined") {
		//var dataFromStorage = localStorage.getItem("dataToBeSaved");
		//if(dataFromStorage !== null || typeof(dataFromStorage) !== 'undefined' || dataFromStorage !== ""){
			localStorage.setItem(key, JSON.stringify(dataToBeSaved));
		//}
	} else {
		alert("Local Storage not supported","error");
	    console.log("Local Storage not supported");
	}
}

function raiseInputError(divID,parentID,message,timespan){
	$("#"+parentID).find("#"+divID).addClass("input-error");
	//alert(message,"error");
	//$("#"+parentID).find("#"+divID).next(".error").html(message);
	setTimeout(function() {
		$("#"+parentID).find("#"+divID).removeClass("input-error");
		//$("#"+parentID).find("#"+divID).next(".error").html("");
	}, timespan);
}

function validateRequiredInputAndRaiseInput(requiredInputIDArray,containerDivID,errorMsg){
    var emptyInputsArray = new Array();
    var isFormValid = false;
    
    for(var i = 0; i < requiredInputIDArray.length; i++){
        if($("#"+containerDivID).find("#"+requiredInputIDArray[i]).val() === ""){
            emptyInputsArray.push(requiredInputIDArray[i]);
        }
    }
    
    if(emptyInputsArray.length > 0){
        for(var i = 0; i < emptyInputsArray.length; i++){
            raiseInputError(emptyInputsArray[i],containerDivID,errorMsg,2000);
        }
        
        $("html, body").animate({ scrollTop: 150 }, "slow");
        isFormValid = false;
    }else{
        isFormValid = true;
    }
    
    return isFormValid;
}

function removeLocalStorageByKey(key){
	localStorage.removeItem(key);
}

function getDataFromStorage(key){
	if (typeof(Storage) !== "undefined") {
		var dataFromLocal = localStorage.getItem(key);
	} else {
	    console.log("Local Storage not supported");
	}
	
	return JSON.parse(dataFromLocal);
	
}

/*****************************
 NUMBER FORMATTER FOR CURRENCY
 *****************************/
function formatNumberAsCurrency(num) {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}