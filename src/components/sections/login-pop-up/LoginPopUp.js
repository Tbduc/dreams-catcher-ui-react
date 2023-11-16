import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import GoogleLogin from "../../user-oauth2/login/GoogleLogin";
import { Link } from "react-router-dom";
import CurrentTimeService from "../../../services/CurrentTimeService";

const LoginPopUp = (props) => {

    const [open, setOpen] = useState(false);
    const now = new Date();
    const nowObjectMillis = Number(now.getTime());
    const timeShow = Number(localStorage.getItem("timeShow"));

    console.log(nowObjectMillis)

    const handleClose = () => {
        setOpen(false)
        CurrentTimeService()
    }

    useEffect(() => {
        if (timeShow + 100000 <= nowObjectMillis) {
            setOpen(true)
            localStorage.setItem("timeShow", nowObjectMillis)
        }
    })


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
                <Modal.Body>
                    <Row className="mx-auto">
                        <Col lg="4 ms-5">
                            <Button variant="secondary" onClick={handleClose} className="mb-10">
                                <Link to={'/login'} className="text-light text-decoration-none">Sign In</Link>
                            </Button>
                        </Col>
                        <Col lg="4">
                            <Button variant="primary" onClick={handleClose}>
                                <Link to={'/register'} className="text-light text-decoration-none">Sign Up</Link>
                            </Button>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Row className="m-auto">
                        <GoogleLogin />
                    </Row>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default LoginPopUp