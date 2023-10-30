//import { Mutation } from '@tanstack/react-query';

export interface RegistrationData {
    email: string;
    password: string;
}

export const registerUser = async (registrationData: RegistrationData) => {
    const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
    });

    if (!response.ok) {
        throw new Error('Registration failed');
    }

    return response.json();
};