
import { Aside } from "../layouts/Aside"
import { Header } from './Dashboard/Header';
import { MainDashboard } from "../pages/IndexPage";

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
