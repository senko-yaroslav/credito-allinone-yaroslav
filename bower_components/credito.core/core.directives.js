var creditoCoreDirectives = angular.module('creditoCoreDirectives', []);

creditoCoreDirectives.directive('mustBeFilled', [function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            //Comment to test digest
            scope.$watch(attrs.ngModel, function () {
                ctrl.$validators.mustBeFilled = function(modelValue, viewValue) {
                    return (typeof modelValue.length == 'undefined') ? !ctrl.$isEmpty(modelValue) && modelValue.toString().length > 0 : !ctrl.$isEmpty(modelValue) && modelValue.length > 0 ;
                };
            }, true);
        }
    }
}]);

creditoCoreDirectives.directive('fieldMinTwoSymbol', [function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            //Comment to test digest
            scope.$watch(attrs.ngModel, function () {
                ctrl.$validators.fieldMinTwoSymbol = function(modelValue, viewValue) {
                    return (typeof modelValue.length == 'undefined') ? !ctrl.$isEmpty(modelValue) && modelValue.toString().length > 1 : !ctrl.$isEmpty(modelValue) && modelValue.length > 1 ;
                };
            }, true);
        }
    }
}]);

creditoCoreDirectives.directive('minSixSymbols', [function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            //Comment to test digest
            scope.$watch(attrs.ngModel, function (v) {
                ctrl.$validators.minSixSymbols = function(modelValue, viewValue) {
                    return !ctrl.$isEmpty(modelValue) && modelValue.length >= 6;
                };
            }, true);
        }
    }
}]);

creditoCoreDirectives.directive('nineSymbols', [function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            //Comment to test digest
            scope.$watch(attrs.ngModel, function (v) {
                ctrl.$validators.nineSymbols = function(modelValue, viewValue) {
                    return !ctrl.$isEmpty(modelValue) && modelValue.length == 9;
                };
            }, true);
        }
    }
}]);

creditoCoreDirectives.directive('passwordMinSixSymbols', [function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            //Comment to test digest
            scope.$watch(attrs.ngModel, function (v) {
                ctrl.$validators.passwordMinSixSymbols = function(modelValue, viewValue) {

                    var description = [
                            'חלשה מאוד',
                            'חלשה',
                            'בינונית',
                            'חזקה',
                            'חזקה מאוד'
                        ],
                        score = 0;

                    //if password bigger than 6 give 1 point
                    if (modelValue.length > 6) {
                        score++;
                    }

                    //if password has both lower and uppercase characters give 1 point
                    if ( (modelValue.match(/[a-z]/) ) && ( modelValue.match(/[A-Z]/) ) ) {
                        score++;
                    }

                    //if password has at least one number give 1 point
                    if (modelValue.match(/\d+/)) {
                        score++;
                    }

                    //if password has at least one special caracther give 1 point
                    if ( modelValue.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/) )	{
                        score++;
                    }

                    //if password bigger than 12 give another 1 point
                    if (modelValue.length > 10) {
                        score++;
                    }

                    angular.element('#passwordDescription').text(description[score]);
                    angular.element('#passwordStrength').removeClass().addClass('strength' + score);

                    return !ctrl.$isEmpty(modelValue) && modelValue.length >= 6;
                };
            }, true);
        }
    }
}]);

creditoCoreDirectives.directive('mustBeNotEmpty', [function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            //Comment to test digest
            scope.$watch(attrs.ngModel, function (v) {
                ctrl.$validators.mustBeFilled = function(modelValue, viewValue) {
                    return !ctrl.$isEmpty(modelValue) && modelValue.length > 0;
                };
            }, true);
        }
    }
}]);

creditoCoreDirectives.directive('checkEmail', [function() {
    var EMAIL_REGEXP = /^[_a-zA-Z0-9\-]+(\.[_a-zA-Z0-9+]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/;

    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            //Comment to test digest
            scope.$watch(attrs.ngModel, function () {
                if (ctrl && ctrl.$validators.email) {
                    ctrl.$validators.checkEmail = function(modelValue) {
                        return (!ctrl.$isEmpty(modelValue)) && (EMAIL_REGEXP.test(modelValue));
                    };
                }
            }, true);
        }
    }
}]);

