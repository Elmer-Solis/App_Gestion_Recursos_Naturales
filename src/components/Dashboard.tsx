
import { Aside } from "./Dashboard/Aside"
import { Header } from './Dashboard/Header';
import { MainDashboard } from "./Dashboard/Mainother";

export function Dashboard() {
    return (
        <div className="grid h-screen w-full pl-[56px]">
            <Aside />
            <div className="flex flex-col">
                <Header />

                <MainDashboard />
            </div>
        </div>
    )
}
