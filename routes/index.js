var express  = require("express");
var router   =  express.Router();
var passport =require("passport");
var User =require("../models/user")
var middelware =  require("../middleware")
//=======================================================================//
router.get("/",function(req,res){
	res.render("landing")
})


//=======================================================//
// A U T H A N T I C A T I O N   R O U T E S
//===================================================//
//**SHOW REGISTER FORM
router.get("/register",function(req,res){
	res.render("register")
})
//++ handle sign up logic
router.post("/register",function(req,res){
	var newUser = new User({username: req.body.username})
	User.register(newUser,req.body.password, function(err,user){
		if(err){
			console.log(err)
			req.flash("error",err.message)
			console.log(err)
			return res.render("register")
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success","Welecome to Yelp camp "  +  user.username)
			res.redirect("/campground")
		})
	
	})
})

//** SHOW LOGIN FORM
router.get("/login",function(req,res){
	res.render("login")
})
//** RESPONSIBLE FOR HANDLING LOG IN LOGIC
//app.post("/login", middleware ,callback) it is use below
router.post("/login",passport.authenticate("local",
	{
	  successRedirect:"/campground",
	  failureRedirect:"/login"
    }),function(req,res){
	
})
// LOG OUT LOGIC
router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","LOGGING YOU OUT")
	res.redirect("/campground")
})


module.exports=router;