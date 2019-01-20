function displayModal(){
var taxPayerModal = document.getElementById("tax-payer-modal");
var taxPayerBtn = document.querySelectorAll(".openModal");
var taxPayerBtnClose = document.getElementById('tax-payer-btnClose');

function showTaxPayerModal(taxPayerModalParam, taxPayerBtnParam, taxPayerBtnCloseParam){

taxPayerBtnParam.onclick = function (e) {
  taxPayerModalParam.style.display = "block";
  console.log(e.target.getAttribute("data"));
  const dataId = e.target.getAttribute("data");
  document.getElementById("dataId").innerHTML = "Id: " + dataId;
}

taxPayerBtnCloseParam.onclick = function () {
  taxPayerModalParam.style.display = "none";
}

// window.onclick = function (event) {
//   if (event.target == editModalParam) {
//     editModalParam.style.display = 'none';
//     console.log(event.target);
//   }
// }
}

taxPayerBtn.forEach(function (taxPayerBtn) {
  showTaxPayerModal(taxPayerModal, taxPayerBtn, taxPayerBtnClose);
  console.log("click")
});
}


/*GENERATING taxPayerRegistrationStatisticsMultiLine GRAPH*/
function displayTaxPayerChart(){
					var title = '';
					var chart = c3.generate({
						bindto: '#taxPayerRegistrationStatisticsMultiLine',
						size: {
					        height: 270,
					        width: 1050
					    },
					    data: {
					    	x : 'x',
					    	// columns: taxPayerRegistrationStatisticsMultiLineColumnArray
					    	columns: [
					        	['x', 'JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'],
					            ['2018', 30, 200, 100, 400, 12, 210,50, 220, 100, 400, 150, 250],
					            ['2017', 130, 130, 14, 200, 120, 30,60, 50, 130, 100, 450, 25],
					            ['2016', 120, 10, 150, 20, 15, 50,30, 200, 110, 20, 350, 23]
					        ]
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
		}  


function displayRevenueColl(){
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
				}
				

displayModal();
displayTaxPayerChart();
				