var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongooseConfig = require('./database/config')
var qiniu = require('./routes/qiniu')
var session = require('express-session')
var router = express.Router();

var news = require('./routes/news');
var index = require('./routes/index');
var users = require('./routes/users')
var DJYDT = require('./routes/DJYDT');
var DYLSF = require('./routes/DYLSF');
var ZZXX = require('./routes/ZZXX');
var SSSDX = require('./routes/SSSDX');
var SSSDP = require('./routes/SSSDP');
var ZDJS = require('./routes/ZDJS');
var TSHD = require('./routes/TSHD');
var TZZZD = require('./routes/TZZZD');
var LBT = require('./routes/LBT');
var login = require('./routes/login');
var logout = require('./routes/logout');
var SXHB = require('./routes/SXHB');
var XDZJ = require('./routes/XDZJ');
var GRZJ = require('./routes/GRZJ');
var DYYHD = require('./routes/DYYHD')
var branch = require('./routes/branch')
var XGMM = require('./routes/XGMM')
var MZPY = require('./routes/MZPY')
var getData = require('./routes/getData')
var invitation = require('./routes/invitation')
var isLogin = require('./routes/isLogin')
var client = require('./routes/client')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret:'nan',
    resave:false,
    saveUninitialized:false,
    cookie:{
      secure:false
    },
}))

app.use('/',qiniu);
app.use('/api/login',login);
app.use('/', index);
app.get("/api/getData",(req,res,next)=>{
    console.log(111)
    getData().then(data=>{
        res.json({
            data,
            code:200,
            msg:"success"
        })
    })
})
app.use('/api',news);
app.use('/api/news',news);
app.use('/api/DJYDT',DJYDT);
app.use('/api/DYLSF',DYLSF);
app.use('/api/ZZXX',ZZXX);
app.use('/api/SSSDX',SSSDX);
app.use('/api/SSSDP',SSSDP);
app.use('/api/ZDJS',ZDJS);
app.use('/api/TSHD',TSHD);
app.use('/api/TZZZD',TZZZD);
app.use('/api/LBT',LBT);
app.use('/api/branch',branch)
app.use('/api/MZPY',MZPY)
app.use("/client",client)

app.use((req,res,next)=>{
if(req.session.user){
    next();
}
else{
    res.json({
        data:'用户未登录',
    code:400,
        msg:'用户未登录',
        ret:false
    })
    return
}
})
app.use('/api/SXHB',SXHB);
app.use('/api/XDZJ',XDZJ);
app.use('/api/GRZJ',GRZJ);
app.use('/api/DYYHD',DYYHD);
app.use('/api/users',users);
app.use('/api/XGMM',XGMM);
app.use('/api/logout',logout);
app.use('/api/invitation',invitation)
app.use('/api/isLogin',isLogin);







// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
