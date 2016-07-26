var creditoControllers = angular.module('creditoControllers', []);

creditoControllers.controller('HeaderController', ['$scope', '$rootScope', '$translate', '$location', '$route', '$filter', 'authorizationService', 'CONFIG', 'UserDetails',
    function($scope, $rootScope, $translate, $location, $route, $filter, authorizationService, CONFIG, UserDetails) {

        $scope.user = {
            name: '',
            status: '',
            message: false,
            messageText: '',
            updateStatusAndName: function() {
                $scope.userData = JSON.parse(LS.userData);
                UserDetails.fname = $scope.userData.firstName;
                UserDetails.lname = $scope.userData.lastName;
                UserDetails.email = $scope.userData.email;
                UserDetails.status = $scope.userData.status;
            }
        };

        $scope.$on('$routeChangeStart', function() {
            $scope.currentRole = LS.roles;

            if(LS.user) {
                $scope.userDetails = JSON.parse(LS.user);
            }

            if(LS.investorData && $scope.currentRole == 'InstInvestor') {
                $scope.investorData = JSON.parse(LS.investorData);
                $rootScope.investorLogoLink = $scope.investorData.logoLink;
                $rootScope.investorSiteLink = $scope.investorData.siteLink;
            }

            if($scope.currentRole == 'Borrower') {
                $scope.userData = JSON.parse(LS.user);
                $rootScope.investorLogoLink = $scope.userData.investorLogoLink;
            }
        });

        $scope.showLogoutButton = function () {
            return LS.token !== undefined;
        };

        $rootScope.isShowMenu = function() {
            return LS.token !== undefined;
        }

        $scope.role = LS.roles;
        localStorage.setItem('AllInOne', JSON.stringify(LS));
    }]);

creditoControllers.controller('SideMenuController', ['$scope', '$location', '$route', '$rootScope',  '$filter',
    function($scope, $location, $route, $rootScope,  $filter){
        $scope.currentRole = LS.roles;

        $scope.$on('$routeChangeStart', function() {
            $scope.currentRole = LS.roles;
            //$scope.menuData.Borrower[11].disabled = LS.earlyPaymentFlag;
            //$scope.menuData.Borrower[12].disabled = LS.finishLoanFlag;

            //$scope.disabledTrigger = LS.finishLoanFlag
        });

        $scope.isVisible = (false) ? 1 : 0;


        $scope.menuData = {
            Admin:[
                {
                    title: 'שאלות ותשובות',
                    href:"#/admin/faq",
                    submenu: [],
                    collapsed: true
                },
            ],
            InstInvestor:[
                {
                    title: 'לווים',
                    href:"#/investor/search",
                    submenu: [],
                    collapsed: true
                },/*
                {
                    title: 'מערכת ניהול מלווים',
                    href: '',
                    submenu: [
                        {
                            title: 'סטטוס',
                            href:"#/investor/status",
                            submenu: [],
                            collapsed: true
                        },
                        {
                            title: 'תזרים',
                            href:"#/investor/cash-flow",
                            submenu: [],
                            collapsed: true
                        },
                        {
                            title: 'סטטיסטיקה',
                            href:"#/investor/statistics",
                            submenu: [],
                            collapsed: true
                        },
                        {
                            title: 'הלוואות',
                            href:"",
                            submenu: [
                                {
                                    title: 'הכל',
                                    href:"#/investor/loans",
                                    submenu: [],
                                    collapsed: true
                                },
                                {
                                    title: 'בתהליך רישום',
                                    href:"#/investor/loans/Registration",
                                    submenu: [],
                                    collapsed: true
                                },
                                {
                                    title: 'בבדיקה אצל קרדיטו',
                                    href:"#/investor/loans/ApproveInfo",
                                    submenu: [],
                                    collapsed: true
                                },
                                {
                                    title: 'ממתינים לאישור',
                                    href:"#/investor/loans/WaitingForApproval",
                                    submenu: [],
                                    collapsed: true
                                },
                                {
                                    title: 'ממתינים להזרמה',
                                    href:"#/investor/loans/Issuing",
                                    submenu: [],
                                    collapsed: true
                                },
                                {
                                    title: 'הלוואות פעילות',
                                    href:"#/investor/loans/FillInfo",
                                    submenu: [],
                                    collapsed: true
                                },
                                {
                                    title: 'פירעון מוקדם',
                                    href:"#/investor/loans/EarlyPaid",
                                    submenu: [],
                                    collapsed: true
                                },
                                {
                                    title: 'הלוואות שהסתיימו',
                                    href:"#/investor/loans/Completed",
                                    submenu: [],
                                    collapsed: true
                                },

                                {
                                    title: 'הלוואות בפיגור',
                                    href:"#/investor/loans/LateInPayment",
                                    submenu: [],
                                    collapsed: true
                                }
                            ],
                            collapsed: false
                        },
                        {
                            title: 'אישור הלוואות',
                            href:"#/investor/loan-approvals",
                            submenu: [],
                            collapsed: true
                        },
                        {
                            title: 'דוחות ומסמכים',
                            href:"#/investor/reports-and-documents",
                            submenu: [],
                            collapsed: true
                        }

                    ],
                    collapsed: false
                },
                {
                    title: 'הגדרות',
                    href:"",
                    submenu: [
                        {
                            title: 'סוגי נכסים',
                            href: '#/investor/config/collaterals'
                        },
                        {
                            title: 'הלוואה',
                            href: '#/investor/config/loan'
                        },
                        {
                            'title': 'כללי',
                            'href': '#/investor/config/general'
                        }
                    ],
                    collapsed: true
                }*/
            ],
            Borrower:[
                {
                    title: 'מילוי פרטים',
                    href:"",
                    submenu: [
                        { title: 'ההלוואה',  href:"#/get-loan"  },
                        { title: 'פרטים אישיים', href:"#/details" },
                        { title: 'תעסוקה והכנסה', href:"#/employment-and-salary" },
                        { title: 'נכסים והתחייבויות', href:"#/properties-and-liabilities" },
                        { title: 'חשבון בנק',  href:"#/bank-account" },
                        { title: 'העלאת מסמכים', href:"#/upload" }
                    ],
                    collapsed: true,
                    visible: !$scope.isVisible,
                    diabled: 0
                },
                {
                    title: 'ההלוואה',
                    href:"#/get-loan",
                    submenu: [],
                    collapsed: true,
                    visible: $scope.isVisible,
                    disabled:0
                },
                {
                    title: 'פרטים אישיים',
                    href:"#/details",
                    submenu: [],
                    collapsed: true,
                    visible: $scope.isVisible,
                    disabled:0
                },
                {
                    title: 'תעסוקה והכנסה',
                    href:"#/employment-and-salary",
                    submenu: [],
                    collapsed: true,
                    visible: $scope.isVisible,
                    disabled: 0
                },
                {
                    title: 'נכסים והתחייבויות',
                    href:"#/properties-and-liabilities",
                    submenu: [],
                    collapsed: true,
                    visible: $scope.isVisible,
                    disabled:0
                },
                {
                    title: 'חשבון בנק',
                    href:"#/bank-account",
                    submenu: [],
                    collapsed: true,
                    visible: $scope.isVisible,
                    disabled:0
                },
                {
                    title: 'העלאת מסמכים',
                    href:"#/upload",
                    submenu: [],
                    collapsed: true,
                    visible: $scope.isVisible,
                    disabled:0
                },
                /*{
                    title:'סטטוס',
                    href:"#/borrower-status",
                    submenu: [],
                    collapsed: true,
                    visible: !$scope.isVisible,
                    disabled:0
                },
                {
                    title:'חתימה על מסמכים',
                    href:"#/borrower-reports-and-documents-digital-signature",
                    submenu: [],
                    collapsed: true,
                    visible: !$scope.isVisible
                },
                {
                    title:'מצב ההלוואה',
                    href:"#/loan-proccess-status",
                    submenu: [],
                    collapsed: true,
                    visible: !$scope.isVisible,
                    disabled:0
                },
                {
                    title: 'לוח סילוקין',
                    href:"#/loan-payments",
                    submenu: [],
                    collapsed: true,
                    visible: !$scope.isVisible,
                    disabled:0
                },
                {
                    title: 'פירעון מוקדם',
                    href:"#/early-payment",
                    submenu: [],
                    collapsed: true,
                    visible: !$scope.isVisible,
                    disabled: $scope.disabledEarlyPaymentPage
                },
                {
                    title: 'מחזור הלוואה',
                    href:"#/loan-recycling",
                    submenu: [],
                    collapsed: true,
                    visible: !$scope.isVisible,
                    disabled: $scope.disabledRecyclingPage
                },
                {
                    title: 'דוחות ומסמכים',
                    href:"#/borrower-reports-and-documents",
                    submenu: [],
                    collapsed: true,
                    visible: !$scope.isVisible,
                    disabled:0
                },
                {
                    title:'חתימה על מסמכים',
                    href:"#/borrower-reports-and-documents-digital-signature",
                    submenu: [],
                    collapsed: true,
                    visible: !$scope.isVisible
                },
                {
                    title:'מצב ההלוואה',
                    href:"#/loan-proccess-status",
                    submenu: [],
                    collapsed: true,
                    visible: !$scope.isVisible,
                    disabled:0
                },
                {
                    title: 'לוח סילוקין',
                    href:"#/loan-payments",
                    submenu: [],
                    collapsed: true,
                    visible: !$scope.isVisible,
                    disabled:0
                },
                {
                    title: 'פירעון מוקדם',
                    href:"#/early-payment",
                    submenu: [],
                    collapsed: true,
                    visible: !$scope.isVisible,
                    disabled: $scope.disabledEarlyPaymentPage
                },
                {
                    title: 'מחזור הלוואה',
                    href:"#/loan-recycling",
                    submenu: [],
                    collapsed: true,
                    visible: !$scope.isVisible,
                    disabled: $scope.disabledRecyclingPage
                },
                {
                    title: 'דוחות ומסמכים',
                    href:"#/borrower-reports-and-documents",
                    submenu: [],
                    collapsed: true,
                    visible: !$scope.isVisible,
                    disabled:0
                },
                {
                    title: 'שאלות ותשובות',
                    href:"#/faq",
                    submenu: [],
                    collapsed: true,
                    visible: !$scope.isVisible,
                    disabled:0
                }*/
            ]
        };

        //$scope.menuData.Borrower[11].disabled = LS.earlyPaymentFlag;
        //$scope.menuData.Borrower[12].disabled = LS.finishLoanFlag;
    }]);

creditoControllers.controller('AdminMenuController', ['$scope',
    function($scope){
        $scope.currentRole = LS.roles;

        $scope.$on('$routeChangeStart', function() {
            $scope.currentRole = LS.roles;
        });

        $scope.menuData = {
            Admin:[
                {
                    title: 'Dashboard',
                    href:"#/admin/dashboard",
                    submenu: [],
                    collapsed: true
                },
                {
                    title: 'FAQ',
                    href:"#/admin/faq",
                    submenu: [],
                    collapsed: true
                }
            ]
        };
    }]);

creditoControllers.controller('RegisterController', ['$scope', '$rootScope', '$route', '$timeout', '$location', 'RegistrationService', 'Restangular', 'md5', 'UserDetails', 'CONFIG', 'DecodeToken',
    function ($scope, $rootScope, $route, $timeout, $location, RegistrationService, Restangular, md5, UserDetails, CONFIG, DecodeToken) {
        LS.firstEnterFlag = 1;
        localStorage.setItem('AllInOne', JSON.stringify(LS));

        $scope.loginModel = {
            userDetails: {}
        };

        Restangular.all('investors').getList().then(function(data){
            $scope.investors = data;
            $scope.selected = data[0].id;
        });

        if(LS.currentStep == $rootScope.CONFIG.APPROVE_MAIL_STATUS) {
            $timeout(function() {
                $location.path("/");
            }, 3000);
        }

        $scope.FAQModel = [];
        $scope.showHelpMessage = function(tag) {
            FAQService.getCategories().then(function(response) {
                $scope.FAQModel = response;

                $scope.flagParent = [];
                $scope.flagChild = [];

                $timeout(function() {
                    $scope.parentCategoryId = $('.' + tag).attr('categoryId');

                    $scope.articleId = $('.' + tag).attr('articleId');
                    $scope.parent = $('#subCategory_' + $scope.parentCategoryId).attr('parentId');
                    $('#answers_' + $scope.articleId).addClass('in');
                    $('#subCategory_' + $scope.parentCategoryId).addClass('in');

                    if(typeof $scope.parent != 'undefined') {
                        $('#parentCategory_' + $scope.parent).addClass('in');
                    } else {
                        $('#parentCategory_' + $scope.parentCategoryId).addClass('in');
                    }

                    $('#showHelpMessage').modal();
                }, 500);
            });
        };

        $scope.termsModal = function() {
            $('#termsModal').modal();
        };

        $scope.registerSubmit = function() {
            UserDetails.id = $scope.loginModel.userDetails.id;
            UserDetails.fname = $scope.loginModel.userDetails.fname;
            UserDetails.lname = $scope.loginModel.userDetails.lname;
            UserDetails.email = $scope.loginModel.userDetails.email;
            UserDetails.phoneNumber = '05' + $scope.loginModel.userDetails.phoneNumber; //The resulting number will be the phone with 10 digits (05 + 8 digits)
            UserDetails.investorId = $scope.loginModel.userDetails.investorId;
            UserDetails.personalId = $scope.loginModel.userDetails.personalId;
            UserDetails.pass = md5.createHash($scope.loginModel.userDetails.pass);
            UserDetails.retrypass = md5.createHash($scope.loginModel.userDetails.retrypass);

            Restangular.all('registration').post(UserDetails.getRegisterUserData())
                .then(function(data) {
                    LS.lastTokenRetrived = new Date().getTime();
                    localStorage.setItem('AllInOne', JSON.stringify(LS));

                    UserDetails.id = data.id;

                    $location.path('phone/confirm/' + data);

                }, function(error) {
                    console.log('error', error);
                });
        };
    }
]);

creditoControllers.controller('LoginController', ['$rootScope', '$scope', '$location', '$http', '$timeout', 'Restangular', 'md5', 'LoginService', 'DecodeToken', 'UserDetails',
    function ($rootScope, $scope, $location, $http, $timeout, Restangular, md5, LoginService, DecodeToken, UserDetails) {
        LS.firstEnterFlag = 0;
        LS.finishLoanFlag = 0;
        LS.earlyPaymentFlag = 0;
        LS.status = null;
        LS.investorName = null;
        LS.spouseTrigger = false;
        localStorage.setItem('AllInOne', JSON.stringify(LS));

        $scope.loginSubmit = function() {
            UserDetails.email = $scope.loginModel.userDetails.email;
            UserDetails.pass = md5.createHash($scope.loginModel.userDetails.pass);

            Restangular.setDefaultHeaders();
            Restangular.all('/oauth/token').
                post($.param(UserDetails.getLoginUserData()), {}, {'Content-Type': 'application/x-www-form-urlencoded'}
            ).
                then( function(data) {
                    $scope.isPhoneConfirmed = DecodeToken.decodeJwt(data.access_token).AuthorizationDenied == 'PhoneNotConfirmed' ? true : false;

                    if($scope.isPhoneConfirmed) {
                        LS.tmpToken = data.access_token;
                        localStorage.setItem('AllInOne', JSON.stringify(LS));

                        $location.path('register/sms-message-verification');
                    } else {
                        Restangular.setDefaultHeaders();
                        Restangular.all('/oauth/token').
                            post( $.param(UserDetails.getLoginUserData()), {}, {'Content-Type': 'application/x-www-form-urlencoded'}).
                            then( function(data) {

                                delete LS.tmpToken;

                                UserDetails.token = data.access_token;
                                LS.token = data.access_token;
                                localStorage.setItem('AllInOne', JSON.stringify(LS));

                                // Add token to each request
                                Restangular.setDefaultHeaders({ Authorization: 'Bearer ' + data.access_token });

                                Restangular.one('user')
                                    .get()
                                    .then(function(data) {
                                        LS.lastTokenRetrived = new Date().getTime();
                                        localStorage.setItem('AllInOne', JSON.stringify(LS));

                                        UserDetails.id = data.id;
                                        UserDetails.fname = data.firstName;
                                        UserDetails.status = data.status;

                                        LS.userId = data.id;
                                        LS.user = JSON.stringify(data);
                                        LS.roles = data.roles;
                                        LS.status = data.status;
                                        LS.investorName = data.investorName;
                                        localStorage.setItem('AllInOne', JSON.stringify(LS));
                                        //LS.spouseTrigger = (data.spouseId) ? true : false;

                                        if(LS.roles == 'InstInvestor') {
                                            Restangular.one('investor', UserDetails.getUserId())
                                                .get()
                                                .then(function(data) {
                                                    LS.investorData = JSON.stringify(data);
                                                    $rootScope.investorLogoLink = data.logoLink;
                                                    $rootScope.investorSiteLink = data.siteLink;

                                                    localStorage.setItem('AllInOne', JSON.stringify(LS));
                                                });
                                        }
                                        if (LS.roles == 'Borrower') {
                                            $rootScope.investorLogoLink = data.investorLogoLink;
                                        }

                                        switch(data.roles[0]) {
                                            case 'Borrower':
                                                localStorage.setItem('AllInOne', JSON.stringify(LS));
                                                $location.path("get-loan");
                                                break;
                                            case 'InstInvestor':
                                                $location.path("investor/search");
                                                break;

                                            case 'Admin':
                                                $location.path("admin/faq");
                                                break;
                                        }
                                    });

                            }, function(error) {
                                $scope.loginModel.errorMessage = error.data.error_description;
                                $scope.login.password.$setValidity('incorrect', false);
                                $timeout(function() {
                                    $scope.login.password.$setValidity('incorrect', true);
                                }, 3000);
                            });
                    }

                }, function(error) {
                    console.log('error', error);
                    $scope.loginModel.errorMessage = error.data.error_description;
                    $scope.login.password.$setValidity('incorrect', false);
                    $timeout(function() {
                        $scope.login.password.$setValidity('incorrect', true);
                    }, 3000);
                });
        }
    }]);