creditoCoreDirectives.directive('phoneNumber', ['$timeout', function($timeout) {
    var phoneMask = function(value) {
        var phoneLength = value.length,
            codeLength = (phoneLength==10) ? 3 : 2;
        return value.slice(0, codeLength) + '-' + value.slice(codeLength, phoneLength);
    };
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            var transformedValue;
            $timeout(function() {
                if (element.val() != '') {
                    transformedValue = element.val().replace(/[\-]/g, '');
                    modelCtrl.$setViewValue(transformedValue);
                    modelCtrl.$render();
                    element.val(phoneMask(transformedValue));
                }
            }, 2000);
            scope.$watch(attrs.ngModel, function () {
                modelCtrl.$parsers.unshift(function (inputValue) {
                    if (inputValue == undefined) {
                        return '';
                    }

                    var transformedInput = inputValue.replace(/[^0-9]/g, ''),
                        formatedInput;

                    if(transformedInput.length > 2) {
                        formatedInput = phoneMask(transformedInput);
                        modelCtrl.$setViewValue(formatedInput);
                        modelCtrl.$render();
                    } else {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }

                    modelCtrl.$validators.phoneNumber = function(modelValue, viewValue) {
                        return (!modelCtrl.$isEmpty(modelValue)) && ((viewValue.length == 11)|| (viewValue.length == 10));
                    };

                    return transformedInput;
                });
            }, true);
        }
    };
}]);

creditoCoreDirectives.directive('eightSymbols', [function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            //Comment to test digest
            scope.$watch(attrs.ngModel, function (v) {
                ctrl.$validators.nineSymbols = function(modelValue, viewValue) {
                    return !ctrl.$isEmpty(modelValue) && modelValue.length == 8;
                };
            }, true);
        }
    }
}]);

creditoCoreDirectives.directive('sixSymbols', [function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            //Comment to test digest
            scope.$watch(attrs.ngModel, function (v) {
                ctrl.$validators.nineSymbols = function(modelValue, viewValue) {
                    return !ctrl.$isEmpty(modelValue) && modelValue.length == 6;
                };
            }, true);
        }
    }
}]);

creditoCoreDirectives.directive('checkIdentical', [function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            //Comment to test digest
            scope.$watch(attrs.ngModel, function () {
                var firstString = '#' + attrs.checkIdentical;
                element.add(firstString).on('keyup', function () {
                    scope.$apply(function () {
                        var v = element.val() == $(firstString).val();
                        ctrl.$setValidity('pwmatch', v);
                    });
                });
            }, true);
        }
    }
}]);

creditoCoreDirectives.directive('isChecked', [function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            //Comment to test digest
            scope.$watch(attrs.ngModel, function () {
                ctrl.$validators.isChecked = function() {
                    return $(element).is(':checked');
                }
            }, true);
        }
    }
}]);

creditoCoreDirectives.directive('numbersOnly', [function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            //Comment to test digest
            scope.$watch(attrs.ngModel, function () {
                modelCtrl.$parsers.push(function (inputValue) {
                    if (inputValue == undefined) {
                        return '';
                    }
                    var transformedInput = inputValue.replace(/[^0-9]/g, '');
                    if (transformedInput != inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }

                    return transformedInput;
                });
            }, true);
        }
    };
}]);

