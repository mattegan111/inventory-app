var Product = require('../models/product');
var Manufacturer = require('../models/manufacturer');
var Category = require('../models/category');

var async = require('async');

// Display HOME PAGE
exports.index = function(req, res) {
    async.parallel({
        
        product_type_count: function(callback) {
            Product.countDocuments({}, callback);
        },
        products: function(callback) {
            Product.find({}).exec(callback);
        },
        manufacturer_count: function(callback) {
            Manufacturer.countDocuments({}, callback);
        },
        category_count: function(callback) {
            Category.countDocuments({}, callback)
        }
    }, function(err, results) {
        let units = 0;
        results.products.forEach(product => {
            units += product.quantity;
        });
        results.product_units_count = units;
        res.render('index', {
            title: 'Inventory App Home', 
            error: err, 
            data: results 
        });
    });
}

// Display list of all products.
exports.product_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Product list');
};

// Display detail page for a specific Product.
exports.product_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Product detail: ' + req.params.id);
};

// Display Product create form on GET.
exports.product_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Product create GET');
};

// Handle Product create on POST.
exports.product_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Product create POST');
};

// Display Product delete form on GET.
exports.product_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Product delete GET');
};

// Handle Product delete on POST.
exports.product_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Product delete POST');
};

// Display Product update form on GET.
exports.product_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Product update GET');
};

// Handle Product update on POST.
exports.product_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Product update POST');
};