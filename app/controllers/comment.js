var Comment = require('../models/comment')
var User = require('../models/user')

// admin post Comment
exports.save = function(req,res){
	 var _comment = req.body.comment
	 var movieId = _comment.movie
	 var userId  = _comment.from
	User.findOne({name:req.session.user.name}, function(err,user){
	 console.log('comment cid code'+ _comment.cid)
	 userId = user._id
	 _comment.from = userId
	 if (_comment.cid){
	 	Comment.findById(_comment.cid,function(err, comment){
	 		var reply = {
	 			from: _comment.from,
	 			to: _comment.tid,
	 			content: _comment.content
	 		}
	 		console.log(comment)
	 		if (comment.reply){

	 			comment.reply.push(reply)
	 		}else{
	 			comment.reply=reply
	 		}
	 		comment.save(function(err, comment){
			if (err){
				console.log(err)
			}
			res.redirect('/movie/'+movieId)
			})
		})

	 }else{
	 
		console.log(movieId)
		userId = user._id
	 	_comment.from = userId
	 	comment = new Comment(_comment)

	 	console.log(userId)
	 	comment.save(function(err, comment){
			if (err){
				console.log(err)
			}
			res.redirect('/movie/'+movieId)
		})
		
	}
	})
}
