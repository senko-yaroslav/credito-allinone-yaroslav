var creditoDirectives = angular.module('creditoDirectives', []);

creditoDirectives.directive('ckEditor', [function () {
    return {
        require: '?ngModel',
        link: function ($scope, elm, attr, ngModel) {
            var ck = CKEDITOR.replace(elm[0]);

            ck.on('pasteState', function () {
                $scope.$apply(function () {
                    ngModel.$setViewValue(ck.getData());
                });
            });

            ngModel.$render = function (value) {
                ck.setData(ngModel.$modelValue);
            };
        }
    };
}]);

creditoDirectives.directive('adminNavMenu', function () {
    return {
        restrict: 'EA',
        templateUrl:'templates/pages/admin/nav-menu.html'
    };
});

creditoDirectives.directive('datePickerCollateral', [function() {
    return {
        restrict: 'EA',
        link: function(scope, element, attrs, ctrl) {
            scope.$watch(element, function() {
                setTimeout(function() {
                    $('.datepickerCollateral').datepicker({
                        format: "dd-mm-yyyy",
                        todayBtn:true,
                        minViewMode: 1,
                        keyboardNavigation: false,
                        daysOfWeekDisabled: "0,1,2,3,4,5,6",
                        daysOfWeekHighlighted: "0,1,2,3,4,5,6",
                        calendarWeeks: true,
                        autoclose: true,
                        language: "he",
                        datesDisabled: ['02/06/2016', '02/21/2016']
                    }).on("show", function(e){
                        $('.datepicker tfoot th.today').hide();
                        if ($('.datepicker tfoot th.custom').length == 0){
                            $('.datepicker tfoot').append('<tr><th colspan="4" class="custom expired">נזילה</th><th colspan="4" class="custom not-expired">לא תהיה נזילה</th></tr>');
                        }

                        $('.datepicker tfoot th').on('click',function(){
                            var $th = $(this);
                            var d = new Date();
                            var date;

                            if ($th.hasClass('not-expired')) {
                                d.setMonth(d.getMonth() + 200);
                                date =  ((d.getDate()<10)?  '0'+d.getDate() : d.getDate() ) + '-' + ((d.getMonth()<9)?  '0'+(d.getMonth()+1) : d.getMonth()+1  ) + "-" + d.getFullYear();
                            } else if($th.hasClass('expired')) {
                                date = d.toDateString();
                            }

                            $(e.currentTarget).val(date).datepicker('setDate', date);
                            $('.datepicker').remove();
                        });
                    });
                }, 1500);
            });
        }
    }
}]);

creditoDirectives.directive('onKeyup', function() {
    return function(scope, elm, attrs) {
        var allowedKeys = scope.$eval(attrs.keys);
        elm.bind('keydown', function(evt) {
            angular.forEach(allowedKeys, function(key) {
                if (key == evt.which) {
                    evt.preventDefault(); // Doesn't work at all
                    window.stop(); // Works in all browsers but IE
                    document.execCommand("Stop"); // Works in IE
                    return false; // Don't even know why it's here. Does nothing.
                }
            });
        });
    };
});

creditoDirectives.directive('checkChanges', ['$timeout',function($timeout) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {

            scope.$watch(attrs.ngModel, function (v) {
                if(ctrl.$dirty){
                    if(scope.borrowerModel.userDetails){
                        if(scope.borrowerModel.userDetails[ctrl.$name]){
                            scope.borrowerModel.userDetails[ctrl.$name].isChanged = true;
                        }
                    }
                    if(scope.borrowerModel.spouseDetails){
                        if(scope.borrowerModel.spouseDetails[ctrl.$name]){
                            scope.borrowerModel.spouseDetails[ctrl.$name].isChanged = true;
                        }
                    }
                    if(scope.borrowerModel.commonDetails){
                        if(scope.borrowerModel.commonDetails[ctrl.$name]){
                            scope.borrowerModel.commonDetails[ctrl.$name].isChanged = true;
                        }
                    }
                    if(scope.borrowerModel.loanDetails){
                        if(scope.borrowerModel.loanDetails[ctrl.$name]){
                            scope.borrowerModel.loanDetails[ctrl.$name].isChanged = true;
                        }
                    }
                    if(scope.borrowerModel.bankAccount){
                        if(scope.borrowerModel.bankAccount[ctrl.$name]){
                            scope.borrowerModel.bankAccount[ctrl.$name].isChanged = true;
                        }
                    }
                }
            }, true);
        }
    }
}]);

creditoDirectives.directive('cloneModel', ['$timeout',function($timeout) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            $timeout(function() {
                if(scope.borrowerModel.userDetails && scope.borrowerModel.spouseDetails){
                    if(scope.borrowerModel.userDetails[ctrl.$name] && scope.borrowerModel.spouseDetails[ctrl.$name]){
                        scope.borrowerModel.spouseDetails[ctrl.$name].value = scope.borrowerModel.userDetails[ctrl.$name].value;
                        scope.borrowerModel.spouseDetails[ctrl.$name].isChanged = true;
                    }
                }
            }, 3000);
            scope.$watch(attrs.ngModel, function (v) {
                if(ctrl.$dirty){
                    if(scope.borrowerModel.userDetails && scope.borrowerModel.spouseDetails){
                        if(scope.borrowerModel.userDetails[ctrl.$name] && scope.borrowerModel.spouseDetails[ctrl.$name]){
                            scope.borrowerModel.spouseDetails[ctrl.$name].value = scope.borrowerModel.userDetails[ctrl.$name].value;
                            scope.borrowerModel.spouseDetails[ctrl.$name].isChanged = true;
                        }
                    }
                }
            }, true);
        }
    }
}]);

