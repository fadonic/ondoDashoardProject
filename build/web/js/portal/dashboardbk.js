/**
 *dashboard.js 
 */
$(document).ready(function(){
	(function () {
		//debugger;
		showDashboard();
	})();
	
	/*FOR GETTING TAXPAYER COUNT*/
	
	var lid;
	var userName;
	
	//debugger;
	var userDetailObj = getDataFromStorage("userDetail");
	if(userDetailObj != null && typeof(userDetailObj) !== "undefined"){
		lid 		= userDetailObj["lid"];
		userName 	= userDetailObj["userName"];
	}
	
	(function () {
		var formObject = new Object();
    	formObject["lid"] 		= lid;
    	formObject["userName"] 	= userName;
    	
    	var formDataInJSON = JSON.stringify(formObject);
		var url = getContextPath()+"/getRevenueAndBudget";
		
		$.ajax({
			url: url,
			type: "POST",
			dataType: "json",
			async:true,
			data:formDataInJSON,
			contentType:"application/json; charset=utf-8",
			timeout: 240000,
			success: function(res){
				//debugger;
				/*SETTING TAX PAYER COUNT*/
				$("#dashboardContainer").find("#taxPayerCount").text(formatNumberAsCurrency(res.taxPayerCount));
				
				/*SETTING TOTAL BUDGET AND REVENUE COLLECTED*/
				$("#dashboardContainer").find("#totalBudger").text("N "+formatNumberAsCurrency(res.budget));
				$("#dashboardContainer").find("#totalRevenueCollected").text("N "+formatNumberAsCurrency(res.revenueCollected));
				
				/*DRAWING Quarterly Revenue Generated GRAPH*/
				/*SETTING CURRENT YEAR*/
				$("#dashboardContainer").find("#currentYear,#currentYear1,#currentYear2,#currentYear3,#currentYear4,#currentYear5").text(res.currentYear);
				
				/*CREATING DONUT FOR QR REVENUE GENERATED*/
				(function (){
					var type = 'donut';
					var title = '';

					/*GETTING DIMENTION DETAILS HERE*/
					//debugger;
					var screenSize = getScreenWidth();
					var graphDimenstionObj = getHeightAndWidthForGraph(screenSize);
					
					var grpahHeight = 250;
					var grpahWidth = 280;
					
					if(graphDimenstionObj["screenType"] == "laptop"){
						grpahHeight = 230;
						grpahWidth = 205;
					}
					
					var chart = c3.generate({
						bindto: '#quaterlyRevenueDunot',
						size: {
					        height: grpahHeight,
					        width: grpahWidth
					    },
						data: {
					        columns: [
					            ['1st QR', res.qtr1],
					            ['2nd QR', res.qtr2],
					            ['3rd QR', res.qtr3],
					            ['4th QR', res.qtr4],
					        ],
					        type : type
							/*json: [
							      {name: '1st QR', upload: 200},
							      {name: '2st QR', upload: 100},
							      {name: '3st QR', upload: 300},
							      {name: '4st QR', upload: 400}
							],
						    
							keys: {
						      // x: 'name', // it's possible to specify 'x' when category axis
						      value: ['upload']
						    },
						    type : type*/
							
					    },
					    donut: { title },
					    tooltip: {
				    	  format: {
				    	    value: function (value, ratio, id, index) { return "N "+formatNumberAsCurrency(value); }
				    	  }
					    }
					});
				})();
				
				/*CREATING PIE FOR QR REVENUE GENERATED STATICSTIC*/
				(function (){
					var type = 'pie';
					var title = '';

					var chart = c3.generate({
						bindto: '#revenueGenerationStatisticsPie',
						size: {
					        height: 250,
					        width: 280
					    },
						data: {
					        columns: [
					            ['Revenue Collected', res.revenueCollected],
					            ['Due', res.due],
					        ],
					        type : type
					    },
					    pie: { title },
					    tooltip: {
				    	  format: {
				    	    value: function (value, ratio, id, index) { return "N "+formatNumberAsCurrency(value); }
				    	  }
				    	}
					});
				})();
				
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
	
	(function () {
		var formObject = new Object();
    	formObject["lid"] 		= lid;
    	formObject["userName"] 	= userName;
    	
    	var formDataInJSON = JSON.stringify(formObject);
		var url = getContextPath()+"/getBudgetRevenueAnalysis";
		
		$.ajax({
			url: url,
			type: "POST",
			dataType: "json",
			async:true,
			data:formDataInJSON,
			contentType:"application/json; charset=utf-8",
			timeout: 240000,
			success: function(res){
				//debugger;
				var budgetRevenueAnalysisColumnArray 	= new Array();
				var top5MDAsColumnArray 				= new Array();
				
				var xAxisArray 				= new Array();
				var budgetArray 			= new Array();
				var actualArray 			= new Array();
				var revenueCollectedArray 	= new Array();
				var dueArray 				= new Array();
				
				xAxisArray.push("x");
				budgetArray.push("Budget(N)");
				actualArray.push("Actual(N)");
				revenueCollectedArray.push("Revenue Collected");
				dueArray.push("Due");
				//debugger;
				
				for(var i=0; i < res.budgetRevenueAnalysisList.length; i++){
					/*xAxisArray.push(res.budgetRevenueAnalysisList[i]["folderType"]);*/
					xAxisArray.push(res.budgetRevenueAnalysisList[i]["mda"]);
					budgetArray.push(res.budgetRevenueAnalysisList[i]["budget"]);
					actualArray.push(res.budgetRevenueAnalysisList[i]["revenueCollected"]);
					revenueCollectedArray.push(res.budgetRevenueAnalysisList[i]["revenueCollected"]);
					dueArray.push(res.budgetRevenueAnalysisList[i]["due"]);
				}
				
				/*CREATING VERTICAL BAR GROUP FOR Budget-Revenue Analysis*/
				(function (){
					var title = '';
					
					/*xAxisArray.push("MDA1");
					xAxisArray.push("MDA2");
					xAxisArray.push("MDA3");
					xAxisArray.push("MDA4");
					xAxisArray.push("MDA5");
					
					budgetArray.push(30);
					budgetArray.push(200);
					budgetArray.push(100);
					budgetArray.push(400);
					budgetArray.push(150);
					
					actualArray.push(130);
					actualArray.push(100);
					actualArray.push(140);
					actualArray.push(200);
					actualArray.push(150);*/

					budgetRevenueAnalysisColumnArray.push(xAxisArray);
					budgetRevenueAnalysisColumnArray.push(budgetArray);
					budgetRevenueAnalysisColumnArray.push(actualArray);
					
					//console.log(budgetRevenueAnalysisColumnArray);
					
					var chart = c3.generate({
						bindto: '#budgetRevenueAnalysisGroupBar',
						size: {
					        height: 550,
					        width: 1100
					    },
					    data: {
					    	x : 'x',
					    	/*columns: [
					        	['x', 'MDA1','MDA2','MDA3','MDA4','MDA5'],
					            ['Budget(N)', 30, 200, 100, 400, 150, 250],
					            ['Actual(N)', 130, 100, 140, 200, 150, 50]
					        ],*/
					    	columns:budgetRevenueAnalysisColumnArray,
					        type: 'bar'
					    },
					    grid: {
					        x: {
					            show: false
					        },
					        y: {
					            show: false
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
					                rotate: 75,
					                multiline: false,
					                format: function (d) { 
					                	var mdaName = this.api.categories()[d];
					                    if (mdaName.length > 30) {
					                    	mdaName = mdaName.slice(0,30)+"...";
					                    }
					                    
					                    return mdaName; 
					                }
					            },
					            height: 0
					        },
					        y: {
					            type: 'category',
					            tick: {
					                rotate: 0,
					                multiline: false,
					                format: function (d) { return "N " + formatNumberAsCurrency(d); }
					            },
					            height: 0
					        }
					    },
					    tooltip: {
				    	  format: {
				    	    value: function (value, ratio, id, index,d) { 
				    	    	//console.log(this);
				    	    	return value; 
				    	    }
				    	  }
						}
					});
				})();
				
				/*CREATING VERTICAL STACKED BAR FOR top 5 MDAs*/
				top5MDAsColumnArray.push(xAxisArray);
				top5MDAsColumnArray.push(revenueCollectedArray);
				top5MDAsColumnArray.push(dueArray);
				//console.log(top5MDAsColumnArray);
				
				(function (){
					var title = '';

					var chart = c3.generate({
						bindto: '#top5MDAsStackedBar',
						size: {
					        height: 240,
					        width: 500
					    },
					    data: {
					    	x : 'x',
					    	columns: top5MDAsColumnArray,
					        type: 'bar',
					        colors: {
					        	"Revenue Collected": '#66a2db',
					        	"Due": '#f57d2f',
					        },
					        groups: [
					            ['Revenue Collected', 'Due']
					        ]
					    },
					    grid: {
					        y: {
					            lines: [{value:0}],
					            show: false
					        }
					    },
					    axis: {
					        rotated: true,
					        x: {
					            type: 'category',
					            tick: {
					                rotate: 75,
					                multiline: false,
					                format: function (d) { 
					                	var mdaName1 = this.api.categories()[d];
					                	/*console.log(d);
					                	console.log(mdaName1);*/
					                	if(typeof(mdaName1) != "undefined"){
					                		if (mdaName1.length > 30) {
						                    	mdaName1 = mdaName1.slice(0,30)+"...";
						                    }
					                	}
					                    
					                    return mdaName1; 
					                }
					            },
					            height: 130
					        },
					        y: {
					            type: 'category',
					            tick: {
					                rotate: 75,
					                multiline: false,
					                format: function (d) { return "N " + formatNumberAsCurrency(d); }
					            },
					            height: 100
					        }
					    }
					});
				})();
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
	
	(function () {
		var formObject = new Object();
    	formObject["lid"] 		= lid;
    	formObject["userName"] 	= userName;
    	
    	var formDataInJSON = JSON.stringify(formObject);
		var url = getContextPath()+"/getPaymentModes";
		
		$.ajax({
			url: url,
			type: "POST",
			dataType: "json",
			async:true,
			data:formDataInJSON,
			contentType:"application/json; charset=utf-8",
			timeout: 240000,
			success: function(res){
				//debugger;
				/*UPDATING TRANSACTION TABLE DETAILS*/
				for(var i=0; i < res.paymentModeList.length; i++){
					$("#modalForPaymentTransaction").find("#PaymentTransactionsDetailsTable tbody").append("<tr><td>"+res.paymentModeList[i]["paymentMode"]+"</td><td>"+res.paymentModeList[i]["noOfTransaction"]+"</td><td>"+"N "+formatNumberAsCurrency(res.paymentModeList[i]["totalAmount"])+"</td>");
				}
				
				var popularPaymentModesColumnArray 	= new Array();
				
				var xAxisArray 					= new Array();
				var numberOfTransactionArray 	= new Array();
				
				xAxisArray.push("x");
				numberOfTransactionArray.push("No Of Transactions");
				//debugger;
				
				for(var i=0; i < res.paymentModeList.length; i++){
					xAxisArray.push(res.paymentModeList[i]["paymentMode"]);
					numberOfTransactionArray.push(res.paymentModeList[i]["noOfTransaction"]);
				}
				
				popularPaymentModesColumnArray.push(xAxisArray);
				popularPaymentModesColumnArray.push(numberOfTransactionArray);
				
				/*CREATING VERTICAL BAR FOR popular Payment Modes*/
				(function (){
					var title = '';

					var chart = c3.generate({
						bindto: '#popularPaymentModesBar',
						size: {
					        height: 240,
					        width: 350
					    },
					    data: {
					    	x : 'x',
					    	columns: popularPaymentModesColumnArray,
					        types: {
					        	"No Of Transactions": 'bar'
					        },
					        colors: {
					        	"No Of Transactions": '#ed7d31'
					        },
					    },
					    grid: {
					        x: {
					            show: false
					        },
					        y: {
					            show: false
					        }
					    },
					    axis: {
					        rotated: true,
					        x: {
					            type: 'category',
					            tick: {
					                rotate: 75,
					                multiline: false
					            },
					            height: 130,
					            show: true
					        },
					        y: {
					            type: 'category',
					            tick: {
					                rotate: 75,
					                multiline: false
					            },
					            height: 130,
					            show: true
					        }
					    }
					});
				})();
				
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
	
	(function () {
		var formObject = new Object();
    	formObject["lid"] 		= lid;
    	formObject["userName"] 	= userName;
    	
    	var formDataInJSON = JSON.stringify(formObject);
    	
    	var URLParam = "?year=2019";
		var url = getContextPath()+"/getRevenueCollectionTrend"+URLParam;
		
		$.ajax({
			url: url,
			type: "POST",
			dataType: "json",
			async:true,
			data:formDataInJSON,
			contentType:"application/json; charset=utf-8",
			timeout: 240000,
			success: function(res){
				//debugger;
				var revenueCollectionTrendColumnArray = new Array();
				
				var xAxisArray 				= new Array();
				var revenueCollectionArray 	= new Array();
				
				xAxisArray.push("x");
				revenueCollectionArray.push("RevenueCollections");
				//debugger;
				
				for(var i=0; i < res.revenueCollectionTrendList.length; i++){
					xAxisArray.push(res.revenueCollectionTrendList[i]["month"]+"-"+res.revenueCollectionTrendList[i]["year"]);
					revenueCollectionArray.push(res.revenueCollectionTrendList[i]["amountCollected"]);
				}
				
				revenueCollectionTrendColumnArray.push(xAxisArray);
				revenueCollectionTrendColumnArray.push(revenueCollectionArray);
				
				/*CREATING HOREGENTAAL BAR FOR REVENUE COLLECTION*/
				(function (){
					var title = '';

					var chart = c3.generate({
						bindto: '#revenueCollectionTrendBar',
						size: {
					        height: 320,
					        width: 1100
					    },
					    data: {
					    	x : 'x',
					    	columns:revenueCollectionTrendColumnArray,
					    	/*columns: [
					        	['x','NOV-2018','DEC-2018','JAN-2019','FEB-2019','MAR-2019','APR-2019','MAY-2019','JUN-2019','JUL-2019','AUG-2019','SEP-2019','OCT-2019'],
					            ['RevenueCollections', 30, 200, 100, 400, 150, 250,30, 200, 10, 400, 150, 250]
					        ],*/
					        types: {
					        	RevenueCollections: 'bar',
					        }
					    },
					    axis: {
					        rotated: false,
					        x: {
					            type: 'category',
					            tick: {
					                rotate: 75,
					                multiline: false
					                /*format: function (d) { return "N " + formatNumberAsCurrency(d); }*/
					            },
					            height: 0
					        },
					        y: {
					            type: 'category',
					            tick: {
					                multiline: false,
					                format: function (d) { return "N " + formatNumberAsCurrency(d); }
					            },
					            height: 0
					        }
					        
					    },
					    grid: {
					        x: {
					            show: false
					        },
					        y: {
					            show: false
					        }
					    }
					});
				})();
				
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
	
	(function () {
		var formObject = new Object();
    	formObject["lid"] 		= lid;
    	formObject["userName"] 	= userName;
    	
    	var formDataInJSON = JSON.stringify(formObject);
		var url = getContextPath()+"/getTop5Bank";
		
		$.ajax({
			url: url,
			type: "POST",
			dataType: "json",
			async:true,
			data:formDataInJSON,
			contentType:"application/json; charset=utf-8",
			timeout: 240000,
			success: function(res){
				//debugger;
				var getTop5BankColumnArray 	= new Array();
				
				var xAxisArray 				= new Array();
				var amountCollectedArray 	= new Array();
				
				xAxisArray.push("x");
				amountCollectedArray.push("Collections");
				//debugger;
				
				for(var i=0; i < res.bankList.length; i++){
					xAxisArray.push(res.bankList[i]["bankName"]);
					amountCollectedArray.push(res.bankList[i]["amountCollected"]);
				}
				
				getTop5BankColumnArray.push(xAxisArray);
				getTop5BankColumnArray.push(amountCollectedArray);
				
				/*CREATING VERTICAL BAR FOR topBanks 5*/
				(function (){
					var title = '';

					var chart = c3.generate({
						bindto: '#topBankHoregentalBar',
						size: {
					        height: 240,
					        width: 500
					    },
					    data: {
					    	x : 'x',
					    	columns:getTop5BankColumnArray,
					    	/*columns: [
					        	['x', 'BANK1','BANK2','BANK3','BANK4','BANK5'],
					            ['Collections', 30, 200, 100, 400, 150]
					        ],*/
					        types: {
					        	Collections: 'bar',
					        },
					        colors: {
					        	"Collections": '#6caf3f'
					        },
					    },
					    grid: {
					        x: {
					            show: false
					        },
					        y: {
					            show: false
					        }
					    },
					    axis: {
					        rotated: true,
					        x: {
					            type: 'category',
					            tick: {
					                rotate: 75,
					                multiline: false
					            },
					            height: 130
					        },
					        y: {
					            type: 'category',
					            tick: {
					                rotate: 75,
					                multiline: false,
					                format: function (d) { return "N " + formatNumberAsCurrency(d); }
					            },
					            height: 130
					        }
					    }
					});
				})();
				
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
	
	/*FOR TAX PAYER COUNT*/
	(function (){
		
	})();
	
	$("#searchBRAnalysisByYearBtn").on("click",function() {
		//alert("This is a test");
		var $searchBRAnalysisByYearBtn = $("#searchBRAnalysisByYearBtn");
		var $searchBRAnalysisYearInput = $("#searchBRAnalysisYearInput");
		
		var searchBRAnalysisYearInputVal = $("#searchBRAnalysisYearInput").val();
		
		/*CHEACKING A VALUE OF YEAR*/
		if(searchBRAnalysisYearInputVal == "" || searchBRAnalysisYearInputVal == null || typeof (searchBRAnalysisYearInputVal) == "undefined"){
			alert("Please select an Year.","error");
			return;
		}
		
		/*CALLING WEB SERVICE FOR GRAPH DATA*/

		var formObject = new Object();
    	formObject["lid"] 		= lid;
    	formObject["userName"] 	= userName;
    	
    	var formDataInJSON = JSON.stringify(formObject);
		var URLParam = "?year="+searchBRAnalysisYearInputVal;

		//var url = getContextPath()+"/getBudgetRevenueAnalysis";
		var url = getContextPath()+"/getBudgetRevenueAnalysisByYear"+URLParam;
		
		$.ajax({
			url: url,
			type: "POST",
			dataType: "json",
			async:true,
			data:formDataInJSON,
			contentType:"application/json; charset=utf-8",
			timeout: 240000,
			success: function(res){
				//debugger;
				var budgetRevenueAnalysisColumnArray 	= new Array();
				var top5MDAsColumnArray 				= new Array();
				
				var xAxisArray 				= new Array();
				var budgetArray 			= new Array();
				var actualArray 			= new Array();
				var revenueCollectedArray 	= new Array();
				var dueArray 				= new Array();
				
				xAxisArray.push("x");
				budgetArray.push("Budget(N)");
				actualArray.push("Actual(N)");
				revenueCollectedArray.push("Revenue Collected");
				dueArray.push("Due");
				//debugger;
				
				for(var i=0; i < res.budgetRevenueAnalysisList.length; i++){
					/*xAxisArray.push(res.budgetRevenueAnalysisList[i]["folderType"]);*/
					xAxisArray.push(res.budgetRevenueAnalysisList[i]["mda"]);
					budgetArray.push(res.budgetRevenueAnalysisList[i]["budget"]);
					actualArray.push(res.budgetRevenueAnalysisList[i]["revenueCollected"]);
					revenueCollectedArray.push(res.budgetRevenueAnalysisList[i]["revenueCollected"]);
					dueArray.push(res.budgetRevenueAnalysisList[i]["due"]);
				}
				
				/*SETTING SELECTED YEAR IN HEADER*/
				$("#currentYear4").text(searchBRAnalysisYearInputVal);
				
				
				/*CREATING VERTICAL BAR GROUP FOR Budget-Revenue Analysis*/
				(function (){
					var title = '';
					
					/*xAxisArray.push("MDA1");
					xAxisArray.push("MDA2");
					xAxisArray.push("MDA3");
					xAxisArray.push("MDA4");
					xAxisArray.push("MDA5");
					
					budgetArray.push(30);
					budgetArray.push(200);
					budgetArray.push(100);
					budgetArray.push(400);
					budgetArray.push(150);
					
					actualArray.push(130);
					actualArray.push(100);
					actualArray.push(140);
					actualArray.push(200);
					actualArray.push(150);*/

					budgetRevenueAnalysisColumnArray.push(xAxisArray);
					budgetRevenueAnalysisColumnArray.push(budgetArray);
					budgetRevenueAnalysisColumnArray.push(actualArray);
					
					//console.log(budgetRevenueAnalysisColumnArray);
					
					var chart = c3.generate({
						bindto: '#budgetRevenueAnalysisGroupBar',
						size: {
					        height: 550,
					        width: 1100
					    },
					    data: {
					    	x : 'x',
					    	/*columns: [
					        	['x', 'MDA1','MDA2','MDA3','MDA4','MDA5'],
					            ['Budget(N)', 30, 200, 100, 400, 150, 250],
					            ['Actual(N)', 130, 100, 140, 200, 150, 50]
					        ],*/
					    	columns:budgetRevenueAnalysisColumnArray,
					        type: 'bar'
					    },
					    grid: {
					        x: {
					            show: false
					        },
					        y: {
					            show: false
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
					                rotate: 75,
					                multiline: false,
					                format: function (d) { 
					                	var mdaName = this.api.categories()[d];
					                    if (mdaName.length > 30) {
					                    	mdaName = mdaName.slice(0,30)+"...";
					                    }
					                    
					                    return mdaName; 
					                }
					            },
					            height: 0
					        },
					        y: {
					            type: 'category',
					            tick: {
					                rotate: 0,
					                multiline: false,
					                format: function (d) { return "N " + formatNumberAsCurrency(d); }
					            },
					            height: 0
					        }
					    },
					    tooltip: {
				    	  format: {
				    	    value: function (value, ratio, id, index,d) { 
				    	    	//console.log(this);
				    	    	return value; 
				    	    }
				    	  }
						}
					});
				})();
				
				/*CREATING VERTICAL STACKED BAR FOR top 5 MDAs*/
				top5MDAsColumnArray.push(xAxisArray);
				top5MDAsColumnArray.push(revenueCollectedArray);
				top5MDAsColumnArray.push(dueArray);
				//console.log(top5MDAsColumnArray);
				
				
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
	
	$("#searchRevenueCollectionTrendByYearBtn").on("click",function() {
		alert("This is a test");
		var $searchRevenueCollectionTrendByYearBtn 	= $("#searchRevenueCollectionTrendByYearBtn");
		var $revenueCollectionTrendYearInput 		= $("#revenueCollectionTrendYearInput");
		
		var revenueCollectionTrendYearInputVal = $("#revenueCollectionTrendYearInput").val();
		
		/*CHEACKING A VALUE OF YEAR*/
		if(revenueCollectionTrendYearInputVal == "" || revenueCollectionTrendYearInputVal == null || typeof (revenueCollectionTrendYearInputVal) == "undefined"){
			alert("Please select an Year.","error");
			return;
		}
		
		/*CALLING API AND CREATING GRAPH*/
		var formObject = new Object();
    	formObject["lid"] 		= lid;
    	formObject["userName"] 	= userName;
    	
    	var formDataInJSON = JSON.stringify(formObject);
    	
    	var URLParam = "?year="+revenueCollectionTrendYearInputVal;
		var url = getContextPath()+"/getRevenueCollectionTrend"+URLParam;
		
		$.ajax({
			url: url,
			type: "POST",
			dataType: "json",
			async:true,
			data:formDataInJSON,
			contentType:"application/json; charset=utf-8",
			timeout: 240000,
			success: function(res){
				//debugger;
				var revenueCollectionTrendColumnArray = new Array();
				
				var xAxisArray 				= new Array();
				var revenueCollectionArray 	= new Array();
				
				xAxisArray.push("x");
				revenueCollectionArray.push("RevenueCollections");
				//debugger;
				
				for(var i=0; i < res.revenueCollectionTrendList.length; i++){
					xAxisArray.push(res.revenueCollectionTrendList[i]["month"]+"-"+res.revenueCollectionTrendList[i]["year"]);
					revenueCollectionArray.push(res.revenueCollectionTrendList[i]["amountCollected"]);
				}
				
				revenueCollectionTrendColumnArray.push(xAxisArray);
				revenueCollectionTrendColumnArray.push(revenueCollectionArray);
				
				/*CREATING HOREGENTAAL BAR FOR REVENUE COLLECTION*/
				(function (){
					var title = '';

					var chart = c3.generate({
						bindto: '#revenueCollectionTrendBar',
						size: {
					        height: 320,
					        width: 1100
					    },
					    data: {
					    	x : 'x',
					    	columns:revenueCollectionTrendColumnArray,
					    	/*columns: [
					        	['x','NOV-2018','DEC-2018','JAN-2019','FEB-2019','MAR-2019','APR-2019','MAY-2019','JUN-2019','JUL-2019','AUG-2019','SEP-2019','OCT-2019'],
					            ['RevenueCollections', 30, 200, 100, 400, 150, 250,30, 200, 10, 400, 150, 250]
					        ],*/
					        types: {
					        	RevenueCollections: 'bar',
					        }
					    },
					    axis: {
					        rotated: false,
					        x: {
					            type: 'category',
					            tick: {
					                rotate: 75,
					                multiline: false
					                /*format: function (d) { return "N " + formatNumberAsCurrency(d); }*/
					            },
					            height: 0
					        },
					        y: {
					            type: 'category',
					            tick: {
					                multiline: false,
					                format: function (d) { return "N " + formatNumberAsCurrency(d); }
					            },
					            height: 0
					        }
					        
					    },
					    grid: {
					        x: {
					            show: false
					        },
					        y: {
					            show: false
					        }
					    }
					});
				})();
				
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
});

function showDashboard(){
	setTimeout(function(){ 
		$("#userDetailsContainer").hide(2000);
		$("#dashboardContainer").show(2000); 
	}, 2000);
}

function getDimentionsByID(divID){
	var elmnt = document.getElementById(divID);
	var height = elmnt.offsetHeight;
	var width = elmnt.offsetHeight;
	
	var dimensionDetailsObj = new Object();
	dimensionDetailsObj["height"] = height;
	dimensionDetailsObj["width"] = width;
	
	return dimensionDetailsObj;
}

function getScreenWidth(){
	var screenWidth = screen.width;
	
	return screenWidth;
}

function getHeightAndWidthForGraph(screenSize){
	var screenType;
	var graphHeight;
	var graphWidth;
	
	var graphDimenstionObj = new Object();
	
	if(screenSize <= 1440 && screenSize > 1024){
		screenType = "laptopLarge";
	}else if(screenSize <= 1024 && screenSize > 768){
		screenType = "laptop";
	}else if(screenSize <= 768 && screenSize > 425){
		screenType = "tablet";
	}else if(screenSize <= 425 && screenSize > 320){
		screenType = "phone";
	}else{
		screenType = "";
	};
	
	switch (screenType) {
	    case "laptopLarge":
	    	graphHeight = 100;
	    	graphWidth = 100;
	        break; 
	    case "laptop":
	    	graphHeight = 100;
	    	graphWidth = 100;
	        break;
	    case "tablet":
	    	graphHeight = 100;
	    	graphWidth = 100;
	        break;
	    case "phone":
	    	graphHeight = 100;
	    	graphWidth = 100;
	        break;
	    default: 
	    	graphHeight = 100;
	    	graphWidth = 100;
	}
	
	graphDimenstionObj["screenType"] = screenType;
	graphDimenstionObj["graphHeight"] = graphHeight;
	graphDimenstionObj["graphWidth"] = graphWidth;
	
	return graphDimenstionObj;
}

