var Campground = require("../models/campground")
var Comment    = require("../models/comment")


// all the middel ware goes herwe
var middlewareobj={};

middlewareobj.checkCampgroundOwnership= function (req,res,next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,foundCampground){
			if(err || !foundCampground){
				req.flash("error","Campground not found")
				res.redirect("back")
			}else{
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error","You don't have permission to do that")
					res.render("back")
				} 
			}
		})
	}else{
		req.flash("error","You need to login to do that")
		res.redirect("back")
	}

}


middlewareobj.checkCommentOwnership=function (req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,foundComment){
			if(err || !foundComment){
				req.flash("error","Comment not found")
				res.redirect("back")
			}else{
				//does user own the comment
				if(foundComment.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error","You don't have permission to do that")
					res.render("back")
				} 
			}
		})
	}else{
		req.flash("error","You need to logged in to do that")
		res.redirect("back")
	}

}

middlewareobj.isLoggedIn =function (req, res ,next){
	if(req.isAuthenticated()){
	   return next();
	}
	req.flash("error","You need to log in to do that")
	res.redirect("/login")
}

//miidel ware for use login check	
middlewareobj.isregistered=function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","No user found Please sign in")
	res.redirect("/register")
}
	
module.exports= middlewareobj