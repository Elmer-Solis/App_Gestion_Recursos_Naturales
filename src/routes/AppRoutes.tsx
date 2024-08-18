

import MainLayout from '@/layouts/MainLayout'
import { MainDashboard } from '@/pages/MainDashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes  >
                <Route element={<MainLayout />} >
                    <Route path='/' element={<MainDashboard />} index />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
