import React from 'react'
import styles from './NavBar.module.css'
import {NavLink, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUserAppointments, setUserData } from '../../redux/userSlice'
import image from '../../images/a9409281fa230ecd40b7f6e5f0594159.jpg'

export const NavBar = () => {

const logged = useSelector(state =>state.actualUser.userData.login)
const dispatch = useDispatch()
const navigate = useNavigate()
const handleLogout = () =>{
  const confirmed = window.confirm("desea desloguearse?")
  if (confirmed){
    dispatch(setUserData({}))
    dispatch(setUserAppointments([]))
    navigate("/")
  }
}

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.logoSection}>
            <img src={image} alt="" />
      </div>
      <div className={styles.linksSection}>
            <NavLink to ='/home'>
              <span>HOME</span>
            </NavLink>
            {
              logged &&
              <NavLink to ='/appointments'>
              <span>RESERVAS</span>
            </NavLink>
            }
            {
              logged &&
              <NavLink to ='/appointmentschedule'>
              <span>NUEVA RESERVA</span>
            </NavLink>
            }
            <NavLink to ='/about'>
              <span>ACERCA DE</span>
            </NavLink>
            <NavLink to ='/contact'>
              <span>CONTACTO</span>
            </NavLink>
            {
              logged ? 
              <span onClick={handleLogout}>LOGOUT</span>
            
            : <NavLink to="/login">
              <span>LOGIN</span>
            </NavLink>
            }
      </div>
      <div className={styles.avatarSection}>
            <img src="https://img.freepik.com/vector-gratis/plantilla-logotipo-empollon-degradado_23-2149201756.jpg" alt="" />
      </div>
    </div>
  )
}
