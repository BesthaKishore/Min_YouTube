import Header from "../Header"

import SlideBar from "../SlideBar"

import TrendingDetalis from "../TrendingDetails";

import { BeatLoader} from "react-spinners";

import { HiFire } from "react-icons/hi";

import Cookies from "js-cookie"

import { useState, useEffect } from "react";

import "./index.css"

const ApiStatusContent = {
    initital: "INITITAL",
    success : "SUCCESS",
    failure : "FAILURE",
    isLoading: "IS_LOADING"
}


function Trending(){

    const [TrendingData, setTrendingData] = useState([]);

    const [TrendingApi, setTrendingApi] = useState(ApiStatusContent.initital);

    useEffect (() => {

        const getTrendingAPi = async() => {
            
            setTrendingApi(ApiStatusContent.isLoading);

            const TrendingApi = 'https://apis.ccbp.in/videos/trending'

            const jwtToken = Cookies.get("jwt_token");
            
            const options = {
                method : "GET",
                headers : {
                    Authorization : `Bearer ${jwtToken}`
                }
            }
            

            const response = await fetch(TrendingApi,options);
            const TrendingDate = await response.json();
            if (response.ok === true){
                const fetchData = TrendingDate.videos.map(each => ({
                    id: each.id,
                    publishedAt : each.published_at,
                    thumbnailUrl : each.thumbnail_url,
                    title : each.title,
                    viewCount : each.view_count,
                    name: each.channel.name,
                    profileImageUrl: each.channel.profile_image_url
                }))
                setTrendingData(fetchData);
                setTrendingApi(ApiStatusContent.success);
            }else{
                setTrendingApi(ApiStatusContent.failure);
            }

        }



        getTrendingAPi();
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
        return(
            <>
            <div className="Treding_right_continer">
                <div className="Treding_logo_container"><HiFire size={40} color="#ff0000"/></div>
                <h1 className="Treding_heading">Trending</h1>
             </div>
            <div className="Trending_Videos_container">
                <ul className="Success_container">
                    {TrendingData.map(each => (
                        <TrendingDetalis key={each.id} eachTrending = {each}/>
                    ))}
                </ul>
            </div>
            </>
        )
    }

    const getAllDetails = () => {
        switch(TrendingApi){
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
        <div className="Trending_bg_container">
        <Header/>
        <div className="Treding_card_container">
            <SlideBar/>
        <div className="Trending_main_container">
                {getAllDetails()}
        </div>
        </div>
        </div>
    )
}

export default Trending