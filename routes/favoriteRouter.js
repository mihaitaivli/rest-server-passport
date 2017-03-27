var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');
var Favorites = require('../models/favorites');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
    .all(Verify.verifyOrdinaryUser)
    .get(function (req, res, next) {
        Favorites.find({})
            .populate('postedBy')
            .populate('dishes')
            .exec(function (err, favorite) {
                if (err) throw err;
                res.json(favorite);
            });
    })
    .post(function (req, res, next) {

        var postedBy = req.decoded._doc._id;
        // console.log('posted by ' + postedBy);

        Favorites.findOneAndUpdate(
            {"postedBy": postedBy}, //find object belonging to the poster
            {$push: {"dishes": req.body._id}}, //push fav to array
            {upsert:true, 'new': true}, //options to create object, return new one
            function (err, favorite) { //callback
                if (err){
                    throw err
                }
                else {
                    //handle favorite
                    favorite.save(function (err, fav) {
                                if (err) throw err;
                                res.json(fav);
                            });
                }
            }
        );
    })

    .delete(function (req, res, next) {
        Favorites.remove({}, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

favoriteRouter.route('/:favId')
    .all(Verify.verifyOrdinaryUser)
    .delete(function(req, res, next){

    });

module.exports = favoriteRouter;