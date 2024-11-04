
import { VecinosForm } from "./VecinosForm/VecinosForm"
import { VecinosList } from "./VecinosList"

export function Vecinos() {
    return (
        <div className="container mx-auto mt-5 ">

            <div className="mt-4 md:flex md:h-[calc(100vh-135px)]">
                <VecinosForm />
                <VecinosList />
            </div>
        </div>
    )
}
