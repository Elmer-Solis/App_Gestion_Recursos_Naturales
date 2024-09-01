import FontaneroDetailItem from "./FontaneroDetailItem";



export default function FontaneroDetails() {
    return (
        <div className='mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl'>
            <FontaneroDetailItem />
            <FontaneroDetailItem />
            <FontaneroDetailItem />
            <div className='flex flex-col lg:flex-row gap-3 justify-between mt-10'>
                <button
                    type='button'
                    className='py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold 
                    uppercase rounded-lg'

                >Editar</button>

                <button
                    type='button'
                    className='py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold 
                    uppercase rounded-lg'

                >Eliminar</button>
            </div>
        </div>

    )
}
