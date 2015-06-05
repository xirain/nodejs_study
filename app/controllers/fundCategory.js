var FundCategory = require('../models/fundCategory')
var _ = require('underscore')

// admin page
exports.new = function(req, res) {
	// body...
	res.render('fundCategory_admin',{
		title: '基金分类录入页',
		fundCategory: {}
	})
}

// admin update FundCategory
// exports.update = function(req,res){
// 	var id = req.params.id
// 	console.log(id)
// 	if (id ){
// 	 	FundCategory.findById(id,function(err,FundCategory){
// 	 		if (err){
// 	 			console.log(err)
// 	 		}
// 	 		console.log(FundCategory)
// 	 		res.render('admin',{
// 				title: 'imooc 后台录入页',
// 				FundCategory:FundCategory
// 			})
// 		})
// 	}
// }

// admin post FundCategory
exports.save = function(req,res){
	 var fundCategory = req.body.fundCategory
	 //var FundCategoryObj = req.body.FundCategory
 	_FundCategory = new FundCategory(fundCategory)
 	_FundCategory.save(function(err, fundCategory){
		if (err){
			console.log(err)
		}
		res.redirect('/admin/FundCategory/list')
	})
 
}

// list page
exports.list = function(req, res) {
	// body...
	FundCategory.fetch(function(err,FundCategorys){
		if(err){
			console.log(err)
		}
		res.render('FundCategorylist',{
			title: '基金分类列表页',
			FundCategorys:FundCategorys
		})
	})
	
}


// // list delete FundCategory
// exports.del = function(req,res){
// 	var id = req.query.id

// 	if(id){
// 		FundCategory.remove({_id:id},function(err,FundCategory){
// 			if (err){
// 				console.log(err)
// 			}else{
// 				res.json({success:1})
// 			}

// 		})
// 	}
// }