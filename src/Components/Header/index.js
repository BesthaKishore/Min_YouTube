import "./index.css"

import Cookies from "js-cookie";

import { useNavigate } from "react-router-dom";

import { MdMenu, MdOutlineLogout } from "react-icons/md";

import { Link } from "react-router-dom";

function Header(){

    const navigate = useNavigate();

    const onClickLogOut = () => {
        Cookies.remove("jwt_token");
        navigate("/login");

    }

    return(
        <header className="header_container">
            <Link to="/"  className="Link">
            <img className="logo_image" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" alt="logo"/>
            </Link>
            <nav className="Desktop_container">
                <button type="button" className="button_1">
                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png" className="profile" alt="profile"/>
                </button>
                <button type="button" className="Logout" onClick={onClickLogOut}>Logout</button>
            </nav>

            <nav className="Mobile_container">
                <button type="button" className="button_1">
                <MdMenu className="menu"/>
                </button>
                <button type="button" className="button_1" onClick={onClickLogOut}>
                    <MdOutlineLogout className="menu"/>
                </button>
            </nav>
        </header>
    )
}

export default Header