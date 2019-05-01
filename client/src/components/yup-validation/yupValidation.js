import * as Yup from 'yup';

export const signUpValidation = Yup.object().shape({
	user_first_name: Yup.string()
		.required('Please let us know your first name.')
		.min(2, 'Your first name is most likely longer than that!'),
	user_last_name: Yup.string()
		.required('Please let us know your last name.')
		.min(2, 'Your last name most likely longer than that!'),
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

export const AddItemValidation = Yup.object().shape({
	item_name: Yup.string()
		.required('You must name your item on Bazaar.')
		.min(3, 'The item name must be at least 3 characters long')
		.max(50, 'The item name must be at maximum 50 characters long'),
	item_type: Yup.string()
		.required('What type of item are your trying to sell on Bazaar?')
		.min(3, 'The item type must be at least 3 characters long')
		.max(25, 'The item type must be at maximum 25 characters long'),
	item_price: Yup.number()
		.required('You must provide a price if you want to sell your item!')
		.positive('The price must be a positive number')
		.moreThan(1.0, 'The price for an item must be over 1.00$'),
	item_quantity_avail: Yup.number()
		.required('How many items like this one can you sell today?')
		.positive('The quantity must be a positive number')
		.moreThan(0, 'The minimum quantity for an item must be of at least 1'),
	item_description: Yup.string()
		.required('You must provide a basic item description on Bazaar')
		.min(10, 'You must provide an item description of at least 10 characters.')
		.max(400, 'Sorry, the item description must less than 400 characters. '),
	item_condition: Yup.string()
		.required('You must describe what the current condition of the item is.')
		.min(3, 'The item condition must be at least 3 characters long')
		.max(25, 'The item condition must be less than 25 characters long'),
});
