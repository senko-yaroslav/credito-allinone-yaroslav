var creditoServices = angular.module('creditoServices', ['ngResource']);

creditoServices.factory('FAQService', ['Restangular', function(Restangular) {
    return {
        getCategories: function() {
            return Restangular.one('faq').get();
        },
        createCategory: function(data) {
            return Restangular.one('faq').all('category').post(data)
        },
        getCategoryById: function(id) {
            return Restangular.one('faq').one('category', id).get();
        },
        updateCategory: function(data) {
            return Restangular.one('faq').one('category').customPUT(data);
        },
        deleteCategory: function(id) {
            return Restangular.one('faq').one('category', id).remove();
        },
        selectChildCategoriesById: function(id) {
            return Restangular.one('faq').one('category', id).get();
        },
        createArticle: function(data) {
            return Restangular.one('faq').all('answer').post(data);
        },
        getArticleById: function(id) {
            return Restangular.one('faq').one('answer', id).get();
        },
        updateArticle: function(data) {
            return Restangular.one('faq').one('answer').customPUT(data);
        },
        deleteArticle: function(id) {
            return Restangular.one('faq').one('answer', id).remove();
        }
    }
}]);

creditoServices.factory('CalculationService', ['Restangular', function(Restangular) {
    return {
        collateralCalculate: function(borrowerId, data) {
            return Restangular.all('collateralcalc').post(data, {borrowerId: borrowerId});
        },
        loanCalculate: function(collateralData, userId, borrowerId) {
            return Restangular.one('loancalc').all(userId).post(collateralData, {borrowerId: borrowerId});
        },
        setCustomersAttributes: function(userId, formData, attrId) {
            return Restangular.one('customerattributes').all(userId).post(formData, { customerId: attrId })
        },
        getReport: function(userId, customerId, collateralsData) {
            return Restangular.one('report', userId).withHttpConfig({responseType: 'blob'}).get({ customerId: customerId, collaterals: JSON.stringify(collateralsData)});
        },
        getCollaterals: function(borrowerId) {
            return Restangular.one('user', borrowerId).one('collaterals').get();
        },
        removeCollateralRow: function(collateralId) {
            return Restangular.one('deletecollateral', collateralId).remove();
        }
    }
}]);


creditoServices.factory('InvestorConfigService', ['Restangular', function(Restangular) {
    return {
        getCollateralsConfig: function() {
            return Restangular.one('collateralconfig').get();
        },
        getLoanConfig: function() {
            return Restangular.one('loanconfig').get();
        },
        submitCollateralConfig: function(data) {
            return Restangular.all('collateralconfig').post(data);
        },
        submitLoanConfig: function(data) {
            return Restangular.all('loanconfig').post(data);
        },
        changeReportPassword: function(oldPassword, newPassword, retryNewPassword) {
            return Restangular.all('ChangeReportPassword').post({
                'OldPassword': oldPassword,
                'newPassword': newPassword,
                'confirmPassword': retryNewPassword
            });
        },        getInvestorAttributes: function() {
            return Restangular.one('investor').one('attributes').get();
        },
        saveAttributes: function(loanConditions) {
            return Restangular.one('investor').all('attributes').post(loanConditions);
        }
    }
}]);

creditoServices.factory('InvestorStatusService', ['Restangular', '$rootScope', function(Restangular, $rootScope) {
    return {
        getStatus: function() {
            return Restangular.one('investor').one('status').get();
        },
        getPortfolioInfo: function() {
            return Restangular.one('investor').one('status').one('portfolioInfo').get();
        }
    }
}]);

creditoServices.factory('CashFlowService', ['Restangular', '$rootScope', function(Restangular, $rootScope) {
    return {
        getCashFlow: function() {
            return Restangular.one('investor').one('cashflow').get();
        }
    }
}]);


creditoServices.factory('InvestorStatisticsService', ['Restangular', '$rootScope', function(Restangular, $rootScope) {
    return {
        getStatistics: function() {
            return Restangular.one('investor').one('statistics').get();
        }
    }
}]);

creditoServices.factory('InvestorLoansService', ['Restangular', '$rootScope', function(Restangular, $rootScope) {
    return {
        getBorrowersList: function() {
            return Restangular.one('investor').one('loans').get();
        },
        getBorrowerPayments: function(id) {
            return Restangular.one('paymentcalc', LS.userId).get({'customerId': id});
        },
        approveLoan: function(loanId, message) {
            return Restangular.one('loan').all('approve').post({
                "loanid": loanId,
                "comment": message
            })
        },
        declineLoan: function(loanId, message) {
            return Restangular.one('loan').all('decline').post({
                "loanid": loanId,
                "comment": message
            })
        },
        getApprovals: function(loanId) {
            return Restangular.one('loan', loanId).one('approvals').get();
        }
    }
}]);

