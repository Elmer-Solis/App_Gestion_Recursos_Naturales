

import { MailCheck } from 'lucide-react';
import { useAuthStore } from '../store/storeLogin';

export function Login() {

    const handleSignInWithGoogle = useAuthStore((state) => state.handleSignInWithGoogle)

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-[#262827] to-[#29372F] p-8">
            <div className="flex space-x-4">
                <img src="/logogoogle.png" className="w-16 h-16" alt="Vite logo" />
                <img src="/react.svg" className="w-16 h-16" alt="React logo" />
                <img src="/supabaselogo.png" className="w-16 h-16" alt="Supabase logo" />
            </div>
            <h1 className="text-3xl text-white my-4">Vite + React + Supabase</h1>
            <img src="/logogoogle.png" className="w-16 h-16" alt="Google logo" />
            <div className="bg-white p-4 rounded-lg shadow-lg mt-6">
                <button className="bg-green-500 text-white py-2 px-4 rounded-lg"
                    onClick={handleSignInWithGoogle}
                >
                    Iniciar con Google
                </button>
                <p className="mt-4 text-gray-500">codigo369.com</p>
            </div>
            <p className="text-gray-300 mt-4">
                Supabase implementa todo el poder de PostgreSQL
            </p>
            <div className="flex flex-col items-center bg-[#366733] p-6 rounded-lg mt-8 relative w-full max-w-xs">
                <section className="flex items-center gap-4 w-full">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                            src="https://via.placeholder.com/50"
                            alt="Profile"
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <span className="text-white font-semibold">John Doe</span>
                </section>
                <section className="mt-4 bg-green-600 p-2 rounded-lg flex items-center gap-2 w-full">
                    <MailCheck className="text-green-400" />
                    <span className="text-green-200">john@example.com</span>
                </section>
                <div className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2">
                    <img src="/supabaselogo.png" className="w-12 h-12" alt="Supabase logo" />
                </div>
            </div>
        </div>
    );
}
