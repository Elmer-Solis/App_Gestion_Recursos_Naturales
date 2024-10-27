
import { VecinosForm } from "./VecinosForm"
import { VecinosList } from "./VecinosList"

export function Vecinos() {
    return (
        <div className="container mx-auto mt-5 ">

            <div className="mt-4 md:flex md:h-[calc(100vh-140px)]">
                <VecinosForm />
                <VecinosList />
            </div>
        </div>
    )
}