creditoServices.factory('LoanPaymentsService', ['Restangular', '$rootScope', function(Restangular, $rootScope) {
    return {
        getPayments: function() {
            return Restangular.one('borrower').one('payments').get();
        }
    }
}]);

creditoServices.factory('EarlyPaymentService', ['Restangular', '$rootScope', function(Restangular, $rootScope) {
    return {
        getBankAccount: function() {
            return Restangular.one('account').one('attributes').get();
        },
        getLoanAmount: function() {
            return Restangular.one('loan').get();

        }
    }
}]);


creditoServices.factory('BorrowerLoanProccessStatusService', ['Restangular', '$rootScope', function(Restangular, $rootScope) {
    return {
        getStatus: function() {
            return Restangular.one('borrower').one('status').get();
        }
    }
}]);

creditoServices.factory('BorrowerLoanRecyclingService', ['Restangular', '$rootScope', function(Restangular, $rootScope) {
    return {

    }
}]);

creditoServices.factory('BorrowerReportsAndDocumentsService', ['$rootScope', 'CONFIG', '$q', function($rootScope, CONFIG, $q) {
    return {
        getDocuments: function(fileName) {

            $('#documentsAndReports').find('.text').text('Loading file');

            var deferred = $q.defer();
            $.ajax({
                url: CONFIG.SITE_URL + '/assets/reports/new-docs/' + fileName,
                type: "GET",
                dataType: "binary",
                async: false,
                processData: false,
                success: function(response){
                    deferred.resolve(response);
                }
            });

            return deferred.promise;
        },
        getUploadedDocuments: function(attributeValueId) {

            var deferred = $q.defer();
            $.ajax({
                url: CONFIG.API_URL + 'attribute/' + attributeValueId + '/download',
                type: "GET",
                dataType: "binary",
                ignoreLoadingBar: false,
                async: true,
                headers: {
                    "Authorization" : 'Bearer ' + LS.token
                },
                processData: false,
                success: function(response){
                    deferred.resolve(response);
                },
                error: function(e) {
                    console.log('e', e)
                }
            });

            return deferred.promise;
        },
        getDocumentsDigitalSignature: function(fileName) {

            $('#documentsAndReports').find('.text').text('Loading file');

            var deferred = $q.defer();
            $.ajax({
                url: CONFIG.SITE_URL + '/api/borrower/documents/htmlToPdf?attributeTypeName=' + fileName,
                headers: {
                    "Authorization": "Bearer " + LS.token
                },
                type: "GET",
                dataType: "binary",
                async: false,
                processData: false,
                success: function(response){
                    deferred.resolve(response);
                }
            });

            return deferred.promise;
        },
        getDocumentsSignature: function(fileName) {

            $('#documentsAndReports').find('.text').text('Loading file');

            var deferred = $q.defer();
            $.ajax({
                url: CONFIG.SITE_URL + '/assets/reports/new-docs-digital-signature/' + fileName,
                //url: '/assets/reports/new-docs-digital-signature/' + fileName,
                type: "GET",
                dataType: "binary",
                async: false,
                processData: false,
                success: function(response){
                    deferred.resolve(response);
                }
            });

            return deferred.promise;
        },
        downloadFile: function(fileName) {
            var deferred = $q.defer();
            $.ajax({
                url: CONFIG.SITE_URL + '/assets/reports/new-docs-digital-signature/' + fileName,
                //url: '/assets/reports/new-docs-digital-signature/' + fileName,
                type: "GET",
                dataType: "binary",
                ignoreLoadingBar: false,
                async: true,
                headers: {
                    "Authorization" : 'Bearer ' + LS.token
                },
                processData: false,
                success: function(response){
                    deferred.resolve(response);
                },
                error: function(e) {
                    //console.log('e', e)
                }
            });

            return deferred.promise;
        },
        getFileFromGoogle: function(fileName) {

            $('#documentsAndReports').find('.text').text('Loading file');

            var deferred = $q.defer();
            $.ajax({
                url: CONFIG.SITE_URL + '/assets/reports/' + fileName,
                type: "GET",
                dataType: "binary",
                async: false,
                processData: false,
                success: function(response){
                    deferred.resolve(response);
                }
            });

            return deferred.promise;
        }
    }
}]);


creditoServices.factory('SmsMessageVerificationService', ['Restangular', function(Restangular) {
    return {
        confirmation: function(code, tokenKey) {
            return Restangular.one('user').one('sms').all('confirmation').post({
                        code: code,
                        token: tokenKey
                    },{},{});
        },
        getSmsCode: function(tokenKey) {
            return Restangular.one('user').one('sms').all('code').post(
                {
                    'token': tokenKey
                }, {}, {}
            );
        }
    }
}]);