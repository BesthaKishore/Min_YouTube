import { useState, useEffect } from "react";

import Header from "../Header";

import SildeBar from "../SlideBar";

import VideoItems from "../VideoItems";

import Cookies from "js-cookie";

import { BeatLoader} from "react-spinners";

import { MdOutlineClose } from "react-icons/md";

import { MdSearch } from "react-icons/md";

import "./index.css"

const ApiStatusContent = {
    initital: "INITITAL",
    success : "SUCCESS",
    failure : "FAILURE",
    isLoading: "IS_LOADING"
}

function Home(){

    const [premiumcard, setPremiumCard] = useState(true);

    const [searchValue, setSearch] = useState('');

    const [successApi, setSuccessApi] = useState([]);

    const [RetryApi, setRetryApi] = useState(false);

    const [ApiStatus, setApiStatus] = useState(ApiStatusContent.initital);

    const SearchResult = successApi.filter(each => each.title.includes(searchValue));

    useEffect(() =>{

        setApiStatus(ApiStatusContent.isLoading);

        const getVideoApi = async () => {

            const jwtToken = Cookies.get("jwt_token");
            const Api = `https://apis.ccbp.in/videos/all?search=${searchValue}`
            const options = {
                method: "GET",
                headers : {
                    Authorization : `Bearer ${jwtToken}`
                }
            }

            const response = await fetch(Api, options);
            if (response.ok === true){
                const responseData = await response.json();
                // console.log(responseData);
                const updateData = responseData.videos.map(each => ({
                    id: each.id,
                    title: each.title,
                    publishedAt : each.published_at,
                    thumbnailUrl: each.thumbnail_url,
                    viewCount : each.view_count,
                    name: each.channel.name,
                    profileUlr: each.channel.profile_image_url
                }));
                setApiStatus(ApiStatusContent.success);
                setSuccessApi(updateData);
            }else{
                setApiStatus(ApiStatusContent.failure);
            }

        }
        getVideoApi();
    },[searchValue,RetryApi])

    const onClickSerachResultFailureBtn = () => {
        // setRetryApi((prevState) => !prevState);
        setSearch('');
    }

    const onclickApiFailureSection = () => {
        setRetryApi((prv) => !prv);
    }


    const onchangeSearchInput = event => {
        setSearch(event.target.value);
    }

    const onclickCloseButton = () => {
        setPremiumCard(false);
    }
    
    const PremiumContent = () => (
        <div className="Premium_container">
        <div className="premium_logo_contianer">
            <img className="premium_logo" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" alt="logo"/>
            <button type="button" className="btn" onClick={onclickCloseButton}><MdOutlineClose size={30}/></button>
        </div>
        <h2 className="premium_heading">Buy Nxt Watch Premium prepaid plans with <br/>UPI</h2>
        <button type="button" className="get_btn">GET IN NOW</button>
    </div>
    )

    const getLoaderSpinner = () => {
        return(
            <div className="Loader_Spinner">
                <BeatLoader color="#4f46e5" size={30}/>
            </div>
        )
    }

    const getSearchResultFailure = () => {
        return(
            <div className="Search_result_failure_container">
                <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png" className="Search_result_failure_image" alt="no videos"/>
                <h1 className="Search_result_failure_heading">No Search result found</h1>
                <p className="Serach_result_failure_para">Try different key words or remove search <br></br>filter</p>
                <button type="button" className="try" onClick={onClickSerachResultFailureBtn}>Retry</button>
            </div>
        )
    }

    const getSearchResult = () => {
        return(
            <>
            {SearchResult.map(each => (
                <VideoItems key={each.id} eachVideos = {each}/>
            ))}
            </>
        )
    }
    

    const getSuccessSection = () => {
        return(
        <ul className="success_container">
            {SearchResult.length >= 1 ? getSearchResult() : getSearchResultFailure() }
        </ul>
        )
    }
    
    const getfailureSection = () => (
        <div className="failure_container">
            <img className="failure_image" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png" alt="failure"/>
            <h1 className="failure_heading">Opps! Something Went Wrong</h1>
            <p className="failure_para">We are having some trouble to complete your request. <br/>Please try again.</p>
            <button type="button" className="try" onClick={onclickApiFailureSection}>Retry</button>
        </div>
    )

    const getSearchContent = () => {
        return(
            <div className="SearchContainer">
                <input type = "search" className="search_input" placeholder="Search" onChange={onchangeSearchInput} value={searchValue}/>
                <button type="button" className="search_btn"><MdSearch size={25}/></button>
            </div>
        )
    }

    const getAllDetails = () => {
        switch(ApiStatus){
            case ApiStatusContent.isLoading:
                return getLoaderSpinner();
            case ApiStatusContent.success:
                return getSuccessSection();
            case ApiStatusContent.failure:
                return getfailureSection();
            default:
                return null;
        }
    }

    return(
        <>
        <Header/>
        <section className="Seaction_container">
            <SildeBar />
            <article className= "article_main_continer">
                {premiumcard ? (PremiumContent()) : null}
                <main className="main_container">
                {getSearchContent()}
                {getAllDetails()}
                </main>
            </article>
        </section>
        </>
    )
}

export default Home