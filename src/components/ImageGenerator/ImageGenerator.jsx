import React, { useRef, useState } from 'react';
import default_image from '../Assets/default_image.svg';
import './ImageGenerator.css';

export default function ImageGenerator() {
    const [image_url, setImage_url] = useState(default_image);
    let inputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const imageGenerator = async () => {
        if (inputRef.current.value === "") {
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('link to open ai', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `put your key`,
                },
                body: JSON.stringify({
                    prompt: `${inputRef.current.value}`,
                    n: 1,
                    size: "512x512",
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch image');
            }

            let data = await response.json();
            let data_array = data.data;
           
            setImage_url(data_array[0].url);
        } catch (error) {
            setError(error.message);
            console.error("Error generating image:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='ai-image-generator'>
            <div className="header">AI Image <span>Generator</span></div>
            <div className="img-loading">
                <div className="image">
                    <img src={image_url} alt="Generated" />
                </div>
                <div className="loading">
                    <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
                    <div className={loading ? "loading-text" : "display-none"}>Loading...</div>
                </div>
            </div>
            <div className="search-box">
                <input type="text" ref={inputRef} className='search-input' placeholder='Describe what you want to see' />
                <div className="generate-btn" onClick={imageGenerator}>Generate</div>
            </div>
            {error && <div className="error">{error}</div>}
        </div>
    )
}
