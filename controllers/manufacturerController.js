var Manufacturer = require('../models/manufacturer');
var Product = require('../models/product');
var async = require('async');

// Display list of all manufacturers.
exports.manufacturer_view_all = function(req, res, next) {
    
    async.parallel({
        manufacturer_list: function(callback){
            Manufacturer.find({})
            .exec(callback);
        },
        product_list: function(callback){
            Product.find({})
            .exec(callback);
        }
    }, function(err, results) {
        if (err) { return next(err); }

        results.manufacturer_list.forEach(manufacturer => {
            manufacturer.products = [];
            results.product_list.forEach(product => {
                if (product.manufacturer.toString() == manufacturer._id.toString()) {
                    manufacturer.products.push(product);
                };
            });
        });

        res.render('manufacturer_view_all', {title: 'View By Manufacturer', data: results});
    })
};

// Display Products by specific Manufacturer
exports.manufacturer_view_specific = function(req, res, next) {

    async.parallel({
        manufacturer: function(callback){
            Manufacturer.findById(req.params.id)
            .exec(callback);
        },
        product_list: function(callback){
            Product.find({})
            .exec(callback);
        }
    }, function(err, results) {
        if (err) { return next(err); }

        results.manufacturer.products = [];
        results.product_list.forEach(product => {
            if (product.manufacturer.toString() == results.manufacturer._id.toString()) {
                results.manufacturer.products.push(product);
            };
        });

        res.render('manufacturer_view_specific', {title: 'View By Manufacturer', data: results});
    });
};

// Display detail page for a specific Manufacturer.
exports.manufacturer_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Manufacturer detail: ' + req.params.id);
};

// Display Manufacturer create form on GET.
exports.manufacturer_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Manufacturer create GET');
};

// Handle Manufacturer create on POST.
exports.manufacturer_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Manufacturer create POST');
};

// Display Manufacturer delete form on GET.
exports.manufacturer_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Manufacturer delete GET');
};

// Handle Manufacturer delete on POST.
exports.manufacturer_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Manufacturer delete POST');
};

// Display Manufacturer update form on GET.
exports.manufacturer_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Manufacturer update GET');
};

// Handle Manufacturer update on POST.
exports.manufacturer_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Manufacturer update POST');
};