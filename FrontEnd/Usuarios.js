import React from 'react';
import './Dashboard.css';
import SideBar from '../menu/sideBar';
import DataUser from '../datosUser';
import TablaUsuarios from '../Tablas/TablaUsuarios';
import Logout from '../Login/LogOut';
import { Link } from 'react-router-dom';
import { useState } from 'react';


const Usuarios =()=>{
 

    return(
        <div className='Dash'>
        <div className='DashGlass'>
        <SideBar />
            <div className='main container-fluid justify-content-center'>
            <TablaUsuarios/>
            </div>
            <div>
            <div className='log-out'>
                <div className='log-out-icon'>
                    <Logout/>
                </div>
            </div>
            </div>
        </div>
    </div>
    )
}

export default Usuarios;