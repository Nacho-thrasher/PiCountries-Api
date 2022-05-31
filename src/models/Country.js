const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('countries', {
    id_country:{
      type: DataTypes.STRING(3),
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      get: function() {
        return JSON.parse(this.getDataValue('name')); 
      }, 
      set: function(val) {
          return this.setDataValue('name', JSON.stringify(val));
      }
    },
    imagen_bandera: {//@url
      type: DataTypes.STRING,
    },
    continente: {
      type: DataTypes.STRING,
      get: function() {
        return JSON.parse(this.getDataValue('continente'));
      }, 
      set: function(val) {
          return this.setDataValue('continente', JSON.stringify(val));
      }
    },
    capital:{
      type: DataTypes.STRING,
      get: function() {
        return JSON.parse(this.getDataValue('capital'));
      }, 
      set: function(val) {
          return this.setDataValue('capital', JSON.stringify(val));
      }
    },
    region:{
      type: DataTypes.STRING,
    },
    subregion: {
      type: DataTypes.STRING,
    },
    poblacion:{
      type: DataTypes.INTEGER,
    },
    area:{
      type: DataTypes.INTEGER,
    },
    maps: {
      //? array
      type: DataTypes.STRING,
      get: function() {
        return JSON.parse(this.getDataValue('maps'));
      }, 
      set: function(val) {
          return this.setDataValue('maps', JSON.stringify(val));
      }
    },
    escudo: {
      //array
      type: DataTypes.STRING,
      get: function() {
        return JSON.parse(this.getDataValue('escudo'));
      }, 
      set: function(val) {
          return this.setDataValue('escudo', JSON.stringify(val));
      }
    }

  });
};

//area ?