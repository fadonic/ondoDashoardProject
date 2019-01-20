/**
 * login.js
 */
$(document).ready(function() {
	
   document.onkeydown=function(evt){
        var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
        if(keyCode == 13){
        	$("#login").trigger('click');
        }
    }
	  
	$("#login").on("click",function() {
		//debugger;
		var email 		= $("#email").val();
		var password 	= $("#password").val();
		
		/*VALIDATING for REQURED FIELD*/
        var requiredInputIDArray = new Array();
        requiredInputIDArray.push("email");
        requiredInputIDArray.push("password");
        //debugger;
        
        var isFormValid = validateRequiredInputAndRaiseInput(requiredInputIDArray,"loginContainer","Cannot left blank.It is a mandatory field");
        if(!isFormValid){
        	$("html, body").animate({ scrollTop: 150 }, "slow");
        	alert(" Email / Password cannot left blank","error");
            return;
        }
		
		//return;
		
		var formData = new Object();
		formData["userName"] = email;
		formData["password"] = password;
		
		var formDataInJSON = JSON.stringify(formData);
		var url = getContextPath()+"/login";
		
		$.ajax({
			url: url,
			type: "POST",
			datatype:'json',
			data: formDataInJSON,
			contentType:"application/json; charset=utf-8",
			timeout: 240000,
			success: function(res){
				//debugger;
				//$("#loginLoader").hide();
				if(res.status == 0){
					/*REMOVING LOCAL STORAGE LOGIN DATA*/
					removeLocalStorageByKey("userDetail");
					
					var lid 			= res.lid;
					var name 			= res.name;
					var roleName		= res.roleName;
					var email			= res.email;
					var phoneNumber		= res.phoneNumber;
					var userName		= res.userName;
					var roleId			= res.roleId;
					
					/*SETTING USER DATA IN LOCAL STORAGE*/
					var userDetailObj = new Object();
					userDetailObj["lid"] 			= lid;
					userDetailObj["userName"] 		= userName;
					userDetailObj["uniqueUserName"] = name;
					userDetailObj["userRole"] 		= roleName;
					userDetailObj["userRoleId"] 	= roleId;
					
					if (lid !== "" && lid !== null && typeof (lid) !== "undefined") {
						//debugger;
						var userDetailObjInStorage = localStorage.getItem("userDetail");
						if (userDetailObjInStorage !== null || typeof (userDetailObjInStorage) !== 'undefined' || userDetailObjInStorage !== "") {
							setDataInStorage("userDetail",userDetailObj);
						}
					}
					
					window.location.replace(getContextPath()+ "/template.jsp");
					/*var passKey = "iamsam";
					
					var encrypted_sessionToken 	= encrypt(sessionToken,passKey);
					var encrypted_name 			= encrypt(name,passKey);
					var encrypted_roleName 		= encrypt(roleName,passKey);
					var encrypted_email 		= encrypt(email,passKey);
					var encrypted_phoneNumber 	= encrypt(phoneNumber,passKey);
					var encrypted_userName 		= encrypt(userName,passKey);
					var encrypted_roleId 		= encrypt(roleId,passKey);*/
					
					/*GETTING ALL PREVILEGES FOR THIS USER*/
					
					
					/*var formId = "userdataHiddenForm";
					$("#"+formId).find("#sessionToken").val(sessionToken);
					$("#"+formId).find("#name").val(name);
					$("#"+formId).find("#roleName").val(roleName);
					$("#"+formId).find("#email").val(email);
					$("#"+formId).find("#phoneNumber").val(phoneNumber);
					$("#"+formId).find("#userName").val(userName);
					$("#"+formId).find("#roleId").val(roleId);
					
					document.getElementById("userdataHiddenForm").submit();
					return;*/
					
					/*window.location.replace(getContextPath()
									+ "/profilePage.jsp?sessionToken="
									+ res.sessionToken
									+ "&name="
									+ res.name
									+ "&roleName="
									+ res.roleName
									+ "&email="
									+ res.email
									+ "&phoneNumber="
									+ res.phoneNumber
									+ "&userName="
									+ res.userName
									+"&roleId="
									+ res.roleId);
					return false;*/
				}else if(res.status == 1){
					alert("Invalid CREDENTIALS.Please verify","error");
				}else{
					alert(res.message,"error");
				}
			},
	   		error:function(errorText){
	   			$("#loginLoader").hide();
	   			console.log(errorText);
	   		}
		});
	});
	
	$("#reset").click(function() {
		$("#username").val('');
		$("#password").val('');
	});
	
	$("#userLogOut").on("click",function() {
		debugger;
		var $userLogoutBtn = $("#userLogOut");
		$userLogoutBtn.attr("disabled","disabled");
		
		var userDataFromStorage = getUserDataFromStorgae();
		
		var sessionToken = userDataFromStorage["sessionToken"];
		var userName = userDataFromStorage["userName"];
		var uniqueUserName = userDataFromStorage["uniqueUserName"];
		
		var formData = "sessionToken="+sessionToken+"&userName="+uniqueUserName;
		
		var formDataInJSON = JSON.stringify(formData);
		var url = getContextPath()+"/api/logout";
		
		$.ajax({
			url: url,
			type: "GET",
			dataType: "json",
			async:true,
			data:formData,
			contentType:"application/json; charset=utf-8",
			timeout: 240000,
			success: function(res){
				debugger;
				clearLocalStorage();
				window.location.replace(getContextPath()+"/logoff.jsp");
				$userLogoutBtn.attr("disabled","disabled");
				if(res.status == 0){
					console.log("Log out success");
				}else{
					console.log("LOG OUT FAILED","error");
				}
				
	   		},
	   		
			error: function(xhr){
				if(xhr.statusText == "timeout"){
					alert("Server taking too long time to responde!Please try Again","error");
	   				console.log("SLOW CONNECTIVITY DETECTED!Please try Again");
	   			}
				alert("AJAX FAILED / ERROR","error");
				$userLogoutBtn.attr("disabled","disabled");
			}
		});
	});
});

