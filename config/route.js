var Index = require('../app/controllers/index')

var User = require('../app/controllers/user')
var Movie = require('../app/controllers/movie')
var Comment = require('../app/controllers/comment')
var Category = require('../app/controllers/category')

var fundIndex = require('../app/controllers/fundIndex')
var Fund = require('../app/controllers/fund')
var FundCategory = require('../app/controllers/fundCategory')

module.exports = function(app) {
	// pre handle user
	app.use(function(req, res, next){
		var _user = req.session.user
		
		app.locals.user = _user
		console.log(app.locals.user)
		next()
		
	})

	app.get('/', Index.index)

	app.post('/user/signup', User.signup)
	app.post('/user/signin', User.signin)
	app.get('/signin', User.showSignin)
	app.get('/signup', User.showSignup)
	app.get('/logout', User.logout)
	app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list)

	app.get('/movie/:id', Movie.detail)
	app.get('/admin/movie/new', User.signinRequired,User.adminRequired,Movie.new)
	app.get('/admin/movie/update/:id', User.signinRequired,User.adminRequired,Movie.update)
	app.post('/admin/movie/new',User.signinRequired,User.adminRequired,Movie.uploadPoster, Movie.save)
	app.get('/admin/movie/list', User.signinRequired,User.adminRequired,Movie.list)
	app.delete('/admin/movie/list',User.signinRequired,User.adminRequired, Movie.del)


	// Comment
	app.post('/user/comment',User.signinRequired, Comment.save)

	// Category
	app.get('/admin/category/:id',User.signinRequired,User.adminRequired, Category.update)
	app.get('/admin/category/new', User.signinRequired,User.adminRequired,Category.new)
	app.post('/admin/category',User.signinRequired,User.adminRequired, Category.save)
	app.get('/admin/category/list', User.signinRequired,User.adminRequired,Category.list)
	app.delete('/admin/category/list',User.signinRequired,User.adminRequired, Category.del)

	// Fund
	app.get('/fund', fundIndex.index)
	app.get('/fund/:id', Fund.detail)
	app.post('/admin/fund/new', User.signinRequired,User.adminRequired,Fund.save)
	app.get('/admin/fund/update/:id', User.signinRequired,User.adminRequired,Fund.update)
	app.get('/admin/fund/new',User.signinRequired,User.adminRequired, Fund.new)
	app.get('/admin/fund/list', User.signinRequired,User.adminRequired,Fund.list)
	app.delete('/admin/fund/list',User.signinRequired,User.adminRequired, Fund.del)
	app.get('/admin/fundCategory/new', User.signinRequired,User.adminRequired,FundCategory.new)
	app.post('/admin/fundCategory',User.signinRequired,User.adminRequired, FundCategory.save)
	app.get('/admin/fundCategory/list', User.signinRequired,User.adminRequired,FundCategory.list)

	// Results
	app.get('/results', Index.search)

}