import React, { useState } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';


const FormCrearNota = () => {
  const {id_materia, id_usuario,apellido} = useParams();
  const navigate = useNavigate()

  const [data , setData] = useState({
    id_usuario: id_usuario,
    id_materia: id_materia,
   descripcion : "",
   valor : null
  });

const handleInputChangeNota = (e) => {
    const { name, value } = e.target;

    if (value >= 0 && value <= 10) {
      setData({
        ...data,
        [name]: value,
      });
    } else {
     alert('El valor debe estar entre 1 y 10')
      console.error('El valor debe estar entre 1 y 10');
    }
    
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    
      setData({
        ...data,
        [name]: value,
      });
   
    
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/nota",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'authorization': sessionStorage.getItem('token')
    },
    body: JSON.stringify(data),
  
  })
  .then((response) => {
    if (response.ok) {
        console.log('Elemento actualizado con éxito');
     navigate('/dashboard2')
       

    } else {
        console.error('Error al actualizar el elemento');
    }
})
.catch((error) => {
    console.error('Error de red:', error);
});
};
  return (
    <>
   

      <div className="container mt-5  ">
      <h4>Crear Nota </h4>
      <br></br>
    <h4>Alumno: {apellido}</h4>
    <br></br>
        <div className="row justify-content-center">

          <div className="col-md-6">

            <form onSubmit={handleSubmit}>
        
              <div className="form-group">
                <label htmlFor="descripcion"><h4>Descripcion</h4></label>
                <input
                  type="text"
                  id="descripcion"
                  name='descripcion'
                  className="form-control"
                  value={data.descripcion}
                  onChange={handleInputChange}
                  required
                
                />
              </div>
              <br></br>
              <div className="form-group">
                <label htmlFor="valor"><h4>Nota</h4></label>
                <input

                  type="float"
                  id="valor"
                  name='valor'
                  className="form-control"
                  value={data.valor}
                  onChange={handleInputChangeNota}
                 required
                />
              </div>
              <br></br>
              <button type="submit" className="btn btn-primary">Crear</button>
            </form>
          </div>
        </div>
      </div></>
  );
};

export default FormCrearNota      