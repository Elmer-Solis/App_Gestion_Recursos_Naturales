
import { AuthContextProvider } from "./context/AuthContext"
import AppRoutes from "./routes/AppRoutes"
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <AppRoutes />
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App












