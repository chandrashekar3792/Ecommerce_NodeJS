var router=require('express').Router();

var app= require('../index');

router.get('/', function(req, res) {
    res.render('main/home');
});

router.get('/about', function(req, res) {
    res.render('main/about');
});

module.exports=router;
