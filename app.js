// application

var express = require('express'),
    app = express(),
    setupHandlebars  = require('./app/setupHandlebars.js')(app),
    setupPassport = require('./app/setupPassport'),
    flash = require('connect-flash'),
    appRouter = require('./app/routers/appRouter.js')(express),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    jsonParser = bodyParser.json();
var cors = require('cors');
var port = process.env.PORT || 8080
var io = require('socket.io');
var myEmitter = require('./app/socket')


app.use(cookieParser())
app.use(session({ secret: '4564f6s4fdsfdfd', resave: false, saveUninitialized: false }))

app.use('/styles', express.static(__dirname + '/styles'))

app.use(flash())
app.use(function(req, res, next) {
    res.locals.errorMessage = req.flash('error')
    next()
});

app.use(jsonParser)
app.use(bodyParser.urlencoded({
  extended: true
}))
var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
setupPassport(app)

app.use('/', appRouter)

// start app
var server = app.listen(port)
io(server).on('connection', (socket) => {
    function handle(data) {
        let msg = `${data.trans.to},${data.trans.amount}`
        socket.emit(`${data.id}`, msg)
    }
    let a = handle.bind({socket: socket});
    myEmitter.on('push', a)
});
console.log('Server started on port ' + port)
module.exports.getApp = app;