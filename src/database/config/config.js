require('dotenv').config()

const env = process.env.NODE_ENV || 'development'

const config = {
	development: {
		db_host: process.env.DEVELOPMENT_DB_HOST
	},
	production: {}
}

module.exports = {
	db_host: config[env].db_host
}