creditoControllers.controller('GetLoanController', ['$rootScope', '$scope', '$location', '$window', '$timeout', 'GetLoanService', 'Restangular', '$filter','CONFIG', 'currentStep',
    function ($rootScope, $scope, $location, $window, $timeout, GetLoanService, Restangular, $filter, CONFIG, currentStep) {
        var loanDetailsContainer = $('#loanSetup');
        $scope.loanStatus = "";
        $scope.firstEnterFlag = LS.firstEnterFlag;
        $scope.MAX_LOAN_SUM = CONFIG.MAX_LOAN_SUM;
        $scope.MIN_LOAN_SUM = CONFIG.MIN_LOAN_SUM;
        $scope.borrowerModel = {
            status: LS.status != "FillInfo"  && LS.status != "WaitingForBorrower",
            loanDetails: { }
        };
        Restangular.one('loan').get({}).then(function(data) {
            if(data){
                $scope.loanStatus = data.approvalStatus;

                LS.loan = data;
                localStorage.setItem('AllInOne', JSON.stringify(LS));
            }
        });
        Restangular.one('loan/attributes')
            .get({}).then(function(data) {
                _.each(data, function(item) {
                    var fieldContainer = loanDetailsContainer.find('input[name='+ item.name +']');
                    var parentSelector = fieldContainer.attr('attributeTypeID', item.attributeTypeID).attr('valueType', item.valueType);

                    $scope.borrowerModel.loanDetails[item.name] = {
                        name: item.name,
                        isChanged: false,
                        valueType: item.valueType,
                        attributeTypeID: item.attributeTypeID
                    };

                    if(item.valueType == "option") {
                        $scope.borrowerModel.loanDetails[item.name].options = [];
                        _.each(item.optionAttributeValues, function(value, i) {
                            $scope.borrowerModel.loanDetails[item.name].options.push({
                                id: parseInt(value.optionAttributeValueID),
                                value:(item.name == "LoanType")?  $filter('translate')('BORROWER.LoanType.' + value.value) : $filter('translate')('RADIO_BTN_OPTIONS.' + value.value)
                            });
                        });
                    }

                    if (typeof item.values != 'undefined') {
                        if(item.attributeTypeID == '29'){
                            $scope.borrowerModel.loanDetails[item.name].value = {id:parseInt(item.values[0].value)};
                        } else if(item.valueType == 'decimal'){
                            $scope.borrowerModel.loanDetails[item.name].value = parseInt(item.values[0].value);
                        } else {
                            $scope.borrowerModel.loanDetails[item.name].value = item.values[0].value;
                        }
                    }
                });

                $scope.loanSetupSubmit = function() {
                    $scope.borrowerModel.loanDetails.LoanAmount.isChanged = true;
                    $scope.borrowerModel.loanDetails.LoanDurationInMonths.isChanged = true;
                    $scope.borrowerModel.loanDetails.LoanPurpose.isChanged = true;
                    $scope.borrowerModel.loanDetails.LoanReason.isChanged = true;
                    $scope.borrowerModel.loanDetails.LoanType.isChanged = true;

                    GetLoanService.loanDetails = [];
                    _.each($scope.borrowerModel.loanDetails, function(item, i) {
                        if(typeof item.value != 'undefined') {
                            if (item.isChanged) {
                                var value = (item.attributeTypeID == '29') ? item.value.id : item.value;
                                GetLoanService.loanDetails.push({
                                    "value": value + '',
                                    "attributeTypeID": item.attributeTypeID
                                });
                            }
                        }
                    });

                    GetLoanService.getLoan();

                }

                $scope.loanCancel = function() {
                    GetLoanService.cancelLoan();
                }

                $scope.loanReset = function() {
                    $scope.borrowerModel.loanDetails.LoanAmount.value = "";
                    $scope.borrowerModel.loanDetails.LoanDurationInMonths.value = "";
                    //$scope.borrowerModel.loanDetails.LoanPayDay.value = "";
                    $scope.borrowerModel.loanDetails.LoanType.value = "";
                    $scope.borrowerModel.loanDetails.LoanPurpose.value = "";
                    $scope.borrowerModel.loanDetails.LoanReason.value = "";
                }
            });
    }]);

creditoControllers.controller('UserDetailsController', ['$rootScope', '$scope', '$location', '$timeout', 'UserDetails','SpouseDetails', 'Restangular', '$filter', 'currentStep', 'cfpLoadingBar','CONFIG',
    function ($rootScope, $scope, $location, $timeout, UserDetails, SpouseDetails, Restangular, $filter, currentStep, cfpLoadingBar, CONFIG) {
        $scope.borrowerModel = {
            status: LS.status != "FillInfo"  && LS.status != "WaitingForBorrower",
            userDetails: {},
            spouseDetails: {}
        };
        $scope.spouseTrigger = LS.spouseTrigger;
        $scope.spouseVal;

        $scope.skipFilling = function(moveToPage) {
            $location.path(moveToPage);
        };

        var userDetailsContainer = $('#user-details');
        var spouseDetailsContainer = $('#spouse-details');
        var getRelocationUrl = function(){
            if ($location.$$url == '/details') {
                return 'employment-and-salary';
            } else if ($location.$$url == '/employment-and-salary') {
                return 'properties-and-liabilities';
            } else if ($location.$$url == '/properties-and-liabilities') {
                return 'bank-account';
            }
        }

        $timeout(function () {
            $scope.spouseVal = $scope.spouseTrigger;
        }, 1000);
        $scope.setSpouseTrigger = function(){
            $scope.spouseTrigger = $scope.spouseVal && $scope.spouse_details_form.$valid;
            LS.spouseTrigger = $scope.spouseTrigger;
        }

        $scope.yearsLimit = [];

        for (var i = 0; i <= CONFIG.MAX_YEAR_LIMIT; i++){
            $scope.yearsLimit.push(i);
        }

        UserDetails.getDetailsData().then(function(data) {
            _.each(data, function(item) {
                var fieldContainer = userDetailsContainer.find('input[name='+ item.name +'], select[name='+ item.name +']');
                var parentSelector = fieldContainer.attr('attributeTypeID', item.attributeTypeID).attr('valueType', item.valueType);

                $scope.borrowerModel.userDetails[item.name] = {
                    name: item.name,
                    isChanged: false,
                    valueType: item.valueType,
                    attributeTypeID: item.attributeTypeID
                };

                if(item.valueType == "option") {
                    $scope.borrowerModel.userDetails[item.name].options = [];
                    _.each(item.optionAttributeValues, function(value, i) {
                        $scope.borrowerModel.userDetails[item.name].options.push({
                            id: parseInt(value.optionAttributeValueID),
                            value: $filter('translate')('SELECT_OPTIONS.' + value.value)
                        });
                    });
                }
                if (typeof item.values != 'undefined') {
                    if(item.valueType == 'option'){
                        $scope.borrowerModel.userDetails[item.name].value = {id:parseInt(item.values[0].value)};
                    } else if (item.valueType == 'int') {
                        $scope.borrowerModel.userDetails[item.name].value = parseFloat(item.values[0].value);
                    } else if(item.valueType == 'decimal'){
                        $scope.borrowerModel.userDetails[item.name].value = parseInt(item.values[0].value);
                    } else {
                        $scope.borrowerModel.userDetails[item.name].value = item.values[0].value;
                    }
                } else {
                    if (item.valueType == 'int' || item.valueType == 'decimal'){
                        $scope.borrowerModel.userDetails[item.name].value = 0;
                    }
                }

                if(item.name == 'FamilyIncome') {
                    if($scope.borrowerModel.userDetails[item.name].value == 0) {
                        $scope.borrowerModel.userDetails[item.name].value = 1;
                    }
                }
            });


            SpouseDetails.getDetailsData().then(function(spouseData) {
                _.each(spouseData, function(item) {
                    var fieldSpouseContainer = spouseDetailsContainer.find('input[name='+ item.name +'], select[name='+ item.name +']');
                    var parentSpouseSelector = fieldSpouseContainer.attr('attributeTypeID', item.attributeTypeID).attr('valueType', item.valueType);

                    $scope.borrowerModel.spouseDetails[item.name] = {
                        name: item.name,
                        isChanged: false,
                        valueType: item.valueType,
                        attributeTypeID: item.attributeTypeID
                    };


                    if(item.valueType == "option") {
                        $scope.borrowerModel.spouseDetails[item.name].options = [];
                        _.each(item.optionAttributeValues, function(value, i) {
                            $scope.borrowerModel.spouseDetails[item.name].options.push({
                                id: parseInt(value.optionAttributeValueID),
                                value: $filter('translate')('SELECT_OPTIONS.' + value.value)
                            });
                        });
                    }
                    if (typeof item.values != 'undefined') {
                        if(item.valueType == 'option'){
                            $scope.borrowerModel.spouseDetails[item.name].value = {id:parseInt(item.values[0].value)};
                        } else if (item.valueType == 'int') {
                            $scope.borrowerModel.spouseDetails[item.name].value = parseFloat(item.values[0].value);
                        } else if(item.valueType == 'decimal'){
                            $scope.borrowerModel.spouseDetails[item.name].value = parseInt(item.values[0].value);
                        } else {
                            $scope.borrowerModel.spouseDetails[item.name].value = item.values[0].value;
                        }
                    }
                });


                $('.datepicker').pickadate({
                    format: 'dd-mm-yyyy',
                    selectMonths: true,
                    selectYears: 100,
                    min: new Date(1900,3,20),
                    max: new Date(1997,7,14)
                });

                $scope.userDetailsSave = function() {
                    var saveSpouseDetails = function(){
                        SpouseDetails.detailsData = [];
                        _.each($scope.borrowerModel.spouseDetails, function(item, i) {
                            if (item.isChanged) {
                                var value = (item.valueType == 'option') ? item.value.id : item.value;
                                SpouseDetails.detailsData.push({
                                    'name': item.name,
                                    'value': value,
                                    'attributeTypeID': item.attributeTypeID,
                                    'valueType': item.valueType
                                });
                            }
                        });

                        if(SpouseDetails.detailsData.length > 0) {
                            SpouseDetails.sendDetailsData().then(function () {
                                    $location.path(getRelocationUrl());
                                },
                                function (error) {
                                    $scope.spouseTrigger = false;
                                });
                        }
                    }

                    UserDetails.detailsData = [];
                    _.each($scope.borrowerModel.userDetails, function(item, i) {
                        if (item.isChanged) {
                            var value = (item.valueType == 'option') ? item.value.id : item.value;
                            UserDetails.detailsData.push({
                                'name': item.name,
                                'value': value,
                                'attributeTypeID': item.attributeTypeID,
                                'valueType': item.valueType
                            });
                        }
                    });

                    if(UserDetails.detailsData.length > 0) {
                        UserDetails.sendDetailsData().then(function () {
                                $scope.setSpouseTrigger();
                                if ($scope.spouseTrigger){
                                    saveSpouseDetails();
                                } else {
                                    $location.path(getRelocationUrl());
                                    //$location.path( ($location.$$url == '/details') ? 'employment-and-salary' : 'bank-account');
                                }
                            },
                            function (error) {
                                $timeout(function () {
                                    cfpLoadingBar.complete();
                                }, 1000);
                            });
                    } else {
                        $scope.setSpouseTrigger();
                        if ($scope.spouseTrigger){
                            saveSpouseDetails();
                        } else {
                            $location.path(getRelocationUrl());
                            //$location.path( ($location.$$url == '/details') ? 'employment-and-salary' : 'bank-account');
                        }
                    }
                }
            });


        });
    }
]);

creditoControllers.controller('BankAccountController', ['$scope', 'BankService', '$location','$filter', 'currentStep', 'Restangular','CONFIG',
    function($scope, BankService, $location, $filter, currentStep, Restangular, CONFIG){
    $scope.borrowerModel = {
        status: LS.status != "FillInfo"  && LS.status != "WaitingForBorrower",
        bankAccount: {
            BankBranchName: null,
            BankAccountNumber: null,
            BankNameList:[],
            CreditCardOwnership:[],
            YearsInAccount:null
        }
    };
    $scope.bankAccountContainer = $('#bankAccount');
    $scope.yearsLimit = [];

    for (var i = 0; i <= CONFIG.MAX_YEAR_LIMIT; i++){
        $scope.yearsLimit.push(i);
    }

    Restangular.one('account').one('attributes')
        .get()
        .then(function(data) {
            _.each(data, function(item) {
                var fieldContainer = $scope.bankAccountContainer.find('input[name='+ item.name +']');
                fieldContainer.attr('attributeTypeID', item.attributeTypeID).attr('valueType', item.valueType);

                $scope.borrowerModel.bankAccount[item.name] = {
                    name: item.name,
                    isChanged: false,
                    valueType: item.valueType,
                    attributeTypeID: item.attributeTypeID
                };

                if(item.valueType == "option") {
                    $scope.borrowerModel.bankAccount[item.name].options = [];
                    _.each(item.optionAttributeValues, function(value, i) {
                        $scope.borrowerModel.bankAccount[item.name].options.push({
                            id: parseInt(value.optionAttributeValueID),
                            value: $filter('translate')('SELECT_OPTIONS.' + value.value)
                        });
                    });
                }
                if (typeof item.values != 'undefined') {
                    if(item.valueType == 'option'){
                        $scope.borrowerModel.bankAccount[item.name].value = {id:parseInt(item.values[0].value)};
                    } else if (item.valueType == 'int') {
                        $scope.borrowerModel.bankAccount[item.name].value = parseFloat(item.values[0].value);
                    } else if(item.valueType == 'decimal'){
                        $scope.borrowerModel.bankAccount[item.name].value = parseInt(item.values[0].value);
                    } else {
                        $scope.borrowerModel.bankAccount[item.name].value = item.values[0].value;
                    }
                }
            });
        });

    $scope.onSubmit = function() {
        $scope.borrowerModel.bankAccount.BankBranchName.isChanged = true;
        $scope.borrowerModel.bankAccount.BankAccountNumber.isChanged = true;
        $scope.borrowerModel.bankAccount.BankNameList.isChanged = true;
        $scope.borrowerModel.bankAccount.CreditCardOwnership.isChanged = true;
        $scope.borrowerModel.bankAccount.YearsInAccount.isChanged = true;

        BankService.bankAccount = [];

        _.each($scope.borrowerModel.bankAccount, function(item) {
            if (item.isChanged) {
                var value = (item.valueType == 'option') ? item.value.id : item.value;
                BankService.bankAccount.push({
                    'value': value,
                    'attributeTypeID': item.attributeTypeID
                });
            }
        });

        BankService.submitAccount()
            .then(function() {
                $location.path('upload');
            });
    };
}]);

