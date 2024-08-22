


import MainLayout from '@/layouts/MainLayout'
import {
    Inicio, Main,
    Calendario, RegistroBombas, RegistroPersonal, Proyectos
} from '@/pages'

import { BrowserRouter, Routes, Route } from 'react-router-dom'



export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes  >
                <Route element={<MainLayout />} >
                    <Route path='/' element={<Inicio />} index />
                    <Route path='/personal' element={<RegistroPersonal />} />
                    <Route path='/bomba' element={<RegistroBombas />} />
                    <Route path='/calendario' element={<Calendario />} />
                    <Route path='/vecinos' element={<Main />} />
                    <Route path='/proyectos' element={<Proyectos />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
