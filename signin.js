var signinApp = new Vue({
	el: '#signin-form',
	data: {
		email: '',
		password: '',
		loading: false,
		emailError: false,
		passwordError: false
	},
	methods: {
		signin: function() {
			if (signinApp.loading) {
				return;
			}
			var error = false;
			signinApp.emailError = false;
			signinApp.passwordError = false;
			signinApp.tosError = false;
			if (!isEmailValid(signinApp.email)) {
				signinApp.emailError = 'Your email seems to be invalid.';
				error = true;
			}
			if (signinApp.password.length < 6) {
				signinApp.passwordError = 'Your password must be at least 6 characters long.';
				error = true;
			}
			if (!error) {
				signinApp.loading = true;
				getApi('/auth', `?&email=${signinApp.email}&password=${signinApp.password}`, function(data, status) {
					if (status === 404) {
						signinApp.emailError = signinApp.passwordError = 'Your supplied credientials do not belong to any existing account.';
						return;
					}
					Cookies.set('session_token', data, { expires: 7 });
					console.log(data);
					location.href="/questions.html";
					signinApp.loading = false;
				});
			}			
		}
	}
});