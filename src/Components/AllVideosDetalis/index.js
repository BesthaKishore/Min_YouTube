import { useEffect, useState } from "react"

import { useParams } from "react-router-dom"

import ReactPlayer from 'react-player'

import Cookies from "js-cookie"

import Header from "../Header"

import SlideBar from "../SlideBar"

import { AiOutlineLike } from "react-icons/ai";

import { AiOutlineDislike } from "react-icons/ai";

import { RiMenuAddLine } from "react-icons/ri";

import { BeatLoader} from "react-spinners";

import "./index.css"

const ApiStatusContent = {
    initital: "INITITAL",
    success : "SUCCESS",
    failure : "FAILURE",
    isLoading: "IS_LOADING"
}



function AllVideosDetalis({onSavedVideos}){


    const [EachVideos, setEachVideos] = useState([]);

    const [EachVideosApi, setEachVideosApi] = useState(ApiStatusContent.initital);

    const [LikeButton, setLikeButton] = useState({isLike : false});

    const [DisLikeButton, setDisLikeButton] = useState({isDisLike: false});

    const [SaveButton, setSaveButton] = useState({isSaved: false});

    const { id } = useParams();

    const { videoUrl, title, viewCount, publishedAt, profileImageUrl, name, subscriberCount, description,thumbnailUrl } = EachVideos;

    const prevData = new Date(publishedAt).getFullYear();

    const currentData = new Date().getFullYear();

    const onClickLikeButton = () => {
        setLikeButton((prveState => ({...prveState, isLike: !prveState.isLike})));
        setDisLikeButton((prveState => ({...prveState, isDisLike: false})));
    }

    const onClickDisLikeButton = () => {
        setDisLikeButton((prveState => ({...prveState, isDisLike: !prveState.isDisLike})));
        setLikeButton((prveState => ({...prveState, isLike: false})));
    }

    const onClickSaveButtons = () => {
        setSaveButton((prveState => ({...prveState, isSaved: !prveState.isSaved})))
        const videoSaved = {title, thumbnailUrl, name, viewCount, publishedAt, id};
        onSavedVideos(videoSaved);
    }

    useEffect(() => {
        const getAllVideosDetails = async() => {

            setEachVideosApi(ApiStatusContent.isLoading);

            const VideosDetails = `https://apis.ccbp.in/videos/${id}`;

            const jwtToken = Cookies.get("jwt_token");

            const options = {
                method : "GET",
                headers : {
                    Authorization : `Bearer ${jwtToken}`
                }
            }

            const response = await fetch(VideosDetails, options);
            if (response.ok === true){
                const responseData = await response.json();
                const fetchData = {
                    id : responseData.video_details.id,
                    viewCount : responseData.video_details.view_count,
                    description: responseData.video_details.description,
                    publishedAt : responseData.video_details.published_at,
                    thumbnailUrl : responseData.video_details.thumbnail_url,
                    title: responseData.video_details.title,
                    videoUrl : responseData.video_details.video_url,
                    name : responseData.video_details.channel.name,
                    profileImageUrl: responseData.video_details.channel.profile_image_url,
                    subscriberCount: responseData.video_details.channel.subscriber_count,
    
                }
                setEachVideos(fetchData);
                setEachVideosApi(ApiStatusContent.success);
            }else{
                setEachVideosApi(ApiStatusContent.failure);
            }
        }

        getAllVideosDetails();
    },[id])

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
                    <ReactPlayer url={videoUrl} width= { "100%"} height={ "500px"} controls />
                    <div className="Each_videos_container">
                        <h1 className="Each_videos_container_heading">{ title }</h1>
                        <div className="Each_videos_Like_container">
                            <p className="Each_videos_Like_para">{viewCount} Views . {currentData - prevData} years ago</p>
                            <ul className="Each_like_contianer">
                                <li className="Each_like_container_like" onClick={onClickLikeButton}>
                                < AiOutlineLike size={24} color= {LikeButton.isLike ? "#3b82f6" : "#7e858e"}/>
                                    <button type="button" className= { LikeButton.isLike ? "Liked_button" : "Like_button" }>
                                        Like
                                    </button>
                                </li>
                                <li className="Each_like_container_like" onClick={onClickDisLikeButton}>
                                < AiOutlineDislike size={24} color= {DisLikeButton.isDisLike ? "#3b82f6" : "#7e858e"}/>
                                    <button type="button" className={DisLikeButton.isDisLike ? "Liked_button" : "Like_button"}>
                                        Dislike
                                    </button>
                                </li>
                                <li className="Each_like_container_like" onClick={onClickSaveButtons}>
                                <RiMenuAddLine size={24} color= {SaveButton.isSaved ? "#3b82f6" : "#7e858e"}/>
                                    <button type="button" className={SaveButton.isSaved ? "Liked_button" : "Like_button"}>
                                        {SaveButton.isSaved ? "Saved" : "Save"}
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <span className="break_line"></span>
                        <div className="Profile_each_container">
                            <img src={profileImageUrl} className="profile_image" alt={name}/>
                            <div className="Profile_each_name_contianer">
                                <h1 className="profile_name">{name}</h1>
                                <p className="Subscribers">{subscriberCount} Subscribers</p>
                            </div>
                        </div>
                        <p className="description">{description}</p>
                    </div>
                </>
        )
    }

    const getAllDetails = () => {
        switch(EachVideosApi){
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
        <main className="Each_videos_bg_container">
            <Header/>
            <div className="Each_videos_card_container">
                <SlideBar/>
                <div className="Each_videos_Details">
                    {getAllDetails()}
                </div>
            </div>
        </main>
    )
}

export default AllVideosDetalis

