var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var StockSchema = new mongoose.Schema({
	managers: [{
		manager: String
		}
	],
	name: String,
	code: Number,
	introduction: String,
	// tags: [{tag: String}],
	poster: String,
	// category: {type:ObjectId, ref:'StockCategory'},
	year: Number,
	url:String,
	funds:[{
		stock: {type:ObjectId,ref: 'Fund'},
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

StockSchema.pre('save', function(next) {
	// body...
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}

	next()
})

StockSchema.statics={
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

module.exports = StockSchema