creditoControllers.controller('UploadController', ['UploadService', '$rootScope', '$scope', '$timeout', '$location', 'UserDetails', 'Restangular', '$filter', 'currentStep',
    function(UploadService, $rootScope, $scope, $timeout, $location, UserDetails, Restangular, $filter, currentStep) {
        $scope.uploadForm = [];
        $scope.approveWindowShow=false;
        $scope.role = LS.roles;
        $scope.spouseTrigger = LS.spouseTrigger;
        $scope.status = LS.status != "FillInfo"  && LS.status != "WaitingForBorrower",

            $scope.goToGetLoanPage = function () {
                window.location.href = "#/get-loan";
                location.reload();
            }

        $scope.completeData = function() {
            Restangular.one('user/attributes/completed').post().then(function(){
                $location.path('finish');
            });
        }

        /*setTimeout(function() {
         $('input[type=file]').on('change', function(e) {
         var target = $(e.target);
         console.log("why you are going here?", target);
         if(!target[0].files[0]) {
         return;
         }

         var parentContainer = $(target).parent().parent();
         $scope.uploadFile($scope.uploadForm, target[0].files[0], target.attr('attributetypeid'), target.attr('data'), parentContainer.find('.progress-container'), false, "I got you babe");
         parentContainer.find('span.filename').text( target[0].files[0].name )
         });
         }, 2000);
         */

        Restangular.one('user/attributes')
            .get({})
            .then(function(data) {
                $scope.OtherInfo = _.find(data, 'name', 'OtherInfo');
            });

        $scope.commentsSaved = false;
        $scope.saveComments = function() {
            Restangular.all('user/attributes')
                .post([{
                    'value': $scope.OtherInfo.values[0].value,
                    'attributeTypeID': $scope.OtherInfo.attributeTypeID
                }])
                .then(function (data) {
                    $scope.commentsSaved = true;
                    $timeout(function(){
                        $scope.commentsSaved = false;
                    }, 2000)
                },
                function (error) {

                });
        };

        $scope.uploadFile = function(model, file, attrId, progressClassName, progressContainer, isNew) {
            $scope.nameid = LS.nameid;

            UploadService.uploadFile(
                file,
                $rootScope.CONFIG.API_URL + 'user/attributes/upload?attributeTypeId=' + attrId,
                UserDetails.getUserToken(),
                attrId,
                progressClassName,
                progressContainer,
                isNew,
                function(data) {
                },
                function(error) {
                    console.log(error, "error");
                }).then(function(newFileObject) {
                    _.find($scope.uploadForm, 'attrId', newFileObject[0].attributeTypeID).values.push(newFileObject[0].values[0])

                    var emptyFileContainer = $('.uploaded-file-position .filename');
                    if(emptyFileContainer[0]) {
                        $(emptyFileContainer[0]).parent().parent().remove();
                    }
                });
        };

        $scope.confirmRemoveFile = function(file, parentIndex, index) {
            $('#confirm-delete').modal();
            $scope.fileToDelete = file;
            $scope.fileToDelete.parentIndex = parentIndex;
            $scope.fileToDelete.index = index;
        };

        $scope.removeFile = function(attributeValueId, creatorID, parentIndex, index, filename) {
            $scope.removed = [];

            UploadService.removeFile($scope.fileToDelete.attributeValueId).then(function() {
                $scope.uploadForm[$scope.fileToDelete.parentIndex].values.splice($scope.fileToDelete.index, 1);
                $scope.removed[$scope.fileToDelete.parentIndex] = true;
                $timeout(function() {
                    $scope.removed[$scope.fileToDelete.parentIndex] = false;
                }, 2000);
            });
        };

        $scope.downloadFile = function(attributeValueId, filename ) {
            $scope.fileName = filename;
            UploadService.downloadFile(attributeValueId).then(function(response) {
                $scope.fileType = response.type;
                $scope.reader = new Blob([response], {"type": response.type});
                saveAs($scope.reader, decodeURIComponent($scope.fileName));
            });
        };

        $scope.complete = function() {
            $('#finishModal').modal();
        };

        $scope.backToDetails = function() {
            $location.path('details');
        };

        Restangular.one('user/attributes')
            .get({
                'valueType': "blob"
            })
            .then(function(data) {
                $scope.uploadForm = [
                    { name: 'UPLOAD.BankPrints' },
                    { name: 'UPLOAD.Salary' },
                    { name: 'UPLOAD.SpouseSalary' },
                    { name: 'UPLOAD.IDDocument' },
                    /*{name: 'UPLOAD.SurplusSummary'},*/
                    { name: 'UPLOAD.BankID' },
                    {
                        name: 'UPLOAD.OtherDocument',
                        comment:'UPLOAD.OtherDocumentComment'
                    }
                ];
                for(var i = 0; i< data.length; i++) {
                    for (var j=0; j< $scope.uploadForm.length; j++){
                        if("UPLOAD."+data[i].name == $scope.uploadForm[j].name){

                            $scope.uploadForm[j].attrId = data[i].attributeTypeID;
                            $scope.uploadForm[j].values = [];

                            if(typeof data[i].values != 'undefined') {
                                for(var k = 0; k < data[i].values.length; k++) {
                                    $scope.uploadForm[j].values.push(data[i].values[k])
                                }
                            }
                        }
                    }
                }

                setTimeout(function() {
                    _.each(data, function(files) {
                        if(typeof files.values !== 'undefined') {
                            var filtered = _.filter($scope.uploadForm, function(el) {
                                return el.attrId == files.attributeTypeID;
                            });
                            _.each(filtered, function(upload, i) {
                                if(files.values[i] !== undefined) {
                                    upload.filename = files.values[i].value;
                                }
                            });
                        }
                    });
                }, 500);
            });

        $scope.counter = 0;
        $scope.addFile = function(attrId, index, event) {
            var emptyFileContainer = $('.uploaded-file-position .filename:empty');
            if(emptyFileContainer[0]) {
                $(emptyFileContainer[0]).parent().parent().remove();
            }
            var addButton = $(event.target);
            var template = '<div class="uploaded-file-position">' +
                '<span>' +
                '<span class="glyphicon"></span>' +
                '<span class="progress-new-file' + $scope.counter + ' filename upload-label"></span>' +
                '</span>' +
                '<span style="display: none" class="btn btn-primary btn-file ng-binding">' +
                'עדכן<input type="file" class="select-file" file-model="fileUpload" id="progress-new-file'+ $scope.counter + '" data="progress-new-file'+ $scope.counter + '" attributetypeid="' + attrId + '" valuetype="blob" isrequired="true" name="">' +
                '</span>'+
                '<div class="progress-container">'+
                '<progress value="0" max="100" style="display: none" class=" upload-label progress-new-file'+ $scope.counter + '"></progress>' +
                '</div>' +
                '</div>';
            addButton.before(template);
            document.getElementById('progress-new-file'+ $scope.counter).click();

            $('#progress-new-file'+ $scope.counter).bind('change', function(e) {
                var file = $('input[type=file]');
                if(!file[0].files[0]) {
                    return;
                }

                $scope.uploadFile($scope.uploadForm, file[0].files[0], file.attr('attributetypeid'), file.attr('data'), addButton.parent().parent().find('.progress-container'), true);
                $('span.' + file.attr('data')).text( file[0].files[0].name );
                file.parent().text( $filter('translate')('UPLOAD.EDIT') );
                $scope.counter++;
            });


            var file = $('input[type=file]');

            if(!file[0].files[0]) {
                return;
            }


            $scope.uploadFile($scope.uploadForm, file[0].files[0], file.attr('attributetypeid'), file.attr('data'), addButton.parent().parent().find('.progress-container'), true);
            $('span.' + file.attr('data')).text( file[0].files[0].name );
            file.parent().text( $filter('translate')('UPLOAD.EDIT') );

            $scope.counter++;

        }
    }]);

creditoControllers.controller('FinishDetailsController', ['$location', '$rootScope', '$scope', '$route', function($location, $rootScope, $scope, $route){
    $scope.II_NAME = LS.investorName;
    LS = {};
    localStorage.removeItem('AllInOne');
    localStorage.setItem('AllInOne', JSON.stringify(LS));

    LS.spouseTrigger = false;
    $rootScope.investorSiteLink = null;
    LS.roles = 'Unauthorized';
    localStorage.setItem('AllInOne', JSON.stringify(LS));

    //$location.path("/")
}]);

creditoControllers.controller('UploadSpouseController', ['UploadService', '$rootScope', '$scope', '$timeout', '$location', 'UserDetails', 'Restangular', '$filter',
    function(UploadService, $rootScope, $scope, $timeout, $location, UserDetails, Restangular, $filter) {
        $scope.uploadFormSpouse = [];
        $scope.role = LS.roles;

        setTimeout(function() {
            $('input[type=file]').on('change', function(e) {
                var target = $(e.target);

                if(!target[0].files[0]) {
                    return;
                }

                var parentContainer = $(target).parent().parent();
                $scope.uploadFileSpouse($scope.uploadFormSpouse, target[0].files[0], target.attr('attributetypeid'), target.attr('data'), parentContainer.find('.progress-container'), false);
                parentContainer.find('span.filename').text( target[0].files[0].name )
            });
        }, 2000);

        $scope.uploadFileSpouse = function(model, file, attrId, progressClassName, progressContainer, isNew) {
            $scope.nameid = LS.nameid;

            UploadService.uploadFile(
                file,
                //$rootScope.CONFIG.API_URL + 'user/' + $scope.nameid + '/attributes/upload?attributeTypeId=' + attrId,
                $rootScope.CONFIG.API_URL + 'spouse/attributes/upload?attributeTypeId=' + attrId,
                UserDetails.getUserToken(),
                attrId,
                progressClassName,
                progressContainer,
                isNew,
                function(data) {
                },
                function(error) {
                    console.log(error, "error");
                });
        };

        Restangular.one('spouse/attributes')
            .get({
                'valueType': "blob"
            })
            .then(function(data) {

                $scope.uploadFormSpouse = [{
                    name: 'UPLOAD.IDDocument'
                },{
                    name: 'UPLOAD.OtherDocument'
                },{
                    name: 'UPLOAD.Salary'
                }];
                for(var i = 0; i< data.length; i++) {
                    for (var j=0; j< $scope.uploadFormSpouse.length; j++){
                        if("UPLOAD."+data[i].name == $scope.uploadFormSpouse[j].name){

                            $scope.uploadFormSpouse[j].attrId = data[i].attributeTypeID;
                            $scope.uploadFormSpouse[j].values = [];

                            if(typeof data[i].values != 'undefined') {
                                for(var k = 0; k < data[i].values.length; k++) {
                                    $scope.uploadFormSpouse[j].values.push(data[i].values[k])
                                }
                            }

                        }
                    }

                }

                setTimeout(function() {
                    _.each(data, function(files) {
                        if(typeof files.values !== 'undefined') {
                            var filtered = _.filter($scope.uploadFormSpouse, function(el) {
                                return el.attrId == files.attributeTypeID;
                            });
                            _.each(filtered, function(upload, i) {
                                if(files.values[i] !== undefined) {
                                    upload.filename = files.values[i].value;
                                }
                            });
                        }
                    });
                }, 500);
            });

        $scope.counter = 0;
        $scope.addFileSpouse = function(attrId, index, event) {
            var addButton = $(event.target);
            var template = '<div class="uploaded-file-position">' +
                '<span>' +
                '<span class="glyphicon"></span>' +
                '<span class="progress-new-file' + $scope.counter + ' filename upload-label"></span>' +
                '</span>' +
                '<span style="display: none" class="btn btn-primary btn-file ng-binding">' +
                'עדכן<input type="file" class="select-file" file-model="fileUpload" id="progress-new-file'+ $scope.counter + '" data="progress-new-file'+ $scope.counter + '" attributetypeid="' + attrId + '" valuetype="blob" isrequired="true" name="">' +
                '</span>'+
                '<div class="progress-container">'+
                '<progress value="0" max="100" style="display: none" class=" upload-label progress-new-file'+ $scope.counter + '"></progress>' +
                '</div>' +
                '</div>';
            addButton.before(template);
            document.getElementById('progress-new-file'+ $scope.counter).click();

            $('#progress-new-file'+ $scope.counter).bind('change', function(e) {
                var file = $('input[type=file]');

                if(!file[0].files[0]) {
                    return;
                }

                $scope.uploadFileSpouse($scope.uploadForm, file[0].files[0], file.attr('attributetypeid'), file.attr('data'), addButton.parent().parent().find('.progress-container'), true);
                $('span.' + file.attr('data')).text( file[0].files[0].name );
                file.parent().text( $filter('translate')('UPLOAD.EDIT') );

                $scope.counter++;
            });

            var file = $('input[type=file]');

            if(!file[0].files[0]) {
                return;
            }

            $scope.uploadFileSpouse($scope.uploadForm, file[0].files[0], file.attr('attributetypeid'), file.attr('data'), addButton.parent().parent().find('.progress-container'), true);
            $('span.' + file.attr('data')).text( file[0].files[0].name );
            file.parent().text( $filter('translate')('UPLOAD.EDIT') )


        }
    }]);

creditoControllers.controller('BorrowerStatusController', [function() {
    console.log('BorrowerStatusController');
}]);


creditoControllers.controller('BorrowerMessagesController', [function() {
    console.log('BorrowerMessagesController');
}]);

creditoControllers.controller('BorrowerForumController', [function() {
    console.log('BorrowerForumController');
}]);

creditoControllers.controller('BorrowerReportAndDocumentsController', ['$scope', 'BorrowerReportsAndDocumentsService', function($scope, BorrowerReportsAndDocumentsService) {

    $scope.drawFile = function(fileName) {

        BorrowerReportsAndDocumentsService.getDocuments(fileName).then(function(response) {

            if (typeof Blob !== "undefined") {
                $scope.reader = new Blob([response], {"type": 'application/pdf'});
                $scope.urlCreator = window.URL;
                $scope.fileURL = $scope.urlCreator.createObjectURL( $scope.reader );
                $scope.fileName = fileName;
                document.getElementById("pdfRow").src = $scope.fileURL;

                if(typeof window.navigator.msSaveOrOpenBlob != 'undefined') {
                    window.navigator.msSaveOrOpenBlob($scope.reader);
                }

            }

            $('#pdfRow').show();


        });
    };

    $scope.saveFile = function() {
        saveAs($scope.reader, decodeURIComponent($scope.fileName));
    }
}]);

