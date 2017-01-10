var router = require('express').Router();
var models = require('../db').models;
var Promise = require('bluebird');
var Campus = models.Campus;
var Instructor = models.Instructor;
var InstructorCampus = models.InstructorCampus;

module.exports = router;

router.get('/', function(req, res, next){

});

router.post('/', function(req, res, next){

});
