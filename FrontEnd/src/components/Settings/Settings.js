import EditUserAlumno from '../formEditar/formEditarUserAlumno';
import CustomAvatar from '../menu/Avatar';
import DataUser from '../datosUser';
import { TbPhotoEdit } from "react-icons/tb";
import Dropdown from 'react-bootstrap/Dropdown'
import './styles.css';
import React, { useState, useEffect } from 'react';



const Settings = () => {


    const { data: user } = DataUser();
    const avatar = user.id_usuario;
   


      const [item, setItem] = useState({
   
        imagen: null,
      });
      
    
      useEffect(() => {
        if (user) {
          setItem({
         
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
      
        formData.append('imagen', item.imagen);
    
        fetch(`http://localhost:8080/api/usuarios/editarFoto/${user.id_usuario}`, {
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
            {/* <div className='wrapper'>
                {user.imagen ? (
                    <div className='avatar image'>
                        <img
                            src={`http://localhost:8080/upload/${user.imagen}`}
                            alt=""
                            className='background rounded-circle'
                        />

                        <Dropdown className='content avatar'>
                            <Dropdown.Toggle variant='transparent' id="dropdown-basic">
                                <TbPhotoEdit />
                                <span> Edit</span>
                            </Dropdown.Toggle>
                          
                            <Dropdown.Menu>
                            
                                    <form onSubmit={handleSubmit}>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        onChange={handleInputChange}
                                        style={{ display: 'block' }}
                                    />
                                     <button type="submit" className="btn btn-primary">
                Editar
              </button>
                         </form>
                              
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                ) : (
                    <div className='wrapper'>
                        <CustomAvatar
                            avatar={avatar}
                            colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
                        />
                        <div className='content avatar'>
                            <TbPhotoEdit />
                           
                        </div>
                    </div>
                )}
            </div> */}
            <div className='container'>
            </div>
            <EditUserAlumno/>
        </>
    );
};

export default Settings;