creditoDirectives.directive('numbersOnlyChildren', ['CONFIG', function(CONFIG) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            scope.$watch(attrs.ngModel, function () {
                modelCtrl.$parsers.push(function (inputValue) {
                    var transformedInput = inputValue.replace(/[^0-9]/g, '');

                    if(inputValue > parseInt(CONFIG.MAX_CHILDREN_NUMBER)) {
                        transformedInput = CONFIG.MAX_CHILDREN_NUMBER;
                        modelCtrl.$setViewValue(CONFIG.MAX_CHILDREN_NUMBER);
                        modelCtrl.$render();
                    } else if (transformedInput != inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }

                    return transformedInput;
                });
            });
        }
    };
}]);

creditoDirectives.directive('loanLength', ['CONFIG', function(CONFIG) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            scope.$watch(attrs.ngModel, function () {
                modelCtrl.$parsers.unshift(function (inputValue) {
                    if (inputValue == undefined) {
                        return '';
                    }

                    var transformedInput = inputValue;

                    if(inputValue > parseInt(CONFIG.MAX_LOAN_NUMBER)) {
                        transformedInput = CONFIG.MAX_LOAN_NUMBER;
                        element.val(transformedInput);
                    } else if (inputValue < parseInt(CONFIG.MIN_LOAN_NUMBER)) {
                        transformedInput = CONFIG.MIN_LOAN_NUMBER;
                        element.val(transformedInput);
                    }



                    return transformedInput;
                });
            }, true);
        }
    };
}]);

creditoDirectives.directive('familyIncome', ['CONFIG', function(CONFIG) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            scope.$watch(attrs.ngModel, function () {
                modelCtrl.$parsers.unshift(function (inputValue) {
                    if (inputValue == undefined) {
                        return '';
                    }

                    var transformedInput = inputValue;

                    if(parseInt(inputValue) < 1) {
                        transformedInput = "1";
                        element.val(transformedInput);
                    }

                    return transformedInput;
                });
            }, true);
        }
    };
}]);

creditoDirectives.directive('uploadItem', [function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/partials/upload-item.html',
        require: '^?UploadController',
        link: function(scope, element) {

        }

    }
}]);

creditoDirectives.directive('uploadItemSignatures', [function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/partials/upload-item-signatures.html',
        require: '^?BorrowerReportAndDocumentsDigitalSignatureController',
        link: function(scope, element) {

        }

    }
}]);

creditoDirectives.directive('uploadItemSpouse', [function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/partials/upload-item-spouse.html',
        require: '^?UploadSpouseController',
        link: function(scope, element) {

        }

    }
}]);

creditoDirectives.directive('backButton', ['$window', '$location', 'CONFIG', function($window, $location, CONFIG) {
    return {
        restrict: "E",
        template: '<a class="btn btn-icon btn-back btn-primary go-back-btn" ng-transclude></a>',
        transclude: true,
        link: function(scope, element) {
            scope.historyBack = function() {
                $window.history.back();
            };

            scope.goToPage = function() {
                $window.location.href = CONFIG.SITE_URL;
            }
        }
    }
}]);

creditoDirectives.directive('userInfoPanel', [function() {
    return {
        restrict: "E",
        scope: {
            name: '=',
            status: '=',
            progress: '=',
            firstName: '='
        },
        templateUrl: 'templates/partials/user-info-panel.html',
        link: function(scope, element) {

        }
    }
}]);

creditoDirectives.directive('redLights', [function() {
    return {
        restrict: "EA",
        templateUrl: 'templates/partials/redLightsIndicator.html',
        link: function(scope, element, attrs) {
            scope.noteValue = '';

            var jqElem = $(element),
                inputelement = jqElem.find('input[type="text"]');

            scope.$watch(function() {
                return inputelement.val();
            }, function(newValue, oldValue) {

                //if(typeof newValue != "undefined" && newValue != "") {
                //  scope.noteValue = "ON";
                //  jqElem.removeClass( "green-light" ).addClass( "red-light" );
                //} else {
                //  scope.noteValue = "OFF";
                //  jqElem.removeClass( "red-light" ).addClass( "green-light" );
                //}
            });
        }
    }
}]);

creditoDirectives.directive('userStatusModal', ['$timeout', function($timeout) {
    return {
        restrict: "E",
        transclude: true,
        replace: true,
        scope: {
            show: '=',
            status: '='
        },
        templateUrl: 'templates/pages/modal/inform-user-status.html',
        link: function(scope, element, attrs) {

            scope.$watch('show', function() {
                if(scope.show) {
                    $timeout(function() {
                        $(element).modal('show');
                    }, 2000);
                }
            });

        }
    }
}]);

creditoDirectives.directive('calculationCharts', [function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, modelCtrl) {

            scope.chart = {
                xAxisSeries: [],
                yAxisSeries: []
            };

            var chart = new Highcharts.Chart({
                credits: {
                    enabled: false
                },
                chart: {
                    renderTo: $(element).attr('id')
                },
                title: {
                    text: null
                    //x: -20
                },
                exporting: {
                    enabled: true
                },
                subtitle: {
                    text: null
                },
                xAxis: {
                    labels: {
                        formatter:function() {
                            return Highcharts.numberFormat(this.value, 0, '', ',');
                        }
                    },
                    categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17]
                },
                yAxis: {
                    title: {
                        text: null
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    enabled: false
                },
                series: [{
                    showInLegend: false,
                    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17]
                }]
            });

            //Comment to test digest
            scope.$watch('results.payments.graph', function() {
                scope.chart.xAxisSeries = _.pluck(scope.results.payments.graph, 'loanSize');
                scope.chart.yAxisSeries = _.pluck(scope.results.payments.graph, 'interest');

                if(scope.chart.yAxisSeries.length > 0) {
                    chart.xAxis[0].update({categories: scope.chart.xAxisSeries}, true);
                    chart.series[0].setData(scope.chart.yAxisSeries);
                }
            });
        }
    };
}]);


