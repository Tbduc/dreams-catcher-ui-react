import { useState, useEffect } from "react";
import defaultPhoto from '../assets/images/profile.jpeg';
import Tooltip from "../common/Tooltip";
import "../styles/global.css";

const AvatarService = (props) => {

    const [image, setImage] = useState("")

    useEffect(() => {

        const fetchImageData = () => {
            console.log(props.data)
            try {
                if (props?.data)
                    fetch(`https://localhost:8080/api/v1/users/avatar/${props.data}`)
                    .then(response =>
                        response.text()
                    ).then((actualData) =>
                        setImage(actualData)
                    )
            } catch (error) {
            console.log("error", error);
            }
        };

        fetchImageData()

    }, [props?.data]);
    return (
        <div className="g-2">
            { props.tooltip ? (
                <Tooltip content="Upload new profile picture" direction="right">
                    <div className="mb-2">
                        { image
                        ? <img src={`data:image/png;base64,${image}`}
                        alt="first" className="avatar rounded-circle" />
                        : <img src={defaultPhoto}
                        alt="first" className="avatar rounded-circle" />
                        }
                    </div>
                </Tooltip>
                )
                :
                ( props.small ? 
                    (
                        <div className="mb-2">
                            { image
                            ? <img src={`data:image/png;base64,${image}`}
                            alt="first" className="avatar rounded-circle width-10" />
                            : <img src={defaultPhoto}
                            alt="first" className="avatar rounded-circle width-10" />
                            }
                        </div>
                    ) :
                    (
                        <div className="mb-2">
                            { image
                            ? <img src={`data:image/png;base64,${image}`}
                            alt="first" className="avatar rounded-circle" />
                            : <img src={defaultPhoto}
                            alt="first" className="avatar rounded-circle" />
                            }
                        </div>
                    )
                )
            }
        </div>
    )
}

export default AvatarService