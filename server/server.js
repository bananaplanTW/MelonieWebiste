var express = require('express'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    mongooseDB = require('../db/db.js'),
    looger = require('morgan'),
    path = require('path'),
    methodOverride = require('method-override'),
    dust_engine = require('dustjs-linkedin'),
    dust_helper = require('dustjs-helpers'),
    cons = require('consolidate'),
    app = express(),
    auth = require('../routes/auth'),
    login = require('../routes/login'),
    logout = require('../routes/logout'),
    school = require('../routes/school'),
    search = require('../routes/search'),
    join = require('../routes/join'),
    home = require('../routes/home'),
    region = require('../routes/region'),
    upload = require('../routes/upload'),
    post = require('../routes/post'),
    geoCoding = require('../routes/geoCoding'),
    group = require('../routes/group'),
    error = require('../routes/error'),
    httpLogFile;

// setting up template engine
app.set('port', process.env.PORT | 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'dust');
app.engine('dust', cons.dust);
cons.dust.debugLevel = 'DEBUG';

//app.use(logger('combined', {stream: httpLogFile}))
app.use(bodyParser.json());
app.use(multer({
    dest: path.join(__dirname, '../public/assets/images/uploads'), 
    fileSize: 1000,
    onFileUploadStart: function (file) {
        console.log("file starts to upload");
    }}));
app.use(methodOverride());
app.use(cookieParser())
app.use(session({
    key: "ra",
    secret: "Gad@#$5fncd9$2230-=;SDf/][123f",
    store: new MongoStore({
        db: "school"
    })}));
app.use(express.static(path.join(__dirname, '../public')));

app.use(auth);
app.use('/login', login);
app.use('/logout', logout);
app.use('/post', bodyParser.urlencoded(), post);
app.use('/getGeoCoding', geoCoding);
app.use('/school', school);
app.use('/search', search);
app.use('/upload', bodyParser.urlencoded(), upload);
app.use(home);
app.use('/g', group);
app.use('/r', region);
app.use(error);

app.listen(app.get('port'), function () {
	console.log("server now listen to port", app.get('port'));
});