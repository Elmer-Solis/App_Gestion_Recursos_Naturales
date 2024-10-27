import { SvecinosForm } from "./SvecinosForm"
import { SvecinosList } from "./SvecinosList"

export function SVecinos() {
    return (
        <div className="container mx-auto mt-5 ">

            <div className="mt-4 md:flex ">
                <SvecinosForm />
                <SvecinosList />
            </div>
        </div>
    )
}

