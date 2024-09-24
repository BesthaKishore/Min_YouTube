import Header from "../Header"

import SlideBar from "../SlideBar"

import GamingDetails from "../GamingDetails";

import { SiYoutubegaming } from "react-icons/si";

import { useEffect, useState } from "react";

import Cookies from "js-cookie";

import { BeatLoader} from "react-spinners";

import "./index.css"

const ApiStatusContent = {
    initital: "INITITAL",
    success : "SUCCESS",
    failure : "FAILURE",
    isLoading: "IS_LOADING"
}


function Gaming(){

    const [GamingData, setGamingData] = useState([]);

    const [GamingApi, setGamingApi] = useState(ApiStatusContent.initital);

    useEffect(() => {
        const getGamingVideos = async () => {

            setGamingApi(ApiStatusContent.isLoading);

            const GamingApi = 'https://apis.ccbp.in/videos/gaming'

            const jwtToken = Cookies.get("jwt_token");
    
            const options = {
                headers: {
                    Authorization : `Bearer ${jwtToken}`
                }
            }
    
            const response = await fetch(GamingApi, options);
            if (response.ok === true){
                const GamingFetchData = await response.json();
                const upDataDate = GamingFetchData.videos.map(each => ({
                    id: each.id,
                    thumbnailUrl: each.thumbnail_url,
                    title : each.title,
                    viewCount : each.view_count
                }))
                setGamingData(upDataDate);
                setGamingApi(ApiStatusContent.success);

            }else{
                setGamingApi(ApiStatusContent.failure);
            }
        }
        getGamingVideos();
    },[])

    const getLoaderSpinner = () => {
        return(
            <div className="Trending_Loader_Spinner">
                <BeatLoader color="#4f46e5" size={30}/>
            </div>
        )
    }

    const getFailureVideos = () => {
        return(
            <div className="Trending_failure_contianer">
                <img className="failure_image" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png" alt="failure"/>
                <h1 className="failure_heading">Opps! Something Went Wrong</h1>
                <p className="failure_para">We are having some trouble to complete your request. <br/>Please try again.</p>
                <button type="button" className="try">Retry</button>
            </div>
        )
    }

    const getSuccessVideos = () => {
        return (
            <>
                <div className="Gaming_right_continer">
                    <div className="Treding_logo_container"><SiYoutubegaming size={40} color="#ff0000"/></div>
                    <h1 className="Treding_heading">Gaming</h1>
                </div>   
                <ul className="Gaming_Success_container">
                    {GamingData.map(each => (
                        <GamingDetails key={ each.id } gamingDetails = { each } />
                    ))}
                </ul>
            </>
        )
    }

    const getAllDetails = () => {
        switch(GamingApi){
            case ApiStatusContent.isLoading:
                return getLoaderSpinner();
            case ApiStatusContent.success:
                return getSuccessVideos();
            case ApiStatusContent.failure:
                return getFailureVideos();
            default:
                return null;
        }
    }

    return(
        <div className="Gaming_bg_container">
        <Header/>
        <div className="Gaming_card_container">
            <SlideBar/>
            <div className="Gaming_Main_container">
                {getAllDetails()}
            </div>
        </div>
        </div>
    )

}

export default Gaming