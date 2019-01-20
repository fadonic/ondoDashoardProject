$(document).ready(function(){
	var lid;
	var userName;
	
	//debugger;
	var userDetailObj = getDataFromStorage("userDetail");
	if(userDetailObj != null && typeof(userDetailObj) !== "undefined"){
		lid 		= userDetailObj["lid"];
		userName 	= userDetailObj["userName"];
	}
	
	(function (){
		var formObject = new Object();
    	formObject["lid"] 		= lid;
    	formObject["userName"] 	= userName;
    	
    	var formDataInJSON = JSON.stringify(formObject);
		var url = getContextPath()+"/getTaxPayerRegStat";
		
		$.ajax({
			url: url,
			type: "POST",
			dataType: "json",
			async:true,
			data:formDataInJSON,
			contentType:"application/json; charset=utf-8",
			timeout: 240000,
			success: function(res){
					var taxPayerRegistrationStatisticsMultiLineColumnArray 	= new Array();
					
					var xAxisArray 					= ['x', 'JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
					var currentYearArray 			= new Array();
					var previousYearArray			= new Array();
					var previousOfPreviousYearArray	= new Array();
					
					//debugger;
					
					/*Getting CURRENT YEAR*/
					var d = new Date();
				    var currentYear = d.getFullYear();
					
					for(var i=0; i < res.taxPayerRegStatList.length; i++){
						if(res.taxPayerRegStatList[i]["year"] == currentYear){
							currentYearArray.push(res.taxPayerRegStatList[i]["year"]);
							currentYearArray.push(res.taxPayerRegStatList[i]["jan"]);
							currentYearArray.push(res.taxPayerRegStatList[i]["feb"]);
							currentYearArray.push(res.taxPayerRegStatList[i]["mar"]);
							currentYearArray.push(res.taxPayerRegStatList[i]["apr"]);
							currentYearArray.push(res.taxPayerRegStatList[i]["may"]);
							currentYearArray.push(res.taxPayerRegStatList[i]["jun"]);
							currentYearArray.push(res.taxPayerRegStatList[i]["jul"]);
							currentYearArray.push(res.taxPayerRegStatList[i]["aug"]);
							currentYearArray.push(res.taxPayerRegStatList[i]["sep"]);
							currentYearArray.push(res.taxPayerRegStatList[i]["oct"]);
							currentYearArray.push(res.taxPayerRegStatList[i]["nov"]);
							currentYearArray.push(res.taxPayerRegStatList[i]["dec"]);
						}else if(res.taxPayerRegStatList[i]["year"] == currentYear-1){
							previousYearArray.push(res.taxPayerRegStatList[i]["year"]);
							previousYearArray.push(res.taxPayerRegStatList[i]["jan"]);
							previousYearArray.push(res.taxPayerRegStatList[i]["feb"]);
							previousYearArray.push(res.taxPayerRegStatList[i]["mar"]);
							previousYearArray.push(res.taxPayerRegStatList[i]["apr"]);
							previousYearArray.push(res.taxPayerRegStatList[i]["may"]);
							previousYearArray.push(res.taxPayerRegStatList[i]["jun"]);
							previousYearArray.push(res.taxPayerRegStatList[i]["jul"]);
							previousYearArray.push(res.taxPayerRegStatList[i]["aug"]);
							previousYearArray.push(res.taxPayerRegStatList[i]["sep"]);
							previousYearArray.push(res.taxPayerRegStatList[i]["oct"]);
							previousYearArray.push(res.taxPayerRegStatList[i]["nov"]);
							previousYearArray.push(res.taxPayerRegStatList[i]["dec"]);
						}else if(res.taxPayerRegStatList[i]["year"] == currentYear-2){
							previousOfPreviousYearArray.push(res.taxPayerRegStatList[i]["year"]);
							previousOfPreviousYearArray.push(res.taxPayerRegStatList[i]["jan"]);
							previousOfPreviousYearArray.push(res.taxPayerRegStatList[i]["feb"]);
							previousOfPreviousYearArray.push(res.taxPayerRegStatList[i]["mar"]);
							previousOfPreviousYearArray.push(res.taxPayerRegStatList[i]["apr"]);
							previousOfPreviousYearArray.push(res.taxPayerRegStatList[i]["may"]);
							previousOfPreviousYearArray.push(res.taxPayerRegStatList[i]["jun"]);
							previousOfPreviousYearArray.push(res.taxPayerRegStatList[i]["jul"]);
							previousOfPreviousYearArray.push(res.taxPayerRegStatList[i]["aug"]);
							previousOfPreviousYearArray.push(res.taxPayerRegStatList[i]["sep"]);
							previousOfPreviousYearArray.push(res.taxPayerRegStatList[i]["oct"]);
							previousOfPreviousYearArray.push(res.taxPayerRegStatList[i]["nov"]);
							previousOfPreviousYearArray.push(res.taxPayerRegStatList[i]["dec"]);
						}
					}
					
					taxPayerRegistrationStatisticsMultiLineColumnArray.push(xAxisArray);
					if(currentYearArray.length > 0) taxPayerRegistrationStatisticsMultiLineColumnArray.push(currentYearArray);
					if(previousYearArray.length > 0) taxPayerRegistrationStatisticsMultiLineColumnArray.push(previousYearArray);
					if(previousOfPreviousYearArray.length > 0) taxPayerRegistrationStatisticsMultiLineColumnArray.push(previousOfPreviousYearArray);
					
					/*GENERATING taxPayerRegistrationStatisticsMultiLine GRAPH*/
					var title = '';
					var chart = c3.generate({
						bindto: '#taxPayerRegistrationStatisticsMultiLine',
						size: {
					        height: 270,
					        width: 1050
					    },
					    data: {
					    	x : 'x',
					    	columns: taxPayerRegistrationStatisticsMultiLineColumnArray
					    	/*columns: [
					        	['x', 'JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'],
					            ['2018', 30, 200, 100, 400, 12, 210,50, 220, 100, 400, 150, 250],
					            ['2017', 130, 130, 14, 200, 120, 30,60, 50, 130, 100, 450, 25],
					            ['2016', 120, 10, 150, 20, 15, 50,30, 200, 110, 20, 350, 23]
					        ]*/
					    },
					    grid: {
					        x: {
					            show: true
					        },
					        y: {
					            show: true
					        }
					    },
					    bar: {
					        width: {
					            ratio: 0.5 // this makes bar width 50% of length between ticks
					        }
					        // or
					        //width: 100 // this makes bar width 100px
					    },
					    axis: {
					        rotated: false,
					        x: {
					            type: 'category',
					            tick: {
					                rotate: 0,
					                multiline: false
					            },
					            height: 0
					        }
					    }
					});
				},
		   		
			error: function(xhr,res){
					if(xhr.statusText == "timeout"){
						alert("Server taking long time to respond!Please try Again","error");
		   				console.log("SLOW CONNECTIVITY DETECTED!Please try Again");
		   			}
					console.log(res);
					alert("Error Occured","error");
				}
		});
	})();
	
	/*SETTING TAX PAYER COUNTS*/
	(function (){
		var formObject = new Object();
    	formObject["lid"] 		= lid;
    	formObject["userName"] 	= userName;
    	
    	var formDataInJSON = JSON.stringify(formObject);
		var url = getContextPath()+"/getAllPeopleTypeCount";
		
		$.ajax({
			url: url,
			type: "POST",
			dataType: "json",
			async:true,
			data:formDataInJSON,
			contentType:"application/json; charset=utf-8",
			timeout: 240000,
			
			success: function(res){
				for(var i=0; i < res.peopleTypeCountList.length; i++){
					if(res.peopleTypeCountList[i]["peopleCode"] == "5"){
						$("#companyTaxpayerCount").text(res.peopleTypeCountList[i]["count"]);
					}else if(res.peopleTypeCountList[i]["peopleCode"] == "2"){
						$("#vehicleOwnerCount").text(res.peopleTypeCountList[i]["count"]);
					}else if(res.peopleTypeCountList[i]["peopleCode"] == "4"){
						$("#individualTaxpayerCount").text(res.peopleTypeCountList[i]["count"]);
					}else if(res.peopleTypeCountList[i]["peopleCode"] == "3"){
						$("#taxpayerCount").text(res.peopleTypeCountList[i]["count"]);
					}
				}
				
				/*CALACULATING TOTAL*/
				var totalPeopleCount=0;
				for(var i=0; i < res.peopleTypeCountList.length; i++){
					totalPeopleCount=totalPeopleCount+parseInt(res.peopleTypeCountList[i]["count"]);
				}
				
				$("#totalPayerCount").text(totalPeopleCount);
				
			},
			
			error: function(xhr,res){
				if(xhr.statusText == "timeout"){
					alert("Server taking long time to respond!Please try Again","error");
	   				console.log("SLOW CONNECTIVITY DETECTED!Please try Again");
	   			}
				console.log(res);
				alert("Error Occured","error");
			}
		});
	})();
	
	$("#searchTaxpayerBtn").on("click",function() {
		//debugger;
		var $searchTaxpayerBtn = $("#searchTaxpayerBtn");
		$("#taxPayerTableContainer").hide(1000);
		
		var $payerID 					= $("#searchTaxpayerContainer").find("#payerID");
		var $payerName					= $("#searchTaxpayerContainer").find("#name");
		var $dateOfBirth				= $("#searchTaxpayerContainer").find("#dob");
		var $peopleType					= $("#searchTaxpayerContainer").find("#peopleType");
		var $organization				= $("#searchTaxpayerContainer").find("#organisation");
		var $phone						= $("#searchTaxpayerContainer").find("#phone");
		var $email						= $("#searchTaxpayerContainer").find("#email");
		var $address					= $("#searchTaxpayerContainer").find("#address");
		var $orin						= $("#searchTaxpayerContainer").find("#orin");
		var $tin						= $("#searchTaxpayerContainer").find("#tin");
		var $registertedBetween			= $("#searchTaxpayerContainer").find("#registered");
		var $registertedBetweenRange1	= $("#searchTaxpayerContainer").find("#datetimepicker1");
		var $registertedBetweenRange2	= $("#searchTaxpayerContainer").find("#datetimepicker2");
		
		var allInputIdArray = ["payerID","name","dob","peopleType","organisation","phone","email","address","orin","tin","registered","datetimepicker1","datetimepicker2"];
		/*allInputArray.push("payerID");
		allInputArray.push("name");
		allInputArray.push("dob");
		allInputArray.push("peopleType");
		allInputArray.push("organisation");
		allInputArray.push("phone");
		allInputArray.push("email");
		allInputArray.push("address");
		allInputArray.push("orin");
		allInputArray.push("tin");
		allInputArray.push("registered");
		allInputArray.push("datetimepicker1");
		allInputArray.push("datetimepicker2");*/

		/*VALIDATION FOR AT LEAST ONE INPUT*/
		var nonEmptyInput = 0;
		for(var i = 0; i <= allInputIdArray.length; i++){
			var currentIdValue = $("#searchTaxpayerContainer").find("#"+allInputIdArray[i]).val();
			if(currentIdValue != "" && currentIdValue != null && typeof (currentIdValue) != "undefined" ){
				nonEmptyInput ++;
			}
		}
		
		/*if(nonEmptyInput == 0){
			alert("Please Provide at least one input");
			return;
		}
		*/
		
		//debugger;
		/*VALIDATION FOR Date 1 & Date 2 for Custom Dates VALUE INPUT*/
		/*var registeredIdValue = $("#searchTaxpayerContainer").find("#registered").val();
		if(registeredIdValue == "custom" ){
			var datetimepicker1IdValue = $("#searchTaxpayerContainer").find("#registertedBetweenRange1").val();
			var datetimepicker2IdValue = $("#searchTaxpayerContainer").find("#registertedBetweenRange2").val();
			
			if((datetimepicker1IdValue == "" || datetimepicker1IdValue == null || typeof (datetimepicker1IdValue) == "undefined") ||
				(datetimepicker2IdValue == "" || datetimepicker2IdValue == null || typeof (datetimepicker2IdValue) == "undefined") || nonEmptyInput > 1){
				alert("Please Fill Date 1 & Date 2 for Custom Dates Range");
				return;
			}
		}*/
		
		/*REQUEST OBJ FOR SEARCH*/
		/*{
			  "addressLine1": "string",
			  "birthDate": "string",
			  "due": "string",
			  "emailAddress": "string",
			  "firstName": "string",
			  "lastName": "string",
			  "middleName": "string",
			  "orgName": "string",
			  "orin": "string",
			  "payerId": "string",
			  "peopleCode": "string",
			  "phone": "string",
			  "regDate": "string",
			  "regDateTo": "string",
			  "tin": "string"
		}*/
		
		var formObject = new Object();
		formObject["payerId"] 		= $payerID.val();
		formObject["firstName"] 	= $payerName.val();
		formObject["birthDate"] 	= $dateOfBirth.val();
		formObject["peopleCode"] 	= $peopleType.val();
		formObject["orgName"] 		= $organization.val();
		formObject["phone"] 		= $phone.val();
		formObject["emailAddress"] 	= $email.val();
		formObject["addressLine1"] 	= $address.val();
		formObject["orin"] 			= $orin.val();
		formObject["tin"] 			= $tin.val();
		formObject["regDate"] 		= $registertedBetweenRange1.val();
		formObject["regDateTo"] 	= $registertedBetweenRange2.val();
    	
    	var formDataInJSON = JSON.stringify(formObject);
    	//debugger;
    	
    	var registertedBetweenRange1Val;
    	var registertedBetweenRange2Val;
    	
    	registertedBetweenRange1Val = typeof ($registertedBetweenRange1.val()) == "undefined" ? "" : $registertedBetweenRange1.val();
    	registertedBetweenRange2Val = typeof ($registertedBetweenRange2.val()) == "undefined" ? "" : $registertedBetweenRange2.val();
    	
    	var urlParams = "?sessionToken="+lid
    					+"&userName="+userName
    					+"&payerId="+$payerID.val()
    					+"&firstName="+$payerName.val()
    					+"&birthDate="+$dateOfBirth.val()
    					+"&peopleCode="+$peopleType.val()
    					+"&orgName="+$organization.val()
    					+"&phone="+$phone.val()
    					+"&emailAddress="+$email.val()
    					+"&addressLine1="+$address.val()
    					+"&orin="+$orin.val()
    					+"&tin="+$tin.val()
    					+"&regDate="+registertedBetweenRange1Val
    					+"&regDateTo="+registertedBetweenRange2Val;
    	
		var url = getContextPath()+"/searchTaxPayer"+urlParams;
		//$('body').scrollTop(1E10);
		//scrollWin(0, 400);
		
		$('#taxPayerTable').DataTable().clear();
		$('#taxPayerTable').DataTable({
			"columnDefs": [
				{ "width": "10%", "targets": 0 },
				{ "width": "15%", "targets": 1 },
				{ "width": "10%", "targets": 2 },
				{ "width": "15%", "targets": 3 },
				{ "width": "15%", "targets": 4 },
				{ "width": "20%", "targets": 5 },
				{ "width": "10%", "targets": 6 },
				{ "width": "5%", "targets": 7 }
			],
			processing: true,
	        serverSide: true,
			searching: false,
			paging: true,
			ordering: false,
			info: true,
			destroy: true,
			autoWidth: false,
			ordering: false,
	        ajax: {
	            "url": url,
	            "type": "GET"
	         }
	    });
		
		$("#taxPayerTableContainer").show(1000);
		
		/*$.ajax({
			url: url,
			type: "POST",
			dataType: "json",
			async:true,
			data:formDataInJSON,
			contentType:"application/json; charset=utf-8",
			timeout: 240000,
			success: function(res){
				SUCCESS HANDELER
				if(res.status == 0){
					
					var dataSet = new Array();
					for(var i = 0; i < res.taxPayerList.length; i++){
						var dataArray = new Array();
						dataArray.push(res.taxPayerList[i]["payerId"]);
						dataArray.push(res.taxPayerList[i]["firstName"]);
						dataArray.push(res.taxPayerList[i]["orin"]);
						dataArray.push(res.taxPayerList[i]["birthDate"]);
						dataArray.push(res.taxPayerList[i]["regDate"]);
						dataArray.push(res.taxPayerList[i]["phone"]);
						dataArray.push(res.taxPayerList[i]["emailAddress"]);
						dataArray.push(res.taxPayerList[i]["due"]);
						dataArray.push('<span class="glyphicon glyphicon-folder-open openModal" style="color: #337ab7;"></span>');
						dataArray.push("<i class='fa fa-folder-open text-info' style='cursor: pointer;' aria-hidden='true' onclick=\'openTaxpayerModal(this,"+JSON.stringify(res.taxPayerList[i])+");\'></i>");
						
						dataSet.push(dataArray);
					}
				
					//debugger;
					
					$('#taxPayerTable').DataTable().clear();
					$("#taxPayerTable").DataTable({
						data: dataSet,
						searching: true,
						paging: true,
						info: true,
						destroy: true,
						"autoWidth": false,
						columns: [
								{ title: "Payer ID" },
								{ title: "Name" },
								{ title: "ORIN" },
								{ title: "Birth Date" },
								{ title: "Reg. Date" },
								{ title: "Phone" },
								{ title: "Email" },
								{ title: "Amount Due" },
								{ title: "" }
							]
					});
					
					var scrolled=0;
					$("html, body").animate({ scrollTop: scrolled-130 }, "slow");
					$("#taxPayerTableContainer").show(1000);
					
				}
				
			},
			error: function(xhr,res){
				if(xhr.statusText == "timeout"){
					alert("Server taking long time to respond!Please try Again","error");
	   				console.log("SLOW CONNECTIVITY DETECTED!Please try Again");
	   			}
				console.log(res);
				alert("Error Occured","error");
			}
		});	*/
		
		return;
		
	});
	
	$("#registrationDateSelect").click(function() {
		
	});
	
	$(".showPeopleDetailsByCodeBtn").click(function() {
		$showPeopleDetailsByCodeBtn = $(".showPeopleDetailsByCodeBtn");
		$("#taxPayerTableContainer").hide(1000);
		
		peopleTypeCode = $(this).attr("peopleTypeCode");
		//alert(peopleTypeCode);
		
		var formObject = new Object();
    	/*formObject["lid"] 		= lid;
    	formObject["userName"] 	= userName;*/
    	var formDataInJSON = JSON.stringify(formObject);
    	
		var urlParams = "?sessionToken="+lid+"&userName="+userName+"&peopleCode="+peopleTypeCode;
		var url = getContextPath()+"/getTaxPayerDetailsByPeopleCode"+urlParams;
		
		//$("html, body").animate({ scrollTop: $("#taxPayerTable").scrollTop() }, 1000);
		//scrollWin(0, 700);
		
		$('#taxPayerTable').DataTable().clear();
		$('#taxPayerTable').DataTable({
			"columnDefs": [
				{ "width": "10%", "targets": 0 },
				{ "width": "15%", "targets": 1 },
				{ "width": "10%", "targets": 2 },
				{ "width": "15%", "targets": 3 },
				{ "width": "15%", "targets": 4 },
				{ "width": "20%", "targets": 5 },
				{ "width": "10%", "targets": 6 },
				{ "width": "5%", "targets": 7 }
			],
	        processing: true,
	        serverSide: true,
			searching: false,
			paging: true,
			info: true,
			destroy: true,
			autoWidth: false,
			ordering: false,
	        ajax: {
	            "url": url,
	            "type": "GET"
	            /*dataFilter: function(data){
	            	debugger;
	            	if(data.status == 0){
						var dataSet = new Array();
						for(var i = 0; i < data.taxPayerList.length; i++){
							var dataArray = new Array();
							dataArray.push(data.taxPayerList[i]["payerId"]);
							dataArray.push(data.taxPayerList[i]["firstName"]);
							dataArray.push(data.taxPayerList[i]["orin"]);
							dataArray.push(data.taxPayerList[i]["birthDate"]);
							dataArray.push(data.taxPayerList[i]["regDate"]);
							dataArray.push(data.taxPayerList[i]["phone"]);
							dataArray.push(data.taxPayerList[i]["emailAddress"]);
							dataArray.push(data.taxPayerList[i]["due"]);
							dataArray.push('<span class="glyphicon glyphicon-folder-open openModal" style="color: #337ab7;"></span>');
							dataArray.push("<i class='fa fa-folder-open text-info' style='cursor: pointer;' aria-hidden='true' onclick=\'openTaxpayerModal(this,"+JSON.stringify(data.taxPayerList[i])+");\'></i>");
							
							dataSet.push(dataArray);
						}
	            	}	
	            	
	            	
	                var json = jQuery.parseJSON( data );
	                json.recordsTotal = json.total;
	                json.recordsFiltered = json.total;
	                json.data = json.list;
	     
	                return JSON.stringify(json); // return JSON string
	            }*/
	         }
	    });
		
		$("#taxPayerTableContainer").show(1000);
		
		/*$.ajax({
			url: url,
			type: "POST",
			dataType: "json",
			async:true,
			data:formDataInJSON,
			contentType:"application/json; charset=utf-8",
			timeout: 240000,
			success: function(res){
				SUCCESS HANDELER
				if(res.status == 0){

					var dataSet = new Array();
					for(var i = 0; i < res.taxPayerList.length; i++){
						var dataArray = new Array();
						dataArray.push(res.taxPayerList[i]["payerId"]);
						dataArray.push(res.taxPayerList[i]["firstName"]);
						dataArray.push(res.taxPayerList[i]["orin"]);
						dataArray.push(res.taxPayerList[i]["birthDate"]);
						dataArray.push(res.taxPayerList[i]["regDate"]);
						dataArray.push(res.taxPayerList[i]["phone"]);
						dataArray.push(res.taxPayerList[i]["emailAddress"]);
						dataArray.push(res.taxPayerList[i]["due"]);
						dataArray.push('<span class="glyphicon glyphicon-folder-open openModal" style="color: #337ab7;"></span>');
						dataArray.push("<i class='fa fa-folder-open text-info' style='cursor: pointer;' aria-hidden='true' onclick=\'openTaxpayerModal(this,"+JSON.stringify(res.taxPayerList[i])+");\'></i>");
						
						dataSet.push(dataArray);
					}
				
					//debugger;
					
					$('#taxPayerTable').DataTable().clear();
					$("#taxPayerTable").DataTable({
						data: dataSet,
						searching: true,
						paging: true,
						info: true,
						destroy: true,
						"autoWidth": false,
						columns: [
								{ title: "Payer ID" },
								{ title: "Name" },
								{ title: "ORIN" },
								{ title: "Birth Date" },
								{ title: "Reg. Date" },
								{ title: "Phone" },
								{ title: "Email" },
								{ title: "Amount Due" },
								{ title: "" }
							]
					});
					
					$("#taxPayerTableContainer").show(1000);
					
				}
			},
			error: function(xhr,res){
				if(xhr.statusText == "timeout"){
					alert("Server taking long time to respond!Please try Again","error");
	   				console.log("SLOW CONNECTIVITY DETECTED!Please try Again");
	   			}
				console.log(res);
				alert("Error Occured","error");
			}
		});*/
	});	
	
	$(".totalPayerCountBtn").click(function() {
		$totalPayerCountBtn = $(".totalPayerCountBtn");
		$("#taxPayerTableContainer").hide(1000);
		
		var formObject = new Object();
    	/*formObject["lid"] 		= lid;
    	formObject["userName"] 	= userName;*/
    	var formDataInJSON = JSON.stringify(formObject);
    	
		var urlParams = "?sessionToken="+lid+"&userName="+userName;
		var url = getContextPath()+"/getAllTaxPayerDetails"+urlParams;
		
		$("#taxPayerTableContainer").show(1000);
		
		$('#taxPayerTable').DataTable().clear();
		$('#taxPayerTable').DataTable({
			"columnDefs": [
				{ "width": "10%", "targets": 0 },
				{ "width": "15%", "targets": 1 },
				{ "width": "10%", "targets": 2 },
				{ "width": "15%", "targets": 3 },
				{ "width": "15%", "targets": 4 },
				{ "width": "20%", "targets": 5 },
				{ "width": "10%", "targets": 6 },
				{ "width": "5%", "targets": 7 }
			],
			processing: true,
	        serverSide: true,
			searching: false,
			paging: true,
			info: true,
			destroy: true,
			autoWidth: true,
			ordering: false,
	        ajax: {
	            "url": url,
	            "type": "GET"
	            /*dataFilter: function(data){
	            	debugger;
	            	if(data.status == 0){
						var dataSet = new Array();
						for(var i = 0; i < data.taxPayerList.length; i++){
							var dataArray = new Array();
							dataArray.push(data.taxPayerList[i]["payerId"]);
							dataArray.push(data.taxPayerList[i]["firstName"]);
							dataArray.push(data.taxPayerList[i]["orin"]);
							dataArray.push(data.taxPayerList[i]["birthDate"]);
							dataArray.push(data.taxPayerList[i]["regDate"]);
							dataArray.push(data.taxPayerList[i]["phone"]);
							dataArray.push(data.taxPayerList[i]["emailAddress"]);
							dataArray.push(data.taxPayerList[i]["due"]);
							dataArray.push('<span class="glyphicon glyphicon-folder-open openModal" style="color: #337ab7;"></span>');
							dataArray.push("<i class='fa fa-folder-open text-info' style='cursor: pointer;' aria-hidden='true' onclick=\'openTaxpayerModal(this,"+JSON.stringify(data.taxPayerList[i])+");\'></i>");
							
							dataSet.push(dataArray);
						}
	            	}	
	            	
	            	
	                var json = jQuery.parseJSON( data );
	                json.recordsTotal = json.total;
	                json.recordsFiltered = json.total;
	                json.data = json.list;
	     
	                return JSON.stringify(json); // return JSON string
	            }*/
	         }
	    });
		
		/*$.ajax({
			url: url,
			type: "POST",
			dataType: "json",
			async:true,
			data:formDataInJSON,
			contentType:"application/json; charset=utf-8",
			timeout: 240000,
			success: function(res){
				SUCCESS HANDELER
				if(res.status == 0){

					var dataSet = new Array();
					for(var i = 0; i < res.taxPayerList.length; i++){
						var dataArray = new Array();
						dataArray.push(res.taxPayerList[i]["payerId"]);
						dataArray.push(res.taxPayerList[i]["firstName"]);
						dataArray.push(res.taxPayerList[i]["orin"]);
						dataArray.push(res.taxPayerList[i]["birthDate"]);
						dataArray.push(res.taxPayerList[i]["regDate"]);
						dataArray.push(res.taxPayerList[i]["phone"]);
						dataArray.push(res.taxPayerList[i]["emailAddress"]);
						dataArray.push(res.taxPayerList[i]["due"]);
						dataArray.push('<span class="glyphicon glyphicon-folder-open openModal" style="color: #337ab7;"></span>');
						dataArray.push("<i class='fa fa-folder-open text-info' style='cursor: pointer;' aria-hidden='true' onclick=\'openTaxpayerModal(this,"+JSON.stringify(res.taxPayerList[i])+");\'></i>");
						
						dataSet.push(dataArray);
					}
				
					//debugger;
					
					$('#taxPayerTable').DataTable().clear();
					$("#taxPayerTable").DataTable({
						data: dataSet,
						searching: true,
						paging: true,
						info: true,
						destroy: true,
						"autoWidth": false,
						columns: [
								{ title: "Payer ID" },
								{ title: "Name" },
								{ title: "ORIN" },
								{ title: "Birth Date" },
								{ title: "Reg. Date" },
								{ title: "Phone" },
								{ title: "Email" },
								{ title: "Amount Due" },
								{ title: "" }
							]
					});
					
					$("#taxPayerTableContainer").show(1000);
					
				}
			},
			error: function(xhr,res){
				if(xhr.statusText == "timeout"){
					alert("Server taking long time to respond!Please try Again","error");
	   				console.log("SLOW CONNECTIVITY DETECTED!Please try Again");
	   			}
				console.log(res);
				alert("Error Occured","error");
			}
		});*/
	});
	
	$("#taxpayerTabPanelContainer").find("#propertyTab").click(function() {
		var $propertyTab 	= $("#propertyTab");
		var peopleRSN 		= $(this).attr("payerId");
		
		var formObject = new Object();
    	/*formObject["lid"] 		= lid;
    	formObject["userName"] 	= userName;*/
    	var formDataInJSON = JSON.stringify(formObject);
    	
		var urlParams = "?lid="+lid+"&userName="+userName+"&peopleRSN="+peopleRSN;
		var url = getContextPath()+"/getTaxPayerPropertyDetails"+urlParams;
		
		$.ajax({
			url: url,
			type: "POST",
			dataType: "json",
			async:true,
			data:formDataInJSON,
			contentType:"application/json; charset=utf-8",
			/*timeout: 240000,*/
			success: function(res){
				/*SUCCESS HANDELER*/
				if(res.status == 0){

					var dataSet = new Array();
					for(var i = 0; i < res.taxPayerPropertyDetailsList.length; i++){
						var dataArray = new Array();
						dataArray.push(res.taxPayerPropertyDetailsList[i]["propertyId"]);
						dataArray.push(res.taxPayerPropertyDetailsList[i]["type"]);
						dataArray.push(res.taxPayerPropertyDetailsList[i]["address"]);
						dataArray.push(res.taxPayerPropertyDetailsList[i]["city"]);
						dataArray.push(res.taxPayerPropertyDetailsList[i]["value"]);
						dataArray.push(res.taxPayerPropertyDetailsList[i]["area"]);
						dataArray.push(res.taxPayerPropertyDetailsList[i]["propertyRSN"]);
						dataArray.push(res.taxPayerPropertyDetailsList[i]["areaClass"]);
						dataArray.push(res.taxPayerPropertyDetailsList[i]["landUse"]);
						dataArray.push(res.taxPayerPropertyDetailsList[i]["amountPrevious"]);
						dataArray.push(res.taxPayerPropertyDetailsList[i]["amountCurrent"]);
						/*dataArray.push('<span class="glyphicon glyphicon-folder-open openModal" style="color: #337ab7;"></span>');*/
						/*dataArray.push("<i class='fa fa-folder-open text-info' style='cursor: pointer;' aria-hidden='true' onclick=\'openTaxpayerModal(this,"+JSON.stringify(res.taxPayerPropertyDetailsList[i])+");\'></i>");*/
						
						dataSet.push(dataArray);
					}
				
					//debugger;
					
					$('#taxPayerPropertiesDetailTable').DataTable().clear();
					$("#taxPayerPropertiesDetailTable").DataTable({
						"columnDefs": [
							{ "width": "10%", "targets": 0 }
						],
						data: dataSet,
						searching: false,
						paging: true,
						info: true,
						destroy: true,
						"autoWidth": false,
						ordering: false,
						columns: [
								{ title: "Property ID" },
								{ title: "Type" },
								{ title: "Address" },
								{ title: "City" },
								{ title: "Value" },
								{ title: "Area" },
								{ title: "Property RSN" },
								{ title: "Area Class" },
								{ title: "Land Usage" },
								{ title: "Amount 17" },
								{ title: "Amount 18" }
							]
					});
					
				}
			},
			error: function(xhr,res){
				if(xhr.statusText == "timeout"){
					alert("Server taking long time to respond!Please try Again","error");
	   				console.log("SLOW CONNECTIVITY DETECTED!Please try Again");
	   			}
				console.log(res);
				alert("Error Occured","error");
			}
		});
		
	});
	
	$("#taxpayerTabPanelContainer").find("#paymentHistoryTab").click(function() {
		var $paymentHistoryTab 	= $("#paymentHistoryTab");
		var peopleRSN 			= $(this).attr("payerId");
		
		var formObject = new Object();
    	/*formObject["lid"] 		= lid;
    	formObject["userName"] 	= userName;*/
    	var formDataInJSON = JSON.stringify(formObject);
    	
		var urlParams = "?lid="+lid+"&userName="+userName+"&peopleRSN="+peopleRSN;
		var url = getContextPath()+"/getPaymentHistory"+urlParams;
		
		$.ajax({
			url: url,
			type: "POST",
			dataType: "json",
			async:true,
			data:formDataInJSON,
			contentType:"application/json; charset=utf-8",
			/*timeout: 240000,*/
			success: function(res){
				/*SUCCESS HANDELER*/
				if(res.status == 0){

					var dataSet = new Array();
					for(var i = 0; i < res.paymentHistoryList.length; i++){
						var dataArray = new Array();
						dataArray.push(res.paymentHistoryList[i]["paymentNumber"]);
						dataArray.push(res.paymentHistoryList[i]["paymentDate"]);
						dataArray.push(res.paymentHistoryList[i]["paymentMode"]);
						dataArray.push(res.paymentHistoryList[i]["paymentAmount"]);
						dataArray.push(res.paymentHistoryList[i]["bank"]);
						dataArray.push(res.paymentHistoryList[i]["receiptNumber"]);
						dataArray.push(res.paymentHistoryList[i]["paidBy"]);
						/*dataArray.push('<span class="glyphicon glyphicon-folder-open openModal" style="color: #337ab7;"></span>');*/
						/*dataArray.push("<i class='fa fa-folder-open text-info' style='cursor: pointer;' aria-hidden='true' onclick=\'openTaxpayerModal(this,"+JSON.stringify(res.taxPayerPropertyDetailsList[i])+");\'></i>");*/
						
						dataSet.push(dataArray);
					}
				
					//debugger;
					
					$('#taxPayerPaymentHistoryTable').DataTable().clear();
					$("#taxPayerPaymentHistoryTable").DataTable({
						"columnDefs": [
							{ "width": "10%", "targets": 0 }
						],
						data: dataSet,
						searching: false,
						paging: true,
						info: true,
						destroy: true,
						autoWidth: false,
						ordering: false,
						columns: [
								{ title: "Payment Number" },
								{ title: "Payment Date" },
								{ title: "Payment Mode" },
								{ title: "Payment Amount" },
								{ title: "Bank" },
								{ title: "Receipt Number" },
								{ title: "Paid By" }
							]
					});
					
				}
			},
			error: function(xhr,res){
				if(xhr.statusText == "timeout"){
					alert("Server taking long time to respond!Please try Again","error");
	   				console.log("SLOW CONNECTIVITY DETECTED!Please try Again");
	   			}
				console.log(res);
				alert("Error Occured","error");
			}
		});
		
		
	});
	
	$("#taxpayerTabPanelContainer").find("#taxFoldersTab").click(function() {
		var $taxFoldersTab 	= $("#taxFoldersTab");
		var peopleRSN 		= $(this).attr("payerId");
		
		var formObject = new Object();
    	/*formObject["lid"] 		= lid;
    	formObject["userName"] 	= userName;*/
    	var formDataInJSON = JSON.stringify(formObject);
    	
		var urlParams = "?lid="+lid+"&userName="+userName+"&peopleRSN="+peopleRSN;
		var url = getContextPath()+"/getTaxFolderDetails"+urlParams;
		
		$.ajax({
			url: url,
			type: "POST",
			dataType: "json",
			async:true,
			data:formDataInJSON,
			contentType:"application/json; charset=utf-8",
			/*timeout: 240000,*/
			success: function(res){
				/*SUCCESS HANDELER*/
				if(res.status == 0){

					var dataSet = new Array();
					for(var i = 0; i < res.taxFolderDetails.length; i++){
						var dataArray = new Array();
						dataArray.push(res.taxFolderDetails[i]["folderId"]);
						dataArray.push(res.taxFolderDetails[i]["dateCreated"]);
						dataArray.push(res.taxFolderDetails[i]["typeDesc"]);
						dataArray.push(res.taxFolderDetails[i]["subType"]);
						dataArray.push(res.taxFolderDetails[i]["amountBilled"]);
						dataArray.push(res.taxFolderDetails[i]["amountPaid"]);
						dataArray.push(res.taxFolderDetails[i]["amountDue"]);
						/*dataArray.push('<span class="glyphicon glyphicon-folder-open openModal" style="color: #337ab7;"></span>');*/
						/*dataArray.push("<i class='fa fa-folder-open text-info' style='cursor: pointer;' aria-hidden='true' onclick=\'openTaxpayerModal(this,"+JSON.stringify(res.taxPayerPropertyDetailsList[i])+");\'></i>");*/
						
						dataSet.push(dataArray);
					}
				
					//debugger;
					
					$('#taxPayerFolderDetailTable').DataTable().clear();
					$("#taxPayerFolderDetailTable").DataTable({
						"columnDefs": [
							{ "width": "10%", "targets": 0 }
						],
						data: dataSet,
						searching: false,
						paging: true,
						info: true,
						destroy: true,
						"autoWidth": false,
						ordering: false,
						columns: [
								{ title: "Folder ID" },
								{ title: "Date Created" },
								{ title: "Type" },
								{ title: "Sub Type" },
								{ title: "Amount Billed" },
								{ title: "Amount Paid" },
								{ title: "Amount Due" }
							]
					});
					
				}
			},
			error: function(xhr,res){
				if(xhr.statusText == "timeout"){
					alert("Server taking long time to respond!Please try Again","error");
	   				console.log("SLOW CONNECTIVITY DETECTED!Please try Again");
	   			}
				console.log(res);
				alert("Error Occured","error");
			}
		});
		
	});
	
	$(".openModal").click(function(){
		$("#myModal").modal();
	});
	
	$("#printReportBtn").click(function(){
		var peopleRSN 		= $("#propertyTab").attr("payerId");
		window.open(getContextPath()+"/generateReport?reportType=taxPayer&peopleRSN="+peopleRSN, "_blank");
	});
	
});

$('#dob').datetimepicker({
	format : 'DD-MM-YYYY'
});

$("#registrationDateSelect").change(function() {
	$('#registertedBetweenRange1').attr("disabled","disabled");
	$('#registertedBetweenRange2').attr("disabled","disabled");
	
	$('#registertedBetweenRange1').val("");
	$('#registertedBetweenRange2').val("");
	
	var currentDate = new Date();
	var currentDateInISO = currentDate.toISOString().split('T')[0];
	var currentDateInLocal = currentDate.toLocaleDateString('en-GB');

	var yesterDate = new Date(Date.now() - 864e5);
	var yesterDateInISO = yesterDate.toISOString().split('T')[0];
	var yesterDateInLocal = yesterDate.toLocaleDateString('en-GB');
	
	/*CALCULATION A CURRENT WEEK*/
	//var startDayWeekDate = new Date(Date.now() - 864e5*7);
	var startDayWeekDate = new Date().startOfWeek(0);
	var startDayWeekDateInLocal = startDayWeekDate.toLocaleDateString('en-GB');
	
	/*CALCULATION A CURRENT MONTH*/
	//var startDayMonthDate = new Date(Date.now() - 864e5*30);
	var startDayMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
	var startDayMonthDateInLocal = startDayMonthDate.toLocaleDateString('en-GB');
	
	if ($(this).val() == "custom") {
		$('#registertedBetweenRange1').removeAttr("disabled","disabled");
		$('#registertedBetweenRange2').removeAttr("disabled","disabled");
	}
	else if($(this).val() == "Today"){
		$('#registertedBetweenRange1').val(currentDateInLocal.replaceAll("/", "-"));
		$('#registertedBetweenRange2').val(currentDateInLocal.replaceAll("/", "-"));
	}else if($(this).val() == "Yesterday"){
		$('#registertedBetweenRange1').val(yesterDateInLocal.replaceAll("/", "-"));
		$('#registertedBetweenRange2').val(yesterDateInLocal.replaceAll("/", "-"));
	}else if($(this).val() == "ThisWeek"){
		$('#registertedBetweenRange1').val(startDayWeekDateInLocal.replaceAll("/", "-"));
		$('#registertedBetweenRange2').val(currentDateInLocal.replaceAll("/", "-"));
	}else if($(this).val() == "ThisMonth"){
		$('#registertedBetweenRange1').val(startDayMonthDateInLocal.replaceAll("/", "-"));
		$('#registertedBetweenRange2').val(currentDateInLocal.replaceAll("/", "-"));
	}
});

$(function () {
    $('#registertedBetweenRange1').datetimepicker({
    	format : 'DD-MM-YYYY'
    });
    $('#registertedBetweenRange2').datetimepicker({
        useCurrent: false,
        format : 'DD-MM-YYYY'
    });
    /*$("#datetimepicker1").on("dp.change", function (e) {
        $('#datetimepicker2').data("DateTimePicker").minDate(e.date);
    });
    $("#datetimepicker2").on("dp.change", function (e) {
        $('#datetimepicker1').data("DateTimePicker").maxDate(e.date);
    });*/
});



/*HELPER PROTPTYPE METHOD FOR GETTING REPLACEALL METHODS*/
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

/*HELPER PROTPTYPE METHOD FOR GETTING STARTDATE OF WEEK*/
Date.prototype.startOfWeek = function (pStartOfWeek) {
    var mDifference = this.getDay() - pStartOfWeek;

    if (mDifference < 0) {
        mDifference += 7;
    }

    return new Date(this.addDays(mDifference * -1));
}

Date.prototype.addDays = function (pDays) {
    var mDate = new Date(this.valueOf());
    mDate.setDate(mDate.getDate() + pDays);
    return mDate;
};

function openTaxpayerModal (thisObj,taxPayerObj){
	/*SETTING ALL DATA IN IMPORTANT DETAILS*/
	var importantDetailsContainerId = "importantDetailsContainer";
	
	$("#"+importantDetailsContainerId).find("#payerId").text(taxPayerObj["payerId"]);
	$("#"+importantDetailsContainerId).find("#payerName").text(taxPayerObj["firstName"]);
	$("#"+importantDetailsContainerId).find("#organization").text(taxPayerObj["orgName"]);
	$("#"+importantDetailsContainerId).find("#payerType").text(taxPayerObj["peopleCode"]);
	$("#"+importantDetailsContainerId).find("#phonenumber").text(taxPayerObj["phone"]);
	$("#"+importantDetailsContainerId).find("#email").text(taxPayerObj["emailAddress"]);
	$("#"+importantDetailsContainerId).find("#address").text(taxPayerObj["addressLine1"]);
	$("#"+importantDetailsContainerId).find("#dob").text(taxPayerObj["birthDate"]);
	$("#"+importantDetailsContainerId).find("#orin").text(taxPayerObj["orin"]);
	$("#"+importantDetailsContainerId).find("#tin").text(taxPayerObj["tin"]);
	$("#"+importantDetailsContainerId).find("#dateOfRegistration").text(taxPayerObj["regDate"]);
	
	$("#taxpayerTabPanelContainer").find("#propertyTab").attr("payerId",taxPayerObj["payerId"]);
	$("#taxpayerTabPanelContainer").find("#taxFoldersTab").attr("payerId",taxPayerObj["payerId"]);
	$("#taxpayerTabPanelContainer").find("#paymentHistoryTab").attr("payerId",taxPayerObj["payerId"]);
	
	var userDetailObj = getDataFromStorage("userDetail");
	if(userDetailObj != null && typeof(userDetailObj) !== "undefined"){
		lid 		= userDetailObj["lid"];
		userName 	= userDetailObj["userName"];
	}
	
	var peopleRSN 		= taxPayerObj["payerId"];
	
	var formObject = new Object();
	/*formObject["lid"] 		= lid;
	formObject["userName"] 	= userName;*/
	var formDataInJSON = JSON.stringify(formObject);
	
	var urlParams = "?lid="+lid+"&userName="+userName+"&peopleRSN="+peopleRSN;
	var url = getContextPath()+"/getDueAmount"+urlParams;
	
	$.ajax({
		url: url,
		type: "POST",
		dataType: "json",
		async:false,
		data:formDataInJSON,
		contentType:"application/json; charset=utf-8",
		/*timeout: 240000,*/
		success: function(res){
			/*SUCCESS HANDELER*/
			if(res.status == 0){
				$("#"+importantDetailsContainerId).find("#amountDue").text(res.due);
			}
		},
		error: function(xhr,res){
			if(xhr.statusText == "timeout"){
				alert("Server taking long time to respond!Please try Again","error");
   				console.log("SLOW CONNECTIVITY DETECTED!Please try Again");
   			}
			console.log(res);
			alert("Error Occured","error");
		}
	});	
	
	$("#myModal").modal();
}

function scrollWin(x, y) {
    window.scrollBy(x, y);
}