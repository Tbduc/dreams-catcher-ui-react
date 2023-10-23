import { useState, useEffect } from "react";
import defaultPhoto from '../assets/images/Default.jpeg';

const ImageService = (props) => {

    const [image, setImage] = useState("")

    useEffect(() => {
        const fetchImageData = async () => {
            try {
                if (props?.data?.image)
                    await fetch(`http://localhost:8080/api/v1/image/display/${props.data.image}`)
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

    }, [props?.data?.image?.id]);

    return (
        <div className="row g-2">
            <div className="col mb-2">
                { image
                ? <img src={`data:image/png;base64,${image}`}
                alt="first" className="w-100 rounded-3" />
                : <img src={defaultPhoto}
                alt="first" className="w-100 rounded-3" />
                }
            </div>
        </div>
    )
}

export default ImageService