var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var FundCategorySchema = new Schema({
	name: String,
	funds:[{
		type: ObjectId,
		ref: "Fund"
	}],
	meta:{
		createAt:{
			type: Date,
			default: Date.now()
		},
		updateAt:{
			type: Date,
			default: Date.now()
		}
		
	}
})

FundCategorySchema.pre('save', function(next) {
	// body...
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}

	next()
})

FundCategorySchema.statics={
	fetch: function(cb){
		return this
		.find({})
		.sort('meta.updateAt')
		.exec(cb)
	},
	findById: function(id,cb){
		return this
		.findOne({_id:id})
		.exec(cb)
	}

}

module.exports = FundCategorySchema