"use client"

import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import "./page.css";


interface Image {
    id: string;
    url: string;
}

interface ImageManagerProps {
    photos: Image[];
    onPhotosChange: () => void; // Funkcja do powiadamiania rodzica o zmianie
}

const ImageManager: React.FC<ImageManagerProps> = ({ photos, onPhotosChange }) => {
    const [loading, setLoading] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<Image[]>(photos);
    const [isImageUploaded, setIsImageUploaded] = useState(false);
    const pathSegments = window.location.pathname.split('/');
    const venueId = pathSegments[pathSegments.length - 1];
    // Pobierz obrazy

    // const fetchImages = async () => {
    //     if (!venueId) return;
    //     try {
    //         setLoading(true);
    //         const response = await fetch(`http://localhost:3001/images/${venueId}`);
    //         const data = await response.json();
    //         setUploadedImages(data);
    //     } catch (error) {
    //         console.error('Error fetching images:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

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
    const handleDelete = async (imageUrl: string) => {
        try {
            setLoading(true);
            const parts = imageUrl.split('/');
            const lastPart = parts[parts.length - 1];
            const publicId = lastPart.split('.')[0];
            const encodedPublicId = encodeURIComponent(publicId);
            const url = `http://localhost:3001/images?publicId=${encodedPublicId}`;

            await fetch(url, { method: 'DELETE' });
            // fetchImages(); // Ponownie pobierz obrazy
            setUploadedImages(currentImages => currentImages.filter(image => image.url !== imageUrl));
            onPhotosChange();
        } catch (error) {
            console.error('Error deleting image:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isImageUploaded) {
            // fetchImages();
            onPhotosChange(); // Powiadom rodzica
            setIsImageUploaded(false);
        }
    }, [isImageUploaded]);

    useEffect(() => {
        //fetchImages();
        setUploadedImages(photos);
    }, [photos]);

    return (
        <div>
            {loading && <LinearProgress />}
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
                <div className="grid grid-cols-3 gap-4">
                    {Array.isArray(uploadedImages) && uploadedImages.map((image) => (
                        <div key={image.id} className="relative">
                            <img src={image.url} alt="Uploaded" className="image-hover" />
                            <button
                                className="delete-button"
                                onClick={() => handleDelete(image.url)}
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