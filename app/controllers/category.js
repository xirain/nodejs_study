var Category = require('../models/category')
var _ = require('underscore')

// admin page
exports.new = function(req, res) {
	// body...
	res.render('category_admin',{
		title: 'imooc 后台分类录入页',
		category: {}
	})
}

// admin update Category
exports.update = function(req,res){
	var id = req.params.id
	var newCat = req.category
	console.log(id)
	if (id ){
	 	Category.findById(id,function(err,category){
	 		if (err){
	 			console.log(err)
	 		}
	 		console.log(newCat)
	 		category = _.extend(category, newCat)
	 		console.log(newCat)
	 	// 	console.log(Category)
	 	// 	res.render('categorylist',{
			// 	title: '分类后台录入页',
			// 	Category:Category
			// })
	 		category.save(function(err, category){
	 			if (err){
	 				console.log(err)
	 			}
	 			res.redirect('/admin/category/list')
	 		})
	 		
		})
	}
}

// admin post Category
exports.save = function(req,res){
	 var category = req.body.category
	 //var CategoryObj = req.body.Category
 	_Category = new Category(category)
 	_Category.save(function(err, category){
		if (err){
			console.log(err)
		}
		res.redirect('/admin/category/list')
	})
 
}

// list page
exports.list = function(req, res) {
	// body...
	Category.fetch(function(err,categorys){
		if(err){
			console.log(err)
		}
		res.render('categorylist',{
			title: 'imooc 分类列表页',
			categorys:categorys
		})
	})
	
}


// list delete Category
exports.del = function(req,res){
	var id = req.query.id

	if(id){
		Category.findById({_id:id}, function(err, category){
			if (category.movies.length <=0){
				Category.remove({_id:id},function(err,Category){
					if (err){
						console.log(err)
					}else{
						res.json({success:1})
					}

				})
			}
		})
		
	}
}