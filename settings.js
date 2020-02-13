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
		withdrawLoading: false,
		transactions: []
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
		getApi(`/transactions`, '', function (data, status) {
			settings.transactions = JSON.parse(data);
		});
	},
  filters: {
    convert: function (value) {
      return moment(value, 'x').fromNow();
    }
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
				settings.withdrawLoading = false;
				if (status == 500) {
					settings.withdrawAddressError = 'Our servers encountered a problem while processing your withdraw.';
				}
				else if (status == 400) {
					settings.withdrawAddressError = JSON.parse(data).message || 'There was a problem withdrawing to this address. Please ensure that this address isn\'t invalid.';
				}
				else {
					location.reload();
				}
			});
		},
		copy: function (selector) {
			var el = document.querySelector(`${selector}`);
			el.select();
			document.execCommand('copy');
		}
	}
})