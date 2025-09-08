import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ProyectForm from '../components/beta/new_proyect/ProyectForm'
import Preview from '../pages/Preview'
import ProtectedRoute from '../components/auth/ProtectedRoute'

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/form"
                element={
                    <ProtectedRoute>
                        <ProyectForm />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/preview"
                element={
                    <ProtectedRoute>
                        <Preview />
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}

export default AppRoutes