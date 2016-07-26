$(function () {
    var url = window.location.href.split('?')[1].split('&');

    $.ajax({
        'url' : window.location.protocol+'//'+window.location.hostname+'/api/reportcalc/'+url[0].split('=')[1] +'?customerId=' + url[1].split('=')[1],
      //'url' : 'https://credito.igniteoutsourcing.com/api/reportcalc/'+url[0].split('=')[1] +'?customerId=' + url[1].split('=')[1], //for local edit
        method: "GET",
        headers: {
            "Authorization":"Bearer " + base64_decode(url[2].split('=')[1])
        },
        success: function(data) {
            //Graph answers
            var xAxis = [];
            var yAxis = [];
            $.each(data.loanData.graphAnswers, function(item){
                xAxis.push(data.loanData.graphAnswers[item].loanSize);
                yAxis.push(data.loanData.graphAnswers[item].interest);
            });

            $('#container').highcharts({
                credits: {
                  enabled: false
                },
                title: {
                    text: 'Report Graph',
                    x: -20
                },
                xAxis: {
                  labels: {
                    formatter:function() {
                      return Highcharts.numberFormat(this.value, 0, '', ',');
                    }
                  },
                  categories: xAxis
                },
                plotOptions: {
                    line: {
                        animation: false
                    }
                },
                yAxis: {
                  title: {
                      text: 'Interest'
                  },
                  valueSuffix: '',
                  plotLines: [{
                      value: 0,
                      width: 1,
                      color: '#808080'
                  }]
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                    name: 'val',
                    data: yAxis
                }]
            });

            var chartTable = $('.chart-table');
            var tableAnswerts = '';
            $.each(data.loanData.tableAnswers, function(item){
                tableAnswerts += '<tr>';
                tableAnswerts += '<td class="active">' + data.loanData.tableAnswers[item].interest  + '</td>';
                tableAnswerts += '<td class="success">' + data.loanData.tableAnswers[item].ltv  + '</td>';
                tableAnswerts += '<td class="info">' + addCommasToInteger(data.loanData.tableAnswers[item].loanSize)  + '</td>';
                tableAnswerts += '</tr>';
            });
            $(tableAnswerts).appendTo(chartTable);

            $.each(data.customerData, function(item){
                if(data.customerData[item].name == 'FamilyIncome'){
                    $('#netFamilyIncome').text(addCommasToInteger(data.customerData[item].values[0].value));
                }
            });

            $('#originalLTV').text(data.reportData.ltvData.originalLTVRate);
            $('#weightedLTV').text(data.reportData.ltvData.weightedLTVRate);
            $('#weightedFamilyYearlyIncomeRate').text(addCommasToInteger(data.reportData.ltvData.yearlyFamilyIncomeWeghted));
            $('#lounSum').text(addCommasToInteger(data.investorData.loanSize));
            $('#lounLength').text(data.investorData.loanLengthInMonths);
            $('#lounType').text(i18n['SELECT_OPTIONS'][data.investorData.loanTypeStringValue]);
            $('#theoreticalSpitzerPayment').text(addCommasToInteger(data.reportData.shpitzerMonthlyPayment));

            //must be rounded
            $('#reduceRateNetIncome').text(data.reportData.ltvData.incomeDecreasing.toFixed(1));
            $('#weightedDebtToYearlyIncomeRate').text(data.reportData.ltvData.yearlyLTVWeighted);
            $('#debtToYearlyIncomeRate').text(data.reportData.ltvData.yearlyLTV);

            $('#interest').text(data.loanData.interesetPayment + '%');
        },
        error: function(e) {
            console.log('errors', e);
        },
		async:false
    });
});

var addCommasToInteger = function(value) {
  return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

function base64_decode(c){0<=c.indexOf("=")&&(c=c.substr(0,c.indexOf("=")));for(var k=0,d=0,b,l,e,g,f=0,a,h,m="";k<c.length;++k){l="="==c.charAt(k)?0:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(c.charAt(k));d=(d+6)%8;if(6!=d){b+=l>>d;if(0==f)g=!0,h=0,e=1,128>b&&(e=0,h=b&64,g=!1);else if(128!=(b&192))return!1;for(a=32;g&&0<a;a>>=1)b&a?++e:g=!1;g||(a=6+6*f-e,6<a&&(a=6),a&&(h+=b%(1<<a)<<6*(e-f)));f==e?(m+=String.fromCharCode(h),f=0):++f}b=d?l%(1<<d)<<8-d:0}return m}


















