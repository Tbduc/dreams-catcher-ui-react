import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Link } from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const LoginPopUp = (props) => {

    const [open, setOpen] = useState(props);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const modalElem = document.querySelector(".login-modal")
    console.log(props.user)

    return (
        !props.user &&
        <div className="container">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="login-modal text-center"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Login or Register
                </Typography>
                <Button variant="contained" color="error" className="mt-2"><Link to={'/login'} className="text-light text-decoration-none">Login page</Link></Button>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Login to DreamsCatcher or create a new account
                </Typography>
                </Box>

            </Modal>
        </div>
    );
}

export default LoginPopUp