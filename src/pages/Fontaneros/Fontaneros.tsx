import { Toaster } from '@/components/ui/toaster';
import FontaneroList from './FontaneroList';
import { FontanerosForm } from './FontanerosForm';
import { UserAuth } from '@/context/AuthContext';

export function Fontaneros() {
    const { signOut } = UserAuth()
    return (
        <>
            <div className="container mx-auto mt-5 ">
                <h1 className="font-black text-5xl text-center md:w-2/3 md:mx-auto ">
                    Fontaneros {''}
                    {/* <span className="text-indigo-700"> seccion</span> */}
                </h1>

                <div className="mt-12 md:flex">
                    <FontanerosForm />
                    <FontaneroList />
                </div>
                <button
                    onClick={signOut}
                >
                    salirXd
                </button>
            </div>
            <Toaster />
        </>
    )
}
