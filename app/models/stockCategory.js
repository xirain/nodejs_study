var mongoose = require('mongoose')

var StockCategorySchema = require('../schemas/stockCategory')

var StockCategory = mongoose.model('StockCategory',StockCategorySchema)

module.exports = StockCategory