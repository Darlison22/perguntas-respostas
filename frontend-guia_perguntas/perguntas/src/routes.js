import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Pergunta from './pages/Pergunta'
import Resposta from './pages/Resposta'

function MyRoutes() {
    return(
       <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/pergunta' element={<Pergunta/>} />
                <Route path='/resposta/:id' element={<Resposta/>} />
            </Routes>
       </BrowserRouter>
    )
}

export default MyRoutes