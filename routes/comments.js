var express    = require("express");
var router     = express.Router();
var Campground = require("../models/campground")
var Comment   = require("../models/comment")
var middelware =require("../middleware")


//+++++++++++++++++++++++++++++++++++//
  // C O M M E N T S             R O U T E S
//++++++++++++++++++++****************//
//****C R E A T E ********* R O U T E************//
router.get("/campground/:id/comments/new",middelware.isLoggedIn,function(req,res){
	//find campground by id//
	Campground.findById(req.params.id, function(err,campground){
		if(err){
			console.log(err)
		}else{
			res.render("comments/new", {campground: campground});
		}
	})

	
})


//********POST ROUTE *********//
router.post("/campground/:id/comments",middelware.isLoggedIn, function(req,res){
	// look up for campground using id
	Campground.findById(req.params.id, function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campground")
		}else{
			Comment.create(req.body.comment, function(err,comment){
				if(err){
					req.flash("error","Something went wrong")
					console.log(err)
				}else{
					// add username id to comment
					comment.author.id=req.user._id;
					comment.author.username=req.user.username;
					//save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success","Succesfully added comment")
					res.redirect('/campground/' + campground._id);
				}
			})
		}
	})
	
})
///edit route for editing to show this edit we have to use update rouute
router.get("/campground/:id/comments/:comment_id/edit",middelware.checkCommentOwnership,function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err || !foundComment){
			req.flash("error","Comment not found")
			res.redirect("back")
		}else{
			res.render("comments/edit",{campground_id: req.params.id, comment:foundComment });
		}
	})
	
})

//update route comments
router.put("/campground/:id/comments/:comment_id",middelware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment,function(err,updatedComment){
		if(err|| !updatedComment){
			req.flash("error","Comment not found")
			res.redirect("back");
		}else{
			res.redirect("/campground/" + req.params.id);
		}
	})
})

//COMPONETS DESTROY ROUTE
router.delete("/campground/:id/comments/:comment_id",middelware.checkCommentOwnership,function(req,res){
	//find by id and remove=findByIdAndRemove
	Comment.findByIdAndRemove(req.params.comment_id,function(err,deletedComment){
		if(err){
			res.redirect("back")
		}else{
			req.flash("success","Succesfully remove comment")
			res.redirect("/campground/" +req.params.id)
		}
	})
	
})










module.exports=router;