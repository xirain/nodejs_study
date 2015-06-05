var mongoose = require('mongoose')
var bcypt = require('bcrypt-nodejs')

var UserSchema = new mongoose.Schema({
	name:{
		unique:true,
		type: String
	},
	password: String,
	// user: 0
	// verified user : 1
	// professional :2
	// reserved: 3 -9
	// admin: > 10
	// super admin: >50
	role:{
		type:Number,
		default: 0
	},
	meta:{
		createAt: {
			type:Date,
			default: Date.now()
		},
		updateAt:{
			type:Date,
			default: Date.now()
		}
	}
})

UserSchema.pre('save', function(next) {
	// body...
	var user = this
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}

	bcypt.genSalt(10,function(err,salt){
		if (err) return next(err)

		bcypt.hash(user.password, salt, null, function(err, hash){
			user.password = hash			
		})
		next()
	})
})

UserSchema.methods = {
	comparePassword: function(_password, cb){
		bcypt.compare(_password, this.password, function(err, isMatched){
			if (err) return cb(err)

			cb(null, isMatched)
		})
	}
}

UserSchema.statics={
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

module.exports = UserSchema