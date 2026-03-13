import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    const estaAutenticado = localStorage.getItem("token");

    if (!estaAutenticado) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default PrivateRoutes;