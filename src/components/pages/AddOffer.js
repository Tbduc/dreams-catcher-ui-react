import React, { useEffect, useState } from 'react'
import OfferService from '../../services/OfferService';
import FileUploader from '../sections/FileUploader';
import AuthService from "../../services/AuthService";
import Navbar from '../sections/Navbar';
import "../../styles/global.css"
import { useParams } from 'react-router-dom'

const AddOffer = () => {

    const currentUser = AuthService.getCurrentUser();
    const { id } = useParams();
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState(null);
    const [offer, setOffer] = useState({
        type: "",
        title: "",
        description: "",
        price: "",
        date: "",
        imageName: {selectedFileName},
        userId: currentUser.id
    })


    const handleChange = (e) => {
        const value = e.target.value;
        setOffer({...offer, [e.target.name]:value})
    }
    
    const handleFileChange = (e) => {
        setSelectedFile(e);
        setSelectedFileName(e.name);
        setOffer((prevState) => {
          return {...prevState, imageName: e.name};
        });
      };

    const [data, setData] = useState()
    const message = offer.title + " was successfully created."

    const saveOffer = (e) => {
        e.preventDefault();
        console.log(offer)
        console.log(selectedFile)
        OfferService.saveOffer(offer, selectedFile)
        .then((response) => {
            setData(response)
        })
        .catch((error) => {
            console.log(error);
        })
        .then(() => {
            OfferService.uploadFile(selectedFile)
        })
        .then(async() => {
            await delay(5000)
            refreshPage()
        })
    }

    const resetForm = () => {
        // 👇️ clear input value
        refreshPage()
    };

    function refreshPage() {
        window.location.reload(false);
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));

    useEffect(() => {
        console.log(offer)
    }, [offer])

    return (
        <div>
    <Navbar />
        <div className='flex max-w-2xl mx-auto shadow border-b pb-2 text-center mt-5 mb-5'>
        
        {<div className='p-2'>
            <div className='font-thin text-2xl tracking-wider mt-5 mb-2'>
                <h1 className='header'>Add offer</h1>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <label className='d-block'>Offer Title</label>
                <input type="text" className='dream-title-text h-10 border mt-2 px-2 py-2' name="title" value={offer.title} onChange={(e) => handleChange(e)} required />
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <label className='d-block'>Offer Description</label>
                <textarea type="text" className='dream-desc-text h-10 border mt-2 px-2 py-2' name="description" value={offer.description} onChange={(e) => handleChange(e)} required />
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
            <label className='d-block'>Offer Type</label>
            <select name="type" value={offer.type} onChange={(e) => handleChange(e)} required>
                <option value="">--Select--</option>
                <option value="PRIVATE_LESSON">Private Lesson</option>
                <option value="ONLINE_COURSE">Online Course</option>
                <option value="WEBINAR">Webinar</option>
                <option value="CONSULTATION">Consultation</option>
                <option value="EBOOK">Ebook</option>
            </select>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <label className='d-block'>Offer Price</label>
                <div class="offer-price">
                    <input type="number" min="0" placeholder='0' className='h-10 border mt-2 px-3 py-2' name="price" value={offer.price} onChange={(e) => handleChange(e)} required />
                </div>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <label className='d-block'>Offer Date</label>
                <input type="date" name="date" value={offer.date} onChange={(e) => handleChange(e)} required />
            </div>
            <FileUploader onFileSelectSuccess={(file) => handleFileChange(file)}
          onFileSelectError={({ error }) => alert(error)} />
            <div className='items-center justify-center h-14 w-full my-4'>
                <button onClick={saveOffer} className='btn btn-primary mb-3'>Add</button>
                <button onClick={resetForm} className='btn btn-danger mb-3 ms-1'>Clear</button>
            </div>
        </div>}
        {data && (
        <div className='form-group m-1'>
            <div
            className={data ? 'alert alert-success' : 'alert alert-danger'}
            role='alert'
            >
            {message}
            </div>
        </div>
        )
        }
        </div>
        </div>
    )
}

export default AddOffer