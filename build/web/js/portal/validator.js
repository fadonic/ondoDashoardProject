/*

function numbersonly(e){
	if(e.keyCode == 9){return} // #45236 - Dealing with Tab key press, the cursor should move to next field 
	var unicode=e.charCode? e.charCode : e.keyCode
			if (unicode!=8){ //if the key isn't the backspace key (which we should allow)
				if (unicode<48||unicode>57) //if not a number
					return false //disable key press
			}
}

function f_checkEmail(email){
	var testresults;
	var str = email;
	var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

	if (filter.test(str)){
		testresults=true;
	}else{
		testresults=false;
	}

	return testresults;
}*/

var tempJsonObject;

function validateFieldsByDiv(divName, jsonObj){
	validationFlag = true;
	tempJsonObject = {};
	
	$("#"+divName+" :input").each(function(){
		if($(this).hasClass("required")){
			if($(this).val() == ""){
				$(this).focus();
				$(this).next(".error").html("This field is mandatory.")
				validationFlag = false;
				
				return false;
			}else{
				tempJsonObject[$(this).attr("id")] = $(this).val();
			}
		}else{
			tempJsonObject[$(this).attr("id")] = $(this).val();
		}
	});
	
	if(validationFlag){
		for(var key in tempJsonObject){
			jsonObj[key]=tempJsonObject[key];
		}
		//console.log(tempJsonObject);
	}
		
	return validationFlag;
}



$(document).ready(function(){
	$("input[type=radio]").on("change", function(){
		$(this).parent(".form-control").next(".error").html("");
	});
	$("input[type=hidden],input[type=text],input[type=number], input[type=password], select").on("change", function(){
			var regex;
			var errorMessage;
			var timeout;
			var pattern=$(this).attr('pattern');
			//alert(pattern);
			var regexObject = getRegexByPattern(pattern);
			regex = regexObject["regex"];
			errorMessage = regexObject["errorMessage"];
			if(regex != undefined && regex!=""){
				if(regex.test($(this).val())){
					$(this).removeClass("input-error");
					$(this).next(".custom-error").html("");
					validationFlag = true;
				}else{
					$(this).addClass("input-error");
					$(this).val("");
					$(this).next("div.custom-error").html(errorMessage);
					if($(this).attr("data-required")==null){
						var currentElement=$(this);
						clearTimeout(timeout);
						timeout=window.setTimeout(function(){
							currentElement.next("div.custom-error").html("");
							currentElement.removeClass("input-error");
						},2000);
					}						
					validationFlag = false;
					return false;
				}
			}
			if(typeof f_formAssessmentOnChange == 'function') f_formAssessmentOnChange();
	});
});


