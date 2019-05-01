const { Pool } = require('pg');

let host,
	user,
	password,
	database = '';

switch (process.env.NODE_ENV) {
	case 'staging':
		host = 'bazaardb1.cfz8akdbftjm.us-east-2.rds.amazonaws.com';
		user = 'bazaar_user';
		password = 'bazaarpass';
		database = 'bazaardb1';
		break;
	case 'development':
		host = 'localhost';
		user = 'postgres';
		password = 'root';
		database = 'postgres';
		break;
	case 'production':
		host = 'localhost';
		user = 'postgres';
		break;
	default:
		break;
}

const postgres = new Pool({
	host: host || 'localhost',
	user: user || 'postgres',
	password: password || 'root',
	database: database || 'postgres',
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000,
});

module.exports = postgres;

// {
// 	"db": {
// 		"user": "bazaar_user",
// 		"password": "bazaarpass",
// 		"host": "bazaardb1.cfz8akdbftjm.us-east-2.rds.amazonaws.com",
// 		"port": 5432,
// 		"database": "bazaardb1",
// 		"schema": "bazaar"
// 	}
// }
