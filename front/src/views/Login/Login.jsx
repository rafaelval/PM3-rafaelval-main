import axios from 'axios'
import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {setUserData} from '../../redux/userSlice'
import {useNavigate} from 'react-router-dom'
import styles from './Login.module.css'

const POSTUSERLOGIN_URL= 'http://localhost:3000/users/login'


export const Login = () => {
  const initialState ={
    username:"",
    password:""
  }

const [user, setUser] = useState(initialState)
const [errors, setErrors] = useState(initialState)

const validateUser= ({username,password}) => {
  const errors = {}
  if (!username) errors.username = 'Ingresar username'
  if (!password) errors.password = 'Ingresar password'
  return errors
}

const handleChange = (event) => {
  const {name, value} = event.target
  setUser({...user, [name]:value})
  setErrors(validateUser({...user, [name]:value}))
}

const dispatch = useDispatch()
const navigate = useNavigate()

const handleSubmit = (event) => {
  event.preventDefault()
  axios.post(POSTUSERLOGIN_URL, user)
  .then(response=> response.data)
  .then(data=>{
    dispatch(setUserData(data))
    alert('Usuario logeado...')
    navigate("/home")
  })
  .catch((error)=>
  alert(`Acceso denegado: ${error?.response?.data?.message}`)
  )
  setUser(initialState)
}

const formData = [
  {label:"Username: ", name:"username", type: "text"},
  {label:"Password: ", name:"password", type: "password"},
]

  return (
    <div className={styles.contPrinc}>
      <h2>Login</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        {formData.map(({label,name, type})=>{
          return (
            <div key={name}>
            <label htmlFor={name}>{label}</label>
            <input 
              id={name}
              name={name}
              type={type}
              value={user[name]}
              placeholder={`Ingresar ${label.toLowerCase()}`}
              onChange={handleChange}
            />
            {errors[name] && (
              <span style={{color: "red"}}>{errors[name]}</span>
            )}
          </div>
          )
        })}
        <button type='submit'
        className={styles.submit}
          disabled={Object.keys(user).some((e) => !user[e])}
        >
            Ingresar
        </button>
      </form>
    </div>
  )
}

// {
//   "username": "rafa622",
//   "password": "+65651"
//   }