
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , engine = require('ejs-locals')
  , grunt = require('grunt')
  , passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy
  , ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
  
var app = express();


// map .renderFile to ".html" files
app.engine('ejs', engine);
app.engine('html', require('ejs').renderFile);

// Configuration
app.set('views', __dirname);
app.set('view engine', 'html');
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use('/public', express.static(path.join(__dirname, 'public')));

// Session information
app.use(express.cookieParser("thissecretrocks"));
app.use(express.bodyParser());
app.use(express.methodOverride()); // must come after bodyParser
app.use(express.session({ secret: 'thissecretrocks', cookie: { maxAge: 60000 } }));
app.use(passport.initialize());
app.use(passport.session());

// Router
app.use(app.router);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// TODO: Hide this
var TWITTER_CONSUMER_KEY = "DZ6rPdWiVJOFuKG47wFDlg"; //Nope
var TWITTER_CONSUMER_SECRET = "hA4MCr6fC38FLz4cgdzyAtihH47kb8wvsviYbpViBw"; //Nope
 
passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    // NOTE: You'll probably want to associate the Twitter profile with a
    //       user record in your application's DB.
    var user = profile;
    return done(null, user);
  }
)); 


// Load up index.html
app.get('/', function(request, response) {
	response.render('public/index.html');
});


// Login flow
app.get('/account',
  ensureLoggedIn('/login'),
  function(req, res) {
    res.send('Hello ' + req.user.username);
 });
app.get('/login',
  function(req, res) {
	res.render('public/login.html');
 });
app.get('/logout',
  function(req, res) {
    req.logout();
    res.redirect('/');
});

// Twitter routes
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { successReturnToOrRedirect: '/', failureRedirect: '/login' }));

// Forum Posts
app.get('/post', function(request, response) {
	response.render('public/post.html');
});

// API locations
app.get('/api', routes.posts.all);
app.get('/api/:id', routes.posts.one);
app.post('/api', routes.posts.create);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