creditoControllers.controller('BorrowerReportAndDocumentsDigitalSignatureController', ['$scope', '$rootScope', '$timeout', '$location', 'Restangular', '$filter', 'UploadService', 'UserDetails', 'BorrowerReportsAndDocumentsService',
    function($scope, $rootScope, $timeout, $location, Restangular, $filter, UploadService, UserDetails, BorrowerReportsAndDocumentsService) {

    //set default view - first nav item
    $timeout(function(){
        $scope.drawFileWithSignature('AgreementSignatureDocument');
        $scope.documentType = 'AgreementSignature';
    }, 500);

    $scope.uploadFileTrigger = false;
    $scope.signatureTrigger = false;
    $scope.signatureLoadAgreement = false;
    $scope.signatureLoadPromissoryNote = false;
    $scope.documentType = '';

    $scope.currentUpload = null;
    $scope.currentSignature = null;

    $scope.borrowerModel = {
        userDetails: {
            AgreementSignature: null,
            PromissoryNoteSignature: null
        }
    };

    $scope.loanApprovalStatus = LS.loan.approvalStatus;

    $scope.documentsAndReportsContainer = $('#documentsAndReports');

    $scope.signatureLoadCheck = function() {
        $scope.signatureLoadAgreement = ($scope.borrowerModel.userDetails.AgreementSignature.value) ? true : false;
        $scope.signatureLoadPromissoryNote = ($scope.borrowerModel.userDetails.PromissoryNoteSignature.value) ? true : false;

        if($scope.documentType.length > 0) {
            if(typeof $scope.borrowerModel.userDetails[$scope.documentType].value != 'undefined' && $scope.borrowerModel.userDetails[$scope.documentType].value) {
                $scope.signatureTrigger = false;
            }
        }

    };

    $scope.getUserDetails = function() {
        UserDetails.getDetailsData().then(function(data) {

            $scope.AgreementSignatureDocumentFlag = (typeof _.find(data, 'name', 'AgreementSignature').values != 'undefined') ? 1 : 0;
            $scope.PromissoryNoteSignatureDocumentFlag = (typeof _.find(data, 'name', 'PromissoryNoteSignature').values != 'undefined') ? 1 : 0;

            _.each(data, function(item) {
                var fieldContainer = $scope.documentsAndReportsContainer.find('input[name='+ item.name +']');
                fieldContainer.attr('attributeTypeID', item.attributeTypeID).attr('valueType', item.valueType);

                $scope.borrowerModel.userDetails[item.name] = {
                    name: item.name,
                    isChanged: false,
                    valueType: item.valueType,
                    attributeTypeID: item.attributeTypeID,
                    value: null
                };
                if (typeof item.values != 'undefined') {
                    $scope.borrowerModel.userDetails[item.name].value = item.values[0].value;
                }
            });
            $scope.signatureLoadCheck();
        });
    }

    $scope.getUserDetails();

    $scope.uploadForm = [];
    $scope.role = LS.roles;
    $scope.uploadFile = function(model, file, attrId, progressClassName, progressContainer, isNew) {
        $scope.nameid = LS.nameid;

        UploadService.uploadFile(
            file,
            $rootScope.CONFIG.API_URL + 'user/attributes/upload?attributeTypeId=' + attrId,
            UserDetails.getUserToken(),
            attrId,
            progressClassName,
            progressContainer,
            isNew,
            function(data) {
            },
            function(error) {
                console.log(error, "error");
            }).then(function(newFileObject) {

                $scope.drawUploadedFile(newFileObject[0].values[0].attributeValueId, newFileObject[0].values[0].value);

                _.find($scope.uploadForm, 'attrId', newFileObject[0].attributeTypeID).values.push(newFileObject[0].values[0])

                var emptyFileContainer = $('.uploaded-file-position .filename');
                if(emptyFileContainer[0]) {
                    $(emptyFileContainer[0]).parent().parent().remove();
                }

                $scope.uploadComplete();
            });
    };

    $scope.confirmRemoveFile = function(file, parentIndex, index) {
        $('#confirm-delete').modal();
        $scope.fileToDelete = file;
        $scope.fileToDelete.parentIndex = parentIndex;
        $scope.fileToDelete.index = index;
    };

    $scope.removeFile = function(attributeValueId, creatorID, parentIndex, index, filename) {
        $scope.removed = [];

        UploadService.removeFile($scope.fileToDelete.attributeValueId).then(function() {
            $scope.uploadForm[$scope.fileToDelete.parentIndex].values.splice($scope.fileToDelete.index, 1);
            $scope.removed[$scope.fileToDelete.parentIndex] = true;
            $timeout(function() {
                $scope.removed[$scope.fileToDelete.parentIndex] = false;
            }, 2000);
            $('#pdfRow').hide();
            $('#imgRow').hide();
        });
    };

    $scope.downloadFile = function(attributeValueId, filename ) {
        $scope.fileName = filename;

        UploadService.downloadFile(attributeValueId).then(function(response) {
            $scope.fileType = response.type;
            $scope.reader = new Blob([response], {"type": response.type});
            saveAs($scope.reader, decodeURIComponent($scope.fileName));
        });
    };

    $scope.downloadExistedFile = function(filename ) {
        $scope.fileName = filename;
        BorrowerReportsAndDocumentsService.downloadFile(filename).then(function(response) {
            $scope.fileType = response.type;
            $scope.reader = new Blob([response], {"type": response.type});
            saveAs($scope.reader, decodeURIComponent($scope.fileName));
        });
    };

    Restangular.one('user/attributes')
        .get({
            'valueType': "blob"
        })
        .then(function(data) {
            $scope.uploadForm = [
                {
                    name: 'UPLOAD.CancelledCheque',
                    alias: 'CancelledCheque'
                },
                {
                    name: 'UPLOAD.BankPermission',
                    alias: 'BankPermission'
                }
            ];
            for(var i = 0; i< data.length; i++) {
                for (var j=0; j< $scope.uploadForm.length; j++){
                    if("UPLOAD."+data[i].name == $scope.uploadForm[j].name){

                        $scope.uploadForm[j].attrId = data[i].attributeTypeID;
                        $scope.uploadForm[j].values = [];

                        if(typeof data[i].values != 'undefined') {
                            for(var k = 0; k < data[i].values.length; k++) {
                                $scope.uploadForm[j].values.push(data[i].values[k])
                            }
                        }
                    }
                }
            }

            setTimeout(function() {
                _.each(data, function(files) {
                    if(typeof files.values !== 'undefined') {
                        var filtered = _.filter($scope.uploadForm, function(el) {
                            return el.attrId == files.attributeTypeID;
                        });
                        _.each(filtered, function(upload, i) {
                            if(files.values[i] !== undefined) {
                                upload.filename = files.values[i].value;
                            }
                        });
                    }
                });
            }, 500);
        });


    $scope.counter = 0;
    $scope.addFile = function(attrId, index, event) {
        if($scope.uploadForm[index].values.length > 0){
            return;
        }

        var emptyFileContainer = $('.uploaded-file-position .filename:empty');
        if(emptyFileContainer[0]) {
            $(emptyFileContainer[0]).parent().parent().remove();
        }
        var addButton = $(event.target);
        var template = '<div class="uploaded-file-position">' +
            '<span>' +
            '<span class="glyphicon"></span>' +
            '<span class="progress-new-file' + $scope.counter + ' filename upload-label"></span>' +
            '</span>' +
            '<span style="display: none" class="btn btn-primary btn-file ng-binding">' +
            'עדכן<input type="file" class="select-file" file-model="fileUpload" id="progress-new-file'+ $scope.counter + '" data="progress-new-file'+ $scope.counter + '" attributetypeid="' + attrId + '" valuetype="blob" isrequired="true" name="">' +
            '</span>'+
            '<div class="progress-container">'+
            '<progress value="0" max="100" style="display: none" class=" upload-label progress-new-file'+ $scope.counter + '"></progress>' +
            '</div>' +
            '</div>';
        addButton.before(template);
        document.getElementById('progress-new-file'+ $scope.counter).click();

        $('#progress-new-file'+ $scope.counter).bind('change', function(e) {
            var file = $('input[type=file]');
            if(!file[0].files[0]) {
                return;
            }

            $scope.uploadFile($scope.uploadForm, file[0].files[0], file.attr('attributetypeid'), file.attr('data'), addButton.parent().parent().find('.progress-container'), true);
            $('span.' + file.attr('data')).text( file[0].files[0].name );
            file.parent().text( $filter('translate')('UPLOAD.EDIT') );
            $scope.counter++;
        });


        var file = $('input[type=file]');

        if(!file[0].files[0]) {
            return;
        }


        $scope.uploadFile($scope.uploadForm, file[0].files[0], file.attr('attributetypeid'), file.attr('data'), addButton.parent().parent().find('.progress-container'), true);
        $('span.' + file.attr('data')).text( file[0].files[0].name );
        file.parent().text( $filter('translate')('UPLOAD.EDIT') );

        $scope.counter++;

    }


    $scope.drawFile = function() {
            BorrowerReportsAndDocumentsService.getDocumentsSignature(fileName).then(function(response) {
                $scope.uploadFileTrigger = false;
                $scope.signatureTrigger = true;
                $scope.currentUpload = null;
                $scope.currentSignature = fileName.split('.')[0]+'Signature';

                if (typeof Blob !== "undefined") {
                    $scope.reader = new Blob([response], {"type": 'application/pdf'});
                    $scope.urlCreator = window.URL;
                    $scope.fileURL = $scope.urlCreator.createObjectURL( $scope.reader );
                    $scope.fileName = fileName;
                    document.getElementById("pdfRow").src = $scope.fileURL;

                    if(typeof window.navigator.msSaveOrOpenBlob != 'undefined') {
                        window.navigator.msSaveOrOpenBlob($scope.reader);
                    }
                }

                $('#pdfRow').show();
                $('#imgRow').hide();
                $('#signature').show();
                $scope.$broadcast('loadFile');
            });
    };


    $scope.drawFileWithSignature = function(fileName) {

        $('#pdfRow').hide();
        $('#imgRow').hide();
        $('#signature').hide();
        $('#SignatureText').hide();
        $scope.fileURL = null;

        BorrowerReportsAndDocumentsService.getDocumentsDigitalSignature(fileName).then(function(response) {
            $scope.uploadFileTrigger = false;
            $scope.signatureTrigger = true;
            $scope.currentUpload = null;
            $scope.currentSignature = fileName.split('.')[0]+'Signature';

            if (typeof Blob !== "undefined") {
                $scope.reader = new Blob([response], {"type": 'application/pdf'});
                $scope.urlCreator = window.URL;
                $scope.fileURL = $scope.urlCreator.createObjectURL( $scope.reader );
                $scope.fileName = fileName;
                document.getElementById("pdfRow").src = $scope.fileURL;

                if(typeof window.navigator.msSaveOrOpenBlob != 'undefined') {
                    window.navigator.msSaveOrOpenBlob($scope.reader);
                }
            }

            $('#pdfRow').show();
            $('#imgRow').hide();
            $('#signature').show();
            $('#SignatureText').show();

            $scope.getUserDetails();

            $scope.$broadcast('loadFile');
        });
    };

    $scope.drawUploadedFile = function(attributeValueId, fileName) {
        $('#pdfRow').hide();
        $('#imgRow').hide();
        $('#signature').hide();
        $('#SignatureText').hide();
        $scope.fileURL = null;

        BorrowerReportsAndDocumentsService.getUploadedDocuments(attributeValueId).then(function(response) {

            if (typeof Blob !== "undefined") {
                //$scope.reader = new Blob([response], {"type": 'application/pdf'});
                //$scope.reader = new Blob([response], {"type": response.type});
                $scope.urlCreator = window.URL || window.webkitURL;

                $scope.fileName = fileName;

                switch(response.type) {
                    case 'image/png':
                    case 'image/jpg':
                    case 'image/jpeg':
                    case 'image/gif': {
                        $scope.reader = new Blob([response], {"type": response.type});
                        $scope.fileURL = $scope.urlCreator.createObjectURL( $scope.reader );

                        $('#pdfRow').hide();
                        $('#imgRow').attr({
                            src: $scope.fileURL
                        }).show();

                    }
                        break;

                    case 'application/pdf':
                    case 'application/x-download':
                    case 'application/x-pdf': {
                        $scope.reader = new Blob([response], {"type": 'application/pdf'})
                        $scope.fileURL = $scope.urlCreator.createObjectURL( $scope.reader );

                        $('#imgRow').removeAttr('src').hide();
                        $('#pdfRow').attr({
                            src: $scope.fileURL
                        }).show();

                    }
                        break;

                    default: {
                        $scope.fileType = response.type;
                        $scope.reader = new Blob([response], {"type": response.type});
                    }
                }

                //document.getElementById("pdfRow").src = $scope.fileURL;

                if(typeof window.navigator.msSaveOrOpenBlob != 'undefined') {
                    window.navigator.msSaveOrOpenBlob($scope.reader);
                }
            }

            $scope.$broadcast('loadFile');
        });
    };


    $scope.addChequeCancell = function() {
        $scope.uploadFileTrigger = true;
        $scope.signatureTrigger = false;
        $scope.currentUpload = "CancelledCheque";
        $scope.currentSignature = null;

        $('#pdfRow').hide();
        $('#imgRow').hide();
        $('#signature').hide();
        $('#documentsAndReports').find('.preview .text').text('תצוגה מקדימה של המסמך');
    }

    $scope.addBankPermission = function() {
        $scope.uploadFileTrigger = true;
        $scope.signatureTrigger = false;
        $scope.currentUpload = "BankPermission";
        $scope.currentSignature = null;

        $('#pdfRow').hide();
        $('#imgRow').hide();
        $('#signature').hide();
        $('#documentsAndReports').find('.preview .text').text('תצוגה מקדימה של המסמך');
    }

    $scope.saveSignature = function(data) {
        $('#pdfRow').hide();
        $('#imgRow').hide();
        $('#signature').hide();
        $('#SignatureText').hide();
        $scope.fileURL = null;

        Restangular.all('user/attributes')
            .post([{
                'value': data,
                'attributeTypeID': $scope.borrowerModel.userDetails[$scope.documentType].attributeTypeID
            }])
            .then(function (data) {
                    $scope.drawFileWithSignature($scope.documentType + 'Document');

                    if($scope.documentType == 'AgreementSignature') {
                        $scope.AgreementSignatureDocumentFlag = true;
                    }

                    if($scope.documentType == 'PromissoryNoteSignature') {
                        $scope.PromissoryNoteSignatureDocumentFlag = true;
                    }


                $scope.signatureTrigger = false;
            },
            function (error) {

            });
    }
    $scope.uploadComplete = function() {
        if($scope.signatureLoadAgreement && $scope.signatureLoadPromissoryNote && $scope.uploadForm[0].values.length > 0 && $scope.uploadForm[1].values.length > 0) {
            $('#confirm-upload').modal();
        }
    }
    $scope.saveFile = function() {
        saveAs($scope.reader, decodeURIComponent($scope.fileName));
    }
}]);

creditoControllers.controller('OfflineController', ['$scope', '$rootScope', '$window', '$interval',
    function($scope, $rootScope, $window, $interval) {

        var interval = $interval(function() {

            if(navigator.onLine) {
                $window.history.back();
            }
        }, 2000);
        $interval.cancel(interval);
    }]);

creditoControllers.controller('PasswordController', ['$scope', '$route', '$window', '$timeout', 'Restangular', 'md5', '$location', 'DecodeToken',
    function($scope, $route, $window, $timeout, Restangular, md5, $location, DecodeToken) {

        if(LS.userId) {
            $scope.userId = LS.userId;
        }

        $scope.reset = {
            id: '',
            password: '',
            retrypass: ''
        };


        $scope.showSuccessMessage = false;
        $scope.changePassword = function() {
            Restangular.
                all( ('user/' + $scope.userId + '/password')).
                customPUT({
                    'oldPassword': md5.createHash($scope.oldPassword),
                    'newPassword': md5.createHash($scope.password),
                    'confirmPassword': md5.createHash($scope.retrypass)
                }).
                then(function(data) {
                    $scope.showSuccessMessage = true;
                    $timeout(function(){
                        $scope.showSuccessMessage = false;
                        $location.path('logout');
                    }, 2000);
                }, function(response) {
                    $scope.change.oldPassword.$setValidity('incorrect', false);
                    $timeout(function() {
                        $scope.change.oldPassword.$setValidity('incorrect', true);
                        $scope.oldPassword = '';
                    }, 3000)
                });
        };

        $scope.resetPassword = function () {
            if ($scope.reset.id != '') {
                Restangular.one('password')
                    .remove({userName: $scope.reset.id})
                    .then(function () {
                        $window.location.href = '#/password/reset/confirm';
                    }, function (response) {
                        $scope.restore.IsraelId.$setValidity('idVerification', false);
                        $timeout(function() {
                            $scope.restore.IsraelId.$setValidity('idVerification', true);
                        }, 1000);
                    });
            }
        };

        $scope.confrimReset = function() {
            $scope.showSuccessMessage = false;

            Restangular.all('user/' + $route.current.params.userId + '/password/confirmation')
                .post({}, {
                    token: $route.current.params.token,
                    newPassword: md5.createHash($scope.reset.password)
                })
                .then(function() {
                    $scope.showSuccessMessage = true;

                    $timeout(function () {
                        $scope.showSuccessMessage = false;
                        $location.path('/');
                    }, 1000);
                });
        };
    }]);

creditoControllers.controller('LogoutController', ['$location', '$rootScope', '$route', function($location, $rootScope, $route) {
    LS = {};
    localStorage.removeItem('AllInOne');
    localStorage.setItem('AllInOne', JSON.stringify(LS));

    LS.spouseTrigger = false;
    LS.finishLoanFlag = 0;
    LS.earlyPaymentFlag = 0;
    $rootScope.investorLogoLink = null;
    $rootScope.investorSiteLink = null;
    LS.roles = 'Unauthorized';
    localStorage.setItem('AllInOne', JSON.stringify(LS));

    $location.path("/")
}]);

creditoControllers.controller('EmailConfirmController', ['$scope', '$route', '$window', '$timeout', 'Restangular', '$location',
    function($scope, $route, $window, $timeout, Restangular, $location) {
        Restangular.one('user', $route.current.params.userId).all('email').all('confirmation')
            .post({}, {
                'token': $route.current.params.token
            }).
            then(function(data) {
                $timeout(function() {
                    $location.path('login');
                }, 3000);
            },
            function(error) {
                $timeout(function() {
                    $location.path('login');
                }, 3000);
            });
    }]);

creditoControllers.controller('SmsMessageVerificationController', ['$scope', '$route', '$window', '$timeout', 'Restangular', '$location', 'SmsMessageVerificationService', '$filter', 'CONFIG',
    function($scope, $route, $window, $timeout, Restangular, $location, SmsMessageVerificationService, $filter, CONFIG) {
        $scope.smsCode = null;
        $scope.phone = null;
        $scope.isExists = 0;
        $scope.alert = 0;
        $scope.alertText = null;

        SmsMessageVerificationService.getSmsCode($route.current.params.id);

        $scope.confirmSms = function() {
            SmsMessageVerificationService.confirmation($scope.smsCode, $route.current.params.id).then(function() {
                $scope.alert = 1;
                $scope.alertText = $filter('translate')('SMS.SUCCESS');

                $(window).scrollTo(0, {duration: 300});

                $timeout(function() {
                    $scope.alert = 0;
                    $scope.alertText = null;
                    $location.path('login');
                }, 2000);
            },
            function(e) {
                $scope.serverError = $filter('translate')('ERRORS.SMS.' + e.data.ErrorCode);
                $scope.isExists = 1;
                $(window).scrollTo(0, {duration: CONFIG.SCROLL_TO_UP_DURATION});

                $timeout(function() {
                    $scope.isExists = 0;
                    $scope.serverError = null;
                    $scope.smsCode = null;
                }, 2000);
            });
        };

        $scope.resendSms = function() {
            $scope.smsCode = null;

            SmsMessageVerificationService.getSmsCode($route.current.params.id).then(function(){
                $scope.alert = 1;
                $scope.alertText = $filter('translate')('SMS.CODE_RESENT');
                $(window).scrollTo(0, {duration: CONFIG.SCROLL_TO_UP_DURATION});

                $timeout(function() {
                    $scope.alert = 0;
                    $scope.alertText = null;
                    $scope.smsCode = null;
                }, 2000);
            },
            function(e) {
                $scope.serverError = $filter('translate')('ERRORS.SMS.' + e.data.ErrorCode);
                $scope.isExists = 1;
                $(window).scrollTo(0, {duration: CONFIG.SCROLL_TO_UP_DURATION});
            });
        }
    }]);

creditoControllers.controller('TermsController', ['$window',
    function($window) {

    }]);

creditoControllers.controller('ForbiddenController', ['$window',
    function($window) {
    }]);

creditoControllers.controller('EmailAndPasswordConfirmController', ['$window', '$scope', '$route', 'EmailAndPasswordConfirmService', '$timeout', '$location', function($window, $scope, $route, EmailAndPasswordConfirmService, $timeout, $location){
    $scope.success = false;
    $scope.error = false;
    $scope.changePassword = function() {
        EmailAndPasswordConfirmService.confirmPassword($route.current.params.userId, $route.current.params.emailToken, $route.current.params.passwordToken, $scope.change.retrypass.$viewValue).then(function(data) {
            $scope.success = true;
            $timeout(function(){
                $scope.success = false;
                $location.path('login');
            }, 2000);
        }, function(errors) {
            $scope.error = true;
            $location.path('login');
        });
    }
}]);

