const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Leader = require('../models/leaders');
mongoose.Promise = require('bluebird')
var cors = require('./cors');

const leadersRouter = express.Router();

leadersRouter.use(bodyParser.json());


leadersRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {  res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Leader.find(req.query)
    .then((leads) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leads);
    },(err) =>next(err))
    .catch((err)=>next(err));
})
.post(cors.corsWithOptions, (req, res, next) => {
    Leader.create(req.body)
    .then((leads) => {
        console.log(leads);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leads);
    },(err) => next(err))
    .catch((err)=>next(err));
})
.put(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete(cors.corsWithOptions, (req, res, next) => {
    Leader.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});


leadersRouter.route('/:leaderId')
.get(cors.cors, (req,res,next) => {
    Leader.findById(req.params.leaderId)
    .then((leads) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leads);
    },(err) => next(err))
    .catch((err)=>next(err))
})
.post(cors.corsWithOptions, (req,res,next) => {
    res.statusCode = 403;
    res.end('Post method not supported on /leaders/'+req.params.leaderId);
})
.put(cors.corsWithOptions, (req, res,next) => {
    Leader.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, {new : true})
    .then((leads) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leads);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, (req,res,next) => {
    Leader.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});



module.exports = leadersRouter;