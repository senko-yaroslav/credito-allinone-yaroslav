var creditoCoreServices = angular.module('creditoCoreServices', ['ngResource']);

creditoCoreServices.service('browser', ['$window', function($window) {
    return function() {
        var userAgent = $window.navigator.userAgent;
        var browsers = {chrome: /chrome/i, safari: /safari/i, firefox: /firefox/i, ie: /internet explorer/i};

        for(var key in browsers) {
            if (browsers[key].test(userAgent)) {
                return key;
            }
        }

        return 'unknown';
    }
}]);

creditoCoreServices.factory('SpouseDetails', ['$http', '$rootScope', '$q', 'Restangular', function($http, $rootScope, $q, Restangular) {
    return {
        detailsData:{},
        getDetailsData: function() {
            return Restangular.one('spouse/attributes').get();
        },
        sendDetailsData:function(){
            return Restangular.all('spouse/attributes').post(this.detailsData);
        }
    };
}]);

creditoCoreServices.factory('UserDetails', ['$http', '$rootScope', '$q', 'Restangular', function($http, $rootScope, $q, Restangular) {

    return {
        id: '',
        fname: '',
        lname: '',
        email: '',
        phoneNumber: '',
        pass: '',
        retrypass: '',
        personalId: '',
        investorId: '',
        error: '',
        token: '',
        userId: '',
        roles: [],
        detailsData:[],
        isNew: function () {
            return (this.status == 'NEW' || this.id == null);
        },
        getLoginUserData: function () {
            return {
                "username": this.email,
                "password": this.pass,
                "passwordOtp": this.passOTP,
                "grant_type": "password"
            }
        },
        getUserToken: function () {
            this.token = LS.token;
            return this.token;
        },
        getRegisterUserData: function () {
            return {
                "email": this.email,
                "userName": this.personalId,
                "firstName": this.fname,
                "lastName": this.lname,
                "phoneNumber": this.phoneNumber,
                "password": this.pass,
                "personalId": this.personalId,
                "investorId": this.investorId,
                "confirmPassword": this.pass
            }
        },
        getUserId: function () {
            this.id = LS.userId;
            return this.id;
        },
        getLoggedUser: function () {
            return Restangular.one('user').get();
        },
        getDetailsData: function () {
            return Restangular.one('user/attributes').get();
        },
        sendDetailsData: function () {
            return Restangular.all('user/attributes').post(this.detailsData);
        },
        getUserMail: function (id, token) {
            var that = this;
            var deferred = $q.defer();

            if (!id) return deferred.promise;

            $http({
                method: "GET",
                url: $rootScope.CONFIG.API_URL + "/user/" + id,
                headers: {'Authorization': "Bearer " + token}
            }).
                success(function (data, status, headers, config) {
                    that.userName = data.userName;
                    that.fname = data.firstName;

                    LS.userData = JSON.stringify(data);
                    localStorage.setItem('B2B', JSON.stringify(LS));

                    deferred.resolve(data.userName);
                }).
                error(function (data, status) {

                });

            return deferred.promise;
        }
    }
}]);

creditoCoreServices.factory('GetLoanService', ['Restangular', '$timeout', '$location', function(Restangular, $timeout, $location) {
    return {
        loanDetails:[],
        getLoan: function () {
            if( this.loanDetails.length > 0 ) {
                Restangular.all('loan/attributes')
                    .post(this.loanDetails)
                    .then(function () {
                        $location.path("details");
                    },
                    function (error) {
                        console.log(error)
                    });
            } else {
                $location.path("details");
            }
        },
        cancelLoan:function(){
            Restangular.all('loan')
                .remove()
                .then(function () {
                    $location.path('get-loan');
                });
        }
    }
}]);