creditoControllers.controller('CalculationController', ['$scope', '$rootScope', '$route', '$http', '$timeout', '$filter',
    'UserDetails', 'Restangular', 'cfpLoadingBar', 'CalculationService', 'CONFIG', '$location',
    function($scope, $rootScope, $route, $http, $timeout, $filter, UserDetails, Restangular, cfpLoadingBar, CalculationService, CONFIG, $location) {
        $scope.showResults = false;

        var calculationForm = $('form[name=calculation]');

        $scope.results = {
            interesetPayment: '*',
            monthlyPayment: '*',
            duration: '*',
            payments: {
                graph: '',
                table: ''
            },
            error: '',
            errorMessage: ''
        };

        $scope.tableCollaterals = {};

        $scope.calculationResult = {};

        if(LS.investorSearchModel) {
            $scope.borrower = JSON.parse(LS.investorSearchModel);
        }

        $scope.attributes = {
            id: $route.current.params.userId
        };

        $scope.CollateralModel = [{
            id: 0,
            collateralType: null,
            collateralSize: null,
            fundCategory: null,
            expirationDate: null
        }];
        $scope.collateralRowsCounter = 1;

        $scope.LoanLength = null;
        $scope.LoanType = null;
        $scope.PercentType = null;

        $scope.collateralsData = {
            "collaterals": null,
            "loan": {
                "loanSize": null,
                "loanDuration": null,
                "loanType": null,
                "percentType": null
            }
        };

        $scope.data = {};

        $scope.calculationModel = {
            attributes: {}
        };

        $scope.calculationContainer = $('#calculation');

        Restangular.one('customerattributes/', UserDetails.getUserId())
            .get({ customerId: $scope.attributes.id })
            .then(function(data) {
                $scope.closeError();
                $scope.closeAlert();
                if(data) {
                    $scope.data = data;

                    $scope.CollateralType = _.find(data, 'name', 'CollateralType').optionAttributeValues;
                    $scope.FundCategory = _.find(data, 'name', 'FundCategory').optionAttributeValues;
                    $scope.CollateralModel[0].fundCategory = $scope.FundCategory[2].value;

                    _.each(data, function(item) {
                        var fieldContainer = $scope.calculationContainer.find('input[name='+ item.name +'], select[name='+ item.name +']');
                        var parentSelector = fieldContainer.attr('attributeTypeID', item.attributeTypeID).attr('valueType', item.valueType);

                        $scope.calculationModel.attributes[item.name] = {
                            name: item.name,
                            isChanged: false,
                            valueType: item.valueType,
                            attributeTypeID: item.attributeTypeID
                        };

                        if(item.valueType == "option") {
                            $scope.calculationModel.attributes[item.name].options = [];
                            _.each(item.optionAttributeValues, function(value, i) {
                                $scope.calculationModel.attributes[item.name].options.push({
                                    id: parseInt(value.optionAttributeValueID),
                                    value: $filter('translate')('SELECT_OPTIONS.' + value.value),
                                    untranslatedValue: value.value
                                });
                            });
                        }
                        if (typeof item.values != 'undefined') {
                            if(item.valueType == 'option'){
                                $scope.calculationModel.attributes[item.name].value = {id:parseInt(item.values[0].value)};
                            } else if (item.valueType == 'int') {
                                $scope.calculationModel.attributes[item.name].value = parseFloat(item.values[0].value);
                            } else if(item.valueType == 'decimal'){
                                $scope.calculationModel.attributes[item.name].value = parseInt(item.values[0].value);
                            } else {
                                $scope.calculationModel.attributes[item.name].value = item.values[0].value;
                            }
                        }

                    });
                }

                //get collaterals
                CalculationService.getCollaterals($route.current.params.userId).then(function(response) {
                    if(response.collaterals) {
                        $scope.CollateralModel = response.collaterals.slice(0, 5);

                        _.each($scope.CollateralModel, function(row, i) {
                            _.each(row, function(item, j) {
                                if(j == 'expirationDate') {
                                    $scope.CollateralModel[i].expirationDate = item.split('-').reverse().join('-').toString();
                                }
                            });
                        });

                        $scope.collateralRowsCounter = $scope.CollateralModel.length;
                        $scope.collateralCalculate();
                        $scope.getLoanCalculation();
                    }
                },
                function(response) {
                    if (response.data.ErrorCode == 'CalculationFailedWithMessage') {
                        $scope.serverError = '';
                        if(response.data.ErrorMessage.length > 0) {
                            $scope.serverErrorObj = response.data.ErrorMessage.split('\n');

                            _.each($scope.serverErrorObj, function(error, i) {
                                $scope.serverError += '<div>' + error + '</div><br />';
                            });
                        }
                        $rootScope.isExists = true;
                    } else {
                        $scope.serverError = $filter('translate')('ERRORS.CALCULATION.' + response.data.ErrorCode);
                        $rootScope.isExists = true;
                    }

                    $(window).scrollTo(0, {duration: CONFIG.SCROLL_TO_UP_DURATION});

                });
            });

        $scope.collateralCalculate = function() {
            $scope.emptyData = false;

            _.each($scope.CollateralModel, function(row, i) {
                _.each(row, function(item, j) {
                    if(item == null) {
                        $scope.emptyData = true;
                    }
                });
            });

            $timeout(function() {
                if(typeof $scope.calculationModel.attributes.LoanType.value == 'undefined') {
                    $scope.calculationModel.attributes.LoanType.value = $scope.calculationModel.attributes.LoanType.options[0];
                }

                if(typeof $scope.calculationModel.attributes.PercentType.value == 'undefined') {
                    $scope.calculationModel.attributes.PercentType.value = $scope.calculationModel.attributes.PercentType.options[0];
                }

                if(typeof $scope.calculationModel.attributes.LoanLength.value == 'undefined') {
                    $scope.calculationModel.attributes.LoanLength.value = 1;
                }

                if(typeof $scope.calculationModel.attributes.LoanSize.value == 'undefined') {
                    $scope.calculationModel.attributes.LoanSize.value = 0;
                }

                if(!$scope.emptyData) {
                    $scope.collateralsData = {
                        "collaterals": $scope.CollateralModel,
                        "loan": {
                            "loanSize": $scope.calculationModel.attributes.LoanSize.value,
                            "loanDuration": '' + $scope.calculationModel.attributes.LoanLength.value,
                            "loanType": _.find($scope.calculationModel.attributes.LoanType.options, 'id', $scope.calculationModel.attributes.LoanType.value.id).untranslatedValue,
                            "percentType": _.find($scope.calculationModel.attributes.PercentType.options, 'id', $scope.calculationModel.attributes.PercentType.value.id).untranslatedValue
                        }
                    };

                    if($scope.collateralsData) {
                        $scope.unlinkedCollateralModel = angular.copy($scope.CollateralModel);
                        _.each($scope.unlinkedCollateralModel, function(row, i) {
                            _.each(row, function(item, j) {
                                if(j == 'expirationDate') {
                                    if(item && item.split('-')[0].length == 2) {
                                        $scope.unlinkedCollateralModel[i].expirationDate = item.split('-').reverse().join('-').toString();
                                    }
                                }

                            });
                        });

                        $scope.collateralsData.collaterals = $scope.unlinkedCollateralModel;

                        CalculationService.collateralCalculate($route.current.params.userId, $scope.collateralsData).then(function(data) {
                            $scope.emptyData = false;
                            $scope.calculationResult = data;
                        });
                    }
                }
            }, 200);
        };

        $scope.addCollateralRow = function() {
            if($scope.collateralRowsCounter != CONFIG.MAX_COLLATERALS_ROW) {
                $scope.CollateralModel.push({
                    collateralType: null,
                    collateralSize: null,
                    fundCategory: null,
                    expirationDate: null
                });

                $scope.CollateralModel[$scope.collateralRowsCounter].fundCategory = $scope.FundCategory[2].value
                $scope.collateralRowsCounter++;
            }
        };

        $scope.removeCollateralRow = function(i) {

            if(typeof $scope.CollateralModel[i].id != 'undefined') {
                CalculationService.removeCollateralRow($scope.CollateralModel[i].id).then(function() {
                    $scope.collateralCalculate();
                },
                function(e) {
                    console.log('errors', e);
                });
            }

            $scope.CollateralModel.splice(i, 1);
            $scope.tableCollaterals = {};
            $scope.showResults = false;
            $scope.collateralRowsCounter--;

            if($scope.collateralRowsCounter == 1 && $scope.emptyData) {
                $scope.calculationResult = {};
            }

            $scope.collateralCalculate();
        };

        $scope.getFormData = function(jqElement) {
            var form = jqElement.find('input, select'),
                formObject = [];

            _.each(form, function(element, i) {
                var jqElem = $(element);

                if(jqElem.prop('tagName') == "SELECT" && isNaN(jqElem.val())) return;
                if(!jqElem.val()) return;
                if(!jqElem.attr('attributetypeid')) return;

                formObject.push({
                    'name' : element.name,
                    'value': (jqElem.attr('valuetype') == "int") ? jqElem.val().replace(/[\,]/g, '') : jqElem.val(),
                    'attributeTypeID': jqElem.attr('attributetypeid'),
                    'valueType': jqElem.attr('valuetype')
                });
            });

            return formObject;
        };

        $scope.getCalculations = function() {
            $scope.formData = $scope.getFormData(calculationForm);

            _.find($scope.formData, 'name', 'SecuritySize').value = $scope.calculationResult.summary.availableAmount;

            CalculationService.setCustomersAttributes(UserDetails.getUserId(), $scope.formData, $scope.attributes.id).then(function() {
                $scope.getLoanCalculation();
            });
        };

        $scope.saveTextAsFile = function(fileNameToSaveAs, textToWrite) {
            var ie = navigator.userAgent.match(/MSIE\s([\d.]+)/),
                ie11 = navigator.userAgent.match(/Trident\/7.0/) && navigator.userAgent.match(/rv:11/),
                ieVer=(ie ? ie[1] : (ie11 ? 11 : -1));

            if (ie && ieVer<10) {
                console.log("No blobs on IE ver<10");
                return;
            }

            var textFileAsBlob = new Blob([textToWrite], {
                type: 'application/pdf'
            });

            if (ie || ie11) {
                window.navigator.msSaveBlob(textFileAsBlob, fileNameToSaveAs);
            } else {
                var downloadLink = document.createElement("a");
                downloadLink.download = fileNameToSaveAs;
                downloadLink.innerHTML = "Download File";

                if (window.webkitURL != null) {
                    // Chrome allows the link to be clicked
                    // without actually adding it to the DOM.
                    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
                } else {
                    // Firefox requires the link to be added to the DOM
                    // before it can be clicked.
                    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                    downloadLink.onclick = destroyClickedElement;
                    downloadLink.style.display = "none";
                    document.body.appendChild(downloadLink);
                }

                downloadLink.click();
            }
            function destroyClickedElement(event) {
                document.body.removeChild(event.target);
            }
        };

        $scope.getReport = function() {
            CalculationService.getReport(UserDetails.getUserId(), $scope.attributes.id, $scope.changedCollateralsData).then(function(response) {
                $scope.saveTextAsFile('report.pdf', response);
            });
        };

        $scope.getLoanCalculation = function() {

            $scope.collateralsData = {
                "collaterals": $scope.CollateralModel,
                "loan": {
                    "loanSize": $scope.calculationModel.attributes.LoanSize.value,
                    "loanDuration": $scope.calculationModel.attributes.LoanLength.value,
                    "loanType": _.find($scope.calculationModel.attributes.LoanType.options, 'id', $scope.calculationModel.attributes.LoanType.value.id).untranslatedValue,
                    "percentType": _.find($scope.calculationModel.attributes.PercentType.options, 'id', $scope.calculationModel.attributes.PercentType.value.id).untranslatedValue
                }
            };

            $scope.changedCollateralsData = angular.copy($scope.collateralsData);

            _.each($scope.changedCollateralsData.collaterals, function(row, i) {
                _.each(row, function(item, j) {
                    if(j == 'expirationDate') {
                        $scope.changedCollateralsData.collaterals[i].expirationDate = item.split('-').reverse().join('-')
                    }
                })
            });

            CalculationService.loanCalculate($scope.changedCollateralsData, UserDetails.getUserId(), $route.current.params.userId)
                .then(function(data) {
                    $scope.closeError();
                    $scope.closeAlert();
                    $timeout(function() {
                        $scope.results.error = '';
                        $scope.results.errorMessage = '';
                        $scope.showResults = true;
                        $scope.results.interesetPayment = '' + data.interesetPayment;
                        $scope.results.maxInteresetPayment = '' + data.maxInteresetPayment;
                        $scope.results.monthlyPayment = '' + data.monthlyPayment;
                        $scope.results.duration = '' + data.duration;
                        $scope.results.payments.graph = data.graphAnswers;
                        $scope.results.payments.table = data.tableAnswers;

                        $scope.loanPercentType = $scope.changedCollateralsData.loan.percentType;
                        $scope.tableCollaterals = data.tableCollaterals;
                    }, 500)
                    if(typeof(data.messages) != "undefined" && data.messages.length > 0){
                        $scope.results.alert = true;
                        $scope.results.alertMessage = [];
                        for (var i = 0; i < data.messages.length; i++){
                            $scope.results.alertMessages[i] = data.messages[i].text ;
                        }

                        $(window).scrollTo(0, {duration: 300});
                    }

                    //get collaterals
                    CalculationService.getCollaterals($route.current.params.userId).then(function(response) {
                        if(response.collaterals) {
                            $scope.CollateralModel = response.collaterals.slice(0, 5);

                            _.each($scope.CollateralModel, function(row, i) {
                                _.each(row, function(item, j) {
                                    if(j == 'expirationDate') {
                                        $scope.CollateralModel[i].expirationDate = item.split('-').reverse().join('-').toString();
                                    }
                                });
                            });

                            $scope.collateralRowsCounter = $scope.CollateralModel.length;
                        }
                    });
                }, function(response) {
                    if (response.data.ErrorCode == 'CalculationFailedWithMessage') {
                        $scope.serverError = '';
                        if(response.data.ErrorMessage.length > 0) {
                            $scope.serverErrorObj = response.data.ErrorMessage.split('\n');

                            _.each($scope.serverErrorObj, function(error, i) {
                                $scope.serverError += '<div>' + error + '</div><br />';
                            });
                        }
                        $rootScope.isExists = true;
                    } else {
                        $scope.serverError = $filter('translate')('ERRORS.CALCULATION.' + response.data.ErrorCode);
                        $rootScope.isExists = true;
                    }

                    $scope.results.error = response.data;
                    $scope.results.errorMessage = response.data.ErrorMessage;
                    $scope.showResults = false;

                    $(window).scrollTo(0, {duration: CONFIG.SCROLL_TO_UP_DURATION});

                    $timeout(function() {
                        cfpLoadingBar.complete();
                        $scope.showResults = false;
                    }, 1000);

                });
        };

        $scope.closeError = function() {
            $scope.results.error = '';
            $scope.results.errorMessage = '';
            $rootScope.isExists = false;
            $scope.serverError = null;
        }
        $scope.closeAlert = function() {
            $scope.results.alert = false;
            $scope.results.alertMessages = [];
        }

        $scope.showModalArrearsBorrowers = function() {
            $('#arrearsBorrowers').fadeIn();
        }

        $scope.closeModalArrearsBorrowers = function() {
            $('#arrearsBorrowers').fadeOut();
        }

        $scope.borrowerDetails = function(borrowerId) {
            $location.path('investor/borrower-details/' + borrowerId);
        }

    }]);

