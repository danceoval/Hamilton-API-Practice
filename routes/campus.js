var router = require('express').Router();
var Promise = require('bluebird');
var models = require('../db').models;
var Campus = models.Campus;
var Instructor = models.Instructor ;
var InstructorCampus = models.InstructorCampus;

module.exports = router;

router.get('/', function(req, res, next){
  //what do we need here??
  //campus, instructors and the relation
 
});

router.post('/', function(req, res, next){
  //Create Campus and redirect

});
