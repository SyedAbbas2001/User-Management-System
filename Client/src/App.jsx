import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home';
import CreateUser from './Pages/CreateUser';
import UpdateUser from './Pages/UpdateUser';
function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/create' element={<CreateUser/>}/>
          <Route path='/update/:id' element={<UpdateUser/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
