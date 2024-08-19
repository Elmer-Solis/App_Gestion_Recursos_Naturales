


import MainLayout from '@/layouts/MainLayout'
import {
    IndexPage, Main,
    Calendario, RegistroBombas, RegistroPersonal, Proyectos
} from '@/pages'

import { BrowserRouter, Routes, Route } from 'react-router-dom'



export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes  >
                <Route element={<MainLayout />} >
                    <Route path='/' element={<IndexPage />} index />
                    <Route path='/personal' element={<Main />} />
                    <Route path='/bomba' element={<Calendario />} />
                    <Route path='/calendario' element={<RegistroBombas />} />
                    <Route path='/vecinos' element={<RegistroPersonal />} />
                    <Route path='/proyectos' element={<Proyectos />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
