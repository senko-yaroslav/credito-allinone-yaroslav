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
            $.each(data.customerData, function(i) {
                if(typeof data.customerData[i].optionAttributeValues == 'undefined' && typeof data.customerData[i].values != 'undefined' ) {
                  $('#' + data.customerData[i].name).text(data.customerData[i].values[0].value);
                } else if(typeof data.customerData[i].optionAttributeValues != 'undefined' && typeof data.customerData[i].values != 'undefined') {
                    var selected = parseInt(data.customerData[i].values[0].value);
                    $.each(data.customerData[i].optionAttributeValues, function(j){
                        if(data.customerData[i].optionAttributeValues[j].optionAttributeValueID === selected) {
                            $('#' + data.customerData[i].name).text(i18n['SELECT_OPTIONS'][data.customerData[i].optionAttributeValues[j].value]);
                        }
                    });
                }

              //Для всяких костылей, типа переформатирования даты
              switch (data.customerData[i].name) {
                case 'BirthDate': {
                  var tmpArray = data.customerData[i].values[0].value.split('-');
                  $('#' + data.customerData[i].name).text(tmpArray[2] + '-' + tmpArray[1] + '-' + tmpArray[0]);
                }
                  break;
              }
            });

            $('#decreaseRate').text(data.reportData.fundData.decreaseRate);
            $('#weightedFund').text(addCommasToInteger(data.reportData.fundData.weightedFund));
            $('#percentFreeFund').text(data.reportData.fundData.percentFreeFund);
            $('#freeFund').text(addCommasToInteger(data.reportData.fundData.freeFund));
            $('#safe').text(addCommasToInteger(data.investorData.securitySize));
            $('#InvestmentChannel').text(i18n['SELECT_OPTIONS'][data.investorData.fundCategoryStringValue]);

          setTimeout(function(){
            $('#PersonalIncome').text(addCommasToInteger($('#PersonalIncome').text()));
            $('#FamilyIncome').text(addCommasToInteger($('#FamilyIncome').text()));
            $('#PhoneNumber').text(phoneMask($('#PhoneNumber').text()));
          }, 0);
        },
        error: function(e) {
            console.log('errors', e);
        },
		async:false
    })
});

var addCommasToInteger = function(value) {
  return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};
var phoneMask = function(value) {
  return value.slice(0, 3) + '-' + value.slice(3, 10);
};

function base64_decode(c){0<=c.indexOf("=")&&(c=c.substr(0,c.indexOf("=")));for(var k=0,d=0,b,l,e,g,f=0,a,h,m="";k<c.length;++k){l="="==c.charAt(k)?0:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(c.charAt(k));d=(d+6)%8;if(6!=d){b+=l>>d;if(0==f)g=!0,h=0,e=1,128>b&&(e=0,h=b&64,g=!1);else if(128!=(b&192))return!1;for(a=32;g&&0<a;a>>=1)b&a?++e:g=!1;g||(a=6+6*f-e,6<a&&(a=6),a&&(h+=b%(1<<a)<<6*(e-f)));f==e?(m+=String.fromCharCode(h),f=0):++f}b=d?l%(1<<d)<<8-d:0}return m}
