require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require('fs');
const path = require('path');
// Carga de variables de entorno.
const {
    DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY
  } = process.env;

 // Instancia de Sequelize. 

//   const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/rickandmorty`, {
//   logging: false, 
//   native: false, 
// });

  const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false, 
  native: false, 
});

// Carga de Modelos.
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { User, Character} = sequelize.models;

// Relaciones.

User.belongsToMany(Character, {through: "Favorites", as: null, timestamps: false})
Character.belongsToMany(User, {through: "Favorites", as: null, timestamps: false})

module.exports = {
    ...sequelize.models,
    conn: sequelize,
}