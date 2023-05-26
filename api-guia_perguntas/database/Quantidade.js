const Sequelize = require('sequelize')
const connection = require('./database')

const Quantidade = connection.define('quantidade', {

    idPergunta: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    qtdResposta : {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Quantidade.sync({force: false})
.then(() => {})

module.exports = Quantidade