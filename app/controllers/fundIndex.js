var Fund = require('../models/fund')
var FundCategory = require('../models/fundCategory')
exports.index = function(req, res){
	// index page
	// console.log('User loggged')
	// console.log(req.session.user)

	// body...
	FundCategory
		.find({})
		.populate({path:'funds', options:{limit:50}})
		.exec(function(err, categories){
			if(err){
			console.log(err)
			}
			res.render('fundIndex',{
				title: '基金首页',
				categories:categories
			})
		})	
}
