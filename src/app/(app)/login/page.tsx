"use client";
import {useRouter} from 'next/navigation';
import '../../globals.css';

export default function Login() {
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        if (!email || !password) {
            alert('Password and email are required');
            return;
        }
        

        const response = await fetch(`/api/users/login`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include',
        });

        if (!response.ok) {
            alert('Invalid email or password');
            return;
        }

        const result = await response.json();
        console.log(result)

        router.refresh()
        router.push('/projects');
    };

    return (
        <div className="flex justify-center items-center h-screen bg-white text-black">
            <form
                className="p-5 w-96 text-center border border-gray-300 rounded"
                onSubmit={handleSubmit}
            >
                <h1 className="text-5xl font-semibold mb-8">Log in</h1>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-1">Email:</label>
                    <input
                        type="email"
                        name="email"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-1">Password:</label>
                    <input
                        type="password"
                        name="password"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full p-2 mt-4 border border-black rounded bg-black text-white hover:bg-gray-800"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
