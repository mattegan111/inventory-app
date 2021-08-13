var Category = require('../models/category');
var Product = require('../models/product');
var async = require('async');

// Display list of all Categories.
exports.category_list = function(req, res, next) {

    async.parallel({
        category_list: function(callback){
            Category.find({})    
            .exec(callback);
        },
        product_list: function(callback){
            Product.find({})
            .exec(callback);
        }
    }, function(err, results) {
        if (err) { return next(err); }

        results.category_list.forEach(category => {
            category.products = [];
            results.product_list.forEach(product => {
                if (product.category[0] == category._id.toString()) {
                    category.products.push(product);
                };
            });
        });

        res.render('category_list', {title: 'All Categories', data: results});
    })
};

// Display detail page for a specific Category.
exports.category_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Category detail: ' + req.params.id);
};

// Display Category create form on GET.
exports.category_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Category create GET');
};

// Handle Category create on POST.
exports.category_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Category create POST');
};

// Display Category delete form on GET.
exports.category_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Category delete GET');
};

// Handle Category delete on POST.
exports.category_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Category delete POST');
};

// Display Category update form on GET.
exports.category_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Category update GET');
};

// Handle Category update on POST.
exports.category_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Category update POST');
};