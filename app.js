var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var mongoStore = require('connect-mongo')(session)
var port  = process.env.PORT || 3000
var dbUrl = 'mongodb://localhost/imooc'
var app = express()
var morgan = require('morgan')
mongoose.connect(dbUrl)

var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()
app.set('views','./app/views/pages')
app.set('view engine','jade')
app.use(multipartMiddleware)
app.use(bodyParser.urlencoded())
app.use(cookieParser())
app.use(session({
	secret: 'imooc',
	store: new mongoStore({
		url: dbUrl
	})
}))

if ('development' === app.get('env')){
	app.set('showStackError', true)
	app.use(morgan(':method :url :status'))
	app.locals.pretty = true
	mongoose.set('debug', true)
}

require('./config/route.js')(app)

app.listen(port)
app.use(express.static(path.join(__dirname,'public')))
app.locals.moment=require('moment')
console.log('imooc started on port '+port)

