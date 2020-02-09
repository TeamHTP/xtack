var API_ROOT = 'https://api.xtack.space';

function getApi(endpoint, params, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', `${API_ROOT}${endpoint}${params}`, true);
	xhr.withCredentials = true;
	var token = Cookies.get('session_token');
	if (typeof token !=== 'undefined') {
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
	if (typeof token !=== 'undefined') {
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
