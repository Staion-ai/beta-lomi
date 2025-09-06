import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import ProyectForm from '../components/beta/new_proyect/ProyectForm'
import Preview from '../pages/Preview'

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<ProyectForm />} />
            <Route path="/preview" element={<Preview />} />
        </Routes>
    )
}

export default AppRoutes