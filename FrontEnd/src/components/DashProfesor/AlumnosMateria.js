import React from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../useFetch';

const AlumnosMateria = ({  idMateria }) => {
 
  const id_materia = idMateria;


  const { data: alumnos} = useFetch(`http://localhost:8080/api/materia/alumnos-materias/${id_materia}`);

 
 

  return (

<>

    <br></br>
    <div className='container align-items-center'>
    <table className="table table-striped-columns">
      <thead>
        <tr>
          <th scope="col">Alumnos</th>
        </tr>
      </thead>
      <tbody>
        {alumnos.map(nota => (
          <tr key={nota.id_usuario}>
            <td>{nota.apellido} {nota.nombre}</td>
            <td>
              <div className="btn-group" role="group" aria-label="Basic example">
                <Link to={`/dashboard/crearNota/${nota.id_materia}/${nota.id_usuario}/${nota.apellido}`} className="btn btn-dark">Crear Nota</Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
 </> );
};

export default AlumnosMateria;
