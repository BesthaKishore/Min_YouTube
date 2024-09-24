import Cookies from "js-cookie"

import { useNavigate,Outlet } from "react-router-dom"

import { useEffect } from "react";

function ProtectedRoute(props) {
    const navigate = useNavigate();

    useEffect(() => {
        const jwt_token = Cookies.get("jwt_token");

        if (jwt_token === undefined){
            navigate("/login")
        }
    },[navigate])

    return <Outlet/>
}

export default ProtectedRoute