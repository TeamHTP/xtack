var settings = new Vue({
	el: '#settings',
	data: {
		email: '',
		username: '',
		address: ''
	},
	created: function() {
		getApi(`/account`, '', function (data, status) {
			var account = JSON.parse(data);
			settings.email = account.email;
			settings.username = account.username;
		});
		getApi(`/wallet`, '', function (data, status) {
			settings.address = JSON.parse(data).address;
		});
	}
})