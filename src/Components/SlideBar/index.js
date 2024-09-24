import { TiHome } from "react-icons/ti";
import { HiFire } from "react-icons/hi";
import { SiYoutubegaming } from "react-icons/si";
import { RiMenuAddLine } from "react-icons/ri";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./index.css";

function SildeBar() {
    const location = useLocation(); // Get the current route
    const navigate = useNavigate();

    // Determine active tab based on current location
    
    const getActiveTab = () => {
        switch (location.pathname) {
            case "/trending":
                return "TRENDING";
            case "/gaming":
                return "GAMING";
            case "/savedVideos":
                return "SAVEDVIDEOS";
            default:
                return "HOME";
        }
    };


    const onClickHome = () => {
        setActiveTab("HOME");
        navigate("/");
    };

    const onClickTrending = () => {
        setActiveTab("TRENDING");
        navigate("/trending");
    };

    const onClickGaming = () => {
        setActiveTab("GAMING");
        navigate("/gaming");
    };

    const onClickSaveVideos = () => {
        setActiveTab("SAVEDVIDEOS");
        navigate("/savedVideos");
    };

    const [activeTab, setActiveTab] = useState(getActiveTab());

    return (
        <aside className="side_container">
            <div className="button_active_container">
                <Link to="/" className="Link">
                    <div
                        className={activeTab === "HOME" ? "container" : "containers"}
                        onClick={onClickHome}
                        value={"HOME"}
                    >
                        <TiHome size={30} color={activeTab === "HOME" ? "#ff0000" : "#000000"} />
                        <button className="button_1">Home</button>
                    </div>
                </Link>
                <Link to="/trending" className="Link">
                    <div
                        className={activeTab === "TRENDING" ? "container" : "containers"}
                        onClick={onClickTrending}
                        value={"TRENDING"}
                    >
                        <HiFire size={30} color={activeTab === "TRENDING" ? "#ff0000" : "#000000"} />
                        <button className="button_1">Trending</button>
                    </div>
                </Link>
                <Link to="/gaming" className="Link">
                    <div
                        className={activeTab === "GAMING" ? "container" : "containers"}
                        onClick={onClickGaming}
                        value={"GAMING"}
                    >
                        <SiYoutubegaming size={30} color={activeTab === "GAMING" ? "#ff0000" : "#000000"} />
                        <button className="button_1">Gaming</button>
                    </div>
                </Link>
                <Link to="/savedVideos" className="Link">
                    <div
                        className={activeTab === "SAVEDVIDEOS" ? "container" : "containers"}
                        onClick={onClickSaveVideos}
                        value={"SAVEDVIDEOS"}
                    >
                        <RiMenuAddLine size={30} color={activeTab === "SAVEDVIDEOS" ? "#ff0000" : "#000000"} />
                        <button className="button_1">Saved Videos</button>
                    </div>
                </Link>
            </div>
        </aside>
    );
}

export default SildeBar;
