/**
 * 
 */
$(document).ready(function(){
	(function (){
		var title = '';

		var chart = c3.generate({
			bindto: '#propertyEnumerationStatisticsMutiLine',
			size: {
		        height: 270,
		        width: 1050
		    },
		    data: {
		    	x : 'x',
		    	columns: [
		        	['x', 'JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'],
		            ['2018', 30, 200, 100, 400, 12, 210,50, 220, 100, 400, 150, 250],
		            ['2017', 130, 130, 14, 200, 120, 30,60, 50, 130, 100, 450, 25],
		            ['2016', 120, 10, 150, 20, 15, 50,30, 200, 110, 20, 350, 23],
		            ['2015', 110, 17, 130, 130, 55, 53,33, 20, 140, 25, 50, 21]
		        ]
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
		                rotate: 0,
		                multiline: false
		            },
		            height: 0
		        }
		    }
		});
	})();
	
	(function (){
		var title = '';

		var chart = c3.generate({
			bindto: '#propertyRevenueStatisticsMutiLine',
			size: {
		        height: 270,
		        width: 1050
		    },
		    data: {
		    	x : 'x',
		    	columns: [
		        	['x', 'JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'],
		            ['2018', 30, 200, 100, 400, 12, 210,50, 220, 100, 400, 150, 250],
		            ['2017', 130, 130, 14, 200, 120, 30,60, 50, 130, 100, 450, 25],
		            ['2016', 120, 10, 150, 20, 15, 50,30, 200, 110, 20, 350, 23],
		            ['2015', 110, 17, 130, 130, 55, 53,33, 20, 140, 25, 50, 21]
		        ]
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
		                rotate: 0,
		                multiline: false
		            },
		            height: 0
		        }
		    }
		});
	})();
	
	
});

function manageGraph(thisObj) {
	if (thisObj.checked) {
	    console.log("THIS IS REVENUE SECTION");
	    $("#propertyEnumerationStatisticsMutiLineContainer").hide(1000);
	    $("#propertyRevenueStatisticsMutiLineContainer").show(1000);
	  }else{
		console.log("THIS IS COUNT SECTION");
		$("#propertyEnumerationStatisticsMutiLineContainer").show(1000);
		$("#propertyRevenueStatisticsMutiLineContainer").hide(1000);
	  }
	console.log(thisObj);
}

function propertyRevenueStatisticsTrend(){
        var title = '';

		var chart = c3.generate({
			bindto: '#propertyRevenueStatisticsTrend',
			size: {
		        height: 370,
		        width: 900
		    },
		    data: {
		    	x : 'x',
		    	columns: [
		        	['x', 'JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'],
		            ['2018', 30, 200, 100, 400, 12, 210,50, 220, 100, 400, 150, 250],
		            ['2017', 130, 130, 14, 200, 120, 30,60, 50, 130, 100, 450, 25],
		            ['2016', 120, 10, 150, 20, 15, 50,30, 200, 110, 20, 350, 23],
		            ['2015', 110, 17, 130, 130, 55, 53,33, 20, 140, 25, 50, 21]
		        ]
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
		                rotate: 0,
		                multiline: false
		            },
		            height: 0
		        }
		    }
		});
	}

	function leftPropertyDunot(){
              //var grpahHeight = 230;
			  // var grpahWidth = 205;
              
              var grpahHeight = 200;
			  var grpahWidth = 280;

			  var type = 'donut';
			  var title = '';

	          var chart = c3.generate({
						bindto: '#leftPropertyDunot',
						
						size: {
					        height: grpahHeight,
					        width: grpahWidth
					    },
						data: {
					        columns: [
					            ['Arreas', 20],
					            ['Collection', 30]
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
	      }  // quaterlyRevenueDunot()

function billedPropertyDunot(){
              //var grpahHeight = 230;
			  // var grpahWidth = 205;
              
              var grpahHeight = 200;
			  var grpahWidth = 280;

			  var type = 'donut';
			  var title = '';

	          var chart = c3.generate({
						bindto: '#billedPropertyDunot',
						
						size: {
					        height: grpahHeight,
					        width: grpahWidth
					    },
						data: {
					        columns: [
					            ['Arreas', 20],
					            ['Collection', 30]
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
	      }  // quaterlyRevenueDunot()


billedPropertyDunot();
leftPropertyDunot();
propertyRevenueStatisticsTrend();