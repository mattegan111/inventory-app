var Category = require('../models/category');
var Product = require('../models/product');
var async = require('async');

// Display Products based on a given Category.
exports.category_view_all = function(req, res, next) {

    async.parallel({
        category_list: function(callback){
            Category.find({ 
                'parent_categories.0': {$exists: false} ,
            })
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

        res.render('category_view_all', {title: 'View By Category', data: results});
    });
};

exports.category_view_specific = function(req, res, next) {

    async.parallel({
        category: function(callback){
            Category.findById(req.params.id)
            .populate('child_categories')
            .populate('parent_categories')    
            .exec(callback);
        },
        product_list: function(callback){
            Product.find({})
            .exec(callback);
        }
    }, function(err, results) {
        if (err) { return next(err); }

        // Get products for both category and child categories
        results.products = [];
        results.product_list.forEach(product => {
            console.log(typeof product.category.toString());
            console.log(`"${product.category.toString()}"`);
            console.log(typeof results.category._id.toString());
            console.log(`"${results.category._id.toString()}"`);
            console.log(product.category.toString() == results.category._id.toString());

            if (product.category.toString() == results.category._id.toString()) {
                results.products.push(product);
            };

            results.category.child_categories.forEach(category => {
                if (product.category.toString() == category._id.toString()) {
                    results.products.push(product);
                };
            })
        });


        res.render('category_view_specific', {title: 'View By Category', data: results});
    });
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