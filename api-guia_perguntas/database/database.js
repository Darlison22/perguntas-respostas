const Sequelize = require('sequelize')

const connection = new Sequelize('guiaperguntas', 'root', '123123', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection 