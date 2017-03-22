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
            .populate('postedby')
            .populate('dishes')
            .exec(function (err, favorite) {
                if (err) throw err;
                res.json(favorite);
            });
    })

    .post(function (req, res, next) {
        Favorites.create(req.body, function (err, favorite) {
            if (err) throw err;
            // console.log('Favorite added');
            favorite.postedBy = req.decoded._doc._id;
            var id = favorite._id;
            favorite.dishes.push(id);
            favorite.save(function (err, fav) {
                if (err) throw err;
                res.json(fav);
            });
            // res.writeHead(200, {
            //     'Content-Type': 'text/plain'
            // });
            //
            // res.end('Added the favorite with id: ' + id);
        });
    })

    .delete(function (req, res, next) {
        Favorites.remove({}, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

module.exports = favoriteRouter;