creditoDirectives.directive('indexLinkedChart', ['$timeout', '$filter', function($timeout, $filter) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, modelCtrl) {
            var chart, graphData = [];
            scope.chart = {
                xAxisSeries: [],
                yAxisSeries: []
            };
            scope.$watch("statusSummary", function() {

                if(scope.statusSummary){
                    for (var i = 0; i<scope.statusSummary.indexLinkedChart.chartData.length; i++){
                        var dataItem = {name:"", y:"", color:""};

                        dataItem.name =  $filter('translate')('INDEX_LINKED.'+scope.statusSummary.indexLinkedChart.chartData[i].type);
                        dataItem.alias = $filter('translate')('INDEX_LINKED.'+scope.statusSummary.indexLinkedChart.chartData[i].type) +'<br/>'+ scope.statusSummary.indexLinkedChart.chartData[i].percent + '%';
                        dataItem.y = scope.statusSummary.indexLinkedChart.chartData[i].amount;
                        if (scope.statusSummary.indexLinkedChart.chartData[i].type == "Linked") {
                            dataItem.color = "#ff0000";
                        } else if (scope.statusSummary.indexLinkedChart.chartData[i].type == "NonLinked") {
                            dataItem.color = "#538cd5";
                        } else {
                            dataItem.color = "#47a447";
                        }
                        graphData.push(dataItem);
                    }
                    chart = new Highcharts.Chart({
                        credits: {
                            enabled: false
                        },
                        chart: {
                            renderTo: $(element).attr('id'),
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            type: 'pie'
                        },
                        plotOptions: {
                            pie: {
                                size: 160,
                                showInLegend: true,
                                dataLabels: {
                                    enabled: false
                                }
                            }
                        },
                        title: {
                            text: null
                        },
                        exporting: {
                            enabled: true
                        },
                        subtitle: {
                            text: null
                        },
                        tooltip: {
                            pointFormat: '{point.percentage:.1f}%',
                            backgroundColor:null,
                            borderColor:null,
                            borderWidth:0,
                            enabled: true
                        },
                        series: [{
                            colorByPoint: true,
                            data: graphData,
                            dataLabels: {
                                enabled: true,
                                connectorWidth: 1,
                                connectorPadding: 1,
                                distance: 8,
                                style: {
                                    whiteSpace: 'nowrap'
                                },
                                formatter: function () {
                                    return this.point.alias;
                                },
                                x:0,
                                y:3,
                                useHTML:true
                            }
                        }
                        ]
                    });
                }

            });
        }
    };
}]);


creditoDirectives.directive('ltvNonLiquidLoans', ['$timeout', '$filter', function($timeout, $filter) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, modelCtrl) {
            var chart, graphDataInterval = [], graphDataInRange = [], graphDataAccumulative=[];
            scope.chart = {
                xAxisSeries: [],
                yAxisSeries: []
            };

            scope.$watch("statusSummary", function() {

                if(scope.statusSummary){
                    for (var i = 0; i<scope.statusSummary.nonLiquidLTVChart.chartData.length; i++){
                        var IntervalBegin = (scope.statusSummary.liquidLTVChart.chartData[i].intervalBegin == null) ? "נמוך מ" : scope.statusSummary.liquidLTVChart.chartData[i].intervalBegin;
                        var IntervalEnd = (scope.statusSummary.liquidLTVChart.chartData[i].intervalEnd == null) ? "מעל " : scope.statusSummary.liquidLTVChart.chartData[i].intervalEnd;

                        graphDataInterval.push(IntervalBegin + " - " + IntervalEnd);
                        graphDataInRange.push(scope.statusSummary.nonLiquidLTVChart.chartData[i].inRangePercent);
                        graphDataAccumulative.push(scope.statusSummary.nonLiquidLTVChart.chartData[i].accumulativePercent);
                    }

                    chart = new Highcharts.Chart({
                        chart: {
                            renderTo: element.attr('id'),
                            spacingBottom: 0
                        },
                        title: {
                            text: ""
                        },
                        tooltip: {
                            enabled: false,
                            formatter: ''
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'top',
                            verticalAlign: 'top',
                            borderWidth: 0,
                            x:20,
                            y:10
                        },
                        xAxis: [{
                            categories: graphDataInterval,
                            crosshair: true,
                            labels: {
                                y: 20,
                                x: 0
                            }

                        }],
                        yAxis: [{ // Primary yAxis
                            min: 0,
                            labels: {
                                style: {
                                    color: "#ff0000"
                                }
                            },
                            color:"#ff0000",
                            title: {
                                text: '',
                                style: {
                                    color: "#ff0000"
                                }
                            },
                            opposite: true

                        }, { // Secondary yAxis
                            gridLineWidth: 0,
                            min: 0,
                            color: Highcharts.getOptions().colors[0],
                            labels: {
                                style: {
                                    color: Highcharts.getOptions().colors[0]
                                }
                            },
                            title: {
                                text: '',
                                style: {
                                    color: Highcharts.getOptions().colors[0]
                                }
                            }
                        }],
                        plotOptions: {
                            line:{
                                marker: {
                                    enable:false
                                }
                            },
                            series: {
                                dataLabels: {
                                    style: {
                                        'margin-top': '100px'
                                    },
                                    html: true
                                }
                            }
                        },
                        series: [
                            {
                                name: $filter('translate')('LTV.IN_RANGE'),
                                type: 'column',
                                yAxis: 1,
                                data: graphDataInRange,
                                color: Highcharts.getOptions().colors[0],
                                html: true

                            },
                            {
                                name:  $filter('translate')('LTV.ACCUMULATIVE'),
                                type: 'spline',
                                yAxis: 0,
                                data: graphDataAccumulative,
                                color:'#ff0000',
                                html: true
                            }
                        ]
                    });
                }
            });
        }
    };
}]);

