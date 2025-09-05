import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import ProyectForm from '../components/beta/NewProyect/ProyectForm'

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<ProyectForm />} />
        </Routes>
    )
}

export default AppRoutes