import { Link } from "react-router-dom"

import "./index.css"

function VideoItems(props){
    const { eachVideos } = props 
    const { id, thumbnailUrl, title,profileUlr,name,viewCount,publishedAt } = eachVideos
    const publishedDate = new Date(publishedAt).getFullYear();
    const CurrtDate = new Date().getFullYear();
    
    return(
        <li className="list_name">
            <Link to = {id} className="Link">
                <img className="image" src= {thumbnailUrl} alt= {title}/>
                <main className="Main_container">
                    <img src= {profileUlr} className="profileUlr" alt={name}/>
                    <div className="right_container">
                        <h2 className="heading_two">{ title }</h2>
                        <div className="Des_name_container">
                        <p className="name">{name} </p> 
                        <>
                        <p className="name">{viewCount} views . <span>{ CurrtDate - publishedDate } years ago</span></p>
                        </>
                        </div>
                        <div className="Mob_name_container">
                        <p className="name">{name} . {viewCount} views . <span>{ CurrtDate - publishedDate } years ago</span></p>
                        </div>
                    </div>
                </main>
            </Link>
        </li>
    )
}

export default VideoItems