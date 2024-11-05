// import { BellRing, Check } from "lucide-react";
import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "@/components/settings/ModelToggle";

// const notifications = [
//   {
//     title: "Your call has been confirmed.",
//     description: "1 hour ago",
//   },
//   {
//     title: "You have a new message!",
//     description: "1 hour ago",
//   },
//   {
//     title: "Your subscription is expiring soon!",
//     description: "2 hours ago",
//   },
// ];

type CardProps = React.ComponentProps<typeof Card>;

export function Cambios({ className, ...props }: CardProps) {
  return (
    <Card className={cn(" ", className)} {...props}>
      <CardHeader className="flex items-center ">
        <img src="/umgO.png" alt="fontanero" className="w-15 h-20 md:w-25  rounded-full" />
        <CardTitle>Configuración General</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* Mode Toggle with description */}
        <div className="flex items-center p-3 rounded-md border gap-4 ">
          <ModeToggle />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Tema</p>
            <p className="text-sm text-muted-foreground">
              Cambia entre tema claro y oscuro.
            </p>
          </div>
        </div>
        <div className="flex items-center p-3 rounded-md border ">
          <div className="flex-1 space-y-1">
            <p className="leading-none">Desarrollado por:</p>
            {/* Texto corto para móviles */}
            <p className="text-sm text-muted-foreground">Elmer Isai Solis Coyoy</p>
            {/* Texto completo para pantallas medianas o mayores */}
            {/* <p className="hidden md:block text-base md:text-lg  font-semibold tracking-wide ">Elmer Isai Solis Coyoy</p> */}
          </div>
        </div>

        <div className="flex items-center p-3 rounded-md border ">
          <div className="flex-1 space-y-1">
            <p className="leading-none">Versión</p>
            {/* Texto corto para móviles */}
            <p className="text-sm text-muted-foreground">1.0.0</p>
            {/* Texto completo para pantallas medianas o mayores */}
            {/* <p className="hidden md:block text-base md:text-lg  font-semibold tracking-wide ">Elmer Isai Solis Coyoy</p> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
