import Header from "../Header"

import SlideBar from "../SlideBar"

import { HiFire } from "react-icons/hi";

import { Link } from "react-router-dom"


import "./index.css"


function SavedVideos({EachSaveVideo}){

    const NoVideosFailure = () => {
        return(
            <div className="Failure_videos_container">
                <div className="Failure_continer">
                    <img className="Failure_image" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png" alt="no saved videos"/>
                    <h1 className="Failure_videos_heading">No Saved Videos Founds</h1>
                    <p className="Failur_videos_para">You can save your videos while watching them </p>
                </div>
            </div>
        )
    }

    const getAllSavedVideos = (EachVideos) => {
         const {title, thumbnailUrl, id, name, viewCount, publishedAt} = EachVideos;
         const prveDate = new Date(publishedAt).getFullYear();
         const currentDate = new Date().getFullYear();
        return(
                <li className="Saved_video_container" key={id}>
                        <img src={thumbnailUrl} className="saved_thumbnaliurl" alt={title}/>
                        <div className="Saved_video_details">
                            <h1 className="Saved_video_heading_1">{title}</h1>
                            <h2 className="Saved_video_heading_2">{name}</h2>
                            <p className="viewCount">{ viewCount } Views . {currentDate - prveDate} years ago</p>
                        </div>
                </li>
        )
    }

    const getSuccessFully = () => {
        return(
            <div className="get_successfull_container">
                <div className="Treding_right_continer">
                    <div className="Treding_logo_container"><HiFire size={40} color="#ff0000"/></div>
                    <h1 className="Treding_heading">Saved Videos</h1>
                </div>
                <ul className="Each_video_save_container">
                    {EachSaveVideo.map(each => getAllSavedVideos(each))}
                </ul>
            </div>
        )
    }

    return(
        <div className="SaveVideo_bg_container">
        <Header/>
            <div className="SaveVideo_card_container">
                <SlideBar/>
                {EachSaveVideo.length > 0 ? getSuccessFully() : NoVideosFailure()}
            </div>
        </div>
    )
}

export default SavedVideos