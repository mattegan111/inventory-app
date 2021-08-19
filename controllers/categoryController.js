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

// Display manage all page for Categories.
exports.category_manage_all_get = function(req, res) {

    async.series({
        category_list: function(callback){
            Category.find({})
            .exec(callback);
        }
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('category_manage_all_get', {title: 'Manage Categories', category_list: results.category_list});
    });
};

// Display manage page for specific Category.
exports.category_edit_get = function(req, res, next) {
    async.series({
        category: function(callback){
            Category.findById(req.params.id)
            .exec(callback);
        },
        category_list: function(callback){
            Category.find({})
            .exec(callback);
        }
    }, function(err, results) {
        if (err) { return next(err); }

        function getCategoryTree() {
            let output = [];

            let toAdd = [];
            let toContinue = [];
            let bufferArray = [];

            results.category_list.forEach(category => {
                if(!category.parent_categories[0]){
                    toAdd.push(category);
                    category.child_categories.forEach(child_category => {
                        toContinue.push(child_category);

                    });
                }
            });
            output.push(toAdd);
            toAdd = [];

            while(true) {
                // Populate toContinue with full objects
                toContinue.forEach(categoryId => {
                    results.category_list.forEach(categoryObject => {
                        if (categoryId.toString() == categoryObject._id.toString()){
                            bufferArray.push(categoryObject);
                        };
                    });

                });
                toContinue = bufferArray;
                bufferArray = [];

                // Push another array of categories to output
                toContinue.forEach(category => {
                    toAdd.push(category);
                    if(category.child_categories.length > 0) {
                        category.child_categories.forEach(child_category => {
                            bufferArray.push(child_category);
                        });
                    };
                });
                toContinue = bufferArray;
                bufferArray = [];
                output.push(toAdd);
                toAdd = [];

                if (toContinue.length == 0) {
                    break;
                };
            };

            return output;
        };

        const categoryTree = getCategoryTree();
        results.categoryTree = categoryTree;

        res.render('category_edit_get', {title: 'Edit Category', data: results});
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