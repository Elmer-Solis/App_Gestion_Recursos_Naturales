
import { VecinosForm } from "./VecinosForm"
import { VecinosList } from "./VecinosList"

export function Vecinos() {
    return (
        <div className="container mx-auto mt-5 ">

            <div className="mt-12 md:flex md:h-[calc(100vh-225px)]">
                <VecinosForm />
                <VecinosList />
            </div>
        </div>
    )
}
