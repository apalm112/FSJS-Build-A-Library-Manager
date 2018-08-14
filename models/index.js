'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
/*  Connect all the models/tables in the database to ad db object, so everything is accessible via one object.  */
var db        = {};


if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Models/tables
/*db.patrons = require('../models/patrons.js')(sequelize, Sequelize);
db.loans = require('../models/loans.js')(sequelize, Sequelize);
db.books = require('../models/books.js')(sequelize, Sequelize);*/

// Relations, Table Joins, Associations
/* Example of how it works:
 		sourceModel.hasOne(targetModel)
 		Book.hasOne(Loan);
		sourceModel.hasMany(targetModel)
		targetModel.belongsTo(sourceTable)
	*/

/*db.loans.belongsTo(db.books);
db.loans.belongsTo(db.patrons);

db.books.hasOne(db.loans);
db.patrons.hasMany(db.loans);*/


// /* sourceModel.hasMany(targetModel) */


module.exports = db;
