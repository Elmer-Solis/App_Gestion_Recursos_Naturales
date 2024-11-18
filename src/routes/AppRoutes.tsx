import { ProtectedRoute } from "@/hooks/protectedRoutes";
import MainLayout from "@/layouts/MainLayout";
import {
  Inicio,
  Calendario,
  Bombas,
  Fontaneros,
  Login,
  Bitacoras,
  Calidad_agua,
  Contadores,
  Permisos,
  Tablas,
  SVecinos,
  Settings,
  Fin_expediente
} from "@/pages";
import NotFound from "@/pages/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importa el componente que creaste
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ProtectedRoute element={<Inicio />} allowedRoles={['Superadmin', 'Admin', 'Fontanero']} />} index />
          <Route path="/fontaneros" element={<ProtectedRoute element={<Fontaneros />} allowedRoles={['Superadmin', 'Admin']} />} />
          <Route path="/bombas" element={<ProtectedRoute element={<Bombas />} allowedRoles={['Superadmin', 'Admin', 'Fontanero']} />} />
          <Route path="/calendario" element={<ProtectedRoute element={<Calendario />} allowedRoles={['Superadmin', 'Admin', 'Fontanero']} />} />
          <Route path="/bitacoras" element={<ProtectedRoute element={<Bitacoras />} allowedRoles={['Superadmin', 'Admin']} />} />
          <Route path="/calidad" element={<ProtectedRoute element={<Calidad_agua />} allowedRoles={['Superadmin', 'Admin']} />} />
          <Route path="/solicitud" element={<ProtectedRoute element={<SVecinos />} allowedRoles={['Superadmin', 'Admin', 'Fontanero']} />} />
          <Route path="/tablas" element={<ProtectedRoute element={<Tablas />} allowedRoles={['Superadmin']} />} />
          <Route path="/contadores" element={<ProtectedRoute element={<Contadores />} allowedRoles={['Superadmin', 'Admin']} />} />
          <Route path="/fin_expediente" element={<ProtectedRoute element={<Fin_expediente />} allowedRoles={['Superadmin', 'Admin']} />} />
          <Route path="/settings" element={<ProtectedRoute element={<Settings />} allowedRoles={['Superadmin']} />} />
          <Route path="/permisos" element={<ProtectedRoute element={<Permisos />} allowedRoles={['Superadmin']} />} />
        </Route>

        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
