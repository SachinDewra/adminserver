const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Promotion = require('../models/promotions');
const Dishes = require('../models/dishes');
mongoose.Promise = require('bluebird')
var cors = require('./cors');

const promotionsRouter = express.Router();

promotionsRouter.use(bodyParser.json());


promotionsRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {  res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Promotion.find(req.query)
    .then((promos) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promos);
    },(err) =>next(err))
    .catch((err)=>next(err));
})
.post(cors.corsWithOptions, (req, res, next) => {
    Promotion.create(req.body)
    .then((promos) => {
        console.log(promos);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promos);
    },(err) => next(err))
    .catch((err)=>next(err));
})
.put(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete(cors.corsWithOptions, (req, res, next) => {
    Promotion.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});


promotionsRouter.route('/:promoId')
.get(cors.cors, (req,res,next) => {
    Promotion.findById(req.params.promoId)
    .then((promos) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promos);
    },(err) => next(err))
    .catch((err)=>next(err))
})
.post(cors.corsWithOptions, (req,res,next) => {
    res.statusCode = 403;
    res.end('Post method not supported on /promotions/'+req.params.promoId);
})
.put(cors.corsWithOptions, (req, res,next) => {
    Promotion.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, {new : true})
    .then((promos) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promos);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, (req,res,next) => {
    Promotion.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});



module.exports = promotionsRouter;