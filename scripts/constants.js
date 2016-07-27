//'use strict';

var constants = angular.module('constants', []);

constants.constant('CONFIG', {
  "API_URL" : "https://www.credito.co.il/api/",
  "SITE_URL" : "https://credito.igniteoutsourcing.com/allinone",
  "MAX_CHILDREN_NUMBER": "20",
  "MAX_LOAN_NUMBER": "84",
  "MAX_LOAN_SUM": "2000000",
  "MIN_LOAN_SUM": "10000",
  "MAX_YEAR_LIMIT":"50",


  "RESET_STATUS": -1,
  "APPROVE_MAIL_STATUS": 0,
  "REGISTER_STATUS": 1,
  "PERSONAL_STATUS": 2,
  "SALARY_STATUS": 3,
  "UPLOAD_STATUS": 4,
  "VERIFICATION_STATUS": 5,
  "LOAN_STATUS": 6,

  "CHECK_VERIFICATION_ID": 0,

  "MAX_COLLATERALS_ROW": 5,

  "SCROLL_TO_UP_DURATION": 300,

  "REFRESH_TOKEN_INTERVAL": 30
});
