var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var FundSchema = new mongoose.Schema({
	managers: [{
		manager: String
		}
	],
	name: String,
	code: Number,
	introduction: String,
	tags: String,
	poster: String,
	category: {type:ObjectId, ref:'FundCategory'},
	year: Number,
	url:String,
	stocks:[{
		stock: {type:ObjectId,ref: 'Stock'},
	}
	],
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

FundSchema.pre('save', function(next) {
	// body...
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}

	next()
})

FundSchema.statics={
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

module.exports = FundSchema