creditoControllers.controller('SearchController', ['$scope', '$rootScope', '$http', 'Restangular', 'UserDetails', '$location', '$timeout', '$filter', '$route', 'CooperativeLoansService', 'ReportsAndDocumentsService', 'InvestorLoansService',
    function($scope, $rootScope, $http, Restangular, UserDetails, $location, $timeout, $filter, $route, CooperativeLoansService, ReportsAndDocumentsService, InvestorLoansService) {

        $scope.getBorrowerPayments = function(id) {
            InvestorLoansService.getBorrowerPayments(id).then(function(response) {
                $scope.borrowerPayments = response;
            })
        };

        $scope.convertMonth = function(string){
            return (parseInt(string.split('')[0]) == 0) ? parseInt(string.split('')[1])-1 : parseInt(string)-1;
        };

        $scope.convertDay = function(string){
            return (parseInt(string.split('')[0]) == 0) ? parseInt(string.split('')[1]) : parseInt(string);
        };

        if(LS.userId) {
            $scope.userId = LS.userId;
        }

        Restangular.one('investorCustomers/' + JSON.parse(LS.user).id.toString())
            .get()
            .then(function(data) {
                _.each(data, function(item) {
                    var joinDateArray = item.joinDate.split('-');
                    if(item.personalScoreCreateDate.length > 0) {
                        item.personalScoreCreateDate = new Date(item.personalScoreCreateDate);
                    } else {
                        item.personalScoreCreateDate = new Date(0);
                    }
                    item.joinDate = new Date( joinDateArray[2], $scope.convertMonth(joinDateArray[1]), $scope.convertDay(joinDateArray[0]));
                });

                $scope.borrowersList = data;

                //Filters
                $scope.sortType = 'joinDate'; //default sort type
                $scope.sortReverse = true;  //default sort order
                $scope.searchBorrower = '';  //default search/filter term

            }, function(error) {

            });

        $scope.changeStatus = function(borrower) {
            LS.borrowerData = JSON.stringify(borrower);
            localStorage.setItem('AllInOne', JSON.stringify(LS));
        };

        $scope.showCompletedBorrowers = (LS.showCompletedBorrowers) ? LS.showCompletedBorrowers : false;
        $scope.saveBorrowersFilter = function(e) {
            LS.showCompletedBorrowers = e.showCompletedBorrowers;
            localStorage.setItem('AllInOne', JSON.stringify(LS));
        };

        $scope.calculate = function() {
            if(LS.borrowerDetails.status === 'LoanReady' && LS.borrowerDetails.redLightNote.length == 0) {

                $scope.searchModel = {
                    personalId: '',
                    error: ''
                };

                Restangular.one('user/' + UserDetails.getUserId() + '?personalId=' + (typeof LS.borrowerDetails.userName !== 'undefined' ? LS.borrowerDetails.userName : $scope.searchModel.personalId))
                    .get()
                    .then(function(data) {
                        $scope.searchModel.found = true;
                        $scope.searchModel.error = "";

                        $scope.searchModel.customerId = data.id;
                        $scope.searchModel.fname = data.firstName;
                        $scope.searchModel.lname = data.lastName;
                        $scope.searchModel.email = data.email;
                        $scope.searchModel.phoneNumber = data.phoneNumber;
                        $scope.searchModel.status = data.status;
                        $scope.searchModel.redLightNote = (data.redLightNote.length == 0) ? $filter('translate')('SELECT_OPTIONS.No') : $filter('translate')('SELECT_OPTIONS.Yes');
                        $scope.searchModel.redLightFlag = data.redLightNote.length > 0 ? 1:0;
                        $scope.searchModel.personalId = (typeof LS.borrowerDetails.userName !== 'undefined' ? LS.borrowerDetails.userName : $scope.searchModel.personalId);

                        LS.investorSearchModel = JSON.stringify($scope.searchModel);
                        localStorage.setItem('AllInOne', JSON.stringify(LS));

                        $timeout(function() {
                            $location.path("/calculation/" + LS.borrowerDetails.id);
                        }, 500);

                    }, function(error) {
                        $scope.searchModel.found = false;
                        $scope.searchModel.error = "User not found";
                    });
            } else {
                return false;
            }
        };

        $scope.borrowerDetails = function(element) {
            $scope.loanClicked = true;
            $scope.borrowerStatus = element.borrower.status;

            LS.borrowerDetails = element.borrower;
            localStorage.setItem('AllInOne', JSON.stringify(LS));

            $scope.id = LS.borrowerDetails.id;

            $('.nav-tabs li, .tab-pane').removeClass('active');
            $('.borrowers-details').addClass('active');

            CooperativeLoansService.getBorrower($scope.id).then(function (response) {

                $scope.borrowerModel = {
                    userDetails: {}
                };

                _.each(response, function(item) {
                    $scope.borrowerModel.userDetails[item.name] = {
                        name: item.name,
                        isChanged: false,
                        valueType: item.valueType,
                        attributeTypeID: item.attributeTypeID
                    };

                    if(item.valueType == "option") {

                        if(typeof item.values != 'undefined') {
                            var optionAttrValue = _.find(item.optionAttributeValues, 'optionAttributeValueID', parseInt(item.values[0].value));

                            if(typeof optionAttrValue != 'undefined') {
                                $scope.borrowerModel.userDetails[item.name] = $filter('translate')('SELECT_OPTIONS.' + optionAttrValue.value);
                            } else {
                                $scope.borrowerModel.userDetails[item.name] = '';
                            }

                        } else {
                            $scope.borrowerModel.userDetails[item.name] = '';
                        }
                    }



                    if (typeof item.values != 'undefined') {
                        if(item.valueType == 'option'){
                            $scope.borrowerModel.userDetails[item.name].value = {id:parseInt(item.values[0].value)};
                        } else if (item.valueType == 'int') {
                            $scope.borrowerModel.userDetails[item.name].value = parseFloat(item.values[0].value);
                        } else {
                            $scope.borrowerModel.userDetails[item.name].value = item.values[0].value;
                        }
                    }
                });
            });

            CooperativeLoansService.getBorrowerBankAccount($scope.id).then(function(response) {
                $scope.bankAccountModel = {};

                _.each(response, function(item) {
                    $scope.bankAccountModel[item.name] = {
                        name: item.name,
                        isChanged: false,
                        valueType: item.valueType,
                        attributeTypeID: item.attributeTypeID
                    };

                    if(item.valueType == "option") {

                        if(typeof item.values != 'undefined') {
                            var optionAttrValue = _.find(item.optionAttributeValues, 'optionAttributeValueID', parseInt(item.values[0].value));

                            if(typeof optionAttrValue != 'undefined') {
                                $scope.bankAccountModel[item.name] = $filter('translate')('SELECT_OPTIONS.' + optionAttrValue.value);
                            } else {
                                $scope.bankAccountModel[item.name] = '';
                            }

                        } else {
                            $scope.bankAccountModel[item.name] = '';
                        }
                    }



                    if (typeof item.values != 'undefined') {
                        if(item.valueType == 'option'){
                            $scope.bankAccountModel[item.name].value = {id:parseInt(item.values[0].value)};
                        } else if (item.valueType == 'int') {
                            $scope.bankAccountModel[item.name].value = parseFloat(item.values[0].value);
                        } else {
                            $scope.bankAccountModel[item.name].value = item.values[0].value;
                        }
                    }
                });
            });

            $scope.getBorrowersDocuments = function() {
                CooperativeLoansService.getBorrowerDocuments($scope.id).then(function(response) {
                    $scope.files = response;
                });
            };

            $scope.downloadFile = function(attributeValueId, fileName) {
                ReportsAndDocumentsService.getFile(attributeValueId).then(function(response) {
                    $scope.fileType = response.type;
                    $scope.reader = new Blob([response], {"type": response.type});
                    saveAs($scope.reader, decodeURIComponent(fileName));
                });
            };

            $scope.previewFile = function(attributeValueId, fileName) {
                ReportsAndDocumentsService.getFile(attributeValueId).then(function(response) {
                    $scope.fileType = response.type;
                    $scope.reader = new Blob([response], {"type": response.type});
                    $scope.urlCreator = window.URL || window.webkitURL;
                    $scope.fileURL = $scope.urlCreator.createObjectURL( $scope.reader );

                    $('.save').show();

                    switch(response.type) {
                        case 'image/png':
                        case 'image/jpg':
                        case 'image/jpeg':
                        case 'image/gif': {
                            $('#pdfRow').removeAttr('src').hide();
                            $('#imgRow').attr({
                                src: $scope.fileURL
                            }).show();
                        }
                            break;

                        case 'application/pdf':
                        case 'application/x-pdf': {
                            $('#imgRow').removeAttr('src').hide();
                            $('#pdfRow').attr({
                                src: $scope.fileURL
                            }).show();
                        }
                            break;

                        default: {
                            $scope.fileType = response.type;
                            $scope.reader = new Blob([response], {"type": response.type});
                            saveAs($scope.reader, decodeURIComponent(fileName));
                        }
                    }
                });
            }
        };


        if(!LS.saveAccordionTabsState || LS.saveAccordionTabsState.length == 0) {
            LS.saveAccordionTabsState = [{
                id: 'PersonalInfo'
            }];
        }

        _.each(LS.saveAccordionTabsState, function(item, i) {
           $('#' + item.id).addClass('in');
        });

        $scope.saveAccordionTabsState = function(rowId) {

            $scope.isSaved = _.find(LS.saveAccordionTabsState, 'id', rowId);

            if(!$scope.isSaved) {
                LS.saveAccordionTabsState.push({
                    id: rowId
                })
            } else {
                LS.saveAccordionTabsState = _.without(LS.saveAccordionTabsState, _.findWhere(LS.saveAccordionTabsState, {id: rowId}));
            }

            localStorage.setItem('AllInOne', JSON.stringify(LS));
        }
    }]);

creditoControllers.controller('ChangeBorrowerStatusController', ['$scope', 'Restangular', '$routeParams', '$location', '$filter',
    function($scope, Restangular, $routeParams, $location, $filter) {
        $scope.borrower = JSON.parse(LS.borrowerData);

        $scope.statuses = [
            {name: $filter('translate')('BUTTONS.CHANGE'), value: ''},
            {name: $filter('translate')('SEARCH.NotRelevant'), value: 'NotRelevant'},
            {name: $filter('translate')('SEARCH.LoanCompleted'), value: 'LoanCompleted'}
        ];
        $scope.statusModel = $scope.statuses[0].value;

        $('#changeStatus').find('option[value='+ $scope.borrower.status +']').attr({'selected': 'selected'});

        $scope.changeStatus = function(backToPrevious) {
            $scope.showSuccessMessage = false;
            Restangular
                .all('borrowerstatus/' + parseInt($scope.borrower.id) +'?status=' + ( (backToPrevious) ? 'BackToPrevious' : $scope.statusModel) )
                .post()
                .then(function() {
                    $scope.showSuccessMessage = true;

                    setTimeout(function () {
                        $scope.showSuccessMessage = false;
                        delete LS.borrowerData;
                        localStorage.setItem('AllInOne', JSON.stringify(LS));
                        $location.path('investor/search');
                    }, 500);

                }, function(response) {});
        };

        $scope.backToBT = function() {
            delete LS.borrowerData;
            localStorage.setItem('AllInOne', JSON.stringify(LS));
            $location.path('investor/search');
        }
    }]);

creditoControllers.controller('InvestorConfigCollateralsController', ['$scope', '$timeout', 'InvestorConfigService', 'CONFIG', function($scope, $timeout, InvestorConfigService, CONFIG) {
    $scope.collateralsConfigModel = {};

    InvestorConfigService.getCollateralsConfig().then(function(response) {
        $scope.collateralsConfigModel = response;
    });

    $scope.collateralConfigSubmit = function(parentIndex, index) {
        $scope.data = [];

        _.each($scope.collateralsConfigModel[parentIndex].subCategories[index].values, function(row, i) {
            $scope.data.push({
                Id: row.id,
                MaxLoanDurationMonths: row.maxLoanDurationMonths,
                MinLoanAmount: row.minLoanAmount,
                MaxLoanAmount: row.maxLoanAmount,
                MinLoanAmountInPercent: row.minLoanAmountInPercent,
                MaxLoanAmountInPercent: row.maxLoanAmountInPercent
            });
        });

        InvestorConfigService.submitCollateralConfig($scope.data).then(function(response) {
            $scope.savedSuccess = true;
            $(window).scrollTo(0, {duration: CONFIG.SCROLL_TO_UP_DURATION});
            $timeout(function() {
                $scope.savedSuccess = false;
            }, 2000);
        });
    }
}]);

creditoControllers.controller('InvestorConfigLoanController', ['$scope', '$timeout', 'InvestorConfigService', 'CONFIG',
    function($scope, $timeout, InvestorConfigService, CONFIG) {
        $scope.loanConfigModel = {};
        $scope.data = [];


        InvestorConfigService.getLoanConfig().then(function(response) {
            $scope.loanConfigModel = response;
        });

        $scope.loanConfigSubmit = function(i) {
            _.each($scope.loanConfigModel[i].values, function(row) {
                $scope.data.push({
                    Id: row.id,
                    minLoanAmountInPercent: row.minLoanAmountInPercent,
                    minLoanAmount: row.minLoanAmount,
                    maxLoanDurationMonths: row.maxLoanDurationMonths,
                    maxLoanAmountInPercent: row.maxLoanAmountInPercent,
                    maxLoanAmount: row.maxLoanAmount,
                    loanType: row.loanType
                });

                InvestorConfigService.submitLoanConfig($scope.data).then(function(response) {
                    $scope.savedSuccess = true;
                    $(window).scrollTo(0, {duration: CONFIG.SCROLL_TO_UP_DURATION});
                    $timeout(function() {
                        $scope.savedSuccess = false;
                    }, 2000);
                });
            });
        }
    }]);

creditoControllers.controller('InvestorConfigGeneralController', ['$scope', '$timeout', 'InvestorConfigService', '$location', '$filter',
    function($scope, $timeout, InvestorConfigService, $location, $filter) {
        $scope.configGeneralPage = $('#configGeneralPage');
        $scope.investorAttributesModel = {
            attributes: {}
        };

        $scope.RedLightsConditions = [
            {name: 'לא', value: 'False'},
            {name: 'כן', value: 'True'}
        ];

        $('#changeRedLightsConditions').find('option[value='+ $scope.RedLightsConditions.value +']').attr({'selected': 'selected'});

        InvestorConfigService.getInvestorAttributes().then(function(response) {
            $scope.showSuccessMessage = false;
            $scope.investorAttributes = response;

            $scope.redLightsNoteObj = _.find($scope.investorAttributes, 'name', 'IgnoreRedLightNote');

            if(typeof $scope.redLightsNoteObj.values != 'undefined') {
                $scope.redLightsModel = $scope.redLightsNoteObj.values[0].value
            }

            _.each($scope.investorAttributes, function(item) {
                var fieldContainer = $scope.configGeneralPage.find('input[name='+ item.name +'], select[name='+ item.name +']');
                var parentSelector = fieldContainer.attr('attributeTypeID', item.attributeTypeID).attr('valueType', item.valueType);

                $scope.investorAttributesModel.attributes[item.name] = {
                    name: item.name,
                    isChanged: false,
                    valueType: item.valueType,
                    attributeTypeID: item.attributeTypeID
                };

                if(item.valueType == "option") {
                    $scope.calculationModel.attributes[item.name].options = [];
                    _.each(item.optionAttributeValues, function(value, i) {
                        $scope.investorAttributesModel.attributes[item.name].options.push({
                            id: parseInt(value.optionAttributeValueID),
                            value: $filter('translate')('SELECT_OPTIONS.' + value.value),
                            untranslatedValue: value.value
                        });
                    });
                }
                if (typeof item.values != 'undefined') {
                    if(item.valueType == 'option'){
                        $scope.investorAttributesModel.attributes[item.name].value = {id:parseInt(item.values[0].value)};
                    } else if (item.valueType == 'int') {
                        $scope.investorAttributesModel.attributes[item.name].value = parseFloat(item.values[0].value);
                    } else if(item.valueType == 'decimal'){
                        $scope.investorAttributesModel.attributes[item.name].value = parseInt(item.values[0].value);
                    } else {
                        $scope.investorAttributesModel.attributes[item.name].value = item.values[0].value;
                    }
                }
            });
        });

        $scope.saveLoanConditions = function() {
            $scope.loanConditions = [];

            _.each( $scope.investorAttributesModel.attributes, function(item, i) {
                if(i == 'MinLoanPercentDiff') {
                    var value = (item.valueType == 'option') ? item.value.id : item.value;

                    $scope.loanConditions.push({
                        'value': '' + value,
                        'attributeTypeID': item.attributeTypeID
                    });
                }

                if(i == 'IgnoreRedLightNote') {
                    $scope.loanConditions.push({
                        'value': $scope.redLightsModel,
                        'attributeTypeID': item.attributeTypeID
                    });
                }
            });

            InvestorConfigService.saveAttributes($scope.loanConditions).then(function(response) {
                $scope.showSuccessMessage = true;
                $timeout(function() {
                    $scope.showSuccessMessage = false;
                }, 2000)
            });
        };


        $scope.changeReportPassword = function() {
            InvestorConfigService.changeReportPassword($scope.oldPassword, $scope.password, $scope.retrypass).then(function(data) {
                $scope.showSuccessMessagePassword = true;
                $timeout(function() {
                    $scope.showSuccessMessagePassword = false;
                }, 2000);
            }, function(response) {
                $scope.change.oldPassword.$setValidity('incorrect', false);
                $timeout(function() {
                    $scope.change.oldPassword.$setValidity('incorrect', true);
                    $scope.oldPassword = '';
                }, 3000);
            });
        }

    }]);

