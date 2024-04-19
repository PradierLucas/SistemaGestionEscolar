import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Log.css';

function Logout() {
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const navigate = useNavigate();

    function logout() {
        sessionStorage.removeItem('token');
        navigate('/')
    }

    return (
        <div className='logout'>
            <FaSignOutAlt onClick={handleShow} className="logout-icon" />
            <button onClick={handleShow} className="logout-text">Logout</button>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Body>
                    <h4>Seguro quiere cerrar sesión?</h4>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Cancelar
                    </button>
                    <button className="btn btn-danger" onClick={logout}>
                        Cerrar Sesión
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Logout;
