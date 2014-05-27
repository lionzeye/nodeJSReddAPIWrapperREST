// IMPORTS
var rest = require('restler');

// VARIABLES
var apiKeyGET = 'YOURKEY';
var apiKeyPOST = 'YOURKEY';

var baseURL = 'https://api.reddapi.com/v1/json/';

// ASYNC. FUNCTIONS -> REQUEST-TEMPLATES
var requestGET = function(url, callback) {
rest.get(url).on('complete', function(result) {
  if (result instanceof Error) {
    console.log('Error:', result.message);
    this.retry(5000); 
  } else {
    callback(result);
  }
});
};

var requestPOST = function(url, params, callback) {
rest.post(url, params).on('complete', function(result) {
  if (result instanceof Error) {
    console.log('Error:', result.message);
    this.retry(5000); 
  } else {
    callback(result);
  }
});
}

// ASYNC. FUNCTIONS -> GET-REQUESTS
var getUserBalance = function(userName) {
var command = 'GetUserBalance';
requestGET(baseURL + command + '/' + apiKeyGET + '/' + userName, getUserBalanceCallback);
};

var getUserBalanceDetail = function(userName) {
var command = 'GetUserBalanceDetail';
requestGET(baseURL + command + '/' + apiKeyGET + '/' + userName, getUserBalanceDetailCallback);
};


var getUserInfo = function(userName) {
var command = 'GetUserInfo';
requestGET(baseURL + command + '/' + apiKeyGET + '/' + userName, getUserInfoCallback);
};

var getUserList = function() {
var command = 'GetUserList';
requestGET(baseURL + command + '/' + apiKeyGET, getUserListCallback);
};

// ASYNC. FUNCTIONS -> POST-REQUESTS
var createNewUser = function(userName) {
var command = 'CreateNewUser';
obj = {APIKey: apiKeyPOST, Username: userName};
var json = JSON.stringify(obj);
var options = {
    data: json,
    headers: {'Content-type': 'application/json'}
};
requestPOST(baseURL + command, options, createNewUserCallback);
};

var moveToUser = function(userNameFrom, userNameTo, amount) {
var command = 'MoveToUser';
obj = {APIKey: apiKeyPOST, UsernameFrom: userNameFrom, UsernameTo: userNameTo, Amount: amount};
var json = JSON.stringify(obj);
var options = {
    data: json,
    headers: {'Content-type': 'application/json'}
};
requestPOST(baseURL + command, options, moveToUserCallback);
};

var sendToAddress = function(userNameFrom, addressTo, amount) {
var command = 'sendToAddress';
obj = {APIKey: apiKeyPOST, UsernameFrom: userNameFrom, AddressTo: addressTo, Amount: amount};
var json = JSON.stringify(obj);
var options = {
    data: json,
    headers: {'Content-type': 'application/json'}
};
requestPOST(baseURL + command, options, sendToAddressCallback);
};

// CALLBACK-FUNCTIONS -> GET-REQUESTS
var getUserBalanceCallback = function(data) {
  // DO SOMETHING WITH THE DATA IN HERE
  console.log('---USER-BALANCE---');
  console.log(data);
};

var getUserBalanceDetailCallback = function(data) {
  // DO SOMETHING WITH THE DATA IN HERE
  console.log('---USER-BALANCE-DETAIL---');
  console.log(data);
};


var getUserInfoCallback = function(data) {
  // DO SOMETHING WITH THE DATA IN HERE
  console.log('---USER-INFO------');
  console.log(data);
};

var getUserListCallback = function(data) {
  // DO SOMETHING WITH THE DATA IN HERE
  console.log('---USER-LIST------');
  console.log(data);
};

// CALLBACK-FUNCTIONS -> POST-REQUESTS
var createNewUserCallback = function(data) {
  // DO SOMETHING WITH THE DATA IN HERE
  console.log('---NEW-USER-INFO--');
  console.log(data);
};

var moveToUserCallback = function(data) {
  // DO SOMETHING WITH THE DATA IN HERE
  console.log('---MOVE-INFO------');
  console.log(data);
};

var sendToAddressCallback = function(data) {
  // DO SOMETHING WITH THE DATA IN HERE
  console.log('---TX-INFO--------');
  console.log(data);
};

// CALLING THE FUNCTIONS -> EXAMPLE
createNewUser('SOMEUSERNAME');
moveToUser('SOMEUSERNAME', 'SOMEUSERNAME', 1);
sendToAddress('SOMEUSERNAME', 'SOMEADDRESS', 1);
getUserBalance('SOMEUSERNAME');
getUserBalanceDetail('SOMEUSERNAME');
getUserInfo('SOMEUSERNAME');
getUserList();
