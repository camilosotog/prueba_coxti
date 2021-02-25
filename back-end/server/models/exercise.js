module.exports = (sequelize, DataTypes) => {
    // se define el esquema de la tabla de la base de datos con sus campo o columnas
    const exercises = sequelize.define('exercise', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        answer: DataTypes.STRING,
        value: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },{
        // se renombra el nombre de la tabla para ser usado API
        tableName: 'exercise'
    });

    return exercises;
}