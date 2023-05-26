import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import './pergunta.css'

function Pergunta() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [campoInvalido, setCampoInvalido] = useState(false)
    const [tamanhoCaractere, setTamanhoCaractere] = useState(false)

    const navigate = useNavigate()

   
async function handleRegister(e) {
    e.preventDefault()

    let titleArray =  title.split('')
    let descriptionArray = description.split('')

    if(titleArray.length >= 60 || descriptionArray.length >= 500) {

        console.log('Caracteres passando do limite')
        setTamanhoCaractere(true)
        return 
    }


 
   if(title !== '' && description !== '') {


    let data = {
        title: title,
        description: description
    }

    
    await axios.post('http://localhost:8080/pergunta', data)
    .then((response) => {
        if(response.status == 200) {
            console.log('Pergunta registrada no BD')
            setTitle('')
            setDescription('')
            navigate('/')
            setCampoInvalido(false)
            setTamanhoCaractere(false)
        }
    })
    .catch((error) => {
        console.log('Erro ao registrar a pergunta no BD: '+error)
    })

   

   } else {
        setCampoInvalido(true)
        return
   }


}


    return(
        <div className='container-pergunta'>
            <h1>Faça uma pergunta para ser respondida!!!</h1>
            <form onSubmit={handleRegister} className='formulario'>
                <input 
                type='text' 
                placeholder='digite o titulo da pergunta' 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                type='text' 
                placeholder='formule a pergunta aqui' 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
                {campoInvalido && (
                    <p className='campo-invalido'>preencha todos os campos</p>
                )}
                {tamanhoCaractere && (
                    <p className='campo-invalido'>Tamanho do texto excedeu o limite de caracteres</p>
                )}
                <button type='submit'>Enviar</button>
            </form>
        </div>
    )
}

export default Pergunta