import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Label from '@/components/Label';
import Input from '@/shared/Input';
import Button from '@mui/material/Button';
import { Alert, Snackbar } from '@mui/material';


interface UserData {
    name: string;
    city: string;
    country: string;
    postalCode: string;
    street: string;
    latitude: number;
    longitude: number;
}


interface UserProfileFormProps {
    userData: UserData | null;
    onSubmit: (data: UserData, resetForm: () => void) => void;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ userData, onSubmit }) => {

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const { register, handleSubmit, watch, formState: { isDirty }, reset } = useForm({
        defaultValues: userData || {}
    });

    useEffect(() => {
        if (userData) {
            reset(userData);
        }
    }, [userData, reset]);

    if (!userData) {
        return <div>Loading...</div>; // or some other placeholder
    }

    const onSubmitHandler = (data: UserData) => {
        console.log("tu")
        onSubmit(data, reset); // Przekazanie reset do funkcji onSubmit
        setSnackbarMessage("Dane obiektu zaktualizowane poprawnie"); // Set a success message
        setSnackbarOpen(true); // Open the snackbar
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div>
                    <Label>Name</Label>
                    <Input {...register('name', { required: false })} />
                </div>

                <div>
                    <Label>City</Label>
                    <Input {...register('city', { required: false })} />
                </div>

                <div>
                    <Label>Country</Label>
                    <Input {...register('country', { required: false })} />
                </div>

                <div>
                    <Label>Postal Code</Label>
                    <Input {...register('postalCode', { required: false })} />
                </div>

                <div>
                    <Label>Street</Label>
                    <Input {...register('street', { required: false })} />
                </div>

                <Button className=' mt-8' variant="contained" disabled={!isDirty} type="submit">Zapisz zmiany</Button>
            </form>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default UserProfileForm;