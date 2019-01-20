/**
 *dashboard.js 
 */

function getTaxPayerCount(){

                  /*AJAX FOR GETTING TAXPAYER COUNT*/
                    var responseData;
				    var url = "https://jsonplaceholder.typicode.com/todos/1";
				    var xhr = new XMLHttpRequest();
				    xhr.open("GET", url, true);
				    
				    xhr.onload = function(){
				    	if(this.status === 200){
				    		responseData = JSON.parse(this.responseText);

                            var taxPayerCount = document.getElementById("taxPayerCount");
				            console.log(responseData.userId);

				    	}
				    }
				    xhr.send();
				    /*END AJAX FOR GETTING TAXPAYER COUNT*/				    
}


function getTotalBudgetAndTotalRevenueCollected(){

                    var responseData;
				    var url = "js/portal/test.txt";
				    var xhr = new XMLHttpRequest();
				    xhr.open("GET", url, true);
				    
				    xhr.onload = function(){
				    	if(this.status === 200){
				    		responseData = this.responseText;
                            var totalBudget = document.getElementById("totalBudget");
                            var totalRevenueCollected = document.getElementById("totalRevenueCollected");
				            //console.log(totalBudget);
				            //console.log(totalRevenueCollected);

				    	}
				    }
				    xhr.send();
   

}


function revenueGenerationStatisticsPie(){
                    

                    var url = "js/portal/test.txt";
				    var xhr = new XMLHttpRequest();
				    xhr.open("GET", url, true);
				    
				    xhr.onload = function(){
				    	if(this.status === 200){
				    		var responseData = this.responseText;
				    		//console.log("This pie " + responseData);
				    	

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
							            ['Revenue Collected', 70],
							            ['Due', 30],
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
				}
			}
		   
		   xhr.send();

		} // Closed revenueGenerationStatisticsPie() 

               
function quaterlyRevenueDunot(){
             //var grpahHeight = 230;
			  // var grpahWidth = 205;
              
              var grpahHeight = 250;
			  var grpahWidth = 280;

			  var type = 'donut';
			  var title = '';

	          var chart = c3.generate({
						bindto: '#quaterlyRevenueDunot',
						
						size: {
					        height: grpahHeight,
					        width: grpahWidth
					    },
						data: {
					        columns: [
					            ['1st QR', 20],
					            ['2nd QR', 30],
					            ['3rd QR', 40],
					            ['4th QR', 10],
					        ],
					        type : type
							
					    },
					    donut: { title },
					    tooltip: {
				    	  format: {
				    	    value: function (value, ratio, id, index) { return "N "+formatNumberAsCurrency(value); }
				    	  }
					    }
					});
	      }


     function topBankHoregentalBar(){
                var title = '';

					var chart = c3.generate({
						bindto: '#topBankHoregentalBar',
						size: {
					        height: 240,
					        width: 500
					    },
					    data: {
					    	x : 'x',
					    	// columns:getTop5BankColumnArray,
					    	columns: [
					        	['x', 'BANK1','BANK2','BANK3','BANK4','BANK5'],
					            ['Collections', 30, 200, 100, 400, 150]
					        ],
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

					   })
				} // closed displayTopFiveBanks()

            
function budgetRevenueAnalysisGroupBar(){
             var chart = c3.generate({
						bindto: '#budgetRevenueAnalysisGroupBar',
						size: {
					        height: 550,
					        width: 1100
					    },
					    data: {
					    	x : 'x',
					    	columns: [
					        	['x', 'MDA1','MDA2','MDA3','MDA4','MDA5'],
					            ['Budget(N)', 30, 200, 100, 400, 150, 250],
					            ['Actual(N)', 130, 100, 140, 200, 150, 50]
					        ],
					    	//columns:budgetRevenueAnalysisColumnArray,
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
         } // closed displayBudgetRevBar()

    function revenueCollectionTrendBar(){                
                    var title = '';

					var chart = c3.generate({
						bindto: '#revenueCollectionTrendBar',
						size: {
					        height: 320,
					        width: 1100
					    },
					    data: {
					    	x : 'x',
					    	//columns:revenueCollectionTrendColumnArray,
					    	columns: [
					        	['x','NOV-2018','DEC-2018','JAN-2019','FEB-2019','MAR-2019','APR-2019','MAY-2019','JUN-2019','JUL-2019','AUG-2019','SEP-2019','OCT-2019'],
					            ['RevenueCollections', 30, 200, 100, 400, 150, 250,30, 200, 10, 400, 150, 250]
					        ],
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

				} //closed revenueCollectionTrendBar()

function top5MDAsStackedBar(){
                    var title = '';

					var chart = c3.generate({
						bindto: '#top5MDAsStackedBar',
						size: {
					        height: 240,
					        width: 500
					    },
					    data: {
					    	x : 'x',
					    	//columns: top5MDAsColumnArray,
					    	columns: [
					        	['x', 'MDA1','MDA2','MDA3','MDA4','MDA5'],
					            ['Revenue Collected', 30, 200, 100, 400, 150, 250],
					            ['Due', 130, 100, 140, 200, 150, 50]
					        ],

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

					    bar: {
					        width: {
					            ratio: 0.5 // this makes bar width 50% of length between ticks
					        }
					        // or
					        //width: 100 // this makes bar width 100px
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

				}// Closed top5MDAsStackedBar()

 function popularPaymentModesBar(){
                   var title = '';

					var chart = c3.generate({
						bindto: '#popularPaymentModesBar',
						size: {
					        height: 240,
					        width: 350
					    },
					    data: {
					    	x : 'x',
					    	// columns: popularPaymentModesColumnArray,

					    	columns:[
					    	    ['x', 'Debit','OwnC','Trans','Cash'],
					            ['No Of Transactions', 30, 200, 100, 400]
					    	],
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
				}

 getTaxPayerCount();
 popularPaymentModesBar();
 quaterlyRevenueDunot();			
 revenueGenerationStatisticsPie();
 revenueCollectionTrendBar();
 topBankHoregentalBar(); 
 budgetRevenueAnalysisGroupBar();
 top5MDAsStackedBar();







				