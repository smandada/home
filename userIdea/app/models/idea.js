var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IdeaSchema = new Schema({
	creator: { type: Schema.Types.ObjectId, ref: 'User'},
	content: { type: String },
	created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Idea', IdeaSchema);