creditoCoreServices.factory('RegistrationService', ['Restangular', function(Restangular) {
    return {
        id: '',
        fname: '',
        lanme: '',
        email: '',
        phoneNumber: '',
        pass: '',
        retrypass: '',
        personalId: '',
        cooperativeId: '',
        error: '',
        token: '',
        roles: [],
        getRegisterData: function() {
            return {
                "email": this.email,
                "userName": this.personalId,
                "firstName": this.fname,
                "lastName": this.lname,
                "phoneNumber": this.phoneNumber,
                "password": this.pass,
                "personalId": this.personalId,
                "cooperativeId": this.cooperativeId,
                "confirmPassword": this.pass,
                "RequireEmailComfirmation": true
            }
        },
        getUserToken: function() {
            this.token = LS.token;
            return this.token;
        },
        register: function() {
            return Restangular.all('borrower').post(this.getRegisterData());
        }
    }
}]);

creditoCoreServices.factory('CooperativesService', ['Restangular', function(Restangular) {
    return {
        getCooperatives: function() {
            return Restangular.one('cooperatives').get();
        }

    };
}]);

creditoCoreServices.factory('CooperativeLoansService', ['Restangular', '$rootScope', function(Restangular, $rootScope) {
    return {
        getLoans: function() {
            return ($rootScope.cooperative && $rootScope.cooperative.id != 0) ? Restangular.one('cooperative', $rootScope.cooperative.id).one('loans').get() : Restangular.one('cooperative').one('loans').get();
        },
        getLoanBorrowers: function(id) {
            return Restangular.one('loan', id).one('borrowers').get();
        },
        getBorrower: function(borrowerId) {
            return Restangular.one('user', borrowerId).one('attributes').get();
        },
        getBorrowerDocuments: function(borrowerId) {
            return Restangular.one('user', borrowerId).one('attributes').get({'valueType': 'blob'});
        },
        getBorrowerBankAccount: function(borrowerId) {
            return Restangular.one('user', borrowerId).one('account').one('attributes').get();
        }
    }
}]);

creditoCoreServices.factory('LoginService', ['Restangular', function(Restangular) {
    return {
        login: function(userId, password) {
            Restangular.setDefaultHeaders();

            var loginData = {
                "username": userId,
                "password": password,
                "grant_type": "password"
            };

            return Restangular.all('/oauth/token').post($.param(loginData), {}, {'Content-Type': 'application/x-www-form-urlencoded'});
        }
    }
}]);

creditoCoreServices.factory('ReportsAndDocumentsService', ['$rootScope', 'CONFIG', 'Restangular', '$q',
    function($rootScope, CONFIG, Restangular, $q) {
        return {
            getReportsAndDocuments: function() {
                return Restangular.one('cooperative', $rootScope.cooperative.id).one('attributes').get({'valueType': 'blob'});
            },
            getFile: function(attributeValueId) {
                $('#documentsAndReports').find('.text').text('Loading file');

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
                    }
                });

                return deferred.promise;
            }
        }
    }]);

