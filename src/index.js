import '@babel/polyfill'
import express from 'express'
import log from 'fancy-log'
import expressValidator from 'express-validator'
import compression from 'compression'
import cors from 'cors'
import expressWinston from 'express-winston'
import winston from 'winston'
import router from './routes'

const isProduction = process.env.NODE_ENV === 'production'

const app = express()
const corsOptions = {
	credentials: true,
	origin: [],
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

// compression and header security middleware
app.use(compression())

app.use(
	expressWinston.logger({
		transports: [new winston.transports.Console()],
		meta: false,
		expressFormat: true,
		colorize: true,
		format: winston.format.combine(
			winston.format.colorize(),
			winston.format.simple()
		)
	})
)

app.use(express.json())

app.use(expressValidator())

app.use(router)

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const error = new Error(`Resource '${req.url}' does not exist`)
	error.status = 404
	next(error)
})

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
	if (!isProduction) {
		log(error.stack)
	}
	return res.status(error.status || 500).json({
		error: {
			status: error.status || 500,
			message: error.message
		}
	})
})

// configure port and listen for requests
const port =
	parseInt(process.env.NODE_ENV === 'test' ? 8378 : process.env.PORT, 10) ||
	5000
export const server = app.listen(port, () => {
	log(`Server is running on http://localhost:${port} `)
})

export default app