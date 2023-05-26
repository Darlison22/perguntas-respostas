import { useState, useEffect } from "react";
import axios from 'axios'
import './resposta.css'
import {Link} from 'react-router-dom'

function Resposta () {

    const [pergunta, setPergunta] = useState({})
    const [resposta, setResposta] = useState('')
    const [respostas, setRespostas] = useState([])
    const [campoInvalido, setCampoInvalido] = useState(false)
    const [tamanhoCaractere, setTamanhoCaractere] = useState(false)

    const id = JSON.parse(localStorage.getItem('idUser'))
    
    //buscar a pergunta cujo o usuario irá fazer a resposta
    useEffect(() => {
        
        async function buscarPergunta() {
            await axios.get(`http://localhost:8080/pergunta/${id}`)
            .then((response) => {
                setPergunta(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        }

        buscarPergunta()

    }, [id])

    //pegar as respostas do banco com o mesmo id da pergunta
    useEffect(() => {
        async function buscarRespostas() {
            await axios.get(`http://localhost:8080/resposta/${id}`)
            .then((response) => {
                setRespostas(response.data)
            })
        }

        buscarRespostas()

    }, [respostas, id])

 
//cadastrar uma resposta
function handleResgister(e) {
        e.preventDefault()

        let respostaArray = resposta.split('')

        if(respostaArray.length >= 500) {
            
            setTamanhoCaractere(true)
            console.log('tamanho da resposta excedeu o limite de caracteres')
            return
        }

        if(resposta !== '') {

            let respostaDoUsuario = {
                bodyQuestion: resposta,
            }

            console.log('estou aqui')
    
           axios.post(`http://localhost:8080/resposta/${id}`, respostaDoUsuario)
            .then((response) => {
                //if(response.status === 200) {
                   // setResposta('')
                   // setCampoInvalido(false)
                   // console.log('estou vindo aqui')
               // }
            })
            .catch((error) => {
                console.log(error)
            })

                setResposta('')
                setCampoInvalido(false)
                setTamanhoCaractere(false)
                quantidadeRespostas()
                console.log('estou vindo aqui')

        } else {
            setCampoInvalido(true)
            return  
        }              

    }

    async function quantidadeRespostas() {

        let quantidade = {
            qtdResposta: respostas.length
        }
        
        await axios.post(`http://localhost:8080/quantidade/${id}`, quantidade)
        .then((response) => {
            if(response.status == 200) {
                console.log('Quantidade de respostas cadastrado com sucesso')
            }
        })
    }

    return(
        <div className="container-resposta">
        
            <h2>
            {pergunta.description}
            </h2>
            <form onSubmit={handleResgister} className='formulario'>
                <textarea 
                type='text' 
                value={resposta} 
                placeholder='digite aqui sua resposta'
                onChange={(e => setResposta(e.target.value))}
                ></textarea>
                {campoInvalido && (
                    <p className="campo-invalido">Preencha o campo da resposta, acima</p>
                )}
                {tamanhoCaractere && (
                    <p className="campo-invalido">Tamanho do texto excedeu o limite de caracteres</p>
                )}
                <button type="submit">Enviar Resposta</button>
                <Link className="pergunta" to='/'>Responda a pergunta de alguem aqui!</Link>
            </form>

            <ul>
                {respostas.map((resposta) => {
                    return(
                        <li key={resposta.id}>
                            {resposta.bodyQuestion}
                        </li>
                    )
                })}
                <br/>
            </ul>

        </div>
    )
}

export default Resposta