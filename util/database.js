const Sequilize = require('sequelize');

const sequelize = new Sequilize('node-complete', 'root', '8521',{
    dialect:'mysql',
    host: 'localhost'
});

module.exports = sequelize;