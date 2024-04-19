import React, { useEffect, useState } from 'react';
import DataUser from '../datosUser';

const DashboardAlumno = () => {
  const { data } = DataUser();
  const [id_user, setIdUser] = useState(null); // Inicialización con null o algún valor predeterminado
  const [loading, setLoading] = useState(true); // Estado para indicar si se está cargando
  const [nota, setNota] = useState([]);

  useEffect(() => {
    const userId = data.id_usuario; // Obtener el ID del usuario

    if (userId) {
      setIdUser(userId);
      setLoading(false); // Ya se tiene el ID del usuario, dejar de mostrar el indicador de carga
    }
  }, [data]);

  useEffect(() => {
    if (id_user !== null) {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.log('Token de acceso no encontrado');
        return; // Si no hay token, detener la solicitud
      }
  
      let parametros = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': sessionStorage.getItem('token')
        }
      };
  
      fetch(`http://localhost:8080/api/nota/alumno/${id_user}`, parametros)
        .then(res => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json()
            .then(body => {
              setNota(body);
            });
        })
        .catch(error => {
          console.log('Fetch error:', error);
        });
    }
  }, [id_user]);
  

  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = nota.filter((item) =>
    item.nombre[0].toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const promedioColumna = filteredData.map(datos => {
  //   // Filtrar las notas no nulas ni 0
  //   const notasValidas = [datos.periodo_1, datos.periodo_2, datos.periodo_3].filter(nota => nota !== 0 && nota !== null);

  //   // Calcular el promedio solo con las notas válidas
  //   const promedio = (notasValidas.reduce((total, nota) => total + nota, 0) / notasValidas.length).toFixed(2);

  //   return {
  //       materia: datos.nombre,
  //       nota1: datos.periodo_1,
  //       nota2: datos.periodo_2,
  //       nota3: datos.periodo_3,
  //       promedio: promedio
  //   };
  // });

  if (loading) {
    return <p>Cargando...</p>; // Mientras se obtiene el ID del usuario, muestra un indicador de carga
  }

  return (
    <>
      <hr />
      <div>
        <h2>CALIFICACIONES</h2>
        <p>Escriba el nombre de la materia que desea informarse</p>
        <div className="container col-6">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="text"
              placeholder="Materia"
              onChange={handleSearch}
              value={searchTerm}
            />
            <span className="btn btn-dark">Buscar</span>
          </form>
        </div>
        <br />
        <div className="container item">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Materia</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Nota</th>
           
              </tr>
            </thead>
            {filteredData.map(datos => (
              <tbody >
                <tr>
                  <td>{datos.nombre}</td>
                  <td>{datos.descripcion}</td>
                  <td>{datos.valor}</td>
                 
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        <br />
      </div>
    </>
  );
};

export default DashboardAlumno;