creditoDirectives.directive('ltvLiquidLoans', ['$timeout', '$filter', function($timeout, $filter) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, modelCtrl) {
            var chart, graphDataInterval = [], graphDataInRange = [], graphDataAccumulative=[];
            scope.chart = {
                xAxisSeries: [],
                yAxisSeries: []
            };

            scope.$watch("statusSummary", function() {

                if(scope.statusSummary){

                    for (var i = 0; i<scope.statusSummary.liquidLTVChart.chartData.length; i++){
                        var IntervalBegin = (scope.statusSummary.liquidLTVChart.chartData[i].intervalBegin == null) ? "נמוך מ" : scope.statusSummary.liquidLTVChart.chartData[i].intervalBegin;
                        var IntervalEnd = (scope.statusSummary.liquidLTVChart.chartData[i].intervalEnd == null) ? "מעל " : scope.statusSummary.liquidLTVChart.chartData[i].intervalEnd;

                        graphDataInterval.push(IntervalBegin + " - " + IntervalEnd);
                        graphDataInRange.push(scope.statusSummary.liquidLTVChart.chartData[i].inRangePercent);
                        graphDataAccumulative.push(scope.statusSummary.liquidLTVChart.chartData[i].accumulativePercent);
                    }

                    chart = new Highcharts.Chart({
                        chart: {
                            renderTo: element.attr('id'),
                            spacingBottom: 0
                        },
                        title: {
                            text: ""
                        },
                        tooltip: {
                            enabled: false,
                            formatter: ''
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'top',
                            verticalAlign: 'top',
                            borderWidth: 0,
                            x:20,
                            y:10
                        },
                        xAxis: [{
                            categories: graphDataInterval,
                            crosshair: true,
                            labels: {
                                y: 20,
                                x: 0
                            }

                        }],
                        yAxis: [{ // Primary yAxis
                            min: 0,
                            labels: {
                                style: {
                                    color: "#ff0000"
                                }
                            },
                            color:"#ff0000",
                            title: {
                                text: '',
                                style: {
                                    color: "#ff0000"
                                }
                            },
                            opposite: true

                        }, { // Secondary yAxis
                            gridLineWidth: 0,
                            min: 0,
                            labels: {
                                style: {
                                    color: Highcharts.getOptions().colors[0]
                                }
                            },
                            color:Highcharts.getOptions().colors[0],
                            title: {
                                text: '',
                                style: {
                                    color: Highcharts.getOptions().colors[0]
                                }
                            }
                        }],
                        plotOptions: {
                            series: {
                                dataLabels: {
                                    style: {
                                        'margin-top': '100px'
                                    },
                                    html: true
                                }
                            }
                        },
                        series: [{
                            name: $filter('translate')('LTV.IN_RANGE'),
                            type: 'column',
                            yAxis: 1,
                            data: graphDataInRange,
                            color: Highcharts.getOptions().colors[0],
                            html: true

                        }, {
                            name:  $filter('translate')('LTV.ACCUMULATIVE'),
                            type: 'spline',
                            yAxis: 0,
                            data: graphDataAccumulative,
                            color:'#ff0000',
                            html: true
                        }]
                    });
                }
            });
        }
    };
}]);

creditoDirectives.directive('projectedPaymentsChart', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, modelCtrl) {
            var dateArray = [], earlyPayment = [], fundLeft = [], defaults = [];
            var chart, graphData = [];
            scope.chart = {
                xAxisSeries: [],
                yAxisSeries: []
            };

            scope.$watch("statusSummary", function() {
                if(scope.statusSummary) {

                    for (var i = 0; i < scope.statusSummary.paymentsChart.chartData.length; i += 3) {
                        var d = new Date(scope.statusSummary.paymentsChart.chartData[i].date);
                        date = ((d.getDate()<10)?  '0'+d.getDate() : d.getDate() ) + '-' + ((d.getMonth()<9)?  '0'+(d.getMonth()+1) : d.getMonth()+1  ) + "-" + d.getFullYear();
                        dateArray.push(date);
                        earlyPayment.push(scope.statusSummary.paymentsChart.chartData[i].earlyPayments);
                        fundLeft.push(scope.statusSummary.paymentsChart.chartData[i].fundLeft);
                        defaults.push(scope.statusSummary.paymentsChart.chartData[i].defaults);
                    }

                    chart = new Highcharts.Chart({
                        chart: {
                            renderTo: element.attr('id')
                        },
                        title: {
                            text: ""
                        },
                        tooltip: {
                            enabled: false,
                            formatter: ''
                        },
                        xAxis: [{
                            categories: dateArray,
                            crosshair: true,
                            labels: {
                                y: 30,
                                x: 0
                            }
                        }],
                        legend: {
                            align: 'right',
                            x: -50,
                            verticalAlign: 'top',
                            y: -10,
                            itemDistance: 20,
                            itemHiddenStyle: {"padding": "10px", "text-anchor": "end"},
                            floating: true,
                            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                            borderColor: '#CCC',
                            borderWidth: 1,
                            shadow: false
                        },
                        yAxis: [
                            { // Primary yAxis
                                min:0,
                                labels: {
                                    style: {
                                        color: '#538cd5'
                                    }
                                },
                                color: '#538cd5',
                                title: {
                                    text: '',
                                    style: {
                                        color: '#538cd5'
                                    }
                                },
                                opposite: true

                            },
                            { // Secondary yAxis
                                min:0,
                                labels: {
                                    style: {
                                        color: '#47a447'
                                    }
                                },
                                color: '#47a447',
                                title: {
                                    //text:$filter('translate')('PAYMENT_CHART.MILLIONS'),
                                    text:'מיליוני ש\"ח',
                                    style: {
                                        color: "#47a447"
                                    }
                                }
                            }
                        ],
                        plotOptions: {
                            series:{
                                marker: {
                                    enable:false,
                                    radius:0
                                }
                            }
                        },
                        series: [
                            {
                                //name: $filter('translate')('PAYMENT_CHART.FUND_LEFT'),
                                name: 'שווי התיק',
                                type: 'spline',
                                yAxis: 1,
                                data: fundLeft,
                                color: '#47a447'
                            },
                            {
                                //name: $filter('translate')('PAYMENT_CHART.EARLY_PAYMENT'),
                                name: 'חדלות פרעון',
                                type: 'spline',
                                yAxis: 0,
                                data: earlyPayment,
                                color: '#538cd5'
                            },
                            {
                               // name: $filter('translate')('PAYMENT_CHART.DEFAULTS'),
                                name: 'פרעון מוקדם',
                                type: 'spline',
                                yAxis: 0,
                                data: defaults,
                                color: '#ff0000'
                            }
                        ]
                    });
                }
            });
        }
    };
}]);



