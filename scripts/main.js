'use strict';
var LS = JSON.parse(localStorage.getItem('AllInOne')) || {};

angular.element(document).ready(function() {
  angular.bootstrap(document, ['Credito']);
});

var roles = {
  Unauthorized: 0,
  Borrower: 1,
  InstInvestorLender: 2,
  InstInvestor: 3,
  Admin: 4
};

if(typeof LS.roles == 'undefined') {
  LS.roles = 'Unauthorized';
  localStorage.setItem('AllInOne', JSON.stringify(LS));
}

var Credito = angular.module('Credito', [
  'ngRoute',
  'angularLoad',
  'restangular',
  'ngRoute',
  'ngResource',
  'pascalprecht.translate',
  'ngCookies',
  'creditoControllers',
  'creditoCoreServices',
  'creditoServices',
  'creditoCoreDirectives',
  'creditoDirectives',
  'creditoCoreFilters',
  'constants',
  'angular-loading-bar',
  'ui.bootstrap-slider',
  'ngFileUpload',
  'ui.bootstrap'
]);

Credito.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
        when('/admin/dashboard', {
          templateUrl: 'templates/pages/admin/dashboard.html',
          controller: 'DashboardController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Admin]);
            }]
          }
        }).
        when('/admin/faq', {
          templateUrl: 'templates/pages/admin/faq/index.html',
          controller: 'FAQController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Admin]);
            }]
          }
        }).
        when('/admin/faq/category/create', {
          templateUrl: 'templates/pages/admin/faq/category/create.html',
          controller: 'FAQCategoryCreateController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Admin]);
            }]
          }
        }).
        when('/admin/faq/category/edit/:id', {
          templateUrl: 'templates/pages/admin/faq/category/edit.html',
          controller: 'FAQCategoryEditController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Admin]);
            }]
          }
        }).
        when('/admin/faq/article/create', {
          templateUrl: 'templates/pages/admin/faq/article/create.html',
          controller: 'FAQArticleCreateController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Admin]);
            }]
          }
        }).
        when('/admin/faq/article/edit/:id', {
          templateUrl: 'templates/pages/admin/faq/article/edit.html',
          controller: 'FAQArticleEditController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Admin]);
            }]
          }
        }).
        when('/', {
          templateUrl: 'templates/pages/login-page.html',
          controller: 'LoginController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Unauthorized]);
            }]
          }
        }).
        when('/login/investor', {
          templateUrl: 'templates/pages/login-investor.html',
          controller: 'LoginController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Unauthorized]);
            }]
          }
        }).
        when('/logout', {
          template: '',
          controller: 'LogoutController'
        }).
        when('/register', {
          templateUrl: 'templates/pages/registration-page.html',
          controller: 'RegisterController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Unauthorized]);
            }],
            currentStep: function() {
              return -1;
            }
          }
        }).
        when('/faq', {
          templateUrl: 'templates/pages/borrower/faq.html',
          controller: 'BorrowerFAQController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Borrower]);
            }]
          }
        }).
        when('/faq/:id', {
          templateUrl: 'templates/pages/borrower/faq.html',
          controller: 'BorrowerFAQController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Borrower]);
            }]
          }
        }).
        when('/get-loan', {
          templateUrl: 'templates/pages/borrower/get-loan.html',
          controller: 'GetLoanController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Borrower]);
            }],
            currentStep: function() {
              return 1;
            }
          }
        }).
        when('/details', {
          templateUrl: 'templates/pages/borrower/personal.html',
          controller: 'UserDetailsController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Borrower]);
            }],
            currentStep: function() {
              return 2;
            }
          }
        }).
        when('/employment-and-salary', {
          templateUrl: 'templates/pages/borrower/employment-and-salary.html',
          controller: 'UserDetailsController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Borrower]);
            }],
            currentStep: function() {
              return 3;
            }
          }
        }).
        when('/properties-and-liabilities', {
          templateUrl: 'templates/pages/borrower/properties-and-liabilities.html',
          controller: 'UserDetailsController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Borrower]);
            }],
            currentStep: function() {
              return 3;
            }
          }
        }).
        when('/bank-account', {
          templateUrl: 'templates/pages/borrower/bank-account.html',
          controller: 'BankAccountController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Borrower]);
            }],
            currentStep: function() {
              return 4;
            }
          }
        }).
        when('/upload', {
          templateUrl: 'templates/pages/upload-steps.html',
          controller: 'UploadController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Borrower]);
            }],
            currentStep: function() {
              return 5;
            }
          }
        }).
        when('/finish', {
          templateUrl: 'templates/pages/finish/loan-message.html',
          controller: 'FinishDetailsController',
          resolve: {
            permission: ['authorizationService', function (authorizationService) {
              return authorizationService.permissionCheck([roles.Borrower]);
            }],
            currentStep: function () {
              return 6;
            }
          }
        }).
        when('/borrower-preferences', {
          templateUrl: 'templates/pages/borrower/preferences.html',
          controller: 'BorrowerPreferencesController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Borrower]);
            }]
          }
        })
        .when('/borrower-status', {
          templateUrl: 'templates/pages/borrower/status.html',
          controller: 'BorrowerStatusController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Borrower]);
            }]
          }
        })
        .when('/borrower-reports-and-documents', {
          templateUrl: 'templates/pages/borrower/reports-and-documents.html',
          controller: 'BorrowerReportAndDocumentsController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Borrower]);
            }]
          }
        }).when('/borrower-reports-and-documents-digital-signature', {
          templateUrl: 'templates/pages/borrower/reports-and-documents-digital-signature.html',
          controller: 'BorrowerReportAndDocumentsDigitalSignatureController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Borrower]);
            }]
          }
        })
        .when('/borrower-messages', {
          templateUrl: 'templates/pages/borrower/messages.html',
          controller: 'BorrowerMessagesController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Borrower]);
            }]
          }
        }).when('/borrower-forum', {
          templateUrl: 'templates/pages/borrower/forum.html',
          controller: 'BorrowerForumController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Borrower]);
            }]
          }
        })
        .when('/loan-proccess-status', {
          templateUrl: 'templates/pages/borrower/loan-proccess-status.html',
          controller: 'BorrowerLoanProccessStatusController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Borrower]);
            }]
          }
        })
        .when('/loan-payments', {
          templateUrl: 'templates/pages/borrower/loan-payments.html',
          controller: 'LoanPaymentsController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Borrower]);
            }]
          }
        })
        .when('/loan-recycling', {
          templateUrl: 'templates/pages/borrower/loan-recycling.html',
          controller: 'BorrowerLoanRecyclingController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Borrower]);
            }]
          }
        }).
        when('/amortization-board', {
          templateUrl: 'templates/pages/borrower/amortization-board.html',
          controller: 'AmortizationBoardController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Borrower]);
            }]
          }
        }).
        when('/early-payment-finish', {
          templateUrl: 'templates/pages/borrower/early-payment-finish.html',
          controller: '',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Borrower]);
            }]
          }
        }).
        when('/early-payment', {
          templateUrl: 'templates/pages/borrower/early-payment.html',
          controller: 'EarlyPaymentController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Borrower]);
            }]
          }
        }).
        when('/calculation/:userId', {
          templateUrl: 'templates/pages/calculation-page.html',
          controller: 'CalculationController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.InstInvestor]);
            }]
          }
        }).
        when('/investor/search', {
          templateUrl: 'templates/pages/investor/search.html',
          controller: 'SearchController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.InstInvestor]);
            }]
          }
        }).
        when('/investor/config/collaterals', {
          templateUrl: 'templates/pages/investor/config/collaterals.html',
          controller: 'InvestorConfigCollateralsController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.InstInvestor]);
            }]
          }
        }).when('/investor/config/loan', {
          templateUrl: 'templates/pages/investor/config/loan.html',
          controller: 'InvestorConfigLoanController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.InstInvestor]);
            }]
          }
        }).when('/investor/config/general', {
          templateUrl: 'templates/pages/investor/config/general.html',
          controller: 'InvestorConfigGeneralController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.InstInvestor]);
            }]
          }
        })
        .when('/investor/change-status/:id', {
          templateUrl: 'templates/pages/investor/change-status.html',
          controller: 'ChangeBorrowerStatusController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.InstInvestor]);
            }]
          }
        }).
        when('/investor/borrower-details/:borrowerId', {
          templateUrl: 'templates/pages/investor/borrower-details.html',
          controller: 'BorrowerDetailsController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.InstInvestor]);
            }]
          }
        }).
        when('/investor/status', {
          templateUrl: 'templates/pages/investor/status.html',
          controller: 'InvestorStatusController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.InstInvestor]);
            }]
          }
        }).
        when('/investor/cash-flow', {
          templateUrl: 'templates/pages/investor/cash-flow.html',
          controller: 'InvestorCashFlowController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.InstInvestor]);
            }]
          }
        }).
        when('/investor/statistics', {
          templateUrl: 'templates/pages/investor/statistics.html',
          controller: 'InvestorStatisticsController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.InstInvestor]);
            }]
          }
        })
        .when('/investor/loan-approvals', {
          templateUrl: 'templates/pages/investor/loan-approvals.html',
          controller: 'LoanApprovalsController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.InstInvestor]);
            }]
          }
        }).
        when('/investor/loans', {
          templateUrl: 'templates/pages/investor/loans.html',
          controller: 'InvestorLoansController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.InstInvestor]);
            }]
          }
        })
        .when('/investor/loans/Registration', {
          templateUrl: 'templates/pages/investor/loans.html',
          controller: 'InvestorLoansController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.InstInvestor]);
            }]
          }
        }).
        when('/investor/loans/WaitingForApproval', {
          templateUrl: 'templates/pages/investor/loans.html',
          controller: 'InvestorLoansController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.InstInvestor]);
            }]
          }
        })
        .when('/investor/loans/FillInfo', {
          templateUrl: 'templates/pages/investor/loans.html',
          controller: 'InvestorLoansController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.InstInvestor]);
            }]
          }
        })
        .when('/investor/loans/ApproveInfo', {
          templateUrl: 'templates/pages/investor/loans.html',
          controller: 'InvestorLoansController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.InstInvestor]);
            }]
          }
        })
        .when('/investor/loans/Issuing', {
          templateUrl: 'templates/pages/investor/loans.html',
          controller: 'InvestorLoansController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.InstInvestor]);
            }]
          }
        })
        .when('/investor/loans/EarlyPaid', {
          templateUrl: 'templates/pages/investor/loans.html',
          controller: 'InvestorLoansController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.InstInvestor]);
            }]
          }
        })
        .when('/investor/loans/Completed', {
          templateUrl: 'templates/pages/investor/loans.html',
          controller: 'InvestorLoansController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.InstInvestor]);
            }]
          }
        })
        .when('/investor/loans/LateInPayment', {
          templateUrl: 'templates/pages/investor/loans.html',
          controller: 'InvestorLoansController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.InstInvestor]);
            }]
          }
        })
        .when('/investor/reports-and-documents', {
          templateUrl: 'templates/pages/investor/reports-and-documents.html',
          controller: 'InvestorReportAndDocumentsController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.InstInvestor]);
            }]
          }
        }).
        when('/forbidden', {
          templateUrl: 'templates/pages/forbidden-page.html',
          controller: 'ForbiddenController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Unauthorized]);
            }]
          }
        }).
        when('/offline', {
          templateUrl: 'templates/pages/offline-page.html',
          controller: 'OfflineController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Unauthorized, roles.Borrower, roles.InstInvestor]);
            }]
          }
        }).
        when('/terms', {
          templateUrl: 'templates/pages/terms-page.html',
          controller: 'TermsController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Unauthorized, roles.Borrower, roles.InstInvestor]);
            }]
          }
        }).
        when('/email/check', {
          templateUrl: 'templates/pages/email/check.html',
          controller: 'RegisterController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Unauthorized]);
            }]
          }
        }).
        when('/email/confirm/:userId/:token', {
          templateUrl: 'templates/pages/email/confirm.html',
          controller: 'EmailConfirmController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Unauthorized]);
            }]
          }
        })
        .when('/phone/confirm/:id', {
          templateUrl: 'templates/pages/register-sms-message-verification.html',
          controller: 'SmsMessageVerificationController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Unauthorized]);
            }]
          }
        }).

        when('/password/reset', {
          templateUrl: 'templates/pages/password/reset-pass.html',
          controller: 'PasswordController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Unauthorized]);
            }]
          }
        }).
        when('/password/reset/confirm', {
          templateUrl: 'templates/pages/password/pending-reset.html',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Unauthorized]);
            }]
          }
        }).
        when('/password/reset/confirm/:userId/:token', {
          templateUrl: 'templates/pages/password/restore.html',
          controller: 'PasswordController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Unauthorized]);
            }]
          }
        }).
        when('/password/change', {
          templateUrl: 'templates/pages/password/change.html',
          controller: 'PasswordController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Borrower, roles.InstInvestor, roles.Admin]);
            }]
          }
        }).
        when('/emailandpassword/confirm/:userId/:emailToken/:passwordToken', {
          templateUrl: 'templates/pages/password/email-and-password-confirm.html',
          controller: 'EmailAndPasswordConfirmController',
          resolve: {
            permission: ['authorizationService', function(authorizationService) {
              return authorizationService.permissionCheck([roles.Unauthorized]);
            }]
          }
        }).
        otherwise({
          redirectTo: '/'
        });
  }]);

