const Sequelize = require('sequelize')
const connection = require('./database')

const Resposta = connection.define('resposta', {
    bodyQuestion: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    questionId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Resposta.sync({force: false})
        .then(() => {})

module.exports = Resposta