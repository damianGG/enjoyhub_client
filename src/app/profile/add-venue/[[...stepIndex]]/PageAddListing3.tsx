import React, { FC, useEffect, useState } from "react";
import { useFormState } from "./FormContext";
import "./PageAddListing3.css";

export interface PageAddListing7Props { }

interface Image {
  public_id: string;
  url: string;
}

const PageAddListing3: FC<PageAddListing7Props> = () => {
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<Image[]>([]);
  const { formData } = useFormState();

  const fetchImages = async () => {
    if (!formData.venueId) return;

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/images/${formData.venueId}`);
      const data = await response.json();
      setUploadedImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [formData.venueId]);

  const handleFileUpload = async (event: { target: { files: any } }) => {
    const files = event.target.files;
    if (!files) return;

    const formDataToSend = new FormData();
    for (const file of files) {
      if (file instanceof File || file instanceof Blob) {
        formDataToSend.append('files', file);
      } else {
        console.error('Wystąpił problem:', file);
      }
    }

    if (formData.venueId) {
      formDataToSend.append('folder', formData.venueId);
    }
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/image/upload', {
        method: 'POST',
        body: formDataToSend,
      });
      await response.json();
      fetchImages();  // Ponownie pobierz zdjęcia po udanym uploadzie
    } catch (error) {
      console.error('Error during file upload:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (publicId: string) => {
    try {
      setLoading(true);
      await fetch(`http://localhost:3001/images/delete/${publicId}`, { method: 'DELETE' });
      fetchImages(); // Ponownie pobierz aktualną listę zdjęć
    } catch (error) {
      console.error('Error deleting image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">Pictures of the place</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Kilka pięknych zdjęć przez które klienci pokochają Twoje miejsce.
        </span>
      </div>

      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-8">
        {/* ----------------- */}
        <div>
          <span className="text-lg font-semibold">Zdjęcia miejsca</span>
          <div className="mt-5 ">
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-neutral-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                  <label
                    htmlFor="file-upload-2"
                    className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                  >
                    <span>Załaduj zdjęcia</span>
                    <input
                      id="file-upload-2"
                      name="file-upload-2"
                      type="file"
                      className="sr-only"
                      onChange={handleFileUpload}
                      multiple
                    />
                    {loading && <p>Ładowanie...</p>}
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {uploadedImages.map((image) => (
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
    </>
  );
};

export default PageAddListing3;