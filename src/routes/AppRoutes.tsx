import MainLayout from '@/layouts/MainLayout'
import {
    Inicio,
    Calendario, Bombas, Proyectos, Fontaneros
} from '@/pages'

import { BrowserRouter, Routes, Route } from 'react-router-dom'


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes  >
                <Route element={<MainLayout />} >
                    <Route path='/' element={<Inicio />} index />
                    <Route path='/fontaneros' element={<Fontaneros />} index />
                    <Route path='/bombas' element={<Bombas />} />
                    <Route path='/calendario' element={<Calendario />} />
                    <Route path='/proyectos' element={<Proyectos />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