Credito.config(['RestangularProvider', 'CONFIG', function(RestangularProvider, CONFIG) {
  RestangularProvider.setBaseUrl(CONFIG.API_URL);
}]);

Credito.config(['$httpProvider', function($httpProvider) {
  //initialize get if not there
  if (!$httpProvider.defaults.headers.get) {
    $httpProvider.defaults.headers.get = {};
  }

  //disable IE ajax request caching
  $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
  $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
  $httpProvider.defaults.headers.get['Expires'] = 0;
}]);

Credito.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeBar = false;
}]);

Credito.config(['$translateProvider', function($translateProvider) {

  $translateProvider.useStaticFilesLoader({
    files: [{
      prefix: 'assets/languages/',
      suffix: '.json'
    },{
      prefix: 'assets/languages/investor-',
      suffix: '.json'
    }]
  });

 $translateProvider.preferredLanguage('he');

  $translateProvider.useSanitizeValueStrategy('escapeParameters');
}]);

Credito.run(['$rootScope', '$translate', '$window', '$location', 'Restangular', 'CONFIG', '$interval', '$timeout', '$route',
  function($rootScope, $translate, $window, $location, Restangular, CONFIG, $timeout, $route) {
    $rootScope.CONFIG = CONFIG;

    LS = JSON.parse(localStorage.getItem('AllInOne'));

    if(LS.token) {
      Restangular.setDefaultHeaders({
        Authorization: 'Bearer ' + LS.token,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": 0
      });
    }

    Restangular.addRequestInterceptor(function(element, operation, what, url) {
      var lastTokenRetrived = LS.lastTokenRetrived;
      if( LS.token && (operation == 'get' || operation == 'post') ) {
        var min = 1000 * CONFIG.REFRESH_TOKEN_INTERVAL * 1;
        var isPast = (new Date().getTime() - lastTokenRetrived < min) ? false : true;

        if(isPast) {
          $.ajax({
            url: CONFIG.API_URL + '/oauth/token/refresh',
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + LS.token,
              "Cache-Control": "no-cache, no-store, must-revalidate",
              "Pragma": "no-cache",
              "Expires": 0
            },
            success: function(response) {
              LS.token = response.access_token;
              LS.lastTokenRetrived = new Date().getTime();
              localStorage.setItem('AllInOne', JSON.stringify(LS));

              Restangular.setDefaultHeaders({
                Authorization: 'Bearer ' + LS.token,
                "Cache-Control": "no-cache, no-store, must-revalidate",
                "Pragma": "no-cache",
                "Expires": 0
              });
            },
            error: function(e) {
              console.log('e', e)
            }
          });
        }
      }
      return element;
    });

    Restangular.setErrorInterceptor(function (response) {
      switch (response.status) {

        case 401: {
          $location.path('logout');
        }
          break;

        case 500: {
          switch (response.data.ErrorCode) {
            case 'UserCreateFailed':
              $rootScope.isExists = true;
              $rootScope.serverError = "המשתמש קיים";

              $(window).scrollTo(0, {duration: 300});

              (function(){
                var timer = $timeout(function(){
                  $rootScope.isExists = false;
                  $timeout.cancel(timer);
                }, 4000);
              })();

              break;

            case 'UnknownError':
              $rootScope.isExists = true;
              $rootScope.serverError = "שגיאה בהתחברות לאתר. נא לבדוק את החיבור לשרת האינטרנט ולפנות לתמיכת האתר במידת הצורך";

              $(window).scrollTo(0, {duration: 300});

              var pattern = new RegExp("calculation");

              if(!pattern.test(window.location.hash)){
                (function(){
                  var timer = $timeout(function(){
                    $rootScope.isExists = false;
                    $timeout.cancel(timer);
                  }, 4000);
                })();
              }

              break;

            case 'CalculationFailed':
              $rootScope.isExists = true;
              $rootScope.serverError = "שגיאת חישוב ההלוואה ללקוח. נא תפנו לתמיכה של קרדיטו";

              $(window).scrollTo(0, {duration: 300});

              break;

            case 'CalculationFailedWithMessage':
              $rootScope.isExists = true;
              $rootScope.serverError = response.data.ErrorMessage;

              $(window).scrollTo(0, {duration: 300});

              break;
          }
        }
          break;
      }
    });

    $rootScope.online = navigator.onLine;
    $window.addEventListener("offline", function () {
      $rootScope.$apply(function() {
        $rootScope.online = false;
        $window.location.href = '#/offline';
      });
    }, false);
    $window.addEventListener("online", function () {
      $rootScope.$apply(function() {
        $rootScope.online = true;
        $window.history.back();
      });
    }, false);


    $rootScope.$on('$locationChangeSuccess', function(event) {
      $(window).scrollTo(0, {duration: CONFIG.SCROLL_TO_UP_DURATION});
    });

  }]);


Credito.filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}]);