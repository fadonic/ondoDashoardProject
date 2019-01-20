function displayStatisticsModal(){
var statisticsModal = document.getElementById("statistics-modal");
var statisticsBtn = document.querySelectorAll(".openModal");
var statisticsBtnClose = document.getElementById('statistics-btnClose');

function showstatisticsModal(statisticsModalParam, statisticsBtnParam, statisticsBtnCloseParam){

statisticsBtnParam.onclick = function (e) {
  statisticsModalParam.style.display = "block";
  console.log(e.target.getAttribute("data"));
  const dataId = e.target.getAttribute("data");
  document.getElementById("dataId").innerHTML = "Id: " + dataId;
}
statisticsBtnCloseParam.onclick = function () {
  statisticsModalParam.style.display = "none";
}

}

statisticsBtn.forEach(function (statisticsBtn) {
  showstatisticsModal(statisticsModal, statisticsBtn, statisticsBtnClose);
  console.log("click")
});
}


/*GENERATING statisticsRegistrationStatisticsMultiLine GRAPH*/

function budgetRevenueAnalysisGroupBar(){
             var chart = c3.generate({
						bindto: '#budgetRevenueAnalysisGroupBar',
						size: {
					        height: 350,
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


function totalRevenueDunot(){
              //var grpahHeight = 230;
			  // var grpahWidth = 205;
              
              // var grpahHeight = 200;
			  var grpahWidth = 280;

			  var type = 'donut';
			  var title = '';

	          var chart = c3.generate({
						bindto: '#totalRevenueDunot',
						
						size: {
					        // height: grpahHeight,
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

function filteredSummaryDunot(){
              //var grpahHeight = 230;
			  // var grpahWidth = 205;
              
              // var grpahHeight = 200;
			  var grpahWidth = 280;

			  var type = 'donut';
			  var title = '';

	          var chart = c3.generate({
						bindto: '#filteredRevenueDunot',
						
						size: {
					        // height: grpahHeight,
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


filteredSummaryDunot();
totalRevenueDunot();
displayStatisticsModal();
budgetRevenueAnalysisGroupBar();

				