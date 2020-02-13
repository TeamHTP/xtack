var signupApp = new Vue({
	el: '#signup-form',
	data: {
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		tos: false,
		loading: false,
		usernameError: false,
		emailError: false,
		passwordError: false,
		tosError: false
	},
	methods: {
		signup: function() {
			if (signupApp.loading) {
				return;
			}
			var error = false;
			signupApp.usernameError = false;
			signupApp.emailError = false;
			signupApp.passwordError = false;
			signupApp.tosError = false;
			if (signupApp.username.length < 3 || signupApp.username.length > 24) {
				signupApp.usernameError = 'Your username must be between 3 and 24 characters.';
				error = true;
			}
			if (!isEmailValid(signupApp.email)) {
				signupApp.emailError = 'Your email seems to be invalid.';
				error = true;
			}
			if (signupApp.password != signupApp.confirmPassword) {
				signupApp.passwordError = 'Your passwords don\'t match.';
				error = true;
			}
			if (signupApp.password.length < 6) {
				signupApp.passwordError = 'Your password must be at least 6 characters long.';
				error = true;
			}
			if (!signupApp.tos) {
				signupApp.tosError = 'Please accept the terms & conditions.';
				error = true;
			}
			if (!error){
				signupApp.loading = true;
				postApi('/account', `username=${signupApp.username}&email=${signupApp.email}&password=${signupApp.password}&tos=${signupApp.tos}`, function(data, status) {
					if (status === 200) {
						location.href = '/signin.html';
					}
					console.log(data);
					signupApp.loading = false;
				});
			}			
		}
	}
});