creditoDirectives.directive('cashFlowChart', ['$timeout', '$filter', function($timeout, $filter) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, modelCtrl) {
            scope.$watch('cashFlowModel', function() {
                $timeout(function() {

                    var dateArray = [];
                    var remainingFund = [];
                    var cashflowAmount = [];

                    for(var i = 0; i < scope.cashFlowModel.values.length; i++) {
                        var d = new Date(scope.cashFlowModel.values[i].date);
                        date = ((d.getDate()<10)?  '0'+d.getDate() : d.getDate() ) + '-' + ((d.getMonth()<9)?  '0'+(d.getMonth()+1) : d.getMonth()+1  ) + "-" + d.getFullYear();
                        dateArray.push(date);
                        //dateArray.push(scope.cashFlowModel.values[i].date.split('T')[0]) ;
                        remainingFund.push(scope.cashFlowModel.values[i].remainingFund);
                        cashflowAmount.push(scope.cashFlowModel.values[i].cashflowAmount);
                    }


                    var chart, graphData = [];
                    scope.chart = {
                        xAxisSeries: [],
                        yAxisSeries: []
                    };
                    Highcharts.setOptions({
                        lang: {
                            thousandsSep: ','
                        }
                    });

                    chart = new Highcharts.Chart({
                        chart: {
                            renderTo: element.attr('id')
                        },

                        title: {
                            text: ""
                        },
                        tooltip: {
                            enabled: false,
                            formatter: ''
                        },
                        xAxis: [{
                            categories: dateArray,
                            crosshair: true,
                            labels: {
                                y: 25,
                                x: 0
                            }
                        }],
                        legend: {
                            align: 'right',
                            x: -30,
                            verticalAlign: 'top',
                            y: 25,
                            itemDistance:50,
                            itemHiddenStyle:{"padding":"10px", "text-anchor": "end"},
                            floating: true,
                            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                            borderColor: '#CCC',
                            borderWidth: 1,
                            shadow: false
                        },
                        yAxis: [{ // Primary yAxis
                            labels: {
                                style: {
                                    color: '#538cd5'
                                }
                            },
                            title: {
                                text: '',
                                style: {
                                    color: '#538cd5'
                                }
                            },
                            opposite: true

                        }, { // Secondary yAxis
                            labels: {
                                style: {
                                    color: 'green'
                                }
                            },
                            title: {
                                text: '',
                                style: {
                                    color: '#538cd5'
                                }
                            }
                        }],
                        plotOptions: {
                            column: {
                                stacking: 'normal',
                                dataLabels: {
                                    enabled: false,
                                    color: 'red',
                                    format: '{point.y:.1f}'
                                }
                            }
                        },
                        series: [{
                            name: $filter('translate')('CASH_FLOW.REMAINING_FUND'),
                            type: 'spline',
                            yAxis: 1,
                            data: remainingFund,
                            color: 'green'

                        },{
                            name: $filter('translate')('CASH_FLOW.CASH_FLOW_AMOUNT'),
                            type: 'spline',
                            yAxis: 0,
                            data: cashflowAmount,
                            color: '#538cd5'

                        }]
                    });
                }, 500);
            })
        }
    };
}]);

creditoDirectives.directive('liquidityChart', ['$timeout', '$filter', function($timeout, $filter) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, modelCtrl) {
            var chart, graphData = [];
            scope.chart = {
                xAxisSeries: [],
                yAxisSeries: []
            };
                scope.$watch('statisticsModel', function() {
                    $timeout(function() {

                        var liquidityArray = [];

                        for(var i = 0; i < scope.statisticsModel.liquidity.chartData.length; i++) {
                            liquidityArray.push({
                                name: $filter('translate')('INVESTOR_STATISTICS.' + scope.statisticsModel.liquidity.chartData[i].label),
                                y: scope.statisticsModel.liquidity.chartData[i].percent
                            });
                        }

                        chart = new Highcharts.Chart({
                            credits: {
                                enabled: false
                            },
                            chart: {
                                renderTo: $(element).attr('id'),
                                plotBackgroundColor: null,
                                plotBorderWidth: null,
                                plotShadow: false,
                                type: 'pie'
                            },
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom',
                                y: -100,
                                labelFormatter: function () {return '<span>' + this.name+'</span>';},
                                useHTML:true
                            },
                            plotOptions: {
                                pie: {
                                    size: 160,
                                    showInLegend: true,
                                    dataLabels: {
                                        enabled: true
                                    }
                                }
                            },
                            title: {
                                text: null
                            },
                            exporting: {
                                enabled: true
                            },
                            subtitle: {
                                text: null
                            },
                            tooltip: {
                                pointFormat: '{point.percentage:.1f}%',
                                backgroundColor:null,
                                borderColor:null,
                                borderWidth:0,
                                enabled: true
                            },
                            series: [{
                                name: null,
                                colorByPoint: true,
                                data: liquidityArray,
                                dataLabels: {
                                    enabled: true,
                                    connectorWidth: 1,
                                    connectorPadding: 5,
                                    distance: 15,
                                    style: {
                                        whiteSpace: 'nowrap'
                                    },
                                    x: -2,
                                    y: 0,
                                    useHTML:true
                                }
                            }]
                        });
                    }, 500);
                });
        }
    };
}]);

