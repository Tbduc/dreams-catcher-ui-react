import React, {useState, useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import "../../styles/ImageUpload.css"

const FileUploader = ({onFileSelectError, onFileSelectSuccess}) => {
    const fileInput = useRef(null)

    const [image, setImage] = useState({ preview: ""});


    const handleFileInput = (e) => {
        // handle validations
        const file = e.target.files[0];
        if (file.size > 1048576) {
            onFileSelectError({ error: "File size cannot exceed more than 1MB" });
        }
        else {
            fileInput.current && fileInput.current.click()
            onFileSelectSuccess(file);
            setImage({
                preview: URL.createObjectURL(e.target.files[0])
            });
        }
      };

    return (
        <div className="mb-3">
            <label htmlFor="upload-button">
                {image.preview ? (
                    <img src={image.preview} alt="preview" className="mt-3 w-25 rounded" />
                    ) : (
                    <>
                        <FontAwesomeIcon className="mt-3 h1 fa-image" icon={faImage} />
                        <p>Upload image</p>
                    </>
                )}
            </label>
            <input
                name="image"
                type="file"
                id="upload-button"
                style={{ display: "none" }}
                onChange={handleFileInput}
            />
        </div>
    )
}

export default FileUploader