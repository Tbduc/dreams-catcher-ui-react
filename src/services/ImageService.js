import { useState, useEffect } from "react";
import defaultPhoto from '../assets/images/Default.jpeg';
import { LazyLoadImage } from "react-lazy-load-image-component";

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
        <div>
            { image
            && <img src={`data:image/png;base64,${image}`}
            alt="first" className="rounded-3 img-fluid w-100" />
            }
        </div>
    )
}

export default ImageService