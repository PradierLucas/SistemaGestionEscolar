import React, { useState, useEffect  } from 'react';


const EditarNota = ({ notas, handleClose }) => {
 
  const [item, setItem] = useState({});

  useEffect(() => {
    if (notas) {
        setItem({
          id_usuario:  notas.id_usuario,
          id_materia: notas.id_materia,
          descripcion : notas.descripcion,
          valor : notas.valor 
        });
    }
}
, [notas]);
 


  const handleInputChangeNota = (e) => {
    const { name, value } = e.target;

    if (value >= 0 && value <= 10) {
      setItem({
        ...item,
        [name]: value,
      });
    } else {
     alert('El valor debe estar entre 1 y 10')
      console.error('El valor debe estar entre 1 y 10');
    }
    
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    
      setItem({
        ...item,
        [name]: value,
      });
   
    
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/nota",
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'authorization': sessionStorage.getItem('token')
    },
    body: JSON.stringify(item),
  
  })
  .then((response) => {
    if (response.ok) {
        console.log('Elemento actualizado con éxito');
    handleClose()
  

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


      <div className="container mt-5">
       <div className='container text-center'><h3>Editar Nota</h3></div> 
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
                  value={item.descripcion}
                  onChange={handleInputChange}
                  required
                
                />
              </div> <br></br>
              <div className="form-group">
                <label htmlFor="valor"><h4>Nota</h4></label>
                <input

                  type="float"
                  id="valor"
                  name='valor'
                  className="form-control"
                  value={item.valor}
                  onChange={handleInputChangeNota}
                 required
                />
              </div>
              <br></br>
              <button type="submit" className="btn btn-primary">Editar</button>
            </form>
          </div>
        </div>
      </div></>
  );
  }

export default EditarNota      