creditoCoreDirectives.directive('numbersOnlyValue', [function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            var maxValue = attrs.numbersOnlyValue;

            scope.$watch(attrs.ngModel, function () {
                modelCtrl.$parsers.push(function (inputValue) {
                    var transformedInput = inputValue.toString().replace(/[^0-9]/g, '');

                    if(inputValue > parseInt(maxValue)) {
                        transformedInput = maxValue;
                        modelCtrl.$setViewValue(maxValue);
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

creditoCoreDirectives.directive('commaSeparatedNumbers', ['$timeout', function($timeout) {
    var addCommasToInteger = function(value) {
        var commas, decimals, wholeNumbers;
        decimals = value.indexOf('.') == -1 ? '' : value.replace(/^\d+(?=\.)/, '');
        wholeNumbers = value.replace(/(\.\d+)$/, '');
        commas = wholeNumbers.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        return "" + commas + decimals;
    };
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            var transformedValue;
            $timeout(function() {
                if(element.val() != "") {
                    transformedValue = addCommasToInteger(element.val());
                    modelCtrl.$setViewValue(transformedValue);
                    modelCtrl.$render();
                }
            }, 2000);
            scope.$watch(attrs.ngModel, function () {
                modelCtrl.$parsers.unshift(function (inputValue) {
                    if (inputValue == undefined) {
                        return '';
                    }
                    var transformedInput = inputValue.replace(/[\,\.]/g, ''),
                        formatedInput = addCommasToInteger(inputValue.toString());

                    modelCtrl.$setViewValue(formatedInput);
                    modelCtrl.$render();

                    return transformedInput;
                });
            }, true);
        }
    };
}]);

creditoCoreDirectives.directive('commaSeparatedNumbersText', ['$timeout', function($timeout) {
    return {
        restrict: 'EA',
        link: function(scope, element, attrs, modelCtrl) {
            $timeout(function() {
                var value = element[0].innerHTML,
                    negative = false,
                    commas, decimals, wholeNumbers;

                if(value.length > 0) {
                    if(value[0] == '-') {
                        negative = true;
                    }

                    value = Math.abs(value).toString();
                    decimals = value.indexOf('.') == -1 ? '' : value.replace(/^\d+(?=\.)/, '');
                    wholeNumbers = value.replace(/(\.\d+)$/, '');
                    commas = wholeNumbers.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

                    element[0].innerHTML = ( (negative) ? '-' : "") + commas + decimals;
                }
            }, 1000);
        }
    };
}]);

creditoCoreDirectives.directive('commaSeparatedAjaxNumbers', [function() {
    return {
        restrict: 'EA',
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            scope.$watch(attrs.ngModel, function() {
                //console.log('modelCtrl.modelValue', modelCtrl.$modelValue);
                //console.log('modelCtrl.viewValue', modelCtrl.$viewValue);
                //console.log('attrs.ngModel', attrs.ngModel);
                //console.log('element', element)

                var value = element[0].innerHTML,
                    negative = false,
                    commas, decimals, wholeNumbers;

                //console.log('element[0].innerHTML', element[0].innerHTML);
                //console.log('element[0].innerHTML', typeof element[0].innerHTML);

                if(typeof value != 'undefined' && value.length > 0  ) {
                    if(value[0] == '-') {
                        negative = true;
                    }

                    value = Math.abs(value).toString();
                    console.log('abs', value);
                    decimals = value.indexOf('.') == -1 ? '' : value.replace(/^\d+(?=\.)/, '');
                    wholeNumbers = value.replace(/(\.\d+)$/, '');
                    commas = wholeNumbers.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

                    element[0].innerHTML = ( (negative) ? '-' : "") + commas + decimals;
                }
            });
        }
    };
}]);

creditoCoreDirectives.directive('date', [function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            scope.$watch(attrs.ngModel, function () {
                modelCtrl.$parsers.push(function (inputValue) {
                    if (inputValue == undefined) {
                        return '';
                    }

                    var transformedInput = inputValue.toString().replace(/[^0-9/]/g, '');

                    if(transformedInput != inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }

                    return transformedInput;
                });
            });
        }
    };
}]);

creditoCoreDirectives.directive('idNumber', [function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == undefined){
                    return '';
                }

                var transformedInput = inputValue.toString().replace(/[^0-9]/g, '');

                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
}]);

creditoCoreDirectives.directive("tbTooltip", function() {
    return function(scope, element, attrs) {
        var isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };
        attrs.$observe('title', function(value) {
            element.removeData('tooltip');
            element.tooltip({
                html:true,
                trigger:'hover click',
                delay:{
                    "show": 0,
                    "hide": 2000
                }
            }).on('show.bs.tooltip', function () {
                $('.help[data-name!='+element.attr("data-name")+']').tooltip('hide');
            });

            element.on('click', function(e){
                e.stopPropagation();
                return false;
            })

        });

        $('html').click(function() {
            $('.help').tooltip('hide');
        });
    }
});

creditoCoreDirectives.directive('activeBtn', ['$timeout', function( $timeout) {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            var li,
                id = attrs.activeBtn,
                activeClass = "active";

            element.bind('click', function() {
                li = element.parent().parent().find('li');
                li.removeClass(activeClass);
                element.addClass(activeClass);
            });

        }
    }
}]);

