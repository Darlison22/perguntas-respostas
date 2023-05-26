import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './home.css'

function Home() {

    const [perguntas, setPerguntas] = useState([])
    const [quantidade, setQuantidade] = useState([])
    const [dadosTotais, setDadosTotais] = useState([])
    

    useEffect(() => {
        async function buscarDados() {
         await axios.get('http://localhost:8080/perguntas')
        .then((response) => {
            setPerguntas(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

        buscarDados()

    }, [])


    useEffect(() => {

        async function pegarQuantidadePerguntas() {

            console.log('aqui')
            
            await axios.get('http://localhost:8080/quantidade/')
            .then((response) => {
                if(response.status === 200) {
                    setQuantidade(response.data)
                }

            })
            .catch((error) => {
                console.log(error)
            })
        }

        pegarQuantidadePerguntas()

    }, [])


   useEffect(() => {

    function pegarDadosTotais() {

        let total = []  

        perguntas.map((p) => {

           let valor = quantidade.find(q => q.idPergunta === p.id)

            if(valor === undefined) {
                
                total.push({
                    id: p.id,
                    title: p.title,
                    description: p.description,
                    qtdResposta: 0
                })
            } else {

               quantidade.map((q) => {
                if(q.idPergunta === p.id) {
                    total.push({
                        id: p.id,
                        title: p.title,
                        description: p.description,
                        qtdResposta: q.qtdResposta
                    })
                }
               })

            }

        })

        setDadosTotais(total)

        console.log('aqui eh o total:',total)
    }

    pegarDadosTotais()

   }, [perguntas, quantidade])


    

    function pegarIdPergunta(id) {
        localStorage.setItem('idUser', JSON.stringify(id))
    }

   


    return(
        <div className='container'>
            <h1>Ask de perguntas e respostas!</h1>
           <Link to='/pergunta' className='botao-pergunta'>perguntar</Link>
            <ul>
                {dadosTotais.map((dado) => {
                    return(
                        <li key={dado.id}>
                            <h2 className='title'>{dado.title}</h2>
                            <h3 className='description'>{dado.description}</h3>
                            <Link 
                            to={`/resposta/${dado.id}`} 
                            onClick={() => pegarIdPergunta(dado.id)}
                            className='botao-resposta'
                            >responder</Link>

                            <div className='respostas'>

                                <p>respostas:</p>

                                <p>{dado.qtdResposta}</p>
                                
                            </div>
                            
                        </li>
                        
                    )
                })}

               
            </ul>
        </div>
    )
}

export default Home