creditoDirectives.directive('sumChart', ['$timeout', '$filter', function($timeout, $filter) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, modelCtrl) {
            var chart, graphData = [];
            scope.chart = {
                xAxisSeries: [],
                yAxisSeries: []
            };
            scope.$watch('statisticsModel', function() {
                $timeout(function() {

                    var sumArray = [];

                    for(var i = 0; i < scope.statisticsModel.sum.chartData.length; i++) {
                        sumArray.push({
                            name: $filter('translate')('INVESTOR_STATISTICS.' + scope.statisticsModel.sum.chartData[i].label),
                            y: scope.statisticsModel.sum.chartData[i].percent
                        });
                    }

                    Highcharts.setOptions({
                        colors: ['#4F81BD', '#C0504D', '#9BBB59', '#5C0174']
                    });

                    chart = new Highcharts.Chart({
                        credits: {
                            enabled: false
                        },
                        chart: {
                            renderTo: $(element).attr('id'),
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            type: 'pie'
                        },
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom',
                            y: -100,
                            labelFormatter: function () {return '<span>' + this.name+'</span>';},
                            useHTML:true
                        },
                        plotOptions: {
                            pie: {
                                size: 160,
                                showInLegend: true,
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        },
                        title: {
                            text: null
                        },
                        exporting: {
                            enabled: true
                        },
                        subtitle: {
                            text: null
                        },
                        tooltip: {
                            pointFormat: '{point.percentage:.1f}%',
                            backgroundColor:null,
                            borderColor:null,
                            borderWidth:0,
                            enabled: true
                        },
                        series: [{
                            name: null,
                            colorByPoint: true,
                            data: sumArray,
                            dataLabels: {
                                enabled: true,
                                connectorWidth: 1,
                                connectorPadding: 5,
                                distance: 15,
                                style: {
                                    whiteSpace: 'nowrap'
                                },
                                x: -2,
                                y: 0,
                                useHTML:true
                            }
                        }]
                    });
                }, 500);
            });
        }
    };
}]);

creditoDirectives.directive('interestChart', ['$timeout', '$filter', function($timeout, $filter) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, modelCtrl) {
            var chart, graphData = [];
            scope.chart = {
                xAxisSeries: [],
                yAxisSeries: []
            };
            scope.$watch('statisticsModel', function() {
                $timeout(function() {

                    var interestArray = [];

                    for(var i = 0; i < scope.statisticsModel.interest.chartData.length; i++) {
                        interestArray.push({
                            name: $filter('translate')('INVESTOR_STATISTICS.' + scope.statisticsModel.interest.chartData[i].label),
                            y: scope.statisticsModel.interest.chartData[i].percent
                        });
                    }

                    chart = new Highcharts.Chart({
                        credits: {
                            enabled: false
                        },
                        chart: {
                            renderTo: $(element).attr('id'),
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            type: 'pie'
                        },
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom',
                            y: -100,
                            labelFormatter: function () {return '<span>' + this.name+'</span>';},
                            useHTML:true
                        },
                        plotOptions: {
                            pie: {
                                size: 160,
                                showInLegend: true,
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        },
                        title: {
                            text: null
                        },
                        exporting: {
                            enabled: true
                        },
                        subtitle: {
                            text: null
                        },
                        tooltip: {
                            pointFormat: '{point.percentage:.1f}%',
                            backgroundColor:null,
                            borderColor:null,
                            borderWidth:0,
                            enabled: true
                        },
                        series: [{
                            name: null,
                            colorByPoint: true,
                            data: interestArray,
                            dataLabels: {
                                enabled: true,
                                connectorWidth: 1,
                                connectorPadding: 5,
                                distance: 15,
                                style: {
                                    whiteSpace: 'nowrap'
                                },
                                x: -2,
                                y: 0,
                                useHTML:true
                            }
                        }]
                    });
                }, 500);
            });
        }
    };
}]);

creditoDirectives.directive('statusChart', ['$timeout', '$filter', function($timeout, $filter) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, modelCtrl) {
            var chart, graphData = [];
            scope.chart = {
                xAxisSeries: [],
                yAxisSeries: []
            };
            scope.$watch('statisticsModel', function() {
                $timeout(function() {

                    var statusArray = [];

                    for(var i = 0; i < scope.statisticsModel.status.chartData.length; i++) {
                        statusArray.push({
                            name: $filter('translate')('INVESTOR_STATISTICS.' + scope.statisticsModel.status.chartData[i].label) + ' ' + scope.statisticsModel.status.chartData[i].percent + '%',
                            y: scope.statisticsModel.status.chartData[i].percent
                        });
                    }

                    chart = new Highcharts.Chart({
                        credits: {
                            enabled: false
                        },
                        chart: {
                            renderTo: $(element).attr('id'),
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            type: 'pie'
                        },
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom',
                            y: -100,
                            labelFormatter: function () {return '<span>' + this.name+'</span>';},
                            useHTML:true
                        },
                        plotOptions: {
                            pie: {
                                size: 160,
                                showInLegend: true,
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        },
                        title: {
                            text: null
                        },
                        exporting: {
                            enabled: true
                        },
                        subtitle: {
                            text: null
                        },
                        tooltip: {
                            pointFormat: '{point.percentage:.1f}%',
                            backgroundColor:null,
                            borderColor:null,
                            borderWidth:0,
                            enabled: true
                        },
                        series: [{
                            name: null,
                            colorByPoint: true,
                            data: statusArray,
                            dataLabels: {
                                enabled: true,
                                connectorWidth: 1,
                                connectorPadding: 5,
                                distance: 15,
                                style: {
                                    whiteSpace: 'nowrap'
                                },
                                x: -2,
                                y: 0,
                                useHTML:true
                            }
                        }]
                    });
                }, 500);
            });
        }
    };
}]);

