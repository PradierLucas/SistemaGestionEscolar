import React, { useState, useEffect } from 'react';
import DataUser from '../datosUser';

const EditUserAlumno = () => {
  const { data: user } = DataUser();
  const [item, setItem] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    imagen: null,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (user) {
      setItem({
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        password: user.password,
        imagen: user.imagen,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setItem((prevUser) => ({
      ...prevUser,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', item.nombre);
    formData.append('apellido', item.apellido);
    formData.append('email', item.email);
    formData.append('password', item.password);
    formData.append('imagen', item.imagen);

    fetch(`http://localhost:8080/api/usuarios/editar/${user.id_usuario}`, {
      method: 'PUT',
      headers: {
        'authorization': sessionStorage.getItem('token'),
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al editar el usuario');
        }
      })
      .then((data) => {
        console.log('Usuario editado:', data);
  
        window.location.reload();
      })
      .catch((error) => console.error('Error al editar el usuario: ', error));
  };

  return (
    <>
      <div className="container mt-5">
        <div className="container text-center">
          <h3>Editar Información</h3>
        </div>
        <br></br>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nombre">
                  <h4>Nombre</h4>
                </label>
                <input
                  placeholder="nombre"
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="form-control"
                  value={item.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <br></br>
              <div className="form-group">
                <label htmlFor="apellido">
                  <h4>Apellido</h4>
                </label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  className="form-control"
                  value={item.apellido}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <br></br>
              <div className="form-group">
                <label htmlFor="imagen">
                  <h4>Imagen</h4>
                </label>
                <img
                            src={`http://localhost:8080/upload/${user.imagen}`}
                            alt=""
                            className=' rounded-circle'
                            width={100}
                            height={100}
                        />
                        <br></br>
                <input
                  type="file"
                  className="form-control"
                  id="imagen"
                  name="imagen"
                  onChange={handleInputChange}
                />
                
              </div>
              <br></br>
              <div className="form-group">
                <label htmlFor="email">
                  <h4>Email</h4>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={item.email}
                  readOnly
                />
              </div>
              <br></br>
              <div className="row">
                <label htmlFor="password">
                  <h4>Contraseña</h4>
                </label>
                <div className="col">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    id="password"
                    name="password"
                    className="form-control"
                    value={item.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="col">
                  <button
                    type="button"
                    className="btn "
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (
                      <span class="material-symbols-outlined">visibility_off</span>
                    ) : (
                      <span class="material-symbols-outlined">visibility</span>
                    )}
                  </button>
                </div>
              </div>
<br></br>
              <button type="submit" className="btn btn-primary">
                Editar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUserAlumno;
