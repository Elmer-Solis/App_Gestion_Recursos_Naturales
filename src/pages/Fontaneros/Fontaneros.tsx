
import FontaneroList from './FontaneroList';
import { FontanerosForm } from './FontanerosForm';

export function Fontaneros() {

    return (
        <>
            <div className="container mx-auto mt-4 ">
                <h1 className="font-black text-5xl text-center md:w-2/3 md:mx-auto md:pr-[10%]">
                    Fontaneros {''}
                </h1>

                <div className="mt-6 md:flex ">
                    <FontanerosForm />
                    <FontaneroList />
                </div>
            </div>

        </>
    )
}
