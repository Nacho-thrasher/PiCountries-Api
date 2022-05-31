const {
    DataTypes
} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    sequelize.define('activities', {
        id_actividad: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        dificultad: {
            type: DataTypes.ENUM(['1', '2', '3', '4', '5']),
            allowNull: true,
        },
        duracion: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        temporada: {
            type: DataTypes.ENUM(['verano', 'invierno', 'otoño', 'primavera']),
            allowNull: true,
        }
    });
};