creditoCoreDirectives.directive('navMenu', ['$location','$timeout', function($location, $timeout) {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            var links,
                urlMap = {},
                activeClass = attrs.navMenu || 'active';

            $timeout(function() {
                links = element.parent().find('a');
                for (var i= 0; i < links.length; i++) {
                    var link = angular.element(links[i]);
                    var url = link.attr('href');
                    urlMap[url] = link;
                }
                if (urlMap["#"+$location.path()]) {
                    urlMap["#"+$location.path()].addClass(activeClass);
                    urlMap["#"+$location.path()].parent().parent().parent().addClass(activeClass);
                    urlMap["#"+$location.path()].parent().parent().addClass('in');
                }

            }, 100);

            scope.$on('$routeChangeStart', function() {
                $timeout(function() {
                    var path = urlMap["#"+$location.path()];
                    links.removeClass(activeClass);
                    element.parent().removeClass(activeClass);
                    if (path) {
                        path.addClass(activeClass);
                        path.parent().parent().addClass('in');
                        path.parent().parent().parent().addClass(activeClass);
                    }
                }, 1000);
            });
        }
    }
}]);

creditoCoreDirectives.directive('creditoHeader', [function() {
    return {
        restrict: "E",
        templateUrl: 'templates/partials/header.html',
        link: function(scope, element) {
        }
    }
}]);

creditoCoreDirectives.directive('creditoFooter', [function() {
    return {
        restrict: "E",
        templateUrl: 'templates/partials/footer.html',
        link: function(scope, element) {

        }
    }
}]);

creditoCoreDirectives.directive('creditoSidemenu', function () {
    return {
        restrict: 'EA',
        templateUrl:'templates/partials/side-menu.html'
    };
});

creditoCoreDirectives.directive('datePicker', [function() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.pickadate({
                format: 'dd-mm-yyyy',
                selectMonths: true,
                selectYears: 100,
                min: new Date(1900,3,20),
                max: new Date(1997,7,14)
            });
        }
    };
}]);

creditoCoreDirectives.directive('idVerification', ['CONFIG', function(CONFIG) {
    var R_ELEGAL_INPUT = -1;
    var R_NOT_VALID = -2;
    var R_VALID = 1;

    function ValidateID(str) {

        // Just in case -> convert to string
        var IDnum = String(str);

        // Validate correct input
        if ( (IDnum.length > 9) || (IDnum.length < 5) ) {
            return R_ELEGAL_INPUT;
        }

        if (isNaN(IDnum)) {
            return R_ELEGAL_INPUT;
        }

        // The number is too short - add leading 0000
        if (IDnum.length < 9) {
            while(IDnum.length < 9) {
                IDnum = '0' + IDnum;
            }
        }

        // CHECK THE ID NUMBER
        var mone = 0, incNum;
        for (var i = 0; i < 9; i++)
        {
            incNum = Number(IDnum.charAt(i));
            incNum *= ( i % 2) + 1;
            if (incNum > 9) {
                incNum -= 9;
            }


            mone += incNum;
        }
        if (mone%10 == 0)
            return R_VALID;
        else
            return R_NOT_VALID;
    }
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {

            if(!CONFIG.CHECK_VERIFICATION_ID) {
                return;
            }
            scope.$watch(attrs.ngModel, function () {
                ctrl.$validators.idVerification = function(modelValue) {

                    if(typeof ctrl.$viewValue == 'undefined') {
                        return;
                    }

                    var val = ctrl.$viewValue;
                    var errorMsg = false;

                    if (val.length > 0) {
                        var isValid = ValidateID(val);
                        if(isValid == R_ELEGAL_INPUT) {
                            errorMsg = false;
                        } else if (isValid == R_NOT_VALID) {
                            errorMsg = false;
                        } else if(isValid == R_VALID) {
                            errorMsg = true;
                        } else {
                            errorMsg = false;
                        }
                    }

                    return (!ctrl.$isEmpty(modelValue)) && (errorMsg);
                };
            }, true);

        }
    };
}]);

creditoCoreDirectives.directive('submitOnEnter', [function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            scope.$watch(attrs.ngModel, function (v) {
                angular.element(element).keypress(function(event) {
                    if (event.which == 13) {
                        event.stopImmediatePropagation();
                        event.preventDefault();

                        angular.element('.searchButton').click();
                    }
                });
            });
        }
    };
}]);