creditoControllers.controller('BorrowerDetailsController', ['$scope', 'CooperativeLoansService', '$filter', 'ReportsAndDocumentsService', '$route', '$window',
    function($scope, CooperativeLoansService, $filter, ReportsAndDocumentsService, $route, $window){

        $scope.id = $route.current.params.borrowerId;

        $('.nav-tabs li, .tab-pane').removeClass('active');
        $('.borrowers-details').addClass('active');

        CooperativeLoansService.getBorrower($scope.id).then(function (response) {

            $scope.borrowerModel = {
                userDetails: {}
            };

            _.each(response, function(item) {
                $scope.borrowerModel.userDetails[item.name] = {
                    name: item.name,
                    isChanged: false,
                    valueType: item.valueType,
                    attributeTypeID: item.attributeTypeID
                };

                if(item.valueType == "option") {

                    if(typeof item.values != 'undefined') {
                        var optionAttrValue = _.find(item.optionAttributeValues, 'optionAttributeValueID', parseInt(item.values[0].value));

                        if(typeof optionAttrValue != 'undefined') {
                            $scope.borrowerModel.userDetails[item.name] = $filter('translate')('SELECT_OPTIONS.' + optionAttrValue.value);
                        } else {
                            $scope.borrowerModel.userDetails[item.name] = '';
                        }

                    } else {
                        $scope.borrowerModel.userDetails[item.name] = '';
                    }
                }



                if (typeof item.values != 'undefined') {
                    if(item.valueType == 'option'){
                        $scope.borrowerModel.userDetails[item.name].value = {id:parseInt(item.values[0].value)};
                    } else if (item.valueType == 'int') {
                        $scope.borrowerModel.userDetails[item.name].value = parseFloat(item.values[0].value);
                    } else {
                        $scope.borrowerModel.userDetails[item.name].value = item.values[0].value;
                    }
                }
            });
        });

        CooperativeLoansService.getBorrowerBankAccount($scope.id).then(function(response) {
            $scope.bankAccountModel = {};

            _.each(response, function(item) {
                $scope.bankAccountModel[item.name] = {
                    name: item.name,
                    isChanged: false,
                    valueType: item.valueType,
                    attributeTypeID: item.attributeTypeID
                };

                if(item.valueType == "option") {

                    if(typeof item.values != 'undefined') {
                        var optionAttrValue = _.find(item.optionAttributeValues, 'optionAttributeValueID', parseInt(item.values[0].value));

                        if(typeof optionAttrValue != 'undefined') {
                            $scope.bankAccountModel[item.name] = $filter('translate')('SELECT_OPTIONS.' + optionAttrValue.value);
                        } else {
                            $scope.bankAccountModel[item.name] = '';
                        }

                    } else {
                        $scope.bankAccountModel[item.name] = '';
                    }
                }



                if (typeof item.values != 'undefined') {
                    if(item.valueType == 'option'){
                        $scope.bankAccountModel[item.name].value = {id:parseInt(item.values[0].value)};
                    } else if (item.valueType == 'int') {
                        $scope.bankAccountModel[item.name].value = parseFloat(item.values[0].value);
                    } else {
                        $scope.bankAccountModel[item.name].value = item.values[0].value;
                    }
                }
            });
        });

        $scope.getBorrowersDocuments = function() {
            CooperativeLoansService.getBorrowerDocuments($scope.id).then(function(response) {
                $scope.files = response;
            });
        };

        $scope.downloadFile = function(attributeValueId, fileName) {
            ReportsAndDocumentsService.getFile(attributeValueId).then(function(response) {
                $scope.fileType = response.type;
                $scope.reader = new Blob([response], {"type": response.type});
                saveAs($scope.reader, decodeURIComponent(fileName));
            });
        };

        $scope.previewFile = function(attributeValueId, fileName) {
            ReportsAndDocumentsService.getFile(attributeValueId).then(function(response) {
                $scope.fileType = response.type;
                $scope.reader = new Blob([response], {"type": response.type});
                $scope.urlCreator = window.URL || window.webkitURL;
                $scope.fileURL = $scope.urlCreator.createObjectURL( $scope.reader );

                $('.save').show();

                switch(response.type) {
                    case 'image/png':
                    case 'image/jpg':
                    case 'image/jpeg':
                    case 'image/gif': {
                        $('#pdfRow').removeAttr('src').hide();
                        $('#imgRow').attr({
                            src: $scope.fileURL
                        }).show();
                    }
                        break;

                    case 'application/pdf':
                    case 'application/x-pdf': {
                        $('#imgRow').removeAttr('src').hide();
                        $('#pdfRow').attr({
                            src: $scope.fileURL
                        }).show();
                    }
                        break;

                    default: {
                        $scope.fileType = response.type;
                        $scope.reader = new Blob([response], {"type": response.type});
                        saveAs($scope.reader, decodeURIComponent(fileName));
                    }
                }
            });
        }

        if(!LS.saveAccordionTabsState || LS.saveAccordionTabsState.length == 0) {
            LS.saveAccordionTabsState = [{
                id: 'PersonalInfo'
            }];
        }

        _.each(LS.saveAccordionTabsState, function(item, i) {
            $('#' + item.id).addClass('in');
        });

        $scope.saveAccordionTabsState = function(rowId) {

            $scope.isSaved = _.find(LS.saveAccordionTabsState, 'id', rowId);

            if(!$scope.isSaved) {
                LS.saveAccordionTabsState.push({
                    id: rowId
                })
            } else {
                LS.saveAccordionTabsState = _.without(LS.saveAccordionTabsState, _.findWhere(LS.saveAccordionTabsState, {id: rowId}));
            }

            localStorage.setItem('AllInOne', JSON.stringify(LS));
        }

        $scope.back = function() {
            $window.history.back();
        }
    }]);

creditoControllers.controller('InvestorStatusController', ['$scope','InvestorStatusService', '$filter', '$route', '$window',function($scope, InvestorStatusService,  $filter,  $route, $window){
    InvestorStatusService.getStatus().then(function(response) {
        $scope.statusSummary = response;
    }, function(error) {
        console.log(error)
    });
    InvestorStatusService.getPortfolioInfo().then(function(response) {
        $scope.portfolioInfo = response;
    }, function(error) {
        console.log(error)
    });
}]);

creditoControllers.controller('InvestorCashFlowController', ['$scope', 'InvestorStatusService', 'CashFlowService',
    function($scope, InvestorStatusService, CashFlowService) {
        InvestorStatusService.getPortfolioInfo().then(function(response) {
            $scope.portfolioInfo = response;
        }, function(error) {
            console.log(error);
        });

        CashFlowService.getCashFlow().then(function(response){
            $scope.cashFlowModel = response;
        });
}]);

creditoControllers.controller('InvestorStatisticsController', ['$scope', 'InvestorStatisticsService', 'InvestorStatusService',
    function($scope, InvestorStatisticsService, InvestorStatusService) {

        InvestorStatusService.getPortfolioInfo().then(function(response) {
            $scope.portfolioInfo = response;
        }, function(error) {
            console.log(error);
        });

        InvestorStatisticsService.getStatistics().then(function(response) {
            $scope.statisticsModel = response;
        });
}]);

creditoControllers.controller('InvestorReportAndDocumentsController', ['$scope', 'BorrowerReportsAndDocumentsService',
    function($scope, BorrowerReportsAndDocumentsService) {
        $scope.drawFile = function(fileName, mimeType) {

            BorrowerReportsAndDocumentsService.getFileFromGoogle(fileName).then(function(response) {

                if (typeof Blob !== "undefined") {
                    $scope.reader = new Blob([response], {"type": mimeType});
                    $scope.urlCreator = window.URL;
                    $scope.fileURL = $scope.urlCreator.createObjectURL( $scope.reader );
                    $scope.fileName = fileName;
                    document.getElementById("pdfRow").src = $scope.fileURL;

                    if(typeof window.navigator.msSaveOrOpenBlob != 'undefined') {
                        window.navigator.msSaveOrOpenBlob($scope.reader);
                    }

                }

                switch(mimeType) {
                    case 'image/png':
                    case 'image/jpg':
                    case 'image/bmp':
                    case 'image/jpeg': {
                        $('#pdfRow').removeAttr('src').hide();
                        $('#imgRow').attr({
                            src: $scope.fileURL
                        }).show();
                    }
                        break;

                    case 'application/pdf':
                    case 'application/x-pdf': {
                        $('#imgRow').removeAttr('src').hide();
                        $('#pdfRow').attr({
                            src: $scope.fileURL
                        }).show();
                    }
                }

            });
        };

        $scope.saveFile = function() {
            saveAs($scope.reader, decodeURIComponent($scope.fileName));
        }
}]);

creditoControllers.controller('InvestorLoansController', ['$scope', 'InvestorLoansService', 'CooperativeLoansService', '$filter', '$route', 'ReportsAndDocumentsService', '$location',
    function($scope, InvestorLoansService, CooperativeLoansService, $filter, $route, ReportsAndDocumentsService, $location) {

        $scope.investorId = JSON.parse(LS.user).id;
        $scope.filterStatus = $location.path().split('/')[3] || null;

        InvestorLoansService.getBorrowersList($scope.investorId).then(function(data) {
            $scope.borrowersList = data;
            //Filters
            $scope.sortType = 'joinDate'; //default sort type
            $scope.sortReverse = true;  //default sort order
            $scope.searchBorrower = '';  //default search/filter term

        }, function(error) {
           console.log('e', error);
        });

        $scope.borrowerDetails = function(element) {
            $scope.loanClicked = true;

            $scope.clickedBorrowerId = element.borrower.borrowerId

            $scope.borrowerStatus = element.borrower.status;

            LS.borrowerDetails = element.borrower;
            localStorage.setItem('AllInOne', JSON.stringify(LS));

            $scope.borrowerId = LS.borrowerDetails.borrowerId;

            $('.nav-tabs li, .tab-pane').removeClass('active');
            $('.borrowers-details').addClass('active');

            CooperativeLoansService.getBorrower($scope.borrowerId).then(function (response) {

                $scope.borrowerModel = {
                    userDetails: {}
                };

                _.each(response, function(item) {
                    $scope.borrowerModel.userDetails[item.name] = {
                        name: item.name,
                        isChanged: false,
                        valueType: item.valueType,
                        attributeTypeID: item.attributeTypeID
                    };

                    if(item.valueType == "option") {

                        if(typeof item.values != 'undefined') {
                            var optionAttrValue = _.find(item.optionAttributeValues, 'optionAttributeValueID', parseInt(item.values[0].value));

                            if(typeof optionAttrValue != 'undefined') {
                                $scope.borrowerModel.userDetails[item.name] = $filter('translate')('SELECT_OPTIONS.' + optionAttrValue.value);
                            } else {
                                $scope.borrowerModel.userDetails[item.name] = '';
                            }

                        } else {
                            $scope.borrowerModel.userDetails[item.name] = '';
                        }
                    }

                    if (typeof item.values != 'undefined') {
                        if(item.valueType == 'option'){
                            $scope.borrowerModel.userDetails[item.name].value = {id:parseInt(item.values[0].value)};
                        } else if (item.valueType == 'int') {
                            $scope.borrowerModel.userDetails[item.name].value = parseFloat(item.values[0].value);
                        } else {
                            $scope.borrowerModel.userDetails[item.name].value = item.values[0].value;
                        }
                    }
                });
            });
        };

        $scope.getBorrowersDocuments = function() {
            CooperativeLoansService.getBorrowerDocuments($scope.borrowerId).then(function(response) {
                $scope.files = response;
            });
        };

        $scope.downloadFile = function(attributeValueId, fileName) {
            ReportsAndDocumentsService.getFile(attributeValueId).then(function(response) {
                $scope.fileType = response.type;
                $scope.reader = new Blob([response], {"type": response.type});
                saveAs($scope.reader, decodeURIComponent(fileName));
            });
        };

        $scope.getBorrowerPayments = function() {
            InvestorLoansService.getBorrowerPayments($scope.borrowerId).then(function(response) {
                $scope.borrowerPayments = response;
            })
        }
}]);

creditoControllers.controller('LoanApprovalsController', ['$scope', 'InvestorLoansService', 'CooperativeLoansService', '$filter', '$route', 'ReportsAndDocumentsService', '$location',
    function($scope, InvestorLoansService, CooperativeLoansService, $filter, $route, ReportsAndDocumentsService, $location) {

        $scope.investorId = JSON.parse(LS.user).id;
        $scope.filterStatus = $location.path().split('/')[3] || null;
        $scope.approveFlag = false;
        $scope.approveComment = '';

        $scope.investorId = LS.userId;
        $scope.investorName = JSON.parse(LS.user).firstName + ' ' + JSON.parse(LS.user).lastName;

        $scope.ApproveCheckbox_1 = false;
        $scope.ApproveCheckbox_2 = false;
        $scope.ApproveCheckbox_3 = false;

        $scope.approvalModel = [];
        $scope.approved = false;

        InvestorLoansService.getBorrowersList($scope.investorId).then(function(data) {
            $scope.borrowersList = data;
            //Filters
            $scope.sortType = 'joinDate'; //default sort type
            $scope.sortReverse = true;  //default sort order
            $scope.searchBorrower = '';  //default search/filter term

        }, function(error) {
            console.log('e', error);
        });


        $scope.showModalMessage = function(flag) {
            $scope.approveFlag = flag;
            $('#messageModal').modal();
        };

        $scope.commentSubmit = function() {
            $scope.approvalModel = {
                approveeFirstName: JSON.parse(LS.user).firstName,
                approveeLastName: JSON.parse(LS.user).lastName,
                comment: $scope.approveComment,
                date: new Date()
            };

            $scope.approved = true;

            //if($scope.approveFlag) {
            //    InvestorLoansService.approveLoan($scope.loanId, $scope.approveComment).then(function(response) {
            //        InvestorLoansService.getApprovals($scope.loanId).then(function(response) {
            //            //$scope.approvalModel = response;
            //            $scope.approveComment = '';
            //        });
            //    });
            //} else {
            //    InvestorLoansService.declineLoan($scope.loanId, $scope.approveComment).then(function(response) {
            //        InvestorLoansService.getApprovals($scope.loanId).then(function(response) {
            //            //$scope.approvalModel = response;
            //            $scope.approveComment = '';
            //        });
            //    });
            //}

        };

        $scope.approveLoanModal = function() {
            $('#approveLoanModal').modal();
        };

        $scope.getApprovals = function() {

            //$scope.approvalModel = {
            //    approveeFirstName: JSON.parse(LS.user).firstName,
            //    approveeLastName: JSON.parse(LS.user).lastName,
            //    comment: $scope.approveComment,
            //    date: new Date()
            //};
            //InvestorLoansService.getApprovals($scope.loanId).then(function(response) {
            //    //$scope.approvalModel = response;
            //    $scope.approveComment = ''
            //});
        };


        $scope.borrowerDetails = function(element) {
            $scope.approvalModel = [];
            $scope.approved = false;
            $scope.loanClicked = true;

            $scope.clickedBorrowerId = element.borrower.borrowerId;

            $scope.borrowerStatus = element.borrower.status;

            LS.borrowerDetails = element.borrower;
            localStorage.setItem('AllInOne', JSON.stringify(LS));

            $scope.borrowerId = LS.borrowerDetails.borrowerId;
            $scope.loanId = LS.borrowerDetails.loanId;


            $('.nav-tabs li, .tab-pane').removeClass('active');
            $('.borrowers-details').addClass('active');

            CooperativeLoansService.getBorrower($scope.borrowerId).then(function (response) {

                $scope.borrowerModel = {
                    userDetails: {}
                };

                _.each(response, function(item) {
                    $scope.borrowerModel.userDetails[item.name] = {
                        name: item.name,
                        isChanged: false,
                        valueType: item.valueType,
                        attributeTypeID: item.attributeTypeID
                    };

                    if(item.valueType == "option") {

                        if(typeof item.values != 'undefined') {
                            var optionAttrValue = _.find(item.optionAttributeValues, 'optionAttributeValueID', parseInt(item.values[0].value));

                            if(typeof optionAttrValue != 'undefined') {
                                $scope.borrowerModel.userDetails[item.name] = $filter('translate')('SELECT_OPTIONS.' + optionAttrValue.value);
                            } else {
                                $scope.borrowerModel.userDetails[item.name] = '';
                            }

                        } else {
                            $scope.borrowerModel.userDetails[item.name] = '';
                        }
                    }

                    if (typeof item.values != 'undefined') {
                        if(item.valueType == 'option'){
                            $scope.borrowerModel.userDetails[item.name].value = {id:parseInt(item.values[0].value)};
                        } else if (item.valueType == 'int') {
                            $scope.borrowerModel.userDetails[item.name].value = parseFloat(item.values[0].value);
                        } else {
                            $scope.borrowerModel.userDetails[item.name].value = item.values[0].value;
                        }
                    }
                });
            });

            CooperativeLoansService.getBorrowerBankAccount($scope.borrowerId).then(function(response) {
                $scope.bankAccountModel = {};

                _.each(response, function(item) {
                    $scope.bankAccountModel[item.name] = {
                        name: item.name,
                        isChanged: false,
                        valueType: item.valueType,
                        attributeTypeID: item.attributeTypeID
                    };

                    if(item.valueType == "option") {

                        if(typeof item.values != 'undefined') {
                            var optionAttrValue = _.find(item.optionAttributeValues, 'optionAttributeValueID', parseInt(item.values[0].value));

                            if(typeof optionAttrValue != 'undefined') {
                                $scope.bankAccountModel[item.name] = $filter('translate')('SELECT_OPTIONS.' + optionAttrValue.value);
                            } else {
                                $scope.bankAccountModel[item.name] = '';
                            }

                        } else {
                            $scope.bankAccountModel[item.name] = '';
                        }
                    }



                    if (typeof item.values != 'undefined') {
                        if(item.valueType == 'option'){
                            $scope.bankAccountModel[item.name].value = {id:parseInt(item.values[0].value)};
                        } else if (item.valueType == 'int') {
                            $scope.bankAccountModel[item.name].value = parseFloat(item.values[0].value);
                        } else {
                            $scope.bankAccountModel[item.name].value = item.values[0].value;
                        }
                    }
                });
            });
        };

        $scope.getBorrowersDocuments = function() {
            CooperativeLoansService.getBorrowerDocuments($scope.borrowerId).then(function(response) {
                $scope.files = response;
            });
        };

        $scope.downloadFile = function(attributeValueId, fileName) {
            ReportsAndDocumentsService.getFile(attributeValueId).then(function(response) {
                $scope.fileType = response.type;
                $scope.reader = new Blob([response], {"type": response.type});
                saveAs($scope.reader, decodeURIComponent(fileName));
            });
        };

        $scope.getBorrowerPayments = function() {
            InvestorLoansService.getBorrowerPayments($scope.borrowerId).then(function(response) {
                $scope.borrowerPayments = response;
            })
        };

        if(!LS.saveAccordionTabsState || LS.saveAccordionTabsState.length == 0) {
            LS.saveAccordionTabsState = [{
                id: 'PersonalInfo'
            }];
        }

        _.each(LS.saveAccordionTabsState, function(item, i) {
            $('#' + item.id).addClass('in');
        });

        $scope.saveAccordionTabsState = function(rowId) {

            $scope.isSaved = _.find(LS.saveAccordionTabsState, 'id', rowId);

            if(!$scope.isSaved) {
                LS.saveAccordionTabsState.push({
                    id: rowId
                })
            } else {
                LS.saveAccordionTabsState = _.without(LS.saveAccordionTabsState, _.findWhere(LS.saveAccordionTabsState, {id: rowId}));
            }

            localStorage.setItem('AllInOne', JSON.stringify(LS));
        }
    }]);


