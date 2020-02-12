var menuApp = new Vue({
	el: '#menu-app',
	data: {
		balance: '...',
		username: '...',
		account_uuid: ''
	},
	created: function() {
		getApi('/wallet', '', function (data, status) {
			if (status == 403) {
				location.href = '/signin.html';
			}
			menuApp.balance = JSON.parse(data).balance / 1000000;
		});
		getApi('/account', '', function (data, status) {
			if (status == 403) {
				location.href = '/signin.html';
			}
			var account = JSON.parse(data);
			menuApp.username = account.username;
			menuApp.account_uuid = account.uuid;
		});
	}
});