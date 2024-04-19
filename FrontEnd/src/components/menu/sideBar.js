// En tu archivo SideBar.js
import React, { useState } from "react";
import "./sideBar.css";
import DataUser from "../datosUser";
import { FaUsersGear, FaBook, FaPeopleRoof, FaBars, FaCalendarDays  } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import Logout from "../Login/LogOut";
import { MdAssignment, MdManageAccounts } from "react-icons/md";
import CustomAvatar from "../menu/Avatar";


const SideBar = ({ handleUsuario, handleMateria, handleCurso, handleWelcome, handleCalificaciones, handleCalendar, avatar, handleSettings }) => {
  const { data } = DataUser();
  let rol = data.id_rol;

  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(true);

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };

  if (rol === 1) {
    const menuItems = [
      {
        icono: <FaHome />,
        text: "Dashboard",
        id: "dash", // Agrega el ID de la sección correspondiente
      },
      {
        icono: <FaUsersGear />,
        text: "Usuarios",
        id: "usuarios", // Agrega el ID de la sección correspondiente
      },
      {
        icono: <FaBook />,
        text: "Materias",
        id: "materias", // Agrega el ID de la sección correspondiente
      },
      {
        icono: <FaPeopleRoof />,
        text: "Cursos",
        id: "cursos", // Agrega el ID de la sección correspondiente
      },
      {
      icono: <MdManageAccounts />,
      text: "Settings",
      id: "settings",
    },

     
    ];

    return (
      <>
        <div
          className="bars"
          style={expanded ? { left: "60%" } : { left: "5%" }}
          onClick={() => setExpanded(!expanded)}
        >
         <FaBars/>
        </div>
        <div
          className="sidebar"
          variants={sidebarVariants}
          animate={window.innerWidth <= 768 ? `${expanded}` : ""}
        >
          <div
  className={`avatar `}
  onClick={() => {
    handleSettings()
    setSelected(menuItems.findIndex(item => item.id === 'settings')); // Establece el índice activo
  }}
>
             
             {data.imagen ? (
        <img 
            src={`http://localhost:8080/upload/${data.imagen}`}
            alt=""
            className='background rounded-circle'
        />
    ) : (
          
        <CustomAvatar
            avatar={avatar}
            colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
        />
      
    )}
              <span>Administrador</span>
            
</div>
          <div className="menu">
         
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={`menuItem ${selected === index ? "active-menu" : ""}`}
                onClick={() => {
                  setSelected(index);
                  if (item.id === "usuarios") {
                    handleUsuario(); 
                  } else if (item.id === "materias") {
                    handleMateria(); 
                  } else if (item.id === "cursos") {
                    handleCurso(); 
                  }
                  else if (item.id === "dash") {
                    handleWelcome(); 
                  }
                  else if (item.id === "settings") {
                    handleSettings(); 
                  }
                }}
              >
                <div className="icons">{item.icono}</div>
                <span>{item.text}</span>
              </button>
            ))}
            
          </div>
          <Logout className="logout" />
        </div>
      </>
    );
  } else if (rol === 2) {
    const menuItems = [
      {
        icono: <FaHome />,
        text: "Dashboard",
        id: "dash",
      },
      {
        icono: <MdAssignment />,
        text: "Calificaciones",
        id: "calificaciones",
      },
      {
        icono: <FaCalendarDays />,
        text: "Calendario",
        id: "calendar", // Agrega el ID de la sección correspondiente
      },
      {
        icono: <MdManageAccounts />,
        text: "Settings",
        id: "settings",
      },
  
     
    ];
    return (
      <>
      
        <div
          className="bars"
          style={expanded ? { left: "60%" } : { left: "5%" }}
          onClick={() => setExpanded(!expanded)}
        >
         <FaBars/>
        </div>
        
        <div
          className="sidebar"
          variants={sidebarVariants}
          animate={window.innerWidth <= 768 ? `${expanded}` : ""}
        >
           <br></br>
           <div
  className={`avatar `}
  onClick={() => {
    handleSettings()
    setSelected(menuItems.findIndex(item => item.id === 'settings')); // Establece el índice activo
  }}
>
             
             {data.imagen ? (
        <img 
            src={`http://localhost:8080/upload/${data.imagen}`}
            alt=""
            className='background rounded-circle'
        />
    ) : (
          
        <CustomAvatar
            avatar={avatar}
            colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
        />
      
    )}
              <span>Alumno</span>
            
</div>
           
          <div className="menu">
          <br></br>
            {menuItems.map((item, index) => (
              
              <button
                key={index}
                className={`menuItem ${selected === index ? "active-menu" : ""}`}
                onClick={() => {
                  setSelected(index);
                  if (item.id === "calificaciones") {
                    handleCalificaciones(); 
                  } else if (item.id === "calendar") {
                    handleCalendar(); 
                  }
                  else if (item.id === "dash") {
                    handleWelcome(); 
                  }
                  else if (item.id === "settings") {
                    handleSettings(); 
                  }
                }}
              >
                <div className="icons">{item.icono}</div>
                <span>{item.text}</span>
              </button>
            ))}
            
          </div>
         
          <Logout className="logout" />
          
          
        </div>
      </>
    )
  } else if (rol === 3) {
    const menuItems = [
      {
        icono: <FaHome />,
        text: "Dashboaard",
        id: "dash",
      },
      {
        icono: <FaBook />,
        text: "Materias",
        id: "materias", // Agrega el ID de la sección correspondiente
      },
      {
        icono: <MdAssignment />,
        text: "Calificaciones",
        id: "calificaciones",
      },
      {
        icono: <FaCalendarDays />,
        text: "Calendario",
        id: "calendar", // Agrega el ID de la sección correspondiente
      },
      {
        icono: <MdManageAccounts />,
        text: "Settings",
        id: "settings",
      },
     
    ];
    return (
      <>
        <div
          className="bars"
          style={expanded ? { left: "60%" } : { left: "5%" }}
          onClick={() => setExpanded(!expanded)}
        >
         <FaBars/>
        </div>
        <div
          className="sidebar"
          variants={sidebarVariants}
          animate={window.innerWidth <= 768 ? `${expanded}` : ""}
        >
             <div className="avatar " >
             {data.imagen ? (
        <img 
            src={`http://localhost:8080/upload/${data.imagen}`}
            alt=""
            className='background rounded-circle'
        />
    ) : (
        <CustomAvatar 
            avatar={avatar}
            colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
        />
    )}
              <span>Profesor</span>
            </div>
          <div className="menu">
         
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={`menuItem ${selected === index ? "active-menu" : ""}`}
                onClick={() => {
                  setSelected(index);
                  if (item.id === "calificaciones") {
                    handleCalificaciones(); 
                  } else if (item.id === "calendar") {
                    handleCalendar(); 
                  }
                  else if (item.id === "dash") {
                    handleWelcome(); 
                  }
                  else if (item.id === "settings") {
                    handleSettings(); 
                  }
                }}
              >
                <div className="icons">{item.icono}</div>
                <span>{item.text}</span>
              </button>
            ))}
            
          </div>
         
          <Logout className="logout" />
          
          
        </div>
      </>
    )
  }
};

export default SideBar;
