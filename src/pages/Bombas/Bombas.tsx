import { BombaForm } from './BombaForm';
import BombaList from './BombaList';

export function Bombas() {
    return (
        <>
            <div className="container mx-auto mt-4   ">
                <h1 className="font-black text-5xl text-center md:w-2/3 md:mx-auto   md:pr-[10%]  ">
                    Bombas {''}
                </h1>

                <div className="mt-4 md:flex md:h-[calc(100vh-135px)]  ">
                    <BombaForm />
                    <BombaList />
                </div>
            </div>
        </>
    )
}
