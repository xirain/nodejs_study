var User = require('../models/user')


exports.showSignup = function(req, res){

	res.render('signup',{
		title: '注册页面'
	})
}

exports.showSignin = function(req, res){

	res.render('signin',{
		title: '登陆页面'
	})
}
// signin
exports.signin= function(req,res){
	var _user = req.body.user
	var name = _user.name
	var password = _user.password

	console.log(_user)
	User.findOne({name:name}, function(err,user){
		if (err){
			console.log(err)
		}
		console.log(user)
		if (!user){
			return res.redirect('/signup')
		}

		user.comparePassword(password, function(err, isMatched){
			if (err){
				console.log(err)
			}

			if (isMatched){
				req.session.user = _user
				console.log('Password is matched.')
				console.log(_user)
				return res.redirect('/')
			}else{
				return res.redirect('/signin')
				console.log('Password is not matched.')
				
			}
		})
		
	})
	

}

// singup
exports.signup = function(req,res){
	var _user = req.body.user

	console.log(_user)
	User.find({name:_user.name}, function(err,user){
		if (err){
			console.log(err)
		}
		console.log(user)
		if (user[0]){
			return res.redirect('/signin')
		}else{

			var user = new  User(_user)
			user.save(function(err, user){
			if (err){
				console.log(err)
			}else{
				res.redirect('/')
			}
		})
	}
	})
}

// logout
exports.logout = function(req, res){
	delete req.session.user
	//delete app.locals.user
	res.redirect('/')
}
// user list page
exports.list =  function(req, res) {

	// body...
	User.fetch(function(err,users){
		if(err){
			console.log(err)
		}
		res.render('userlist',{
			title: 'imooc 用户列表页',
			users:users
		})
	})

}

exports.adminRequired = function(req, res, next){
	var user = req.session.user
	console.log(user)
	if(user.role <= 10 ){
		return res.redirect('/signin')
	}

	next()
}
exports.signinRequired = function(req, res, next){
	var user = req.session.user
	console.log(user)
	if(!user){
		return res.redirect('/signin')
	}
	
	next()
}