creditoControllers.controller('LoanPaymentsController', ['$scope', 'LoanPaymentsService', '$filter',
    function($scope, LoanPaymentsService, $filter) {
        $scope.loanPaymentsModel = [];

        LoanPaymentsService.getPayments().then(function(response) {
            _.each(response, function(item) {

                if(item.succeeded == null) {
                    item.isSucceeded = '';
                } else {
                    item.isSucceeded = (item.succeeded) ? $filter('translate')('SELECT_OPTIONS.Payments_Yes') : $filter('translate')('SELECT_OPTIONS.No')
                }

                $scope.loanPaymentsModel.push(item);
            });
        });
}]);

creditoControllers.controller('BorrowerLoanProccessStatusController', ['$scope', 'BorrowerLoanProccessStatusService', '$filter',
    function($scope, BorrowerLoanProccessStatusService, $filter) {

        BorrowerLoanProccessStatusService.getStatus().then(function(response) {
           $scope.statusModel = response;
        });
    }]);

creditoControllers.controller('BorrowerLoanRecyclingController', ['$scope', '$location', 'BorrowerLoanRecyclingService', '$filter',
    function($scope, $location, BorrowerLoanRecyclingService, $filter) {
        $scope.loanAmount = null;

        $scope.finish = function(){
            LS.finishLoanFlag = 1;
            localStorage.setItem('AllInOne', JSON.stringify(LS));
            $location.path('borrower-status');
        }
    }]);

creditoControllers.controller('EarlyPaymentController', ['$scope', 'EarlyPaymentService', 'CONFIG', '$filter', '$location', '$timeout',
    function($scope, EarlyPaymentService, CONFIG, $filter, $location, $timeout) {

    $scope.earlyPaymentModel = null;

    $scope.chooseDate = function() {
        $scope.borrowerModel = {
            bankAccount: {
                BankBranchName: null,
                BankAccountNumber: null,
                BankNameList:[],
                CreditCardOwnership:[],
                YearsInAccount:null
            },
            loanDetails: {
                LoanAmount: {
                    value: null
                }
            }
        };
        $scope.bankAccountContainer = $('#bankAccount');
        $scope.yearsLimit = [];

        for (var i = 0; i <= CONFIG.MAX_YEAR_LIMIT; i++){
            $scope.yearsLimit.push(i);
        }

        EarlyPaymentService.getBankAccount().then(function(data) {
            _.each(data, function(item) {
                var fieldContainer = $scope.bankAccountContainer.find('input[name='+ item.name +']');
                fieldContainer.attr('attributeTypeID', item.attributeTypeID).attr('valueType', item.valueType);

                $scope.borrowerModel.bankAccount[item.name] = {
                    name: item.name,
                    isChanged: false,
                    valueType: item.valueType,
                    attributeTypeID: item.attributeTypeID
                };

                if(item.valueType == "option") {
                    $scope.borrowerModel.bankAccount[item.name].options = [];
                    _.each(item.optionAttributeValues, function(value, i) {
                        $scope.borrowerModel.bankAccount[item.name].options.push({
                            id: parseInt(value.optionAttributeValueID),
                            value: $filter('translate')('SELECT_OPTIONS.' + value.value)
                        });
                    });
                }
                if (typeof item.values != 'undefined') {
                    if(item.valueType == 'option'){
                        $scope.borrowerModel.bankAccount[item.name].value = {id:parseInt(item.values[0].value)};
                    } else if (item.valueType == 'int') {
                        $scope.borrowerModel.bankAccount[item.name].value = parseFloat(item.values[0].value);
                    } else if(item.valueType == 'decimal'){
                        $scope.borrowerModel.bankAccount[item.name].value = parseInt(item.values[0].value);
                    } else {
                        $scope.borrowerModel.bankAccount[item.name].value = item.values[0].value;
                    }
                }
            });
        });

        EarlyPaymentService.getLoanAmount().then(function(data) {
            if (data) {
                $scope.borrowerModel.loanDetails["LoanAmount"] = {
                    name: "LoanAmount",
                    isChanged: false,
                    valueType: "int",
                    attributeTypeID: ""
                };

                $scope.borrowerModel.loanDetails.LoanAmount.value = parseFloat(data.amount);
            }
        });
    };

    $scope.showModal = function() {
        $('#earlyPaymentModal').modal();
    };

    $scope.acceptEarlyPayment = function() {
        LS.earlyPaymentFlag = 1;
        localStorage.setItem('AllInOne', JSON.stringify(LS));
        $timeout(function() {
            $location.path("loan-recycling");
        }, 500);
    }
}]);


creditoControllers.controller('DashboardController', ['$scope', function($scope) {

}]);

creditoControllers.controller('FAQController', ['$scope', 'FAQService', '$location', '$timeout', 'CONFIG',
    function($scope, FAQService, $location, $timeout, CONFIG) {
        $scope.categoryId = null;
        $scope.categoryDeleted = false;

        // Editor options.
        $scope.editorOptions = {
            language: 'he',
            uiColor: '#000000'
        };

        FAQService.getCategories().then(function(response) {
            $scope.FAQModel = response;
        });

        $scope.createCategory = function() {
          $location.path('admin/faq/category/create');
        };

        $scope.editCategory = function(id) {
            $location.path('admin/faq/category/edit/' + id);
        };

        $scope.deleteCategoryModal = function(id) {
            $scope.categoryId = id;
            $('#confirmDeleteModal').modal();
        };

        $scope.deleteCategory = function() {
            FAQService.deleteCategory($scope.categoryId).then(function() {
                $scope.categoryDeleted = true;
                $(window).scrollTo(0, {duration: CONFIG.SCROLL_TO_UP_DURATION});

                $timeout(function() {
                    $scope.categoryDeleted = false;
                }, 1000);


                FAQService.getCategories().then(function(response) {
                    $scope.FAQModel = response;
                });
            });
        };

        $scope.deleteArticleModal = function(id) {
            $scope.articleId = id;
            $('#confirmArticleDeleteModal').modal();
        };

        $scope.deleteArticle = function() {
            FAQService.deleteArticle($scope.articleId).then(function() {
                $scope.articleDeleted = true;
                $(window).scrollTo(0, {duration: CONFIG.SCROLL_TO_UP_DURATION});

                $timeout(function() {
                    $scope.articleDeleted = false;
                }, 1000);


                FAQService.getCategories().then(function(response) {
                    $scope.FAQModel = response;
                });
            });
        };

        $scope.editArticle = function(id) {
            if(!id) {
                $location.path('admin/faq');
            }

            $location.path('admin/faq/article/edit/' + id);
        };

        $scope.createArticle = function() {
            $location.path('admin/faq/article/create');
        }
}]);

creditoControllers.controller('BorrowerFAQController', ['$scope', 'FAQService', '$location', '$route', '$timeout', 'CONFIG',
    function($scope, FAQService, $location, $route, $timeout, CONFIG) {
    $scope.FAQModel = [];

    FAQService.getCategories().then(function(response) {
        $scope.FAQModel = response;

        $scope.flagParent = [];
        $scope.flagChild = [];

        $scope.tag = $route.current.params.id;

        $timeout(function() {
            $scope.parentCategoryId = $('.' + $scope.tag).attr('categoryId');

            $scope.articleId = $('.' + $scope.tag).attr('articleId');
            $scope.parent = $('#subCategory_' + $scope.parentCategoryId).attr('parentId');
            $('#answers_' + $scope.articleId).addClass('in');
            $('#subCategory_' + $scope.parentCategoryId).addClass('in');

            if(typeof $scope.parent != 'undefined') {
                $('#parentCategory_' + $scope.parent).addClass('in');
            } else {
                $('#parentCategory_' + $scope.parentCategoryId).addClass('in');
            }

            $(window).scrollTo($('.' + $scope.tag), {duration: CONFIG.SCROLL_TO_UP_DURATION});

        }, 500);
    });
}]);

creditoControllers.controller('FAQCategoryCreateController', ['$scope', 'FAQService', '$timeout', '$location', 'CONFIG',
    function($scope, FAQService, $timeout, $location, CONFIG) {
        $scope.FAQModelCategories = [];
        $scope.categoryName = '';
        $scope.categoryCreated = false;

        FAQService.getCategories().then(function(response) {
            _.each(response, function(item, i) {
                $scope.FAQModelCategories.push({
                    id: item.id,
                    Name: item.categoryName
                });
            });
        });

        $scope.createCategory = function() {
            $scope.data = {
                Name: $scope.categoryName,
                ParentId: ($scope.FAQModelCategoriesSelected) ? $scope.FAQModelCategoriesSelected.id : null
            };

            FAQService.createCategory($scope.data).then(function(response) {
                $scope.categoryCreated = true;
                $(window).scrollTo(0, {duration: CONFIG.SCROLL_TO_UP_DURATION});

                $timeout(function() {
                    $scope.categoryCreated = false;
                    $location.path('admin/faq');
                }, 1000)
            });
        }
}]);

creditoControllers.controller('FAQCategoryEditController', ['$scope', 'FAQService', '$timeout', '$location', '$route', 'CONFIG',
    function($scope, FAQService, $timeout, $location, $route, CONFIG) {
        $scope.FAQModelCategories = [{
            Name: ''
        }];
        $scope.categoryName = '';
        $scope.categoryUpdated = false;
        $scope.categoryId = $route.current.params.id;

        FAQService.getCategories().then(function(response) {
            _.each(response, function(item, i) {
                $scope.FAQModelCategories.push({
                    id: item.id,
                    Name: item.categoryName
                });
            });
        });

        FAQService.getCategoryById($scope.categoryId).then(function(response) {
            if(response.parentId) {
                $timeout(function() {
                    $scope.findParentCategory = _.find($scope.FAQModelCategories, 'id', response.parentId);

                    if($scope.findParentCategory) {
                        $scope.FAQModelCategoriesSelected = $scope.findParentCategory;
                    }
                }, 500);
            }

            $scope.categoryName = response.categoryName;
        });

        $scope.updateCategory = function() {

            $scope.data = {
                Id: $scope.categoryId,
                Name: $scope.categoryName,
                ParentId: ($scope.FAQModelCategoriesSelected) ? $scope.FAQModelCategoriesSelected.id : null
            };

            FAQService.updateCategory($scope.data).then(function(response) {
                $scope.categoryUpdated = true;
                $(window).scrollTo(0, {duration: CONFIG.SCROLL_TO_UP_DURATION});

                $timeout(function() {
                    $scope.categoryUpdated = false;
                    $location.path('admin/faq');
                }, 1000);
            });
        }
}]);

creditoControllers.controller('FAQArticleCreateController', ['$scope', 'FAQService', '$timeout', '$location', 'CONFIG',
    function($scope, FAQService, $timeout, $location, CONFIG) {
        $scope.articleModel = '';
        $scope.FAQModelCategories = [];
        $scope.FAQModelSubCategories = [];
        $scope.articleCreated = false;

        // Editor options.
        $scope.editorOptions = {
            language: 'he'
        };

        CKEDITOR.config.extraPlugins = "base64image";
        CKEDITOR.config.skin = 'office2013';
        CKEDITOR.config.height = '400px';

        FAQService.getCategories().then(function(response) {
            _.each(response, function(item, i) {
                $scope.FAQModelCategories.push({
                    id: item.id,
                    Name: item.categoryName
                });
            });
        });

        $scope.selectChildCategoriesById = function(id) {
            FAQService.getCategoryById($scope.FAQModelCategoriesSelected.id).then(function(response) {
                $scope.FAQModelSubCategories = [];
                _.each(response.subCategories, function(item, i) {
                    $scope.FAQModelSubCategories.push({
                        id: item.id,
                        Name: item.categoryName
                    });
                });
            });
        };

        $scope.create = function() {
            $scope.data = {
                CategoryId: (!$scope.FAQModelSubCategoriesSelected) ? $scope.FAQModelCategoriesSelected.id : $scope.FAQModelSubCategoriesSelected.id,
                Title: $scope.articleTitle,
                Text: $scope.articleModel,
                Tag: $scope.articleTag
            };

            FAQService.createArticle($scope.data).then(function(response) {
                $scope.articleCreated = true;
                $(window).scrollTo(0, {duration: CONFIG.SCROLL_TO_UP_DURATION});

                $timeout(function() {
                    $scope.articleCreated = false;
                    $location.path('admin/faq');
                }, 1000);
            });
        }
}]);

creditoControllers.controller('FAQArticleEditController', ['$scope', 'FAQService', '$route', '$timeout', '$location', 'CONFIG',
    function($scope, FAQService, $route, $timeout, $location, CONFIG) {
        $scope.articleModel = '';
        $scope.FAQModelCategories = [];
        $scope.FAQModelCategoriesSelected = [];
        $scope.FAQModelSubCategories = [{
            id: '',
            Name: ''
        }];
        $scope.articleUpdated = false;
        $scope.articleId = $route.current.params.id;

        // Editor options.
        $scope.editorOptions = {
            language: 'he'
        };

        CKEDITOR.config.extraPlugins = "base64image";
        CKEDITOR.config.skin = 'office2013';
        CKEDITOR.config.height = '400px';

        FAQService.getArticleById($scope.articleId).then(function(response) {
            $scope.articleModel = response.text;
            $scope.articleTag = response.tag;
            $scope.articleTitle = response.title;

            FAQService.getCategories().then(function(response) {
                _.each(response, function(item, i) {
                    $scope.FAQModelCategories.push({
                        id: item.id,
                        Name: item.categoryName
                    });
                });
            });

            //get category id from article category id
            FAQService.getCategoryById(response.categoryId).then(function(category) {
                //get parent category for selected item
                if(category.parentId) {
                    FAQService.getCategoryById(category.parentId).then(function(parentCategory) {
                        $timeout(function() {
                            $scope.FAQModelCategoriesSelected = _.find($scope.FAQModelCategories, 'id', parentCategory.id);

                            FAQService.getCategoryById($scope.FAQModelCategoriesSelected.id).then(function(response) {
                                _.each(response.subCategories, function(item, i) {
                                    $scope.FAQModelSubCategories.push({
                                        id: item.id,
                                        Name: item.categoryName
                                    });
                                });

                                $scope.FAQModelSubCategoriesSelected = _.find($scope.FAQModelSubCategories, 'id', response.categoryId);
                            });
                        }, 500);
                    });
                } else {
                    $timeout(function() {
                        $scope.FAQModelCategoriesSelected = _.find($scope.FAQModelCategories, 'id', category.id);

                        FAQService.getCategoryById($scope.FAQModelCategoriesSelected.id).then(function(response) {

                            _.each(response.subCategories, function(item, i) {
                                $scope.FAQModelSubCategories.push({
                                    id: item.id,
                                    Name: item.categoryName
                                });
                            });


                            if(response.parentId) {
                                $scope.FAQModelSubCategoriesSelected = _.find($scope.FAQModelSubCategories, 'id', response.categoryId);
                            } else {
                                $scope.FAQModelSubCategoriesSelected = $scope.FAQModelSubCategories[0];
                            }
                            
                        });
                    }, 500)
                }
            });
        });

        $scope.selectChildCategoriesById = function(id) {
            $scope.FAQModelSubCategories = [];

            FAQService.getCategoryById($scope.FAQModelCategoriesSelected.id).then(function(response) {
                _.each(response.subCategories, function(item, i) {
                    $scope.FAQModelSubCategories.push({
                        id: item.id,
                        Name: item.categoryName
                    });
                });
            });
        };

        $scope.update = function() {
            $scope.data = {
                Id: $scope.articleId,
                CategoryId: ($scope.FAQModelSubCategoriesSelected && $scope.FAQModelSubCategoriesSelected.id != '') ? $scope.FAQModelSubCategoriesSelected.id : $scope.FAQModelCategoriesSelected.id,
                Title: $scope.articleTitle,
                Text: $scope.articleModel,
                Tag: $scope.articleTag
            };

            FAQService.updateArticle($scope.data).then(function() {
                $scope.articleUpdated = true;
                $(window).scrollTo(0, {duration: CONFIG.SCROLL_TO_UP_DURATION});

                $timeout(function() {
                    $scope.articleUpdated = false;
                }, 1000);
            });
        }

}]);


254578579