var mongoose = require('mongoose')

var FundCategorySchema = require('../schemas/fundCategory')

var FundCategory = mongoose.model('FundCategory',FundCategorySchema)

module.exports = FundCategory