import * as Yup from 'yup';

export const signUpValidation = Yup.object().shape({
	user_fullname: Yup.string()
		.required('Please let us know your full name.')
		.min(2, 'Your first name is most likely longer than that!'),
	user_username: Yup.string()
		.required('Please select a cool username. ')
		.min(3, ' Username should be at least 3 characters long.'),
	user_email: Yup.string()
		.email('Please provide a valid email address.')
		.required('Email is required on Bazaar.'),
	user_password: Yup.string().required('Please protect your account with a password. '),
});

export const LogInValidation = Yup.object().shape({
	user_email: Yup.string()
		.email('Please provide a valid email address.')
		.required('Your email is required to log in!'),
	user_password: Yup.string().required('Your password is required to log in!'),
});
