import React from 'react';
import { Link } from 'react-router-dom';

const AddDreamButton = () => {
    return (
      <Link to="/add-dream" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', position: 'fixed', bottom: '50px', right: '50px' }}>
        <button 
          style={{
            backgroundColor: 'black',
            borderRadius: '50%',
            color: 'white',
            width: '80px',
            height: '80px',
            border: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '28px',
            fontWeight: 'bold',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)'
          }}
        >
          +
        </button>
      </Link>
    );
  }
  
export default AddDreamButton;
