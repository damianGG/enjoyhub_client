export async function verifyToken(token: any) {
    const response = await fetch(`${process.env.BACKEND_ADDRESS}/auth/verify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    return response.ok;
}

