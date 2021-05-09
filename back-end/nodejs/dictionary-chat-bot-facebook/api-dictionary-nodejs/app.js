const path = require('path')
const express = require('express')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')

const AppError = require('./ultis/appError')
const globalErrorHandler = require('./controllers/errorControler')
const dicRouter = require('./routes/dicRoutes')

// Start express app
const app = express()

app.enable('trust proxy')

// !. Global middlewares
// Implement CORS
app.use(cors())
// Access-Control-Allow-Origin *
// api.thichtienganh.com, front-end thichtienganh.com
// app.use(cors({
//   origin: 'https://www.thichtienganh.com'
// }))

app.options('*', cors())
// app.options('/api/v1/dics/:id', cors());

// Set security HTTP headers
app.use(helmet())

// Developmnet logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
})

app.use('/api', limiter)

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

// Data sanitization against NoSQL query injection
app.use(mongoSanitize())

// Data sanitization against XSS
app.use(xss())

// compression middleware
app.use(compression())

// 3. routes

app.use('/api/v1/dics', dicRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

module.exports = app
