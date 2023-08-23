import { useState, useEffect } from "react";
import defaultPhoto from '../assets/images/profile.jpeg';
import AuthService from "./AuthService";
import "../styles/global.css";

const CommentAvatarService = (props) => {

    const [image, setImage] = useState("")
    const [profile, setprofile] = useState("") 

    useEffect(() => {
        const fetchData = () => {
            try {
                fetch(`https://localhost:8080/api/v1/users/profile-auth/${props.data}`)
                .then(response =>
                    response.json()
                )
                .then((data) => {
                    console.log(data)
                    setprofile(data)
                }
                )
            } catch (error) {
                console.log("error", error);
            }
        };
        
        fetchData()

    }, [props?.data]);

    const fetchImageData = async () => {
        try { 
            await fetch(`https://localhost:8080/api/v1/users/avatar/${profile.profilePictureId}`)
            .then(response =>
                response.text()
            ).then((actualData) =>
                setImage(actualData)
            )
        } catch (error) {
            console.log("error", error);
        }
    };
    console.log(profile)
    if(profile.profilePictureId)
        fetchImageData()

    return (
        profile.profilePictureId ?
        (
            <div className="g-2">
                <div className="mb-2">
                    { image
                    ? <img src={`data:image/png;base64,${image}`}
                    alt="first" className="avatar rounded-circle width-10" />
                    : <img src={defaultPhoto}
                    alt="first" className="avatar rounded-circle width-10" />
                    }
                </div>
            </div>
        )
        : (
            <div className="g-2">
                <div className="mb-2">
                    { profile.profileImgUrl
                    ? <img src={`${profile.profileImgUrl}`}
                    alt="first" className="avatar rounded-circle width-10" />
                    : <img src={defaultPhoto}
                    alt="first" className="avatar rounded-circle width-10" />
                    }
                </div>
            </div>
        )
    )
}

export default CommentAvatarService