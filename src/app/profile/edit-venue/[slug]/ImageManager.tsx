"use client"

import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import "./page.css";


interface Image {
    public_id: string;
    url: string;
}

const ImageManager: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<Image[]>([]);
    const [isImageUploaded, setIsImageUploaded] = useState(false);
    const pathSegments = window.location.pathname.split('/');
    const venueId = pathSegments[pathSegments.length - 1];
    // Pobierz obrazy
    const fetchImages = async () => {
        if (!venueId) return;
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3001/images/${venueId}`);
            const data = await response.json();
            setUploadedImages(data);
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };

    // Dodaj obrazy
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        const formDataToSend = new FormData();
        Array.from(files).forEach(file => {
            formDataToSend.append('files', file);
        });

        if (venueId) {
            formDataToSend.append('folder', venueId);
        }
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3001/image/upload', {
                method: 'POST',
                body: formDataToSend,
            });
            await response.json();
            setIsImageUploaded(true);
        } catch (error) {
            console.error('Error during file upload:', error);
        } finally {
            setLoading(false);
        }
    };

    // Usuń obraz
    const handleDelete = async (publicId: string) => {
        try {
            setLoading(true);
            const encodedPublicId = encodeURIComponent(publicId);
            const url = `http://localhost:3001/images?publicId=${encodedPublicId}`;
            await fetch(url, { method: 'DELETE' });
            fetchImages(); // Ponownie pobierz obrazy
        } catch (error) {
            console.error('Error deleting image:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isImageUploaded) {
            fetchImages();
            setIsImageUploaded(false);
        }
    }, [isImageUploaded, venueId]);

    useEffect(() => {
        fetchImages();
    }, [venueId]);

    return (
        <div>
            <div>
                <h2 className="text-2xl font-semibold">Zdjęcia</h2>
                <span className="block mt-2 text-neutral-500">
                    Dodaj i zarządzaj zdjęciami.
                </span>
            </div>
            <div className="space-y-6">
                <input
                    type="file"
                    onChange={handleFileUpload}
                    multiple
                />
                {loading && <LinearProgress />}
                <div className="grid grid-cols-3 gap-4">
                    {Array.isArray(uploadedImages) && uploadedImages.map((image) => (
                        <div key={image.public_id} className="relative">
                            <img src={image.url} alt="Uploaded" className="image-hover" />
                            <button
                                className="delete-button"
                                onClick={() => handleDelete(image.public_id)}
                            >
                                &#10005;
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageManager;