import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import FormCrearUsuario from '../formCrear/formCrearUsuario';
import FormEditarUsuario from '../formEditar/formEditarUser';



const TablaUsuarios = () => {



  const [data, setData] = useState([]);

  
  const [paginaActual, setPaginaActual] = useState(1);

  //iniciar cantidad de datos por página
  const ITEMS_PER_PAGE = 5;

  
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  

  const [usuarioAEliminar, setUsuarioAEliminar] = useState();
  const [showModalDelUser, setShowModalDelUser] = useState(false);
  const handleCloseDelUser = () => { setShowModalDelUser(false) }
  const handleShowDelUser = (id) => {
    setUsuarioAEliminar(id);
    setShowModalDelUser(true);
  };

  const handleSubmit = () => {
    fetch(`http://localhost:8080/api/usuarios/${usuarioAEliminar}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': sessionStorage.getItem('token')
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('Elemento eliminado con éxito');
          handleClose()

        } else {
          console.error('Error al eliminar el usuario');
          alert('Para eliminar el profesor primero debe borrar todos los datos relacionados al mismo.');
        }
      })
      .catch((error) => {
        console.error('Error de red:', error);
      });

  }

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedData = () => {
    if (!sortColumn) {
      return data;
    }

    const comparator = (a, b) => {
      const valueA = a[sortColumn].toLowerCase();  // Convert to lowercase
  const valueB = b[sortColumn].toLowerCase(); 

      if (valueA < valueB) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    };

    return [...data].sort(comparator);
  };

  const filteredData = sortedData().filter((item) => {
    const apellido = item.apellido;
    const apellidoLowerCase = apellido.toLowerCase();
    const apellidosSeparados = apellidoLowerCase.split(' ');
    return apellidosSeparados.some((part) => part.startsWith(searchTerm.toLowerCase()));
  });

  const paginatedData = filteredData.slice(
    (paginaActual - 1) * ITEMS_PER_PAGE,
    paginaActual * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setPaginaActual(pageNumber);
  };

  const handlePreviousPage = () => {
    setPaginaActual((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPaginaActual((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const getSortIndicator = (column) => {
    if (column === sortColumn) {
      return sortOrder === 'asc' ? '↑' : '↓';
    }else {return '↑↓'}
    
  };

  //Modal Crear Usuario
  const [showModalCreate, setShowModalCreate] = useState(false);
  const handleShowCreate = () => setShowModalCreate(true);

  //Modal Editar Usuario
  const [usuarioAEditar, setUsuarioAEditar] = useState(null); // Nuevo estado
  const [showModalEdit, setShowModalEdit] = useState(false);

  const handleShowEdit = (id) => {
    const usuarioParaEditar = data.find((usuario) => usuario.id_usuario === id);
    if (usuarioParaEditar) {
      setUsuarioAEditar(usuarioParaEditar);
      setShowModalEdit(true);
    }
  };

  const handleClose = () => {
    setShowModalCreate(false);
    setShowModalEdit(false);
    setShowModalDelUser(false);

  };

  useEffect(() => {

    // Opciones personalizadas para el fetch
    const requestOptions = {
      method: 'GET', // Método GET
      headers: {
        'Content-Type': 'application/json',
        'authorization': sessionStorage.getItem('token')
      }

    };


    fetch("http://localhost:8080/api/usuarios", requestOptions)
      .then(response => response.json())
      .then(data => setData(data))
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('Request aborted');
        } else {

        }
      })

  }, [showModalDelUser, showModalCreate, showModalEdit]);


  return (
    <>
      <div className="container">
        <div className="row justify-content-center align-items-center g-2">
          <h3>Administracion de Usuarios</h3>
          <div className="col-2 ">  <button onClick={handleShowCreate} className="btn btn-dark">
            Agregar Usuario
          </button></div>
          <div className="col-4 offset-4">
            <div className="input-group mb-3">
              <input
                className="form-control"
                type="text"
                placeholder="Buscar por Apellido"
                onChange={handleSearch}
                value={searchTerm}
              />
              <span className="btn btn-dark">Buscar</span>
            </div>
          </div>
        </div>

        <br></br>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
            
             
            <th> <button className='btn-dark btn' onClick={() => handleSort('nombre')}>Nombre {getSortIndicator('nombre')}</button> </th>
            <th> <button className='btn-dark btn' onClick={() => handleSort('apellido')}>Apellido {getSortIndicator('apellido')}</button></th>
            <th><button className='btn-dark btn' onClick={() => handleSort('dni')}>Dni {getSortIndicator('dni')}</button></th>
            <th>  <button className='btn-dark btn' onClick={() => handleSort('email')}>Email {getSortIndicator('email')}</button></th>
            <th>  <button className='btn-dark btn' onClick={() => handleSort('rol')}>Rol {getSortIndicator('rol')}</button></th>
           
            
          
          
          

            </tr>
          </thead>
          <tbody>
            {paginatedData.map((USUARIO, index) => (
              <tr key={index}>
                
                <td>{USUARIO.nombre}</td>
                <td>{USUARIO.apellido}</td>
                <td>{USUARIO.dni}</td>
                <td>{USUARIO.email}</td>
                <td>{USUARIO.rol}</td>
                <td>


                  
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" onClick={() => handleShowEdit(USUARIO.id_usuario)} className="btn btn-dark">Editar</button>

                    <button onClick={() => handleShowDelUser(USUARIO.id_usuario)} type="button" className="btn btn-dark">Borrar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>

        <nav aria-label="Page navigation">
  <ul className="pagination justify-content-center">
    <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
      <button className="page-link" onClick={handlePreviousPage}>
        Previous
      </button>
    </li>
    {Array.from({ length: totalPages }, (_, index) => (
      <li
        key={index}
        className={`page-item ${paginaActual === index + 1 ? 'active' : ''}`}
      >
        <button
          className="page-link"
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      </li>
    ))}
    <li className={`page-item ${paginaActual === totalPages ? 'disabled' : ''}`}>
      <button className="page-link" onClick={handleNextPage}>
        Next
      </button>
    </li>
  </ul>
</nav>


        <Modal show={showModalEdit || showModalCreate} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{showModalEdit ? 'Editar Usuario' : 'Crear Usuario'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {showModalEdit ? <FormEditarUsuario user={usuarioAEditar} handleClose={handleClose} /> : <FormCrearUsuario handleClose={handleClose} />}
          </Modal.Body>
        </Modal>

        <Modal show={showModalDelUser} onHide={handleCloseDelUser}>

          <Modal.Body >


            <div className='container  text-center '>
              <strong>¿Está seguro que desea eliminar este usuario?</strong>
              <div className='row  '>
                <div className='col'> <button onClick={handleSubmit} className="btn btn-danger">Eliminar</button></div>
                <div className='col offset-1'> <button className="btn btn-dark" variant="secondary" onClick={handleCloseDelUser}>
                  Cancelar
                </button></div>
              </div>
            </div>
          </Modal.Body>

        </Modal>

      </div></>
  );
}

export default TablaUsuarios;
