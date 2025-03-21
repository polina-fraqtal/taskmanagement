"use client";
import { useRouter } from 'next/navigation';
import '../globals.css';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        const response = await fetch(`/api/users/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            alert('Failed to log out');
            return;
        }

        router.refresh();
        router.push('/login');
    };

    return (
        <a
            onClick={handleLogout}
            className="no-underline text-white cursor-pointer"
        >
            logout
        </a>
    );
}