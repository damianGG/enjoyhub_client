import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Label from '@/components/Label';
import Input from '@/shared/Input';
import Button from '@mui/material/Button';


interface UserData {
    name: string;
    email: string;
}


interface UserProfileFormProps {
    userData: UserData;
    onSubmit: (data: UserData, resetForm: () => void) => void;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ userData, onSubmit }) => {
    const { register, handleSubmit, watch, formState: { isDirty }, reset } = useForm({
        defaultValues: userData
    });



    const onSubmitHandler = (data: UserData) => {
        onSubmit(data, reset); // Przekazanie reset do funkcji onSubmit
    };

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div>
                <Label>Name</Label>
                <Input {...register('name', { required: true })} />
            </div>

            <div>
                <Label>Email</Label>
                <Input disabled {...register('email', { required: true })} />
            </div>

            <Button className=' mt-8' variant="contained" disabled={!isDirty} type="submit">Zapisz zmiany</Button>
        </form>
    );
};

export default UserProfileForm;