import { Toaster } from '@/components/ui/toaster';
import { BombaForm } from './BombaForm';
import BombaList from './BombaList';

export function Bombas() {
    return (
        <>
            <div className="container mx-auto mt-5 ">
                <h1 className="font-black text-5xl text-center md:w-2/3 md:mx-auto ">
                    Bombas {''}
                    {/* <span className="text-indigo-700"> seccion</span> */}
                </h1>

                <div className="mt-12 md:flex">
                    <BombaForm />
                    <BombaList />
                </div>

            </div>
            <Toaster />
        </>
    )
}