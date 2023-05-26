const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Pergunta = require('./database/Pergunta')
const Resposta = require('./database/Resposta')
const Quantidade = require('./database/Quantidade')
const connection = require('./database/database')
const cors = require('cors')



app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

connection.authenticate()
          .then(() => {
            console.log('conexão feita com o banco de dados')
          })
          .catch((error) => {
            console.log('erro ao conectar com o banco de dados: '+error)
          })

// para pegar uma lista de todas as perguntas
app.get('/perguntas', (req, res) => {

    Pergunta.findAll({raw: true, order: [
        ['id', 'DESC']
    ]})
    .then((perguntas) => {
        res.json(perguntas)
        res.status(200)
        console.log(perguntas)
    })

})

//para pegar uma unica pergunta no banco de dados
app.get('/pergunta/:id', (req, res) => {

    if(isNaN(req.params.id)) {
        res.status(400)
    } else {

        let id = parseInt(req.params.id)
        Pergunta.findByPk(id)
        .then(response => {
            res.json(response)
            res.status(200)
        })

       
    }
})

//para salvar uma pergunta no banco de dados de um usuario
app.post('/pergunta', (req, res) => {
    var {title, description} = req.body
    Pergunta.create({ 
        title: title,
        description: description
    })
    .then(() => {
        res.json('salvo com sucesso no banco de dados')
        res.status(200)
    }).catch((err) => {
        res.status(401)
        console.log(err)
    })
})

//para salvar a resposta do usuario no banco de dados referente a uma pergunta
app.post('/resposta/:id', (req, res) => {
    
    var{bodyQuestion} = req.body

    let id = req.params.id

    Resposta.create({
        bodyQuestion: bodyQuestion,
        questionId: id
    })
    .then(() => {
        res.status(200)
    })
})

//pega todas as respostas de uma unica pergunta e joga num array para imprimir na tela as respostas abaixo da pergunta
app.get('/resposta/:id', (req, res) => {

    if(isNaN(req.params.id)) {
        res.status(400)
    } else {
        let id = parseInt(req.params.id)

        Resposta.findAll({raw: true, order: [
            ['id', 'DESC']
        ]})
        .then((respostas => {
            let data = []
            respostas.forEach((resposta) => {
                if(resposta.questionId == id) {
                    data.push(resposta)
                }
            })

            res.json(data)
            res.status(200)

        }))
    }
})


//salvar a quantidade de respostas de cada pergunta, temos:
app.post('/quantidade/:id', (req, res) => {

    if(isNaN(req.params.id)) {
        res.status(400)
    } else {
        let id = parseInt(req.params.id)

        Quantidade.findAll({raw: true, order: [
            ['id', 'DESC']
        ]})
        .then(quantidade => {
            quantidade.forEach(q => {
                if(q.idPergunta == id) {
                    Quantidade.destroy({where: {id: q.id}})
                }
            })
        })

        var {qtdResposta} = req.body

        Quantidade.create({
            idPergunta: id,
            qtdResposta: qtdResposta + 1
        })
        .then(() => {
            res.status(200)
        })
    }
})

//vai pegar a quantidade de respostas que cada pergunta tem
app.get('/quantidade', (req, res) => {

        Quantidade.findAll({raw: true, order: [
            ['id', 'DESC']
        ]})
        .then(quantidade => {
            res.json(quantidade)
            res.status(200)
        })
})

app.listen(8080, () => {
    console.log('servidor rodanddo')
})