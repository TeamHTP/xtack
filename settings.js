var settings = new Vue({
	el: '#settings',
	data: {
		email: '',
		username: '',
		xaddress: '',
		raddress: ''
	},
	created: function() {
		getApi(`/account`, '', function (data, status) {
			var account = JSON.parse(data);
			settings.email = account.email;
			settings.username = account.username;
		});
		getApi(`/wallet`, '', function (data, status) {
			settings.xaddress = JSON.parse(data).addresses.xaddress;
			settings.raddress = JSON.parse(data).addresses.raddress;
		});
	}
})