import React, { useEffect, useState } from "react";
import { AppointmentCard } from "../../components/AppointmentCard/AppointmentCard";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux'
import { setUserAppointments } from "../../redux/userSlice";

const GETUSERBYID_URL = "http://localhost:3000/users/";

export const Appointments = () => {
  const dispatch = useDispatch()
  
  const actualUserId = useSelector(state => state.actualUser?.userData?.user?.id) 
  const userAppointments = useSelector(state => state.actualUser.userAppointments)

  useEffect(() => {
    axios.get(GETUSERBYID_URL + actualUserId)
    .then((response) => dispatch(setUserAppointments(response?.data?.appointments)))
    .catch((error)=> console.log(error.message))
  }, [actualUserId, dispatch]);

  const CANCEL_URL = 'http://localhost:3000/appointments/cancel/'
  const handleAppointmentCancel = (appointmentId) => {
    axios 
    .put(CANCEL_URL +appointmentId)
    .then(() =>{
      axios.get(GETUSERBYID_URL + actualUserId)
      .then((response) => dispatch(setUserAppointments(response?.data?.appointments)))
      .catch((error) => console.log(error.message))
    })
    .catch(error => alert("Error al cancelar la reserva"))
  }

  return (
    <div>
      <h1>Mis reservas</h1>
      {
      userAppointments ? 
      userAppointments.map((appointment) => (
        <AppointmentCard
          key={appointment.id}
          id={appointment.id}
          date={appointment.date}
          time={appointment.time}
          status={appointment.status}
          description={appointment.description}
          handleAppointmentCancel={() => handleAppointmentCancel(appointment.id)}
        />
      ))
      : <p>No hay reservas</p>
    }
    </div>
  );
};

