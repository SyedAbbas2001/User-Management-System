import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home';
import CreateUser from './Pages/CreateUser';
import UpdateUser from './Pages/UpdateUser';
import LoginForm from './Pages/Login';
import SignupForm from './Pages/Register';
function App() {

  return (
    <div>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/update/:id" element={<UpdateUser />} />
        <Route path="/sign-up" element={<SignupForm />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
