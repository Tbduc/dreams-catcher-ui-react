import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";

const LoginPopUp = (props) => {

    const [open, setOpen] = useState(props);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const modalElem = document.querySelector(".login-modal")
    console.log(props.user)

    return (
        !props.user &&
        <div className="container">
            <Modal show={open} onHide={handleClose} className="modal-login" 
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header closeButton>
                <Modal.Title>Sign In or Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>Login to DreamsCatcher or create a new account</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    <Link to={'/login'} className="text-light text-decoration-none">Sign In</Link>
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    <Link to={'/register'} className="text-light text-decoration-none">Sign Up</Link>
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default LoginPopUp