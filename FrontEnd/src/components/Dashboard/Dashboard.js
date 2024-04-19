
import './Dashboard.css';
import DashboardAlumno from '../DashboardAlumno/DashboardAlumno';
import DashProfesor from '../DashProfesor/DashProfesor';
import Header from '../Header/header';
import TablaUsuarios from '../Tablas/TablaUsuarios';
import Footer from '../footer/footer';
import TablaMaterias from '../Tablas/TablaMaterias';
import TablaCursos from '../Tablas/TablaCursos';
import DataUser from '../datosUser';
import { useState } from 'react';


const DashboardUser = () => {



  //Obtenemos la informacion del usuario a traves del token
  const { data } = DataUser()

const [usuario,setusuario] = useState(false)
const [materia,setMateria] = useState(false)
const [curso,setCurso] = useState(false)

const handleUsuario = () => {
  setusuario(true);
  setMateria(false);
  setCurso(false);

}; 
const handleMateria = () => {
  setMateria(true);
  setusuario(false);
setCurso(false)
};
const handleCurso = () => {
  setCurso(true);
  setMateria(false);
  setusuario(false);

};
  let rol = data.id_rol

  console.log('Rol:', rol);

  const userName = [data.nombre, " ", data.apellido];

  if (rol === 1  ) {

    return (
      <>
        <Header></Header>

        <br></br>
        <div className='row'>
          <div className='col'>
            <div className='image-container'>
              <img
                src={`http://localhost:8080/upload/${data.imagen}`}
                alt=""
                className='background rounded-circle'
              />
            </div>
          </div>
          <div className='col'>
            <h3>Bienvenid@ {userName} !</h3>
          </div>
        </div>


        <br></br>
        <div className='container text-center '>
          <h3>Seleccione que desea administrar</h3>
          <br></br>
          <div className='row justify-content-center align-items-center g-2'>
            <div className='col'>
              <button onClick={handleUsuario}>Usuario</button>
            </div>
            <div className='col'>
              <button onClick={handleMateria}>Materias</button>
            </div>
            <div className='col'>
              <button onClick={handleCurso}>Curso</button>
            </div>
          </div>
        </div>

        <div className='titulo'></div>
        <br></br>
        <div className='container '>
          {usuario && (
            <div className='container' id='usuarios'>
              <TablaUsuarios />
            </div>
          )}
          {materia && (
            <div className='container' id='materias'>
              <TablaMaterias />
            </div>
          )}
          {curso && (
            <div className='container' id='cursos'>
              <TablaCursos />
            </div>
          )}
        </div>






        <Footer></Footer>



      </>
    );
  }
  else if (rol === 2) {
    return (
      <>
        <Header></Header>
        <br></br>
        <div className='row'>
          <div className='col'>
            <div className='image-container'>
              <img
                src={`http://localhost:8080/upload/${data.imagen}`}
                alt=""
                className='background rounded-circle'
              />
            </div>
          </div>
          <div className='col'>
            <h3>Bienvenid@ {userName} !</h3>
          </div>
        </div>


        <br></br>


        <DashboardAlumno></DashboardAlumno>




        <Footer></Footer>



      </>
    );

  }
  else if (rol === 3) {
    return (
      <>
        <Header></Header>

        <br></br>
        <div className='row'>
          <div className='col'>
            <div className='image-container'>
              <img
                src={`http://localhost:8080/upload/${data.imagen}`}
                alt=""
                className='background rounded-circle'
              />
            </div>
          </div>
          <div className='col'>
            <h3>Bienvenid@ {userName} !</h3>
          </div>
        </div>


        <br></br>


        <DashProfesor></DashProfesor>



        <Footer></Footer>

      
      </>
    );
  } else { return ("Usuario incorrecto") }
}





export default DashboardUser;
