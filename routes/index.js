var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Items = mongoose.model('Items');

router.param('item', function(req, res, next, id) {
    var query = Items.findById(id);
    query.exec(function(err, item) {
        if (err) {return next(err);}
        if (!item) {return next(new Error("Can't find item"));}
        req.item = item;
        return next();
    });
});

router.get('/shop/:item',function(req,res) {
   res.json(req.item); 
});

router.put('/shop/:item/upvote', function(req, res, next) {
    console.log("Put route bro" + req.item.Name);
    req.item.upvote(function (err, item) {
        if (err) {return next(err);}
        res.json(item);
    });
});

router.delete('/shop/:item', function(req, res) {
    req.item.remove();
    res.sendStatus(200);
});

router.get('/shop', function(req, res, next) {
    console.log("Get route");
    Items.find(function(err, items) {
        if(err) {console.log("Get route error"); return next(err);}
        res.json(items);
        console.log("res.json Get route");
    });
    console.log("Returning Get route");
});

router.post('/shop', function(req, res, next) {
    console.log("Post route");
    var item = new Items(req.body);
    console.log(item);
    item.save(function(err, item) {
        console.log("Error: " + err);
        if(err) {return next(err);}
        console.log("Post route before json");
        res.json(item);
    });
});

module.exports = router;