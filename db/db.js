var mongoose = require('mongoose'),
	db = mongoose.connection,
	Schema = mongoose.Schema,
	schoolRankingSchema = new Schema({
		year: Number,
		rank: Number
	}),
	departmentSchema = new Schema({
		name: String
	}),
	schoolSchema = new Schema({
		id: String,
		name: String,
		cover: String,
		logo: String,
		briefing: String,
		ranking: [schoolRankingSchema],
		introduction: String,
		departments: [departmentSchema],
		photos: [String]
	});

mongoose.connect("mongodb://localhost/melanie");

db.on('error', function () {
	console.log('error connection to mongodb');
});

db.on('open', function () {
	console.log("connected!");
});

// define School collection
var School = mongoose.model("School", schoolSchema);

module.exports = {
	School : School,
	SchoolAgencyDB: db
};
