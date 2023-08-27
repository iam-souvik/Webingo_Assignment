import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
// import UserPanel from '../components/UserPanel';
import ManagerPanel from '../components/ManagerPanel';
import AdminPanel from "../components/AdminPanel"
import PrivateRoute from './PrivateRoutes';
import CreateUser from '../components/CreateUser';

function AllRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            {/* <Route path='/user' element={<UserPanel />} /> */}
            <Route path='/manager' element={<PrivateRoute><ManagerPanel /></PrivateRoute>} />
            <Route path='/createuser' element={<PrivateRoute><CreateUser /></PrivateRoute>} />
            <Route path='/admin' element={<PrivateRoute><AdminPanel /></PrivateRoute>} />

        </Routes>
    )
}

export default AllRoutes