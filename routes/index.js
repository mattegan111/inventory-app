var express = require('express');
var router = express.Router();

// Require controller modules
var category_controller = require('../controllers/categoryController');
var manufacturer_controller = require('../controllers/manufacturerController');
var product_controller = require('../controllers/productController');

/* GET home page. */
router.get('/', product_controller.index);

// CATEGORY ROUTES
router.get('/category/create', category_controller.category_create_get);
router.post('/category/create', category_controller.category_create_post);
router.get('/category/:id/delete', category_controller.category_delete_get);
router.post('/category/:id/delete', category_controller.category_delete_post);
router.get('/category/:id/update', category_controller.category_update_get);
router.post('/category/:id/update', category_controller.category_update_post);
router.get('/category/:id', category_controller.category_detail);

router.get('/categories', category_controller.category_view_all);
router.get('/categories/:id', category_controller.category_view_specific);


// MANUFACTURER ROUTES
router.get('/manufacturer/create', manufacturer_controller.manufacturer_create_get);
router.post('/manufacturer/create', manufacturer_controller.manufacturer_create_post);
router.get('/manufacturer/:id/delete', manufacturer_controller.manufacturer_delete_get);
router.post('/manufacturer/:id/delete', manufacturer_controller.manufacturer_delete_post);
router.get('/manufacturer/:id/update', manufacturer_controller.manufacturer_update_get);
router.post('/manufacturer/:id/update', manufacturer_controller.manufacturer_update_post);
router.get('/manufacturer/:id', manufacturer_controller.manufacturer_detail);

router.get('/manufacturers', manufacturer_controller.manufacturer_view_all);
router.get('/manufacturers/:id', manufacturer_controller.manufacturer_view_specific);


// PRODUCT ROUTES
router.get('/product/create', product_controller.product_create_get);
router.post('/product/create', product_controller.product_create_post);
router.get('/product/:id/delete', product_controller.product_delete_get);
router.post('/product/:id/delete', product_controller.product_delete_post);
router.get('/product/:id/update', product_controller.product_update_get);
router.post('/product/:id/update', product_controller.product_update_post);
router.get('/product/:id', product_controller.product_detail);
router.get('/products', product_controller.product_list);


module.exports = router;
