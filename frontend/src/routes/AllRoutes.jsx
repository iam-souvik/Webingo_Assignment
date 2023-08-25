import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import UserPanel from '../components/UserPanel';
import ManagerPanel from '../components/ManagerPanel';
import AdminPanel from "../components/AdminPanel"

function AllRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/user' element={<UserPanel />} />
            <Route path='/manager' element={<ManagerPanel />} />
            <Route path='/admin' element={<AdminPanel />} />
        </Routes>
    )
}

export default AllRoutes