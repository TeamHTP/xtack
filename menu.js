var menuApp = new Vue({
	el: '#menu-app',
	data: {
		balance: 0,
		username: 0,
	},
	created: function() {
		getApi('/wallet', '', function (data, status) {
			if (status == 403) {
				location.href = '/signin.html';
			}
			menuApp.username = JSON.parse(data).username;
		});
	}
});