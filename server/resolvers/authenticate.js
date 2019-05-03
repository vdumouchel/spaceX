const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

const authenticate = (app, req) => {
	try {
		const jwtCookie = req.cookies['spaceexplorers_app'];
		const verified_information = jwt.verify(jwtCookie, 'secret');
		return verified_information.data;
	} catch (e) {
		throw e.message;
	}
};

module.exports = authenticate;
