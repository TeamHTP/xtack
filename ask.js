var askApp = new Vue({
	el: '#ask-app',
	data: {
		title: '',
		body: '',
		bounty: 0,
		tos: false,
		loading: false,
		titleError: false,
		bodyError: false,
		bountyError: false,
		tosError: false
	},
	methods: {
		ask: function() {
			var error = false;
			this.titleError = false;
			this.bodyError = false;
			this.bountyError = false;
			this.tosError = false;
			if (this.title.length < 10) {
				this.titleError = 'Your title is too short.';
				error = true;
			}
			if (this.title.length > 140) {
				this.titleError = 'Your title must not be over 140.';
				error = true;
			}
			if (this.body.length < 24) {
				this.bodyError = 'Your question body is too short.';
				error = true;
			}
			if (this.body.length > 2040) {
				this.bodyError = 'Your question body must not be over 2040 characters.';
				error = true;
			}
			if (!this.tos) {
				this.tosError = 'Please accept the terms & conditions.';
				error = true;
			}
			if (!error) {
				this.loading = true;
				postApi('/question', `title=${this.title}&body=${this.body}&bounty=${this.bounty}`, function (data, status) {
					if (status == 400) {
						askApp.bountyError = 'Your account does not have enough balance to cover this transaction.';
					}
					else if (status == 200) {
						location.href = `/question.html#${JSON.parse(data).uuid}`;
					}
					askApp.loading = false;
				});
			}
		}
	}
})