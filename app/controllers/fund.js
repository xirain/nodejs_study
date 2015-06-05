var Fund = require('../models/fund')
// var Comment = require('../models/comment')
var FundCategory = require('../models/fundCategory')
var _ = require('underscore')

// detail page
exports.detail =  function(req, res) {
	// body...
	var id = req.params.id
// 	console.log(req.session.user)
// 	if(req.session.user){
// 	User.findOne({name:req.session.user.name}, function(err,user){	
// 		Fund.findById(id,function(err, Fund){
// 			//console.log(Fund)
// 			Comment.find({Fund:id}, function(err, comments){
// 				console.log(comments)
				
// 				res.render('detail',{
// 					title: 'imooc 详情页',
// 					Fund:Fund,
// 					comments: comments,
// 					user:user
// 				})
// 			})
// 		})
// 	})
// }	
// else{
	Fund.findById(id,function(err, fund){
			//console.log(Fund)
			// Comment
			// .find({Fund:id})
			// .populate('from','name')
			// .populate('reply.from reply.to', 'name')
			// .exec(function(err, comments){
			// 	console.log(comments)
				
			// 	res.render('detail',{
			// 		title: 'imooc 详情页',
			// 		Fund:Fund,
			// 		comments: comments
					
			// 	})
			// })

			res.render('fund_detail',{
					title: '基金详情',
					fund:fund,					
			})
})
//}
}

// admin page
exports.new = function(req, res) {
	// body...
	FundCategory.find({}, function(err,categories){
		res.render('adminFund',{
		title: '基金后台录入页',
		categories:categories,
		fund:{}
	})
	})
	
}

// admin update Fund
exports.update = function(req,res){
	var id = req.params.id
	console.log(id)
	if (id ){
	 	Fund.findById(id,function(err,Fund){
	 		if (err){
	 			console.log(err)
	 		}
	 		console.log(Fund)
	 		res.render('adminFund',{
				title: '基金后台录入页',
				Fund:Fund
			})
		})
	}
}

// admin post Fund
exports.save = function(req,res){
	 var id = req.body.fund._id
	 var FundObj = req.body.fund

	 console.log(id)
	 if (id !== 'undefined'){
	 	Fund.findById(id,function(err,Fund){
	 		if (err){
	 			console.log(err)
	 		}
	 		console.log("update "+_Fund)
	 		console.log(FundObj)
	 		_Fund = _.extend(Fund, FundObj)
	 		console.log(_Fund)
	 		_Fund.save(function(err, Fund){
	 			if (err){
	 				console.log(err)
	 			}
	 			res.redirect('/Fund/'+Fund._id)
	 		})
	 	})
	 }
	 else{
	 	_Fund = new Fund(FundObj)
	 	console.log("new "+_Fund)
	 	_Fund.save(function(err, fund){
 			if (err){
 				console.log(err)
 			}
 			res.redirect('/fund/'+Fund._id)
 		})
	 }
}

// list page
exports.list = function(req, res) {
	// body...
	Fund.fetch(function(err,Funds){
		if(err){
			console.log(err)
		}
		res.render('fundList',{
			title: '基金列表页',
			funds:Funds
		})
	})
	
}


// list delete Fund
exports.del = function(req,res){
	var id = req.query.id

	if(id){
		Fund.remove({_id:id},function(err,Fund){
			if (err){
				console.log(err)
			}else{
				res.json({success:1})
			}

		})
	}
}