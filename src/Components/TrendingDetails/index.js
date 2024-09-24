import { Link } from "react-router-dom"

import "./index.css"


function TrendingDetalis (props){
    const {eachTrending} = props;
    const {id,thumbnailUrl,title,name,viewCount,publishedAt,profileImageUrl} = eachTrending;

    const preveDate = new Date(publishedAt).getFullYear();
    const currentDate = new Date().getFullYear();
   
    return(
        <Link to = {`/${id}`} className="Link">
            <li className="Trending_each_videos_container">
                <img src= {thumbnailUrl} className = "Trending_image" alt= {title}/>
                <div className="Desktop_Trending_each_videos_details">
                    <h1 className="Trending_each_videos_details_heading">{title}</h1>
                    <p className="Trending_each_videos_details_para">{name}</p>
                    <p className="Trending_each_videos_details_para">{viewCount} views . {currentDate - preveDate} years ago</p>
                </div>
                <div className="Mobile_Trending_each_videos_details">
                    <img src={profileImageUrl} className="Mobile_Trending_profile_url" alt={name}/>
                    <div className="Mobile_Trending_each_videos_details_container">
                        <h1 className="Trending_each_videos_details_heading">{title}</h1>
                        <p className="mobile_Trending_each_videos_details_para">{name} . {viewCount} views . {currentDate - preveDate} years ago</p>
                    </div>
                </div>
            </li>
        </Link>
    )
}

export default TrendingDetalis