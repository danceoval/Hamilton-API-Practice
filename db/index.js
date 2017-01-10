var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/hamilton_academy', {
  logging: false
});

var Instructor = db.define('instructor', {/*
    YOUR CODE HERE
*/});

var Campus = db.define('campus', {/*
  YOUR CODE HERE
*/});

var InstructoCampus = db.define('instructor_campus', {/*
  YOUR CODE HERE
*/});


//Relations
/*
  HOW DO THESE MODELS RELATE TO ONE ANOTHER?
*/


//Sync and truncate are methods used in testing
module.exports = {
  models: {
    Instructor: Instructor,
    Campus: Campus,
    InstructorCampus: InstructorCampus
  },
  sync: function(){
    return db.sync({force: true });
  },
  truncate: function(){
    //perhaps put some restrictions - only if CONN is test**
    return InstructorCampus.destroy({ where: {} })
      .then(function(){
        return Promise.all([
            Instructor.destroy( { where: {} }),
            Campus.destroy( { where: {} })
        ]);
      })
  }
};
