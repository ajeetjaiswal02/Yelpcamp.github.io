var express     = require("express");
var router      =  express.Router();
var Campground  = require("../models/campground")
var Comments    = require("../models/comment")
var middelware =  require("../middleware")

//========================//
//C A M P G R O U N D ROUTES
//========================//
//Home page route show all campgr
router.get("/", function(req,res){
	res.render("landing")
	console.log("This is The Landing page")
})

// CAMPGROUND ROUTE Show all campground
router.get("/campground",function(req,res){
	// find all date in all campground
	Campground.find({},function(err,allCampground){
		if(err){
			console.log(err)
		}else{
			res.render("campground/index",{campground:allCampground,currentUser: req.user})	
		}
	})
	
})
//CREATE ROUTE = HANDLING CAMPGROUND SACE FUNCTION
router.post("/campground",middelware.isLoggedIn,function(req,res){
	//get data from form add to campground array
	var name = req.body.name
	var image= req.body.image
	var desc = req.body.description
	var price= req.body.price
	var author= {
		id: req.user._id,
		username:req.user.username
	}
	var newCampground={name:name,price:price,image:image,description:desc,author:author}
	
	// create a new campground and save to data base
	Campground.create(newCampground,function(err,newlyCreated){
		if(err){
			console.log(err)
		}else{
			res.redirect("/campground",)	
		}
	})
	
	
})
//NEW CAMPGROUND ADD FORM
router.get("/campground/new",middelware.isLoggedIn,function(req,res){
	res.render("campground/new")
})

//show- template for campgrounds
router.get("/campground/:id",function(req,res){
	//FIND THE CAMPGROUND WITH RESPECTIVE ID from index.ejs file from help of mongoose
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err|| !foundCampground){
			req.flash("error","Campground not found")
			res.redirect("back")
		}else{
			console.log(foundCampground)
			// render show templates
			res.render("campground/show",{campground:foundCampground})
			
		}
	})
	
	// RENDER SHOW TEMPLATE WITH THAT CAMPGROUND 
	
	
})
//EDIT CAMPGROUND Route
router.get("/campground/:id/edit", middelware.checkCampgroundOwnership,function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		if(err|| !foundCampground){
			req.flash("error","No campground found")
			res.redirect("/campground")
		}else{
			req.flash("success", "Succesfully edit campground ")
			res.render("campground/edit",{campground:foundCampground});
		}
	})

})
//UPDATE CAMPGROUND ROUTE
router.put("/campground/:id",middelware.checkCampgroundOwnership,function(req,res){
	// find and upate the corect campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err,updatedCampground){
		if(err){
			res.redirect("/campground")
		}else{
			req.flash("success","Succesfully Update campground")
			res.redirect("/campground/" + req.params.id);
		}
	})
})

// DESTROY CAMPGROUND ROUTE
router.delete("/campground/:id",middelware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campground")
		}else{
			req.flash("success","Succesfully deleted campground")
			res.redirect("/campground")
		}
	})
})








module.exports=router;
