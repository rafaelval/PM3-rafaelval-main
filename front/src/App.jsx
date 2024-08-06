import { Route, Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar/NavBar'
import { About } from './views/About/About'
import { Appointments } from './views/Appointments/Appointments'
import Home from './views/Home/Home'
import { Login } from './views/Login/Login'
import { Register } from './views/Register/Register'
import { Contact } from './views/Contact/Contact'
import { LandingPage } from './views/LandingPage/LandingPage'
import {AppointmentForm} from './views/AppointmentForm/AppointmentForm'

function App() {

  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/appointments' element={<Appointments/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/appointmentschedule' element={<AppointmentForm/>}/>
      </Routes>
    </div>
  )
}

export default App
