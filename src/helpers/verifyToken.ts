export async function verifyToken(token: any) {
    const response = await fetch('http://localhost:3000/auth/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    return response.ok;
}

