import { Dashboard } from "./components/Dashboard"
import SideBar from "./components/SideBar"
import { Button } from "./components/ui/button"
import {
  TooltipProvider,
} from "@/components/ui/tooltip"

function App() {
  return (
    <>
      <TooltipProvider>
        <Dashboard />
      </TooltipProvider>
    </>
  )
}

export default App



{/* <div className="flex">
        <SideBar />
        <div className="ml-16 p-6">
          <h1 className="text-2xl font-bold">Contenido principal</h1>
          <p>Este es el contenido de la página principal.</p>
        </div>
      </div> */}

{/* <Button variant="destructive">Destructive</Button> */ }
