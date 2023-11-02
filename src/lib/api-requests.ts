const SERVER_ENDPOINT = "http://localhost:3000";

type Inputs = {
    name: string;
    email: string;
    password: string;
};

export async function apiRegisterUser(registrationData: Inputs) {
    const response = await fetch(`${SERVER_ENDPOINT}/users`, {
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
  }