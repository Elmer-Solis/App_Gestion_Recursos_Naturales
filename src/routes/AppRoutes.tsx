import MainLayout from '@/layouts/MainLayout'
import {
    Inicio,
    Calendario, Bombas, Proyectos, Fontaneros, Login
} from '@/pages'


import { Routes, Route } from 'react-router-dom'


export default function AppRoutes() {
    return (

        <Routes  >
            <Route element={<MainLayout />} >
                <Route path='/' element={<Inicio />} index />
                <Route path='/fontaneros' element={<Fontaneros />} />
                <Route path='/bombas' element={<Bombas />} />
                <Route path='/calendario' element={<Calendario />} />
                <Route path='/proyectos' element={<Proyectos />} />
            </Route>
            <Route path='/login' element={<Login />} />
        </Routes>

    )
}