creditoCoreServices.factory('BorrowerReportsAndDocumentsService', ['$rootScope', 'CONFIG', '$q',
    function($rootScope, CONFIG, $q) {
        return {
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

creditoCoreServices.factory('DecodeToken', [function(){
    return {
        decodeJwt: function(token){
            var segments = token.split('.');

            if (segments.length !== 3) {
                throw new Error('Not enough or too many segments');
            }

            // All segment should be base64
            var headerSeg = segments[0];
            var payloadSeg = segments[1];
            var signatureSeg = segments[2];

            // base64 decode and parse JSON
            return JSON.parse(this.base64urlDecode(payloadSeg))
        },
        base64urlDecode: function(s){
            var e={},i,b=0,c,x,l=0,a,r='',w=String.fromCharCode,L=s.length;
            var A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            for(i=0;i<64;i++){e[A.charAt(i)]=i;}
            for(x=0;x<L;x++){
                c=e[s.charAt(x)];b=(b<<6)+c;l+=6;
                while(l>=8){((a=(b>>>(l-=8))&0xff)||(x<(L-2)))&&(r+=w(a));}
            }
            return r;
        }
    }
}]);

creditoCoreServices.factory('UploadService', [ 'Upload','$interval','Restangular','$rootScope', 'CONFIG', '$q',
    function(Upload, $interval, Restangular, $rootScope, CONFIG, $q) {
        return {
            getUserDetailsData: function() {
                return Restangular.one('user/attributes').get({ 'valueType': "blob" });
            },
            getSpouseDetailsData: function() {
                return Restangular.one('spouse/attributes').get({ 'valueType': "blob" });
            },
            sendDetailsData:function(){
                return Restangular.all('spouse/attributes').post(this.detailsData);
            },
            uploadFile: function(file, uploadUrl, token, attrID, progressClassName, progressContainer, isNew) {
                var uploadIntervalId = null;
                var progress = (isNew) ? $('progress.' + progressClassName) : progressContainer.find('progress.' + progressClassName);
                var progressValue;
                var successTrigger = null;
                var newFileObject;
                var deferred = $q.defer();

                Upload.upload({
                    url: uploadUrl,
                    method: 'POST',
                    headers: {
                        'Authorization': "Bearer " + token
                    },
                    file: file
                }).progress(function (evt) {
                    progressValue = parseInt(80.0 * evt.loaded / evt.total);
                    progress.show().attr({
                        value: progressValue
                    });

                    var timeOutSec = 0;
                    if(progressValue == 80 && uploadIntervalId == null) {
                        uploadIntervalId = $interval(function() {
                            timeOutSec++;
                            progress.show().attr({
                                value: parseInt(80 + 19 * timeOutSec / 20.0)
                            });
                        }, 1000);
                    }
                    if(successTrigger) {
                        progress.show().attr({
                            value: 100
                        });
                    }

                }).success(function (response, response2) {
                    deferred.resolve(response);

                    $interval.cancel(uploadIntervalId);
                    progress.attr({
                        value: 100
                    });
                    successTrigger = true;
                }).error(function(e) {
                    $interval.cancel(uploadIntervalId);
                    progress.css({
                        'background': '#c33e35'
                    });
                });

                return deferred.promise;
            },
            removeFile: function(attributeValueId, creatorID) {
                return Restangular.one('attribute', attributeValueId).remove();
            },
            downloadFile: function(attributeValueId) {
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
            }
        };
}]);

creditoCoreServices.factory('UploadFormData', [ 'Upload','$interval', function(Upload, $interval) {
    return {
        uploadFile: function(file, uploadUrl, token, attrID, progressClassName, progressContainer, isNew) {
            var uploadIntervalId = null;
            var progress = (isNew) ? $('progress.' + progressClassName) : progressContainer.find('progress.' + progressClassName);
            var progressValue;

            Upload.upload({
                url: uploadUrl,
                method: 'POST',
                headers: {
                    'Authorization': "Bearer " + token
                },
                file: file
            }).progress(function (evt) {
                progressValue = parseInt(80.0 * evt.loaded / evt.total);
                progress.show().attr({
                    value: progressValue
                });

                var timeOutSec = 0;
                if(progressValue == 80 && uploadIntervalId == null) {
                    uploadIntervalId = $interval(function() {
                        timeOutSec++;
                        progress.show().attr({
                            value: parseInt(80 + 19 * timeOutSec / 20.0)
                        });
                    }, 1000);
                }

            }).success(function (data, status, headers, config) {
                $interval.cancel(uploadIntervalId);
                progress.attr({
                    value: 100
                });
            }).error(function(e) {
                $interval.cancel(uploadIntervalId);
                progress.css({
                    'background': '#c33e35'
                });
            });
        }
    };
}]);

creditoCoreServices.factory('authorizationService', ['$resource', '$q', '$rootScope', '$window', '$location',
    function ($resource, $q, $rootScope, $window, $location) {
        return {
            permissionModel: {
                role: {
                    '1' : LS.roles
                }
            },

            getCurrentPermission: function() {
                var index = -1;

                _.keys(roles).forEach(function(item){
                    if(item == LS.roles) {
                        index = roles[item];
                        return;
                    }
                }, this);

                return index;
            },

            permissionCheck: function (roleCollection) {
                var deferred = $q.defer();

                if(this.permissionModel.role['1'] != LS.roles) {
                    this.permissionModel.role['1'] = LS.roles;
                }

                this.getPermission(this.permissionModel, roleCollection, deferred);

                return deferred.promise;
            },

            arraySwap: function(array,overwriteNewValue,keepKey){
                if(typeof(array)=="undefined") {
                    return false;
                }

                if(typeof(array)!="object"){
                    array=new Array(array);
                }

                var output = new Array();
                if(typeof(overwriteNewValue) == "undefined"){
                    for(var k in array){
                        output[array[k]] = k;
                    }
                } else {
                    if(!keepKey){
                        for(var k in array){
                            output[array[k]] = overwriteNewValue;
                        }} else {
                        for(var k in array){
                            output[k] = overwriteNewValue;
                        }
                    }
                }
                return output;
            },

            getPermission: function (permissionModel, roleCollection, deferred) {
                var ifPermissionPassed = false;

                var swaped = this.arraySwap(LS.roles);

                angular.forEach(roleCollection, function (role) {
                    switch (role) {
                        case roles.Unauthorized:
                            if (swaped.Unauthorized) {
                                ifPermissionPassed = true;
                            }
                            break;

                        case roles.Borrower:
                            if (swaped.Borrower) {
                                ifPermissionPassed = true;
                            }
                            break;

                        case roles.InstInvestorLender:
                            if (swaped.InstInvestorLender) {
                                ifPermissionPassed = true;
                            }
                            break;

                        case roles.InstInvestor:
                            if (swaped.InstInvestor) {
                                ifPermissionPassed = true;
                            }
                            break;

                        case roles.Admin:
                            if (swaped.Admin) {
                                ifPermissionPassed = true;
                            }
                            break;
                    }
                });

                if (!ifPermissionPassed) {
                    var swappedRoles = this.arraySwap(roles);

                    switch('' + permissionModel.role[1]) {
                        case swappedRoles[0]: {
                            $location.path("login");
                        }
                            break;

                        case swappedRoles[1]: {
                            $location.path("get-loan");
                        }
                            break;

                        case swappedRoles[2]: {
                            $rootScope.$broadcast('loginAsInvestor', 1);
                            $location.path('purchasing-groups');
                        }
                            break;

                        case swappedRoles[3]: {
                            $rootScope.$broadcast('loginAsInvestor', 1);
                            $location.path('investor/search');
                        }
                            break;

                        case swappedRoles[4]: {
                            $location.path('admin/faq');
                        }
                            break;

                        default:
                            $location.path("/");
                    }

                    $rootScope.$on('$locationChangeSuccess', function () {
                        deferred.resolve(permissionModel.role[1]);
                    });

                } else {
                    deferred.resolve(permissionModel.role[1]);
                }
            }
        };
    }]);

creditoCoreServices.factory('md5', [function() {

    var md5 = {

        createHash: function(str) {

            var xl;

            var rotateLeft = function(lValue, iShiftBits) {
                return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
            };

            var addUnsigned = function(lX, lY) {
                var lX4, lY4, lX8, lY8, lResult;
                lX8 = (lX & 0x80000000);
                lY8 = (lY & 0x80000000);
                lX4 = (lX & 0x40000000);
                lY4 = (lY & 0x40000000);
                lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
                if (lX4 & lY4) {
                    return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
                }
                if (lX4 | lY4) {
                    if (lResult & 0x40000000) {
                        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                    } else {
                        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                    }
                } else {
                    return (lResult ^ lX8 ^ lY8);
                }
            };

            var _F = function(x, y, z) {
                return (x & y) | ((~x) & z);
            };
            var _G = function(x, y, z) {
                return (x & z) | (y & (~z));
            };
            var _H = function(x, y, z) {
                return (x ^ y ^ z);
            };
            var _I = function(x, y, z) {
                return (y ^ (x | (~z)));
            };

            var _FF = function(a, b, c, d, x, s, ac) {
                a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
                return addUnsigned(rotateLeft(a, s), b);
            };

            var _GG = function(a, b, c, d, x, s, ac) {
                a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
                return addUnsigned(rotateLeft(a, s), b);
            };

            var _HH = function(a, b, c, d, x, s, ac) {
                a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
                return addUnsigned(rotateLeft(a, s), b);
            };

            var _II = function(a, b, c, d, x, s, ac) {
                a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
                return addUnsigned(rotateLeft(a, s), b);
            };

            var convertToWordArray = function(str) {
                var lWordCount;
                var lMessageLength = str.length;
                var lNumberOfWords_temp1 = lMessageLength + 8;
                var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
                var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
                var lWordArray = new Array(lNumberOfWords - 1);
                var lBytePosition = 0;
                var lByteCount = 0;
                while (lByteCount < lMessageLength) {
                    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                    lBytePosition = (lByteCount % 4) * 8;
                    lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
                    lByteCount += 1;
                }
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
                lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
                lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
                return lWordArray;
            };

            var wordToHex = function(lValue) {
                var wordToHexValue = '',
                    wordToHexValue_temp = '',
                    lByte, lCount;
                for (lCount = 0; lCount <= 3; lCount += 1) {
                    lByte = (lValue >>> (lCount * 8)) & 255;
                    wordToHexValue_temp = '0' + lByte.toString(16);
                    wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
                }
                return wordToHexValue;
            };

            var x = [],
                k, AA, BB, CC, DD, a, b, c, d, S11 = 7,
                S12 = 12,
                S13 = 17,
                S14 = 22,
                S21 = 5,
                S22 = 9,
                S23 = 14,
                S24 = 20,
                S31 = 4,
                S32 = 11,
                S33 = 16,
                S34 = 23,
                S41 = 6,
                S42 = 10,
                S43 = 15,
                S44 = 21;

            //str = this.utf8_encode(str);
            x = convertToWordArray(str);
            a = 0x67452301;
            b = 0xEFCDAB89;
            c = 0x98BADCFE;
            d = 0x10325476;

            xl = x.length;
            for (k = 0; k < xl; k += 16) {
                AA = a;
                BB = b;
                CC = c;
                DD = d;
                a = _FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
                d = _FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
                c = _FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
                b = _FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
                a = _FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
                d = _FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
                c = _FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
                b = _FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
                a = _FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
                d = _FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
                c = _FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
                b = _FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
                a = _FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
                d = _FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
                c = _FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
                b = _FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
                a = _GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
                d = _GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
                c = _GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
                b = _GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
                a = _GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
                d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453);
                c = _GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
                b = _GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
                a = _GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
                d = _GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
                c = _GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
                b = _GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
                a = _GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
                d = _GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
                c = _GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
                b = _GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
                a = _HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
                d = _HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
                c = _HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
                b = _HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
                a = _HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
                d = _HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
                c = _HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
                b = _HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
                a = _HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
                d = _HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
                c = _HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
                b = _HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
                a = _HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
                d = _HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
                c = _HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
                b = _HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
                a = _II(a, b, c, d, x[k + 0], S41, 0xF4292244);
                d = _II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
                c = _II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
                b = _II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
                a = _II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
                d = _II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
                c = _II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
                b = _II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
                a = _II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
                d = _II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
                c = _II(c, d, a, b, x[k + 6], S43, 0xA3014314);
                b = _II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
                a = _II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
                d = _II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
                c = _II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
                b = _II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
                a = addUnsigned(a, AA);
                b = addUnsigned(b, BB);
                c = addUnsigned(c, CC);
                d = addUnsigned(d, DD);
            }

            var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);

            return temp.toLowerCase();
        }
    };

    return md5;

}]);

creditoCoreServices.factory('BankService', ['Restangular', function (Restangular) {
    var Element = {};
    Element.bankAccount = [];
    Element.submitAccount = function () {
        return Restangular.all('account/attributes')
            .post(this.bankAccount);
    };
    return Element;
}]);

creditoCoreServices.factory('BorrowerService', ['$rootScope', 'Restangular', function ($rootScope, Restangular) {
    var Element = {};
    Element.getCooperative = function () {
        return Restangular.one('borrower').one('cooperative').get({});
    };
    return Element;
}]);

creditoCoreServices.factory('EmailAndPasswordConfirmService', ['Restangular', 'md5', function (Restangular, md5) {
    return {
        confirmPassword: function(userId, emailToken, passwordToken, newPassword) {
            return Restangular.one('user', userId).one('emailandpassword').all('confirmation').post({}, {'emailToken': emailToken, 'passwordToken': passwordToken, 'newPassword': md5.createHash(newPassword)});
        }
    }
}]);