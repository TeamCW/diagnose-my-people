var express = require('express');
var app = express();
var bodyParser = require('body-parser');



var passport = require('./strategies/sql.localstrategy');
var sessionConfig = require('./modules/session.config');

// Route includes
var indexRouter = require('./routes/index.router');
var userRouter = require('./routes/user.router');
var registerRouter = require('./routes/register.router');
var adminRouter = require('./routes/admin.router');
var surveyRouter = require('./routes/survey.router');
var dashboardRouter = require('./routes/dashboard.router');
var buildSurveyRouter = require('./routes/buildsurvey.router');
var adminSurveyReview = require('./routes/admin-survey-review.router');

var port = process.env.PORT || 5000;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve back static files
app.use(express.static('./server/public'));

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/register', registerRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter)
app.use('/survey', surveyRouter);
app.use('/dashboard', dashboardRouter);
app.use('/buildsurvey', buildSurveyRouter);
app.use('/admin-survey-review', adminSurveyReview);

// Catch all bucket, must be last!
app.use('/', indexRouter);

// Listen //
app.listen(port, function(){
   console.log('Listening on port:', port);
});