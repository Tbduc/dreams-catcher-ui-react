import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageService from "../../services/ImageService";
import "../../styles/offer-details.css"
import defaultPhoto from '../../assets/images/Default.jpeg';
import Navbar from "../sections/Navbar";
import likePhoto from '../../assets/images/like.jpeg';
import dislikePhoto from '../../assets/images/dislike.jpeg';



function OfferDetails() {
    const { id } = useParams();
    const url = `https://localhost:8080/api/v1/offers/${id}`;
    const [offer, setOffer] = useState(null);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    useEffect(() => {
        fetchData();
    }, [id]);
    
    const fetchData = async () => {
        await fetch(url)
        .then(response => response.json())
        .then(data => setOffer(data));
    };


    if (!offer) {
        return <div>Loading...</div>;
    }

    const handleLikeDislikeOffer = () => {
        if (liked) {
        handleDislikeOffer();
        setLiked(false);
        setDisliked(true);
        } else if (disliked) {
        handleLikeOffer();
        setLiked(true);
        setDisliked(false);
        } else {
        handleLikeOffer();
        setLiked(true);
        }
    }

    const handleLikeOffer = async () => {
        try {
            await fetch(`${url}/like`, { method: 'PUT' });
            setLiked(true);
            setOffer({ ...offer, likes: offer.likes + 1 });
        } catch (error) {
            console.log("error", error);
        }
    }

    const handleDislikeOffer = async () => {
        try {
            await fetch(`${url}/dislike`, { method: 'PUT' });
            setDisliked(true);
            setOffer({ ...offer, likes: offer.likes - 1 });
        } catch (error) {
            console.log("error", error);
        }
    }

  return(
    <div>
     <Navbar/><br/>
    <div className="h-100 gradient-custom-2">
        <div className="container py-5 h-100">
            <div className="row">
                <div className="col col-lg-9 col-xl-7">
                    <div className="card">
                    <h1 className="title">{offer.title}</h1>
                        <div className="rounded-top text-white d-flex flex-row">
                            <div className="mt-5 d-flex flex-column text-dark align-items-center">
                            { offer.image ? (
                            <ImageService data={offer} className="dream-image" />
                            ) : (
                            <img
                                src={defaultPhoto}
                                alt="dream"
                                className="dream-image"
                            />
                            )}
                                <p>Type: {offer.type}</p>
                                <p>{offer.description}</p>
                                <p className="fw-light">Starting date: {offer.date}</p>
                            </div>
                        </div>
                        <div className="p-4 text-black">
                            <div className="d-flex justify-content-center text-center py-1">
                                     <div>
                                        <p className="mb-1 h5">{offer.likes}</p>
                                        <p className="small text-muted mb-0">Likes</p>
                                    </div>
                                    <div className="px-3">
                                        { offer.comments && <p className="mb-1 h5">{Object.keys(offer.comments).length}</p> }
                                        <p className="small text-muted mb-0">Comments</p>
                                    </div>
                                    <div>
                                        <p className="mb-1 h5">{offer.views}</p>
                                        <p className="small text-muted mb-0">Views</p>
                                    </div>
                         
                            </div>
                        </div>
                        <div className="card-body p-4 text-black">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <p className="lead fw-normal mb-0">Price: {offer.price}$</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center text-center py-1 mb-4">
                                <button id="like-dislike" style={{backgroundImage: `url(${liked ? dislikePhoto : disliked ? likePhoto : likePhoto})`, width: '90px', height: '90px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', border: 'none'}} onClick={handleLikeDislikeOffer}>
                                </button>                                
                        </div><br/>
                        <button className="Button">BUY NOW!</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
)


}

export default OfferDetails;
