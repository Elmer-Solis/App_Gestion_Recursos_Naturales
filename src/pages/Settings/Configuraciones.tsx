import { BellRing, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "@/components/settings/ModelToggle";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

type CardProps = React.ComponentProps<typeof Card>;

export function Cambios({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-[380px] mx-auto", className)} {...props}>
      <CardHeader>
        <CardTitle>Configuración General</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* Mode Toggle with description */}
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <ModeToggle />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Tema</p>
            <p className="text-sm text-muted-foreground">
              Cambia entre el tema claro y oscuro.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Notificaciones Push
            </p>
            <p className="text-sm text-muted-foreground">
              Envía notificaciones al dispositivo.
            </p>
          </div>
        </div>

        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Check /> Marcar todo como leído
        </Button>
      </CardFooter>
    </Card>
  );
}
