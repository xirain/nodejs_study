var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var Movie = require('./models/movie')
var  port  = process.env.PORT || 3000
var _ = require('underscore')

var app = express()

mongoose.connect('mongodb://localhost/imooc')

app.set('views','./views/pages')
app.set('view engine','jade')
//-app.use(express.bodyParser())
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded())

app.use(express.static(path.join(__dirname,'public')))
//var  jQuery = require('jquery')
app.locals.moment=require('moment')

app.listen(port)

console.log('imooc started on port '+port)

// index page

app.get('/', function(req, res) {
	// body...
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		res.render('index',{
		title: 'imooc 首页',
		movies:movies
	})
	})
	
})

// detail page
app.get('/movie/:id', function(req, res) {
	// body...
	var id = req.params.id
	console.log(id)
	Movie.findById(id,function(err, movie){
		console.log(movie)
		res.render('detail',{
			title: 'imooc 详情页',
			movie:movie
		})
	})	
})

// admin page
app.get('/admin/movie', function(req, res) {
	// body...
	res.render('admin',{
		title: 'imooc 后台录入页',
		movie:{
			doctor:'',
			country:'',
			title: '',
			year: '',
			poster: '',
			language: '',
			flash:'',
			introduction: ''
		}
	})
})

// admin update movie
app.get('/admin/update/:id', function(req,res){
	var id = req.params.id
	console.log(id)
	if (id ){
	 	Movie.findById(id,function(err,movie){
	 		if (err){
	 			console.log(err)
	 		}
	 		console.log(movie)
	 		res.render('admin',{
				title: 'imooc 后台录入页',
				movie:movie
			})
		})
	}
})

// admin post movie
app.post('/admin/movie/new', function(req,res){
	 var id = req.body.movie._id
	 var movieObj = req.body.movie

	 console.log(id)
	 if (id !== 'undefined'){
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
	 	_movie = new Movie({
	 		doctor:movieObj.doctor,
	 		title:movieObj.title,
	 		country:movieObj.country,
	 		language:movieObj.language,
	 		year:movieObj.year,
	 		poster:movieObj.poster,
	 		introduction:movieObj.introduction,
	 		flash:movieObj.flash
	 	})
	 	_movie.save(function(err, movie){
 			if (err){
 				console.log(err)
 			}
 			res.redirect('/movie/'+movie._id)
 		})
	 }
})
// list page
app.get('/admin/list', function(req, res) {
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
	
})


// list delete movie
app.delete('/admin/list',function(req,res){
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
})