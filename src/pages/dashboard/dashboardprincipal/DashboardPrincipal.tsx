import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useBombaStore } from "@/store/storeBombas";
import { useFontaneroStore } from "@/store/storeFontanero";


export default function DashboardPrincipal() {
    const { bombas } = useBombaStore();
    const { fontaneros } = useFontaneroStore();

    return (
        <div className="grid grid-cols-5 grid-rows-8 gap-4">

            <Card className="col-span-2 row-span-3">

                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>

            <Card className="row-span-2 col-start-4 row-start-1">
                <div className="flex flex-col items-center justify-center h-full">
                    <img className="w-28 h-24" src="/bomba.png" alt="logo" />
                    <div className="text-center mt-2">
                        <p className="text-sm">Bombas</p>
                        <p className="text-sm">{bombas.length}</p>
                    </div>
                </div>
            </Card>

            <Card className="row-span-2 col-start-5 row-start-1">
                <div className="flex flex-col items-center justify-center h-full">
                    <img className="w-28 h-24" src="/fontanero.png" alt="logo" />
                    <div className="text-center mt-2">
                        <p className="text-sm">Fontaneros:</p>
                        <p className="text-sm">{fontaneros.length}</p>
                    </div>
                </div>
            </Card>
            <Card className="row-span-2 col-start-3 row-start-1">
                {/* <div className="flex flex-col items-center justify-center h-full">
                    <img className="w-28 h-24" src="/umgO.png" alt="logo" />
                    <div className="text-center mt-2">
                        <p className="text-sm">Autor:</p>
                        <p className="text-sm">Elmer Isai Solis Coyoy</p>
                    </div>
                </div> */}
            </Card>

            <Card className="col-span-3 row-span-2 col-start-3 row-start-3"> <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter></Card>
            <Card className="col-span-2 row-span-3 row-start-4">6</Card>
            <Card className="col-span-2 row-span-2 col-start-3 row-start-5"> <CardHeader>
                <CardTitle>Card Title </CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
            <Card className="col-span-2 row-span-2 col-start-2 row-start-7">8</Card>
            <Card className="col-span-2 row-span-2 col-start-4 row-start-7">
                <div className="flex flex-col items-center justify-center h-full">
                    <img className="w-28 h-24" src="/umgO.png" alt="logo" />
                </div>

            </Card>
            <Card className="row-span-2 col-start-5 row-start-5 flex  flex-col items-center justify-center">

            </Card>
            <Card className="row-span-2 col-start-1 row-start-7">
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
        </div>
    )
}
