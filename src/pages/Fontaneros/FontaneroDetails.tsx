import FontaneroDetailItem from "./FontaneroDetailItem";
import { Fontanero } from '../../types/index';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
type PatientDetailsProps = {
    fontanero: Fontanero
}

export default function FontaneroDetails({ fontanero }: PatientDetailsProps) {



    return (
        <Card className="mx-5 my-10 px-5 py-10">
            {/* <div className='mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl'> */}
            <FontaneroDetailItem label='Nombre' data={fontanero.name} />
            <FontaneroDetailItem label='Telefono' data={fontanero.phone} />
            <FontaneroDetailItem label='Bomba' data={fontanero.bomba} />

            <div className='flex flex-col lg:flex-row gap-3 justify-between mt-10'>

                <Button
                    className="py-2 px-10 text-white font-bold uppercase"
                >
                    Editar</Button>
                {/* <button
                    type='button'
                    className='py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold 
                    uppercase rounded-lg'

                >Editar</button> */}

                <Button
                    className="py-2 px-10 text-white font-bold uppercase"
                >
                    Eliminar</Button>
                {/* <button
                    type='button'
                    className='py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold 
                    uppercase rounded-lg'

                >Eliminar</button> */}

            </div>
            {/* </div> */}
        </Card>

    )
}
