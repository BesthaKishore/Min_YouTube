import { Link } from "react-router-dom"

import "./index.css"

function GamingDetails(props){
    const {gamingDetails} = props
    const {title,thumbnailUrl,viewCount, id} = gamingDetails
    return(
        <li className="Gaming_list_container">
            <Link to = {`/${id}`} className="Link">
            <div className="Gaming_list_items_container">
                <img src= { thumbnailUrl } className="Gaming_image" alt={ title }/>
                <h1 className="Gaming_list_heading">{ title }</h1>
                <p className="Gaming_list_para">{ viewCount } Watching Worldwide</p>
            </div>
            </Link>
        </li>
    )
}


export default GamingDetails