function onlyNos(e, t) {
    try {
        if (window.event) {
            var charCode = window.event.keyCode;
        }
        else if (e) {
            var charCode = e.which;
        }
        else { return true; }
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
    catch (err) {
        //alert(err.Description);
    	return false;
    }
}
function showDecimalFormat(t){
	try{
		var value=$(t).val();
		if(value=="" || value==0){
			$(t).val("0.00");
		}else{
			$(t).val(parseFloat(value).toFixed(2));
		}
	}catch(err){
		alert(err.Description);
	}
}
function onlyNosAndDecimal(e, t) {
	try {
		var charCode = (e.which) ? e.which : e.keyCode;
	    if (charCode == 46) {
	        //Check if the text already contains the . character
	        if (t.value.indexOf('.') === -1) {
	            return true;
	        } else {
	            return false;
	        }
	    } else {
	        if (charCode > 31
	             && (charCode < 48 || charCode > 57))
	            return false;
	    }
	    return true;
	 }
	    catch (err) {
            //alert(err.Description);
	    	return false;
        }
}
function phoneInputFormat(e, t) {
	try {
		var charCode = (e.which) ? e.which : e.keyCode;
	    if((t.value==''||t.value==null)&& charCode!=48){
	    	return false;
	    }
		if (charCode > 31
	         && (charCode < 48 || charCode > 57))
	        return false;
		return true;
	 }
	    catch (err) {
            //alert(err.Description);
	    	return false;
        }
}

function validateFormElement(value,pattern){
	var regex;
	var errorMessage="Please provide an input for this field.";
	var timeout;
	var regexObject = getRegexByPattern(pattern);
	regex = regexObject["regex"];
	errorMessage = regexObject["errorMessage"];
	if(regex != undefined && regex!="" && value!='' && regex.test(value)){
		return null;
	}else{
		if((regex=="" || regex==null) && (value!=null && value!='')){
			return null;
		}
		return errorMessage+" This is a mandatory field.";
	}
}
function getRegexByPattern(pattern){
	if(pattern==null){
		pattern="";
	}
	var regexObject = new Object();
	var regex="",errorMessage="Please provide an input for this field";
	switch(pattern){
	case "alphanumeric":{
		regex=/^([a-zA-Z0-9]){1,60}$/;
		errorMessage="Enter only alhpabets and numbers";
		break;
	}
	case "alphabets":{
		regex=/^([a-zA-Z]){1,60}$/;
		errorMessage="Enter only alphabets";
		break;
	}
	case "alphabetsWithSpaces":{
		regex=/^([a-zA-Z ]){1,60}$/;
		errorMessage="Enter only alphabets";
		break;
	}
	case "alphanumericWithSpaces":{
		regex= /^([a-zA-Z0-9 ]){1,60}$/;
		errorMessage="Enter only alphabets and numbers";
		break;
	}
	
	case "alpha&special":{
		regex=/^([a-zA-Z ',-]){1,60}$/;
		errorMessage="Enter only alphabets and special characters";
		break;
	}
	
	case "alpha&CommaLG":{
		regex=/^([a-zA-Z ,-]){1,150}$/;
		errorMessage="Only alphabets and spaces are allowed. Maximum character limit is 150 characters.";
		break;
	}
	case "alphanumeric&special":{
		regex=/^([a-zA-Z0-9 _-]){1,60}$/;
		errorMessage="Enter only alphanumeric input and special characters";
		break;
	}
	
	case "alphanumeric&specialWithSpaces":{
		regex=/^([a-zA-Z0-9 ,._ -]){1,60}$/;
		errorMessage="Enter only alphanumeric input and special characters";
		break;
	}
	case "alphanumeric&specialWithSpacesLG":{
		regex=/^([a-zA-Z0-9 ,._ -]){1,150}$/;
		errorMessage="Enter only alphanumeric input and special characters. Maximum input is 150 characters.";
		break;
	}
	case "email":{
		//regex=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{1,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		//regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
		/*REGEX for Allowing & in E MAIL*/
		//regex=/^[^<>()[\]\\,;:\%#^\s@\"$!@]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/
		regex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		errorMessage="Enter a valid email address";
		break;
	}
	case "password":{
		regex=/^(?=.*\d)(?=.*[!~@#$%^&*_])(?=.*[a-z])(?=.*[A-Z]).{8,60}$/;
		errorMessage="Please read the password policy and set your password accordingly";
		break;
	}
	case "phonenumbers":{
		regex=/^0[0-9]{10,10}$/;
		errorMessage="Enter a valid mobile number starting with 0";
		break;
	}
	case "numbers":{
		regex=/^[0-9.]{1,20}$/;
		errorMessage="Enter only numbers.Max-Input=20";
		break;
	}
	case "number":{
		regex=/^[0-9.]{1,20}$/;
		errorMessage="Enter only numbers.Max-Input=20";
		break;
	}
	case "numbersSM":{
		regex=/^[0-9.]{1,10}$/;
		errorMessage="Enter only numbers.Max-Input=10";
		break;
	}
	case "numbersLg":{
		regex=/^[0-9.]{1,50}$/;
		errorMessage="Enter only numbers.Max-Input=50";
		break;
	}
	case "year":{
		regex=/^[0-9]{1,4}$/;
		errorMessage="Select a valid year";
		break;
	}
	case "KRIN":{
		regex=/^[0-9]{7,8}$/;
		errorMessage="<i>Please enter a valid KRIN</i>";
		break;
	}
	case "profession":{
		regex=/^[a-zA-Z\[,.\] ]{1,60}$/;
		errorMessage="Please enter a valid profession";
		break;
	}
	case "Address":{
		regex=/^[a-zA-Z0-9,+-//\\:@. ]{1,60}$/;
		errorMessage="Please enter only numbers, alphabets and allowed special characters[+-\/:@.]";
		break;
	}
	case "AddressLG":{
		regex=/^[a-zA-Z0-9,+-//\\:@. ]{1,150}$/;
		errorMessage="Please enter only numbers, alphabets and allowed special characters[+-\/:@.]";
		break;
	}
	case "TIN":{
		regex=/^([0-9-]){1,60}$/;
		errorMessage="Please enter only numbers and allowed special character[-]";
		break;
	}
	case "Name":{
		regex=/^([a-zA-Z0-9 ._ -!@#$%^&*<>]){1,150}$/;
		errorMessage="";
		break;
	}
	case "TINInput":{
		regex = /^[0-9- ]{1,20}$/;
		errorMessage ="Please provide a valid input. This is a mandatory field.";
		break;
	}
	default:regex="";
	}
	regexObject.regex = regex;
	regexObject.errorMessage= errorMessage;
	return regexObject;
}
