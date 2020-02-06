//==========================================//
//V A R I A B L E  D E F I N I N G  A R E A
//==========================================//

var express       = require("express"),
    mongoose      = require("mongoose"),
    app           = express(),
	flash         = require("connect-flash"),
	passport      = require("passport"),
	LocalStrategy = require("passport-local"),
    bodyParser    = require("body-parser"),
	Campground    = require("./models/campground"),
	Comment       = require("./models/comment"),
    User          = require("./models/user"),
	seedDB        = require("./seeds")
	
var commentRoutes      =  require("./routes/comments"),
    campgroundRoutes   =  require("./routes/campground"),
	indexRoutes        =  require("./routes/index"),
    methodOverride     =  require("method-override")
//++++++++++++++++++++++++++++++++++++++++++++++++++//
//var url = process.env.DATABASEURL || "mongodb://localhost:27017/yelp_camp_2"
//console.log(process.env.DATABASEURL);
//===========================================//
//M O N G O O S E   C O O N E C T I O N
//============================================//
mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true, useCreateIndex: true});
//mongoose.connect('mongodb+srv://yelpcamp:dragonkaku@cluster0-fkscf.mongodb.net/test?retryWrites=true&w=majority',{
//	useNewUrlParser: true,
//	useCreateIndex: true
//})
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());
// render seed .js script
//seedDB();//seed the data

//===================================================================//
//         P A S S P O R T        C O N F I U R A T I O N
//===================================================================//
app.use(methodOverride("_method"));
app.use(require("express-session")({
	secret: "kaku right the best codes for web development",
	resave: false,
	saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error=req.flash("error")
	res.locals.success=req.flash("success")
	next();

})
//---------------------------//
//APP USE CONFIGURATION FOR SUB FILES
//----------------------------//
app.use(commentRoutes);
app.use(indexRoutes);
app.use(campgroundRoutes);


// USED FOR STARTING THE SERVER ON THE GIVEN PORT
//app.listen(3000,function(){
//	console.log("Yelcamp Server Started")
//})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});





