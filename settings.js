var settings = new Vue({
	el: '#settings',
	data: {
		email: '',
		username: '',
		xaddress: '',
		raddress: '',
		withdrawAddress: '',
		withdrawAddressError: false,
		withdrawConfirm: false,
		withdrawConfirmError: false
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
	},
	methods: {
		withdraw: function() {
			this.withdrawAddressError = false;
			this.withdrawConfirmError = false;
			if (!this.withdrawConfirm) {
				this.withdrawConfirmError = 'Please recognize that this action is irreversable.';
				return;
			}
			getApi(`/withdraw`, `?address=${withdrawAddress}`, function (data, status) {
				location.reload();
			});
		}
	}
})