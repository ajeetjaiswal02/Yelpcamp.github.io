var mongoose   = require("mongoose")
var Campground = require("./models/campground")
var Comment    = require("./models/comment")


var data=[
	{
		name: "cloud rest",
		image: "https://images.unsplash.com/photo-1527095655060-4026c4af2b25?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."


	},
	{
		name: "vine road",
		image: "https://images.unsplash.com/photo-1530841344029-ec3ae0fa4cc4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."


	},
	{
		name: "canyann floor",
		image: "https://images.unsplash.com/photo-1514970746-d4a465d514d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."


	}
]

function seedDB(){
	//Remove all campground
	Campground.remove({},function(err){
//		if(err){
//			console.log(err)
//		}
//		console.log("removed campground")
//		// ADD CAMPGROUND
//		data.forEach(function(seed){
//			Campground.create(seed,function(err,campground){
//				if(err){
//					console.log(err)
//				}else{
//					console.log("added a campground")
//					//create a comment
//					Comment.create(
//						{
//							text: "This place is great but i which internet is here",
//							author: "homer"
//						},function(err,comment){
//							if(err){
//								console.log(err)
//							}else{
//								campground.comments.push(comment);
//								campground.save();
//								console.log("created new comment")
//							}
//							
//						})
//				}
//		})
//	})

	})
	
}
module.exports= seedDB;
