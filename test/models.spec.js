var expect = require('chai').expect;
var db = require('../db');
var models = db.models;
var Campus = models.Campus;
var Instructor = models.Instructor;
var InstructorCampus = models.InstructorCampus;
var Promise = require('bluebird');

describe('Models', function(){
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

  describe('Campus', function(){
    it('it exists', function(){
      expect(Region).to.be.ok;
    });
    
    describe('has Instructor', function(){
      var moe, campus1, campus2;
      beforeEach(function(done){
        Promise.all([
          Instructor.create({ name: 'moe'}),
          Region.create({ planet: 'saturn' }),
          Region.create({ planet: 'mars' })
        ])
        .spread(function(_moe, _campus1, _campus2){
          moe = _moe;
          campus1 = _campus1;
          campus2 = _campus2;

          return InstructorCampus.create({
            campusId: campus1.id,
            instructorId: moe.id
          });
        })
        .then(function(){
          return Promise.all([
            Campus.findById(campus1.id, { include: [ InstructorCampus ]}),
            Campus.findById(campus2.id, { include: [ InstructorCampus ]}),
          ])
        })
        .spread(function(_campus1, _campus2){
          campus1 = _campus1;
          campus2 = _campus2;
          done();
        })
        .catch(done);
      
      });
      it('campus1 has moe', function(){
        expect(campus1.hasInstructor(moe.id)).to.equal(true);
      });

      it('campus2 does not have moe', function(){
        expect(campus2.hasInstructor(moe.id)).to.equal(false);
      });
    });

    describe('creation', function(){
      var campus3;
      beforeEach(function(done){
        Campus.create({ planet: 'moon' })
          .then(function(_campus3){
            campus2 = _campus3;
            done();
          })
          .catch(done);
      });
      it('can be created', function(){
        expect(campus3.planet).to.equal('moon');
      });
    });
  });

  describe('Instructor', function(){
    it('it exists', function(){
      expect(Instructor).to.be.ok;
    });

    describe('#hasCampus', function(){
      var moe, campus1, campus2;
      beforeEach(function(done){
        Promise.all([
          Instructor.create({ name: 'moe'}),
          Campus.create({ planet: 'mercury' }),
          Campus.create({ planet: 'venus' })
        ])
        .spread(function(_moe, _campus1, _campus2){
          moe = _moe;
          campus1 = _campus1;
          campus2 = _campus2;

          return InstructorCampus.create({
            campusId: campus1.id,
            instructorId: moe.id
          });
        })
        .then(function(){
          return Instructor.findById(moe.id, { include: [ InstructorCampus ]});
        })
        .then(function(_moe){
          moe = _moe;
          done();
        })
        .catch(done);
      
      });
      it('moe has campus on mercury', function(){
        expect(moe.hasCampus(campus1.id)).to.equal(true);
      });

      it('moe does not campus on venus', function(){
        expect(moe.hasCampus(campus2.id)).to.equal(false);
      });
    
    });

    describe('creation', function(){
      var moe;
      beforeEach(function(done){
        Instructor.create({ name: 'moe' })
          .then(function(_moe){
            moe = _moe;
            done();
          })
          .catch(done);
      });
      it('can be created', function(){
        expect(moe.name).to.equal('moe');
      });
    });
  });
});