creditoDirectives.directive('timeChart', ['$timeout', '$filter', function($timeout, $filter) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, modelCtrl) {
            var chart, graphData = [];

            Highcharts.setOptions({
                colors: ['#4F81BD', '#C0504D', '#9BBB59', '#5C0174']
            });

            scope.chart = {
                xAxisSeries: [],
                yAxisSeries: []
            };
            scope.$watch('statisticsModel', function() {
                if(scope.statisticsModel) {

                    var timeArray = [];

                    for(var i = 0; i < scope.statisticsModel.time.chartData.length; i++) {
                        timeArray.push({
                            name: $filter('translate')('INVESTOR_STATISTICS.' + scope.statisticsModel.time.chartData[i].label),
                            y: scope.statisticsModel.time.chartData[i].value
                        });
                    }

                    chart = new Highcharts.Chart({
                        credits: {
                            enabled: false
                        },
                        chart: {
                            renderTo: $(element).attr('id'),
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            type: 'pie'
                        },
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom',
                            y: -100,
                            labelFormatter: function () {return '<span>' + this.name+'</span>';},
                            useHTML:true
                        },
                        plotOptions: {
                            pie: {
                                size: 160,
                                showInLegend: true,
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        },
                        title: {
                            text: null
                        },
                        exporting: {
                            enabled: true
                        },
                        subtitle: {
                            text: null
                        },
                        tooltip: {
                            pointFormat: '{point.percentage:.1f}%',
                            backgroundColor:null,
                            borderColor:null,
                            borderWidth:0,
                            enabled: true
                        },
                        series: [{
                            colorByPoint: true,
                            data: timeArray,
                            dataLabels: {
                                enabled: true,
                                connectorWidth: 1,
                                connectorPadding: 5,
                                distance: 15,
                                style: {
                                    whiteSpace: 'nowrap'
                                },
                                x: -2,
                                y: 0,
                                useHTML:true
                            }
                        }]
                    });


                };
            });
        }
    };
}]);

creditoDirectives.directive('paymentsForcastChart', ['$timeout', '$filter', function($timeout, $filter) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, modelCtrl) {
            var chart, graphDataDate = [], graphDataAmount = [];
            scope.chart = {
                xAxisSeries: [],
                yAxisSeries: []
            };
            Highcharts.setOptions({
                lang: {
                    thousandsSep: ','
                }
            });

            scope.$watch("statusModel", function() {
                if(scope.statusModel){

                    for(var i = 0; i < scope.statusModel.paymentForecasts.length; i++) {
                        var d = new Date(scope.statusModel.paymentForecasts[i].date);
                        date = ((d.getDate()<10)?  '0'+d.getDate() : d.getDate() ) + '-' + ((d.getMonth()<9)?  '0'+(d.getMonth()+1) : d.getMonth()+1  ) + "-" + d.getFullYear();
                        graphDataDate.push(date);
                        graphDataAmount.push(scope.statusModel.paymentForecasts[i].amount);
                    }
                    console.log(graphDataAmount);

                    chart = new Highcharts.Chart({
                        chart: {
                            renderTo: element.attr('id'),
                            spacingBottom: 0
                        },
                        title: {
                            text: ""
                        },
                        tooltip: {
                            enabled: false,
                            formatter: ''
                        },
                        legend: {
                            enable: false
                        },
                        xAxis: [{
                            categories: graphDataDate,
                            crosshair: true,
                            labels: {
                                y: 20,
                                x: 0
                            }

                        }],
                        yAxis: [{
                            gridLineWidth: 0,
                            min: 0,
                            labels: {
                                style: {
                                    color: Highcharts.getOptions().colors[0]
                                }
                            },
                            color:Highcharts.getOptions().colors[0],
                            title: {
                                text: '',
                                style: {
                                    color: Highcharts.getOptions().colors[0]
                                }
                            }
                        }],
                        plotOptions: {
                            series: {
                                dataLabels: {
                                    style: {
                                        'margin-top': '100px'
                                    },
                                    enable: true,
                                    html: true
                                }
                            }
                        },
                        series: [{
                            name: $filter('translate')('INTEREST_PAYMENTS.PAYMENT_FORCAST'),
                            type: 'column',
                            yAxis: 0,
                            data: graphDataAmount,
                            color: Highcharts.getOptions().colors[0],
                            html: true,
                            dataLabels: {
                                enabled: true,
                                style: {
                                    whiteSpace: 'nowrap'
                                },
                                useHTML:true
                            }

                        }]
                    });
                }
            });
        }
    };
}]);

creditoDirectives.directive('loanFundChart', ['$filter', function($filter) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, modelCtrl) {
            var chart, graphData = [];
            scope.chart = {
                xAxisSeries: [],
                yAxisSeries: []
            };
            scope.$watch('statusModel', function() {
                if(scope.statusModel) {
                    for (var i = 0; i < scope.statusModel.loanFund.chartData.length; i++) {
                        graphData.push({
                            name: $filter('translate')('BORROWER_LOAN_FUND.' + scope.statusModel.loanFund.chartData[i].label),
                            y: scope.statusModel.loanFund.chartData[i].percent
                        });
                    }

                    chart = new Highcharts.Chart({
                        credits: {
                            enabled: false
                        },
                        chart: {
                            renderTo: $(element).attr('id'),
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            type: 'pie'
                        },
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom',
                            y: -100,
                            labelFormatter: function () {
                                return '<span>' + this.name + '</span>';
                            },
                            useHTML: true
                        },
                        plotOptions: {
                            pie: {
                                size: 200,
                                showInLegend: true,
                                dataLabels: {
                                    enabled: true
                                },
                            }
                        },
                        title: {
                            text: null
                        },
                        exporting: {
                            enabled: true
                        },
                        subtitle: {
                            text: null
                        },
                        tooltip: {
                            enabled: false
                        },
                        series: [{
                            colorByPoint: true,
                            data: graphData,
                            dataLabels: {
                                enabled: true,
                                connectorWidth: 1,
                                connectorPadding: 5,
                                distance: 15,
                                style: {
                                    whiteSpace: 'nowrap'
                                },
                                formatter: function () {
                                    return this.point.y + "%";
                                },
                                x: -2,
                                y: 0,
                                useHTML: true
                            }
                        }]
                    });
                }
            });
        }
    };
}]);

