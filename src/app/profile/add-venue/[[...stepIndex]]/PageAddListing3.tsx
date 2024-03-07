import React, { FC, useEffect, useState } from "react";
import { useFormState } from "./FormContext";
import "./PageAddListing3.css";
import LinearProgress from '@mui/material/LinearProgress';
import { useForm } from "react-hook-form";
import ButtonPrimary from "@/components/ButtonPrimary";
import ButtonSecondary from "@/components/ButtonSecondary";
export interface PageAddListing3Props { }

interface Image {
  public_id: string;
  url: string;
}
type TFormValues = {
};

const PageAddListing3: FC<PageAddListing3Props> = () => {
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<Image[]>([]);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const { setFormData, formData, onHandleBack, onHandleNext } = useFormState();
  const { register, handleSubmit } = useForm<TFormValues>({
    defaultValues: formData,
  });

  const onHandleFormSubmit = (data: TFormValues) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    onHandleNext();
  };

  const fetchImages = async () => {
    if (!formData.venueId) return;

    try {
      setLoading(true);
      const response = await fetch(`${process.env.BACKEND_ADDRESS}/images/${formData.venueId}`);
      // opcjonalnie pobieramy zdjęcia z z bazy danych a nie z cloudinary 
      // wymagana edycji usuwania zdjęć 
      // const response = await fetch(`http://localhost:3001/images/${formData.venueId}`);
      const data = await response.json();
      setUploadedImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

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
      const response = await fetch(`${process.env.BACKEND_ADDRESS}/image/upload`, {
        method: 'POST',
        body: formDataToSend,
      });
      await response.json();
      // Opóźnienie przed ponownym pobraniem obrazów to powinno zostać poprawione, timeout nie jest najlepszym rozwiazaniem 
      setTimeout(() => {
        setIsImageUploaded(true); // Ustaw stan na true po udanym uploadzie
      }, 2000); //
    } catch (error) {
      console.error('Error during file upload:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isImageUploaded) {
      fetchImages();
      setIsImageUploaded(false); // Resetuj stan
    }
  }, [isImageUploaded]);
  const handleDelete = async (publicId: string) => {
    try {
      setLoading(true);
      const encodedPublicId = encodeURIComponent(publicId);
      const url = `${process.env.BACKEND_ADDRESS}/images?publicId=${encodedPublicId}`;
      await fetch(url, { method: 'DELETE' });
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
        <h2 className="text-2xl font-semibold">Zdjęcia</h2>
        <span className="block mt-2 text-neutral-500 ">
          Kilka pięknych zdjęć przez które klienci pokochają Twoje miejsce.
        </span>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(onHandleFormSubmit)}>

        <div className="w-14 border-b border-neutral-200 "></div>
        {/* FORM */}
        <div className="space-y-8">
          {/* ----------------- */}
          <div>

            <div className="mt-5 ">
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300  border-dashed rounded-md">
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
                  <div className="flex text-sm text-neutral-6000 ">
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

                    </label>
                    <p className="pl-1">albo przeciągnij i upuść</p>
                  </div>
                  <p className="text-xs text-neutral-500 ">
                    PNG, JPG do 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
          {loading && <LinearProgress />}
          <p className="text-lg font-semibold">Lista dodanych zdjęć:</p>
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
        <div className="flex justify-between space-x-5 mt-12">
          <ButtonSecondary onClick={onHandleBack}>Cofnij</ButtonSecondary>
          <ButtonPrimary type="submit">Dalej</ButtonPrimary>
        </div>
      </form>
    </>
  );
};

export default PageAddListing3;
