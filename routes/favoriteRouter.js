var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');
var Favorites = require('../models/favorites');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        Favorites.find({})
            .exec(function (err, favorite) {
                if (err) throw err;
                res.json(favorite);
            });
    })

    .post(Verify.verifyOrdinaryUser, function (req, res, next) {
        Favorites.create(req.body, function (err, favorite) {
            if (err) throw err;
            console.log('Favorite added');
            var id = favorite._id;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });

            res.end('Added the favorite with id: ' + id);
        });
    })

    .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
        Favorites.remove({}, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

module.exports = favoriteRouter;