creditoDirectives.directive('datePickerEarlyPayment', [function() {
    return {
        restrict: 'EA',
        link: function(scope, element, attrs, ctrl) {
            scope.$watch(element, function() {
                $('.datepickerEarlyPayment').datepicker({
                    format: "dd-mm-yyyy",
                    maxViewMode: 0,
                    startDate: new Date(),
                    autoclose: true,
                    language: "he"
                });
            });
        }
    }
}]);

creditoDirectives.directive('jSignatureDirective', function() {
    return {
        restrict: 'E',
        template: '<div id="signature"><div id="jSignature"></div>' +
        '<div class=" glyphicon glyphicon-remove"  id="resetSignature" ng-click="reset()"></div>' +
        '<button class="btn btn-primary" id="saveSignature" ng-click="getData()">אישור</button></div>',
        require: '^?BorrowerReportAndDocumentsDigitalSignatureController',
        link: function($scope, $element) {
            $scope.initialized = false;

            var options = {
                'background-color':"rgb(211, 211, 211)",
                color:"#002060"
            };

            $scope.initialize = function() {
                if (!$scope.initialized) {
                    $element.find('#jSignature').jSignature(options);
                    $scope.initialized = true;
                }
            };

            $scope.reset = function() {
                $element.jSignature('reset');
            };

            $scope.$on('loadFile', function() {
                $scope.reset();
            })

            $scope.getData = function() {
                var datapair = $element.jSignature('getData');
                var svg = $element.jSignature('getData', 'svg');
                $scope.saveSignature(datapair);
            };

            $scope.setData = function(sig) {
                if (sig) {
                    datapair = sig;
                }
                $element.jSignature('setData', 'data:' + datapair.join(','));
            };


            $scope.initialize();
            $scope.$watch('sig', function(sig) {
                if (sig) {
                    $scope.setData(sig);

                    return;
                }
            });


        }
    };
})
    .controller('SignatureController',function($scope) {
        $scope.items = [
            {text:'learn angular', done:true},
            {text:'build an angular app', done:false}];

        $scope.testAction = function(svg){
            $scope.items.push({});
            //alert(datapair);
            $scope.hash = 'data:' + svg[0] + "," + svg[1];
            var i = new Image()
            i.src = "data:" + svg[0] + "," + svg[1];
            console.log(svg[0]);
            $(i).appendTo($("body")) // append the image (SVG) to DOM.
        };

        /*
         var datapair = ['image/svg+xml'];
         datapair[1] ='<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="252" height="49"><path stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="#ffcc00" fill="none" d="M 1 32 c 0.07 -0.07 2.53 -2.87 4 -4 c 2.81 -2.16 5.81 -4.17 9 -6 c 8.04 -4.63 15.8 -9.46 24 -13 c 6.27 -2.71 13.25 -4.5 20 -6 c 5.22 -1.16 15.04 -3.2 16 -2 c 0.86 1.08 -4.7 9.01 -8 12 c -6.74 6.11 -16.35 10.97 -24 17 c -3.31 2.61 -9.85 8.94 -9 9 c 2.59 0.18 24.81 -4.85 38 -7 c 16.56 -2.7 46.9 -6.91 48 -7 c 0.27 -0.02 -7.64 2.43 -11 4 c -1.44 0.67 -2.99 1.85 -4 3 c -1.18 1.35 -3.52 4.48 -3 5 c 0.81 0.81 6.05 1 9 1 c 2.95 0 6.09 -0.34 9 -1 c 4.36 -0.99 8.52 -3.05 13 -4 c 13.05 -2.76 37.41 -6.81 39 -7 c 0.23 -0.03 -4.27 1.84 -5 3 c -0.62 1 -0.44 3.68 0 5 c 0.44 1.32 1.74 3.37 3 4 c 4 2 9.89 4.04 15 5 c 12.38 2.34 25.18 4.04 38 5 c 9.7 0.72 29 0 29 0"/></svg>';
         */

        var datapair = ['image/jsignature;base30'];
        datapair[1] = 'base30,2A0Z101100001110000000_4XZ6954655685877555655_3I10000000000000000Z1_4RZ487868658576656664_2B469754_3w10000Z1_4A001011000000000000_4NZ856566755597676675_4D65_q00_4F654_1E201_4B76_4KZ10_5K00000000000Z100000001_4PZ79678786555467565554_5L34334_4OZ21221_6N0001001000000000000_4PZ6958888755776556655_6P43332_4OZ32323_8CZ322121010000000Y1132342111012001000100Z11234_1K24444554556657554332Z134555445656656554432Y1_aF0Z1000000100000000000Y12231322222212212222322221000010000Z101000000_i559657657575558555564Z536455335435Y336443434335Z68789556a6984656655_cOZ42120000Y212323422110000Z11232_1N25545556554442Z43554555754433_dK00000100000000000Z11112Y4543433Z3545_4GZ565557897a555586764454Y22121232210_ew0000000001101110111_g6767677675687645444_eR0100000000000001355_i8895559a78855665200_gHZ345522200Y1233355211_3uZ3100Y334555322210Z344_gJ0001011001000000001001_a6674666565765655564554_iM223223224211123122213332323242222222222Z658669654374555_3yZ53546644734443553334Y3643453564337444435000000001201000_jD323333_3H545632_ku445533_3J244643_kT78aa8_3I36565';


        $scope.customSignature = datapair;
    });
