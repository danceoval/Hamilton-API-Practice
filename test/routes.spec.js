var client = require('supertest')(require('../app'));
var expect = require('chai').expect;
var db = require('../db');
var Campus = models.Campus;
var Instructor = models.Instructor;
var InstructorCampus = models.InstructorCampus;
var Promise = require('bluebird');

describe('routes', function(){
  before(function(done){
    db.sync()
      .then(function(){
        done();
      })
      .catch(done);
  });
  beforeEach(function(done){
    db.truncate()
      .then(function(){
        done();
      })
      .catch(done);
  });

  describe('DELETE /instructorCampus', function(){
    it('redirects back to backTo', function(done){
      Promise.all([
          Instructor.create({ name: 'Moe' }),
          Campus.create({ planet: 'terra' }),
      ])
      .spread(function(instructor, campus){
        return InstructorCampus.create({ instructorId: instructor.id, campusId: campus.id });
      })
      .then(function(instructorCampus){
        client.delete('/instructorCampus/' + instructorCampus.instructorId + '/' + instructorCampus.campusId + '?backTo=/foos')
          .expect(302)
          .end(function(err, result){
            if(err)
              return done(err);
            expect(result.header.location).to.equal('/foos');
            done();
          });
      })
    });
  });

  describe('POST /instructorCampus', function(){
    it('redirects back to backTo', function(done){
      Promise.all([
          Instructor.create({ name: 'Moe' }),
          Campus.create({ planet: 'saturn' }),
      ])
      .spread(function(instructor, campus){
        client.post('/instructorCampus/' + instructor.id + '/' + campus.id + '?backTo=/foos')
          .expect(302)
          .end(function(err, result){
            if(err)
              return done(err);
            expect(result.header.location).to.equal('/foos');
            done();
          });
      })
    });
  });

  describe('POST /instructors', function(){
    it('redirects back to instructors', function(done){
      client.post('/instructors')
        .send('name=moe')
        .expect(302)
        .end(function(err, result){
          if(err)
            return done(err);
          expect(result.header.location).to.equal('/instructors');
          done();
        });
    });
  });

  describe('POST /campus', function(){
    it('redirects back to campus', function(done){
      client.post('/campus')
        .send('planet=moon')
        .expect(302)
        .end(function(err, result){
          if(err)
            return done(err);
          expect(result.header.location).to.equal('/campus');
          done();
        });
    });
  });
});
