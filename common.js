var API_ROOT = 'https://api.xtack.space';

function getApi(endpoint, params, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', `${API_ROOT}${endpoint}${params}`, true);
	xhr.withCredentials = true;
	var token = Cookies.get('session_token');
	if (typeof token !== 'undefined' && token.length > 0) {
		xhr.setRequestHeader('Authorization', `Bearer ${token}`);
	}
	xhr.onreadystatechange = function() {
	    if (xhr.readyState == 4) {
	        callback(xhr.responseText, xhr.status);
	    }
	}
	xhr.send(null);
}

function postApi(endpoint, params, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', `${API_ROOT}${endpoint}`, true);
	xhr.withCredentials = true;
	var token = Cookies.get('session_token');
	if (typeof token !== 'undefined' && token.length > 0) {
		xhr.setRequestHeader('Authorization', `Bearer ${token}`);
	}
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function() {
	    if (xhr.readyState == 4) {
	        callback(xhr.responseText, xhr.status);
	    }
	}
	xhr.send(params);
}

function isEmailValid(mail) {
	return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
}

var accountsCache = {};
function queryAccountsCache(uuid, callback) {
	if (typeof accountsCache[uuid] === 'undefined') {
		accountsCache[uuid] = {};
		accountsCache[uuid].callbackQueue = [ callback ];
		getApi(`/account/${uuid}`, '', function(data, status) {
			if (status === 200) {
				accountsCache[uuid].account = JSON.parse(data);
				for (var i in accountsCache[uuid].callbackQueue) {
					accountsCache[uuid].callbackQueue[i](accountsCache[uuid].account);
				}
			}
		});
	}
	else if (typeof accountsCache[uuid].account === 'undefined') {
		accountsCache[uuid].callbackQueue.push(callback);
	}
	else {
		callback(accountsCache[uuid].account);
	}
}
