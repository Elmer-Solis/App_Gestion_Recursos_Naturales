import { ProtectedRoute } from '@/hooks/protectedRoutes';
import MainLayout from '@/layouts/MainLayout';
import { Inicio, Calendario, Bombas, Proyectos, Fontaneros, Login } from '@/pages';
import NotFound from '@/pages/NotFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Importa el componente que creaste
export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route element={<MainLayout />}>
                    <Route path="/" element={<ProtectedRoute element={<Inicio />} />} index />
                    <Route path="/fontaneros" element={<ProtectedRoute element={<Fontaneros />} />} />
                    <Route path="/bombas" element={<ProtectedRoute element={<Bombas />} />} />
                    <Route path="/calendario" element={<ProtectedRoute element={<Calendario />} />} />
                    <Route path="/proyectos" element={<ProtectedRoute element={<Proyectos />} />} />
                </Route>

                {/* Ruta pública */}
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}