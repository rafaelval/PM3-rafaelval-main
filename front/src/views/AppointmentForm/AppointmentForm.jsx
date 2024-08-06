import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const POSTAPPOINTMENT_URL= "http://localhost:3000/appointments/schedule"
import {useNavigate} from 'react-router-dom'
import styles from './AppointmentForm.module.css'
import { setUserAppointments } from "../../redux/userSlice";

export const AppointmentForm = () =>{
  const initialState = {
    date: "",
    time: "",
    description: "",
  };
  
  const [appointment, setAppointment] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validateAppointment = ({date, time, description}) => {
const errors = {}
if(!date) errors.date = 'Debe ingresar una fecha'
if(!time) errors.time = 'Debe ingresar una hora'
if(!description) errors.description = 'Ingrese una descripcion'
return errors
  }

  const navigate = useNavigate()

  const userId = useSelector(state => state.actualUser?.userData?.user?.id)
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
      event.preventDefault()
      const newAppointment = {
            date:appointment.date,
            time:appointment.time,
            description:appointment.description,
            userId,
            status:"active"
      }
      axios.post(POSTAPPOINTMENT_URL, newAppointment)
      .then(({data}) => data)
      .then(appointmentInDb => {
        alert(`ha sido creada la nueva cita Fecha: ${appointmentInDb.date}, hora: ${appointmentInDb.time}`)
        dispatch(setUserAppointments())
      })
      .catch(error => alert(error.message))
      navigate('/appointments')
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "time" && !timeOptions.includes(value)) {
        setErrors({ ...errors, time: "Por favor, seleccione una hora válida de 8 am a 5 pm con intervalos de media hora." });
    } else {
        setAppointment({ ...appointment, [name]: value });
        setErrors(validateAppointment({ ...appointment, [name]: value }));
    }
};

  const timeOptions = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
];

const today = new Date().toISOString().split('T')[0];

  return (
    <div className={styles.contPrinc}>
      <h2>Crear una cita</h2>
      <form onSubmit={handleSubmit}>
      <label htmlFor="date">Fecha:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={appointment.date}
          min={today}
          onChange={handleChange}
        />
        {errors.date && <span style={{ color: "red" }}>{errors.date}</span>}

        <label htmlFor="time">Hora:</label>
        <select
          id="time"
          name="time"
          value={appointment.time}
          onChange={handleChange}
        >
          <option value="">Selecciona una hora</option>
          {timeOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.time && <span style={{ color: "red" }}>{errors.time}</span>}

        <label htmlFor="description">Descripción:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={appointment.description}
          onChange={handleChange}
        />
        {errors.description && <span style={{ color: "red" }}>{errors.description}</span>}

        <button type="submit" disabled={Object.values(appointment).some(value => !value)}>
          Crear cita
        </button>
      </form>
    </div>
  );
};
