import { useEffect, useState } from 'react'
import "../../styles/global.css"

function TagsInput({setTagsData}){
    const [input, setInput] = useState('');
    const [tags, setTags] = useState([])

    const onChange = (e) => {
        const { value } = e.target;
        setInput(value);
    };

    function handleKeyDown(e){
        const trimmedInput = input.trim();
        if(e.key !== 'Enter') return
        if(trimmedInput.length && !tags.includes(trimmedInput)) {
            e.preventDefault()
            setTags(prevState => [...prevState, trimmedInput])
            setInput('')
        }
    }

    function removeTag(index){
        setTags(tags.filter((el, i) => i !== index))
    }

    useEffect(() => {
        setTagsData(tags)
        console.log(tags)
    }, [tags])

    return (
        <div className='items-center'>
            <label className='mt-1 mb-2'>Enter hashtags for this Dream:</label>
            <div className="tags-input-container">
                { tags.map((tag, index) => (
                    <div className="tag-item" key={index}>
                        <span className="text">{tag}</span>
                        <span className="close" onClick={() => removeTag(index)}>&times;</span>
                    </div>
                ))
                }
                <input onKeyDown={handleKeyDown} value={input} onChange={onChange} type="text" name="hashtags" className="tags-input" placeholder="Type something" />
            </div>
        </div>
    )
}

export default TagsInput