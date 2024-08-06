import React from "react";
import styles from "./AppointmentCard.module.css";

export const AppointmentCard = ({
  id,
  date,
  time,
  status,
  description,
  handleAppointmentCancel,
}) => {
  const currentDate = new Date();
  const appointmentDate = new Date(date);

  const formatDate = `${appointmentDate.getDate()} / ${
    appointmentDate.getMonth() + 1
  } / ${appointmentDate.getFullYear()}`;

  const handleClick = () => {
    console.log(appointmentDate.getMonth(), currentDate.getMonth());
    if (
      (appointmentDate.getMonth() === currentDate.getMonth() &&
        appointmentDate.getDay() !== currentDate.getDay()) ||
      appointmentDate.getMonth() !== currentDate.getMonth()
    ) {
      if (window.confirm("¿Desea cancelar la cita?")) {
        handleAppointmentCancel(id);
      }
    } else {
      alert(
        "No se puede cancelar la cita agendada para el mismo día."
      );
    }
  };

  return (
    <div className={styles.cardContainer}>
      <span>{formatDate}</span>
      <span>{time} Horas</span>
      <span>{description}</span>
      <span
        onClick={handleClick}
        className={status === "active" ? styles.active : styles.cancelled}
      >
        {status === "active" ? "Activo (cancelar)" : "Cancelado"}
      </span>
    </div>
  );
};

export default AppointmentCard;
