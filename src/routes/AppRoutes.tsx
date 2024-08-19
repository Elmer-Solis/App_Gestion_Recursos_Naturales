


import MainLayout from '@/layouts/MainLayout'
import { IndexPage } from '@/pages/indexPage'
import Main from '@/pages/Main'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes  >
                <Route element={<MainLayout />} >
                    <Route path='/' element={<IndexPage />} index />
                    <Route path='/menu' element={<Main />} />

                </Route>
            </Routes>
        </BrowserRouter>
    )
}
