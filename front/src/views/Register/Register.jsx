import axios from "axios";
import React, { useState } from "react";
const emailRegexp = /\S+@\S+\.\S+/;
const POSTUSER_URL = "http://localhost:3000/users/register";
import styles from './Register.module.css'

export const Register = () => {
  const initialState = {
    name: "",
    email: "",
    birthdate: "",
    nDni: "",
    username: "",
    password: "",
    confirmpassword: "",
  };
  //estados
  const [user, setUser] = useState(initialState);
  const [errors, setErrors] = useState({ name: "Debe ingresar un nombre" });

  const validateUser = ({
    name,
    email,
    birthdate,
    nDni,
    username,
    password,
    confirmpassword,
  }) => {
    const errors = {};
    if (!name) errors.name = "Debe ingresar un nombre";
    if (!email) errors.email = "Debe ingresar un email";
    else {
      if (!emailRegexp.test(email)) errors.email = "email inválido";
    }
    if (!birthdate) errors.birthdate = "Ingrese fecha de nacimiento";
    if (!nDni) errors.nDni = "Ingrese el nDni";
    if (!username) errors.username = "Ingrese el nombre de usuario";
    if (!password) errors.password = "Ingrese la contraseña";
    if (password !== confirmpassword)
      errors.confirmpassword = "las contraseñas no coinciden";
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: user.name,
      email: user.email,
      birthdate: user.birthdate,
      nDni: user.nDni,
      username: user.username,
      password: user.password,
    };

    axios
      .post(POSTUSER_URL, newUser)
      .then(({ data }) => data)
      .then((userInDB) => alert(`ha sido creado el usuario ${userInDB.name}`))
      .catch((error) => alert(error.message));
    setUser(initialState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    setErrors(validateUser({ ...user, [name]: value }));
  };

  const handleReset = (event) => {
    event.preventDefault();
    setUser(initialState);
  };

  //datos
  const formData = [
    {
      label: "Nombre: ",
      name: "name",
      type: "text",
      placeholder: "Ingrese nombre",
    },
    {
      label: "Email: ",
      name: "email",
      type: "text",
      placeholder: "Ingrese email",
    },
    {
      label: "Fecha de nacimiento: ",
      name: "birthdate",
      type: "date",
      placeholder: "Ingrese Fecha de nacimiento",
    },
    {
      label: "Númeor de DNI: ",
      name: "nDni",
      type: "text",
      placeholder: "Ingrese nDni",
    },
    {
      label: "Username: ",
      name: "username",
      type: "text",
      placeholder: "Ingrese username",
    },
    {
      label: "Contraseña: ",
      name: "password",
      type: "password",
      placeholder: "Ingrese password",
    },
    {
      label: "Confirmar contraseña: ",
      name: "confirmpassword",
      type: "password",
      placeholder: "Verificar contraseña",
    },
  ];

  return (
    <div className={styles.contPrinc}>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        {formData.map(({ label, name, type, placeholder }) => {
          return (
            <div key={name}>
              <label htmlFor={name}>{label}</label>
              <input
                type={type}
                id={name}
                name={name}
                value={user[name]}
                placeholder={placeholder}
                onChange={handleChange}
              />
              {errors[name] && (
                <span style={{ color: "red" }}>{errors[name]}</span>
              )}
            </div>
          );
        })}
        <button
          type="submit"
          disabled={Object.keys(user).some((e) => !user[e])}
        >
          Enviar
        </button>
        <button onClick={handleReset}>Borrar formulario</button>
      </form>
    </div>
  );
};
