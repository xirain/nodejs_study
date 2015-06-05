var Movie = require('../models/movie')
var Comment = require('../models/comment')
var Category = require('../models/category')
var _ = require('underscore')

var fs = require('fs')
var path  = require('path')

// detail page
exports.detail =  function(req, res) {
	// body...
	var id = req.params.id
// 	console.log(req.session.user)
// 	if(req.session.user){
// 	User.findOne({name:req.session.user.name}, function(err,user){	
// 		Movie.findById(id,function(err, movie){
// 			//console.log(movie)
// 			Comment.find({movie:id}, function(err, comments){
// 				console.log(comments)
				
// 				res.render('detail',{
// 					title: 'imooc 详情页',
// 					movie:movie,
// 					comments: comments,
// 					user:user
// 				})
// 			})
// 		})
// 	})
// }	
// else{
	Movie.findById(id,function(err, movie){
			//console.log(movie)
			Comment
			.find({movie:id})
			.populate('from','name')
			.populate('reply.from reply.to', 'name')
			.exec(function(err, comments){
				console.log(comments)
				
				res.render('detail',{
					title: 'imooc 详情页',
					movie:movie,
					comments: comments
					
				})
			})
})
//}
}

// admin page
exports.new = function(req, res) {
	// body...
	Category.find({}, function(err,categories){
		res.render('admin',{
		title: 'imooc 后台录入页',
		categories:categories,
		movie:{}
	})
	})
	
}

// admin update movie
exports.update = function(req,res){
	var id = req.params.id
	console.log(id)
	if (id ){
	 	Movie.findById(id,function(err,movie){
	 		Category.find({},function(err, categories){
	 			if (err){
	 				console.log(err)
		 		}
		 		console.log(movie)
		 		res.render('admin',{
					title: 'imooc 后台录入页',
					movie:movie,
					categories:categories
				})
	 		})
	 		
		})
	}
}

// admin post movie
exports.save = function(req,res){
	 var id = req.body.movie._id
	 var movieObj = req.body.movie

	 if (req.poster){
	 	movieObj.poster = req.poster
	 	console.log("reqposter"+req.poster)
	 }
	 console.log(id)
	 if (id) {
	 	Movie.findById(id,function(err,movie){
	 		if (err){
	 			console.log(err)
	 		}

	 		console.log(movieObj)
	 		_movie = _.extend(movie, movieObj)
	 		console.log(_movie)
	 		_movie.save(function(err, movie){
	 			if (err){
	 				console.log(err)
	 			}
	 			res.redirect('/movie/'+movie._id)
	 		})
	 	})
	 }
	 else{
	 	_movie = new Movie(movieObj)
	 	var categoryId = movieObj.category
	 	var categoryName = movieObj.categoryName
	 	_movie.save(function(err, movie){
	 		if (categoryId){
		 		if (err){
		 			console.log(err)
		 		}
	 			
	 			Category.findById(categoryId, function(err, category) {

	 				category.movies.push(movie._id)
	 				category.save(function(err, category){
	 					res.redirect('/movie/'+movie._id)
	 				})

		 		})
	 		
	 		} else if(categoryName){
	 			console.log('categoryName'+categoryName)
	 			var category = new Category({
	 				categoryName:categoryName,
	 				movies:[movie._id]
	 			})

	 			category.save(function(err, category){
	 				movie.category = category._id
	 				movie.save(function(err, movie){
	 					res.redirect('/movie/'+movie._id)
	 				})
	 			})
	 		}

	 	})
	 	
	 }
}

// list page
exports.list = function(req, res) {
	// body...
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		res.render('list',{
			title: 'imooc 列表页',
			movies:movies
		})
	})
	
}


// list delete movie
exports.del = function(req,res){
	var id = req.query.id

	if(id){
		Movie.remove({_id:id},function(err,movie){
			if (err){
				console.log(err)
			}else{
				res.json({success:1})
			}

		})
	}
}


exports.uploadPoster = function(req, res, next){
	var posterData= req.files.uploadPoster
	var filePath = posterData.path
	var originalFileName = posterData.originalFilename

	console.log('req.files'+req.files)
	console.log('originalFileName'+originalFileName)
	if (originalFileName){
		fs.readFile(filePath, function(err, data){
			var timestamp = Date.now()
			var type = posterData.type.split('/')[1]
			var poster  = timestamp+'.'+type
			var newPath = path.join(__dirname, '../../', '/public/upload/' + poster)
			console.log('newPath'+newPath)
			fs.writeFile(newPath,data, function(err){
				if (err){
					console.log(err)
				}

				req.poster = poster
				next()
			})

		})
	}else{
		next()
	}

}