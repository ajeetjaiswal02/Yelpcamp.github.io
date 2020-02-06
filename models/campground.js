var mongoose = require("mongoose")
//create campground schema environment//

var campgroundSchema =  mongoose.Schema({
	name        : String,
	price       : String,
	image       : String,
	description : String,
	author: {
		id: {
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username:String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
})
// apply schema in campground model
// this change to module export var Campground = mongoose.model("Campground",campgroundSchema);
module.exports= mongoose.model("Campground",campgroundSchema);