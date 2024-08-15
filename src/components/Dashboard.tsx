
import { Aside } from "./Dashboard/Aside"
import { Header } from './Dashboard/Header';
import Main from "./Dashboard/Main";

export function Dashboard() {
    return (
        <div className="grid h-screen w-full pl-[56px]">
            <Aside />
            <div className="flex flex-col">
                <Header />
                <Main />
            </div>
        </div>
    )
}
