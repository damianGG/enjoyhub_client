"use client"

//import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';

const GoogleLoginButton: React.FC = () => {
    const router = useRouter();

    const handleSuccess = async (response: any) => {
        const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: response.credential }),
        });

        const data = await res.json();

        if (res.ok) {
            const data = await res.json();
            // Zalogowano pomyślnie, zapisz token w localStorage lub w cookie
            localStorage.setItem('accessToken', data.accessToken);
            // Przekieruj do strony głównej lub dashboardu
            router.push('/profile');
        } else {
            // Obsługa błędów logowania
            console.error('Login Failed:', response);
        }
    };

    const handleFailure = (response: any) => {
        console.error('Login failed:', response);
    };

    return (
        // <div className='nc-will-change-transform flex w-full rounded-lg bg-primary-50 placeholder:px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]'>
        //     {/* <GoogleLogin
        //         onSuccess={handleSuccess}
        //         onError={() => {
        //             console.log('Login Failed');
        //         }}
        //     /> */}
        // </div>
        <div className="g-signin2" data-onsuccess="onSignIn">Dolacz</div>
    );
};

export default GoogleLoginButton;