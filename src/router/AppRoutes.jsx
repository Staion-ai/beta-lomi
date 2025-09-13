import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import ProyectForm from '../components/beta/new_proyect/ProyectForm'
import Preview from '../pages/Preview'
import PaymentSuccess from '../pages/PaymentSuccess'
import ProtectedRoute from '../components/auth/ProtectedRoute'

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
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
            <Route
                path="/payment-success"
                element={
                    <ProtectedRoute>
                        <PaymentSuccess />
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}

export default AppRoutes