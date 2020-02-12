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
		withdrawConfirmError: false,
		withdrawLoading: false
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
			if (this.withdrawLoading) {
				return;
			}
			this.withdrawAddressError = false;
			this.withdrawConfirmError = false;
			if (!this.withdrawConfirm) {
				this.withdrawConfirmError = 'Please recognize that this action is irreversable.';
				return;
			}
			this.withdrawLoading = true;
			getApi(`/withdraw`, `?address=${this.withdrawAddress}`, function (data, status) {
				this.withdrawLoading = false;
				location.reload();
			});
		}
	}
})